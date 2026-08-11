"use client";
import { useState, useRef } from "react";
import { useLanguage } from "./LanguageContext";

const text = {
  hi: { pause: "Narration rokein", play: "Narration suniye" },
  en: { pause: "Pause narration", play: "Listen to narration" },
};

export default function VoiceNarrator() {
  const { lang } = useLanguage();
  const t = text[lang];
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleToggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/narration.mp4" preload="none" onEnded={() => setIsPlaying(false)} />
      <button
        onClick={handleToggle}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-white/10 border border-ujjain-gold/40 text-ujjain-gold text-xl shadow-lg flex items-center justify-center hover:scale-110 transition backdrop-blur-md"
        title={isPlaying ? t.pause : t.play}
        aria-label={isPlaying ? t.pause : t.play}
      >
        {isPlaying ? "⏸️" : "🔊"}
      </button>
    </>
  );
}