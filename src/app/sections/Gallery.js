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
        {
          file: "Simhasth2016 Panchayati akhada nirmal Shahi Snan Leading.jpg",
          caption: "2016 Simhastha mein Akhada ki Shahi Snan shobha yatra",
        },
        {
          file: "Simhasth2016 Ujjain Piligrims.jpg",
          caption: "2016 mein Shipra tat par ekatrit shraddhalu",
        },
        {
          file: "Simhasth2016 Ujjain Ram Ghat.jpg",
          caption: "Ram Ghat par 2016 Simhastha ke dauraan ka drishya",
        },
        {
          file: "Swami Nardanand Maha Guru of Swami Tridevi Ma Paramahansa tirth on in Kumba Mela Ujjain India 2016.jpg",
          caption: "2016 Kumbh mein ek sant",
        },
        {
          file: "Simhasth2016 Ujjain Gau Ghat.jpg",
          caption: "Gau Ghat, 2016 Simhastha ke dauraan",
        },
        {
          file: "Simhasth2016 Ujjain Piligrims1.jpg",
          caption: "Shipra tat par shraddhaluon ki bheed, 2016",
        },
        {
          file: "Simhasth2016 Ujjain Security.jpg",
          caption: "2016 Simhastha mein suraksha vyavastha",
        },
        {
          file: "Simhasth2016 Ujjain Snan1.jpg",
          caption: "Shahi Snan ka drishya, 2016",
        },
        {
          file: "Simhasth2016 Ujjain Snan2.jpg",
          caption: "Shraddhalu Shipra mein snan karte hue, 2016",
        },
        {
          file: "A sadhu attired in the dress made of Rudraksha during Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
          caption: "Rudraksha dharan kiye ek sadhu, 2004 Kumbh",
        },
        {
          file: "A sadhu in deep meditation after performing Shahi Snan at Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
          caption: "Shahi Snan ke baad dhyaan mein ek sadhu, 2004",
        },
        {
          file: "A view of the Simhasth Kumbh Mela, on the occasion of Akshaya Tritiya Shahi Snaan Day, in Ujjain on May 09, 2016.jpg",
          caption: "Akshaya Tritiya Shahi Snan ke din ka drishya, 2016",
        },
        {
          file: "A view of the Simhasth Kumbh Mela, on the occasion of Akshaya Tritiya Shahi Snaan Day, in Ujjain on May 09, 2016 (1).jpg",
          caption: "Akshaya Tritiya Shahi Snan, ek aur drishya",
        },
        {
          file: "Devotees taking holy dip for Shahi Snan during Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
          caption: "Shraddhalu Shahi Snan ke liye dubki lagate hue, 2004",
        },
        {
          file: "Sadhus waiting eagerly for their turn to take a dip for Shahi Snan at Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
          caption: "Sadhu apni baari ka intezar karte hue, 2004",
        },
        {
          file: "A flag at Mahakumbh mela at Ujjain (India, 2016).jpg",
          caption: "2016 Mahakumbh mele mein lahraata jhanda",
        },
      ],
    },
    {
      key: "temples",
      label: "Mandir",
      images: [
        {
          file: "Mahakal Temple Ujjain.JPG",
          caption: "Mahakaleshwar Jyotirlinga Mandir",
        },
        {
          file: "Kal Bhairav temple Ujjain.jpg",
          caption: "Kal Bhairav Mandir, Shipra tat",
        },
        {
          file: "HarsiddhiMataTemple.jpg",
          caption: "Harsiddhi Mandir aur uske deep stambh",
        },
        {
          file: "Shri juna Mahakaleshwar Temple Ujjain - panoramio.jpg",
          caption: "Shri Mahakaleshwar Mandir ka ek aur drishya",
        },
        {
          file: "Kalabhairava Temple Ujjain.JPG",
          caption: "Kal Bhairav Mandir ka bahari drishya",
        },
        {
          file: "Lord Kal Bhairav, Ujjain.jpg",
          caption: "Kal Bhairav ki murti",
        },
        {
          file: "Shri Kaal Bhairav Mandir Main Gate Ujjain - panoramio.jpg",
          caption: "Kal Bhairav Mandir ka mukhya dwar",
        },
        {
          file: "Harsiddhi Temple, Ujjain 04.jpg",
          caption: "Harsiddhi Mandir, ek aur drishya",
        },
        {
          file: "Harsiddhi Temple, Ujjain 01.jpg",
          caption: "Harsiddhi Mandir ka pramukh drishya",
        },
        {
          file: "Harsidhhi Mata Temple Ujjjain - panoramio.jpg",
          caption: "Harsiddhi Mata Mandir",
        },
        {
          file: "Akrureshwar Mahadev.jpg",
          caption: "Akrureshwar Mahadev Mandir",
        },
        { file: "Bade Ganeshji.JPG", caption: "Bade Ganeshji ka Mandir" },
        { file: "Bhadrakali Ujjain.JPG", caption: "Bhadrakali Mandir, Ujjain" },
        {
          file: "Chintamann Ganesh Temple Ujjain - panoramio.jpg",
          caption: "Chintaman Ganesh Mandir",
        },
        {
          file: "Gadh Kalika Mata Temple ujjain - panoramio.jpg",
          caption: "Gadh Kalika Mata Mandir",
        },
        { file: "ISKCON Temple Ujjain.jpg", caption: "ISKCON Mandir, Ujjain" },
        {
          file: "Harsiddhi Marg, Ujjain 01.jpg",
          caption: "Harsiddhi Marg ka drishya",
        },
        {
          file: "Harsiddhi Marg, Ujjain 02.jpg",
          caption: "Harsiddhi Marg, ek aur kon se",
        },
        { file: "Lord kartikeya.jpg", caption: "Bhagwan Kartikeya ki murti" },
        {
          file: "Narmada river from mahakaleshwar temple, Ujjain.jpg",
          caption: "Mahakaleshwar Mandir se Narmada nadi ka drishya",
        },
        {
          file: "Shri Mahakaleshwar Jyotirling Ujjain.jpg",
          caption: "Shri Mahakaleshwar Jyotirlinga",
        },
        {
          file: "Shri Mahakaleshwar Temple Ujjain - panoramio (1).jpg",
          caption: "Mahakaleshwar Mandir, ek drishya",
        },
        {
          file: "Shri Mahakaleshwar Temple Ujjain - panoramio (2).jpg",
          caption: "Mahakaleshwar Mandir, doosra drishya",
        },
        {
          file: "Shri Mahakaleshwar Temple Ujjain - panoramio (3).jpg",
          caption: "Mahakaleshwar Mandir, teesra drishya",
        },
        {
          file: "Shri Mahakaleshwar Temple Ujjain - panoramio (4).jpg",
          caption: "Mahakaleshwar Mandir, chautha drishya",
        },
        {
          file: "Shri Mahakaleshwer Temple - panoramio.jpg",
          caption: "Mahakaleshwar Mandir ka bahari roop",
        },
        {
          file: "Shri Mahakaleshwer Temple at Night ujjain - panoramio.jpg",
          caption: "Raat mein Mahakaleshwar Mandir",
        },
        { file: "MAHAKAL LOK UJJAIN.jpg", caption: "Mahakal Lok corridor" },
        {
          file: "Ujjain Mahakal Temple.jpg",
          caption: "Ujjain ka Mahakal Mandir",
        },
        { file: "Ujjain Mandir.jpg", caption: "Ujjain ka ek pracheen mandir" },
        { file: "Ujjain temple.jpg", caption: "Ujjain shehar ka mandir" },
        {
          file: "Ujjain temple 007.jpg",
          caption: "Ujjain ke mandiron mein se ek",
        },
      ],
    },
    {
      key: "ghats",
      label: "Ghat",
      images: [
        {
          file: "Shri Ram Ghat 02.jpg",
          caption: "Ram Ghat — Simhastha ka mukhya snan sthal",
        },
        {
          file: "Ujjain, Ram Ghat (9840921865).jpg",
          caption: "Ram Ghat ka drishya",
        },
        {
          file: "Ram Ghat, Ujjain 01.jpg",
          caption: "Ram Ghat, Shipra nadi ke kinare",
        },
        {
          file: "Ram Ghat and Kshipra river , Ujjain - panoramio.jpg",
          caption: "Ram Ghat aur Shipra nadi ka drishya",
        },
        { file: "Shri Ram Ghat 01.jpg", caption: "Ram Ghat, ek aur drishya" },
        { file: "Ram ghat ujjain.jpg", caption: "Ram Ghat, Ujjain" },
        { file: "Kshipra aarti.jpg", caption: "Shipra nadi ki sandhya aarti" },
      ],
    },
    {
      key: "culture",
      label: "Sanskritik Karyakram",
      images: [
        {
          file: "Simhasth2016 Panchayati akhada nirmal Shahi Snan sawari.jpg",
          caption: "Akhada ki shobha yatra, Shahi Snan ke dauraan",
        },
        {
          file: "Simhasth2016 Ujjain Saadhu 1.jpg",
          caption: "Simhastha mein ek sadhu",
        },
        {
          file: "Simhasth2016 Shree Panchayati Bada Udaseen Akhada.jpg",
          caption: "Shree Panchayati Bada Udaseen Akhada",
        },
        {
          file: "Simhasth2016 Ujjain Saadhu 2.jpg",
          caption: "Simhastha mein ek sadhu, 2016",
        },
        {
          file: "Simhasth2016 Ujjain Saadhu 3.jpg",
          caption: "Simhastha mein ek aur sadhu, 2016",
        },
      ],
    },
  ],
  en: [
    {
      key: "simhastha2016",
      label: "Previous Simhastha (2016)",
      images: [
        {
          file: "Simhasth2016 Panchayati akhada nirmal Shahi Snan Leading.jpg",
          caption: "An Akhada's Shahi Snan procession during Simhastha 2016",
        },
        {
          file: "Simhasth2016 Ujjain Piligrims.jpg",
          caption: "Pilgrims gathered on the Shipra riverbank in 2016",
        },
        {
          file: "Simhasth2016 Ujjain Ram Ghat.jpg",
          caption: "Ram Ghat during Simhastha 2016",
        },
        {
          file: "Swami Nardanand Maha Guru of Swami Tridevi Ma Paramahansa tirth on in Kumba Mela Ujjain India 2016.jpg",
          caption: "A saint at the 2016 Kumbh",
        },
        {
          file: "Simhasth2016 Ujjain Gau Ghat.jpg",
          caption: "Gau Ghat during Simhastha 2016",
        },
        {
          file: "Simhasth2016 Ujjain Piligrims1.jpg",
          caption: "Crowds of pilgrims on the Shipra riverbank, 2016",
        },
        {
          file: "Simhasth2016 Ujjain Security.jpg",
          caption: "Security arrangements during Simhastha 2016",
        },
        {
          file: "Simhasth2016 Ujjain Snan1.jpg",
          caption: "Scene from the Shahi Snan, 2016",
        },
        {
          file: "Simhasth2016 Ujjain Snan2.jpg",
          caption: "Pilgrims bathing in the Shipra, 2016",
        },
        {
          file: "A sadhu attired in the dress made of Rudraksha during Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
          caption: "A sadhu dressed in rudraksha, 2004 Kumbh",
        },
        {
          file: "A sadhu in deep meditation after performing Shahi Snan at Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
          caption: "A sadhu in meditation after Shahi Snan, 2004",
        },
        {
          file: "A view of the Simhasth Kumbh Mela, on the occasion of Akshaya Tritiya Shahi Snaan Day, in Ujjain on May 09, 2016.jpg",
          caption: "A view from Akshaya Tritiya Shahi Snan day, 2016",
        },
        {
          file: "A view of the Simhasth Kumbh Mela, on the occasion of Akshaya Tritiya Shahi Snaan Day, in Ujjain on May 09, 2016 (1).jpg",
          caption: "Another view from Akshaya Tritiya Shahi Snan",
        },
        {
          file: "Devotees taking holy dip for Shahi Snan during Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
          caption: "Devotees taking a holy dip for Shahi Snan, 2004",
        },
        {
          file: "Sadhus waiting eagerly for their turn to take a dip for Shahi Snan at Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
          caption: "Sadhus waiting their turn for the holy dip, 2004",
        },
        {
          file: "A flag at Mahakumbh mela at Ujjain (India, 2016).jpg",
          caption: "A flag flying at the Mahakumbh mela, 2016",
        },
      ],
    },
    {
      key: "temples",
      label: "Temples",
      images: [
        {
          file: "Mahakal Temple Ujjain.JPG",
          caption: "Mahakaleshwar Jyotirlinga Temple",
        },
        {
          file: "Kal Bhairav temple Ujjain.jpg",
          caption: "Kal Bhairav Temple, on the banks of the Shipra",
        },
        {
          file: "HarsiddhiMataTemple.jpg",
          caption: "Harsiddhi Temple and its lamp towers",
        },
        {
          file: "Shri juna Mahakaleshwar Temple Ujjain - panoramio.jpg",
          caption: "Another view of Shri Mahakaleshwar Temple",
        },
        {
          file: "Kalabhairava Temple Ujjain.JPG",
          caption: "Exterior view of Kal Bhairav Temple",
        },
        {
          file: "Lord Kal Bhairav, Ujjain.jpg",
          caption: "Idol of Lord Kal Bhairav",
        },
        {
          file: "Shri Kaal Bhairav Mandir Main Gate Ujjain - panoramio.jpg",
          caption: "Main gate of Kal Bhairav Temple",
        },
        {
          file: "Harsiddhi Temple, Ujjain 04.jpg",
          caption: "Harsiddhi Temple, another view",
        },
        {
          file: "Harsiddhi Temple, Ujjain 01.jpg",
          caption: "Main view of Harsiddhi Temple",
        },
        {
          file: "Harsidhhi Mata Temple Ujjjain - panoramio.jpg",
          caption: "Harsiddhi Mata Temple",
        },
        {
          file: "Akrureshwar Mahadev.jpg",
          caption: "Akrureshwar Mahadev Temple",
        },
        { file: "Bade Ganeshji.JPG", caption: "Bade Ganeshji Temple" },
        { file: "Bhadrakali Ujjain.JPG", caption: "Bhadrakali Temple, Ujjain" },
        {
          file: "Chintamann Ganesh Temple Ujjain - panoramio.jpg",
          caption: "Chintaman Ganesh Temple",
        },
        {
          file: "Gadh Kalika Mata Temple ujjain - panoramio.jpg",
          caption: "Gadh Kalika Mata Temple",
        },
        { file: "ISKCON Temple Ujjain.jpg", caption: "ISKCON Temple, Ujjain" },
        {
          file: "Harsiddhi Marg, Ujjain 01.jpg",
          caption: "View of Harsiddhi Marg",
        },
        {
          file: "Harsiddhi Marg, Ujjain 02.jpg",
          caption: "Harsiddhi Marg, another angle",
        },
        { file: "Lord kartikeya.jpg", caption: "Idol of Lord Kartikeya" },
        {
          file: "Narmada river from mahakaleshwar temple, Ujjain.jpg",
          caption: "View of the Narmada river from Mahakaleshwar Temple",
        },
        {
          file: "Shri Mahakaleshwar Jyotirling Ujjain.jpg",
          caption: "Shri Mahakaleshwar Jyotirlinga",
        },
        {
          file: "Shri Mahakaleshwar Temple Ujjain - panoramio (1).jpg",
          caption: "A view of Mahakaleshwar Temple",
        },
        {
          file: "Shri Mahakaleshwar Temple Ujjain - panoramio (2).jpg",
          caption: "Another view of Mahakaleshwar Temple",
        },
        {
          file: "Shri Mahakaleshwar Temple Ujjain - panoramio (3).jpg",
          caption: "A third view of Mahakaleshwar Temple",
        },
        {
          file: "Shri Mahakaleshwar Temple Ujjain - panoramio (4).jpg",
          caption: "A fourth view of Mahakaleshwar Temple",
        },
        {
          file: "Shri Mahakaleshwer Temple - panoramio.jpg",
          caption: "Exterior of Mahakaleshwar Temple",
        },
        {
          file: "Shri Mahakaleshwer Temple at Night ujjain - panoramio.jpg",
          caption: "Mahakaleshwar Temple at night",
        },
        { file: "MAHAKAL LOK UJJAIN.jpg", caption: "The Mahakal Lok corridor" },
        {
          file: "Ujjain Mahakal Temple.jpg",
          caption: "The Mahakal Temple in Ujjain",
        },
        { file: "Ujjain Mandir.jpg", caption: "An ancient temple in Ujjain" },
        {
          file: "Ujjain temple.jpg",
          caption: "A temple in the city of Ujjain",
        },
        {
          file: "Ujjain temple 007.jpg",
          caption: "One of Ujjain's many temples",
        },
      ],
    },
    {
      key: "ghats",
      label: "Ghats",
      images: [
        {
          file: "Shri Ram Ghat 02.jpg",
          caption: "Ram Ghat — the main bathing site of Simhastha",
        },
        {
          file: "Ujjain, Ram Ghat (9840921865).jpg",
          caption: "A view of Ram Ghat",
        },
        {
          file: "Ram Ghat, Ujjain 01.jpg",
          caption: "Ram Ghat, on the banks of the Shipra river",
        },
        {
          file: "Ram Ghat and Kshipra river , Ujjain - panoramio.jpg",
          caption: "View of Ram Ghat and the Shipra river",
        },
        { file: "Shri Ram Ghat 01.jpg", caption: "Ram Ghat, another view" },
        { file: "Ram ghat ujjain.jpg", caption: "Ram Ghat, Ujjain" },
        {
          file: "Kshipra aarti.jpg",
          caption: "Evening aarti on the Shipra river",
        },
      ],
    },
    {
      key: "culture",
      label: "Cultural Events",
      images: [
        {
          file: "Simhasth2016 Panchayati akhada nirmal Shahi Snan sawari.jpg",
          caption: "An Akhada's procession during Shahi Snan",
        },
        {
          file: "Simhasth2016 Ujjain Saadhu 1.jpg",
          caption: "A sadhu at Simhastha",
        },
        {
          file: "Simhasth2016 Shree Panchayati Bada Udaseen Akhada.jpg",
          caption: "Shree Panchayati Bada Udaseen Akhada",
        },
        {
          file: "Simhasth2016 Ujjain Saadhu 2.jpg",
          caption: "A sadhu at Simhastha, 2016",
        },
        {
          file: "Simhasth2016 Ujjain Saadhu 3.jpg",
          caption: "Another sadhu at Simhastha, 2016",
        },
      ],
    },
  ],
};

const headings = {
  hi: {
    title: "Gallery",
    subtitle:
      "Purani Simhastha, mandir, ghat aur sanskritik pal, ek jhalak mein",
  },
  en: {
    title: "Gallery",
    subtitle:
      "A glimpse of the previous Simhastha, temples, ghats, and cultural moments",
  },
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
