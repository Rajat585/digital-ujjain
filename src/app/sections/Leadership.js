"use client";
import { useLanguage } from "../components/LanguageContext";

const text = {
  hi: {
    title: "नेता का संदेश",
    subtitle: "उज्जैन के विकास और सिंहस्थ 2028 के विज़न पर एक संदेश",
    alt: "उज्जैन विज़न",
    comingSoon: "वीडियो जल्द ही अपलोड होगा",
  },
  en: {
    title: "Leader's Message",
    subtitle: "A message on Ujjain's development and the vision for Simhastha 2028",
    alt: "Ujjain Vision",
    comingSoon: "Video coming soon",
  },
  hinglish: {
    title: "Neta Ka Sandesh",
    subtitle: "Ujjain ke vikas aur Simhastha 2028 ke vision par ek sandesh",
    alt: "Ujjain Vision",
    comingSoon: "Video jald hi upload hoga",
  },
};

export default function Leadership() {
  const { lang } = useLanguage();
  const t = text[lang];

  return (
    <section id="leadership" className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark">
      <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">{t.title}</h2>
      <p className="text-ujjain-cream mb-12 text-center max-w-xl">{t.subtitle}</p>

      <div className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden border border-ujjain-gold/30 relative">
        <img
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Narmada%20river%20from%20mahakaleshwar%20temple%2C%20Ujjain.jpg"
          alt={t.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3">
          <button className="w-16 h-16 rounded-full bg-ujjain-gold flex items-center justify-center text-2xl hover:scale-110 transition">
            ▶️
          </button>
          <p className="text-ujjain-cream text-sm">{t.comingSoon}</p>
        </div>
      </div>
    </section>
  );
}