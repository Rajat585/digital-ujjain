"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useLanguage } from "../components/LanguageContext";

// Real, verified photos from Wikimedia Commons — Special:FilePath pattern,
// same approach as Gallery.js
const wikiImg = (filename) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;

const slides = [
  {
    src: wikiImg("Mahakal-sawari-Ujjain.jpg"),
    alt: "Mahakal Shahi Sawari procession, Ujjain",
    captions: {
      hi: "महाकाल की शाही सवारी",
      en: "Mahakal's Grand Shahi Sawari",
      hinglish: "Mahakal ki Shahi Sawari",
    },
  },
  {
    src: wikiImg("Ujjain Mahakal Temple 02 baba (cropped).jpg"),
    alt: "Mahakaleshwar Temple shikhar darshan, Ujjain",
    captions: {
      hi: "महाकालेश्वर मंदिर — शिखर दर्शन",
      en: "Mahakaleshwar Temple — Shikhar Darshan",
      hinglish: "Mahakaleshwar Mandir — Shikhar Darshan",
    },
  },
  {
    src: wikiImg("Pandit doing shipra aarti.jpg"),
    alt: "Kshipra river maha-aarti, Ujjain",
    captions: {
      hi: "क्षिप्रा नदी की महाआरती",
      en: "Kshipra River Maha-Aarti",
      hinglish: "Kshipra Nadi ki Maha-Aarti",
    },
  },
];

const SLIDE_DURATION = 5000; // ms — slightly longer so the Ken Burns zoom + caption feel finished, not rushed
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)"; // smooth "ease-in-out" but with a nicer, more premium curve than the default

export default function Gateway3D() {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [loadedSrcs, setLoadedSrcs] = useState(() => new Set());
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0); // forces the progress bar to restart its CSS animation cleanly

  const timerRef = useRef(null);

  const goTo = useCallback((i) => {
    setIndex(i);
    setProgressKey((k) => k + 1); // restart the progress-bar animation immediately on manual navigation
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
    setProgressKey((k) => k + 1);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;
    timerRef.current = setInterval(goNext, SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [isPaused, goNext, progressKey]);

  const markLoaded = (src) =>
    setLoadedSrcs((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));

  return (
    <section
      className="h-dvh min-h-[560px] w-full bg-ujjain-dark relative overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, i) => {
        const isActive = i === index;
        return (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ${
              isActive
                ? "opacity-100 z-[1]"
                : "opacity-0 pointer-events-none z-0"
            }`}
            style={{ transitionTimingFunction: EASE }}
          >
            {!loadedSrcs.has(slide.src) && (
              <div className="absolute inset-0 bg-ujjain-dark animate-pulse" />
            )}

            {/* Ken Burns: slow continuous zoom while a slide is active, resets when it isn't */}
            <div className="w-full h-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover will-change-transform"
                style={{
                  transform: isActive ? "scale(1.12)" : "scale(1)",
                  transition: isActive
                    ? `transform ${SLIDE_DURATION + 1400}ms ${EASE}`
                    : "transform 0ms",
                }}
                onLoad={() => markLoaded(slide.src)}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Caption: fades + slides up on entry, independent of the image transform */}
            <div className="absolute bottom-16 left-0 right-0 text-center px-4 overflow-hidden">
              <p
                className={`text-ujjain-cream text-lg sm:text-2xl font-medium tracking-wide transition-all duration-[900ms] ${
                  isActive
                    ? "opacity-100 translate-y-0 delay-300"
                    : "opacity-0 translate-y-3"
                }`}
                style={{ transitionTimingFunction: EASE }}
              >
                {slide.captions[lang] || slide.captions.en}
              </p>
            </div>
          </div>
        );
      })}

      {/* Prev / Next arrows — hidden until hover/focus for a clean look, smooth scale-in */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={goPrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm border border-ujjain-gold/30 text-ujjain-cream flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 scale-90 group-hover:scale-100 hover:!scale-110 hover:bg-ujjain-gold/20 hover:border-ujjain-gold transition-all duration-300 ease-out"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M15 18l-6-6 6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={goNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm border border-ujjain-gold/30 text-ujjain-cream flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 scale-90 group-hover:scale-100 hover:!scale-110 hover:bg-ujjain-gold/20 hover:border-ujjain-gold transition-all duration-300 ease-out"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M9 18l6-6-6-6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dots + per-slide progress bar */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2.5 z-10">
        {slides.map((_, i) => {
          const isActive = i === index;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`relative h-2 rounded-full overflow-hidden bg-ujjain-gold/25 transition-all duration-500 ease-out hover:bg-ujjain-gold/50 hover:scale-y-125 ${
                isActive ? "w-10" : "w-2"
              }`}
              style={{ transitionTimingFunction: EASE }}
            >
              {isActive && (
                <span
                  key={progressKey}
                  className="absolute inset-y-0 left-0 bg-ujjain-gold rounded-full"
                  style={{
                    animation: isPaused
                      ? "none"
                      : `gateway3d-progress ${SLIDE_DURATION}ms linear forwards`,
                    width: isPaused ? "100%" : undefined,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] tracking-wide text-ujjain-cream/40">
        Photos via Wikimedia Commons
      </div>

      <style jsx>{`
        @keyframes gateway3d-progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
