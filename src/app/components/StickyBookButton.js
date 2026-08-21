"use client";
import { useLanguage } from "./LanguageContext";

const label = { hi: "Book Now ↓", en: "Book Now ↓" };

export default function StickyBookButton() {
  const { lang } = useLanguage();

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToBooking}
      className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-ujjain-gold text-ujjain-dark font-bold py-3 rounded-full shadow-lg shadow-black/40 hover:bg-ujjain-saffron transition"
    >
      {label[lang]}
    </button>
  );
}