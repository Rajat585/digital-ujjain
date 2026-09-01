"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../components/LanguageContext";

const EASE_POP = "cubic-bezier(0.34, 1.56, 0.64, 1)";

// Real verified media only — no placeholder/fake content.
// 2016 & 2028: real YouTube videos. 2004: real Wikimedia Commons photos
// (dated 22 April 2004). 1992: no verified video/photo exists publicly,
// so it uses a rotating carousel of real, sourced historical facts instead.

const photos2004 = [
  "A sadhu attired in the dress made of Rudraksha during Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
  "A sadhu in deep meditation after performing Shahi Snan at Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
  "Devotees taking holy dip for Shahi Snan during Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
  "Sadhus waiting eagerly for their turn to take a dip for Shahi Snan at Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
];

function wikiImg(filename) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;
}

const facts1992 = {
  hi: [
    "साल 1732 में मराठा शासक राणोजी शिंदे ने उज्जैन में पहला सिंहस्थ कुंभ आयोजित करवाया था।",
    'सिंहस्थ तभी मनाया जाता है जब बृहस्पति ग्रह सिंह राशि में प्रवेश करता है — इसीलिए नाम "सिंहस्थ" पड़ा।',
    "1992 के सिंहस्थ में देश-विदेश से लाखों श्रद्धालु और साधु-संत क्षिप्रा तट पर एकत्र हुए थे।",
    "दुनिया में सिर्फ 4 जगह कुंभ मेला होता है — हरिद्वार, प्रयागराज, नासिक और उज्जैन।",
    "क्षिप्रा नदी में पवित्र स्नान चैत्र पूर्णिमा से वैशाख पूर्णिमा तक, लगभग एक महीने चलता है।",
  ],
  en: [
    "In 1732, Maratha ruler Ranoji Shinde organized the first Simhastha Kumbh in Ujjain.",
    "Simhastha is held only when Jupiter enters the zodiac sign Leo (Simha) — hence the name.",
    "The 1992 Simhastha drew lakhs of pilgrims and saints from across India to the Kshipra banks.",
    "Kumbh Mela is held at only 4 places in the world — Haridwar, Prayagraj, Nashik, and Ujjain.",
    "Ritual bathing in the Kshipra runs from Chaitra Purnima to Vaishakh Purnima — nearly a month.",
  ],
  hinglish: [
    "Saal 1732 mein Maratha shasak Ranoji Shinde ne Ujjain mein pehla Simhastha Kumbh organize karwaya tha.",
    'Simhastha tabhi manaya jaata hai jab Brihaspati graha Simha rashi mein pravesh karta hai — isiliye naam "Simhastha" pada.',
    "1992 ke Simhastha mein desh-videsh se lakhon shraddhalu aur sadhu-sant Kshipra tat par ekatra hue the.",
    "Duniya mein sirf 4 jagah Kumbh Mela hota hai — Haridwar, Prayagraj, Nashik aur Ujjain.",
    "Kshipra nadi mein pavitra snan Chaitra Purnima se Vaishakh Purnima tak, lagbhag ek mahine chalta hai.",
  ],
};

const text = {
  hi: {
    title: "सिंहस्थ के पन्ने",
    subtitle: "1992 से 2028 तक — सिंहस्थ की यात्रा एक नज़र में",
    y1992: "1992",
    l1992: "अनसुनी बातें",
    y2004: "2004",
    l2004: "पुरानी झलकियां",
    y2016: "2016",
    l2016: "पिछला सिंहस्थ",
    y2028: "2028",
    l2028: "आने वाला सिंहस्थ",
  },
  en: {
    title: "Through the Years",
    subtitle: "1992 to 2028 — the Simhastha journey at a glance",
    y1992: "1992",
    l1992: "Lesser-Known Facts",
    y2004: "2004",
    l2004: "Old Glimpses",
    y2016: "2016",
    l2016: "Last Simhastha",
    y2028: "2028",
    l2028: "Upcoming Simhastha",
  },
  hinglish: {
    title: "Simhastha Ke Panne",
    subtitle: "1992 se 2028 tak — Simhastha ki yatra ek nazar mein",
    y1992: "1992",
    l1992: "Ansuni Baatein",
    y2004: "2004",
    l2004: "Purani Jhalakiyan",
    y2016: "2016",
    l2016: "Pichla Simhastha",
    y2028: "2028",
    l2028: "Aane Wala Simhastha",
  },
};

export default function Leadership() {
  const { lang } = useLanguage();
  const t = text[lang];
  const [photoIndex, setPhotoIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const photoTimer = setInterval(
      () => setPhotoIndex((i) => (i + 1) % photos2004.length),
      2500,
    );
    const factTimer = setInterval(
      () => setFactIndex((i) => (i + 1) % facts1992.hi.length),
      2500,
    );
    return () => {
      clearInterval(photoTimer);
      clearInterval(factTimer);
    };
  }, []);

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

  const cardEntranceStyle = (index) => ({
    opacity: visible ? 1 : 0,
    transform: visible
      ? undefined
      : "perspective(1400px) rotateX(-40deg) rotateY(10deg) translateY(70px) scale(0.6)",
    transition: `opacity 850ms ${EASE_POP}, transform 850ms ${EASE_POP}`,
    transitionDelay: `${index * 160}ms`,
  });

  return (
    <section
      id="leadership"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark overflow-hidden"
    >
      <style>{`
        @keyframes ujjainLeadShimmer {
          0% { transform: translateX(-160%) skewX(-12deg); }
          100% { transform: translateX(480%) skewX(-12deg); }
        }
        .ujjain-lead-card:hover .ujjain-lead-shimmer {
          animation: ujjainLeadShimmer 1.1s ease-in-out infinite;
        }
      `}</style>
      <h2
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(-30px)",
          transition: `opacity 700ms ${EASE_POP}, transform 700ms ${EASE_POP}`,
        }}
        className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center"
      >
        {t.title}
      </h2>
      <p
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(-20px)",
          transition: `opacity 700ms ${EASE_POP} 120ms, transform 700ms ${EASE_POP} 120ms`,
        }}
        className="text-ujjain-cream mb-12 text-center max-w-xl"
      >
        {t.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* 1992 — rotating real facts (no verified media exists for this year) */}
        <div
          style={cardEntranceStyle(0)}
          className="ujjain-lead-card group relative bg-white/5 border border-ujjain-gold/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:scale-110 hover:shadow-2xl hover:shadow-ujjain-gold/30 hover:border-ujjain-gold/70"
        >
          <span className="ujjain-lead-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-ujjain-gold/40 to-transparent z-10" />
          <div className="aspect-video relative flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-ujjain-dark via-black to-ujjain-dark overflow-hidden">
            <img
              src="https://commons.wikimedia.org/wiki/Special:FilePath/Narmada%20river%20from%20mahakaleshwar%20temple%2C%20Ujjain.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-10 transition-transform duration-700 group-hover:scale-110"
            />
            <span className="text-5xl mb-4 relative transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6">📜</span>
            <p
              key={factIndex}
              className="relative text-ujjain-cream text-sm md:text-base max-w-md leading-relaxed transition-opacity duration-500"
            >
              <span className="text-ujjain-gold text-xl mr-1">"</span>
              {facts1992[lang][factIndex]}
              <span className="text-ujjain-gold text-xl ml-1">"</span>
            </p>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {facts1992.hi.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === factIndex ? "bg-ujjain-gold" : "bg-white/30"}`}
                />
              ))}
            </div>
          </div>
          <div className="px-4 py-3 flex justify-between items-center">
            <span className="text-ujjain-gold font-bold text-lg">
              {t.y1992}
            </span>
            <span className="text-ujjain-cream/60 text-xs">{t.l1992}</span>
          </div>
        </div>
        {/* 2004 — rotating real Wikimedia Commons photos */}
        <div
          style={cardEntranceStyle(1)}
          className="ujjain-lead-card group relative bg-white/5 border border-ujjain-gold/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:scale-110 hover:shadow-2xl hover:shadow-ujjain-gold/30 hover:border-ujjain-gold/70"
        >
          <span className="ujjain-lead-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-ujjain-gold/40 to-transparent z-10" />
          <div className="aspect-video relative overflow-hidden">
            <img
              src={wikiImg(photos2004[photoIndex])}
              alt={`Simhastha 2004 — ${photoIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
              {photos2004.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === photoIndex ? "bg-ujjain-gold" : "bg-white/40"}`}
                />
              ))}
            </div>
          </div>
          <div className="px-4 py-3 flex justify-between items-center">
            <span className="text-ujjain-gold font-bold text-lg">
              {t.y2004}
            </span>
            <span className="text-ujjain-cream/60 text-xs">{t.l2004}</span>
          </div>
        </div>

        {/* 2016 — real YouTube video */}
        <div
          style={cardEntranceStyle(2)}
          className="ujjain-lead-card group relative bg-white/5 border border-ujjain-gold/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:scale-110 hover:shadow-2xl hover:shadow-ujjain-gold/30 hover:border-ujjain-gold/70"
        >
          <span className="ujjain-lead-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-ujjain-gold/40 to-transparent z-10" />
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/claTQyKp-yU"
              title="Simhastha Kumbh Ujjain 2016"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="px-4 py-3 flex justify-between items-center">
            <span className="text-ujjain-gold font-bold text-lg">
              {t.y2016}
            </span>
            <span className="text-ujjain-cream/60 text-xs">{t.l2016}</span>
          </div>
        </div>

        {/* 2028 — real teaser/preparation coverage */}
        <div
          style={cardEntranceStyle(3)}
          className="ujjain-lead-card group relative bg-white/5 border border-ujjain-gold/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-3 hover:scale-110 hover:shadow-2xl hover:shadow-ujjain-gold/30 hover:border-ujjain-gold/70"
        >
          <span className="ujjain-lead-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-ujjain-gold/40 to-transparent z-10" />
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/NAwvVCBNTL0"
              title="Simhastha Ujjain 2028 Preparation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="px-4 py-3 flex justify-between items-center">
            <span className="text-ujjain-gold font-bold text-lg">
              {t.y2028}
            </span>
            <span className="text-ujjain-cream/60 text-xs">{t.l2028}</span>
          </div>
        </div>
      </div>
    </section>
  );
}