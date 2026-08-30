"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "./LanguageContext";

const EASE_POP = "cubic-bezier(0.34, 1.56, 0.64, 1)";

const text = {
  hi: {
    tagline:
      "महाकाल की नगरी — इतिहास, विकास, और भविष्य की एक डिजिटल यात्रा",
    quickLinks: "मुख्य लिंक",
    vikas: "विकास",
    simhastha: "सिंहस्थ 2028",
    map: "मानचित्र",
    contact: "संपर्क",
    simhasthaCol: "सिंहस्थ 2028",
    countdown: "काउंटडाउन",
    stayBooking: "ठहराव बुकिंग",
    bookSathi: "साथी बुक करें",
    zones: "सिंहस्थ ज़ोन",
    emergency: "आपातकालीन हेल्पलाइन",
    police: "👮 पुलिस —",
    ambulance: "🚑 एम्बुलेंस —",
    fire: "🚒 फायर —",
    tourist: "📞 पर्यटक हेल्पलाइन —",
    copyright: "© 2026 Digital Ujjain Experience. सभी अधिकार सुरक्षित।",
    badge: "मध्य प्रदेश डिजिटल पहल",
    cancellationLink: "रद्दीकरण एवं रिफंड नीति →",
    cancellationText:
      "चेक-इन से 48 घंटे पहले रद्द करने पर पूरा रिफंड मिलेगा। उसके बाद रद्द करने पर बुकिंग राशि का 50% रिफंड होगा।",
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
  hinglish: {
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
};

export default function Footer() {
  const { lang } = useLanguage();
  const t = text[lang];
  const [showCancellation, setShowCancellation] = useState(false);
  const [visible, setVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const colStyle = (index) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(60px) scale(0.85)",
    transition: `opacity 750ms ${EASE_POP} ${index * 130}ms, transform 750ms ${EASE_POP} ${index * 130}ms`,
  });

  return (
    <footer ref={footerRef} className="bg-black border-t border-ujjain-gold/20 px-6 md:px-12 pt-14 pb-6 overflow-hidden">
      <style>{`
        @keyframes ujjainFooterShimmer {
          0% { transform: translateX(-160%) skewX(-12deg); }
          100% { transform: translateX(480%) skewX(-12deg); }
        }
        .ujjain-footer-badge:hover .ujjain-footer-shimmer {
          animation: ujjainFooterShimmer 1.1s ease-in-out infinite;
        }
      `}</style>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">
        <div style={colStyle(0)}>
          <div className="text-2xl font-bold text-ujjain-gold mb-3">Ujjain</div>
          <p className="text-ujjain-cream/60 text-sm mb-4">{t.tagline}</p>
          <div className="flex justify-center md:justify-start gap-3">
            {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
              <span
                key={i}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-ujjain-gold/20 text-sm transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:rotate-6 hover:border-ujjain-gold hover:shadow-lg hover:shadow-ujjain-gold/30 cursor-pointer"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>

        <div style={colStyle(1)}>
          <h4 className="text-ujjain-gold font-semibold mb-4 text-sm tracking-wide uppercase">
            {t.quickLinks}
          </h4>
          <div className="flex flex-col gap-2 text-ujjain-cream/60 text-sm">
            <a href="#vikas" className="inline-block hover:text-ujjain-saffron hover:translate-x-1 transition-all duration-300">
              {t.vikas}
            </a>
            <a
              href="#simhastha"
              className="inline-block hover:text-ujjain-saffron hover:translate-x-1 transition-all duration-300"
            >
              {t.simhastha}
            </a>
            <a href="#map" className="inline-block hover:text-ujjain-saffron hover:translate-x-1 transition-all duration-300">
              {t.map}
            </a>
            <a href="#contact" className="inline-block hover:text-ujjain-saffron hover:translate-x-1 transition-all duration-300">
              {t.contact}
            </a>
          </div>
        </div>

        <div style={colStyle(2)}>
          <h4 className="text-ujjain-gold font-semibold mb-4 text-sm tracking-wide uppercase">
            {t.simhasthaCol}
          </h4>
          <div className="flex flex-col gap-2 text-ujjain-cream/60 text-sm">
            <a
              href="#simhastha"
              className="inline-block hover:text-ujjain-saffron hover:translate-x-1 transition-all duration-300"
            >
              {t.countdown}
            </a>
            <span>{t.stayBooking}</span>
            <span>{t.bookSathi}</span>
            <a href="#map" className="inline-block hover:text-ujjain-saffron hover:translate-x-1 transition-all duration-300">
              {t.zones}
            </a>
            <button
              onClick={() => setShowCancellation((v) => !v)}
              className="text-left hover:text-ujjain-saffron hover:translate-x-1 transition-all duration-300"
            >
              {t.cancellationLink}
            </button>
            <p
              style={{
                maxHeight: showCancellation ? "120px" : "0px",
                opacity: showCancellation ? 1 : 0,
                marginTop: showCancellation ? "4px" : "0px",
                transition: `max-height 400ms ${EASE_POP}, opacity 300ms ease-out, margin-top 400ms ${EASE_POP}`,
              }}
              className="text-ujjain-cream/50 text-xs overflow-hidden"
            >
              {t.cancellationText}
            </p>
          </div>
        </div>

        <div style={colStyle(3)}>
          <h4 className="text-ujjain-gold font-semibold mb-4 text-sm tracking-wide uppercase">
            {t.emergency}
          </h4>
          <div className="flex flex-col gap-2 text-ujjain-cream/60 text-sm">
            <span className="transition-colors duration-300 hover:text-ujjain-cream">
              {t.police} <span className="text-ujjain-cream">100</span>
            </span>
            <span className="transition-colors duration-300 hover:text-ujjain-cream">
              {t.ambulance} <span className="text-ujjain-cream">108</span>
            </span>
            <span className="transition-colors duration-300 hover:text-ujjain-cream">
              {t.fire} <span className="text-ujjain-cream">101</span>
            </span>
            <span className="transition-colors duration-300 hover:text-ujjain-cream">
              {t.tourist} <span className="text-ujjain-cream">1364</span>
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(30px)",
          transition: `opacity 700ms ${EASE_POP} 500ms, transform 700ms ${EASE_POP} 500ms`,
        }}
        className="max-w-6xl mx-auto mt-12 pt-6 border-t border-ujjain-gold/10 flex flex-col md:flex-row items-center justify-between gap-3"
      >
        <p className="text-ujjain-cream/30 text-xs text-center md:text-left">
          {t.copyright}
        </p>
        <div className="ujjain-footer-badge relative overflow-hidden flex items-center gap-2 text-xs text-ujjain-saffron bg-ujjain-saffron/10 px-3 py-1.5 rounded-full border border-ujjain-saffron/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-ujjain-saffron/30">
          <span className="ujjain-footer-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-ujjain-saffron/30 to-transparent" />
          <span className="relative">✓</span> <span className="relative">{t.badge}</span>
        </div>
      </div>
    </footer>
  );
}