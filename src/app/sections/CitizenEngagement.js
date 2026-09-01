"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../components/LanguageContext";
import { api } from "../lib/api";

const EASE_POP = "cubic-bezier(0.34, 1.56, 0.64, 1)";

const text = {
  hi: {
    title: "आपका योगदान",
    subtitle: "सिंहस्थ 2028 की बेहतर योजना के लिए अपने सुझाव दें",
    namePlaceholder: "आपका नाम",
    suggestionPlaceholder: "अपना सुझाव लिखें...",
    submitBtn: "सुझाव भेजें",
    sendingBtn: "भेजा जा रहा है...",
    successMsg: "धन्यवाद! आपका सुझाव सफलतापूर्वक भेज दिया गया है।",
    errorMsg: "कुछ गड़बड़ हो गई। कृपया दोबारा कोशिश करें।",
  },
  en: {
    title: "Your Contribution",
    subtitle: "Share your suggestions for better planning of Simhastha 2028",
    namePlaceholder: "Your Name",
    suggestionPlaceholder: "Write your suggestion...",
    submitBtn: "Send Suggestion",
    sendingBtn: "Sending...",
    successMsg: "Thank you! Your suggestion has been sent successfully.",
    errorMsg: "Something went wrong. Please try again.",
  },
  hinglish: {
    title: "Aapka Yogdaan",
    subtitle: "Simhastha 2028 ki behtar planning ke liye apne sujhaav dein",
    namePlaceholder: "Aapka Naam",
    suggestionPlaceholder: "Aapka Sujhaav Likhein...",
    submitBtn: "Sujhaav Bhejein",
    sendingBtn: "Bheja Ja Raha Hai...",
    successMsg: "Dhanyavaad! Aapka sujhaav safaltapoorvak bhej diya gaya hai.",
    errorMsg: "Kuch gadbad ho gayi. Kripya dobara koshish karein.",
  },
};

export default function CitizenEngagement() {
  const { lang } = useLanguage();
  const t = text[lang];
  const [name, setName] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(name.trim() && suggestion.trim())) return;
    setSending(true);
    setError("");
    const result = await api.submitFeedback({ name: name.trim(), suggestion: suggestion.trim() });
    setSending(false);
    if (result.ok) {
      setSubmitted(true);
      setName("");
      setSuggestion("");
    } else {
      setError(t.errorMsg);
    }
  };

  const fieldStyle = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(50px) scale(0.85)",
    transition: `opacity 750ms ${EASE_POP} ${delay}ms, transform 750ms ${EASE_POP} ${delay}ms`,
  });

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark overflow-hidden">
      <style>{`
        @keyframes ujjainCeShimmer {
          0% { transform: translateX(-160%) skewX(-12deg); }
          100% { transform: translateX(480%) skewX(-12deg); }
        }
        .ujjain-ce-btn:hover .ujjain-ce-shimmer {
          animation: ujjainCeShimmer 1.1s ease-in-out infinite;
        }
        @keyframes ujjainCePopIn {
          0% { transform: scale(0.5) translateY(15px); opacity: 0; }
          60% { transform: scale(1.08) translateY(-2px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .ujjain-ce-success {
          animation: ujjainCePopIn 600ms ${EASE_POP} forwards;
        }
        @keyframes ujjainCeShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .ujjain-ce-error {
          animation: ujjainCeShake 500ms ease-in-out;
        }
      `}</style>
      <h2
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(-40px) scale(0.8)",
          transition: `opacity 800ms ${EASE_POP}, transform 800ms ${EASE_POP}`,
        }}
        className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center"
      >
        {t.title}
      </h2>
      <p
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(-25px)",
          transition: `opacity 700ms ${EASE_POP} 100ms, transform 700ms ${EASE_POP} 100ms`,
        }}
        className="text-ujjain-cream mb-12 text-center max-w-xl"
      >
        {t.subtitle}
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder={t.namePlaceholder} aria-label={t.namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={fieldStyle(200)}
          className="bg-white/5 border border-ujjain-gold/30 rounded-lg px-4 py-3 text-ujjain-cream placeholder:text-ujjain-cream/40 transition-all duration-300 hover:border-ujjain-gold/60 focus:outline-none focus:border-ujjain-gold focus:scale-[1.02] focus:shadow-lg focus:shadow-ujjain-gold/20"
          required
        />
        <textarea
          placeholder={t.suggestionPlaceholder} aria-label={t.suggestionPlaceholder}
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          rows={4}
          style={fieldStyle(320)}
          className="bg-white/5 border border-ujjain-gold/30 rounded-lg px-4 py-3 text-ujjain-cream placeholder:text-ujjain-cream/40 transition-all duration-300 hover:border-ujjain-gold/60 focus:outline-none focus:border-ujjain-gold focus:scale-[1.02] focus:shadow-lg focus:shadow-ujjain-gold/20"
          required
        />
        <button
          type="submit"
          disabled={sending}
          style={fieldStyle(440)}
          className="ujjain-ce-btn relative overflow-hidden bg-ujjain-gold text-ujjain-dark font-bold py-3 rounded-lg transition-all duration-300 hover:bg-ujjain-saffron hover:-translate-y-1.5 hover:scale-105 hover:shadow-2xl hover:shadow-ujjain-gold/40 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:scale-100"
        >
          <span className="ujjain-ce-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <span className="relative">{sending ? t.sendingBtn : t.submitBtn}</span>
        </button>

        {submitted && <p className="ujjain-ce-success text-ujjain-saffron text-center mt-2">{t.successMsg}</p>}
        {error && <p className="ujjain-ce-error text-red-400 text-center mt-2">{error}</p>}
      </form>
    </section>
  );
}