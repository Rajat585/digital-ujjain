"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../components/LanguageContext";

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

const text = {
  hi: {
    badge: "🔥 महापर्व निकट है",
    title: "सिंहस्थ 2028",
    subtitle: "महापर्व शुरू होने में बचा हुआ समय",
    highlight: "विश्व के सबसे बड़े धार्मिक समागम का हिस्सा बनिए",
    labels: {
      days: "दिन",
      hours: "घंटे",
      minutes: "मिनट",
      seconds: "सेकंड",
    },
    disclaimer: "तारीखें आधिकारिक घोषणा के अनुसार अपडेट होंगी।",
  },
  en: {
    badge: "🔥 The Grand Event Approaches",
    title: "Simhastha 2028",
    subtitle: "Time Remaining Until The Grand Event Begins",
    highlight: "Be a part of the world's largest religious gathering",
    labels: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
    },
    disclaimer: "Dates will be updated as per the official announcement.",
  },
  hinglish: {
    badge: "🔥 Mahaparv Nikat Hai",
    title: "Simhastha 2028",
    subtitle: "Mahaparv Shuru Hone Mein Bacha Hua Samay",
    highlight: "Vishwa ke sabse bade dharmik samagam ka hissa baniye",
    labels: {
      days: "Din",
      hours: "Ghante",
      minutes: "Minute",
      seconds: "Second",
    },
    disclaimer: "Tareekhein official ghoshna ke anusaar update hongi.",
  },
};

function FlipValue({ value }) {
  const [display, setDisplay] = useState(value);
  const [prevDisplay, setPrevDisplay] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (value === display) return;
    setPrevDisplay(display);
    setDisplay(value);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setPrevDisplay(null), 400);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const formatted = String(display).padStart(2, "0");
  const formattedPrev =
    prevDisplay !== null ? String(prevDisplay).padStart(2, "0") : null;

  return (
    <span className="relative inline-block overflow-hidden h-[1.2em] leading-none">
      <span className="invisible">{formatted}</span>
      <span
        key={`current-${formatted}`}
        className="absolute inset-0"
        style={{
          animation: formattedPrev
            ? `countdown-slide-in 400ms ${EASE}`
            : undefined,
        }}
      >
        {formatted}
      </span>
      {formattedPrev && (
        <span
          key={`prev-${formattedPrev}`}
          className="absolute inset-0"
          style={{ animation: `countdown-slide-out 400ms ${EASE} forwards` }}
        >
          {formattedPrev}
        </span>
      )}
    </span>
  );
}

export default function Countdown() {
  const { lang } = useLanguage();
  const targetDate = new Date("2028-04-01T00:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const t = text[lang];

  const units = [
    { label: t.labels.days, value: timeLeft.days },
    { label: t.labels.hours, value: timeLeft.hours },
    { label: t.labels.minutes, value: timeLeft.minutes },
    { label: t.labels.seconds, value: timeLeft.seconds },
  ];

  return (
    <section
      ref={sectionRef}
      id="simhastha"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark overflow-hidden"
    >
      <div className="pointer-events-none absolute top-1/3 left-1/4 w-72 h-72 bg-ujjain-gold/10 rounded-full blur-3xl animate-countdown-drift-1" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-80 h-80 bg-ujjain-saffron/10 rounded-full blur-3xl animate-countdown-drift-2" />

      <div
        className="relative flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-ujjain-gold/50 bg-ujjain-gold/10 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transitionTimingFunction: EASE,
        }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ujjain-saffron opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-ujjain-saffron"></span>
        </span>
        <span className="text-ujjain-saffron text-sm font-semibold tracking-wide">
          {t.badge}
        </span>
      </div>

      <h2
        className="relative text-4xl md:text-6xl font-bold mb-4 text-center text-ujjain-gold transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transitionTimingFunction: EASE,
          transitionDelay: "100ms",
        }}
      >
        {t.title}
      </h2>
      <p
        className="relative text-ujjain-cream/90 mb-2 text-center max-w-xl transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transitionTimingFunction: EASE,
          transitionDelay: "180ms",
        }}
      >
        {t.subtitle}
      </p>
      <p
        className="relative text-ujjain-saffron/90 text-sm mb-12 text-center max-w-xl font-medium transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transitionTimingFunction: EASE,
          transitionDelay: "260ms",
        }}
      >
        {t.highlight}
      </p>

      <div className="relative flex gap-3 md:gap-8">
        {units.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white/5 border border-ujjain-gold/30 rounded-xl px-4 md:px-8 py-6 min-w-[75px] md:min-w-[120px] hover:border-ujjain-gold hover:-translate-y-1 hover:shadow-lg hover:shadow-ujjain-gold/10 transition-all duration-300"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 600ms ${EASE}, transform 600ms ${EASE}, border-color 300ms, box-shadow 300ms`,
              transitionDelay: visible ? `${340 + index * 100}ms` : "0ms",
            }}
          >
            <span className="text-3xl md:text-6xl font-bold text-ujjain-gold tabular-nums">
              <FlipValue value={item.value} />
            </span>
            <span className="text-ujjain-cream/70 text-xs md:text-sm mt-2 tracking-wide uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <p
        className="relative text-ujjain-cream/40 text-xs mt-8 text-center italic transition-opacity duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transitionDelay: "700ms",
          transitionTimingFunction: EASE,
        }}
      >
        {t.disclaimer}
      </p>

      <style jsx>{`
        @keyframes countdown-slide-in {
          from {
            transform: translateY(60%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes countdown-slide-out {
          from {
            transform: translateY(0);
            opacity: 1;
          }
          to {
            transform: translateY(-60%);
            opacity: 0;
          }
        }
        @keyframes countdown-drift-1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -20px);
          }
        }
        @keyframes countdown-drift-2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-25px, 25px);
          }
        }
        .animate-countdown-drift-1 {
          animation: countdown-drift-1 12s ease-in-out infinite;
        }
        .animate-countdown-drift-2 {
          animation: countdown-drift-2 14s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
