"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)"; // slight overshoot — a "spring" feel for pops/entrances

const badgesData = {
  hi: [
    { threshold: 20, name: "इतिहास प्रेमी", icon: "📜" },
    { threshold: 45, name: "विकास अन्वेषक", icon: "🏗️" },
    { threshold: 70, name: "भविष्य दृष्टा", icon: "🔮" },
    { threshold: 95, name: "घाट अन्वेषक", icon: "🛕" },
  ],
  en: [
    { threshold: 20, name: "History Buff", icon: "📜" },
    { threshold: 45, name: "Development Explorer", icon: "🏗️" },
    { threshold: 70, name: "Future Visionary", icon: "🔮" },
    { threshold: 95, name: "Ghat Explorer", icon: "🛕" },
  ],
  hinglish: [
    { threshold: 20, name: "History Buff", icon: "📜" },
    { threshold: 45, name: "Vikas Explorer", icon: "🏗️" },
    { threshold: 70, name: "Future Visionary", icon: "🔮" },
    { threshold: 95, name: "Ghat Explorer", icon: "🛕" },
  ],
};

const text = {
  hi: { unlocked: "बैज अनलॉक हुआ!" },
  en: { unlocked: "Badge Unlocked!" },
  hinglish: { unlocked: "Badge Unlocked!" },
};

export default function BadgeSystem() {
  const { lang } = useLanguage();
  const badges = badgesData[lang];
  const t = text[lang];
  const [unlocked, setUnlocked] = useState([]);
  const [toast, setToast] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [justPopped, setJustPopped] = useState(null); // name of the badge currently playing its unlock burst

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      badges.forEach((badge) => {
        if (
          scrollPercent >= badge.threshold &&
          !unlocked.includes(badge.name)
        ) {
          setUnlocked((prev) => [...prev, badge.name]);

          setToast(badge);
          requestAnimationFrame(() => setToastVisible(true));
          setTimeout(() => setToastVisible(false), 2800);
          setTimeout(() => setToast(null), 3200); // stays mounted a bit longer so the exit transition can play

          setJustPopped(badge.name);
          setTimeout(() => setJustPopped(null), 600);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [unlocked, badges]);

  return (
    <>
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 bg-ujjain-gold text-ujjain-dark px-5 py-4 rounded-xl shadow-lg shadow-black/30 flex items-center gap-3 transition-all duration-500"
          style={{
            opacity: toastVisible ? 1 : 0,
            transform: toastVisible
              ? "translateX(0) scale(1)"
              : "translateX(24px) scale(0.9)",
            transitionTimingFunction: EASE,
          }}
        >
          <span
            className="text-3xl inline-block transition-transform duration-500"
            style={{
              transform: toastVisible
                ? "rotate(0deg) scale(1)"
                : "rotate(-15deg) scale(0.6)",
              transitionTimingFunction: EASE,
            }}
          >
            {toast.icon}
          </span>
          <div>
            <div className="font-bold">{t.unlocked}</div>
            <div className="text-sm">{toast.name}</div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 left-6 z-40 flex gap-2">
        {badges.map((badge, index) => {
          const isUnlocked = unlocked.includes(badge.name);
          const isPopping = justPopped === badge.name;
          return (
            <div
              key={index}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border transition-all duration-500 hover:scale-125 hover:-translate-y-1 cursor-default ${
                isUnlocked
                  ? "bg-ujjain-gold border-ujjain-gold shadow-md shadow-ujjain-gold/40"
                  : "bg-white/5 border-ujjain-gold/20 opacity-40"
              }`}
              style={{
                transform: isPopping ? "scale(1.4)" : undefined,
                transitionTimingFunction: EASE,
              }}
              title={badge.name}
            >
              {badge.icon}
            </div>
          );
        })}
      </div>
    </>
  );
}
