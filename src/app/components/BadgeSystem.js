"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const badgesData = {
  hi: [
    { threshold: 20, name: "History Buff", icon: "📜" },
    { threshold: 45, name: "Vikas Explorer", icon: "🏗️" },
    { threshold: 70, name: "Future Visionary", icon: "🔮" },
    { threshold: 95, name: "Ghat Explorer", icon: "🛕" },
  ],
  en: [
    { threshold: 20, name: "History Buff", icon: "📜" },
    { threshold: 45, name: "Development Explorer", icon: "🏗️" },
    { threshold: 70, name: "Future Visionary", icon: "🔮" },
    { threshold: 95, name: "Ghat Explorer", icon: "🛕" },
  ],
};

const text = {
  hi: { unlocked: "Badge Unlocked!" },
  en: { unlocked: "Badge Unlocked!" },
};

export default function BadgeSystem() {
  const { lang } = useLanguage();
  const badges = badgesData[lang];
  const t = text[lang];
  const [unlocked, setUnlocked] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      badges.forEach((badge) => {
        if (scrollPercent >= badge.threshold && !unlocked.includes(badge.name)) {
          setUnlocked((prev) => [...prev, badge.name]);
          setToast(badge);
          setTimeout(() => setToast(null), 3000);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [unlocked, badges]);

  return (
    <>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-ujjain-gold text-ujjain-dark px-5 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
          <span className="text-3xl">{toast.icon}</span>
          <div>
            <div className="font-bold">{t.unlocked}</div>
            <div className="text-sm">{toast.name}</div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 left-6 z-40 flex gap-2">
        {badges.map((badge, index) => (
          <div
            key={index}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border transition ${
              unlocked.includes(badge.name) ? "bg-ujjain-gold border-ujjain-gold" : "bg-white/5 border-ujjain-gold/20 opacity-40"
            }`}
            title={badge.name}
          >
            {badge.icon}
          </div>
        ))}
      </div>
    </>
  );
}