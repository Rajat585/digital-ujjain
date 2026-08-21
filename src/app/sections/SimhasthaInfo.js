"use client";
import { useState } from "react";
import { useLanguage } from "../components/LanguageContext";

const infoData = {
  hi: [
    {
      title: "Dharmik Evam Sanskritik Mahatva",
      desc: "Simhastha sirf ek mela nahi, ek jeevit parampara hai jo Ujjain ko Hindu cosmology mein vishesh sthaan deti hai.",
      icon: "🕉️",
      points: [
        "Simhastha tab hoti hai jab Brihaspati (Guru Graha) Simha (Leo) rashi mein pravesh karte hain — ek khagoliya sanyog jo har 12 saal mein aata hai.",
        "Ye Bharat ke 4 classical Kumbh Melon mein se ek hai (baaki teen: Haridwar, Prayagraj, aur Nashik-Trimbak).",
        "Mान्यता hai ki Samudra Manthan ke dauraan Amrit ki kuch boondein Shipra nadi ke tat par giri thi — isi wajah se Ujjain mein snan ka itna mahatva hai.",
        "Shipra nadi mein snan karne se paapon se mukti aur moksha milta hai, aisi shraddha hai.",
      ],
      impact: "Prachin Bharatiya khagolshastri Ujjain ko samay-nirdharan ke liye reference meridian jaisa maante the — isliye ise 'kaal ki nagri' bhi kaha jaata hai.",
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
      impact: "Har 12 saal mein hone wali Simhastha, Ujjain ke itihas aur pehchaan ka ek ateet-vartaman ko jodne wala mahatvapurna adhyay hai.",
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
      impact: "In paramparaon ko samajhna yatriyon ke liye zaroori hai — isse wo sahi din chun sakte hain: darshan-shanti ke liye Parva Snan, ya bhavyata dekhne ke liye Shahi Snan.",
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
      impact: "Ancient Indian astronomers regarded Ujjain as a reference meridian for timekeeping — which is why it is also called the 'city of time'.",
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
      impact: "Held once every 12 years, Simhastha is a defining chapter that connects Ujjain's past and present.",
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
      impact: "Understanding these traditions helps pilgrims choose the right day to visit — Parva Snan for a calmer darshan, or Shahi Snan to witness the grandeur.",
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

const headings = {
  hi: {
    title: "Simhastha 2028 Ke Baare Mein",
    subtitle: "Dharmik mahatva, itihas, paramparayein aur mukhya aakarshan",
  },
  en: {
    title: "About Simhastha 2028",
    subtitle: "Religious significance, history, traditions, and major attractions",
  },
};

const modalLabels = {
  hi: { points: "Mukhya Baatein", impact: "Vishesh" },
  en: { points: "Key Points", impact: "Note" },
};

const readMoreLabel = { hi: "Aur Padhein →", en: "Read More →" };
const ctaLabel = { hi: "Poori Suchi Map Par Dekhein ↓", en: "See Full List On Map ↓" };
const disclaimer = {
  hi: "Simhastha 2028 ki tareekhein official ghoshna ke anusaar update hongi.",
  en: "Simhastha 2028 dates will be updated as per the official announcement.",
};

export default function SimhasthaInfo() {
  const { lang } = useLanguage();
  const info = infoData[lang];
  const [activeIndex, setActiveIndex] = useState(null);
  const activeItem = activeIndex !== null ? info[activeIndex] : null;

  const scrollToMap = () => {
    setActiveIndex(null);
    document.getElementById("map")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="simhastha-info"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">
        {headings[lang].title}
      </h2>
      <p className="text-ujjain-cream mb-4 text-center max-w-xl">
        {headings[lang].subtitle}
      </p>
      <p className="text-ujjain-cream/50 text-xs mb-12 text-center max-w-md italic">
        {disclaimer[lang]}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {info.map((item, index) => (
          <div
            key={index}
            className="flex flex-col bg-white/5 border border-ujjain-gold/30 rounded-xl p-6 hover:border-ujjain-gold hover:-translate-y-2 hover:shadow-lg hover:shadow-ujjain-gold/10 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-lg font-bold text-ujjain-gold mb-2">{item.title}</h3>
            <p className="text-ujjain-cream/70 text-sm mb-4">{item.desc}</p>
            <button
              onClick={() => setActiveIndex(index)}
              className="mt-auto self-start px-4 py-1.5 rounded-full bg-ujjain-gold text-ujjain-dark text-xs font-semibold hover:bg-ujjain-saffron transition"
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

            <div className="text-4xl mb-2">{activeItem.icon}</div>
            <h3 className="text-2xl md:text-3xl font-bold text-ujjain-gold mt-2 mb-4">
              {activeItem.title}
            </h3>

            <h4 className="text-ujjain-gold font-semibold mb-2">{modalLabels[lang].points}</h4>
            <ul className="text-ujjain-cream/90 text-sm mb-6 space-y-2 text-left">
              {activeItem.points.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-ujjain-saffron">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {activeItem.impact && (
              <>
                <h4 className="text-ujjain-gold font-semibold mb-2">{modalLabels[lang].impact}</h4>
                <p className="text-ujjain-cream/90 text-sm text-left mb-4">{activeItem.impact}</p>
              </>
            )}

            {activeItem.cta && (
              <button
                onClick={scrollToMap}
                className="w-full mt-2 px-4 py-2 rounded-full bg-ujjain-gold text-ujjain-dark text-sm font-semibold hover:bg-ujjain-saffron transition"
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