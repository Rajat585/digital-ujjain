"use client";
import AutoCarousel from "../components/AutoCarousel";
import { useLanguage } from "../components/LanguageContext";

// Real photos, sourced the same way as Gallery.js — Wikimedia Commons
// Special:FilePath redirects, so no binary assets need to live in this repo.
const wikiImg = (filename) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;

const slides = [
  {
    src: wikiImg("MAHAKAL LOK UJJAIN.jpg"),
    alt: "Mahakal Lok corridor gateway, Ujjain",
    captionHi: "Mahakal Lok — Mahakaleshwar Mandir ka bhavya dwar",
    captionEn: "Mahakal Lok — the grand gateway to Mahakaleshwar Temple",
  },
  {
    src: wikiImg("Shri Kaal Bhairav Mandir Main Gate Ujjain - panoramio.jpg"),
    alt: "Kal Bhairav Mandir main gate, Ujjain",
    captionHi: "Kal Bhairav Mandir ka mukhya dwar",
    captionEn: "The main gate of Kal Bhairav Temple",
  },
  {
    src: wikiImg("Mahakal Temple Ujjain.JPG"),
    alt: "Mahakaleshwar Temple, Ujjain",
    captionHi: "Shri Mahakaleshwar Jyotirlinga Mandir",
    captionEn: "Shri Mahakaleshwar Jyotirlinga Temple",
  },
  {
    src: wikiImg("Ujjain Mahakal Temple.jpg"),
    alt: "Mahakal Temple exterior, Ujjain",
    captionHi: "Mahakaleshwar Mandir, ek aur drishya",
    captionEn: "Mahakaleshwar Temple, another view",
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
        credit="Photos via Wikimedia Commons"
        priority
      />
    </section>
  );
}