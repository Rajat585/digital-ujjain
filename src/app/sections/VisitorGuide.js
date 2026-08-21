"use client";
import { useLanguage } from "../components/LanguageContext";

const text = {
    hi: {
        title: "Visitor Guide",
        subtitle: "Simhastha 2028 ki yatra plan karne ke liye zaroori jaankari",
        reachTitle: "Kaise Pahunchein",
        reachTrain: "Train",
        reachTrainDesc: "Ujjain Junction — Delhi, Mumbai, Ahmedabad se seedhi trains. Simhastha ke dauraan special trains bhi chalengi.",
        reachAir: "Hawai Yatra",
        reachAirDesc: "Sabse nazdeek airport Indore (Devi Ahilyabai Holkar Airport), Ujjain se lagbhag 55-65 km door. Wahan se taxi/bus se aasaani se pahunch sakte hain.",
        reachRoad: "Sadak Marg",
        reachRoadDesc: "NH52 se achhi tarah connected. Indore-Ujjain highway 2028 tak 6-lane ho jayegi. Regular state-run aur private buses uplabdh hain.",
        foodTitle: "Khaan-Paan",
        foodDesc: "Sirf authorized/verified stalls se hi khana-paani lein. Mahakal ka prasad aur Ujjain ke traditional sweets zaroor try karein.",
        transportTitle: "Sthaniya Transport",
        transportDesc: "Auto-rickshaw aur taxi sthaniya yatra ke liye aasaani se milenge. Bus stands aur railway station hamare interactive map par pehle se marked hain.",
        transportLink: "Map par dekhein →",
        parkingTitle: "Parking",
        parkingDesc: "Simhastha 2028 ke liye 500 Acre ka dedicated parking zone planned hai. Nanakheda area map par 'Parking Zone' tag ke saath marked hai.",
        accommodationTitle: "Thaharne Ki Jagah",
        accommodationDesc: "Verified stays aur sarkari-verified pricing ke saath poori list humare Stay Booking section me uplabdh hai.",
        accommodationLink: "Poori list yahan dekhein →",
        emergencyTitle: "Emergency Sahayta",
        emergencyDesc: "Kisi bhi zaroorat ke liye ye helpline numbers hamesha yaad rakhein:",
        footNote: "Ye jaankari planning ke liye hai — Simhastha ke dauraan sthaniya prashasan ke real-time updates ko priority dein.",
    },
    en: {
        title: "Visitor Guide",
        subtitle: "Essential information to plan your Simhastha 2028 visit",
        reachTitle: "How to Reach",
        reachTrain: "Train",
        reachTrainDesc: "Ujjain Junction has direct trains from Delhi, Mumbai, and Ahmedabad. Special trains will also run during Simhastha.",
        reachAir: "By Air",
        reachAirDesc: "The nearest airport is Indore (Devi Ahilyabai Holkar Airport), about 55-65 km from Ujjain. Easily reachable from there by taxi or bus.",
        reachRoad: "By Road",
        reachRoadDesc: "Well connected via NH52. The Indore-Ujjain highway will be widened to 6 lanes by 2028. Regular state-run and private buses are available.",
        foodTitle: "Food",
        foodDesc: "Only use authorized/verified stalls for food and water. Don't miss the Mahakal prasad and Ujjain's traditional sweets.",
        transportTitle: "Local Transportation",
        transportDesc: "Auto-rickshaws and taxis are easily available for local travel. Bus stands and the railway station are already marked on our interactive map.",
        transportLink: "View on Map →",
        parkingTitle: "Parking",
        parkingDesc: "A dedicated 500 Acre parking zone is planned for Simhastha 2028. The Nanakheda area is marked on the map with a 'Parking Zone' tag.",
        accommodationTitle: "Accommodation",
        accommodationDesc: "Verified stays with government-verified pricing are available in full in our Stay Booking section.",
        accommodationLink: "View full list here →",
        emergencyTitle: "Emergency Assistance",
        emergencyDesc: "Keep these helpline numbers handy for any need:",
        footNote: "This information is for planning purposes — during Simhastha, please prioritize real-time updates from local administration.",
    },
};

const emergencyNumbers = [
    { icon: "🚓", label: { hi: "Police", en: "Police" }, number: "100" },
    { icon: "🚑", label: { hi: "Ambulance", en: "Ambulance" }, number: "108" },
    { icon: "🚒", label: { hi: "Fire", en: "Fire" }, number: "101" },
    { icon: "☎️", label: { hi: "Tourist Helpline", en: "Tourist Helpline" }, number: "1364" },
];

export default function VisitorGuide() {
    const { lang } = useLanguage();
    const t = text[lang];

    return (
        <section
            id="visitor-guide"
            className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark"
        >
            <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">
                {t.title}
            </h2>
            <p className="text-ujjain-cream mb-12 text-center max-w-xl">{t.subtitle}</p>

            {/* How to Reach */}
            <div className="w-full max-w-4xl mb-6">
                <h3 className="text-xl font-bold text-ujjain-gold mb-4">{t.reachTitle}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-6">
                        <div className="text-3xl mb-3">🚆</div>
                        <h4 className="text-lg font-bold text-ujjain-gold mb-2">{t.reachTrain}</h4>
                        <p className="text-ujjain-cream/80 text-sm">{t.reachTrainDesc}</p>
                    </div>
                    <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-6">
                        <div className="text-3xl mb-3">✈️</div>
                        <h4 className="text-lg font-bold text-ujjain-gold mb-2">{t.reachAir}</h4>
                        <p className="text-ujjain-cream/80 text-sm">{t.reachAirDesc}</p>
                    </div>
                    <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-6">
                        <div className="text-3xl mb-3">🛣️</div>
                        <h4 className="text-lg font-bold text-ujjain-gold mb-2">{t.reachRoad}</h4>
                        <p className="text-ujjain-cream/80 text-sm">{t.reachRoadDesc}</p>
                    </div>
                </div>
            </div>

            {/* Food + Transport + Parking */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-4xl mb-6">
                <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-6">
                    <div className="text-3xl mb-3">🍽️</div>
                    <h4 className="text-lg font-bold text-ujjain-gold mb-2">{t.foodTitle}</h4>
                    <p className="text-ujjain-cream/80 text-sm">{t.foodDesc}</p>
                </div>

                <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-6 flex flex-col">
                    <div className="text-3xl mb-3">🛺</div>
                    <h4 className="text-lg font-bold text-ujjain-gold mb-2">{t.transportTitle}</h4>
                    <p className="text-ujjain-cream/80 text-sm flex-1">{t.transportDesc}</p>
                    <a href="#map" className="text-ujjain-gold text-sm font-semibold mt-4 hover:underline">
                        {t.transportLink}
                    </a>
                </div>

                <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-6">
                    <div className="text-3xl mb-3">🅿️</div>
                    <h4 className="text-lg font-bold text-ujjain-gold mb-2">{t.parkingTitle}</h4>
                    <p className="text-ujjain-cream/80 text-sm">{t.parkingDesc}</p>
                </div>
            </div>

            {/* Accommodation link */}
            <div className="w-full max-w-4xl mb-6">
                <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h4 className="text-lg font-bold text-ujjain-gold mb-1">{t.accommodationTitle}</h4>
                        <p className="text-ujjain-cream/80 text-sm">{t.accommodationDesc}</p>
                    </div>

                    <a
                        href="#hotel-booking"
                        className="text-ujjain-gold text-sm font-semibold whitespace-nowrap hover:underline"
                    >
                        {t.accommodationLink}
                    </a>
                </div>
        </div>

      {/* Emergency numbers */ }
      <div className="w-full max-w-4xl">
        <h3 className="text-xl font-bold text-ujjain-gold mb-4">{t.emergencyTitle}</h3>
        <p className="text-ujjain-cream/80 text-sm mb-4">{t.emergencyDesc}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {emergencyNumbers.map((item) => (
            <div
              key={item.number}
              className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-4 text-center"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xl font-bold text-ujjain-gold">{item.number}</div>
              <div className="text-ujjain-cream/60 text-[11px] mt-1">{item.label[lang]}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-ujjain-cream/40 text-xs mt-8 text-center max-w-md">{t.footNote}</p>
    </section >
  );
}