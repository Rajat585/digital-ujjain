"use client";
import { useState } from "react";
import { useLanguage } from "../components/LanguageContext";

const zonesData = {
  hi: [
    {
      name: "Mahakaleshwar Mandir",
      type: "Pramukh Jyotirlinga",
      icon: "🙏",
      lat: 23.1828,
      lng: 75.7683,
      desc: "Ujjain ka sabse pramukh Jyotirlinga, jaha subah 4 baje Bhasma Aarti hoti hai.",
    },
    {
      name: "Mahakal Lok Corridor",
      type: "Heritage Walk",
      icon: "🏛️",
      lat: 23.1834,
      lng: 75.7679,
      desc: "900 meter lamba shobhaymay corridor, Shiv katha ki 100+ murtiyon ke saath.",
    },
    {
      name: "Harsiddhi Mandir",
      type: "Shakti Peeth",
      icon: "🪔",
      lat: 23.1839,
      lng: 75.7681,
      desc: "51 Shakti Peethon mein se ek, Mahakal se sirf 5 minute paidal, do vishal deep stambhon ke liye prasiddh.",
    },
    {
      name: "Ram Ghat",
      type: "Snan Zone",
      icon: "🛕",
      lat: 23.1852,
      lng: 75.7691,
      desc: "Kshipra nadi ka mukhya ghat, Simhastha snan ka sabse pramukh sthal.",
    },
    {
      name: "Dutt Akhada",
      type: "Akhada Camp",
      icon: "⛺",
      lat: 23.187,
      lng: 75.77,
      desc: "Sadhu-santon ke thehrne ka pramukh akhada camp, Ram Ghat ke paas.",
    },
    {
      name: "Chintaman Ganesh Mandir",
      type: "Darshan Zone",
      icon: "🐘",
      lat: 23.1697,
      lng: 75.7507,
      desc: "Kshipra tat par sthit prachin swayambhu Ganesh Mandir.",
    },
    {
      name: "Shani Mandir",
      type: "Darshan Zone",
      icon: "🪐",
      lat: 23.181,
      lng: 75.781,
      desc: "Shani Dev ko samarpit prasiddh mandir, Shani Jayanti par vishesh bhid.",
    },
    {
      name: "Bhartrihari Gufa",
      type: "Historical Site",
      icon: "🕳️",
      lat: 23.197,
      lng: 75.774,
      desc: "Raja Bhartrihari ki tapasya sthali, Shipra tat par 10vi sadi ki gufa, Gadkalika Mandir ke paas.",
    },
    {
      name: "Rinmukteshwar Mahadev Mandir",
      type: "Darshan Zone",
      icon: "🔱",
      lat: 23.1975,
      lng: 75.7745,
      desc: "Shipra tat par sthit prachin Shiv mandir, karz-mukti ke liye prasiddh. Bhartrihari Gufa ke paas sthit.",
    },
    {
      name: "Gadkalika Mandir",
      type: "Shakti Peeth",
      icon: "⚔️",
      lat: 23.1965,
      lng: 75.7735,
      desc: "Devi Kalika ka mandir, Kalidas ki aaradhya devi mana jata hai.",
    },
    {
      name: "Kal Bhairav Mandir",
      type: "Tantrik Sthal",
      icon: "🕉️",
      lat: 23.2182,
      lng: 75.7686,
      desc: "Ashta Bhairavon mein se ek, shehar ke rakshak dev.",
    },
    {
      name: "Kal Bhairav Ghat",
      type: "Snan Zone",
      icon: "🌊",
      lat: 23.217,
      lng: 75.7695,
      desc: "Kal Bhairav Mandir ke paas Kshipra tat ka snan sthal.",
    },
    {
      name: "Mangalnath Mandir",
      type: "Darshan Zone",
      icon: "🔴",
      lat: 23.1965,
      lng: 75.7825,
      desc: "Mangal Grah ki janmasthali mana jata hai, Kshipra tat par sthit.",
    },
    {
      name: "Sandipani Ashram",
      type: "Historical Site",
      icon: "📜",
      lat: 23.1745,
      lng: 75.792,
      desc: "Krishna aur Sudama ki shiksha sthali, prachin gurukul.",
    },
    {
      name: "Ujjain Bagalamukhi Mandir",
      type: "Darshan Zone",
      icon: "🪷",
      lat: 23.166,
      lng: 75.7615,
      desc: "Devi Bagalamukhi ko samarpit siddh peeth.",
    },
    {
      name: "ISKCON Mandir",
      type: "Darshan Zone",
      icon: "🪈",
      lat: 23.159,
      lng: 75.754,
      desc: "Krishna Balram Mandir, bhavya vastukala aur sanjh aarti ke liye prasiddh.",
    },
    {
      name: "Nanakheda Bus Stand",
      type: "Parking Zone",
      icon: "🚌",
      lat: 23.1645,
      lng: 75.7845,
      desc: "Simhastha ke dauraan mukhya vehicle parking aur bus terminal.",
    },
    {
      name: "Dewas Gate Bus Stand",
      type: "Transit Point",
      icon: "🚏",
      lat: 23.1795,
      lng: 75.7855,
      desc: "Shehar ke andar aane-jaane ka mukhya bus stop.",
    },
    {
      name: "Ujjain Railway Station",
      type: "Transit Point",
      icon: "🚉",
      lat: 23.1765,
      lng: 75.7887,
      desc: "Ujjain Junction — shehar ka mukhya railway station.",
    },
  ],
  en: [
    {
      name: "Mahakaleshwar Temple",
      type: "Principal Jyotirlinga",
      icon: "🙏",
      lat: 23.1828,
      lng: 75.7683,
      desc: "Ujjain's most prominent Jyotirlinga, where the Bhasma Aarti takes place every day at 4 AM.",
    },
    {
      name: "Mahakal Lok Corridor",
      type: "Heritage Walk",
      icon: "🏛️",
      lat: 23.1834,
      lng: 75.7679,
      desc: "A magnificent 900-meter corridor featuring over 100 sculptures depicting the Shiv Katha.",
    },
    {
      name: "Harsiddhi Temple",
      type: "Shakti Peeth",
      icon: "🪔",
      lat: 23.1839,
      lng: 75.7681,
      desc: "One of the 51 Shakti Peeths, just a 5-minute walk from Mahakal, famous for its two massive lamp towers.",
    },
    {
      name: "Ram Ghat",
      type: "Bathing Zone",
      icon: "🛕",
      lat: 23.1852,
      lng: 75.7691,
      desc: "The main ghat on the Kshipra river — the most significant site for the Simhastha holy bath.",
    },
    {
      name: "Dutt Akhada",
      type: "Akhada Camp",
      icon: "⛺",
      lat: 23.187,
      lng: 75.77,
      desc: "The main akhada camp where sadhus and saints stay, located near Ram Ghat.",
    },
    {
      name: "Chintaman Ganesh Temple",
      type: "Darshan Zone",
      icon: "🐘",
      lat: 23.1697,
      lng: 75.7507,
      desc: "An ancient self-manifested Ganesh temple situated on the banks of the Kshipra.",
    },
    {
      name: "Shani Temple",
      type: "Darshan Zone",
      icon: "🪐",
      lat: 23.181,
      lng: 75.781,
      desc: "A famous temple dedicated to Shani Dev, seeing especially heavy crowds on Shani Jayanti.",
    },
    {
      name: "Bhartrihari Cave",
      type: "Historical Site",
      icon: "🕳️",
      lat: 23.197,
      lng: 75.774,
      desc: "The site of King Bhartrihari's penance — a 10th-century cave on the Shipra riverbank, near Gadkalika Temple.",
    },
    {
      name: "Rinmukteshwar Mahadev Temple",
      type: "Darshan Zone",
      icon: "🔱",
      lat: 23.1975,
      lng: 75.7745,
      desc: "An ancient Shiva temple on the Shipra riverbank, famous for freeing devotees from debt. Located near Bhartrihari Cave.",
    },
    {
      name: "Gadkalika Temple",
      type: "Shakti Peeth",
      icon: "⚔️",
      lat: 23.1965,
      lng: 75.7735,
      desc: "A temple of Goddess Kalika, believed to be the revered deity of the poet Kalidas.",
    },
    {
      name: "Kal Bhairav Temple",
      type: "Tantric Site",
      icon: "🕉️",
      lat: 23.2182,
      lng: 75.7686,
      desc: "One of the eight Bhairavs, considered the guardian deity of the city.",
    },
    {
      name: "Kal Bhairav Ghat",
      type: "Bathing Zone",
      icon: "🌊",
      lat: 23.217,
      lng: 75.7695,
      desc: "A bathing spot on the Kshipra riverbank near the Kal Bhairav Temple.",
    },
    {
      name: "Mangalnath Temple",
      type: "Darshan Zone",
      icon: "🔴",
      lat: 23.1965,
      lng: 75.7825,
      desc: "Believed to be the birthplace of the planet Mars, located on the banks of the Kshipra.",
    },
    {
      name: "Sandipani Ashram",
      type: "Historical Site",
      icon: "📜",
      lat: 23.1745,
      lng: 75.792,
      desc: "The place where Krishna and Sudama received their education — an ancient gurukul.",
    },
    {
      name: "Ujjain Bagalamukhi Temple",
      type: "Darshan Zone",
      icon: "🪷",
      lat: 23.166,
      lng: 75.7615,
      desc: "A siddh peeth dedicated to Goddess Bagalamukhi.",
    },
    {
      name: "ISKCON Temple",
      type: "Darshan Zone",
      icon: "🪈",
      lat: 23.159,
      lng: 75.754,
      desc: "The Krishna Balram Temple, known for its magnificent architecture and evening aarti.",
    },
    {
      name: "Nanakheda Bus Stand",
      type: "Parking Zone",
      icon: "🚌",
      lat: 23.1645,
      lng: 75.7845,
      desc: "The main vehicle parking area and bus terminal during Simhastha.",
    },
    {
      name: "Dewas Gate Bus Stand",
      type: "Transit Point",
      icon: "🚏",
      lat: 23.1795,
      lng: 75.7855,
      desc: "The main bus stop for travel within the city.",
    },
    {
      name: "Ujjain Railway Station",
      type: "Transit Point",
      icon: "🚉",
      lat: 23.1765,
      lng: 75.7887,
      desc: "Ujjain Junction — the city's main railway station.",
    },
  ],
};

const text = {
  hi: {
    title: "Simhastha Planning Zone",
    subtitle:
      "Ujjain ki 19 mahatvapurn jagah — naam pe click karke details aur route dekhein",
    viewRoute: "Route Dekhein",
    prevDarshan: "← Pehle Darshan",
    nextDarshan: "Agla Darshan →",
    findNearest: "📍 Mere Sabse Nazdeek Wale Sthaan Dikhayein",
    locating: "Location Pata Ki Ja Rahi Hai...",
    locationError:
      "Location nahi mil payi. Kripya browser mein location permission on karein.",
    nearestTitle: "Aapke Sabse Nazdeek",
    away: "door",
    clearLocation: "Location Hataayein",
  },
  en: {
    title: "Simhastha Planning Zone",
    subtitle:
      "19 important places in Ujjain — click on a name to see details and route",
    viewRoute: "View Route",
    prevDarshan: "← Previous Darshan",
    nextDarshan: "Next Darshan →",
    findNearest: "📍 Show Places Nearest To Me",
    locating: "Finding Your Location...",
    locationError:
      "Couldn't get your location. Please enable location permission in your browser.",
    nearestTitle: "Nearest To You",
    away: "away",
    clearLocation: "Clear Location",
  },
};

// Haversine formula: great-circle distance (in km) between two lat/lng points
function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function SimhasthaZone() {
  const { lang } = useLanguage();
  const t = text[lang];
  const zones = zonesData[lang];
  const [selected, setSelected] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");

  const getDirectionsUrl = (zone) =>
    `https://www.google.com/maps/dir/?api=1&destination=${zone.lat},${zone.lng}&travelmode=driving`;

  const handleFindNearest = () => {
    if (!("geolocation" in navigator)) {
      setLocationError(t.locationError);
      return;
    }
    setLocating(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocating(false);
      },
      () => {
        setLocationError(t.locationError);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  // Zones with live distance from the user, sorted nearest-first
  const zonesWithDistance = userLocation
    ? zones
        .map((z) => ({
          ...z,
          distanceKm: distanceKm(
            userLocation.lat,
            userLocation.lng,
            z.lat,
            z.lng,
          ),
        }))
        .sort((a, b) => a.distanceKm - b.distanceKm)
    : null;

  const transitTypes = ["Parking Zone", "Transit Point"];
  const darshanZones = zones.filter((z) => !transitTypes.includes(z.type));
  const currentDarshanIndex =
    selected !== null
      ? darshanZones.findIndex((z) => z.name === zones[selected].name)
      : -1;
  const isTransitPlace =
    selected !== null && transitTypes.includes(zones[selected].type);
  const prevZone =
    !isTransitPlace && currentDarshanIndex > 0
      ? darshanZones[currentDarshanIndex - 1]
      : null;
  const nextZone =
    !isTransitPlace &&
    currentDarshanIndex < darshanZones.length - 1 &&
    currentDarshanIndex !== -1
      ? darshanZones[currentDarshanIndex + 1]
      : null;

  return (
    <section
      id="map"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">
        {t.title}
      </h2>
      <p className="text-ujjain-cream mb-6 text-center max-w-xl">
        {t.subtitle}
      </p>

      <div className="mb-10 flex flex-col items-center">
        {!userLocation ? (
          <button
            onClick={handleFindNearest}
            disabled={locating}
            className="inline-flex items-center gap-2 bg-white/5 border border-ujjain-gold/40 text-ujjain-gold font-semibold px-5 py-2.5 rounded-full hover:border-ujjain-gold hover:bg-ujjain-gold/10 transition disabled:opacity-50"
          >
            {locating ? t.locating : t.findNearest}
          </button>
        ) : (
          <button
            onClick={() => setUserLocation(null)}
            className="text-xs text-ujjain-cream/60 underline"
          >
            {t.clearLocation}
          </button>
        )}
        {locationError && (
          <p className="text-red-400 text-xs mt-2 text-center max-w-sm">
            {locationError}
          </p>
        )}
      </div>

      {zonesWithDistance && (
        <div className="w-full max-w-5xl mb-10">
          <h3 className="text-ujjain-gold font-bold text-sm mb-3 tracking-wide uppercase">
            {t.nearestTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {zonesWithDistance.slice(0, 3).map((zone) => (
              <button
                key={zone.name}
                onClick={() =>
                  setSelected(zones.findIndex((z) => z.name === zone.name))
                }
                className="text-left flex items-center gap-3 bg-ujjain-gold/10 border border-ujjain-gold/50 rounded-lg p-3 hover:bg-ujjain-gold/20 transition"
              >
                <span className="text-2xl">{zone.icon}</span>
                <div>
                  <div className="text-ujjain-gold font-semibold text-sm">
                    {zone.name}
                  </div>
                  <div className="text-ujjain-cream/60 text-xs">
                    {zone.distanceKm.toFixed(1)} km {t.away}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl bg-white/5 border border-ujjain-gold/30 rounded-xl p-6 md:p-10">
        <div className="w-full h-[350px] rounded-lg overflow-hidden mb-8 border border-ujjain-gold/20">
          <iframe
            title="Ujjain Map"
            width="100%"
            height="100%"
            style={{
              filter: "invert(90%) hue-rotate(180deg)",
              border: 0,
              display: "block",
            }}
            src="https://www.openstreetmap.org/export/embed.html?bbox=75.7400%2C23.1500%2C75.8100%2C23.2250&layer=mapnik&marker=23.1828%2C75.7682"
          ></iframe>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(zonesWithDistance || zones).map((zone) => {
            const index = zones.findIndex((z) => z.name === zone.name);
            return (
              <button
                key={zone.name}
                onClick={() => setSelected(selected === index ? null : index)}
                className={`text-left flex items-center gap-2 border rounded-lg p-3 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-ujjain-gold/20 ${
                  selected === index
                    ? "bg-ujjain-gold/10 border-ujjain-gold"
                    : "bg-white/5 border-ujjain-gold/20 hover:border-ujjain-gold"
                }`}
              >
                <span className="text-xl">{zone.icon}</span>
                <div>
                  <div className="text-ujjain-gold font-semibold text-xs">
                    {zone.name}
                  </div>
                  <div className="text-ujjain-cream/60 text-[10px]">
                    {zone.type}
                    {zone.distanceKm !== undefined &&
                      ` · ${zone.distanceKm.toFixed(1)} km`}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="mt-6 bg-ujjain-gold/5 border border-ujjain-gold/40 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{zones[selected].icon}</span>
              <div>
                <h3 className="text-xl font-bold text-ujjain-gold">
                  {zones[selected].name}
                </h3>
                <p className="text-ujjain-saffron text-xs">
                  {zones[selected].type}
                </p>
              </div>
            </div>
            <p className="text-ujjain-cream/90 mb-5">{zones[selected].desc}</p>

            <a
              href={getDirectionsUrl(zones[selected])}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ujjain-gold text-ujjain-dark font-bold px-5 py-2.5 rounded-lg hover:bg-ujjain-saffron transition mb-5"
            >
              {t.viewRoute}
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-ujjain-gold/20">
              {prevZone && (
                <button
                  onClick={() => setSelected(selected - 1)}
                  className="text-left bg-white/5 border border-ujjain-gold/20 rounded-lg p-3 hover:border-ujjain-gold transition"
                >
                  <div className="text-ujjain-cream/50 text-xs mb-1">
                    {t.prevDarshan}
                  </div>
                  <div className="text-ujjain-gold text-sm font-semibold">
                    {prevZone.icon} {prevZone.name}
                  </div>
                </button>
              )}
              {nextZone && (
                <button
                  onClick={() => setSelected(selected + 1)}
                  className="text-left bg-white/5 border border-ujjain-gold/20 rounded-lg p-3 hover:border-ujjain-gold transition"
                >
                  <div className="text-ujjain-cream/50 text-xs mb-1">
                    {t.nextDarshan}
                  </div>
                  <div className="text-ujjain-gold text-sm font-semibold">
                    {nextZone.icon} {nextZone.name}
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
