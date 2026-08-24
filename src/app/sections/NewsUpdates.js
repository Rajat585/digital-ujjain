"use client";
import { useLanguage } from "../components/LanguageContext";

const newsItems = [
    {
        id: 1,
        date: { hi: "18 Aug 2026", en: "18 Aug 2026" },
        category: { hi: "अवसंरचना", en: "Infrastructure" },
        title: {
            hi: "सिंहस्थ 2028 के लिए ₹18,840 करोड़ की अवसंरचना योजना घोषित",
            en: "₹18,840 crore infrastructure plan announced for Simhastha 2028",
        },
        desc: {
            hi: "सड़क, घाट और रिवरफ्रंट विकास के लिए राज्य सरकार ने बड़ा बजट आवंटित किया है।",
            en: "The state government has allocated a major budget for roads, ghats, and riverfront development.",
        },
    },
    {
        id: 2,
        date: { hi: "10 Aug 2026", en: "10 Aug 2026" },
        category: { hi: "रिवरफ्रंट", en: "Riverfront" },
        title: {
            hi: "29-किमी क्षिप्रा रिवरफ्रंट कॉरिडोर — स्थायी घाटों का निर्माण जारी",
            en: "29-km Kshipra riverfront corridor — permanent ghats under construction",
        },
        desc: {
            hi: "क्षिप्रा नदी के किनारे स्थायी घाट बनाए जा रहे हैं ताकि सिंहस्थ के बाद भी ये काम आएं।",
            en: "Permanent ghats are being built along the Kshipra river for long-term use beyond Simhastha.",
        },
    },
    {
        id: 3,
        date: { hi: "2 Aug 2026", en: "2 Aug 2026" },
        category: { hi: "परिवहन", en: "Transport" },
        title: {
            hi: "नया 6-लेन इंदौर-उज्जैन हाईवे — प्रगति अपडेट",
            en: "New 6-lane Indore-Ujjain highway — progress update",
        },
        desc: {
            hi: "एयरपोर्ट से उज्जैन तक यात्रा आसान बनाने के लिए हाईवे को 6-लेन किया जा रहा है।",
            en: "The highway is being widened to 6 lanes to make travel from the airport to Ujjain easier.",
        },
    },
    {
        id: 4,
        date: { hi: "25 Jul 2026", en: "25 Jul 2026" },
        category: { hi: "आवास", en: "Accommodation" },
        title: {
            hi: "आवास बुकिंग दिशानिर्देश जारी किए गए",
            en: "Accommodation booking guidelines released",
        },
        desc: {
            hi: "सत्यापित ठहराव कैसे बुक करें, इसके आधिकारिक दिशानिर्देश आ चुके हैं।",
            en: "Official guidelines on how to book verified stays are now available.",
        },
        link: "#hotel-booking",
    },
];

const newsItemsHinglish = [
    { category: "Infrastructure", title: "Simhastha 2028 ke liye ₹18,840 crore ka infrastructure plan ghoshit", desc: "Sadak, ghat, aur riverfront vikas ke liye state government ne bada budget allocate kiya hai." },
    { category: "Riverfront", title: "29-km Kshipra riverfront corridor — permanent ghats ka nirmaan jaari", desc: "Shipra nadi ke kinare permanent ghat banaye ja rahe hain taaki Simhastha ke baad bhi ye kaam aayein." },
    { category: "Transport", title: "Naya 6-lane Indore-Ujjain highway — pragati update", desc: "Airport se Ujjain tak yatra aasan banane ke liye highway ko 6-lane kiya ja raha hai." },
    { category: "Accommodation", title: "Accommodation booking guidelines jaari ki gayi", desc: "Verified stays kaise book karein, iski official guidelines aa chuki hain." },
];

newsItems.forEach((item, i) => {
    item.date.hinglish = item.date.hi;
    item.category.hinglish = newsItemsHinglish[i].category;
    item.title.hinglish = newsItemsHinglish[i].title;
    item.desc.hinglish = newsItemsHinglish[i].desc;
});

const categoryColors = {
    Infrastructure: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    Riverfront: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    Transport: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    Accommodation: "text-green-400 border-green-400/30 bg-green-400/10",
    Registration: "text-purple-400 border-purple-400/30 bg-purple-400/10",
};

const text = {
    hi: {
        title: "समाचार एवं अपडेट",
        subtitle: "सिंहस्थ 2028 से जुड़ी ताज़ा घोषणाएं और अपडेट",
        viewLink: "यहां देखें →",
        footNote: "सभी अपडेट आधिकारिक स्रोतों पर आधारित हैं — नवीनतम जानकारी के लिए सिंहस्थ 2028 की आधिकारिक वेबसाइट देखें।",
    },
    en: {
        title: "News & Updates",
        subtitle: "Latest Simhastha 2028 announcements and updates",
        viewLink: "View here →",
        footNote: "All updates are based on official sources — check the official Simhastha 2028 website for the latest information.",
    },
    hinglish: {
        title: "News & Updates",
        subtitle: "Simhastha 2028 se juri taaza ghoshnayein aur updates",
        viewLink: "Yahan dekhein →",
        footNote: "Sabhi updates official sources par aadharit hain — naveentam jaankari ke liye Simhastha 2028 ki adhikarik website check karein.",
    },
};

export default function NewsUpdates() {
    const { lang } = useLanguage();
    const t = text[lang];

    return (
    <section
      id="news-updates"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">
        {t.title}
      </h2>
      <p className="text-ujjain-cream mb-12 text-center max-w-xl">{t.subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                  categoryColors[item.category.en] ||
                  "text-ujjain-gold border-ujjain-gold/30 bg-ujjain-gold/10"
                }`}
              >
                {item.category[lang]}
              </span>
              <span className="text-ujjain-cream/50 text-xs">{item.date[lang]}</span>
            </div>

            <h3 className="text-lg font-bold text-ujjain-gold mb-2">{item.title[lang]}</h3>
            <p className="text-ujjain-cream/80 text-sm flex-1">{item.desc[lang]}</p>

            {item.link && (
              <a
                href={item.link}
                className="text-ujjain-gold text-sm font-semibold mt-4 hover:underline"
              >
                {t.viewLink}
              </a>
            )}
          </div>
        ))}
      </div>

      <p className="text-ujjain-cream/40 text-xs mt-8 text-center max-w-md">{t.footNote}</p>
    </section >
  );
}