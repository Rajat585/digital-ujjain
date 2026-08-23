"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/**
 * AutoCarousel — lightweight, dependency-free, high-performance auto-playing
 * image carousel. Replaces the old procedural Three.js "360°" scenes.
 *
 * Perf notes:
 * - Only opacity + transform are animated (both GPU-compositable, no layout
 *   thrash). No per-frame JS (no useFrame/rAF loop) — CSS transitions do the
 *   work, so this is dramatically cheaper than a WebGL canvas.
 * - Images use native lazy-loading except the first (priority) slide.
 * - Auto-play pauses on hover/touch/focus so it never fights the user.
 *
 * Props:
 *   slides: [{ src, alt, captionHi, captionEn }]
 *   intervalMs: number (default 4500)
 *   lang: "hi" | "en"
 *   heightClass: tailwind height classes for the frame
 *   credit: optional string shown bottom-right (e.g. "Photos via Wikimedia Commons")
 */
export default function AutoCarousel({
  slides,
  intervalMs = 4500,
  lang = "hi",
  heightClass = "h-screen",
  credit,
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const count = slides?.length || 0;

  const goTo = useCallback((i) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [paused, count, intervalMs]);

  if (!count) return null;

  return (
    <div
      className={`relative w-full ${heightClass} overflow-hidden bg-ujjain-dark`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        setPaused(true);
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - (touchStartX.current ?? 0);
        if (dx > 40) prev();
        else if (dx < -40) next();
        setTimeout(() => setPaused(false), 2000);
      }}
    >
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt || ""}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "auto"}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{
            opacity: i === index ? 1 : 0,
            transform: i === index ? "scale(1.06)" : "scale(1)",
            transition:
              i === index
                ? "opacity 1s ease, transform 8s ease-out"
                : "opacity 1s ease",
            zIndex: i === index ? 1 : 0,
          }}
        />
      ))}

      {/* darken for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/70 z-[2] pointer-events-none" />

      {/* caption */}
      {(slides[index].captionHi || slides[index].captionEn) && (
        <div className="absolute bottom-20 left-0 right-0 text-center z-[3] px-4 pointer-events-none">
          <p className="text-ujjain-cream/90 text-sm md:text-base">
            {lang === "hi" ? slides[index].captionHi : slides[index].captionEn}
          </p>
        </div>
      )}

      {/* prev/next arrows */}
      {count > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-[3] w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-ujjain-gold text-lg flex items-center justify-center transition-colors"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-[3] w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-ujjain-gold text-lg flex items-center justify-center transition-colors"
          >
            ›
          </button>
        </>
      )}

      {/* dots */}
      {count > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-[3] flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-ujjain-gold" : "w-2 bg-ujjain-cream/40 hover:bg-ujjain-cream/70"
              }`}
            />
          ))}
        </div>
      )}

      {credit && (
        <div className="absolute bottom-2 right-3 z-[3] text-[10px] text-ujjain-cream/50">
          {credit}
        </div>
      )}
    </div>
  );
}
