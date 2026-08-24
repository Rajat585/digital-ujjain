"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "../components/LanguageContext";

const avatarColors = [
  "bg-ujjain-gold/20 text-ujjain-gold",
  "bg-ujjain-saffron/20 text-ujjain-saffron",
  "bg-emerald-500/20 text-emerald-400",
  "bg-sky-500/20 text-sky-400",
  "bg-rose-500/20 text-rose-400",
  "bg-violet-500/20 text-violet-400",
];

const testimonialsData = {
  hi: [
    { name: "प्रिया शर्मा", text: "महाकाल लोक देखकर दिल खुश हो गया! बहुत सुंदर विकास हुआ है।", category: "विकास" },
    { name: "राहुल विश्वकर्मा", text: "घाट की सफाई और सड़कों का काम सच में काबिल-ए-तारीफ है।", category: "सफाई" },
    { name: "अनिता पाटीदार", text: "सिंहस्थ 2028 की योजना देखकर लगता है इस बार सब कुछ बहुत व्यवस्थित होगा।", category: "सिंहस्थ" },
    { name: "मोहन राठौर", text: "स्मार्ट सिटी बनने के बाद उज्जैन का पूरा माहौल ही बदल गया है।", category: "स्मार्ट सिटी" },
    { name: "सुनीता जोशी", text: "सीसीटीवी और वाईफाई ज़ोन से शहर अब बहुत सुरक्षित और आधुनिक लगता है।", category: "सुरक्षा" },
    { name: "दीपक मालवीय", text: "क्षिप्रा घाट पर अब पहले से कहीं ज्यादा साफ पानी दिखता है।", category: "जल" },
    { name: "कविता चौहान", text: "डिजिटल उज्जैन वेबसाइट देखकर लगा सरकार सच में तकनीक का उपयोग कर रही है।", category: "तकनीक" },
    { name: "अमित शर्मा", text: "पार्किंग और मार्ग योजना अगर ऐसी ही रही तो सिंहस्थ बहुत सुगम होगा।", category: "पार्किंग" },
  ],
  en: [
    { name: "Priya Sharma", text: "Seeing Mahakal Lok made my heart happy! Truly beautiful development.", category: "Development" },
    { name: "Rahul Vishwakarma", text: "The ghat cleaning and road work is genuinely praiseworthy.", category: "Cleanliness" },
    { name: "Anita Patidar", text: "Seeing the Simhastha 2028 planning, it feels like this time everything will be very organized.", category: "Simhastha" },
    { name: "Mohan Rathore", text: "After becoming a Smart City, Ujjain's whole vibe has changed.", category: "Smart City" },
    { name: "Sunita Joshi", text: "With CCTV and WiFi zones, the city now feels very safe and modern.", category: "Safety" },
    { name: "Deepak Malviya", text: "The Kshipra ghat water looks much cleaner than before now.", category: "Water" },
    { name: "Kavita Chouhan", text: "Seeing the Digital Ujjain website, it feels like the government is really using technology.", category: "Technology" },
    { name: "Amit Sharma", text: "If parking and route planning stay this good, Simhastha will be very smooth.", category: "Parking" },
  ],
};

testimonialsData.hinglish = [
  { name: "Priya Sharma", text: "Mahakal Lok dekh kar dil khush ho gaya! Bahut sundar development hua hai.", category: "Vikas" },
  { name: "Rahul Vishwakarma", text: "Ghat ki safai aur roads ka kaam sach mein kaabil-e-tareef hai.", category: "Safai" },
  { name: "Anita Patidar", text: "Simhastha 2028 ki planning dekh kar lagta hai is baar sab kuch bahut organized hoga.", category: "Simhastha" },
  { name: "Mohan Rathore", text: "Smart City ban ne ke baad Ujjain ka pura vibe hi badal gaya hai.", category: "Smart City" },
  { name: "Sunita Joshi", text: "CCTV aur WiFi zones se shehar ab bahut safe aur modern lagta hai.", category: "Suraksha" },
  { name: "Deepak Malviya", text: "Kshipra ghat par ab pehle se kahi zyada saaf paani dikhta hai.", category: "Jal" },
  { name: "Kavita Chouhan", text: "Digital Ujjain website dekh kar laga sarkar sach mein technology use kar rahi hai.", category: "Technology" },
  { name: "Amit Sharma", text: "Parking aur route planning agar aisi hi rahi toh Simhastha bahut smooth hoga.", category: "Parking" },
];

const text = {
  hi: {
    title: "आपकी आवाज़, उज्जैन का विकास",
    subtitle: "इस पहल के बारे में नागरिकों के विचार",
    supportText: "लोगों ने इस पहल का समर्थन किया",
    verified: "सत्यापित नागरिक",
    feedbackBtn: "अपनी प्रतिक्रिया दें",
  },
  en: {
    title: "Your Voice, Ujjain's Development",
    subtitle: "What citizens think about this initiative",
    supportText: "people have supported this initiative",
    verified: "Verified Citizen",
    feedbackBtn: "Share Your Feedback",
  },
  hinglish: {
    title: "Aapki Awaaz, Ujjain Ka Vikas",
    subtitle: "Nagrikon ke vichar is pahal ke baare mein",
    supportText: "logo ne is pahal ko support kiya",
    verified: "Verified Citizen",
    feedbackBtn: "Apna Feedback Dein",
  },
};

function TestimonialCard({ t, colorIndex, verifiedLabel }) {
  const initial = t.name.charAt(0).toUpperCase();
  return (
    <div className="min-w-[280px] max-w-[280px] bg-white/5 border border-ujjain-gold/20 rounded-lg p-4 hover:border-ujjain-gold/50 transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${avatarColors[colorIndex % avatarColors.length]}`}>
            {initial}
          </div>
          <div>
            <p className="text-ujjain-gold text-xs font-semibold leading-tight">{t.name}</p>
            <p className="text-ujjain-cream/40 text-[10px] flex items-center gap-1">
              <span className="text-emerald-400">✓</span> {verifiedLabel}
            </p>
          </div>
        </div>
      </div>
      <p className="text-ujjain-cream/90 text-sm mb-3">&ldquo;{t.text}&rdquo;</p>
      <span className="inline-block text-[10px] text-ujjain-saffron bg-ujjain-saffron/10 px-2 py-0.5 rounded-full border border-ujjain-saffron/20">
        {t.category}
      </span>
    </div>
  );
}

export default function SentimentWall() {
  const { lang } = useLanguage();
  const t = text[lang];
  const testimonials = testimonialsData[lang];
  const [supportCount, setSupportCount] = useState(24817);

  useEffect(() => {
    const interval = setInterval(() => {
      setSupportCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="sentiment-wall" className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">{t.title}</h2>
      <p className="text-ujjain-cream mb-6 text-center max-w-xl">{t.subtitle}</p>

      <div className="flex items-center gap-2 mb-12 px-5 py-2.5 rounded-full bg-ujjain-saffron/10 border border-ujjain-saffron/30">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ujjain-saffron opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-ujjain-saffron"></span>
        </span>
        <span className="text-ujjain-saffron text-xl md:text-2xl font-bold">{supportCount.toLocaleString("en-IN")}+</span>
        <span className="text-ujjain-cream/80 text-sm">{t.supportText}</span>
      </div>

      <div className="relative w-full max-w-6xl">
        <div className="space-y-4">
          <div className="flex gap-4 animate-scroll-left">
            {[...testimonials, ...testimonials].map((item, i) => (
              <TestimonialCard key={`row1-${i}`} t={item} colorIndex={i} verifiedLabel={t.verified} />
            ))}
          </div>
          <div className="flex gap-4 animate-scroll-right">
            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((item, i) => (
              <TestimonialCard key={`row2-${i}`} t={item} colorIndex={i + 2} verifiedLabel={t.verified} />
            ))}
          </div>
        </div>
      </div>

      <a href="#contact" className="mt-12 bg-ujjain-gold text-ujjain-dark font-bold px-6 py-3 rounded-lg hover:bg-ujjain-saffron transition">
        {t.feedbackBtn}
      </a>
    </section>
  );
}
