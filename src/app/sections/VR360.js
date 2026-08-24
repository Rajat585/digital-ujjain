"use client";
import { useState } from "react";
import AutoCarousel from "../components/AutoCarousel";
import { useLanguage } from "../components/LanguageContext";

// Real photos via Wikimedia Commons — same sourcing pattern as Gallery.js,
// so no binary assets need to live in this repo.
const wikiImg = (filename) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;

const waypoints = [
  {
    id: "ramghat",
    nameHi: "Ram Ghat",
    nameEn: "Ram Ghat",
    icon: "🛕",
    slides: [
      {
        src: wikiImg("Shri Ram Ghat 02.jpg"),
        captionHi: "Ram Ghat — Simhastha ka mukhya snan sthal",
        captionEn: "Ram Ghat — the main bathing site of Simhastha",
      },
      {
        src: wikiImg("Ram Ghat and Kshipra river , Ujjain - panoramio.jpg"),
        captionHi: "Ram Ghat aur Shipra nadi ka drishya",
        captionEn: "Ram Ghat and the Shipra river",
      },
      {
        src: wikiImg("Kshipra aarti.jpg"),
        captionHi: "Shipra nadi ki sandhya aarti",
        captionEn: "Evening aarti on the Shipra river",
      },
      {
        src: wikiImg("Ujjain, Ram Ghat (9840921865).jpg"),
        captionHi: "Ram Ghat, ek aur drishya",
        captionEn: "Ram Ghat, another view",
      },
    ],
  },
  {
    id: "mahakal",
    nameHi: "Mahakaleshwar Mandir",
    nameEn: "Mahakaleshwar Temple",
    icon: "🙏",
    slides: [
      {
        src: wikiImg("Mahakal Temple Ujjain.JPG"),
        captionHi: "Shri Mahakaleshwar Jyotirlinga Mandir",
        captionEn: "Shri Mahakaleshwar Jyotirlinga Temple",
      },
      {
        src: wikiImg("Shri Mahakaleshwer Temple at Night ujjain - panoramio.jpg"),
        captionHi: "Raat mein Mahakaleshwar Mandir",
        captionEn: "Mahakaleshwar Temple at night",
      },
      {
        src: wikiImg("Narmada river from mahakaleshwar temple, Ujjain.jpg"),
        captionHi: "Mahakaleshwar Mandir se nadi ka drishya",
        captionEn: "River view from Mahakaleshwar Temple",
      },
      {
        src: wikiImg("Shri Mahakaleshwar Temple Ujjain - panoramio (2).jpg"),
        captionHi: "Mahakaleshwar Mandir, doosra drishya",
        captionEn: "Mahakaleshwar Temple, another view",
      },
    ],
  },
  {
    id: "corridor",
    nameHi: "Mahakal Lok Corridor",
    nameEn: "Mahakal Lok Corridor",
    icon: "🏛️",
    slides: [
      {
        src: wikiImg("MAHAKAL LOK UJJAIN.jpg"),
        captionHi: "Mahakal Lok corridor",
        captionEn: "The Mahakal Lok corridor",
      },
      {
        src: wikiImg("Ujjain Mahakal Temple.jpg"),
        captionHi: "Ujjain ka Mahakal Mandir complex",
        captionEn: "The Mahakal Temple complex, Ujjain",
      },
    ],
  },
  {
    id: "kalbhairav",
    nameHi: "Kal Bhairav Ghat",
    nameEn: "Kal Bhairav Ghat",
    icon: "🌊",
    slides: [
      {
        src: wikiImg("Kal Bhairav temple Ujjain.jpg"),
        captionHi: "Kal Bhairav Mandir, Shipra tat",
        captionEn: "Kal Bhairav Temple, on the Shipra bank",
      },
      {
        src: wikiImg("Kalabhairava Temple Ujjain.JPG"),
        captionHi: "Kal Bhairav Mandir ka bahari drishya",
        captionEn: "Exterior view of Kal Bhairav Temple",
      },
      {
        src: wikiImg("Shri Kaal Bhairav Mandir Main Gate Ujjain - panoramio.jpg"),
        captionHi: "Kal Bhairav Mandir ka mukhya dwar",
        captionEn: "Main gate of Kal Bhairav Temple",
      },
    ],
  },
];

const text = {
  hi: {
    title: "Simhastha Darshan",
    subtitle: "Neeche button dabao aur har sthal ki asli tasveerein dekho",
  },
  en: {
    title: "Simhastha Darshan",
    subtitle: "Tap a spot below to see real photos from each location",
  },
  hinglish: {
    title: "360° Simhastha Walkthrough",
    subtitle: "Neeche button dabao, ghumo aur khud dekho",
  },
};

export default function VR360() {
  const { lang } = useLanguage();
  const t = text[lang] || text.hi;
  const [activeId, setActiveId] = useState(waypoints[0].id);
  const activeWaypoint = waypoints.find((w) => w.id === activeId);

  return (
    <section id="vr-zone" className="h-dvh min-h-[560px] w-full bg-ujjain-dark relative overflow-hidden">
      <div className="absolute top-8 sm:top-10 left-0 right-0 text-center z-10 pointer-events-none px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-ujjain-gold drop-shadow-lg">
          {t.title}
        </h2>
        <p className="text-ujjain-cream mt-2 drop-shadow text-sm sm:text-base">{t.subtitle}</p>
      </div>

      {/* key={activeId} forces a clean remount so each landmark's carousel
          restarts its own auto-play + fade cycle from slide 0 */}
      <AutoCarousel
        key={activeId}
        slides={activeWaypoint.slides}
        lang={lang}
        intervalMs={4000}
        heightClass="h-full"
        credit="Photos via Wikimedia Commons"
      />

      {/* Waypoint navigation */}
      <div className="absolute bottom-24 left-0 right-0 z-10 flex flex-wrap justify-center gap-2 px-4">
        {waypoints.map((w) => (
          <button
            key={w.id}
            onClick={() => setActiveId(w.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border${activeId === w.id
              ? "bg-ujjain-gold text-ujjain-dark border-ujjain-gold"
              : "bg-black/40 text-ujjain-cream border-ujjain-gold/40 hover:border-ujjain-gold"
              }`}
          >
            <span className="mr-1">{w.icon}</span>
            {lang !== "en" ? w.nameHi : w.nameEn}
          </button>
        ))}
      </div>
    </section>
  );
}