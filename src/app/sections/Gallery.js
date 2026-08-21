"use client";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useLanguage } from "../components/LanguageContext";

const wikiImg = (filename) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}`;

const galleryData = {
  hi: [
    {
      key: "simhastha2016",
      label: "Purani Simhastha (2016)",
      images: [
        { file: "Simhasth2016 Panchayati akhada nirmal Shahi Snan Leading.jpg", caption: "2016 Simhastha mein Akhada ki Shahi Snan shobha yatra" },
        { file: "Simhasth2016 Ujjain Piligrims.jpg", caption: "2016 mein Shipra tat par ekatrit shraddhalu" },
        { file: "Simhasth2016 Ujjain Ram Ghat.jpg", caption: "Ram Ghat par 2016 Simhastha ke dauraan ka drishya" },
        { file: "Swami Nardanand Maha Guru of Swami Tridevi Ma Paramahansa tirth on in Kumba Mela Ujjain India 2016.jpg", caption: "2016 Kumbh mein ek sant" },
      ],
    },
    {
      key: "temples",
      label: "Mandir",
      images: [
        { file: "Mahakal Temple Ujjain.JPG", caption: "Mahakaleshwar Jyotirlinga Mandir" },
        { file: "Kal Bhairav temple Ujjain.jpg", caption: "Kal Bhairav Mandir, Shipra tat" },
        { file: "HarsiddhiMataTemple.jpg", caption: "Harsiddhi Mandir aur uske deep stambh" },
      ],
    },
    {
      key: "ghats",
      label: "Ghat",
      images: [
        { file: "Shri Ram Ghat 02.jpg", caption: "Ram Ghat — Simhastha ka mukhya snan sthal" },
        { file: "Ujjain, Ram Ghat (9840921865).jpg", caption: "Ram Ghat ka drishya" },
        { file: "Ram Ghat, Ujjain 01.jpg", caption: "Ram Ghat, Shipra nadi ke kinare" },
      ],
    },
    {
      key: "culture",
      label: "Sanskritik Karyakram",
      images: [
        { file: "Simhasth2016 Panchayati akhada nirmal Shahi Snan sawari.jpg", caption: "Akhada ki shobha yatra, Shahi Snan ke dauraan" },
        { file: "Simhasth2016 Ujjain Saadhu 1.jpg", caption: "Simhastha mein ek sadhu" },
        { file: "Simhasth2016 Shree Panchayati Bada Udaseen Akhada.jpg", caption: "Shree Panchayati Bada Udaseen Akhada" },
      ],
    },
  ],
  en: [
    {
      key: "simhastha2016",
      label: "Previous Simhastha (2016)",
      images: [
        { file: "Simhasth2016 Panchayati akhada nirmal Shahi Snan Leading.jpg", caption: "An Akhada's Shahi Snan procession during Simhastha 2016" },
        { file: "Simhasth2016 Ujjain Piligrims.jpg", caption: "Pilgrims gathered on the Shipra riverbank in 2016" },
        { file: "Simhasth2016 Ujjain Ram Ghat.jpg", caption: "Ram Ghat during Simhastha 2016" },
        { file: "Swami Nardanand Maha Guru of Swami Tridevi Ma Paramahansa tirth on in Kumba Mela Ujjain India 2016.jpg", caption: "A saint at the 2016 Kumbh" },
      ],
    },
    {
      key: "temples",
      label: "Temples",
      images: [
        { file: "Mahakal Temple Ujjain.JPG", caption: "Mahakaleshwar Jyotirlinga Temple" },
        { file: "Kal Bhairav temple Ujjain.jpg", caption: "Kal Bhairav Temple, on the banks of the Shipra" },
        { file: "HarsiddhiMataTemple.jpg", caption: "Harsiddhi Temple and its lamp towers" },
      ],
    },
    {
      key: "ghats",
      label: "Ghats",
      images: [
        { file: "Shri Ram Ghat 02.jpg", caption: "Ram Ghat — the main bathing site of Simhastha" },
        { file: "Ujjain, Ram Ghat (9840921865).jpg", caption: "A view of Ram Ghat" },
        { file: "Ram Ghat, Ujjain 01.jpg", caption: "Ram Ghat, on the banks of the Shipra river" },
      ],
    },
    {
      key: "culture",
      label: "Cultural Events",
      images: [
        { file: "Simhasth2016 Panchayati akhada nirmal Shahi Snan sawari.jpg", caption: "An Akhada's procession during Shahi Snan" },
        { file: "Simhasth2016 Ujjain Saadhu 1.jpg", caption: "A sadhu at Simhastha" },
        { file: "Simhasth2016 Shree Panchayati Bada Udaseen Akhada.jpg", caption: "Shree Panchayati Bada Udaseen Akhada" },
      ],
    },
  ],
};

const headings = {
  hi: { title: "Gallery", subtitle: "Purani Simhastha, mandir, ghat aur sanskritik pal, ek jhalak mein" },
  en: { title: "Gallery", subtitle: "A glimpse of the previous Simhastha, temples, ghats, and cultural moments" },
};

const allLabel = { hi: "Sabhi", en: "All" };

export default function Gallery() {
  const { lang } = useLanguage();
  const categories = galleryData[lang];
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const allImages = categories.flatMap((cat) => cat.images);
  const visibleImages =
    activeCategory === "all"
      ? allImages
      : categories.find((c) => c.key === activeCategory)?.images || [];

  const slides = visibleImages.map((img) => ({
    src: wikiImg(img.file),
    alt: img.caption,
    title: img.caption,
  }));

  return (
    <section
      id="gallery"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">
        {headings[lang].title}
      </h2>
      <p className="text-ujjain-cream mb-8 text-center max-w-xl">
        {headings[lang].subtitle}
      </p>

      {/* Category filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold border transition ${
            activeCategory === "all"
              ? "bg-ujjain-gold text-ujjain-dark border-ujjain-gold"
              : "text-ujjain-cream/70 border-ujjain-gold/30 hover:border-ujjain-gold"
          }`}
        >
          {allLabel[lang]}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold border transition ${
              activeCategory === cat.key
                ? "bg-ujjain-gold text-ujjain-dark border-ujjain-gold"
                : "text-ujjain-cream/70 border-ujjain-gold/30 hover:border-ujjain-gold"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-5xl">
        {visibleImages.map((img, index) => (
          <button
            key={`${img.file}-${index}`}
            onClick={() => setLightboxIndex(index)}
            className="relative aspect-square rounded-xl overflow-hidden border border-ujjain-gold/30 hover:border-ujjain-gold group"
          >
            <img
              src={wikiImg(img.file)}
              alt={img.caption}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
          </button>
        ))}
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />
    </section>
  );
}