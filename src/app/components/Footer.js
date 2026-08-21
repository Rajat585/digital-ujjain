"use client";
import { useState } from "react";
import { useLanguage } from "./LanguageContext";

const text = {
  hi: {
    tagline:
      "Mahakal Ki Nagri — Itihaas, Vikas, aur Bhavishya Ki Ek Digital Yatra",
    quickLinks: "Quick Links",
    vikas: "Vikas",
    simhastha: "Simhastha 2028",
    map: "Map",
    contact: "Contact",
    simhasthaCol: "Simhastha 2028",
    countdown: "Countdown",
    stayBooking: "Stay Booking",
    bookSathi: "Book a Sathi",
    zones: "Simhastha Zones",
    emergency: "Emergency Helpline",
    police: "👮 Police —",
    ambulance: "🚑 Ambulance —",
    fire: "🚒 Fire —",
    tourist: "📞 Tourist Helpline —",
    copyright: "© 2026 Digital Ujjain Experience. Sabhi Adhikar Surakshit.",
    badge: "Madhya Pradesh Digital Initiative",
    cancellationLink: "Cancellation & Refund Policy →",
    cancellationText:
      "Check-in se 48 ghante pehle cancel karne par poora refund milega. Uske baad cancel karne par booking amount ka 50% refund hoga.",
  },
  en: {
    tagline:
      "City of Mahakal — A Digital Journey Through History, Development, and the Future",
    quickLinks: "Quick Links",
    vikas: "Development",
    simhastha: "Simhastha 2028",
    map: "Map",
    contact: "Contact",
    simhasthaCol: "Simhastha 2028",
    countdown: "Countdown",
    stayBooking: "Stay Booking",
    bookSathi: "Book a Sathi",
    zones: "Simhastha Zones",
    emergency: "Emergency Helpline",
    police: "👮 Police —",
    ambulance: "🚑 Ambulance —",
    fire: "🚒 Fire —",
    tourist: "📞 Tourist Helpline —",
    copyright: "© 2026 Digital Ujjain Experience. All Rights Reserved.",
    badge: "Madhya Pradesh Digital Initiative",
    cancellationLink: "Cancellation & Refund Policy →",
    cancellationText:
      "Free cancellation up to 48 hours before check-in. Cancellations after that are eligible for a 50% refund of the booking amount.",
  },
};

export default function Footer() {
  const { lang } = useLanguage();
  const t = text[lang];
  const [showCancellation, setShowCancellation] = useState(false);

  return (
    <footer className="bg-black border-t border-ujjain-gold/20 px-6 md:px-12 pt-14 pb-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
        <div>
          <div className="text-2xl font-bold text-ujjain-gold mb-3">Ujjain</div>
          <p className="text-ujjain-cream/60 text-sm mb-4">{t.tagline}</p>
          <div className="flex justify-center md:justify-start gap-3">
            {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
              <span
                key={i}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-ujjain-gold/20 text-sm"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-ujjain-gold font-semibold mb-4 text-sm tracking-wide uppercase">
            {t.quickLinks}
          </h4>
          <div className="flex flex-col gap-2 text-ujjain-cream/60 text-sm">
            <a href="#vikas" className="hover:text-ujjain-saffron transition">
              {t.vikas}
            </a>
            <a
              href="#simhastha"
              className="hover:text-ujjain-saffron transition"
            >
              {t.simhastha}
            </a>
            <a href="#map" className="hover:text-ujjain-saffron transition">
              {t.map}
            </a>
            <a href="#contact" className="hover:text-ujjain-saffron transition">
              {t.contact}
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-ujjain-gold font-semibold mb-4 text-sm tracking-wide uppercase">
            {t.simhasthaCol}
          </h4>
          <div className="flex flex-col gap-2 text-ujjain-cream/60 text-sm">
            <a
              href="#simhastha"
              className="hover:text-ujjain-saffron transition"
            >
              {t.countdown}
            </a>
            <span>{t.stayBooking}</span>
            <span>{t.bookSathi}</span>
            <a href="#map" className="hover:text-ujjain-saffron transition">
              {t.zones}
            </a>
            <button
              onClick={() => setShowCancellation((v) => !v)}
              className="text-left hover:text-ujjain-saffron transition"
            >
              {t.cancellationLink}
            </button>
            {showCancellation && (
              <p className="text-ujjain-cream/50 text-xs mt-1">
                {t.cancellationText}
              </p>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-ujjain-gold font-semibold mb-4 text-sm tracking-wide uppercase">
            {t.emergency}
          </h4>
          <div className="flex flex-col gap-2 text-ujjain-cream/60 text-sm">
            <span>
              {t.police} <span className="text-ujjain-cream">100</span>
            </span>
            <span>
              {t.ambulance} <span className="text-ujjain-cream">108</span>
            </span>
            <span>
              {t.fire} <span className="text-ujjain-cream">101</span>
            </span>
            <span>
              {t.tourist} <span className="text-ujjain-cream">1364</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-ujjain-gold/10 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-ujjain-cream/30 text-xs text-center md:text-left">
          {t.copyright}
        </p>
        <div className="flex items-center gap-2 text-xs text-ujjain-saffron bg-ujjain-saffron/10 px-3 py-1.5 rounded-full border border-ujjain-saffron/20">
          <span>✓</span> {t.badge}
        </div>
      </div>
    </footer>
  );
}
