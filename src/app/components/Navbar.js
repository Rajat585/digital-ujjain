"use client";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { NAV_GROUPS } from "./navData";
import InstallBadge from "./InstallBadge";

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

export default function Navbar() {
  const { lang, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // Scroll-shrink: navbar becomes slightly more compact and more opaque
  // once the page scrolls past the hero, so it feels lighter on first paint
  // and more "anchored" once the user is browsing content.
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const LangSwitcher = ({ mobile }) => {
    const options = [
      { key: "hi", label: "हिं" },
      { key: "en", label: "EN" },
      { key: "hinglish", label: "Hing." },
    ];
    const activeIdx = options.findIndex((o) => o.key === lang);

    return (
      <div
        className={`relative flex items-center border border-ujjain-gold/40 rounded-full overflow-hidden ${
          mobile ? "text-[10px]" : "text-xs"
        }`}
      >
        {/* Sliding active-pill background, glides under the labels instead of an instant colour swap */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 rounded-full bg-ujjain-gold"
          style={{
            width: `${100 / options.length}%`,
            left: `${(activeIdx * 100) / options.length}%`,
            transition: `left 450ms ${EASE}`,
          }}
        />
        {options.map((opt, i) => (
          <button
            key={opt.key}
            onClick={() => setLanguage(opt.key)}
            className={`relative z-10 px-2 py-1 font-semibold transition-colors duration-300 ${
              i > 0 ? "border-l border-ujjain-gold/30" : ""
            } ${
              lang === opt.key
                ? "text-ujjain-dark"
                : "text-ujjain-gold hover:bg-ujjain-gold/10"
            }`}
            style={{ transitionTimingFunction: EASE }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 bg-ujjain-dark/80 backdrop-blur-md border-b border-ujjain-gold/20 transition-all duration-500 ${
        scrolled ? "py-2.5 bg-ujjain-dark/95 shadow-lg shadow-black/20" : "py-4"
      }`}
      style={{ transitionTimingFunction: EASE }}
    >
      <a
        href="#home"
        onClick={() => setMenuOpen(false)}
        className="text-2xl font-bold text-ujjain-gold transition-transform duration-300 ease-out hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] inline-block"
      >
        Ujjain
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-4 text-ujjain-cream text-sm items-center">
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ujjain-gold/30 hover:border-ujjain-gold/70 hover:text-ujjain-saffron transition-all duration-300 ease-out overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              {t.explore}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}
                style={{ transitionTimingFunction: EASE }}
              >
                <path
                  d="M2 4l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {/* subtle fill sweep on hover */}
            <span className="absolute inset-0 bg-ujjain-gold/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
          </button>

          {/* Dropdown: scale + fade + slight rise entrance, staggered item reveal */}
          <div
            className={`absolute right-0 mt-3 w-[560px] max-w-[90vw] bg-ujjain-dark border border-ujjain-gold/25 rounded-xl shadow-2xl shadow-black/50 p-4 grid grid-cols-2 gap-4 origin-top-right transition-all duration-300 ${
              menuOpen
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }`}
            style={{ transitionTimingFunction: EASE }}
          >
            {groups.map((group, gi) => (
              <div key={group.label}>
                <p className="text-xs uppercase tracking-wide text-ujjain-gold/70 font-semibold mb-2 px-1">
                  {group.label}
                </p>
                <div className="flex flex-col">
                  {group.items.map((item, ii) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`rounded-lg px-2 py-2 hover:bg-ujjain-gold/10 hover:pl-3 transition-all duration-300 ease-out ${
                        menuOpen
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-1"
                      }`}
                      style={{
                        transitionTimingFunction: EASE,
                        transitionDelay: menuOpen
                          ? `${(gi * group.items.length + ii) * 35}ms`
                          : "0ms",
                      }}
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
        </div>

        {/* Book Now: shimmer sweep on hover */}
        <a
          href="#hotel-booking"
          className="group relative px-4 py-1.5 rounded-full bg-ujjain-saffron text-ujjain-dark text-sm font-semibold overflow-hidden transition-colors duration-300 hover:bg-ujjain-gold"
        >
          <span className="relative z-10">{t.book}</span>
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
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
