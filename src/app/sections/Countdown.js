"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "../components/LanguageContext";

const text = {
  hi: {
    badge: "🔥 Mahaparv Nikat Hai",
    title: "Simhastha 2028",
    subtitle: "Mahaparv Shuru Hone Mein Bacha Hua Samay",
    highlight: "Vishwa ke sabse bade dharmik samagam ka hissa baniye",
    labels: { days: "Din", hours: "Ghante", minutes: "Minute", seconds: "Second" },
  },
  en: {
    badge: "🔥 The Grand Event Approaches",
    title: "Simhastha 2028",
    subtitle: "Time Remaining Until The Grand Event Begins",
    highlight: "Be a part of the world's largest religious gathering",
    labels: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
  },
};

export default function Countdown() {
  const { lang } = useLanguage();
  const targetDate = new Date("2028-04-01T00:00:00");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const t = text[lang];

  return (
    <section
      id="simhastha"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark overflow-hidden"
    >
      {/* Decorative glow blobs in background */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 w-72 h-72 bg-ujjain-gold/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-80 h-80 bg-ujjain-saffron/10 rounded-full blur-3xl" />

      {/* Pulsing badge */}
      <div className="relative flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-ujjain-gold/50 bg-ujjain-gold/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ujjain-saffron opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-ujjain-saffron"></span>
        </span>
        <span className="text-ujjain-saffron text-sm font-semibold tracking-wide">{t.badge}</span>
      </div>

      <h2 className="relative text-4xl md:text-6xl font-bold mb-4 text-center text-ujjain-gold">
        {t.title}
      </h2>
      <p className="relative text-ujjain-cream/90 mb-2 text-center max-w-xl">{t.subtitle}</p>
      <p className="relative text-ujjain-saffron/90 text-sm mb-12 text-center max-w-xl font-medium">
        {t.highlight}
      </p>

      <div className="relative flex gap-3 md:gap-8">
        {[
          { label: t.labels.days, value: timeLeft.days },
          { label: t.labels.hours, value: timeLeft.hours },
          { label: t.labels.minutes, value: timeLeft.minutes },
          { label: t.labels.seconds, value: timeLeft.seconds },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white/5 border border-ujjain-gold/30 rounded-xl px-4 md:px-8 py-6 min-w-[75px] md:min-w-[120px]
                       hover:border-ujjain-gold hover:-translate-y-1 transition-all duration-300"
          >
            <span className="text-3xl md:text-6xl font-bold text-ujjain-gold tabular-nums">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-ujjain-cream/70 text-xs md:text-sm mt-2 tracking-wide uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}