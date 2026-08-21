"use client";
import { useState } from "react";
import { useLanguage } from "../components/LanguageContext";
import { api } from "../lib/api";

const text = {
  hi: {
    title: "Aapka Yogdaan",
    subtitle: "Simhastha 2028 ki behtar planning ke liye apne sujhaav dein",
    namePlaceholder: "Aapka Naam",
    suggestionPlaceholder: "Aapka Sujhaav Likhein...",
    submitBtn: "Sujhaav Bhejein",
    sendingBtn: "Bheja Ja Raha Hai...",
    successMsg: "Dhanyavaad! Aapka sujhaav safaltapoorvak bhej diya gaya hai.",
    errorMsg: "Kuch gadbad ho gayi. Kripya dobara koshish karein.",
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
};

export default function CitizenEngagement() {
  const { lang } = useLanguage();
  const t = text[lang];
  const [name, setName] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark">
      <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">{t.title}</h2>
      <p className="text-ujjain-cream mb-12 text-center max-w-xl">{t.subtitle}</p>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        <input
          type="text"
          placeholder={t.namePlaceholder} aria-label={t.namePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/5 border border-ujjain-gold/30 rounded-lg px-4 py-3 text-ujjain-cream placeholder:text-ujjain-cream/40 focus:outline-none focus:border-ujjain-gold"
          required
        />
        <textarea
          placeholder={t.suggestionPlaceholder} aria-label={t.suggestionPlaceholder}
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          rows={4}
          className="bg-white/5 border border-ujjain-gold/30 rounded-lg px-4 py-3 text-ujjain-cream placeholder:text-ujjain-cream/40 focus:outline-none focus:border-ujjain-gold"
          required
        />
        <button type="submit" disabled={sending} className="bg-ujjain-gold text-ujjain-dark font-bold py-3 rounded-lg hover:bg-ujjain-saffron transition disabled:opacity-50">
          {sending ? t.sendingBtn : t.submitBtn}
        </button>

        {submitted && <p className="text-ujjain-saffron text-center mt-2">{t.successMsg}</p>}
        {error && <p className="text-red-400 text-center mt-2">{error}</p>}
      </form>
    </section>
  );
} 