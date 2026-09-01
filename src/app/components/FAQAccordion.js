"use client";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../components/LanguageContext";

const EASE_POP = "cubic-bezier(0.34, 1.56, 0.64, 1)";

const faqData = {
  hi: [
    {
      q: "सिंहस्थ 2028 कब है?",
      a: "सिंहस्थ 2028 का आयोजन लगभग मार्च–मई 2028 के बीच होगा। सटीक तारीखें अभी तक आधिकारिक रूप से घोषित नहीं हुई हैं, इसलिए वेबसाइट पर जो भी काउंटडाउन/तारीख दिखाई गई है वह अनुमानित है — आधिकारिक घोषणा के बाद अपडेट कर दी जाएगी।",
    },
    {
      q: "शाही स्नान क्या होता है?",
      a: "शाही स्नान (अमृत स्नान) सबसे महत्वपूर्ण 'राजकीय स्नान' होता है, जिसमें 13 अखाड़े (पारंपरिक साधु-संत संगठन) अपनी भव्य शोभा यात्राओं के साथ क्षिप्रा नदी में स्नान करते हैं। ये सिंहस्थ के सबसे ज़्यादा भीड़ वाले दिन होते हैं।",
    },
    {
      q: "क्या मैं किसी भी दिन स्नान कर सकता हूं?",
      a: "हां। शाही स्नान के अलावा कई 'पर्व स्नान' (शुभ तिथियां जैसे पूर्णिमा, एकादशी) भी होते हैं जिनमें भीड़ काफी कम होती है — परिवारों के साथ शांति से दर्शन-स्नान के लिए बेहतर रहता है।",
    },
    {
      q: "उज्जैन कैसे पहुंचें?",
      a: "उज्जैन रेलवे स्टेशन से अच्छी तरह जुड़ा हुआ है और इंदौर (नज़दीकी हवाई अड्डा, ~55 किमी) से नए 6-लेन हाईवे के ज़रिए भी पहुंचा जा सकता है। मुख्य बस स्टैंड और रेलवे स्टेशन दोनों इस वेबसाइट के मानचित्र/ज़ोन सेक्शन में चिह्नित हैं।",
    },
    {
      q: "क्या स्टे बुकिंग इस वेबसाइट से हो सकती है?",
      a: "हां, बिल्कुल। हमारे स्टे बुकिंग सेक्शन में होटल देखकर Razorpay के ज़रिए सुरक्षित भुगतान के साथ बुकिंग कर सकते हैं।",
      linkTo: "hotel-booking",
      linkLabel: "स्टे बुकिंग सेक्शन पर जाएं →",
    },
    {
      q: "आपातकालीन हेल्पलाइन नंबर क्या है?",
      a: "पुलिस: 100, एम्बुलेंस: 108, फायर: 101, और पर्यटक हेल्पलाइन: 1364। ये सभी नंबर वेबसाइट के फुटर में भी हमेशा उपलब्ध हैं।",
    },
    {
      q: "सिंहस्थ के दौरान पार्किंग कहां मिलेगी?",
      a: "हमारे मानचित्र/ज़ोन सेक्शन में अलग-अलग 'पार्किंग ज़ोन' टैग के साथ जगहें पहले से चिह्नित हैं, जिन्हें आप अपनी लोकेशन के सबसे नज़दीक देख सकते हैं (जियोलोकेशन फीचर के साथ)।",
      linkTo: "map",
      linkLabel: "पार्किंग ज़ोन मानचित्र पर देखें →",
    },
    {
      q: "मंदिर/घाट दर्शन का सबसे अच्छा समय क्या है (भीड़ कम कब होती है)?",
      a: "शाही स्नान के दिनों में सबसे ज़्यादा भीड़ होती है। अगर शांति से दर्शन चाहते हैं, तो पर्व स्नान के दिन या सुबह-सवेरे (जैसे महाकालेश्वर की भस्म आरती के आस-पास, लगभग 4 बजे) जाना बेहतर रहता है।",
    },
    {
      q: "वीआर/360° अनुभव के लिए कौन-सा कैमरा/डिवाइस चाहिए?",
      a: "किसी खास कैमरे की ज़रूरत नहीं है — हमारा वीआर/360° सेक्शन सीधे आपके फोन या कंप्यूटर के ब्राउज़र में काम करता है, बिना किसी अतिरिक्त डिवाइस के।",
    },
    {
      q: "बुकिंग रद्द/रिफंड कैसे होगा?",
      a: "रद्दीकरण और रिफंड नीति की पूरी जानकारी बुकिंग कन्फर्मेशन के साथ और फुटर में भी दी गई है। किसी भी सहायता के लिए हमसे संपर्क सेक्शन के ज़रिए संपर्क करें।",
      linkTo: "contact",
      linkLabel: "संपर्क सेक्शन पर जाएं →",
    },
  ],
  en: [
    {
      q: "When is Simhastha 2028?",
      a: "Simhastha 2028 will take place roughly between March–May 2028. Exact dates haven't been officially announced yet, so any countdown/date shown on this site is an estimate — it will be updated once the official announcement is made.",
    },
    {
      q: "What is Shahi Snan?",
      a: "Shahi Snan (Amrit Snan) is the most important 'royal bath', where the 13 Akhadas (traditional monastic orders) take part in grand processions before bathing in the Shipra river. These are the most crowded days of Simhastha.",
    },
    {
      q: "Can I bathe on any day?",
      a: "Yes. Besides Shahi Snan, there are several 'Parva Snan' dates (auspicious tithis like Purnima, Ekadashi) which are far less crowded — better suited for families who prefer a calmer darshan.",
    },
    {
      q: "How do I reach Ujjain?",
      a: "Ujjain is well connected by rail, and can also be reached from Indore (nearest airport, ~55 km) via the new 6-lane highway. Both the main bus stand and railway station are marked on this site's Map/Zone section.",
    },
    {
      q: "Can I book a stay through this website?",
      a: "Yes, absolutely. Browse hotels in our Stay Booking section and complete secure payment via Razorpay.",
      linkTo: "hotel-booking",
      linkLabel: "Go to Stay Booking Section →",
    },
    {
      q: "What is the emergency helpline number?",
      a: "Police: 100, Ambulance: 108, Fire: 101, and Tourist Helpline: 1364. These numbers are also always available in the site footer.",
    },
    {
      q: "Where can I find parking during Simhastha?",
      a: "Our Map/Zone section has dedicated 'Parking Zone' tags already marked, and you can find the one nearest to you using the built-in geolocation feature.",
      linkTo: "map",
      linkLabel: "See Parking Zones On Map →",
    },
    {
      q: "What's the best time to visit temples/ghats to avoid crowds?",
      a: "Shahi Snan days see the heaviest crowds. For a calmer visit, go on Parva Snan days or early morning (e.g. around Mahakaleshwar's Bhasma Aarti, roughly 4 AM).",
    },
    {
      q: "Do I need a special camera/device for the VR/360° experience?",
      a: "No special camera is needed — our VR/360° section works directly in your phone or computer browser, no extra device required.",
    },
    {
      q: "How does booking cancellation/refund work?",
      a: "Full cancellation and refund policy details are shared with your booking confirmation and are also listed in the footer. For any help, please reach out via the Contact section.",
      linkTo: "contact",
      linkLabel: "Go to Contact Section →",
    },
  ],
};

const headings = {
  hi: { title: "अक्सर पूछे जाने वाले प्रश्न", subtitle: "आपके सवालों के जवाब, एक जगह" },
  en: { title: "Frequently Asked Questions", subtitle: "Answers to your common questions, in one place" },
  hinglish: { title: "Aksar Puche Jaane Wale Prashn", subtitle: "Aapke sawalon ke jawab, ek jagah" },
};

faqData.hinglish = [
  {
    q: "Simhastha 2028 kab hai?",
    a: "Simhastha 2028 ka aayojan lagbhag March–May 2028 ke beech hoga. Exact tareekhein abhi tak official taur par ghoshit nahi hui hain, isliye website par jo bhi countdown/tareekh dikhayi gayi hai wo anumaanit hai — official announcement ke baad update kar di jaayegi.",
  },
  {
    q: "Shahi Snan kya hota hai?",
    a: "Shahi Snan (Amrit Snan) sabse mahatvapurna 'rajkiya snan' hota hai, jisme 13 Akhade (paramparik sadhu-sant sanghatan) apni bhavya shobha yatraon ke saath Shipra nadi mein snan karte hain. Ye Simhastha ke sabse zyada bheed wale din hote hain.",
  },
  {
    q: "Kya main koi bhi din snan kar sakta hoon?",
    a: "Haan. Shahi Snan ke alawa kai 'Parva Snan' (shubh tithiyan jaise Purnima, Ekadashi) bhi hote hain jinme bheed kaafi kam hoti hai — parivaron ke saath shanti se darshan-snan ke liye behtar rehta hai.",
  },
  {
    q: "Ujjain kaise pahuchein?",
    a: "Ujjain railway station se achhi tarah connected hai aur Indore (nazdeeki hawai adda, ~55 km) se naye 6-lane highway ke through bhi pahuncha ja sakta hai. Mukhya bus stand aur railway station dono is website ke Map/Zone section mein marked hain.",
  },
  {
    q: "Kya stay booking is website se ho sakti hai?",
    a: "Haan, bilkul. Hamare Stay Booking section mein hotels dekh kar Razorpay ke through secure payment ke saath booking kar sakte hain.",
    linkTo: "hotel-booking",
    linkLabel: "Stay Booking Section Par Jaayein →",
  },
  {
    q: "Emergency helpline number kya hai?",
    a: "Police: 100, Ambulance: 108, Fire: 101, aur Tourist Helpline: 1364. Ye sabhi numbers website ke footer mein bhi hamesha available hain.",
  },
  {
    q: "Parking kahan milegi Simhastha ke dauraan?",
    a: "Hamare Map/Zone section mein alag-alag 'Parking Zone' tag ke saath jagahein pehle se chihnit hain, jinhe aap apni location ke sabse nazdeek dekh sakte hain (geolocation feature ke saath).",
    linkTo: "map",
    linkLabel: "Parking Zones Map Par Dekhein →",
  },
  {
    q: "Mandir/Ghat darshan ka best time kya hai (bheed kam kab hoti hai)?",
    a: "Shahi Snan ke dinon mein sabse zyada bheed hoti hai. Agar shanti se darshan chahte hain, toh Parva Snan ke din ya subah-savere (jaise Mahakaleshwar ki Bhasma Aarti ke aas-paas, lagbhag 4 AM) jaana behtar rehta hai.",
  },
  {
    q: "VR/360° experience ke liye kya camera/device chahiye?",
    a: "Kisi special camera ki zaroorat nahi hai — hamara VR/360° section directly aapke phone ya computer ke browser mein kaam karta hai, bina kisi extra device ke.",
  },
  {
    q: "Booking cancel/refund kaise hoga?",
    a: "Cancellation aur refund policy ki poori jaankari booking confirmation ke saath aur footer mein bhi di gayi hai. Kisi bhi sahayata ke liye humse Contact section ke through sampark karein.",
    linkTo: "contact",
    linkLabel: "Contact Section Par Jaayein →",
  },
];

export default function FAQAccordion() {
  const { lang } = useLanguage();
  const faqs = faqData[lang];
  const [openIndex, setOpenIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

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
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark overflow-hidden"
    >
      <style>{`
        @keyframes ujjainFaqShimmer {
          0% { transform: translateX(-160%) skewX(-12deg); }
          100% { transform: translateX(480%) skewX(-12deg); }
        }
        .ujjain-faq-item:hover .ujjain-faq-shimmer {
          animation: ujjainFaqShimmer 1.1s ease-in-out infinite;
        }
      `}</style>
      <h2
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(-40px) scale(0.8)",
          transition: `opacity 800ms ${EASE_POP}, transform 800ms ${EASE_POP}`,
        }}
        className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center"
      >
        {headings[lang].title}
      </h2>
      <p
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(-25px)",
          transition: `opacity 700ms ${EASE_POP} 100ms, transform 700ms ${EASE_POP} 100ms`,
        }}
        className="text-ujjain-cream mb-12 text-center max-w-xl"
      >
        {headings[lang].subtitle}
      </p>

      <div className="w-full max-w-3xl flex flex-col gap-3">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          const delay = Math.min(index, 7) * 90;
          return (
            <div
              key={index}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "perspective(1000px) rotateX(-20deg) translateY(45px) scale(0.9)",
                transition: `opacity 700ms ${EASE_POP} ${delay}ms, transform 700ms ${EASE_POP} ${delay}ms`,
              }}
              className={`ujjain-faq-item group relative overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-xl hover:shadow-ujjain-gold/20 ${isOpen ? "bg-ujjain-gold/5 border-ujjain-gold" : "bg-white/5 border-ujjain-gold/30 hover:border-ujjain-gold"}`}
            >
              <span className="ujjain-faq-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-ujjain-gold/25 to-transparent z-10" />
              <button
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="relative w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-ujjain-cream font-medium text-sm md:text-base">
                  {item.q}
                </span>
                <span
                  className={`text-ujjain-gold text-xl leading-none flex-shrink-0 transition-transform duration-300 group-hover:scale-125 ${isOpen ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>

              <div
                className={`relative grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 text-ujjain-cream/70 text-sm leading-relaxed">
                    {item.a}
                    {item.linkTo && (
                      <button
                        onClick={() => scrollTo(item.linkTo)}
                        className="block mt-3 text-ujjain-saffron text-xs font-semibold hover:text-ujjain-gold hover:translate-x-1 transition-all duration-300"
                      >
                        {item.linkLabel}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}