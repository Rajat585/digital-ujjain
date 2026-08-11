"use client";
import { useState } from "react";
import { useLanguage } from "../components/LanguageContext";

const text = {
  hi: {
    title: "Purani Ujjain vs Nayi Ujjain",
    subtitle: "Slider ko draw karke dekho kitna badlaav aaya hai",
    newLabel: "✨ Nayi Ujjain — 2026",
    oldLabel: "📜 Purani Ujjain",
    newAlt: "Nayi Ujjain - Mahakal Lok",
    oldAlt: "Purani Ujjain",
  },
  en: {
    title: "Old Ujjain vs New Ujjain",
    subtitle: "Drag the slider to see how much has changed",
    newLabel: "✨ New Ujjain — 2026",
    oldLabel: "📜 Old Ujjain",
    newAlt: "New Ujjain - Mahakal Lok",
    oldAlt: "Old Ujjain",
  },
};

export default function OldVsNew() {
  const { lang } = useLanguage();
  const t = text[lang];
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <section id="vikas" className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark">
      <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">{t.title}</h2>
      <p className="text-ujjain-cream mb-10 text-center max-w-xl">{t.subtitle}</p>

      <div className="relative w-full max-w-4xl h-[280px] md:h-[480px] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.25)] border-2 border-ujjain-gold/40">
        <div className="absolute inset-0">
          <img
            src="https://commons.wikimedia.org/wiki/Special:FilePath/MAHAKAL%20LOK%20UJJAIN.jpg"
            alt={t.newAlt}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-5 right-5 bg-ujjain-gold text-ujjain-dark px-4 py-2 rounded-full font-bold text-sm shadow-lg">
            {t.newLabel}
          </div>
        </div>

        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
          <img
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Mahakal%20Temple%20Ujjain.JPG"
            alt={t.oldAlt}
            className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-5 left-5 bg-white/10 backdrop-blur-md text-ujjain-cream px-4 py-2 rounded-full font-bold text-sm border border-white/30">
            {t.oldLabel}
          </div>
        </div>

        <div
          className="absolute top-0 bottom-0 w-[3px] bg-ujjain-gold shadow-[0_0_15px_3px_rgba(212,175,55,0.8)] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        ></div>

        <div
          className="absolute top-1/2 w-12 h-12 -translate-y-1/2 -translate-x-1/2 rounded-full bg-ujjain-gold border-4 border-ujjain-dark shadow-[0_0_20px_rgba(212,175,55,0.9)] flex items-center justify-center text-ujjain-dark font-bold text-lg pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          ↔
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(e.target.value)}
        className="w-full max-w-4xl mt-8 h-2 accent-ujjain-saffron cursor-pointer"
      />
    </section>
  );
}