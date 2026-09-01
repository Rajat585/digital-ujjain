"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const label = { hi: "अभी बुक करें ↓", en: "Book Now ↓" };

label.hinglish = "Book Now ↓";

export default function StickyBookButton() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes ujjainStickyPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.5), 0 10px 25px rgba(0,0,0,0.4); }
          50% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0), 0 10px 25px rgba(0,0,0,0.4); }
        }
        .ujjain-sticky-btn {
          animation: ujjainStickyPulse 2.4s ease-in-out infinite;
        }
      `}</style>
      <button
        onClick={scrollToBooking}
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(80px) scale(0.7)",
          transition: "opacity 700ms cubic-bezier(0.34, 1.56, 0.64, 1) 400ms, transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1) 400ms",
        }}
        className="ujjain-sticky-btn md:hidden fixed bottom-4 left-4 right-4 z-40 bg-ujjain-gold text-ujjain-dark font-bold py-3 rounded-full shadow-lg shadow-black/40 transition-all duration-300 hover:bg-ujjain-saffron hover:scale-105 active:scale-95"
      >
        {label[lang]}
      </button>
    </>
  );
}