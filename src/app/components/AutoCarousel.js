"use client";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";

/**
 * AutoCarousel — T.RICKS-style wave drag-slider, rebuilt on Splide.js.
 * 3-up center-focused row on desktop, 1-up with side-peeks on mobile,
 * loop + drag + auto-advance, static wave clip-path over the whole row,
 * and a floating "DRAG" cursor that follows the pointer (desktop only).
 *
 * Props: same API as before —
 *   slides: [{ src, alt, captionHi, captionEn }]
 *   intervalMs: number (default 4500)
 *   lang: "hi" | "en"
 *   credit: optional string shown bottom-left
 *   priority: true for the first carousel on the page (helps LCP)
 */
export default function AutoCarousel({
  slides,
  intervalMs = 4500,
  lang = "hi",
  credit,
  priority = false,
}) {
  const t =
    lang === "hi"
      ? { prev: "Pichhli photo", next: "Agli photo", play: "Auto-play shuru karo", pause: "Auto-play roko" }
      : { prev: "Previous photo", next: "Next photo", play: "Start autoplay", pause: "Pause autoplay" };

  const [brokenSrcs, setBrokenSrcs] = useState(() => new Set());
  const liveSlides = useMemo(
    () => (slides || []).filter((s) => !brokenSrcs.has(s.src)),
    [slides, brokenSrcs]
  );
  const [loadedSrcs, setLoadedSrcs] = useState(() => new Set());
  const [paused, setPaused] = useState(false);
  const [cursorOn, setCursorOn] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const splideRef = useRef(null);
  const wrapRef = useRef(null);

  const markLoaded = (src) =>
    setLoadedSrcs((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));
  const markBroken = (src) =>
    setBrokenSrcs((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));

  const options = useMemo(
    () => ({
      type: "loop",
      perPage: 3,
      perMove: 1,
      focus: "center",
      gap: "1.25rem",
      arrows: false,
      pagination: false,
      drag: true,
      autoplay: !paused,
      interval: intervalMs,
      pauseOnHover: true,
      pauseOnFocus: true,
      speed: 700,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      breakpoints: {
        767: {
          perPage: 1,
          padding: { left: "12%", right: "12%" },
          gap: "0.75rem",
        },
      },
    }),
    [paused, intervalMs]
  );

  const onPointerMove = useCallback((e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  if (!liveSlides.length) return null;

  return (
    <section
      className="relative w-full bg-ujjain-dark py-16 sm:py-24 overflow-hidden"
      aria-roledescription="carousel"
      aria-label={lang === "hi" ? "Simhastha photo slider" : "Simhastha photo slider"}
    >
      <div
        ref={wrapRef}
        className="relative"
        onMouseEnter={() => setCursorOn(true)}
        onMouseLeave={() => setCursorOn(false)}
        onMouseMove={onPointerMove}
        style={{
          clipPath: "polygon(0% 6%, 100% 0%, 100% 94%, 0% 100%)",
        }}
      >
        <Splide
          ref={splideRef}
          options={options}
          hasTrack={false}
          aria-label={lang === "hi" ? "Mandir photos" : "Temple photos"}
        >
          <div className="splide__track">
            <ul className="splide__list">
              {liveSlides.map((slide, i) => {
                const isLoaded = loadedSrcs.has(slide.src);
                return (
                  <SplideSlide key={slide.src}>
                    <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] bg-ujjain-dark overflow-hidden">
                      {!isLoaded && <div className="absolute inset-0 carousel-shimmer" />}
                      <Image
                        src={slide.src}
                        alt={slide.alt || ""}
                        fill
                        sizes="(max-width: 767px) 76vw, 33vw"
                        priority={priority && i === 0}
                        loading={priority && i === 0 ? "eager" : "lazy"}
                        className="object-cover"
                        onLoad={() => markLoaded(slide.src)}
                        onError={() => markBroken(slide.src)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </SplideSlide>
                );
              })}
            </ul>
          </div>
        </Splide>

        {cursorOn && (
          <div
            className="hidden sm:flex pointer-events-none absolute z-10 w-16 h-16 rounded-full bg-ujjain-dark/90 border border-ujjain-gold items-center justify-center text-ujjain-gold text-[11px] tracking-wide"
            style={{ left: cursorPos.x - 32, top: cursorPos.y - 32 }}
          >
            {lang === "hi" ? "GHASEETO" : "DRAG"}
          </div>
        )}
      </div>

      {liveSlides.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
          <button
            type="button"
            aria-label={t.prev}
            onClick={() => splideRef.current?.splide?.go("-1")}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-ujjain-gold/40 hover:border-ujjain-gold text-ujjain-gold flex items-center justify-center transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={paused ? t.play : t.pause}
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
            className="w-8 h-8 rounded-full border border-ujjain-gold/40 hover:border-ujjain-gold text-ujjain-gold flex items-center justify-center transition-colors"
          >
            {paused ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3" /></svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
            )}
          </button>
          <button
            type="button"
            aria-label={t.next}
            onClick={() => splideRef.current?.splide?.go("+1")}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-ujjain-gold/40 hover:border-ujjain-gold text-ujjain-gold flex items-center justify-center transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}

      {credit && (
        <div className="text-center text-[10px] tracking-wide text-ujjain-cream/40 mt-4">
          {credit}
        </div>
      )}
    </section>
  );
}