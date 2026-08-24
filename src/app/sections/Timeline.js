"use client";
import { useState } from "react";
import { useLanguage } from "../components/LanguageContext";

const timelineData = {
  hi: [
    {
      year: "2024",
      title: "स्मार्ट सिटी सड़कें",
      desc: "शहर के प्रमुख मार्गों का चौड़ीकरण और नवीनीकरण किया गया।",
      stat: "45 KM",
      label: "सड़कें सुधरीं",
      extraStats: [
        { value: "45 KM", label: "सड़कें सुधरीं" },
        { value: "18", label: "जंक्शन सुधरे" },
        { value: "₹120 Cr", label: "निवेश" },
      ],
      highlights: [
        "फ्रीगंज से महाकाल मार्ग तक 4-लेन चौड़ीकरण",
        "नए फुटपाथ और स्ट्रीट लाइटिंग सभी मुख्य सड़कों पर",
        "18 प्रमुख जंक्शनों पर ट्रैफिक सिग्नल और स्मार्ट क्रॉसिंग",
        "बरसात में जलभराव रोकने के लिए नई जल निकासी व्यवस्था",
      ],
      impact: "इस परियोजना से शहर के अंदर आने-जाने का समय लगभग 30% कम हुआ है, और सिंहस्थ के दौरान भारी भीड़ संभालने की तैयारी भी मज़बूत हुई है।",
    },
    {
      year: "2025",
      title: "महाकाल लोक विस्तार",
      desc: "महाकाल कॉरिडोर का विस्तार और सौंदर्यीकरण परियोजना पूरी हुई।",
      stat: "900+",
      label: "करोड़ निवेशित",
      extraStats: [
        { value: "900+ Cr", label: "कुल निवेश" },
        { value: "6 Lakh", label: "वर्ग फुट विस्तार" },
        { value: "108", label: "नए स्तंभ" },
      ],
      highlights: [
        "मंदिर परिसर का दोगुना विस्तार, दर्शन क्षमता बढ़ी",
        "शिव-लीला दीवार और महाकाल प्लाज़ा का नवीनीकरण",
        "भक्तों के लिए छाया-युक्त वॉकिंग कॉरिडोर",
        "नए पार्किंग और ई-रिक्शा पिकअप ज़ोन",
      ],
      impact: "अब प्रतिदिन लगभग 40,000 से ज़्यादा श्रद्धालु आसानी से दर्शन कर पा रहे हैं, जो सिंहस्थ 2028 के लिए एक मज़बूत आधार है।",
    },
    {
      year: "2025",
      title: "डिजिटल अवसंरचना",
      desc: "मुफ्त वाईफाई ज़ोन और स्मार्ट निगरानी प्रणाली पूरे शहर में लगाई गई।",
      stat: "200+",
      label: "सीसीटीवी कैमरे",
      extraStats: [
        { value: "200+", label: "सीसीटीवी कैमरे" },
        { value: "35", label: "मुफ्त वाईफाई ज़ोन" },
        { value: "1", label: "एकीकृत कंट्रोल रूम" },
      ],
      highlights: [
        "एआई-आधारित भीड़ निगरानी प्रमुख घाटों और मंदिर पर",
        "एक केंद्रीय कमांड-एंड-कंट्रोल सेंटर से लाइव निगरानी",
        "आपातकालीन अलर्ट प्रणाली एसएमएस और ऐप के ज़रिए",
        "पर्यटक सूचना कियोस्क डिजिटल स्क्रीन के साथ",
      ],
      impact: "डिजिटल निगरानी से सुरक्षा प्रतिक्रिया समय कम हुआ है, और भक्तों को रीयल-टाइम भीड़ जानकारी मिलना आसान हो गया है।",
    },
    {
      year: "2026",
      title: "घाट नवीनीकरण",
      desc: "राम घाट और क्षिप्रा तट का पूरा नवीनीकरण और सफाई अभियान।",
      stat: "12",
      label: "घाट नवीनीकृत",
      extraStats: [
        { value: "12", label: "घाट नवीनीकृत" },
        { value: "3.5 KM", label: "रिवरफ्रंट कवर" },
        { value: "24x7", label: "सफाई अभियान" },
      ],
      highlights: [
        "राम घाट पर नए पत्थर के प्लेटफॉर्म और सुरक्षा रेलिंग",
        "क्षिप्रा नदी की सफाई के लिए स्थायी ट्रीटमेंट प्लांट",
        "नए चेंजिंग रूम और लॉकर सुविधा स्नान के लिए",
        "घाट पर सौंदर्य-संवर्धन रोशनी और लैंडस्केपिंग",
      ],
      impact: "नवीनीकरण के बाद घाट न सिर्फ ज़्यादा सुरक्षित हुए हैं बल्कि क्षिप्रा का जल-स्तर भी पहले से साफ दिख रहा है।",
    },
  ],
  en: [
    {
      year: "2024",
      title: "Smart City Roads",
      desc: "Major city roads were widened and renovated for smoother traffic.",
      stat: "45 KM",
      label: "Roads Improved",
      extraStats: [
        { value: "45 KM", label: "Roads Upgraded" },
        { value: "18", label: "Junctions Improved" },
        { value: "₹120 Cr", label: "Investment" },
      ],
      highlights: [
        "4-lane widening from Freeganj to Mahakal Marg",
        "New footpaths and street lighting on all major roads",
        "Smart traffic signals at 18 key junctions",
        "New drainage systems to prevent monsoon waterlogging",
      ],
      impact: "This project has reduced average commute time within the city by nearly 30%, and strengthened the city's readiness to handle large crowds during Simhastha.",
    },
    {
      year: "2025",
      title: "Mahakal Lok Expansion",
      desc: "Expansion and beautification of the Mahakal corridor was completed.",
      stat: "900+",
      label: "Crore Invested",
      extraStats: [
        { value: "900+ Cr", label: "Total Investment" },
        { value: "6 Lakh", label: "Sq. Ft. Expanded" },
        { value: "108", label: "New Pillars" },
      ],
      highlights: [
        "Doubled temple complex area, increasing darshan capacity",
        "Renovated Shiv-leela wall and Mahakal plaza",
        "Shaded walking corridor for devotees",
        "New parking and e-rickshaw pickup zones",
      ],
      impact: "Over 40,000 devotees are now able to have darshan smoothly every day, forming a strong foundation for Simhastha 2028.",
    },
    {
      year: "2025",
      title: "Digital Infrastructure",
      desc: "Free WiFi zones and smart surveillance systems installed across the city.",
      stat: "200+",
      label: "CCTV Cameras",
      extraStats: [
        { value: "200+", label: "CCTV Cameras" },
        { value: "35", label: "Free WiFi Zones" },
        { value: "1", label: "Integrated Control Room" },
      ],
      highlights: [
        "AI-based crowd monitoring at major ghats and the temple",
        "Live surveillance from a centralized command-and-control centre",
        "Emergency alert system via SMS and app notifications",
        "Digital tourist information kiosks across the city",
      ],
      impact: "Digital surveillance has reduced emergency response time and made real-time crowd information easily accessible to devotees.",
    },
    {
      year: "2026",
      title: "Ghat Renovation",
      desc: "Complete renovation and cleaning drive at Ram Ghat and Kshipra riverbank.",
      stat: "12",
      label: "Ghats Renovated",
      extraStats: [
        { value: "12", label: "Ghats Renovated" },
        { value: "3.5 KM", label: "Riverfront Covered" },
        { value: "24x7", label: "Cleaning Drive" },
      ],
      highlights: [
        "New stone platforms and safety railings at Ram Ghat",
        "Permanent treatment plant for cleaning the Kshipra river",
        "New changing rooms and locker facilities for bathing",
        "Aesthetic lighting and landscaping along the ghats",
      ],
      impact: "After renovation, the ghats are not only safer but the water level of the Kshipra also appears visibly cleaner than before.",
    },
  ],
};

const headings = {
  hi: { title: "2 साल का विकास", subtitle: "उज्जैन में हुए प्रमुख विकास कार्यों की झलक" },
  en: { title: "2 Years of Development", subtitle: "A glimpse of the major development projects in Ujjain" },
  hinglish: { title: "2 Saal Ka Vikas", subtitle: "Ujjain mein hue pramukh vikas karyon ki jhalak" },
};

const modalLabels = {
  hi: { highlights: "मुख्य बातें", impact: "प्रभाव" },
  en: { highlights: "Key Highlights", impact: "Impact" },
  hinglish: { highlights: "Mukhya Baatein", impact: "Prabhav" },
};

const readMoreLabel = { hi: "और पढ़ें →", en: "Read More →", hinglish: "Aur Padhein →" };

timelineData.hinglish = timelineData.hi;

export default function Timeline() {
  const { lang } = useLanguage();
  const [active, setActive] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const data = timelineData[lang];
  const item = data[active];

  return (
    <section id="timeline" className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark">
      <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">
        {headings[lang].title}
      </h2>
      <p className="text-ujjain-cream mb-12 text-center max-w-xl">
        {headings[lang].subtitle}
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {data.map((d, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`px-5 py-2 rounded-full border transition ${active === index
                ? "bg-ujjain-gold text-ujjain-dark border-ujjain-gold"
                : "border-ujjain-gold/40 text-ujjain-cream hover:border-ujjain-gold"
              }`}
          >
            {d.title}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl bg-white/5 border border-ujjain-gold/30 rounded-xl p-8 text-center">
        <span className="text-ujjain-saffron font-semibold">{item.year}</span>
        <h3 className="text-2xl font-bold text-ujjain-gold mt-2 mb-4">{item.title}</h3>
        <p className="text-ujjain-cream mb-6">{item.desc}</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {item.extraStats.map((s, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-bold text-ujjain-gold">{s.value}</div>
              <div className="text-ujjain-cream/70 text-xs md:text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 rounded-full bg-ujjain-gold text-ujjain-dark font-semibold hover:bg-ujjain-saffron transition"
        >
          {readMoreLabel[lang]}
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-xl bg-ujjain-dark border border-ujjain-gold/40 rounded-xl p-6 md:p-8 relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-ujjain-cream hover:text-ujjain-gold text-2xl leading-none"
            >
              ×
            </button>

            <span className="text-ujjain-saffron font-semibold">{item.year}</span>
            <h3 className="text-2xl md:text-3xl font-bold text-ujjain-gold mt-1 mb-4">{item.title}</h3>
            <p className="text-ujjain-cream mb-6">{item.desc}</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {item.extraStats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-ujjain-gold">{s.value}</div>
                  <div className="text-ujjain-cream/70 text-xs">{s.label}</div>
                </div>
              ))}
            </div>

            <h4 className="text-ujjain-gold font-semibold mb-2">{modalLabels[lang].highlights}</h4>
            <ul className="text-ujjain-cream/90 text-sm mb-6 space-y-2 text-left">
              {item.highlights.map((h, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-ujjain-saffron">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <h4 className="text-ujjain-gold font-semibold mb-2">{modalLabels[lang].impact}</h4>
            <p className="text-ujjain-cream/90 text-sm text-left">{item.impact}</p>
          </div>
        </div>
      )}
    </section>
  );
}