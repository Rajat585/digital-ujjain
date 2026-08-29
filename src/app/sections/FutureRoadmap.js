"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../components/LanguageContext";

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

const projectsData = {
  hi: [
    {
      title: "सिंहस्थ 2028 अवसंरचना",
      desc: "करोड़ों रुपयों की मेगा अवसंरचना परियोजना — नए घाट, सड़कें, और पार्किंग ज़ोन।",
      icon: "🏗️",
      status: "योजना चरण में",
      completion: "2027 तक",
      extraStats: [
        { value: "₹2,800 Cr", label: "अनुमानित बजट" },
        { value: "35+", label: "नए घाट" },
        { value: "500 एकड़", label: "पार्किंग ज़ोन" },
      ],
      highlights: [
        "क्षिप्रा तट पर 35 से ज़्यादा नए स्नान घाटों का निर्माण",
        "शहर के बाहर 4 बड़ी अस्थायी पार्किंग टाउनशिप",
        "भीड़ नियंत्रण के लिए नए पैदल यात्री कॉरिडोर",
        "करोड़ों श्रद्धालुओं के लिए अस्थायी आवास और चिकित्सा शिविरों की योजना",
      ],
      impact:
        "यह अवसंरचना सिंहस्थ 2028 में अनुमानित 10 करोड़ से ज़्यादा श्रद्धालुओं को सुरक्षित तरीके से संभालने के लिए तैयार की जा रही है — उज्जैन के इतिहास में अब तक की सबसे बड़ी नागरिक परियोजना।",
    },
    {
      title: "स्मार्ट टूरिज्म ऐप",
      desc: "यात्रियों के लिए एक आधिकारिक ऐप — रीयल-टाइम मार्गदर्शन, बुकिंग, और एआई सहायक के साथ।",
      icon: "📱",
      status: "विकास में",
      completion: "मध्य 2026 तक",
      extraStats: [
        { value: "12+", label: "भाषाएं" },
        { value: "AI", label: "चैट सहायक" },
        { value: "लाइव", label: "क्राउड ट्रैकिंग" },
      ],
      highlights: [
        "रीयल-टाइम दर्शन कतार और भीड़-स्तर की जानकारी",
        "सत्यापित होटल/धर्मशाला बुकिंग, शून्य कमीशन के साथ",
        "एआई चैटबॉट जो हिंदी, अंग्रेज़ी और क्षेत्रीय भाषाओं में जवाब दे",
        "ऑफलाइन मोड ताकि कम-नेटवर्क क्षेत्रों में भी काम करे",
      ],
      impact:
        "यह ऐप यात्रियों और श्रद्धालुओं के अनुभव को डिजिटल रूप से सहज बनाएगा, खासकर सिंहस्थ जैसे मेगा-इवेंट के दौरान जब लाखों लोग एक साथ शहर में आते हैं।",
    },
    {
      title: "क्षिप्रा नदी सफाई चरण-2",
      desc: "नदी की सफाई और जल स्तर सुधारने का अगला चरण।",
      icon: "🌊",
      status: "शुरुआती चरण",
      completion: "2027 तक",
      extraStats: [
        { value: "चरण-2", label: "वर्तमान चरण" },
        { value: "8 किमी", label: "नदी तट कवर" },
        { value: "3", label: "नए ट्रीटमेंट प्लांट" },
      ],
      highlights: [
        "3 नए सीवेज ट्रीटमेंट प्लांट औद्योगिक अपशिष्ट रोकने के लिए",
        "नदी में प्लास्टिक और ठोस कचरा हटाने के लिए निरंतर अभियान",
        "ऊपरी बहाव के गांवों में भी जल-शोधन जागरूकता अभियान",
        "जल-स्तर और प्रवाह की नियमित निगरानी के लिए सेंसर",
      ],
      impact:
        "इसका लक्ष्य है कि सिंहस्थ 2028 तक क्षिप्रा नदी का जल स्नान योग्य और साफ स्तर तक पहुंचे, जो करोड़ों श्रद्धालुओं के लिए सीधे तौर पर महत्वपूर्ण है।",
    },
    {
      title: "ग्रीन एनर्जी ज़ोन",
      desc: "शहर के प्रमुख स्थानों पर सोलर-पावर्ड स्मार्ट लाइटिंग।",
      icon: "🌞",
      status: "पायलट चरण",
      completion: "2026 के अंत तक",
      extraStats: [
        { value: "50+", label: "सोलर लाइट पॉइंट्स" },
        { value: "60%", label: "बिजली बचत लक्ष्य" },
        { value: "5", label: "प्रमुख ज़ोन" },
      ],
      highlights: [
        "महाकाल कॉरिडोर और घाटों पर सोलर-पावर्ड स्मार्ट स्ट्रीटलाइट",
        "मोशन-सेंसर आधारित लाइटिंग ऊर्जा बचाने के लिए",
        "सार्वजनिक स्थानों पर मोबाइल के लिए सोलर चार्जिंग पॉइंट्स",
        "कार्बन फुटप्रिंट कम करने का शहर-व्यापी लक्ष्य",
      ],
      impact:
        "यह पहल उज्जैन को एक टिकाऊ तीर्थ-नगरी बनाने की दिशा में एक महत्वपूर्ण कदम है, जहां धार्मिक परंपरा और आधुनिक ग्रीन तकनीक साथ-साथ चलते हैं।",
    },
  ],
  en: [
    {
      title: "Simhastha 2028 Infrastructure",
      desc: "A mega infrastructure project worth crores — new ghats, roads, and parking zones.",
      icon: "🏗️",
      status: "In Planning Phase",
      completion: "By 2027",
      extraStats: [
        { value: "₹2,800 Cr", label: "Estimated Budget" },
        { value: "35+", label: "New Ghats" },
        { value: "500 Acre", label: "Parking Zone" },
      ],
      highlights: [
        "Construction of 35+ new bathing ghats along the Kshipra riverbank",
        "4 large temporary parking townships on the city outskirts",
        "New pedestrian corridors for better crowd management",
        "Planning of temporary housing and medical camps for crores of devotees",
      ],
      impact:
        "This infrastructure is being built to safely handle an estimated 10+ crore devotees during Simhastha 2028 — the largest civic project in Ujjain's history so far.",
    },
    {
      title: "Smart Tourism App",
      desc: "An official app for visitors — real-time guidance, booking, and an AI assistant.",
      icon: "📱",
      status: "In Development",
      completion: "By mid-2026",
      extraStats: [
        { value: "12+", label: "Languages" },
        { value: "AI", label: "Chat Assistant" },
        { value: "Live", label: "Crowd Tracking" },
      ],
      highlights: [
        "Real-time darshan queue and crowd-level information",
        "Verified hotel/dharamshala booking with zero commission",
        "AI chatbot that responds in Hindi, English, and regional languages",
        "Offline mode for use in low-network areas",
      ],
      impact:
        "This app will make the experience of visitors and devotees seamlessly digital, especially during mega-events like Simhastha when millions arrive in the city at once.",
    },
    {
      title: "Kshipra River Cleaning Phase-2",
      desc: "The next phase of river cleaning and water level improvement.",
      icon: "🌊",
      status: "Early Phase",
      completion: "By 2027",
      extraStats: [
        { value: "Phase-2", label: "Current Stage" },
        { value: "8 KM", label: "Riverbank Covered" },
        { value: "3", label: "New Treatment Plants" },
      ],
      highlights: [
        "3 new sewage treatment plants to stop industrial waste inflow",
        "Continuous drive to remove plastic and solid waste from the river",
        "Water-treatment awareness campaigns in upstream villages",
        "Sensors for regular monitoring of water level and flow",
      ],
      impact:
        "The goal is for the Kshipra river to reach a clean, bathing-safe level by Simhastha 2028 — directly important for crores of devotees.",
    },
    {
      title: "Green Energy Zones",
      desc: "Solar-powered smart lighting at key locations across the city.",
      icon: "🌞",
      status: "Pilot Phase",
      completion: "By end of 2026",
      extraStats: [
        { value: "50+", label: "Solar Light Points" },
        { value: "60%", label: "Energy Savings Target" },
        { value: "5", label: "Key Zones" },
      ],
      highlights: [
        "Solar-powered smart streetlights along the Mahakal corridor and ghats",
        "Motion-sensor based lighting to save energy",
        "Solar mobile-charging points at public spaces",
        "City-wide goal to reduce carbon footprint",
      ],
      impact:
        "This initiative is a major step toward making Ujjain a sustainable pilgrimage city, where religious tradition and modern green technology move forward together.",
    },
  ],
};

const headings = {
  hi: {
    title: "आगे क्या चल रहा है",
    subtitle: "उज्जैन के लिए आने वाली बड़ी परियोजनाएं",
  },
  en: {
    title: "What's Coming Next",
    subtitle: "Upcoming major projects for Ujjain",
  },
  hinglish: {
    title: "Aage Kya Chal Raha Hai",
    subtitle: "Ujjain ke liye aane wale badi pariyojanaayein",
  },
};

const modalLabels = {
  hi: {
    highlights: "मुख्य बातें",
    impact: "प्रभाव",
    completion: "अनुमानित पूर्णता",
  },
  en: {
    highlights: "Key Highlights",
    impact: "Impact",
    completion: "Expected Completion",
  },
  hinglish: {
    highlights: "Mukhya Baatein",
    impact: "Prabhav",
    completion: "Anumaanit Poornta",
  },
};

const readMoreLabel = {
  hi: "और पढ़ें →",
  en: "Read More →",
  hinglish: "Aur Padhein →",
};

projectsData.hinglish = [
  {
    title: "Simhastha 2028 Infrastructure",
    desc: "Crore rupaye ka mega infrastructure project — naye ghats, roads, aur parking zones.",
    icon: "🏗️",
    status: "Planning Charan Mein",
    completion: "2027 tak",
    extraStats: [
      { value: "₹2,800 Cr", label: "Anumaanit Budget" },
      { value: "35+", label: "Naye Ghats" },
      { value: "500 Acre", label: "Parking Zone" },
    ],
    highlights: [
      "Kshipra tat par 35 se zyada naye snan ghats ka nirmaan",
      "Shehar ke bahar 4 badi temporary parking townships",
      "Bheed niyantran ke liye naye pedestrian corridors",
      "Crore shraddhaluon ke liye asthaayi aawas aur medical camps ki planning",
    ],
    impact:
      "Ye infrastructure Simhastha 2028 mein anumaanit 10 crore se zyada shraddhaluon ko surakshit tareeke se sambhalne ke liye taiyar kiya ja raha hai — ab tak ka sabse bada civic project Ujjain ke itihaas mein.",
  },
  {
    title: "Smart Tourism App",
    desc: "Pryatakon ke liye ek official app — real-time guidance, booking, aur AI assistant ke saath.",
    icon: "📱",
    status: "Development Mein",
    completion: "Madhya 2026 tak",
    extraStats: [
      { value: "12+", label: "Bhaashaayein" },
      { value: "AI", label: "Chat Assistant" },
      { value: "Live", label: "Crowd Tracking" },
    ],
    highlights: [
      "Real-time darshan queue aur crowd-level jaankari",
      "Verified hotel/dharamshala booking, zero commission ke saath",
      "AI chatbot jo Hindi, English aur regional bhaashaon mein jawab de",
      "Offline mode taaki low-network areas mein bhi kaam kare",
    ],
    impact:
      "Ye app pryatakon aur shraddhaluon ka anubhav digitally seamless banayega, khaaskar Simhastha jaise mega-event ke doraan jab lakhon log ek saath shehar mein aate hain.",
  },
  {
    title: "Kshipra River Cleaning Phase-2",
    desc: "Nadi ki safai aur jal star sudharne ka agla charan.",
    icon: "🌊",
    status: "Shuruaati Charan",
    completion: "2027 tak",
    extraStats: [
      { value: "Phase-2", label: "Current Stage" },
      { value: "8 KM", label: "Nadi Tat Cover" },
      { value: "3", label: "Naye Treatment Plants" },
    ],
    highlights: [
      "3 naye sewage treatment plants industrial waste rokne ke liye",
      "Nadi mein plastic aur solid waste hataane ke liye continuous drive",
      "Upstream villages mein bhi jal-shodhan jaagrukta abhiyaan",
      "Jal-star aur pravaah ki niyamit monitoring ke liye sensors",
    ],
    impact:
      "Iska lakshya hai ki Simhastha 2028 tak Kshipra nadi ka jal snan yogya aur saaf star tak pahunche, jo crore shraddhaluon ke liye seedhe roop se mahatvapurn hai.",
  },
  {
    title: "Green Energy Zones",
    desc: "Shehar ke pramukh sthanon par solar-powered smart lighting.",
    icon: "🌞",
    status: "Pilot Charan",
    completion: "2026 ke ant tak",
    extraStats: [
      { value: "50+", label: "Solar Light Points" },
      { value: "60%", label: "Bijli Bachat Lakshya" },
      { value: "5", label: "Pramukh Zones" },
    ],
    highlights: [
      "Mahakal corridor aur ghaton par solar-powered smart streetlights",
      "Motion-sensor based lighting energy bachaane ke liye",
      "Public spaces mein solar charging points mobile ke liye",
      "Carbon footprint kam karne ka shehar-vyaapi lakshya",
    ],
    impact:
      "Ye pahal Ujjain ko ek sustainable teerth-shehar banane ki disha mein ek mahatvapurn kadam hai, jahan dharmik parampara aur aadhunik green technology saath-saath chalte hain.",
  },
];

export default function FutureRoadmap() {
  const { lang } = useLanguage();
  const projects = projectsData[lang];
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const gridRef = useRef(null);
  const activeProject = activeIndex !== null ? projects[activeIndex] : null;

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const openModal = (index) => {
    setActiveIndex(index);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setModalVisible(true)),
    );
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setActiveIndex(null), 300);
  };

  return (
    <section
      id="future-roadmap"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">
        {headings[lang].title}
      </h2>
      <p className="text-ujjain-cream mb-12 text-center max-w-xl">
        {headings[lang].subtitle}
      </p>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="group bg-white/5 border border-ujjain-gold/30 rounded-xl p-6 hover:border-ujjain-gold hover:-translate-y-1.5 hover:shadow-xl hover:shadow-ujjain-gold/10 transition-all duration-300 ease-out flex flex-col"
            style={{
              opacity: gridVisible ? 1 : 0,
              transform: gridVisible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 600ms ${EASE}, transform 600ms ${EASE}, border-color 300ms, box-shadow 300ms`,
              transitionDelay: gridVisible ? `${index * 120}ms` : "0ms",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                {project.icon}
              </div>
              <span className="relative text-xs px-3 py-1 rounded-full bg-ujjain-gold/10 border border-ujjain-gold/40 text-ujjain-saffron whitespace-nowrap overflow-hidden">
                <span className="absolute inset-0 bg-ujjain-saffron/10 animate-pulse" />
                <span className="relative">{project.status}</span>
              </span>
            </div>
            <h3 className="text-xl font-bold text-ujjain-gold mb-2">
              {project.title}
            </h3>
            <p className="text-ujjain-cream/80 text-sm mb-4 flex-grow">
              {project.desc}
            </p>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {project.extraStats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-sm md:text-base font-bold text-ujjain-gold">
                    {s.value}
                  </div>
                  <div className="text-ujjain-cream/60 text-[10px] md:text-xs">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => openModal(index)}
              className="self-start px-5 py-2 rounded-full bg-ujjain-gold text-ujjain-dark font-semibold hover:bg-ujjain-saffron hover:scale-105 transition-all duration-300 ease-out text-sm"
            >
              {readMoreLabel[lang]}
            </button>
          </div>
        ))}
      </div>

      {activeProject && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 transition-opacity duration-300"
          style={{
            opacity: modalVisible ? 1 : 0,
            transitionTimingFunction: EASE,
          }}
          onClick={closeModal}
        >
          <div
            className="w-full max-w-xl bg-ujjain-dark border border-ujjain-gold/40 rounded-xl p-6 md:p-8 relative max-h-[85vh] overflow-y-auto transition-all duration-300"
            style={{
              opacity: modalVisible ? 1 : 0,
              transform: modalVisible
                ? "scale(1) translateY(0)"
                : "scale(0.94) translateY(12px)",
              transitionTimingFunction: EASE,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-ujjain-cream hover:text-ujjain-gold hover:rotate-90 text-2xl leading-none transition-all duration-300 ease-out"
            >
              ×
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="text-4xl">{activeProject.icon}</div>
              <span className="text-xs px-3 py-1 rounded-full bg-ujjain-gold/10 border border-ujjain-gold/40 text-ujjain-saffron">
                {activeProject.status}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-ujjain-gold mt-2 mb-1">
              {activeProject.title}
            </h3>
            <p className="text-ujjain-cream/70 text-sm mb-4">
              {modalLabels[lang].completion}:{" "}
              <span className="text-ujjain-cream">
                {activeProject.completion}
              </span>
            </p>
            <p className="text-ujjain-cream mb-6">{activeProject.desc}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {activeProject.extraStats.map((s, i) => (
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
              {activeProject.highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex gap-2"
                  style={{
                    opacity: modalVisible ? 1 : 0,
                    transform: modalVisible
                      ? "translateX(0)"
                      : "translateX(-8px)",
                    transition: `opacity 400ms ${EASE}, transform 400ms ${EASE}`,
                    transitionDelay: modalVisible ? `${150 + i * 70}ms` : "0ms",
                  }}
                >
                  <span className="text-ujjain-saffron">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-ujjain-gold font-semibold mb-2">
              {modalLabels[lang].impact}
            </h4>
            <p className="text-ujjain-cream/90 text-sm text-left">
              {activeProject.impact}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
