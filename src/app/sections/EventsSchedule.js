"use client";
import { useState } from "react";
import { useLanguage } from "../components/LanguageContext";

// NOTE: Exact 2028 dates vary across sources — confirm with Rajat that
// these match whatever target date the Countdown Timer section uses,
// then keep both consistent.
const events = [
    {
        id: 1,
        category: "shahi-snan",
        date: { hi: "9 April 2028", en: "9 April 2028" },
        title: { hi: "Pratham Shahi Snan", en: "First Shahi Snan" },
        desc: {
            hi: "Sabse mahatvapoorna snan — 13 Akhade apni shobhayatra ke saath Shipra nadi me snan karenge.",
            en: "The most significant bath — all 13 Akhadas will bathe in the Shipra river with their processions.",
        },
    },
    {
        id: 2,
        category: "shahi-snan",
        date: { hi: "23-27 April 2028", en: "23-27 April 2028" },
        title: { hi: "Dwitiya Shahi Snan", en: "Second Shahi Snan" },
        desc: {
            hi: "Doosra pramukh Amrit Snan — bhari sankhya me shraddhalu aur Akhada processions.",
            en: "Second major Amrit Snan — large crowds and Akhada processions expected.",
        },
    },
    {
        id: 3,
        category: "shahi-snan",
        date: { hi: "8 May 2028", en: "8 May 2028" },
        title: { hi: "Antim Shahi Snan", en: "Final Shahi Snan" },
        desc: {
            hi: "Simhastha ka aakhri aur samapan Shahi Snan.",
            en: "The final and concluding Shahi Snan of Simhastha.",
        },
    },
    {
        id: 4,
        category: "parva-snan",
        date: { hi: "Purnima Tithi", en: "Purnima Tithi" },
        title: { hi: "Purnima Snan", en: "Purnima Bathing" },
        desc: {
            hi: "Poornima ki tithi par shubh snan — Shahi Snan se kam bheed, parivaron ke liye behtar.",
            en: "Auspicious bathing on the full-moon date — lower crowds than Shahi Snan, better for families.",
        },
    },
    {
        id: 5,
        category: "parva-snan",
        date: { hi: "Ekadashi Tithi", en: "Ekadashi Tithi" },
        title: { hi: "Ekadashi Snan", en: "Ekadashi Bathing" },
        desc: {
            hi: "Ekadashi ki tithi par ek aur shubh Parva Snan avsar.",
            en: "Another auspicious Parva Snan occasion on the Ekadashi date.",
        },
    },
    {
        id: 6,
        category: "parva-snan",
        date: { hi: "Amavasya Tithi", en: "Amavasya Tithi" },
        title: { hi: "Amavasya Snan", en: "Amavasya Bathing" },
        desc: {
            hi: "Amavasya ki tithi par snan — Kalpvas kar rahe shraddhalu ke liye vishesh mahatva.",
            en: "Bathing on the new-moon date — especially significant for those observing Kalpvas.",
        },
    },
    {
        id: 7,
        category: "cultural",
        date: { hi: "Mela avdhi bhar", en: "Throughout the mela" },
        title: { hi: "Akhada Shobhayatra", en: "Akhada Processions" },
        desc: {
            hi: "13 Akhadon ki paramparik shobhayatrayein poore mela avdhi me alag-alag dinon par nikalti hain.",
            en: "Traditional processions of the 13 Akhadas take place on various days throughout the mela.",
        },
    },
    {
        id: 8,
        category: "cultural",
        date: { hi: "Mela avdhi bhar", en: "Throughout the mela" },
        title: { hi: "Bhajan-Kirtan Sandhya", en: "Bhajan-Kirtan Evenings" },
        desc: {
            hi: "Ghaton par shaam ko niyamit bhajan-kirtan aur aarti karyakram.",
            en: "Regular evening bhajan-kirtan and aarti programs held at the ghats.",
        },
    },
    {
        id: 9,
        category: "cultural",
        date: { hi: "Mela avdhi bhar", en: "Throughout the mela" },
        title: { hi: "Adhyatmik Pravachan", en: "Spiritual Discourses" },
        desc: {
            hi: "Sadhu-santon dwara pravachan aur satsang, alag-alag pandalon me.",
            en: "Discourses and satsangs by saints and sages held at various pandals.",
        },
    },
    {
        id: 10,
        category: "cultural",
        date: { hi: "Kalpvas avdhi", en: "During Kalpvas period" },
        title: { hi: "Kalpvas", en: "Kalpvas" },
        desc: {
            hi: "Ek mahine tak nadi-tat par rehkar tapasya aur vrat karne ki parampara.",
            en: "The month-long tradition of staying by the riverbank observing austerity and vows.",
        },
    },
    {
        id: 11,
        category: "cultural",
        date: { hi: "Mela avdhi bhar", en: "Throughout the mela" },
        title: { hi: "Panchkoshi Yatra", en: "Panchkoshi Yatra" },
        desc: {
            hi: "Ujjain ke charon aur parikrama/pilgrimage circuit — kai shraddhalu is yatra ko poora karte hain.",
            en: "A pilgrimage circuit around Ujjain — many devotees complete this yatra during the mela.",
        },
    },
];

const text = {
    hi: {
        title: "Major Events & Schedule",
        subtitle: "Simhastha 2028 ke pramukh snan aur karyakram",
        filterAll: "Sabhi",
        filterShahi: "Shahi Snan",
        filterParva: "Parva Snan",
        filterCultural: "Cultural Events",
        noResults: "Is category me abhi koi event nahi hai.",
        footNote: "Exact tithiyan/dates official panchang aur prashasan ki ghoshna ke anusar badal sakti hain — Simhastha ke najdeek official confirmation zaroor dekhein.",
    },
    en: {
        title: "Major Events & Schedule",
        subtitle: "Key bathing dates and programs for Simhastha 2028",
        filterAll: "All",
        filterShahi: "Shahi Snan",
        filterParva: "Parva Snan",
        filterCultural: "Cultural Events",
        noResults: "No events in this category yet.",
        footNote: "Exact dates may change based on the official panchang and administration announcements — please check official confirmation closer to Simhastha.",
    },
};

const categoryStyle = {
    "shahi-snan": "text-red-400 border-red-400/30 bg-red-400/10",
    "parva-snan": "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
    cultural: "text-purple-400 border-purple-400/30 bg-purple-400/10",
};

export default function EventsSchedule() {
    const { lang } = useLanguage();
    const t = text[lang];
    const [activeFilter, setActiveFilter] = useState("all");

    const filters = [
        { key: "all", label: t.filterAll },
        { key: "shahi-snan", label: t.filterShahi },
        { key: "parva-snan", label: t.filterParva },
        { key: "cultural", label: t.filterCultural },
    ];

    const filteredEvents =
        activeFilter === "all" ? events : events.filter((e) => e.category === activeFilter);

    return (
        <section
            id="events-schedule"
            className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark"
        >
            <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">
                {t.title}
            </h2>
            <p className="text-ujjain-cream mb-8 text-center max-w-xl">{t.subtitle}</p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {filters.map((f) => (
                    <button
                        key={f.key}
                        onClick={() => setActiveFilter(f.key)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${activeFilter === f.key
                                ? "bg-ujjain-gold text-ujjain-dark border-ujjain-gold"
                                : "text-ujjain-cream border-ujjain-gold/30 hover:border-ujjain-gold/60"
                            }`}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Event cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl">
                {filteredEvents.map((event) => (
                    <div
                        key={event.id}
                        className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-6 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span
                                className={`text-xs font-semibold px-3 py-1 rounded-full border ${categoryStyle[event.category]}`}
                            >
                                {event.category === "shahi-snan"
                                    ? t.filterShahi
                                    : event.category === "parva-snan"
                                        ? t.filterParva
                                        : t.filterCultural}
                            </span>
                            <span className="text-ujjain-cream/50 text-xs">{event.date[lang]}</span>
                        </div>
                        <h3 className="text-lg font-bold text-ujjain-gold mb-2">{event.title[lang]}</h3>
                        <p className="text-ujjain-cream/80 text-sm">{event.desc[lang]}</p>
                    </div>
                ))}
            </div>

            {filteredEvents.length === 0 && (
                <p className="text-ujjain-cream/60 text-sm mt-8">{t.noResults}</p>
            )}

            <p className="text-ujjain-cream/40 text-xs mt-8 text-center max-w-md">{t.footNote}</p>
        </section>
    );
}