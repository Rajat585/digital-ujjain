"use client";
import { useState, useEffect } from "react";

const TITLE = "Digital Ujjain";
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);
  const [lettersIn, setLettersIn] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLettersIn(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let raf;
    let start = null;
    const duration = 1800;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    function step(ts) {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / duration, 1);
      setProgress(Math.round(easeOutCubic(t) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => setExiting(true), 250);
      }
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!exiting) return;
    const letterExitTime = TITLE.length * 20 + 350;
    const t = setTimeout(() => setHide(true), letterExitTime + 400);
    return () => clearTimeout(t);
  }, [exiting]);

  if (hide) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-ujjain-dark flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ${exiting ? "opacity-0" : "opacity-100"}`}
      style={{ transitionTimingFunction: EASE, transitionDelay: exiting ? `${TITLE.length * 20 + 350}ms` : "0ms" }}
    >
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-ujjain-saffron/10 blur-[80px] animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-ujjain-gold/10 blur-[80px] animate-pulse" style={{ animationDelay: "600ms" }} />

      <div className="text-4xl md:text-6xl font-bold text-ujjain-gold mb-6 tracking-wide flex relative z-10">
        {TITLE.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block transition-all duration-500"
            style={{
              opacity: exiting ? 0 : lettersIn ? 1 : 0,
              transform: exiting ? "translateY(-14px) scale(1.15)" : lettersIn ? "translateY(0) scale(1)" : "translateY(16px) scale(1)",
              transitionDuration: exiting ? "350ms" : "500ms",
              transitionDelay: exiting ? `${i * 20}ms` : `${i * 35}ms`,
              transitionTimingFunction: EASE,
              whiteSpace: char === " " ? "pre" : "normal",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      <div className={`w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-3 relative z-10 transition-opacity duration-300 ${exiting ? "opacity-0" : "opacity-100"}`}>
        <div
          className="h-full bg-gradient-to-r from-ujjain-saffron to-ujjain-gold relative"
          style={{ width: `${progress}%`, transitionProperty: "width", transitionDuration: "60ms", transitionTimingFunction: "linear" }}
        >
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-ujjain-gold blur-[6px] opacity-80" />
        </div>
      </div>

      <div className={`text-ujjain-cream/60 text-sm tabular-nums relative z-10 transition-opacity duration-300 ${exiting ? "opacity-0" : "opacity-100"}`}>
        {progress}%
      </div>
    </div>
  );
}