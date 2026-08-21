"use client";
import { useState } from "react";
import { useLanguage } from "../components/LanguageContext";

const faqData = {
  hi: [
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
  hi: { title: "Aksar Puche Jaane Wale Prashn", subtitle: "Aapke sawalon ke jawab, ek jagah" },
  en: { title: "Frequently Asked Questions", subtitle: "Answers to your common questions, in one place" },
};

export default function FAQAccordion() {
  const { lang } = useLanguage();
  const faqs = faqData[lang];
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="faq"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">
        {headings[lang].title}
      </h2>
      <p className="text-ujjain-cream mb-12 text-center max-w-xl">
        {headings[lang].subtitle}
      </p>

      <div className="w-full max-w-3xl flex flex-col gap-3">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white/5 border border-ujjain-gold/30 rounded-xl overflow-hidden hover:border-ujjain-gold transition-all duration-300"
            >
              <button
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-ujjain-cream font-medium text-sm md:text-base">
                  {item.q}
                </span>
                <span
                  className={`text-ujjain-gold text-xl leading-none flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 text-ujjain-cream/70 text-sm leading-relaxed">
                    {item.a}
                    {item.linkTo && (
                      <button
                        onClick={() => scrollTo(item.linkTo)}
                        className="block mt-3 text-ujjain-saffron text-xs font-semibold hover:text-ujjain-gold transition"
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
