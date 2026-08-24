"use client";
import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("hi");

  const toggleLang = () => {
    setLang((prev) => {
      if (prev === "hi") return "en";
      if (prev === "en") return "hinglish";
      return "hi";
    });
  };

  const setLanguage = (newLang) => {
    setLang(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
