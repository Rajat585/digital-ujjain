"use client";
import { useState } from "react";
import { useLanguage } from "../components/LanguageContext";

const timelineData = {
  hi: [
    {
      year: "2024",
      title: "Smart City Roads",
      desc: "Shehar ke pramukh maargon ka chaudikaran aur naveenikaran kiya gaya.",
      stat: "45 KM",
      label: "Roads Improved",
      extraStats: [
        { value: "45 KM", label: "Sadkein Sudhri" },
        { value: "18", label: "Junctions Improved" },
        { value: "₹120 Cr", label: "Nivesh" },
      ],
      highlights: [
        "Freeganj se Mahakal Marg tak 4-lane chaudikaran",
        "Naye footpath aur street lighting sabhi mukhya sadkon par",
        "18 pramukh junctions par traffic signal aur smart crossing",
        "Barsat mein jalbhraav rokne ke liye naye drainage system",
      ],
      impact: "Is project se shehar ke andar aane-jaane ka samay lagbhag 30% kam hua hai, aur Simhastha ke doraan bhaari bheed sambhalne ki taiyari bhi majboot hui hai.",
    },
    {
      year: "2025",
      title: "Mahakal Lok Vistar",
      desc: "Mahakal corridor ka vistar aur beautification project poora hua.",
      stat: "900+",
      label: "Crore Invested",
      extraStats: [
        { value: "900+ Cr", label: "Kul Nivesh" },
        { value: "6 Lakh", label: "Sq. Ft. Vistar" },
        { value: "108", label: "Naye Stambh" },
      ],
      highlights: [
        "Mandir parisar ka do guna vistar, darshan capacity badhi",
        "Shiv-leela wall aur mahakal plaza ka naveenikaran",
        "Bhakton ke liye chhaya-yukt walking corridor",
        "Naye parking aur e-rickshaw pickup zones",
      ],
      impact: "Ab pratidin lagbhag 40,000 se zyada shraddhalu aasani se darshan kar pa rahe hain, jo Simhastha 2028 ke liye ek majboot aadhar hai.",
    },
    {
      year: "2025",
      title: "Digital Infrastructure",
      desc: "Free WiFi zones aur smart surveillance system shehar bhar mein lagaya gaya.",
      stat: "200+",
      label: "CCTV Cameras",
      extraStats: [
        { value: "200+", label: "CCTV Cameras" },
        { value: "35", label: "Free WiFi Zones" },
        { value: "1", label: "Integrated Control Room" },
      ],
      highlights: [
        "AI-based crowd monitoring pramukh ghats aur mandir par",
        "Ek kendriya command-and-control centre se live nigrani",
        "Emergency alert system SMS aur app ke through",
        "Tourist information kiosks digital screens ke saath",
      ],
      impact: "Digital nigrani se surakhsha response time kam hua hai, aur bhakton ko real-time bheed jaankari milna aasan ho gaya hai.",
    },
    {
      year: "2026",
      title: "Ghat Renovation",
      desc: "Ram Ghat aur Kshipra tat ka poora renovation aur cleaning drive.",
      stat: "12",
      label: "Ghats Renovated",
      extraStats: [
        { value: "12", label: "Ghats Renovated" },
        { value: "3.5 KM", label: "Riverfront Cover" },
        { value: "24x7", label: "Cleaning Drive" },
      ],
      highlights: [
        "Ram Ghat par naye stone platforms aur safety railings",
        "Kshipra nadi ki safai ke liye sthayi treatment plant",
        "Naye changing rooms aur locker facility snan ke liye",
        "Ghat par saundarya-samvardhan roshni aur landscaping",
      ],
      impact: "Renovation ke baad ghat na sirf zyada surakshit hue hain balki Kshipra ka jal-star bhi pehle se saaf dikh raha hai.",
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
  hi: { title: "2 Saal Ka Vikas", subtitle: "Ujjain mein hue pramukh vikas karyon ki jhalak" },
  en: { title: "2 Years of Development", subtitle: "A glimpse of the major development projects in Ujjain" },
};

const modalLabels = {
  hi: { highlights: "Mukhya Baatein", impact: "Prabhav" },
  en: { highlights: "Key Highlights", impact: "Impact" },
};

const readMoreLabel = { hi: "Aur Padhein →", en: "Read More →" };

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