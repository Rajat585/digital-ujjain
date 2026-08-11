"use client";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();

  const text = {
    hi: { vikas: "Vikas", simhastha: "Simhastha", map: "Map", contact: "Contact" },
    en: { vikas: "Development", simhastha: "Simhastha", map: "Map", contact: "Contact" },
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-ujjain-dark/80 backdrop-blur-md border-b border-ujjain-gold/20">
      <div className="text-2xl font-bold text-ujjain-gold">
        Ujjain
      </div>
      <div className="hidden md:flex gap-8 text-ujjain-cream text-sm items-center">
        <a href="#vikas" className="hover:text-ujjain-saffron transition">{text[lang].vikas}</a>
        <a href="#simhastha" className="hover:text-ujjain-saffron transition">{text[lang].simhastha}</a>
        <a href="#map" className="hover:text-ujjain-saffron transition">{text[lang].map}</a>
        <a href="#contact" className="hover:text-ujjain-saffron transition">{text[lang].contact}</a>
        <button
          onClick={toggleLang}
          className="border border-ujjain-gold/40 text-ujjain-gold px-3 py-1 rounded-full text-xs font-semibold hover:bg-ujjain-gold/10 transition"
        >
          {lang === "hi" ? "EN" : "हिं"}
        </button>
      </div>
      <button
        onClick={toggleLang}
        className="md:hidden border border-ujjain-gold/40 text-ujjain-gold px-3 py-1 rounded-full text-xs font-semibold"
      >
        {lang === "hi" ? "EN" : "हिं"}
      </button>
    </nav>
  );
}