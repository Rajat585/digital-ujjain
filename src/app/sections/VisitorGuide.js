"use client";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../components/LanguageContext";

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

const text = {
  hi: {
    title: "यात्री गाइड",
    subtitle: "सिंहस्थ 2028 की यात्रा की योजना बनाने के लिए ज़रूरी जानकारी",
    reachTitle: "कैसे पहुंचें",
    reachTrain: "रेल मार्ग",
    reachTrainDesc:
      "उज्जैन जंक्शन — दिल्ली, मुंबई, अहमदाबाद से सीधी ट्रेनें। सिंहस्थ के दौरान विशेष ट्रेनें भी चलेंगी।",
    reachAir: "हवाई यात्रा",
    reachAirDesc:
      "सबसे नज़दीकी हवाई अड्डा इंदौर (देवी अहिल्याबाई होल्कर एयरपोर्ट), उज्जैन से लगभग 55-65 किमी दूर है। वहां से टैक्सी/बस से आसानी से पहुंचा जा सकता है।",
    reachRoad: "सड़क मार्ग",
    reachRoadDesc:
      "एनएच52 से अच्छी तरह जुड़ा हुआ। इंदौर-उज्जैन हाईवे 2028 तक 6-लेन हो जाएगा। नियमित सरकारी और निजी बसें उपलब्ध हैं।",
    foodTitle: "खान-पान",
    foodDesc:
      "केवल अधिकृत/सत्यापित स्टॉल से ही खाना-पानी लें। महाकाल का प्रसाद और उज्जैन की पारंपरिक मिठाइयां ज़रूर आज़माएं।",
    transportTitle: "स्थानीय परिवहन",
    transportDesc:
      "ऑटो-रिक्शा और टैक्सी स्थानीय यात्रा के लिए आसानी से मिल जाएंगे। बस स्टैंड और रेलवे स्टेशन हमारे इंटरैक्टिव मानचित्र पर पहले से चिह्नित हैं।",
    transportLink: "मानचित्र पर देखें →",
    parkingTitle: "पार्किंग",
    parkingDesc:
      "सिंहस्थ 2028 के लिए 500 एकड़ का समर्पित पार्किंग ज़ोन योजनाबद्ध है। नानाखेड़ा क्षेत्र मानचित्र पर 'पार्किंग ज़ोन' टैग के साथ चिह्नित है।",
    accommodationTitle: "ठहरने की जगह",
    accommodationDesc:
      "सत्यापित ठहराव और सरकारी-सत्यापित मूल्य के साथ पूरी सूची हमारे स्टे बुकिंग सेक्शन में उपलब्ध है।",
    accommodationLink: "पूरी सूची यहां देखें →",
    emergencyTitle: "आपातकालीन सहायता",
    emergencyDesc: "किसी भी ज़रूरत के लिए ये हेल्पलाइन नंबर हमेशा याद रखें:",
    footNote:
      "यह जानकारी योजना बनाने के लिए है — सिंहस्थ के दौरान स्थानीय प्रशासन के रीयल-टाइम अपडेट को प्राथमिकता दें।",
  },
  en: {
    title: "Visitor Guide",
    subtitle: "Essential information to plan your Simhastha 2028 visit",
    reachTitle: "How to Reach",
    reachTrain: "Train",
    reachTrainDesc:
      "Ujjain Junction has direct trains from Delhi, Mumbai, and Ahmedabad. Special trains will also run during Simhastha.",
    reachAir: "By Air",
    reachAirDesc:
      "The nearest airport is Indore (Devi Ahilyabai Holkar Airport), about 55-65 km from Ujjain. Easily reachable from there by taxi or bus.",
    reachRoad: "By Road",
    reachRoadDesc:
      "Well connected via NH52. The Indore-Ujjain highway will be widened to 6 lanes by 2028. Regular state-run and private buses are available.",
    foodTitle: "Food",
    foodDesc:
      "Only use authorized/verified stalls for food and water. Don't miss the Mahakal prasad and Ujjain's traditional sweets.",
    transportTitle: "Local Transportation",
    transportDesc:
      "Auto-rickshaws and taxis are easily available for local travel. Bus stands and the railway station are already marked on our interactive map.",
    transportLink: "View on Map →",
    parkingTitle: "Parking",
    parkingDesc:
      "A dedicated 500 Acre parking zone is planned for Simhastha 2028. The Nanakheda area is marked on the map with a 'Parking Zone' tag.",
    accommodationTitle: "Accommodation",
    accommodationDesc:
      "Verified stays with government-verified pricing are available in full in our Stay Booking section.",
    accommodationLink: "View full list here →",
    emergencyTitle: "Emergency Assistance",
    emergencyDesc: "Keep these helpline numbers handy for any need:",
    footNote:
      "This information is for planning purposes — during Simhastha, please prioritize real-time updates from local administration.",
  },
};

text.hinglish = {
  title: "Visitor Guide",
  subtitle: "Simhastha 2028 ki yatra plan karne ke liye zaroori jaankari",
  reachTitle: "Kaise Pahunchein",
  reachTrain: "Train",
  reachTrainDesc:
    "Ujjain Junction — Delhi, Mumbai, Ahmedabad se seedhi trains. Simhastha ke dauraan special trains bhi chalengi.",
  reachAir: "Hawai Yatra",
  reachAirDesc:
    "Sabse nazdeek airport Indore (Devi Ahilyabai Holkar Airport), Ujjain se lagbhag 55-65 km door. Wahan se taxi/bus se aasaani se pahunch sakte hain.",
  reachRoad: "Sadak Marg",
  reachRoadDesc:
    "NH52 se achhi tarah connected. Indore-Ujjain highway 2028 tak 6-lane ho jayegi. Regular state-run aur private buses uplabdh hain.",
  foodTitle: "Khaan-Paan",
  foodDesc:
    "Sirf authorized/verified stalls se hi khana-paani lein. Mahakal ka prasad aur Ujjain ke traditional sweets zaroor try karein.",
  transportTitle: "Sthaniya Transport",
  transportDesc:
    "Auto-rickshaw aur taxi sthaniya yatra ke liye aasaani se milenge. Bus stands aur railway station hamare interactive map par pehle se marked hain.",
  transportLink: "Map par dekhein →",
  parkingTitle: "Parking",
  parkingDesc:
    "Simhastha 2028 ke liye 500 Acre ka dedicated parking zone planned hai. Nanakheda area map par 'Parking Zone' tag ke saath marked hai.",
  accommodationTitle: "Thaharne Ki Jagah",
  accommodationDesc:
    "Verified stays aur sarkari-verified pricing ke saath poori list humare Stay Booking section me uplabdh hai.",
  accommodationLink: "Poori list yahan dekhein →",
  emergencyTitle: "Emergency Sahayta",
  emergencyDesc:
    "Kisi bhi zaroorat ke liye ye helpline numbers hamesha yaad rakhein:",
  footNote:
    "Ye jaankari planning ke liye hai — Simhastha ke dauraan sthaniya prashasan ke real-time updates ko priority dein.",
};

const emergencyNumbers = [
  {
    icon: "🚓",
    label: { hi: "पुलिस", en: "Police", hinglish: "Police" },
    number: "100",
  },
  {
    icon: "🚑",
    label: { hi: "एम्बुलेंस", en: "Ambulance", hinglish: "Ambulance" },
    number: "108",
  },
  {
    icon: "🚒",
    label: { hi: "अग्निशमन", en: "Fire", hinglish: "Fire" },
    number: "101",
  },
  {
    icon: "☎️",
    label: {
      hi: "पर्यटक हेल्पलाइन",
      en: "Tourist Helpline",
      hinglish: "Tourist Helpline",
    },
    number: "1364",
  },
];

// shared reveal + hover classes for the info cards
const cardBase =
  "group bg-white/5 border border-ujjain-gold/30 rounded-xl p-6 hover:border-ujjain-gold/70 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_-8px_rgba(212,175,55,0.35)]";

export default function VisitorGuide() {
  const { lang } = useLanguage();
  const t = text[lang];

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
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // continuous stagger index across every card in the section
  const delayFor = (index) => `${150 + index * 70}ms`;
  const revealStyle = (index, extra = {}) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ${EASE}, transform 0.6s ${EASE}, border-color 0.4s ${EASE}, box-shadow 0.4s ${EASE}`,
    transitionDelay: visible ? delayFor(index) : "0ms",
    ...extra,
  });

  return (
    <section
      id="visitor-guide"
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
        className="text-ujjain-cream mb-12 text-center max-w-xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-12px)",
          transition: `opacity 0.7s ${EASE} 0.1s, transform 0.7s ${EASE} 0.1s`,
        }}
      >
        {t.subtitle}
      </p>

      {/* How to Reach */}
      <div className="w-full max-w-4xl mb-6">
        <h3
          className="text-xl font-bold text-ujjain-gold mb-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 0.6s ${EASE}`,
            transitionDelay: visible ? "100ms" : "0ms",
          }}
        >
          {t.reachTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className={cardBase} style={revealStyle(0)}>
            <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 w-fit">
              🚆
            </div>
            <h4 className="text-lg font-bold text-ujjain-gold mb-2 transition-colors duration-300 group-hover:text-ujjain-saffron">
              {t.reachTrain}
            </h4>
            <p className="text-ujjain-cream/80 text-sm">{t.reachTrainDesc}</p>
          </div>
          <div className={cardBase} style={revealStyle(1)}>
            <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 w-fit">
              ✈️
            </div>
            <h4 className="text-lg font-bold text-ujjain-gold mb-2 transition-colors duration-300 group-hover:text-ujjain-saffron">
              {t.reachAir}
            </h4>
            <p className="text-ujjain-cream/80 text-sm">{t.reachAirDesc}</p>
          </div>
          <div className={cardBase} style={revealStyle(2)}>
            <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 w-fit">
              🛣️
            </div>
            <h4 className="text-lg font-bold text-ujjain-gold mb-2 transition-colors duration-300 group-hover:text-ujjain-saffron">
              {t.reachRoad}
            </h4>
            <p className="text-ujjain-cream/80 text-sm">{t.reachRoadDesc}</p>
          </div>
        </div>
      </div>

      {/* Food + Transport + Parking */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl mb-6">
        <div className={cardBase} style={revealStyle(3)}>
          <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 w-fit">
            🍽️
          </div>
          <h4 className="text-lg font-bold text-ujjain-gold mb-2 transition-colors duration-300 group-hover:text-ujjain-saffron">
            {t.foodTitle}
          </h4>
          <p className="text-ujjain-cream/80 text-sm">{t.foodDesc}</p>
        </div>

        <div className={`${cardBase} flex flex-col`} style={revealStyle(4)}>
          <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 w-fit">
            🛺
          </div>
          <h4 className="text-lg font-bold text-ujjain-gold mb-2 transition-colors duration-300 group-hover:text-ujjain-saffron">
            {t.transportTitle}
          </h4>
          <p className="text-ujjain-cream/80 text-sm flex-1">
            {t.transportDesc}
          </p>
          <a
            href="#map"
            className="text-ujjain-gold text-sm font-semibold mt-4 w-fit inline-block transition-all duration-300 hover:text-ujjain-saffron hover:translate-x-1"
          >
            {t.transportLink}
          </a>
        </div>

        <div className={cardBase} style={revealStyle(5)}>
          <div className="text-3xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 w-fit">
            🅿️
          </div>
          <h4 className="text-lg font-bold text-ujjain-gold mb-2 transition-colors duration-300 group-hover:text-ujjain-saffron">
            {t.parkingTitle}
          </h4>
          <p className="text-ujjain-cream/80 text-sm">{t.parkingDesc}</p>
        </div>
      </div>

      {/* Accommodation link */}
      <div className="w-full max-w-4xl mb-6">
        <div
          className="group bg-white/5 border border-ujjain-gold/30 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-ujjain-gold/70 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(212,175,55,0.35)]"
          style={revealStyle(6)}
        >
          <div>
            <h4 className="text-lg font-bold text-ujjain-gold mb-1 transition-colors duration-300 group-hover:text-ujjain-saffron">
              {t.accommodationTitle}
            </h4>
            <p className="text-ujjain-cream/80 text-sm">
              {t.accommodationDesc}
            </p>
          </div>

          <a
            href="#hotel-booking"
            className="text-ujjain-gold text-sm font-semibold whitespace-nowrap w-fit transition-all duration-300 hover:text-ujjain-saffron hover:translate-x-1"
          >
            {t.accommodationLink}
          </a>
        </div>
      </div>

      {/* Emergency numbers */}
      <div className="w-full max-w-4xl">
        <h3
          className="text-xl font-bold text-ujjain-gold mb-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 0.6s ${EASE}`,
            transitionDelay: visible ? "650ms" : "0ms",
          }}
        >
          {t.emergencyTitle}
        </h3>
        <p
          className="text-ujjain-cream/80 text-sm mb-4"
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 0.6s ${EASE}`,
            transitionDelay: visible ? "700ms" : "0ms",
          }}
        >
          {t.emergencyDesc}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {emergencyNumbers.map((item, i) => (
            <div
              key={item.number}
              className="emergency-card bg-white/5 border border-ujjain-gold/30 rounded-xl p-4 text-center hover:border-ujjain-gold/80 hover:-translate-y-1 hover:bg-white/10"
              style={revealStyle(7 + i)}
            >
              <div className="text-2xl mb-1 transition-transform duration-300 hover:scale-125 w-fit mx-auto">
                {item.icon}
              </div>
              <div className="text-xl font-bold text-ujjain-gold">
                {item.number}
              </div>
              <div className="text-ujjain-cream/60 text-[11px] mt-1">
                {item.label[lang]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p
        className="text-ujjain-cream/40 text-xs mt-8 text-center max-w-md"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 0.8s ${EASE}`,
          transitionDelay: visible ? "1100ms" : "0ms",
        }}
      >
        {t.footNote}
      </p>

      <style jsx>{`
        .emergency-card {
          animation: none;
        }
        .emergency-card:hover {
          animation: pulseRing 1.4s ${EASE} infinite;
        }
        @keyframes pulseRing {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.35);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(212, 175, 55, 0);
          }
        }
      `}</style>
    </section>
  );
}
