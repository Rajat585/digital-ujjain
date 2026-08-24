"use client";
import { useLanguage } from "../components/LanguageContext";

export default function Hero() {
  const { lang } = useLanguage();

  const text = {
    hi: {
      title: "डिजिटल उज्जैन",
      subtitle: "महाकाल की नगरी — इतिहास से भविष्य तक एक यात्रा",
      scroll: "स्क्रॉल करें",
    },
    en: {
      title: "Digital Ujjain",
      subtitle: "City of Mahakal — A Journey From History To The Future",
      scroll: "Scroll Down",
    },
    hinglish: {
      title: "Digital Ujjain",
      subtitle: "Mahakal Ki Nagri — Itihaas Se Bhavishya Tak Ek Yatra",
      scroll: "Scroll Karo",
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage:
            "url('https://commons.wikimedia.org/wiki/Special:FilePath/Swayambhu%20and%20Dakshinamukhi%20in%20Ujjain.jpg')",
        }}
      ></div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-ujjain-dark/70 via-ujjain-dark/60 to-ujjain-dark"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-ujjain-gold mb-4 drop-shadow-lg">
          {text[lang].title}
        </h1>
        <p className="text-xl md:text-2xl text-ujjain-cream max-w-2xl drop-shadow-md">
          {text[lang].subtitle}
        </p>
        <div className="mt-10 animate-bounce text-ujjain-saffron">
          ↓ {text[lang].scroll}
        </div>
      </div>
    </section>
  );
}
