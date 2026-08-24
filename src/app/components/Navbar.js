"use client";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { NAV_GROUPS } from "./navData";
import InstallBadge from "./InstallBadge";

export default function Navbar() {
  const { lang, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const text = {
    hi: { explore: "अनुभाग", book: "बुक करें" },
    en: { explore: "Sections", book: "Book Now" },
    hinglish: { explore: "Sections", book: "Book Karein" },
  };
  const t = text[lang];
  const groups = NAV_GROUPS[lang];

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const LangSwitcher = ({ mobile }) => (
    <div
      className={`flex items-center border border-ujjain-gold/40 rounded-full overflow-hidden ${
        mobile ? "text-[10px]" : "text-xs"
      }`}
    >
      <button
        onClick={() => setLanguage("hi")}
        className={`px-2 py-1 font-semibold transition ${
          lang === "hi"
            ? "bg-ujjain-gold text-ujjain-dark"
            : "text-ujjain-gold hover:bg-ujjain-gold/10"
        }`}
      >
        हिं
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 font-semibold transition border-l border-ujjain-gold/30 ${
          lang === "en"
            ? "bg-ujjain-gold text-ujjain-dark"
            : "text-ujjain-gold hover:bg-ujjain-gold/10"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("hinglish")}
        className={`px-2 py-1 font-semibold transition border-l border-ujjain-gold/30 ${
          lang === "hinglish"
            ? "bg-ujjain-gold text-ujjain-dark"
            : "text-ujjain-gold hover:bg-ujjain-gold/10"
        }`}
      >
        Hing.
      </button>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-ujjain-dark/80 backdrop-blur-md border-b border-ujjain-gold/20">
      <a
        href="#home"
        onClick={() => setMenuOpen(false)}
        className="text-2xl font-bold text-ujjain-gold"
      >
        Ujjain
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-4 text-ujjain-cream text-sm items-center">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ujjain-gold/30 hover:border-ujjain-gold/70 hover:text-ujjain-saffron transition"
          >
            {t.explore}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M2 4l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-[560px] max-w-[90vw] bg-ujjain-dark border border-ujjain-gold/25 rounded-xl shadow-2xl shadow-black/50 p-4 grid grid-cols-2 gap-4">
              {groups.map((group) => (
                <div key={group.label}>
                  <p className="text-xs uppercase tracking-wide text-ujjain-gold/70 font-semibold mb-2 px-1">
                    {group.label}
                  </p>
                  <div className="flex flex-col">
                    {group.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-lg px-2 py-2 hover:bg-ujjain-gold/10 transition"
                      >
                        <p className="text-ujjain-cream text-sm font-medium">
                          {item.title}
                        </p>
                        <p className="text-ujjain-cream/50 text-xs mt-0.5">
                          {item.desc}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <a
          href="#hotel-booking"
          className="px-4 py-1.5 rounded-full bg-ujjain-saffron text-ujjain-dark text-sm font-semibold hover:bg-ujjain-gold transition"
        >
          {t.book}
        </a>

        <InstallBadge />

        <LangSwitcher />
      </div>

      {/* Mobile: language toggle + install badge — navigation lives in the bottom bar */}
      <div className="md:hidden flex items-center gap-2">
        <InstallBadge />
        <LangSwitcher mobile />
      </div>
    </nav>
  );
}
