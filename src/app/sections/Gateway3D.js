"use client";
import { useEffect, useState } from "react";
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

export default function Gateway3D() {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [loadedSrcs, setLoadedSrcs] = useState(() => new Set());

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const markLoaded = (src) =>
    setLoadedSrcs((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));

  return (
    <section className="h-dvh min-h-[560px] w-full bg-ujjain-dark relative overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {!loadedSrcs.has(slide.src) && (
            <div className="absolute inset-0 bg-ujjain-dark animate-pulse" />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            onLoad={() => markLoaded(slide.src)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-16 left-0 right-0 text-center px-4">
            <p className="text-ujjain-cream text-lg sm:text-2xl font-medium tracking-wide">
              {slide.captions[lang] || slide.captions.en}
            </p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-ujjain-gold" : "w-2 bg-ujjain-gold/40"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] tracking-wide text-ujjain-cream/40">
        Photos via Wikimedia Commons
      </div>
    </section>
  );
}
