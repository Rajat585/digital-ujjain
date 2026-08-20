"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { NAV_GROUPS } from "./navData";

const icons = {
    home: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 11.5L12 4l8 7.5M6 10v9a1 1 0 001 1h3v-5h4v5h3a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    map: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 21s7-6.1 7-11.5A7 7 0 105 9.5C5 14.9 12 21 12 21z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.8" />
        </svg>
    ),
    bed: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 18v-7a2 2 0 012-2h14a2 2 0 012 2v7M3 18v2M21 18v2M3 13h8v-2a1 1 0 00-1-1H5a2 2 0 00-2 2v1z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    users: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5M15 8a3 3 0 110-6M17 15c2.5.3 4 1.8 4 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    more: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

export default function MobileBottomNav() {
    const { lang } = useLanguage();
    const [sheetOpen, setSheetOpen] = useState(false);
    const groups = NAV_GROUPS[lang];

    const text = {
        hi: { home: "Home", zone: "Zone", book: "Book", sathi: "Sathi", more: "Aur" },
        en: { home: "Home", zone: "Zone", book: "Book", sathi: "Sathi", more: "More" },
    };
    const t = text[lang];

    useEffect(() => {
        document.body.style.overflow = sheetOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [sheetOpen]);

    useEffect(() => {
        function handleKey(e) {
            if (e.key === "Escape") setSheetOpen(false);
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, []);

    const navItems = [
        { href: "#home", label: t.home, icon: icons.home },
        { href: "#map", label: t.zone, icon: icons.map },
        { href: "#sathi-booking", label: t.sathi, icon: icons.users },
    ];

    return (
        <>
            {/* Fixed bottom bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-ujjain-dark/95 backdrop-blur-md border-t border-ujjain-gold/20 pb-[env(safe-area-inset-bottom)]">
                <div className="grid grid-cols-5 items-end px-1 pt-2 pb-1.5">
                    <a href={navItems[0].href} className="flex flex-col items-center gap-1 text-ujjain-cream/70 active:text-ujjain-saffron transition">
                        {navItems[0].icon}
                        <span className="text-[10px] font-medium">{navItems[0].label}</span>
                    </a>
                    <a href={navItems[1].href} className="flex flex-col items-center gap-1 text-ujjain-cream/70 active:text-ujjain-saffron transition">
                        {navItems[1].icon}
                        <span className="text-[10px] font-medium">{navItems[1].label}</span>
                    </a>

                    {/* Elevated Book button — the one thing every visitor needs */}
                    <a
                        href="#hotel-booking"
                        className="flex flex-col items-center -mt-6"
                    >
                        <span className="flex items-center justify-center w-14 h-14 rounded-full bg-ujjain-saffron text-ujjain-dark shadow-lg shadow-ujjain-saffron/40 border-4 border-ujjain-dark animate-pulse">
                            {icons.bed}
                        </span>
                        <span className="text-[10px] font-semibold text-ujjain-saffron mt-1">{t.book}</span>
                    </a>

                    <a href={navItems[2].href} className="flex flex-col items-center gap-1 text-ujjain-cream/70 active:text-ujjain-saffron transition">
                        {navItems[2].icon}
                        <span className="text-[10px] font-medium">{navItems[2].label}</span>
                    </a>

                    <button
                        onClick={() => setSheetOpen(true)}
                        aria-expanded={sheetOpen}
                        className="flex flex-col items-center gap-1 text-ujjain-cream/70 active:text-ujjain-saffron transition"
                    >
                        {icons.more}
                        <span className="text-[10px] font-medium">{t.more}</span>
                    </button>
                </div>
            </nav>

            {/* Bottom sheet with full section list */}
            {sheetOpen && (
                <div className="md:hidden fixed inset-0 z-[60]">
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setSheetOpen(false)}
                    />
                    <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] bg-ujjain-dark border-t border-ujjain-gold/25 rounded-t-2xl overflow-y-auto">
                        <div className="sticky top-0 bg-ujjain-dark pt-3 pb-2 flex flex-col items-center border-b border-ujjain-gold/10">
                            <div className="w-10 h-1.5 rounded-full bg-ujjain-gold/30 mb-2" />
                            <p className="text-ujjain-gold font-semibold text-sm">{t.more === "Aur" ? "Sab Sections" : "All Sections"}</p>
                        </div>
                        <div className="px-4 py-3">
                            {groups.map((group) => (
                                <div key={group.label} className="mb-5">
                                    <p className="text-xs uppercase tracking-wide text-ujjain-gold/70 font-semibold mb-1">
                                        {group.label}
                                    </p>
                                    <div className="flex flex-col divide-y divide-ujjain-gold/10">
                                        {group.items.map((item) => (
                                            <a
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setSheetOpen(false)}
                                                className="py-3 active:bg-ujjain-gold/10 -mx-2 px-2 rounded-lg transition"
                                            >
                                                <p className="text-ujjain-cream text-sm font-medium">{item.title}</p>
                                                <p className="text-ujjain-cream/50 text-xs mt-0.5">{item.desc}</p>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}