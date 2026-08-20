require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://digital-ujjain.vercel.app", "http://localhost:3000"],
  },
});
io.on("connection", (socket) => {
  console.log("✅ Socket connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});
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
} else {
  const isLive = process.env.RAZORPAY_KEY_ID.startsWith("rzp_live_");
  console.log(
    isLive
      ? "🔴 RAZORPAY IS IN LIVE MODE — real money will be charged."
      : "🟡 Razorpay is in TEST mode (rzp_test_...) — no real money moves."
  );
}

if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
  console.warn(
    "⚠️  RAZORPAY_WEBHOOK_SECRET missing in backend/.env — the /api/webhooks/razorpay endpoint will reject all events until this is set. See GO_LIVE_CHECKLIST.md."
  );
}

// ---------- Setup ----------
app.use(cors({
  origin: [
    "https://digital-ujjain.vercel.app",
    "http://localhost:3000"
  ]
}));
// The Razorpay webhook route needs the RAW, unparsed body to verify its
// signature (see the route itself, further down). Every other route gets
// normal JSON parsing.
app.use((req, res, next) => {
  if (req.originalUrl === "/api/webhooks/razorpay") return next();
  express.json()(req, res, next);
});

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

const FILES = {
  hotelBookings: path.join(DATA_DIR, "hotel-bookings.json"),
  sathiBookings: path.join(DATA_DIR, "sathi-bookings.json"),
  sathiApplications: path.join(DATA_DIR, "sathi-applications.json"),
  reports: path.join(DATA_DIR, "reports.json"),
  feedback: path.join(DATA_DIR, "feedback.json"),
  paymentAnomalies: path.join(DATA_DIR, "payment-anomalies.json"),
  webhookEvents: path.join(DATA_DIR, "webhook-events.json"),
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
    .catch(() => { })
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

// Same razorpay_order_id can arrive twice (double-click, retry after a slow
// network response, or our own webhook racing the browser's request). This
// looks a booking up by order id so we can return the existing one instead
// of creating a duplicate.
function findByOrderId(filePath, orderId) {
  return readJSON(filePath).find((b) => b.razorpayOrderId === orderId) || null;
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
      notes: { type: "hotel", propertyName, checkIn, checkOut, guestName, guestPhone, guests: String(req.body.guests || "") },
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
    await appendJSON(FILES.paymentAnomalies, {
      type: "hotel",
      reason: "signature_mismatch",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      guestPhone,
      createdAt: new Date().toISOString(),
    });
    return res.status(400).json({
      error: "We couldn't verify this payment. If money was deducted, our team will review and refund it — please contact support with your order ID: " + razorpay_order_id,
    });
  }

  const existing = findByOrderId(FILES.hotelBookings, razorpay_order_id);
  if (existing) return res.status(200).json(existing);

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
    source: "checkout",
    createdAt: new Date().toISOString(),
  };
  await appendJSON(FILES.hotelBookings, booking);
  io.emit("newBooking", { type: "hotel", propertyName: booking.propertyName, createdAt: booking.createdAt });
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
      notes: { type: "sathi", sathiName, touristName, touristPhone, days: String(days), pricePerDay: String(pricePerDay) },
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
    await appendJSON(FILES.paymentAnomalies, {
      type: "sathi",
      reason: "signature_mismatch",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      touristPhone,
      createdAt: new Date().toISOString(),
    });
    return res.status(400).json({
      error: "We couldn't verify this payment. If money was deducted, our team will review and refund it — please contact support with your order ID: " + razorpay_order_id,
    });
  }

  const existingSathiBooking = findByOrderId(FILES.sathiBookings, razorpay_order_id);
  if (existingSathiBooking) return res.status(200).json(existingSathiBooking);

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
    source: "checkout",
    createdAt: new Date().toISOString(),
  };
  await appendJSON(FILES.sathiBookings, booking);
  io.emit("newBooking", { type: "sathi", sathiName: booking.sathiName, createdAt: booking.createdAt });
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

// ---------- Razorpay Webhook (payment safety net) ----------
// Configure this URL in the Razorpay Dashboard → Settings → Webhooks:
//   https://digital-ujjain-backend.onrender.com/api/webhooks/razorpay
// Subscribe to the "order.paid" event. Set RAZORPAY_WEBHOOK_SECRET in
// backend/.env (and on Render) to whatever secret you set in the dashboard —
// it is NOT the same as RAZORPAY_KEY_SECRET.
//
// Why this exists: /api/bookings/hotel and /api/bookings/sathi only run when
// the browser calls back after Razorpay Checkout closes. If the customer's
// tab crashes, they lose signal, or they close the browser right after
// paying, money is captured on Razorpay's side but our booking is never
// created — a silently lost paid booking. This webhook is Razorpay telling
// us directly "this order was paid", independent of the browser, so we can
// create the booking either way. It reuses the same idempotency check, so if
// the browser's own request already created the booking, this is a no-op.
app.post(
  "/api/webhooks/razorpay",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    // Always 200 quickly once verified — Razorpay retries on non-2xx, and we
    // don't want to hang the webhook while we do bookkeeping. Verification
    // failure is the one case we reject, since that means the request isn't
    // genuinely from Razorpay.
    if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
      console.error("Webhook received but RAZORPAY_WEBHOOK_SECRET is not set — rejecting.");
      return res.status(503).json({ error: "Webhook not configured." });
    }

    const signature = req.header("x-razorpay-signature");
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(req.body) // raw Buffer — must be unparsed for this to match
      .digest("hex");

    if (signature !== expected) {
      console.warn("⚠️  Webhook signature mismatch — rejected (not from Razorpay, or wrong secret configured).");
      return res.status(400).json({ error: "Invalid signature." });
    }

    let event;
    try {
      event = JSON.parse(req.body.toString("utf-8"));
    } catch {
      return res.status(400).json({ error: "Invalid JSON." });
    }

    appendJSON(FILES.webhookEvents, {
      event: event.event,
      receivedAt: new Date().toISOString(),
    });

    // Acknowledge immediately; Razorpay just needs a 2xx.
    res.status(200).json({ received: true });

    if (event.event !== "order.paid") return; // we only reconcile on this event

    try {
      const orderEntity = event.payload?.order?.entity;
      const paymentEntity = event.payload?.payment?.entity;
      if (!orderEntity || !paymentEntity) return;

      const notes = orderEntity.notes || {};
      const orderId = orderEntity.id;
      const paymentId = paymentEntity.id;

      if (notes.type === "hotel") {
        if (findByOrderId(FILES.hotelBookings, orderId)) return; // browser flow already handled it
        const totalAmount = computeHotelAmount(notes.propertyName, notes.checkIn, notes.checkOut) || orderEntity.amount / 100;
        const booking = {
          bookingId: generateId("SIM2028"),
          propertyName: notes.propertyName,
          checkIn: notes.checkIn,
          checkOut: notes.checkOut,
          guests: notes.guests || "",
          guestName: notes.guestName,
          guestPhone: notes.guestPhone,
          totalAmount,
          status: "confirmed",
          paymentStatus: "paid",
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentId,
          source: "webhook", // created by the webhook, not the browser — see comment above
          createdAt: new Date().toISOString(),
        };
        await appendJSON(FILES.hotelBookings, booking);
        io.emit("newBooking", { type: "hotel", propertyName: booking.propertyName, createdAt: booking.createdAt });
        console.log(`✅ Webhook reconciled a hotel booking that the browser never confirmed: ${booking.bookingId}`);
      } else if (notes.type === "sathi") {
        if (findByOrderId(FILES.sathiBookings, orderId)) return;
        const totalAmount = orderEntity.amount / 100;
        const booking = {
          bookingId: generateId("SATHI2028"),
          sathiName: notes.sathiName,
          touristName: notes.touristName,
          touristPhone: notes.touristPhone,
          days: notes.days,
          totalAmount,
          escrowStatus: "held",
          paymentReleased: false,
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentId,
          source: "webhook",
          createdAt: new Date().toISOString(),
        };
        await appendJSON(FILES.sathiBookings, booking);
        io.emit("newBooking", { type: "sathi", sathiName: booking.sathiName, createdAt: booking.createdAt });
        console.log(`✅ Webhook reconciled a sathi booking that the browser never confirmed: ${booking.bookingId}`);
      }
    } catch (err) {
      console.error("Webhook reconciliation error:", err);
    }
  }
);

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
app.get("/api/admin/payment-anomalies", requireAdminKey, (req, res) => res.json(readJSON(FILES.paymentAnomalies)));

// ---------- 404 ----------
app.use((req, res) => res.status(404).json({ error: "Not found" }));

server.listen(PORT, () => {
  console.log(`Digital Ujjain backend running on http://localhost:${PORT}`);
});