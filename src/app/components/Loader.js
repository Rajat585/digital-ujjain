"use client";
import { useState, useEffect } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setHide(true), 400);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (hide) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-ujjain-dark flex flex-col items-center justify-center transition-opacity duration-500 ${
        progress >= 100 ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-4xl md:text-6xl font-bold text-ujjain-gold mb-6 tracking-wide">
        Digital Ujjain
      </div>

      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-ujjain-saffron to-ujjain-gold transition-all duration-100"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="text-ujjain-cream/60 text-sm">{progress}%</div>
    </div>
  );
}
