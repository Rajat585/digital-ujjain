"use client";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../components/LanguageContext";

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

// NOTE: Exact 2028 dates vary across sources — confirm with Rajat that
// these match whatever target date the Countdown Timer section uses,
// then keep both consistent.
const events = [
    {
        id: 1,
        category: "shahi-snan",
        date: { hi: "9 April 2028", en: "9 April 2028", hinglish: "9 April 2028" },
        title: { hi: "प्रथम शाही स्नान", en: "First Shahi Snan", hinglish: "Pratham Shahi Snan" },
        desc: {
            hi: "सबसे महत्वपूर्ण स्नान — 13 अखाड़े अपनी शोभायात्रा के साथ क्षिप्रा नदी में स्नान करेंगे।",
            en: "The most significant bath — all 13 Akhadas will bathe in the Shipra river with their processions.",
            hinglish: "Sabse mahatvapoorna snan — 13 Akhade apni shobhayatra ke saath Shipra nadi me snan karenge.",
        },
    },
    {
        id: 2,
        category: "shahi-snan",
        date: { hi: "23-27 April 2028", en: "23-27 April 2028", hinglish: "23-27 April 2028" },
        title: { hi: "द्वितीय शाही स्नान", en: "Second Shahi Snan", hinglish: "Dwitiya Shahi Snan" },
        desc: {
            hi: "दूसरा प्रमुख अमृत स्नान — भारी संख्या में श्रद्धालु और अखाड़ा शोभायात्राएं।",
            en: "Second major Amrit Snan — large crowds and Akhada processions expected.",
            hinglish: "Doosra pramukh Amrit Snan — bhari sankhya me shraddhalu aur Akhada processions.",
        },
    },
    {
        id: 3,
        category: "shahi-snan",
        date: { hi: "8 May 2028", en: "8 May 2028", hinglish: "8 May 2028" },
        title: { hi: "अंतिम शाही स्नान", en: "Final Shahi Snan", hinglish: "Antim Shahi Snan" },
        desc: {
            hi: "सिंहस्थ का आखिरी और समापन शाही स्नान।",
            en: "The final and concluding Shahi Snan of Simhastha.",
            hinglish: "Simhastha ka aakhri aur samapan Shahi Snan.",
        },
    },
    {
        id: 4,
        category: "parva-snan",
        date: { hi: "पूर्णिमा तिथि", en: "Purnima Tithi", hinglish: "Purnima Tithi" },
        title: { hi: "पूर्णिमा स्नान", en: "Purnima Bathing", hinglish: "Purnima Snan" },
        desc: {
            hi: "पूर्णिमा की तिथि पर शुभ स्नान — शाही स्नान से कम भीड़, परिवारों के लिए बेहतर।",
            en: "Auspicious bathing on the full-moon date — lower crowds than Shahi Snan, better for families.",
            hinglish: "Poornima ki tithi par shubh snan — Shahi Snan se kam bheed, parivaron ke liye behtar.",
        },
    },
    {
        id: 5,
        category: "parva-snan",
        date: { hi: "एकादशी तिथि", en: "Ekadashi Tithi", hinglish: "Ekadashi Tithi" },
        title: { hi: "एकादशी स्नान", en: "Ekadashi Bathing", hinglish: "Ekadashi Snan" },
        desc: {
            hi: "एकादशी की तिथि पर एक और शुभ पर्व स्नान अवसर।",
            en: "Another auspicious Parva Snan occasion on the Ekadashi date.",
            hinglish: "Ekadashi ki tithi par ek aur shubh Parva Snan avsar.",
        },
    },
    {
        id: 6,
        category: "parva-snan",
        date: { hi: "अमावस्या तिथि", en: "Amavasya Tithi", hinglish: "Amavasya Tithi" },
        title: { hi: "अमावस्या स्नान", en: "Amavasya Bathing", hinglish: "Amavasya Snan" },
        desc: {
            hi: "अमावस्या की तिथि पर स्नान — कल्पवास कर रहे श्रद्धालुओं के लिए विशेष महत्व।",
            en: "Bathing on the new-moon date — especially significant for those observing Kalpvas.",
            hinglish: "Amavasya ki tithi par snan — Kalpvas kar rahe shraddhalu ke liye vishesh mahatva.",
        },
    },
    {
        id: 7,
        category: "cultural",
        date: { hi: "मेला अवधि भर", en: "Throughout the mela", hinglish: "Mela avdhi bhar" },
        title: { hi: "अखाड़ा शोभायात्रा", en: "Akhada Processions", hinglish: "Akhada Shobhayatra" },
        desc: {
            hi: "13 अखाड़ों की पारंपरिक शोभायात्राएं पूरे मेला अवधि में अलग-अलग दिनों पर निकलती हैं।",
            en: "Traditional processions of the 13 Akhadas take place on various days throughout the mela.",
            hinglish: "13 Akhadon ki paramparik shobhayatrayein poore mela avdhi me alag-alag dinon par nikalti hain.",
        },
    },
    {
        id: 8,
        category: "cultural",
        date: { hi: "मेला अवधि भर", en: "Throughout the mela", hinglish: "Mela avdhi bhar" },
        title: { hi: "भजन-कीर्तन संध्या", en: "Bhajan-Kirtan Evenings", hinglish: "Bhajan-Kirtan Sandhya" },
        desc: {
            hi: "घाटों पर शाम को नियमित भजन-कीर्तन और आरती कार्यक्रम।",
            en: "Regular evening bhajan-kirtan and aarti programs held at the ghats.",
            hinglish: "Ghaton par shaam ko niyamit bhajan-kirtan aur aarti karyakram.",
        },
    },
    {
        id: 9,
        category: "cultural",
        date: { hi: "मेला अवधि भर", en: "Throughout the mela", hinglish: "Mela avdhi bhar" },
        title: { hi: "आध्यात्मिक प्रवचन", en: "Spiritual Discourses", hinglish: "Adhyatmik Pravachan" },
        desc: {
            hi: "साधु-संतों द्वारा प्रवचन और सत्संग, अलग-अलग पंडालों में।",
            en: "Discourses and satsangs by saints and sages held at various pandals.",
            hinglish: "Sadhu-santon dwara pravachan aur satsang, alag-alag pandalon me.",
        },
    },
    {
        id: 10,
        category: "cultural",
        date: { hi: "कल्पवास अवधि", en: "During Kalpvas period", hinglish: "Kalpvas avdhi" },
        title: { hi: "कल्पवास", en: "Kalpvas", hinglish: "Kalpvas" },
        desc: {
            hi: "एक महीने तक नदी-तट पर रहकर तपस्या और व्रत करने की परंपरा।",
            en: "The month-long tradition of staying by the riverbank observing austerity and vows.",
            hinglish: "Ek mahine tak nadi-tat par rehkar tapasya aur vrat karne ki parampara.",
        },
    },
    {
        id: 11,
        category: "cultural",
        date: { hi: "मेला अवधि भर", en: "Throughout the mela", hinglish: "Mela avdhi bhar" },
        title: { hi: "पंचकोशी यात्रा", en: "Panchkoshi Yatra", hinglish: "Panchkoshi Yatra" },
        desc: {
            hi: "उज्जैन के चारों ओर परिक्रमा/तीर्थ मार्ग — कई श्रद्धालु इस यात्रा को पूरा करते हैं।",
            en: "A pilgrimage circuit around Ujjain — many devotees complete this yatra during the mela.",
            hinglish: "Ujjain ke charon aur parikrama/pilgrimage circuit — kai shraddhalu is yatra ko poora karte hain.",
        },
    },
];

const text = {
    hi: {
        title: "प्रमुख कार्यक्रम एवं समय-सारणी",
        subtitle: "सिंहस्थ 2028 के प्रमुख स्नान और कार्यक्रम",
        filterAll: "सभी",
        filterShahi: "शाही स्नान",
        filterParva: "पर्व स्नान",
        filterCultural: "सांस्कृतिक कार्यक्रम",
        noResults: "इस श्रेणी में अभी कोई कार्यक्रम नहीं है।",
        footNote: "सटीक तिथियां/तारीखें आधिकारिक पंचांग और प्रशासन की घोषणा के अनुसार बदल सकती हैं — सिंहस्थ के नज़दीक आधिकारिक पुष्टि ज़रूर देखें।",
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
    hinglish: {
        title: "Major Events & Schedule",
        subtitle: "Simhastha 2028 ke pramukh snan aur karyakram",
        filterAll: "Sabhi",
        filterShahi: "Shahi Snan",
        filterParva: "Parva Snan",
        filterCultural: "Cultural Events",
        noResults: "Is category me abhi koi event nahi hai.",
        footNote: "Exact tithiyan/dates official panchang aur prashasan ki ghoshna ke anusar badal sakti hain — Simhastha ke najdeek official confirmation zaroor dekhein.",
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

    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

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
            ref={sectionRef}
            className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark overflow-hidden"
        >
            <h2
                className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(-16px)",
                    transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
                }}
            >
                {t.title}
            </h2>
            <p
                className="text-ujjain-cream mb-8 text-center max-w-xl"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(-12px)",
                    transition: `opacity 0.7s ${EASE} 0.1s, transform 0.7s ${EASE} 0.1s`,
                }}
            >
                {t.subtitle}
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {filters.map((f, i) => (
                    <button
                        key={f.key}
                        onClick={() => setActiveFilter(f.key)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold border hover:-translate-y-0.5 active:scale-95 ${activeFilter === f.key ? "bg-ujjain-gold text-ujjain-dark border-ujjain-gold shadow-[0_4px_16px_-4px_rgba(212,175,55,0.5)]" : "text-ujjain-cream border-ujjain-gold/30 hover:border-ujjain-gold/60 hover:bg-white/5"}`}
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateY(0)" : "translateY(-10px)",
                            transition: `opacity 0.5s ${EASE}, transform 0.5s ${EASE}, background-color 0.3s ${EASE}, border-color 0.3s ${EASE}, box-shadow 0.3s ${EASE}`,
                            transitionDelay: visible ? `${200 + i * 80}ms` : "0ms",
                        }}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Event cards — remounts on filter change so the stagger replays */}
            <div key={activeFilter} className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl">
                {filteredEvents.map((event, index) => (
                    <div key={event.id}
                        className="event-card group relative bg-white/5 border border-ujjain-gold/30 rounded-xl p-6 flex flex-col overflow-hidden hover:border-ujjain-gold/70 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_-8px_rgba(212,175,55,0.35)]"
                        style={{
                            transition: `border-color 0.4s ${EASE}, box-shadow 0.4s ${EASE}, transform 0.4s ${EASE}`,
                            animation: visible ? `eventCardIn 0.55s ${EASE} both` : "none",
                            animationDelay: visible ? `${index * 80}ms` : "0ms",
                            opacity: visible ? undefined : 0,
                        }}
                    >
                        <span
                            className="absolute left-0 top-0 h-full w-[3px] bg-ujjain-gold origin-top scale-y-0 group-hover:scale-y-100"
                            style={{ transition: `transform 0.5s ${EASE}` }}
                        />
                        <div className="flex items-center justify-between mb-3">
                            <span
                                className={`text-xs font-semibold px-3 py-1 rounded-full border transition-transform duration-300 group-hover:scale-105 ${categoryStyle[event.category]}`}
                            >
                                {event.category === "shahi-snan"
                                    ? t.filterShahi
                                    : event.category === "parva-snan"
                                        ? t.filterParva
                                        : t.filterCultural}
                            </span>
                            <span className="text-ujjain-cream/50 text-xs">{event.date[lang]}</span>
                        </div>
                        <h3 className="text-lg font-bold text-ujjain-gold mb-2 transition-colors duration-300 group-hover:text-ujjain-saffron">
                            {event.title[lang]}
                        </h3>
                        <p className="text-ujjain-cream/80 text-sm">{event.desc[lang]}</p>
                    </div>
                ))}
            </div>

            {filteredEvents.length === 0 && (
                <p
                    key={`empty-${activeFilter}`}
                    className="text-ujjain-cream/60 text-sm mt-8"
                    style={{ animation: `eventCardIn 0.5s ${EASE} both` }}
                >
                    {t.noResults}
                </p>
            )}

            <p
                className="text-ujjain-cream/40 text-xs mt-8 text-center max-w-md"
                style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.8s ${EASE}`,
                    transitionDelay: visible ? "600ms" : "0ms",
                }}
            >
                {t.footNote}
            </p>

            <style jsx>{`
                @keyframes eventCardIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}