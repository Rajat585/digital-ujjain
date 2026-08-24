"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useLanguage } from "../components/LanguageContext";

const templeSchedules = {
  mahakal: [
    { name: "Bhasma Aarti", hour: 4 },
    { name: "Bal Bhog Aarti", hour: 7 },
    { name: "Bhog Aarti", hour: 10.5 },
    { name: "Sandhya Aarti", hour: 19 },
    { name: "Shayan Aarti", hour: 22.5 },
  ],
  kalbhairav: [
    { name: "Prathakal Darshan", hour: 6 },
    { name: "Bhog Aarti", hour: 12 },
    { name: "Sandhya Aarti", hour: 18.5 },
    { name: "Shayan Darshan", hour: 21 },
  ],
};

const crowdLevels = {
  hi: { veryHigh: "बहुत ज़्यादा", high: "ज़्यादा", moderate: "मध्यम", low: "कम" },
  en: { veryHigh: "Very High", high: "High", moderate: "Moderate", low: "Low" },
  hinglish: { veryHigh: "Bahut Zyada", high: "Zyada", moderate: "Madhyam", low: "Kam" },
};

function getCrowdForHour(hour, isBhasmaWindow, lang) {
  const c = crowdLevels[lang];
  if (isBhasmaWindow && hour >= 3.5 && hour < 6) return { level: c.veryHigh, color: "text-red-400" };
  if (hour >= 6 && hour < 9) return { level: c.high, color: "text-orange-400" };
  if (hour >= 9 && hour < 16) return { level: c.moderate, color: "text-yellow-400" };
  if (hour >= 16 && hour < 20) return { level: c.high, color: "text-orange-400" };
  return { level: c.low, color: "text-green-400" };
}

function getNextEvent(schedule, currentDecimal, tomorrowText) {
  const upcoming = schedule.find((t) => t.hour > currentDecimal);
  return upcoming ? upcoming.name : `${schedule[0].name} (${tomorrowText})`;
}

const text = {
  hi: {
    title: "लाइव यात्री सहायता डैशबोर्ड",
    subtitle: "अभी की स्थिति — यात्रा योजना बनाने के लिए काम की जानकारी",
    mahakalTitle: "महाकालेश्वर मंदिर",
    kalBhairavTitle: "काल भैरव मंदिर",
    nextAarti: "अगली आरती",
    currentCrowd: "अभी की भीड़",
    temperature: "तापमान",
    lowCrowdTime: "कम भीड़ का समय",
    lowCrowdWindow: "सुबह 10 – शाम 4 बजे",
    verifiedStalls: "सत्यापित स्टॉल",
    verifiedStallsNote: "FSSAI-लाइसेंस प्राप्त और नगर निगम से सत्यापित पानी/खाना ही लें",
    emergencyNumbers: "100 / 108 / 112",
    emergencyLabel: "पुलिस / एम्बुलेंस / आपातकालीन",
    emergencyNote: "महाकाल मंदिर पूछताछ: 0734-2550563",
    tomorrowMorning: "कल सुबह",
    footNote: "आरती समय और भीड़ सामान्य पैटर्न पर आधारित हैं — सिंहस्थ के दौरान प्रशासन के रीयल-टाइम अपडेट को प्राथमिकता दें।",
  },
  en: {
    title: "Live Visitor Assistance Dashboard",
    subtitle: "Current status — useful information to plan your visit",
    mahakalTitle: "Mahakaleshwar Temple",
    kalBhairavTitle: "Kal Bhairav Temple",
    nextAarti: "Next Aarti",
    currentCrowd: "Current Crowd",
    temperature: "Temperature",
    lowCrowdTime: "Low Crowd Time",
    lowCrowdWindow: "10 AM – 4 PM",
    verifiedStalls: "Verified Stalls",
    verifiedStallsNote: "Only use FSSAI-licensed, municipality-verified food/water stalls",
    emergencyNumbers: "100 / 108 / 112",
    emergencyLabel: "Police / Ambulance / Emergency",
    emergencyNote: "Mahakal Temple Enquiry: 0734-2550563",
    tomorrowMorning: "tomorrow morning",
    footNote: "Aarti timings and crowd levels are based on typical patterns — during Simhastha, please prioritize real-time updates from the administration.",
  },
  hinglish: {
    title: "Live Yatri Sahayta Dashboard",
    subtitle: "Abhi ki sthiti — yatra plan karne ke liye kaam ki jaankari",
    mahakalTitle: "Mahakaleshwar Mandir",
    kalBhairavTitle: "Kal Bhairav Mandir",
    nextAarti: "Agli Aarti",
    currentCrowd: "Abhi Ki Bhid",
    temperature: "Tapmaan",
    lowCrowdTime: "Kam Bhid Ka Samay",
    lowCrowdWindow: "10 AM – 4 PM",
    verifiedStalls: "Verified Stalls",
    verifiedStallsNote: "FSSAI-licensed aur nagar nigam se verified paani/khana hi lein",
    emergencyNumbers: "100 / 108 / 112",
    emergencyLabel: "Police / Ambulance / Emergency",
    emergencyNote: "Mahakal Mandir Enquiry: 0734-2550563",
    tomorrowMorning: "kal subah",
    footNote: "Aarti samay aur bhid typical patterns par aadharit hain — Simhastha ke dauraan prashasan ke real-time updates ko priority dein.",
  },
};

export default function LiveDashboard() {
  const { lang } = useLanguage();
  const t = text[lang];
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveActivity, setLiveActivity] = useState([]);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=23.1793&longitude=75.7849&current=temperature_2m,relative_humidity_2m,weather_code")
      .then((res) => res.json())
      .then((data) => {
        setWeather(data.current);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const socket = io(API_BASE_URL);

    socket.on("newBooking", (data) => {
      const label =
        data.type === "hotel"
          ? `🏨 ${data.propertyName} — new hotel booking`
          : `🧭 ${data.sathiName} — new Sathi booking`;
      setLiveActivity((prev) => [{ label, time: new Date() }, ...prev].slice(0, 5));
    });

    return () => socket.disconnect();
  }, []);

  const hour = currentTime.getHours();
  const currentDecimal = hour + currentTime.getMinutes() / 60;

  const mahakalCrowd = getCrowdForHour(currentDecimal, true, lang);
  const kalBhairavCrowd = getCrowdForHour(currentDecimal, false, lang);
  const mahakalNext = getNextEvent(templeSchedules.mahakal, currentDecimal, t.tomorrowMorning);
  const kalBhairavNext = getNextEvent(templeSchedules.kalbhairav, currentDecimal, t.tomorrowMorning);

  return (
    <section id="live-dashboard" className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark">
      <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">{t.title}</h2>
      <p className="text-ujjain-cream mb-12 text-center max-w-xl">{t.subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl mb-6">
        <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🙏</span>
            <h3 className="text-xl font-bold text-ujjain-gold">{t.mahakalTitle}</h3>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-ujjain-cream/70 text-sm">{t.nextAarti}</span>
            <span className="text-ujjain-gold font-semibold">{mahakalNext}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ujjain-cream/70 text-sm">{t.currentCrowd}</span>
            <span className={`font-bold ${mahakalCrowd.color}`}>{mahakalCrowd.level}</span>
          </div>
        </div>

        <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🕉️</span>
            <h3 className="text-xl font-bold text-ujjain-gold">{t.kalBhairavTitle}</h3>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-ujjain-cream/70 text-sm">{t.nextAarti}</span>
            <span className="text-ujjain-gold font-semibold">{kalBhairavNext}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-ujjain-cream/70 text-sm">{t.currentCrowd}</span>
            <span className={`font-bold ${kalBhairavCrowd.color}`}>{kalBhairavCrowd.level}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
        <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">🌤️</div>
          <div className="text-xl font-bold text-ujjain-gold">
            {loading ? "..." : weather ? `${Math.round(weather.temperature_2m)}°C` : "N/A"}
          </div>
          <div className="text-ujjain-cream/60 text-[11px] mt-1">{t.temperature}</div>
        </div>

        <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">⏰</div>
          <div className="text-sm font-bold text-ujjain-gold">{t.lowCrowdWindow}</div>
          <div className="text-ujjain-cream/60 text-[11px] mt-1">{t.lowCrowdTime}</div>
        </div>

        <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">🚨</div>
          <div className="text-sm font-bold text-ujjain-gold">{t.emergencyNumbers}</div>
          <div className="text-ujjain-cream/60 text-[11px] mt-1">{t.emergencyLabel}</div>
          <div className="text-ujjain-cream/40 text-[10px] mt-1">{t.emergencyNote}</div>
        </div>

        <div className="bg-white/5 border border-ujjain-gold/30 rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">💧</div>
          <div className="text-sm font-bold text-ujjain-gold">{t.verifiedStalls}</div>
          <div className="text-ujjain-cream/60 text-[11px] mt-1">{t.verifiedStallsNote}</div>
        </div>
      </div>

      {liveActivity.length > 0 && (
        <div className="w-full max-w-4xl mt-6 bg-white/5 border border-ujjain-gold/30 rounded-xl p-4">
          <h4 className="text-ujjain-gold font-semibold text-sm mb-2">🔴 Live Activity</h4>
          <ul className="space-y-1">
            {liveActivity.map((item, i) => (
              <li key={i} className="text-ujjain-cream/80 text-xs flex justify-between">
                <span>{item.label}</span>
                <span className="text-ujjain-cream/40">{item.time.toLocaleTimeString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-ujjain-cream/40 text-xs mt-8 text-center max-w-md">{t.footNote}</p>
    </section>
  );
}