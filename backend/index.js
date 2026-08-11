require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, "data");

// ---------- Razorpay setup ----------
// Keys come from backend/.env — NEVER expose RAZORPAY_KEY_SECRET to the frontend.
// Only RAZORPAY_KEY_ID (public) is safe to send to the browser.
const razorpay =
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    ? new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      })
    : null;

if (!razorpay) {
  console.warn(
    "⚠️  RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET missing in backend/.env — payment endpoints will return errors until these are set."
  );
}

// ---------- Setup ----------
app.use(cors());
app.use(express.json());

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const FILES = {
  hotelBookings: path.join(DATA_DIR, "hotel-bookings.json"),
  sathiBookings: path.join(DATA_DIR, "sathi-bookings.json"),
  sathiApplications: path.join(DATA_DIR, "sathi-applications.json"),
  reports: path.join(DATA_DIR, "reports.json"),
  feedback: path.join(DATA_DIR, "feedback.json"),
};

Object.values(FILES).forEach((f) => {
  if (!fs.existsSync(f)) fs.writeFileSync(f, "[]");
});

// ---------- Helpers ----------
function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return [];
  }
}

// Simple per-file write queue so concurrent requests (e.g. two bookings
// landing at the same instant) don't read-modify-write over each other and
// corrupt/lose data. Not a substitute for a real DB, but stops the most
// common race condition while we're still on JSON storage.
const writeQueues = new Map();
function queueWrite(filePath, mutateFn) {
  const prev = writeQueues.get(filePath) || Promise.resolve();
  const next = prev
    .catch(() => {})
    .then(() => {
      const list = readJSON(filePath);
      const result = mutateFn(list);
      fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
      return result;
    });
  writeQueues.set(filePath, next);
  return next;
}

function appendJSON(filePath, entry) {
  return queueWrite(filePath, (list) => {
    list.push(entry);
    return list;
  });
}

function updateJSON(filePath, matchFn, updateFn) {
  return queueWrite(filePath, (list) => {
    const idx = list.findIndex(matchFn);
    if (idx === -1) return null;
    updateFn(list[idx]);
    return list[idx];
  });
}

function generateId(prefix) {
  return `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
}

// Very simple in-memory rate limiter (per IP) to stop spam on public endpoints
const rateMap = new Map();
function rateLimit(maxPerMinute = 10) {
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowMs = 60 * 1000;
    const entry = rateMap.get(ip) || { count: 0, start: now };
    if (now - entry.start > windowMs) {
      entry.count = 0;
      entry.start = now;
    }
    entry.count += 1;
    rateMap.set(ip, entry);
    if (entry.count > maxPerMinute) {
      return res.status(429).json({ error: "Too many requests, please slow down." });
    }
    next();
  };
}

function validateFields(body, required) {
  const missing = required.filter((f) => !body[f] || String(body[f]).trim() === "");
  return missing;
}

function requireAdminKey(req, res, next) {
  const key = req.header("x-admin-key");
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized. Pass a valid x-admin-key header." });
  }
  next();
}

// ---------- Health check ----------
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ---------- Payments (Razorpay) ----------
function requireRazorpay(req, res, next) {
  if (!razorpay) {
    return res.status(503).json({ error: "Payments are not configured on the server yet." });
  }
  next();
}

// Amount from the client is NEVER trusted for the actual charge — we look up
// the real price server-side from a fixed catalog so nobody can tamper with
// the amount in devtools/network tab and pay ₹1 for a ₹3000 room.
const HOTEL_PRICE_PER_NIGHT = {
  "Ramghat Dharamshala": 500,
  "Mahakal Yatri Niwas": 900,
  "Shipra View Hotel": 1800,
  "Kshipra Ghat Homestay": 650,
  "Mahakal Corridor Inn": 1200,
  "Ujjain Heritage Residency": 2400,
  "Simhastha Tent City Camp": 450,
  "Vikram Palace Hotel": 3200,
};

function computeHotelAmount(propertyName, checkIn, checkOut) {
  const perNight = HOTEL_PRICE_PER_NIGHT[propertyName];
  if (!perNight) return null;
  const nights = Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000));
  const base = perNight * nights;
  const taxes = Math.round(base * 0.05);
  return base + taxes; // in rupees
}

// Create a Razorpay order for a hotel booking. Frontend opens Razorpay
// Checkout with this order_id, then calls /api/bookings/hotel with the
// payment result to verify + actually create the booking.
app.post("/api/payments/hotel/create-order", rateLimit(20), requireRazorpay, async (req, res) => {
  const { propertyName, checkIn, checkOut, guestName, guestPhone } = req.body;
  const missing = validateFields(req.body, ["propertyName", "checkIn", "checkOut", "guestName", "guestPhone"]);
  if (missing.length) return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });

  const amount = computeHotelAmount(propertyName, checkIn, checkOut);
  if (!amount) return res.status(400).json({ error: "Unknown property or invalid dates" });

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: generateId("SIM2028"),
      notes: { propertyName, checkIn, checkOut, guestName, guestPhone },
    });
    res.json({ orderId: order.id, amount, currency: "INR", keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error("Razorpay order error:", err);
    res.status(502).json({ error: "Could not start payment. Please try again." });
  }
});

function verifyRazorpaySignature(orderId, paymentId, signature) {
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return expected === signature;
}

// ---------- Hotel Bookings (only created AFTER payment is verified) ----------
app.post("/api/bookings/hotel", rateLimit(20), requireRazorpay, async (req, res) => {
  const {
    propertyName, checkIn, checkOut, guests, guestName, guestPhone,
    razorpay_order_id, razorpay_payment_id, razorpay_signature,
  } = req.body;
  const missing = validateFields(req.body, [
    "propertyName", "checkIn", "checkOut", "guestName", "guestPhone",
    "razorpay_order_id", "razorpay_payment_id", "razorpay_signature",
  ]);
  if (missing.length) return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });

  if (!verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
    return res.status(400).json({ error: "Payment verification failed. If money was deducted, it will be auto-refunded." });
  }

  const totalAmount = computeHotelAmount(propertyName, checkIn, checkOut);
  const booking = {
    bookingId: generateId("SIM2028"),
    propertyName,
    checkIn,
    checkOut,
    guests,
    guestName,
    guestPhone,
    totalAmount,
    status: "confirmed",
    paymentStatus: "paid",
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    createdAt: new Date().toISOString(),
  };
  await appendJSON(FILES.hotelBookings, booking);
  res.status(201).json(booking);
});

// ---------- Sathi Bookings ----------
// Guide's day-rate catalog — same "never trust client amount" principle.
const SATHI_PRICE_PER_DAY = {}; // filled in below from SathiBooking.js data if you keep a fixed list;
// if guide pricing is dynamic/DB-driven, replace this with a lookup by sathiId instead of trusting client amount.

app.post("/api/payments/sathi/create-order", rateLimit(20), requireRazorpay, async (req, res) => {
  const { sathiName, touristName, touristPhone, days, pricePerDay } = req.body;
  const missing = validateFields(req.body, ["sathiName", "touristName", "touristPhone", "days", "pricePerDay"]);
  if (missing.length) return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });

  const amount = Number(pricePerDay) * Number(days);
  if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: generateId("SATHI2028"),
      notes: { sathiName, touristName, touristPhone, days: String(days) },
    });
    res.json({ orderId: order.id, amount, currency: "INR", keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error("Razorpay order error:", err);
    res.status(502).json({ error: "Could not start payment. Please try again." });
  }
});

app.post("/api/bookings/sathi", rateLimit(20), requireRazorpay, async (req, res) => {
  const {
    sathiName, touristName, touristPhone, days, totalAmount,
    razorpay_order_id, razorpay_payment_id, razorpay_signature,
  } = req.body;
  const missing = validateFields(req.body, [
    "sathiName", "touristName", "touristPhone", "days", "totalAmount",
    "razorpay_order_id", "razorpay_payment_id", "razorpay_signature",
  ]);
  if (missing.length) return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });

  if (!verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
    return res.status(400).json({ error: "Payment verification failed. If money was deducted, it will be auto-refunded." });
  }

  const booking = {
    bookingId: generateId("SATHI2028"),
    sathiName,
    touristName,
    touristPhone,
    days,
    totalAmount,
    escrowStatus: "held", // money captured, sitting with platform until trip completion is confirmed
    paymentReleased: false,
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    createdAt: new Date().toISOString(),
  };
  await appendJSON(FILES.sathiBookings, booking);
  res.status(201).json(booking);
});

// Tourist marks the trip as complete — this does NOT move money. It just
// raises a flag for admin to review and manually release the payout. Keeping
// the actual fund release admin-only prevents anyone who merely knows a
// bookingId from draining escrow (that was the old, unprotected behaviour).
app.post("/api/bookings/sathi/:bookingId/mark-complete", rateLimit(20), async (req, res) => {
  const updated = await updateJSON(
    FILES.sathiBookings,
    (b) => b.bookingId === req.params.bookingId,
    (b) => {
      b.touristMarkedComplete = true;
      b.touristMarkedCompleteAt = new Date().toISOString();
    }
  );
  if (!updated) return res.status(404).json({ error: "Booking not found" });
  res.json({ message: "Marked as complete. Payout will be released to your Sathi after review.", booking: updated });
});

// Admin-only: actually release the held payment to the guide (manual payout
// today — wire this to RazorpayX Payouts once guide bank/UPI KYC is in place).
app.post("/api/admin/bookings/sathi/:bookingId/release", rateLimit(20), requireAdminKey, async (req, res) => {
  const updated = await updateJSON(
    FILES.sathiBookings,
    (b) => b.bookingId === req.params.bookingId,
    (b) => {
      b.paymentReleased = true;
      b.escrowStatus = "released";
      b.releasedAt = new Date().toISOString();
    }
  );
  if (!updated) return res.status(404).json({ error: "Booking not found" });
  res.json(updated);
});

// ---------- Sathi Applications (become a guide) ----------
app.post("/api/sathi-applications", rateLimit(10), (req, res) => {
  const { name, phone, idNumber, experience, languages, areas } = req.body;
  const missing = validateFields(req.body, ["name", "phone", "idNumber"]);
  if (missing.length) return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });

  const application = {
    referenceId: generateId("SATHI-REG"),
    name,
    phone,
    idNumber,
    experience: experience || "",
    languages: languages || [],
    areas: areas || [],
    status: "pending_verification",
    createdAt: new Date().toISOString(),
  };
  appendJSON(FILES.sathiApplications, application);
  res.status(201).json(application);
});

// ---------- Fraud / Misconduct Reports ----------
app.post("/api/reports", rateLimit(10), (req, res) => {
  const { type, bookingId, description, reporterPhone } = req.body;
  const missing = validateFields(req.body, ["type"]);
  if (missing.length) return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });

  const report = {
    reportId: generateId("REPORT"),
    type, // "hotel" | "sathi" | "other"
    bookingId: bookingId || null,
    description: description || "",
    reporterPhone: reporterPhone || "",
    status: "received",
    createdAt: new Date().toISOString(),
  };
  appendJSON(FILES.reports, report);
  res.status(201).json({ message: "Report received", reportId: report.reportId });
});

// ---------- Citizen Feedback / Suggestions ----------
app.post("/api/feedback", rateLimit(10), (req, res) => {
  const { name, suggestion } = req.body;
  const missing = validateFields(req.body, ["name", "suggestion"]);
  if (missing.length) return res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });

  const feedback = {
    id: generateId("FB"),
    name,
    suggestion,
    createdAt: new Date().toISOString(),
  };
  appendJSON(FILES.feedback, feedback);
  res.status(201).json({ message: "Feedback received", id: feedback.id });
});

// ---------- Admin read endpoints (protected with a shared secret key) ----------
app.get("/api/admin/hotel-bookings", requireAdminKey, (req, res) => res.json(readJSON(FILES.hotelBookings)));
app.get("/api/admin/sathi-bookings", requireAdminKey, (req, res) => res.json(readJSON(FILES.sathiBookings)));
app.get("/api/admin/sathi-applications", requireAdminKey, (req, res) => res.json(readJSON(FILES.sathiApplications)));
app.get("/api/admin/reports", requireAdminKey, (req, res) => res.json(readJSON(FILES.reports)));
app.get("/api/admin/feedback", requireAdminKey, (req, res) => res.json(readJSON(FILES.feedback)));

// ---------- 404 ----------
app.use((req, res) => res.status(404).json({ error: "Not found" }));

app.listen(PORT, () => {
  console.log(`Digital Ujjain backend running on http://localhost:${PORT}`);
});
