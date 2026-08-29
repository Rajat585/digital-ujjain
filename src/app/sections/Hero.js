"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "../components/LanguageContext";

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

export default function Hero() {
  const { lang } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // small delay so the entrance plays after the page Loader has faded out
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, []);

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

  const words = text[lang].title.split(" ");

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Background image — slow continuous Ken Burns zoom, never fully resets so it always feels alive */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://commons.wikimedia.org/wiki/Special:FilePath/Swayambhu%20and%20Dakshinamukhi%20in%20Ujjain.jpg')",
          transform: loaded ? "scale(1.15)" : "scale(1.1)",
          transition: `transform 20000ms ${EASE}`,
        }}
      ></div>

      {/* Dark overlay for text readability — fades in with the section on first paint */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-ujjain-dark/70 via-ujjain-dark/60 to-ujjain-dark transition-opacity duration-[1200ms]"
        style={{ opacity: loaded ? 1 : 0, transitionTimingFunction: EASE }}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-ujjain-gold mb-4 drop-shadow-lg flex flex-wrap justify-center gap-x-4">
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-700"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${200 + i * 150}ms`,
                transitionTimingFunction: EASE,
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          className="text-xl md:text-2xl text-ujjain-cream max-w-2xl drop-shadow-md transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transitionDelay: `${200 + words.length * 150 + 150}ms`,
            transitionTimingFunction: EASE,
          }}
        >
          {text[lang].subtitle}
        </p>

        {/* Scroll indicator — calm breathing mouse icon instead of a hard bounce */}
        <div
          className="mt-12 flex flex-col items-center gap-2 text-ujjain-saffron transition-all duration-700"
          style={{
            opacity: loaded ? 1 : 0,
            transitionDelay: `${200 + words.length * 150 + 500}ms`,
            transitionTimingFunction: EASE,
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-ujjain-saffron/70 flex justify-center pt-2">
            <span className="w-1 h-2 rounded-full bg-ujjain-saffron animate-hero-scroll-dot" />
          </div>
          <span className="text-xs tracking-wide">{text[lang].scroll}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes hero-scroll-dot {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          70% {
            transform: translateY(10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 0;
          }
        }
        .animate-hero-scroll-dot {
          animation: hero-scroll-dot 1.6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
