"use client";
import { useState, useEffect } from "react";

const TITLE = "Digital Ujjain";
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);
  const [lettersIn, setLettersIn] = useState(false);

  useEffect(() => {
    // let the title animate in a beat before the progress bar starts moving
    const t = setTimeout(() => setLettersIn(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setHide(true), 500);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (hide) return null;

  const done = progress >= 100;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-ujjain-dark flex flex-col items-center justify-center transition-all duration-500 ${
        done ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
      style={{ transitionTimingFunction: EASE }}
    >
      <div className="text-4xl md:text-6xl font-bold text-ujjain-gold mb-6 tracking-wide flex">
        {TITLE.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block transition-all duration-500"
            style={{
              opacity: lettersIn ? 1 : 0,
              transform: lettersIn ? "translateY(0)" : "translateY(16px)",
              transitionDelay: `${i * 35}ms`,
              transitionTimingFunction: EASE,
              whiteSpace: char === " " ? "pre" : "normal",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-3 relative">
        <div
          className="h-full bg-gradient-to-r from-ujjain-saffron to-ujjain-gold transition-all duration-100 relative"
          style={{ width: `${progress}%` }}
        >
          {/* soft glow tip that travels with the bar's leading edge */}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-ujjain-gold blur-[6px] opacity-80" />
        </div>
      </div>

      <div className="text-ujjain-cream/60 text-sm tabular-nums">{progress}%</div>
    </div>
  );
}