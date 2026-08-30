"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../components/LanguageContext";

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

const text = {
  hi: {
    title: "पुरानी उज्जैन \\ नई उज्जैन",
    subtitle: "स्लाइडर को खींचकर देखिए कितना बदलाव आया है",
    newLabel: "✨ नई उज्जैन — 2026",
    oldLabel: "📜 पुरानी उज्जैन",
    newAlt: "नई उज्जैन - महाकाल लोक",
    oldAlt: "पुरानी उज्जैन",
  },
  en: {
    title: "Old Ujjain vs New Ujjain",
    subtitle: "Drag the slider to see how much has changed",
    newLabel: "✨ New Ujjain — 2026",
    oldLabel: "📜 Old Ujjain",
    newAlt: "New Ujjain - Mahakal Lok",
    oldAlt: "Old Ujjain",
  },
  hinglish: {
    title: "Purani Ujjain vs Nayi Ujjain",
    subtitle: "Slider ko draw karke dekho kitna badlaav aaya hai",
    newLabel: "✨ Nayi Ujjain — 2026",
    oldLabel: "📜 Purani Ujjain",
    newAlt: "Nayi Ujjain - Mahakal Lok",
    oldAlt: "Purani Ujjain",
  },
};

export default function OldVsNew() {
  const { lang } = useLanguage();
  const t = text[lang];
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Reveal the whole section (heading, subtitle, frame) once it scrolls into view
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
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Once visible, play a one-time auto "sweep" of the slider so first-time
  // visitors immediately understand it's draggable, then hand control back.
  useEffect(() => {
    if (!visible || hasInteracted) return undefined;
    const t1 = setTimeout(() => setSliderPosition(72), 900);
    const t2 = setTimeout(() => setSliderPosition(32), 1750);
    const t3 = setTimeout(() => setSliderPosition(50), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [visible, hasInteracted]);

  const handleChange = (e) => {
    setHasInteracted(true);
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section
      ref={sectionRef}
      id="vikas"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark"
    >
      <h2
        className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transitionTimingFunction: EASE,
        }}
      >
        {t.title}
      </h2>
      <p
        className="text-ujjain-cream mb-10 text-center max-w-xl transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transitionTimingFunction: EASE,
          transitionDelay: "120ms",
        }}
      >
        {t.subtitle}
      </p>

      <div
        className="relative w-full max-w-4xl h-[280px] md:h-[480px] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.25)] border-2 border-ujjain-gold/40 transition-all duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.97)",
          transitionTimingFunction: EASE,
          transitionDelay: "220ms",
        }}
      >
        <div className="absolute inset-0">
          <img
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Ujjain%20Mahakal%20Temple.jpg"
            alt={t.newAlt}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-5 right-5 bg-ujjain-gold text-ujjain-dark px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-0.5">
            {t.newLabel}
          </div>
        </div>
        <div
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            transition: isDragging ? "none" : `clip-path 700ms ${EASE}`,
          }}
        >
          <img
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Mahakal%20Temple%20Ujjain.JPG"
            alt={t.oldAlt}
            className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute bottom-5 left-5 bg-white/10 backdrop-blur-md text-ujjain-cream px-4 py-2 rounded-full font-bold text-sm border border-white/30 transition-transform duration-300 ease-out hover:scale-105 hover:-translate-y-0.5">
            {t.oldLabel}
          </div>
        </div>

        <div
          className="absolute top-0 bottom-0 w-[3px] bg-ujjain-gold shadow-[0_0_15px_3px_rgba(212,175,55,0.8)] pointer-events-none"
          style={{
            left: `${sliderPosition}%`,
            transition: isDragging ? "none" : `left 700ms ${EASE}`,
          }}
        ></div>

        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-0.5 text-ujjain-gold pointer-events-none transition-transform duration-200"
          style={{
            left: `${sliderPosition}%`,
            transition: isDragging
              ? "transform 200ms ease-out"
              : `left 700ms ${EASE}, transform 200ms ease-out`,
            transform: `translate(-50%, -50%) scale(${isDragging ? 1.2 : 1})`,
            filter: isDragging
              ? "drop-shadow(0 0 10px rgba(212,175,55,1))"
              : "drop-shadow(0 0 6px rgba(212,175,55,0.8))",
          }}
        >
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            <path
              d="M9 2L3 10L9 18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            <path
              d="M5 2L11 10L5 18"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleChange}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        className="w-full max-w-4xl mt-8 h-2 accent-ujjain-saffron cursor-pointer transition-opacity duration-700"
        style={{
          opacity: visible ? 1 : 0,
          transitionTimingFunction: EASE,
          transitionDelay: "320ms",
        }}
      />
    </section>
  );
}
