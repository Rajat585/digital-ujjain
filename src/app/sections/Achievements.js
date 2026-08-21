"use client";
import { useState } from "react";
import { useLanguage } from "../components/LanguageContext";

const achievementsData = {
  hi: [
    {
      title: "Smart City Award",
      desc: "Bharat Sarkar dwara Smart City Mission mein utkrisht pradarshan ke liye samman.",
      icon: "🏆",
      year: "2024",
      awardedBy: "Bharat Sarkar, Awas evam Shahri Karya Mantralaya",
      extraStats: [
        { value: "Top 20", label: "Rashtriya Rank" },
        { value: "45+", label: "Smart Projects" },
        { value: "₹900+ Cr", label: "Mission Nivesh" },
      ],
      highlights: [
        "Smart traffic, digital surveillance aur e-governance mein utkrisht kaam",
        "Integrated Command & Control Centre ki safal sthapna",
        "Digital infrastructure ke liye rashtriya star par pehchaan",
        "Simhastha 2028 taiyari ko dhyan mein rakhkar innovative planning",
      ],
      impact:
        "Is samman ne Ujjain ko Madhya Pradesh ke agraniya smart shehron mein sthapit kiya hai, aur aane wale Simhastha mahaparv ke liye ek majboot digital aadhar taiyar kiya hai.",
    },
    {
      title: "Swachh Sarvekshan Rank",
      desc: "Rashtriya Swachhata Sarvekshan mein Madhya Pradesh ke top shehron mein sthan.",
      icon: "🥇",
      year: "2024",
      awardedBy: "Swachh Bharat Mission, Bharat Sarkar",
      extraStats: [
        { value: "Top 10", label: "MP Mein Rank" },
        { value: "95%", label: "Door-to-Door Collection" },
        { value: "12", label: "Ghat Cleaning Drives" },
      ],
      highlights: [
        "Ghar-ghar kachra sangrahan aur segregation mein utkrisht pradarshan",
        "Kshipra tat aur pramukh ghaton par niyamit safai abhiyaan",
        "Public toilets aur waste-management infrastructure mein sudhar",
        "Nagarikon ki bhaagidari se Swachhata jaagrukta abhiyaan",
      ],
      impact:
        "Ye rank Ujjain ke safai vyavastha mein lagatar sudhar ko darshata hai, jo teerth-yatriyon ke liye ek saaf-suthra aur swasth anubhav sunishchit karta hai.",
    },
    {
      title: "Heritage City Recognition",
      desc: "Dharmik aur aitihasik mahatva ke liye Heritage City ka darja.",
      icon: "🏛️",
      year: "2023",
      awardedBy: "Bharat Sarkar, Sanskritik Mantralaya (HRIDAY Yojna)",
      extraStats: [
        { value: "2,500+", label: "Saal Purana Itihaas" },
        { value: "1", label: "Jyotirlinga Sthal" },
        { value: "50+", label: "Heritage Structures" },
      ],
      highlights: [
        "HRIDAY (Heritage City Development Yojna) mein shaamil kiya gaya",
        "Prachin mandiron aur smaarakon ke sanrakshan ke liye vishesh fund",
        "Mahakaleshwar Jyotirlinga sahit kai aitihasik dharohron ki suraksha",
        "Sanskritik paryatan ko badhava dene wali yojnayein shuru hui",
      ],
      impact:
        "Ye maanyata Ujjain ki hazaaron saal purani sanskritik virasat ko sanrakshit karne ke saath-saath ise ek vishwastariya dharmik-paryatan kendra ke roop mein sthapit karti hai.",
    },
    {
      title: "Best Tourism Destination",
      desc: "Rajya paryatan puraskar mein Ujjain ko shreshtha dharmik paryatan sthal chuna gaya.",
      icon: "⭐",
      year: "2024",
      awardedBy: "Madhya Pradesh Paryatan Vikas Nigam",
      extraStats: [
        { value: "1.2 Cr+", label: "Vaarshik Paryatak" },
        { value: "#1", label: "Dharmik Paryatan MP Mein" },
        { value: "4.6★", label: "Ausat Yatri Rating" },
      ],
      highlights: [
        "Rajya ke sarvashreshtha dharmik paryatan sthal ke roop mein samman",
        "Behtar connectivity, guide services aur yatri suvidhaon ke liye pehchaan",
        "Simhastha 2028 se pehle infrastructure taiyari ki sarahna",
        "Desh-videsh ke shraddhaluon dwara sabse zyada pasand kiya gaya sthal",
      ],
      impact:
        "Ye puraskar Ujjain ke paryatan anubhav ko rashtriya star par pramaanit karta hai aur Simhastha 2028 ke liye ek vishwasneey aadhar taiyar karta hai.",
    },
  ],
  en: [
    {
      title: "Smart City Award",
      desc: "Honoured by the Government of India for outstanding performance under Smart City Mission.",
      icon: "🏆",
      year: "2024",
      awardedBy: "Government of India, Ministry of Housing & Urban Affairs",
      extraStats: [
        { value: "Top 20", label: "National Rank" },
        { value: "45+", label: "Smart Projects" },
        { value: "₹900+ Cr", label: "Mission Investment" },
      ],
      highlights: [
        "Outstanding execution in smart traffic, digital surveillance, and e-governance",
        "Successful setup of an Integrated Command & Control Centre",
        "National recognition for digital infrastructure development",
        "Innovative planning with Simhastha 2028 readiness in mind",
      ],
      impact:
        "This award has established Ujjain among Madhya Pradesh's leading smart cities and laid a strong digital foundation for the upcoming Simhastha event.",
    },
    {
      title: "Swachh Sarvekshan Rank",
      desc: "Ranked among Madhya Pradesh's top cities in the National Cleanliness Survey.",
      icon: "🥇",
      year: "2024",
      awardedBy: "Swachh Bharat Mission, Government of India",
      extraStats: [
        { value: "Top 10", label: "Rank in MP" },
        { value: "95%", label: "Door-to-Door Collection" },
        { value: "12", label: "Ghat Cleaning Drives" },
      ],
      highlights: [
        "Outstanding performance in door-to-door waste collection and segregation",
        "Regular cleaning drives along the Kshipra riverbank and major ghats",
        "Improvements in public toilets and waste-management infrastructure",
        "Citizen-driven cleanliness awareness campaigns",
      ],
      impact:
        "This rank reflects Ujjain's continuous improvement in sanitation, ensuring a clean and healthy experience for pilgrims.",
    },
    {
      title: "Heritage City Recognition",
      desc: "Recognized as a Heritage City for its religious and historical significance.",
      icon: "🏛️",
      year: "2023",
      awardedBy: "Government of India, Ministry of Culture (HRIDAY Scheme)",
      extraStats: [
        { value: "2,500+", label: "Years of History" },
        { value: "1", label: "Jyotirlinga Site" },
        { value: "50+", label: "Heritage Structures" },
      ],
      highlights: [
        "Included under the HRIDAY (Heritage City Development) Scheme",
        "Special funding for the conservation of ancient temples and monuments",
        "Protection of several historical landmarks, including the Mahakaleshwar Jyotirlinga",
        "Launch of schemes to promote cultural tourism",
      ],
      impact:
        "This recognition preserves Ujjain's thousands-of-years-old cultural heritage while establishing it as a world-class religious tourism hub.",
    },
    {
      title: "Best Tourism Destination",
      desc: "Chosen as the best religious tourism destination in the State Tourism Awards.",
      icon: "⭐",
      year: "2024",
      awardedBy: "Madhya Pradesh Tourism Development Corporation",
      extraStats: [
        { value: "1.2 Cr+", label: "Annual Visitors" },
        { value: "#1", label: "Religious Tourism in MP" },
        { value: "4.6★", label: "Average Visitor Rating" },
      ],
      highlights: [
        "Honoured as the state's best religious tourism destination",
        "Recognized for improved connectivity, guide services, and visitor facilities",
        "Praised for infrastructure readiness ahead of Simhastha 2028",
        "Most preferred destination among devotees from India and abroad",
      ],
      impact:
        "This award nationally validates Ujjain's tourism experience and builds a trusted foundation for Simhastha 2028.",
    },
  ],
};

const headings = {
  hi: {
    title: "Ujjain Ki Uplabdhiyan",
    subtitle: "Shehar ko mile samman aur pehchaan",
  },
  en: {
    title: "Ujjain's Achievements",
    subtitle: "Recognitions and honours earned by the city",
  },
};

const modalLabels = {
  hi: {
    highlights: "Mukhya Baatein",
    impact: "Prabhav",
    awardedBy: "Pradaan Karta",
  },
  en: {
    highlights: "Key Highlights",
    impact: "Impact",
    awardedBy: "Awarded By",
  },
};

const readMoreLabel = { hi: "Aur Padhein →", en: "Read More →" };

export default function Achievements() {
  const { lang } = useLanguage();
  const achievements = achievementsData[lang];
  const [activeIndex, setActiveIndex] = useState(null);
  const activeItem = activeIndex !== null ? achievements[activeIndex] : null;

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark">
      <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">
        {headings[lang].title}
      </h2>
      <p className="text-ujjain-cream mb-12 text-center max-w-xl">
        {headings[lang].subtitle}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white/5 border border-ujjain-gold/30 rounded-xl p-6 hover:border-ujjain-gold hover:-translate-y-2 hover:scale-105 hover:shadow-lg hover:shadow-ujjain-gold/20 transition-all duration-300"
          >
            <span className="text-xs text-ujjain-saffron font-semibold mb-2 bg-ujjain-saffron/10 px-3 py-0.5 rounded-full">
              {item.year}
            </span>
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-lg font-bold text-ujjain-gold mb-2">
              {item.title}
            </h3>
            <p className="text-ujjain-cream/70 text-sm mb-4">{item.desc}</p>

            <div className="grid grid-cols-3 gap-2 mb-4 w-full">
              {item.extraStats.map((s, i) => (
                <div key={i}>
                  <div className="text-xs md:text-sm font-bold text-ujjain-gold">
                    {s.value}
                  </div>
                  <div className="text-ujjain-cream/50 text-[9px] md:text-[10px]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveIndex(index)}
              className="mt-auto px-4 py-1.5 rounded-full bg-ujjain-gold text-ujjain-dark text-xs font-semibold hover:bg-ujjain-saffron transition"
            >
              {readMoreLabel[lang]}
            </button>
          </div>
        ))}
      </div>

      {activeItem && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="w-full max-w-xl bg-ujjain-dark border border-ujjain-gold/40 rounded-xl p-6 md:p-8 relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute top-4 right-4 text-ujjain-cream hover:text-ujjain-gold text-2xl leading-none"
            >
              ×
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="text-4xl">{activeItem.icon}</div>
              <span className="text-xs px-3 py-1 rounded-full bg-ujjain-saffron/10 border border-ujjain-saffron/40 text-ujjain-saffron">
                {activeItem.year}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-ujjain-gold mt-2 mb-1">
              {activeItem.title}
            </h3>
            <p className="text-ujjain-cream/70 text-sm mb-4">
              {modalLabels[lang].awardedBy}:{" "}
              <span className="text-ujjain-cream">{activeItem.awardedBy}</span>
            </p>
            <p className="text-ujjain-cream mb-6">{activeItem.desc}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {activeItem.extraStats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-ujjain-gold">
                    {s.value}
                  </div>
                  <div className="text-ujjain-cream/70 text-xs">{s.label}</div>
                </div>
              ))}
            </div>

            <h4 className="text-ujjain-gold font-semibold mb-2">
              {modalLabels[lang].highlights}
            </h4>
            <ul className="text-ujjain-cream/90 text-sm mb-6 space-y-2 text-left">
              {activeItem.highlights.map((h, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-ujjain-saffron">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-ujjain-gold font-semibold mb-2">
              {modalLabels[lang].impact}
            </h4>
            <p className="text-ujjain-cream/90 text-sm text-left">
              {activeItem.impact}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
