"use client";
import AutoCarousel from "../components/AutoCarousel";
import { useLanguage } from "../components/LanguageContext";

// ─────────────────────────────────────────────────────────────
// Apni photos yahan daalo: public/media/gateway/1.jpg, 2.jpg, ...
// Naya slide add karna ho — bas neeche ek naya entry jodo aur
// matching filename public/media/gateway/ folder mein daal do.
// Photo hatani/replace karni ho — bas file replace karo (same
// naam rakhna) ya neeche se entry hata do.
// ─────────────────────────────────────────────────────────────
const slides = [
  {
    src: "/media/gateway/1.jpg",
    alt: "Mahamrityunjay Dwar",
    captionHi: "Mahamrityunjay Dwar — Simhastha ka pavitra pravesh",
    captionEn: "Mahamrityunjay Dwar — the sacred gateway to Simhastha",
  },
  {
    src: "/media/gateway/2.jpg",
    alt: "Shahi Sawari",
    captionHi: "Shahi Sawari — Mahakal ki rajsi savaari",
    captionEn: "Shahi Sawari — the royal procession of Lord Mahakal",
  },
  {
    src: "/media/gateway/3.jpg",
    alt: "Mahakaleshwar Mandir light show",
    captionHi: "Mahakaleshwar Mandir — bhavya light show",
    captionEn: "Mahakaleshwar Temple — the grand light show",
  },
  {
    src: "/media/gateway/4.jpg",
    alt: "Ghat Maha Aarti",
    captionHi: "Ghat par Maha Aarti — Shipra tat ka drishya",
    captionEn: "Maha Aarti at the ghat — on the banks of the Shipra",
  },
  {
    src: "/media/gateway/5.jpg",
    alt: "Mahakal Lok Corridor",
    captionHi: "Mahakal Lok — bhavya corridor",
    captionEn: "Mahakal Lok — the grand corridor",
  },
  {
    src: "/media/gateway/6.jpg",
    alt: "Ujjain gateway photo 6",
    captionHi: "Simhastha 2028",
    captionEn: "Simhastha 2028",
  },
  {
    src: "/media/gateway/7.jpg",
    alt: "Ujjain gateway photo 7",
    captionHi: "Simhastha 2028",
    captionEn: "Simhastha 2028",
  },
];

export default function Gateway3D() {
  const { lang } = useLanguage();

  return (
    <section className="h-dvh min-h-[560px] w-full bg-ujjain-dark relative overflow-hidden">
      <AutoCarousel
        slides={slides}
        lang={lang}
        intervalMs={4500}
        heightClass="h-full"
        credit=""
        priority
      />
    </section>
  );
}