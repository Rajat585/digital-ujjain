"use client";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLanguage } from "../components/LanguageContext";
import { api, openRazorpayCheckout } from "../lib/api";

const propertiesData = {
  hi: [
    {
      id: 1,
      name: "Ramghat Dharamshala",
      type: "Dharamshala",
      price: 500,
      rating: 4.3,
      reviews: 214,
      amenities: ["Free WiFi", "24x7 Paani", "Common Kitchen"],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Ram%20Ghat,%20Ujjain%2001.jpg",
    },
    {
      id: 2,
      name: "Mahakal Yatri Niwas",
      type: "Sarkari Guest House",
      price: 900,
      rating: 4.1,
      reviews: 356,
      amenities: ["Free WiFi", "AC Kamre", "Parking"],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/India%20-%20Delhi%20-%20001%20-%20my%20room%20in%20Paharganj%20(2086441460).jpg",
    },
    {
      id: 3,
      name: "Shipra View Hotel",
      type: "Hotel",
      price: 1800,
      rating: 4.5,
      reviews: 189,
      amenities: ["Free WiFi", "AC Kamre", "Room Service", "Restaurant"],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Our%20hotel%20room%20(13357515743).jpg",
    },
    {
      id: 4,
      name: "Kshipra Ghat Homestay",
      type: "Homestay",
      price: 650,
      rating: 4.4,
      reviews: 97,
      amenities: ["Free WiFi", "Ghar Ka Khana", "Family Friendly"],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Shri%20Ram%20Ghat%2002.jpg",
    },
    {
      id: 5,
      name: "Mahakal Corridor Inn",
      type: "Budget Hotel",
      price: 1200,
      rating: 4.2,
      reviews: 143,
      amenities: ["Free WiFi", "AC Kamre", "Mandir Se Nazdeek"],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Winter%20in%20Ujjain.JPG",
    },
    {
      id: 6,
      name: "Ujjain Heritage Residency",
      type: "3-Star Hotel",
      price: 2400,
      rating: 4.7,
      reviews: 268,
      amenities: [
        "Free WiFi",
        "AC Kamre",
        "Restaurant",
        "Elevator",
        "Room Service",
      ],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Ujjain%2001.jpg",
    },
    {
      id: 7,
      name: "Simhastha Tent City Camp",
      type: "Tambu Stay",
      price: 450,
      rating: 4.0,
      reviews: 62,
      amenities: ["Saanjha Bathroom", "Saamuhik Bhojan", "Suraksha Guard"],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Ujjain%20in%20Night%2001.jpg",
    },
    {
      id: 8,
      name: "Vikram Palace Hotel",
      type: "Premium Hotel",
      price: 3200,
      rating: 4.8,
      reviews: 174,
      amenities: [
        "Free WiFi",
        "AC Kamre",
        "Restaurant",
        "Pool",
        "Room Service",
      ],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Ujjain,%20Ram%20Ghat%20(9840921865).jpg",
    },
  ],
  en: [
    {
      id: 1,
      name: "Ramghat Dharamshala",
      type: "Dharamshala",
      price: 500,
      rating: 4.3,
      reviews: 214,
      amenities: ["Free WiFi", "24x7 Water", "Common Kitchen"],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Ram%20Ghat,%20Ujjain%2001.jpg",
    },
    {
      id: 2,
      name: "Mahakal Yatri Niwas",
      type: "Government Guest House",
      price: 900,
      rating: 4.1,
      reviews: 356,
      amenities: ["Free WiFi", "AC Rooms", "Parking"],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/India%20-%20Delhi%20-%20001%20-%20my%20room%20in%20Paharganj%20(2086441460).jpg",
    },
    {
      id: 3,
      name: "Shipra View Hotel",
      type: "Hotel",
      price: 1800,
      rating: 4.5,
      reviews: 189,
      amenities: ["Free WiFi", "AC Rooms", "Room Service", "Restaurant"],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Our%20hotel%20room%20(13357515743).jpg",
    },
    {
      id: 4,
      name: "Kshipra Ghat Homestay",
      type: "Homestay",
      price: 650,
      rating: 4.4,
      reviews: 97,
      amenities: ["Free WiFi", "Home Cooked Meals", "Family Friendly"],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Shri%20Ram%20Ghat%2002.jpg",
    },
    {
      id: 5,
      name: "Mahakal Corridor Inn",
      type: "Budget Hotel",
      price: 1200,
      rating: 4.2,
      reviews: 143,
      amenities: ["Free WiFi", "AC Rooms", "Walking Distance to Temple"],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Winter%20in%20Ujjain.JPG",
    },
    {
      id: 6,
      name: "Ujjain Heritage Residency",
      type: "3-Star Hotel",
      price: 2400,
      rating: 4.7,
      reviews: 268,
      amenities: [
        "Free WiFi",
        "AC Rooms",
        "Restaurant",
        "Elevator",
        "Room Service",
      ],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Ujjain%2001.jpg",
    },
    {
      id: 7,
      name: "Simhastha Tent City Camp",
      type: "Tent Stay",
      price: 450,
      rating: 4.0,
      reviews: 62,
      amenities: ["Shared Bathroom", "Community Meals", "Security Guard"],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Ujjain%20in%20Night%2001.jpg",
    },
    {
      id: 8,
      name: "Vikram Palace Hotel",
      type: "Premium Hotel",
      price: 3200,
      rating: 4.8,
      reviews: 174,
      amenities: [
        "Free WiFi",
        "AC Rooms",
        "Restaurant",
        "Pool",
        "Room Service",
      ],
      image:
        "https://commons.wikimedia.org/wiki/Special:FilePath/Ujjain,%20Ram%20Ghat%20(9840921865).jpg",
    },
  ],
};

const text = {
  hi: {
    eyebrow: "Simhastha Sahayak",
    title: "Stay Booking",
    subtitle:
      "Ujjain mein verified stays — fixed sarkari-verified price, zero commission",
    trustBar: "Sarkari Verified Price  •  Zero Commission — Seedhi Booking",
    howVerified: "Verification kaise hoti hai?",
    howVerifiedText:
      "Har property ka license aur pricing Ujjain Municipal Corporation ki team dwara physically check kiya gaya hai. Rate list registered hai — koi bhi extra charge illegal hai. Kisi bhi gadbadi ki report seedha administration ko jaati hai.",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Mehmaan",
    nightsLabel: (n) => `${n} Raat${n > 1 ? "en" : ""}`,
    verified: "Verified ✓",
    reviews: "reviews",
    perNight: (price, n) => `₹${price}/raat × ${n} raat${n > 1 ? "en" : ""}`,
    bookNow: "Book Karein",
    guestName: "Mehmaan ka poora naam",
    mobile: "Mobile number",
    taxesFees: "Tax aur fees",
    commission: "Platform commission",
    total: "Total",
    confirmBooking: "Pay & Book Karein",
    confirming: "Payment Khul Raha Hai...",
    congrats: "Payment safal! Aapki booking confirm ho gayi hai 🎉",
    lockedNote:
      "Ye final amount hai — spot par koi extra charge maanya nahi hoga",
    amountLocked: "(Paid)",
    reportBtn: "⚠️ Kisi ne extra paisa maanga? Report Karein",
    reportSentMsg:
      "Aapki complaint administration tak bhej di gayi hai. Dhanyavaad.",
    bookingError:
      "Payment ya booking mein dikkat aayi. Paisa kata hai to automatically refund ho jayega. Kripya dobara koshish karein.",
    close: "Band Karein",
    secureBadge: "🔒 Secure Payment via Razorpay",
    verifiedBadge: "✓ Verified Hotels",
    cancellationPolicy: "Cancellation Policy",
    cancellationPolicyText:
      "Check-in se 48 ghante pehle cancel karne par poora refund milega. Uske baad cancel karne par booking amount ka 50% refund hoga.",
  },
  en: {
    eyebrow: "Simhastha Sahayak",
    title: "Stay Booking",
    subtitle:
      "Verified stays across Ujjain — fixed government-checked pricing, zero commission",
    trustBar: "Government Verified Price  •  Zero Commission — Direct Booking",
    howVerified: "How does verification work?",
    howVerifiedText:
      "Every property's license and pricing has been physically checked by the Ujjain Municipal Corporation's team. The rate list is registered — any extra charge is illegal. Any complaint goes directly to the administration.",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Guests",
    nightsLabel: (n) => `${n} Night${n > 1 ? "s" : ""}`,
    verified: "Verified ✓",
    reviews: "reviews",
    perNight: (price, n) => `₹${price}/night × ${n} night${n > 1 ? "s" : ""}`,
    bookNow: "Book Now",
    guestName: "Guest's full name",
    mobile: "Mobile number",
    taxesFees: "Taxes & fees",
    commission: "Platform commission",
    total: "Total",
    confirmBooking: "Pay & Book",
    confirming: "Opening Payment...",
    congrats: "Payment successful! Your booking is confirmed 🎉",
    lockedNote:
      "This is the final amount — no extra charges are valid on the spot",
    amountLocked: "(Paid)",
    reportBtn: "⚠️ Someone asked for extra money? Report It",
    reportSentMsg:
      "Your complaint has been sent to the administration. Thank you.",
    bookingError:
      "There was a problem with payment or booking. If money was deducted it will be auto-refunded. Please try again.",
    close: "Close",
    secureBadge: "🔒 Secure Payment via Razorpay",
    verifiedBadge: "✓ Verified Hotels",
    cancellationPolicy: "Cancellation Policy",
    cancellationPolicyText:
      "Free cancellation up to 48 hours before check-in. Cancellations after that are eligible for a 50% refund of the booking amount.",
  },
};

function StarRating({ rating }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-ujjain-cream/80">
      <span className="text-ujjain-gold">★</span> {rating}
    </span>
  );
}

export default function HotelBooking() {
  const { lang } = useLanguage();
  const t = text[lang];
  const properties = propertiesData[lang];

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [todayStr, setTodayStr] = useState("");

  const [activeProperty, setActiveProperty] = useState(null);
  const [modalStep, setModalStep] = useState("details");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [reportSent, setReportSent] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [showVerifyInfo, setShowVerifyInfo] = useState(false);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);
    const fmt = (d) => d.toISOString().split("T")[0];
    setTodayStr(fmt(today));
    setCheckIn(fmt(tomorrow));
    setCheckOut(fmt(dayAfter));
  }, []);

  const getNights = () => {
    if (!checkIn || !checkOut) return 1;
    const inD = new Date(checkIn);
    const outD = new Date(checkOut);
    const diff = Math.round((outD - inD) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };
  const nights = getNights();

  const openBooking = (property) => {
    setActiveProperty(property);
    setModalStep("details");
    setGuestName("");
    setGuestPhone("");
    setBookingError("");
  };

  const closeModal = () => {
    setActiveProperty(null);
    setModalStep("details");
    setBookingError("");
  };

  const confirmBooking = async () => {
    setConfirming(true);
    setBookingError("");

    // Step 1: ask backend to create a Razorpay order. Amount is computed
    // server-side from propertyName + dates, so the browser can't tamper with it.
    const orderResult = await api.createHotelOrder({
      propertyName: activeProperty.name,
      checkIn,
      checkOut,
      guestName: guestName.trim(),
      guestPhone: guestPhone.trim(),
    });
    if (!orderResult.ok) {
      setConfirming(false);
      setBookingError(orderResult.error || t.bookingError);
      return;
    }

    // Step 2: open Razorpay Checkout and wait for the user to pay.
    const payment = await openRazorpayCheckout({
      orderId: orderResult.data.orderId,
      amount: orderResult.data.amount,
      keyId: orderResult.data.keyId,
      name: "Digital Ujjain",
      description: `${activeProperty.name} — ${t.nightsLabel(nights)}`,
      prefill: { name: guestName.trim(), contact: guestPhone.trim() },
    });
    if (!payment.ok) {
      setConfirming(false);
      setBookingError(payment.error || t.bookingError);
      return;
    }

    // Step 3: send payment proof to backend — booking is only created after
    // the signature is verified server-side.
    const result = await api.bookHotel({
      propertyName: activeProperty.name,
      checkIn,
      checkOut,
      guests,
      guestName: guestName.trim(),
      guestPhone: guestPhone.trim(),
      razorpay_order_id: payment.razorpay_order_id,
      razorpay_payment_id: payment.razorpay_payment_id,
      razorpay_signature: payment.razorpay_signature,
    });
    setConfirming(false);
    if (result.ok) {
      setBookingId(result.data.bookingId);
      setModalStep("confirmed");
    } else {
      // Payment succeeded but booking creation failed (e.g. network blip) —
      // do NOT fabricate a booking ID here, since real money moved. Show the
      // real payment ID so support can look it up and confirm manually.
      setBookingId(payment.razorpay_payment_id);
      setBookingError(result.error || t.bookingError);
      setModalStep("confirmed");
    }
  };

  const handleReport = async () => {
    setReportSent(true);
    await api.submitReport({
      type: "hotel",
      bookingId,
      description: `Overcharging report for ${activeProperty?.name || "unknown property"}`,
      reporterPhone: guestPhone,
    });
    setTimeout(() => setReportSent(false), 3000);
  };

  const baseTotal = activeProperty ? activeProperty.price * nights : 0;
  const taxes = Math.round(baseTotal * 0.05);
  const grandTotal = baseTotal + taxes;

  return (
    <section
      id="hotel-booking"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark"
    >
      <span className="text-ujjain-saffron text-xs font-semibold tracking-widest uppercase mb-2">
        {t.eyebrow}
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">
        {t.title}
      </h2>
      <p className="text-ujjain-cream mb-4 text-center max-w-xl">
        {t.subtitle}
      </p>
      <div className="flex items-center gap-2 text-xs text-ujjain-saffron mb-2 bg-white/5 px-4 py-2 rounded-full border border-ujjain-saffron/30 text-center flex-wrap justify-center">
        <span>✓</span> {t.trustBar}
        <button
          onClick={() => setShowVerifyInfo((v) => !v)}
          className="ml-1 w-4 h-4 rounded-full border border-ujjain-saffron/60 text-[10px] leading-none flex items-center justify-center hover:bg-ujjain-saffron/20"
          aria-label={t.howVerified}
        >
          ⓘ
        </button>
      </div>
      {showVerifyInfo && (
        <p className="text-ujjain-cream/60 text-xs max-w-lg text-center mb-8 -mt-1">
          {t.howVerifiedText}
        </p>
      )}
      {!showVerifyInfo && <div className="mb-8" />}

      <div className="w-full max-w-4xl bg-white/5 border border-ujjain-gold/30 rounded-xl p-4 md:p-5 mb-10 flex flex-col md:flex-row gap-3 md:items-end">
        <div className="flex-1">
          <label className="block text-ujjain-cream/60 text-xs mb-1">
            {t.checkIn}
          </label>
          <input
            type="date"
            value={checkIn}
            min={todayStr}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-black/30 border border-ujjain-gold/30 rounded-lg px-3 py-2 text-ujjain-cream text-sm focus:outline-none focus:border-ujjain-gold"
          />
        </div>
        <div className="flex-1">
          <label className="block text-ujjain-cream/60 text-xs mb-1">
            {t.checkOut}
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn || todayStr}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-black/30 border border-ujjain-gold/30 rounded-lg px-3 py-2 text-ujjain-cream text-sm focus:outline-none focus:border-ujjain-gold"
          />
        </div>
        <div className="flex-1">
          <label className="block text-ujjain-cream/60 text-xs mb-1">
            {t.guests}
          </label>
          <div className="flex items-center justify-between bg-black/30 border border-ujjain-gold/30 rounded-lg px-3 py-2">
            <button
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              className="text-ujjain-gold font-bold px-2"
            >
              −
            </button>
            <span className="text-ujjain-cream text-sm">
              {guests} {t.guests}
            </span>
            <button
              onClick={() => setGuests((g) => Math.min(8, g + 1))}
              className="text-ujjain-gold font-bold px-2"
            >
              +
            </button>
          </div>
        </div>
        <div className="text-center md:text-left text-ujjain-cream/60 text-xs md:pb-2">
          {t.nightsLabel(nights)}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {properties.map((p) => (
          <div
            key={p.id}
            className="bg-white/5 border border-ujjain-gold/20 rounded-xl overflow-hidden hover:border-ujjain-gold hover:scale-105 hover:shadow-lg hover:shadow-ujjain-gold/20 transition-all duration-300 flex flex-col"
          >
            <div className="relative h-44 w-full overflow-hidden bg-black/30">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute top-2 left-2 text-[10px] bg-ujjain-dark/80 text-ujjain-saffron px-2 py-1 rounded-full border border-ujjain-saffron/40">
                {p.type}
              </span>
              <span className="absolute top-2 right-2 text-[10px] bg-ujjain-saffron/90 text-ujjain-dark font-semibold px-2 py-1 rounded-full">
                {t.verified}
              </span>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-ujjain-gold font-bold mb-1">{p.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={p.rating} />
                <span className="text-ujjain-cream/40 text-xs">
                  ({p.reviews} {t.reviews})
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.amenities.map((a, i) => (
                  <span
                    key={i}
                    className="text-[10px] text-ujjain-cream/70 bg-white/5 border border-ujjain-gold/20 px-2 py-0.5 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <div className="text-ujjain-gold font-bold text-lg">
                    ₹{p.price * nights}
                  </div>
                  <div className="text-ujjain-cream/40 text-[11px]">
                    {t.perNight(p.price, nights)}
                  </div>
                </div>
                <button
                  onClick={() => openBooking(p)}
                  className="bg-ujjain-gold text-ujjain-dark text-sm font-bold px-4 py-2 rounded-lg hover:bg-ujjain-saffron transition"
                >
                  {t.bookNow}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeProperty && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md bg-ujjain-dark border border-ujjain-gold/40 rounded-xl p-6 relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-ujjain-cream hover:text-ujjain-gold text-2xl leading-none"
            >
              ×
            </button>

            {modalStep === "details" && (
              <div>
                <h3 className="text-xl font-bold text-ujjain-gold mb-1">
                  {activeProperty.name}
                </h3>
                <p className="text-ujjain-cream/60 text-xs mb-4">
                  {checkIn} → {checkOut} &nbsp;•&nbsp; {guests} {t.guests}{" "}
                  &nbsp;•&nbsp; {t.nightsLabel(nights)}
                </p>
                <div className="flex flex-col gap-3 mb-4">
                  <input
                    type="text"
                    placeholder={t.guestName}
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-white/5 border border-ujjain-gold/30 rounded-lg px-4 py-3 text-ujjain-cream placeholder:text-ujjain-cream/40 focus:outline-none focus:border-ujjain-gold"
                  />
                  <input
                    type="tel"
                    placeholder={t.mobile}
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-white/5 border border-ujjain-gold/30 rounded-lg px-4 py-3 text-ujjain-cream placeholder:text-ujjain-cream/40 focus:outline-none focus:border-ujjain-gold"
                  />
                </div>
                <div className="bg-black/20 border border-ujjain-gold/20 rounded-lg p-4 mb-4 text-sm">
                  <div className="flex justify-between text-ujjain-cream/80 mb-1">
                    <span>{t.perNight(activeProperty.price, nights)}</span>
                    <span>₹{baseTotal}</span>
                  </div>
                  <div className="flex justify-between text-ujjain-cream/80 mb-1">
                    <span>{t.taxesFees}</span>
                    <span>₹{taxes}</span>
                  </div>
                  <div className="flex justify-between text-ujjain-cream/40 mb-2 text-xs">
                    <span>{t.commission}</span>
                    <span>₹0</span>
                  </div>
                  <div className="border-t border-ujjain-gold/20 pt-2 flex justify-between text-ujjain-gold font-bold">
                    <span>{t.total}</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
                  <span className="text-[10px] text-ujjain-cream/60 bg-white/5 border border-ujjain-gold/20 px-2.5 py-1 rounded-full">
                    {t.secureBadge}
                  </span>
                  <span className="text-[10px] text-ujjain-cream/60 bg-white/5 border border-ujjain-gold/20 px-2.5 py-1 rounded-full">
                    {t.verifiedBadge}
                  </span>
                </div>
                <button
                  onClick={() =>
                    guestName.trim() &&
                    guestPhone.trim().length >= 10 &&
                    confirmBooking()
                  }
                  disabled={
                    !(guestName.trim() && guestPhone.trim().length >= 10) ||
                    confirming
                  }
                  className="w-full bg-ujjain-gold text-ujjain-dark font-bold px-6 py-3 rounded-lg hover:bg-ujjain-saffron transition disabled:opacity-40"
                >
                  {confirming ? t.confirming : t.confirmBooking}
                </button>
                <p className="text-ujjain-cream/40 text-[11px] text-center mt-3">
                  {t.cancellationPolicy}: {t.cancellationPolicyText}
                </p>
              </div>
            )}

            {modalStep === "confirmed" && (
              <div className="text-center">
                <p className="text-ujjain-cream mb-4">{t.congrats}</p>
                <div className="bg-black/30 border border-ujjain-gold/30 rounded-xl p-6 flex flex-col items-center gap-3">
                  <QRCodeSVG
                    value={bookingId}
                    size={110}
                    bgColor="transparent"
                    fgColor="#D4AF37"
                  />
                  <div className="text-ujjain-gold font-bold">{bookingId}</div>
                  <div className="text-ujjain-cream text-sm">
                    {activeProperty.name}
                  </div>
                  <div className="text-ujjain-cream/60 text-xs">
                    {checkIn} → {checkOut} &nbsp;•&nbsp; {guests} {t.guests}
                  </div>
                  <div className="text-2xl font-bold text-ujjain-gold">
                    ₹{grandTotal}{" "}
                    <span className="text-xs text-ujjain-cream/60">
                      {t.amountLocked}
                    </span>
                  </div>
                  <div className="text-xs text-ujjain-cream/50">
                    {t.lockedNote}
                  </div>
                </div>
                {bookingError && (
                  <p className="text-red-400 text-xs mt-3">{bookingError}</p>
                )}
                <p className="text-ujjain-cream/40 text-[11px] mt-4">
                  {t.cancellationPolicy}: {t.cancellationPolicyText}
                </p>
                <button
                  onClick={handleReport}
                  className="mt-6 text-xs text-ujjain-saffron border border-ujjain-saffron/40 px-4 py-2 rounded-full hover:bg-ujjain-saffron/10 transition"
                >
                  {t.reportBtn}
                </button>
                {reportSent && (
                  <p className="text-ujjain-saffron text-sm mt-3">
                    {t.reportSentMsg}
                  </p>
                )}
                <div>
                  <button
                    onClick={closeModal}
                    className="mt-6 text-ujjain-cream/60 text-sm underline"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
