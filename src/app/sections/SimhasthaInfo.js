"use client";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../components/LanguageContext";

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

const infoData = {
  hi: [
    {
      title: "धार्मिक एवं सांस्कृतिक महत्व",
      desc: "सिंहस्थ केवल एक मेला नहीं, एक जीवंत परंपरा है जो उज्जैन को हिंदू ब्रह्मांड-विज्ञान में विशेष स्थान देती है।",
      icon: "🕉️",
      points: [
        "सिंहस्थ तब होता है जब बृहस्पति (गुरु ग्रह) सिंह राशि में प्रवेश करते हैं — एक खगोलीय संयोग जो हर 12 साल में आता है।",
        "यह भारत के 4 पारंपरिक कुंभ मेलों में से एक है (बाकी तीन: हरिद्वार, प्रयागराज, और नासिक-त्र्यंबकेश्वर)।",
        "मान्यता है कि समुद्र मंथन के दौरान अमृत की कुछ बूंदें क्षिप्रा नदी के तट पर गिरी थीं — इसी वजह से उज्जैन में स्नान का इतना महत्व है।",
        "क्षिप्रा नदी में स्नान करने से पापों से मुक्ति और मोक्ष मिलता है, ऐसी श्रद्धा है।",
      ],
      impact:
        "प्राचीन भारतीय खगोलशास्त्री उज्जैन को समय-निर्धारण के लिए संदर्भ मध्याह्न रेखा मानते थे — इसीलिए इसे 'काल की नगरी' भी कहा जाता है।",
    },
    {
      title: "सिंहस्थ का इतिहास",
      desc: "उज्जैन में सिंहस्थ का आयोजन सदियों पुरानी परंपरा है, जो हर बार लाखों-करोड़ों श्रद्धालुओं को एकजुट करती है।",
      icon: "📜",
      points: [
        "पिछला सिंहस्थ 2016 में हुआ था — उस दौरान लगभग 5 करोड़ श्रद्धालु उज्जैन आए थे, आयोजन लगभग एक महीने तक चला था।",
        "राम घाट, जो सिंहस्थ से सबसे ज़्यादा जुड़ा हुआ घाट है, 8वीं शताब्दी से ही इस धार्मिक परंपरा का केंद्र रहा है।",
        "हर बार सिंहस्थ के साथ शहर की अवसंरचना और बढ़ती है — 2028 के लिए भी बड़े पैमाने पर विकास कार्य चल रहे हैं।",
        "महाकालेश्वर मंदिर, जो 12 ज्योतिर्लिंगों में से एक है, सदियों से इस आयोजन का आध्यात्मिक केंद्र रहा है।",
      ],
      impact:
        "हर 12 साल में होने वाला सिंहस्थ, उज्जैन के इतिहास और पहचान का अतीत-वर्तमान को जोड़ने वाला एक महत्वपूर्ण अध्याय है।",
    },
    {
      title: "मुख्य परंपराएं",
      desc: "सिंहस्थ के दौरान कई विशेष धार्मिक परंपराएं निभाई जाती हैं, जिनका अपना अलग महत्व है।",
      icon: "🙏",
      points: [
        "शाही स्नान (अमृत स्नान) — सबसे महत्वपूर्ण 'राजकीय स्नान', जिसमें 13 अखाड़े अपनी भव्य शोभा यात्राओं के साथ नदी में स्नान करते हैं। ये सबसे ज़्यादा भीड़ वाले दिन होते हैं।",
        "पर्व स्नान — बाकी शुभ स्नान तिथियां (जैसे पूर्णिमा, एकादशी) — इनमें भीड़ कम होती है, परिवारों के लिए बेहतर रहता है।",
        "कल्पवास — एक महीने तक नदी किनारे रहकर तप और व्रत करने की परंपरा, जो बहुत से श्रद्धालु निभाते हैं।",
        "पंचकोशी यात्रा — एक परिक्रमा मार्ग जो सिंहस्थ से जुड़ा हुआ एक प्राचीन तीर्थ-यात्रा है।",
        "13 अखाड़े (पारंपरिक साधु-संत संगठन) इस आयोजन का सबसे महत्वपूर्ण हिस्सा हैं — नागा साधु अपनी शोभा यात्राओं के साथ खास आकर्षण होते हैं।",
      ],
      impact:
        "इन परंपराओं को समझना यात्रियों के लिए ज़रूरी है — इससे वे सही दिन चुन सकते हैं: शांति से दर्शन के लिए पर्व स्नान, या भव्यता देखने के लिए शाही स्नान।",
    },
    {
      title: "मुख्य आकर्षण",
      desc: "उज्जैन में सिंहस्थ से जुड़े कई मंदिर और घाट हैं जो हर श्रद्धालु को अवश्य देखने चाहिए।",
      icon: "🛕",
      points: [
        "महाकालेश्वर ज्योतिर्लिंग — 12 ज्योतिर्लिंगों में से एक और एकमात्र दक्षिणमुखी लिंगम; प्रसिद्ध भस्म आरती सुबह लगभग 4 बजे होती है।",
        "काल भैरव मंदिर — उज्जैन के रक्षक देवता, क्षिप्रा तट पर स्थित, अपनी विशिष्ट आराधना पद्धति के लिए जाना जाता है।",
        "हर्षिद्धि मंदिर — एक शक्ति पीठ, अपने दो ऊंचे दीप स्तंभों के लिए प्रसिद्ध, जो उत्सव की शामों पर जलाए जाते हैं।",
        "राम घाट — सिंहस्थ से सबसे पुराना और सीधा जुड़ा हुआ स्नान घाट, जहां चित्रगुप्त मंदिर और संध्या क्षिप्रा आरती भी देखी जा सकती है।",
      ],
      impact: "",
      cta: true,
    },
  ],
  en: [
    {
      title: "Religious & Cultural Significance",
      desc: "Simhastha is more than an event — it is a living tradition that gives Ujjain a unique place in Hindu cosmology.",
      icon: "🕉️",
      points: [
        "Simhastha occurs when Brihaspati (Jupiter) enters Simha (Leo) — an astrological alignment that happens once every 12 years.",
        "It is one of India's four classical Kumbh Melas (the others being Haridwar, Prayagraj, and Nashik-Trimbak).",
        "According to belief, during the Samudra Manthan, a few drops of the nectar of immortality (Amrit) fell on the banks of the Shipra river — which is why bathing here holds such significance.",
        "Bathing in the Shipra river is believed to cleanse sins and lead to moksha (liberation).",
      ],
      impact:
        "Ancient Indian astronomers regarded Ujjain as a reference meridian for timekeeping — which is why it is also called the 'city of time'.",
    },
    {
      title: "History of Simhastha",
      desc: "Simhastha in Ujjain is a centuries-old tradition that unites lakhs of crores of devotees every time it is held.",
      icon: "📜",
      points: [
        "The last Simhastha took place in 2016 — around 5 crore pilgrims visited Ujjain, and the event lasted nearly a month.",
        "Ram Ghat, the ghat most closely associated with Simhastha, has been central to this tradition since the 8th century.",
        "Every Simhastha brings a wave of city infrastructure development — large-scale projects are similarly underway for 2028.",
        "The Mahakaleshwar Temple, one of the 12 Jyotirlingas, has been the spiritual heart of this gathering for centuries.",
      ],
      impact:
        "Held once every 12 years, Simhastha is a defining chapter that connects Ujjain's past and present.",
    },
    {
      title: "Key Traditions",
      desc: "Several distinct rituals are observed during Simhastha, each carrying its own significance.",
      icon: "🙏",
      points: [
        "Shahi Snan (Amrit Snan) — the most important 'royal bath', where the 13 Akhadas take part in grand processions before bathing in the river. These are the most crowded days.",
        "Parva Snan — other auspicious bathing dates (like Purnima, Ekadashi) — less crowded, better suited for families.",
        "Kalpvas — the tradition of living on the riverbank for a month, observing penance and fasting.",
        "Panchkoshi Yatra — an ancient pilgrimage circuit associated with Simhastha.",
        "The 13 Akhadas (traditional monastic orders) are central to the event — the Naga Sadhus' processions are a particular highlight.",
      ],
      impact:
        "Understanding these traditions helps pilgrims choose the right day to visit — Parva Snan for a calmer darshan, or Shahi Snan to witness the grandeur.",
    },
    {
      title: "Major Attractions",
      desc: "Ujjain is home to several temples and ghats connected to Simhastha that every pilgrim should experience.",
      icon: "🛕",
      points: [
        "Mahakaleshwar Jyotirlinga — one of the 12 Jyotirlingas and the only south-facing (Dakshinamukhi) lingam; the famous Bhasma Aarti takes place around 4 AM.",
        "Kal Bhairav Temple — Ujjain's guardian deity, located on the banks of the Shipra, known for its distinctive style of worship.",
        "Harsiddhi Temple — a Shakti Peeth, known for its two tall lamp towers that are lit up on festival evenings.",
        "Ram Ghat — the oldest bathing ghat directly linked to Simhastha, home to the Chitragupta Temple and the evening Kshipra Aarti.",
      ],
      impact: "",
      cta: true,
    },
  ],
};

const cardBgImages = [
  "Mahakal Temple Ujjain.JPG",
  "Simhasth2016 Ujjain Piligrims.jpg",
  "Simhasth2016 Panchayati akhada nirmal Shahi Snan Leading.jpg",
  "Shri Ram Ghat 02.jpg",
];
const wikiImg = (filename) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;

const headings = {
  hi: {
    title: "सिंहस्थ 2028 के बारे में",
    subtitle: "धार्मिक महत्व, इतिहास, परंपराएं और मुख्य आकर्षण",
  },
  en: {
    title: "About Simhastha 2028",
    subtitle:
      "Religious significance, history, traditions, and major attractions",
  },
  hinglish: {
    title: "Simhastha 2028 Ke Baare Mein",
    subtitle: "Dharmik mahatva, itihas, paramparayein aur mukhya aakarshan",
  },
};

const modalLabels = {
  hi: { points: "मुख्य बातें", impact: "विशेष" },
  en: { points: "Key Points", impact: "Note" },
  hinglish: { points: "Mukhya Baatein", impact: "Vishesh" },
};

const readMoreLabel = {
  hi: "और पढ़ें →",
  en: "Read More →",
  hinglish: "Aur Padhein →",
};
const ctaLabel = {
  hi: "पूरी सूची मानचित्र पर देखें ↓",
  en: "See Full List On Map ↓",
  hinglish: "Poori Suchi Map Par Dekhein ↓",
};
const disclaimer = {
  hi: "सिंहस्थ 2028 की तारीखें आधिकारिक घोषणा के अनुसार अपडेट होंगी।",
  en: "Simhastha 2028 dates will be updated as per the official announcement.",
  hinglish:
    "Simhastha 2028 ki tareekhein official ghoshna ke anusaar update hongi.",
};

infoData.hinglish = [
  {
    title: "Dharmik Evam Sanskritik Mahatva",
    desc: "Simhastha sirf ek mela nahi, ek jeevit parampara hai jo Ujjain ko Hindu cosmology mein vishesh sthaan deti hai.",
    icon: "🕉️",
    points: [
      "Simhastha tab hoti hai jab Brihaspati (Guru Graha) Simha (Leo) rashi mein pravesh karte hain — ek khagoliya sanyog jo har 12 saal mein aata hai.",
      "Ye Bharat ke 4 classical Kumbh Melon mein se ek hai (baaki teen: Haridwar, Prayagraj, aur Nashik-Trimbak).",
      "Manyata hai ki Samudra Manthan ke dauraan Amrit ki kuch boondein Shipra nadi ke tat par giri thi — isi wajah se Ujjain mein snan ka itna mahatva hai.",
      "Shipra nadi mein snan karne se paapon se mukti aur moksha milta hai, aisi shraddha hai.",
    ],
    impact:
      "Prachin Bharatiya khagolshastri Ujjain ko samay-nirdharan ke liye reference meridian jaisa maante the — isliye ise 'kaal ki nagri' bhi kaha jaata hai.",
  },
  {
    title: "Simhastha Ka Itihas",
    desc: "Ujjain mein Simhastha ka aayojan sadiyon purani parampara hai, jo har baar lakhon-crodon shraddhaluon ko ekjut karti hai.",
    icon: "📜",
    points: [
      "Pichli Simhastha 2016 mein hui thi — us dauraan lagbhag 5 crore shraddhalu Ujjain aaye the, aayojan lagbhag ek mahine tak chala tha.",
      "Ram Ghat, jo Simhastha se sabse zyada juda hua ghat hai, 8vi shatabdi se hi is dharmik parampara ka kendra raha hai.",
      "Har baar Simhastha ke saath shehar ka infrastructure aur badhta hai — 2028 ke liye bhi bade paimane par vikas kaary chal rahe hain.",
      "Mahakaleshwar Mandir, jo 12 Jyotirlingon mein se ek hai, sadiyon se is aayojan ka aadhyatmik kendra raha hai.",
    ],
    impact:
      "Har 12 saal mein hone wali Simhastha, Ujjain ke itihas aur pehchaan ka ek ateet-vartaman ko jodne wala mahatvapurna adhyay hai.",
  },
  {
    title: "Mukhya Paramparayein",
    desc: "Simhastha ke dauraan kai vishesh dharmik parivayein nibhayi jaati hain, jinka apna alag mahatva hai.",
    icon: "🙏",
    points: [
      "Shahi Snan (Amrit Snan) — sabse mahatvapurna 'rajkiya snan', jisme 13 Akhaden apni bhavya shobha yatraon ke saath nadi mein snan karti hain. Ye sabse zyada bheed wale din hote hain.",
      "Parva Snan — baaki shubh snan tithiyan (jaise Purnima, Ekadashi) — inme bheed kam hoti hai, parivaron ke liye behtar rehta hai.",
      "Kalpvas — ek mahine tak nadi kinare rehkar tap aur vrat karne ki parampara, jo bahut se shraddhalu nibhate hain.",
      "Panchkoshi Yatra — ek parikrama marg jo Simhastha se juda hua ek prachin teerth-yatra hai.",
      "13 Akhade (paramparik sadhu-sant sanghatan) is aayojan ka sabse mahatvapurna hissa hain — Naga Sadhu apni shobha yatraon ke saath khaas aakarshan hote hain.",
    ],
    impact:
      "In paramparaon ko samajhna yatriyon ke liye zaroori hai — isse wo sahi din chun sakte hain: darshan-shanti ke liye Parva Snan, ya bhavyata dekhne ke liye Shahi Snan.",
  },
  {
    title: "Mukhya Aakarshan",
    desc: "Ujjain mein Simhastha se jude kai mandir aur ghat hain jo har shraddhalu ko avashya dekhne chahiye.",
    icon: "🛕",
    points: [
      "Mahakaleshwar Jyotirlinga — 12 Jyotirlingon mein se ek aur ekmatra Dakshinamukhi (dakshin-mukhi) lingam; famous Bhasma Aarti subah lagbhag 4 baje hoti hai.",
      "Kal Bhairav Mandir — Ujjain ke rakshak devta, Shipra tat par sthit, apni vishisht aradhna paddhati ke liye jaana jaata hai.",
      "Harsiddhi Mandir — ek Shakti Peeth, apne do ऊंche deep stambhon ke liye prasiddh, jo utsav ki shaamon par jalaye jaate hain.",
      "Ram Ghat — Simhastha se sabse purana aur seedha juda hua snan ghat, jahan Chitragupta Mandir aur sandhya Kshipra Aarti bhi dekhi ja sakti hai.",
    ],
    impact: "",
    cta: true,
  },
];

export default function SimhasthaInfo() {
  const { lang } = useLanguage();
  const info = infoData[lang];

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

  // Standard modal pattern: showModal mounts it, modalVisible (delayed via
  // nested rAF) drives the transition-in; closeModal reverses it and only
  // unmounts after the 300ms transition-out completes.
  const [activeIndex, setActiveIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const activeItem = activeIndex !== null ? info[activeIndex] : null;

  const openModal = (index) => {
    setActiveIndex(index);
    setShowModal(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setModalVisible(true));
    });
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setShowModal(false);
      setActiveIndex(null);
    }, 300);
  };

  const scrollToMap = () => {
    closeModal();
    document.getElementById("map")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="simhastha-info"
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
        {headings[lang].title}
      </h2>
      <p
        className="text-ujjain-cream mb-4 text-center max-w-xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-12px)",
          transition: `opacity 0.7s ${EASE} 0.1s, transform 0.7s ${EASE} 0.1s`,
        }}
      >
        {headings[lang].subtitle}
      </p>
      <p
        className="text-ujjain-cream/50 text-xs mb-12 text-center max-w-md italic"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 0.7s ${EASE} 0.2s`,
        }}
      >
        {disclaimer[lang]}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {info.map((item, index) => (
          <div
            key={index}
            className="group relative flex flex-col overflow-hidden bg-white/5 border border-ujjain-gold/30 rounded-xl p-6 hover:border-ujjain-gold hover:-translate-y-2 hover:shadow-[0_16px_36px_-10px_rgba(212,175,55,0.35)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}, border-color 0.4s ${EASE}, box-shadow 0.4s ${EASE}`,
              transitionDelay: visible ? `${150 + index * 120}ms` : "0ms",
            }}
          >
            <img
              src={wikiImg(cardBgImages[index])}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 opacity-60 pointer-events-none transition-transform duration-700 group-hover:scale-125"
              style={{ transitionTimingFunction: EASE }}
            />
            <div className="absolute inset-0 bg-ujjain-dark/75 pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="text-4xl mb-4 w-fit transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-ujjain-gold mb-2 transition-colors duration-300 group-hover:text-ujjain-saffron">
                {item.title}
              </h3>
              <p className="text-ujjain-cream/70 text-sm mb-4">{item.desc}</p>
              <button
                onClick={() => openModal(index)}
                className="mt-auto self-start px-4 py-1.5 rounded-full bg-ujjain-gold text-ujjain-dark text-xs font-semibold hover:bg-ujjain-saffron hover:scale-105 hover:shadow-[0_4px_14px_-4px_rgba(212,175,55,0.6)]"
                style={{
                  transition: `background-color 0.3s ${EASE}, transform 0.3s ${EASE}, box-shadow 0.3s ${EASE}`,
                }}
              >
                {readMoreLabel[lang]}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && activeItem && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          style={{
            opacity: modalVisible ? 1 : 0,
            transition: `opacity 0.3s ${EASE}`,
          }}
          onClick={closeModal}
        >
          <div
            className="w-full max-w-xl bg-ujjain-dark border border-ujjain-gold/40 rounded-xl p-6 md:p-8 relative max-h-[85vh] overflow-y-auto"
            style={{
              opacity: modalVisible ? 1 : 0,
              transform: modalVisible
                ? "scale(1) translateY(0)"
                : "scale(0.94) translateY(12px)",
              transition: `opacity 0.3s ${EASE}, transform 0.3s ${EASE}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-ujjain-cream hover:text-ujjain-gold hover:rotate-90 text-2xl leading-none"
              style={{
                transition: `color 0.3s ${EASE}, transform 0.3s ${EASE}`,
              }}
            >
              ×
            </button>

            <div className="text-4xl mb-2">{activeItem.icon}</div>
            <h3 className="text-2xl md:text-3xl font-bold text-ujjain-gold mt-2 mb-4">
              {activeItem.title}
            </h3>

            <h4 className="text-ujjain-gold font-semibold mb-2">
              {modalLabels[lang].points}
            </h4>
            <ul className="text-ujjain-cream/90 text-sm mb-6 space-y-2 text-left">
              {activeItem.points.map((p, i) => (
                <li
                  key={i}
                  className="flex gap-2"
                  style={{
                    opacity: modalVisible ? 1 : 0,
                    transform: modalVisible
                      ? "translateX(0)"
                      : "translateX(-8px)",
                    transition: `opacity 0.4s ${EASE}, transform 0.4s ${EASE}`,
                    transitionDelay: modalVisible ? `${150 + i * 70}ms` : "0ms",
                  }}
                >
                  <span className="text-ujjain-saffron">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {activeItem.impact && (
              <>
                <h4 className="text-ujjain-gold font-semibold mb-2">
                  {modalLabels[lang].impact}
                </h4>
                <p className="text-ujjain-cream/90 text-sm text-left mb-4">
                  {activeItem.impact}
                </p>
              </>
            )}

            {activeItem.cta && (
              <button
                onClick={scrollToMap}
                className="w-full mt-2 px-4 py-2 rounded-full bg-ujjain-gold text-ujjain-dark text-sm font-semibold hover:bg-ujjain-saffron hover:shadow-[0_6px_18px_-6px_rgba(212,175,55,0.6)]"
                style={{
                  transition: `background-color 0.3s ${EASE}, box-shadow 0.3s ${EASE}`,
                }}
              >
                {ctaLabel[lang]}
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
