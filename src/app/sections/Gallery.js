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
      label: "पुरानी सिंहस्थ (2016)",
      images: [
        {
          file: "Simhasth2016 Panchayati akhada nirmal Shahi Snan Leading.jpg",
          caption: "2016 सिंहस्थ में अखाड़े की शाही स्नान शोभा यात्रा",
        },
        {
          file: "Simhasth2016 Ujjain Piligrims.jpg",
          caption: "2016 में क्षिप्रा तट पर एकत्रित श्रद्धालु",
        },
        {
          file: "Simhasth2016 Ujjain Ram Ghat.jpg",
          caption: "राम घाट पर 2016 सिंहस्थ के दौरान का दृश्य",
        },
        {
          file: "Swami Nardanand Maha Guru of Swami Tridevi Ma Paramahansa tirth on in Kumba Mela Ujjain India 2016.jpg",
          caption: "2016 कुंभ में एक संत",
        },
        {
          file: "Simhasth2016 Ujjain Gau Ghat.jpg",
          caption: "गौ घाट, 2016 सिंहस्थ के दौरान",
        },
        {
          file: "Simhasth2016 Ujjain Piligrims1.jpg",
          caption: "क्षिप्रा तट पर श्रद्धालुओं की भीड़, 2016",
        },
        {
          file: "Simhasth2016 Ujjain Security.jpg",
          caption: "2016 सिंहस्थ में सुरक्षा व्यवस्था",
        },
        {
          file: "Simhasth2016 Ujjain Snan1.jpg",
          caption: "शाही स्नान का दृश्य, 2016",
        },
        {
          file: "Simhasth2016 Ujjain Snan2.jpg",
          caption: "श्रद्धालु क्षिप्रा में स्नान करते हुए, 2016",
        },
        {
          file: "A sadhu attired in the dress made of Rudraksha during Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
          caption: "रुद्राक्ष धारण किए एक साधु, 2004 कुंभ",
        },
        {
          file: "A sadhu in deep meditation after performing Shahi Snan at Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
          caption: "शाही स्नान के बाद ध्यान में एक साधु, 2004",
        },
        {
          file: "A view of the Simhasth Kumbh Mela, on the occasion of Akshaya Tritiya Shahi Snaan Day, in Ujjain on May 09, 2016.jpg",
          caption: "अक्षय तृतीया शाही स्नान के दिन का दृश्य, 2016",
        },
        {
          file: "A view of the Simhasth Kumbh Mela, on the occasion of Akshaya Tritiya Shahi Snaan Day, in Ujjain on May 09, 2016 (1).jpg",
          caption: "अक्षय तृतीया शाही स्नान, एक और दृश्य",
        },
        {
          file: "Devotees taking holy dip for Shahi Snan during Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
          caption: "श्रद्धालु शाही स्नान के लिए डुबकी लगाते हुए, 2004",
        },
        {
          file: "Sadhus waiting eagerly for their turn to take a dip for Shahi Snan at Simhastha Kumbh (2004), Ujjain on April 22, 2004.jpg",
          caption: "साधु अपनी बारी का इंतज़ार करते हुए, 2004",
        },
        {
          file: "A flag at Mahakumbh mela at Ujjain (India, 2016).jpg",
          caption: "2016 महाकुंभ मेले में लहराता झंडा",
        },
      ],
    },
    {
      key: "temples",
      label: "मंदिर",
      images: [
        {
          file: "Mahakal Temple Ujjain.JPG",
          caption: "महाकालेश्वर ज्योतिर्लिंग मंदिर",
        },
        {
          file: "Kal Bhairav temple Ujjain.jpg",
          caption: "काल भैरव मंदिर, क्षिप्रा तट",
        },
        {
          file: "HarsiddhiMataTemple.jpg",
          caption: "हर्षिद्धि मंदिर और उसके दीप स्तंभ",
        },
        {
          file: "Shri juna Mahakaleshwar Temple Ujjain - panoramio.jpg",
          caption: "श्री महाकालेश्वर मंदिर का एक और दृश्य",
        },
        {
          file: "Kalabhairava Temple Ujjain.JPG",
          caption: "काल भैरव मंदिर का बाहरी दृश्य",
        },
        {
          file: "Lord Kal Bhairav, Ujjain.jpg",
          caption: "काल भैरव की मूर्ति",
        },
        {
          file: "Shri Kaal Bhairav Mandir Main Gate Ujjain - panoramio.jpg",
          caption: "काल भैरव मंदिर का मुख्य द्वार",
        },
        {
          file: "Harsiddhi Temple, Ujjain 04.jpg",
          caption: "हर्षिद्धि मंदिर, एक और दृश्य",
        },
        {
          file: "Harsiddhi Temple, Ujjain 01.jpg",
          caption: "हर्षिद्धि मंदिर का प्रमुख दृश्य",
        },
        {
          file: "Harsidhhi Mata Temple Ujjjain - panoramio.jpg",
          caption: "हर्षिद्धि माता मंदिर",
        },
        {
          file: "Akrureshwar Mahadev.jpg",
          caption: "अक्रूरेश्वर महादेव मंदिर",
        },
        { file: "Bade Ganeshji.JPG", caption: "बड़े गणेशजी का मंदिर" },
        { file: "Bhadrakali Ujjain.JPG", caption: "भद्रकाली मंदिर, उज्जैन" },
        {
          file: "Chintamann Ganesh Temple Ujjain - panoramio.jpg",
          caption: "चिंतामण गणेश मंदिर",
        },
        {
          file: "Gadh Kalika Mata Temple ujjain - panoramio.jpg",
          caption: "गढ़ कालिका माता मंदिर",
        },
        { file: "ISKCON Temple Ujjain.jpg", caption: "इस्कॉन मंदिर, उज्जैन" },
        {
          file: "Harsiddhi Marg, Ujjain 01.jpg",
          caption: "हर्षिद्धि मार्ग का दृश्य",
        },
        {
          file: "Harsiddhi Marg, Ujjain 02.jpg",
          caption: "हर्षिद्धि मार्ग, एक और कोण से",
        },
        { file: "Lord kartikeya.jpg", caption: "भगवान कार्तिकेय की मूर्ति" },
        {
          file: "Narmada river from mahakaleshwar temple, Ujjain.jpg",
          caption: "महाकालेश्वर मंदिर से नर्मदा नदी का दृश्य",
        },
        {
          file: "Shri Mahakaleshwar Jyotirling Ujjain.jpg",
          caption: "श्री महाकालेश्वर ज्योतिर्लिंग",
        },
        {
          file: "Shri Mahakaleshwar Temple Ujjain - panoramio (2).jpg",
          caption: "महाकालेश्वर मंदिर, दूसरा दृश्य",
        },
        {
          file: "Shri Mahakaleshwar Temple Ujjain - panoramio (3).jpg",
          caption: "महाकालेश्वर मंदिर, तीसरा दृश्य",
        },
        {
          file: "Shri Mahakaleshwar Temple Ujjain - panoramio (4).jpg",
          caption: "महाकालेश्वर मंदिर, चौथा दृश्य",
        },
        {
          file: "Shri Mahakaleshwer Temple - panoramio.jpg",
          caption: "महाकालेश्वर मंदिर का बाहरी रूप",
        },
        {
          file: "Shri Mahakaleshwer Temple at Night ujjain - panoramio.jpg",
          caption: "रात में महाकालेश्वर मंदिर",
        },
        {
          file: "Ujjain Mahakal Temple.jpg",
          caption: "उज्जैन का महाकाल मंदिर",
        },
        { file: "Ujjain Mandir.jpg", caption: "उज्जैन का एक प्राचीन मंदिर" },
        { file: "Ujjain temple.jpg", caption: "उज्जैन शहर का मंदिर" },
        {
          file: "Ujjain temple 007.jpg",
          caption: "उज्जैन के मंदिरों में से एक",
        },
      ],
    },
    {
      key: "ghats",
      label: "घाट",
      images: [
        {
          file: "Shri Ram Ghat 02.jpg",
          caption: "राम घाट — सिंहस्थ का मुख्य स्नान स्थल",
        },
        {
          file: "Ujjain, Ram Ghat (9840921865).jpg",
          caption: "राम घाट का दृश्य",
        },
        {
          file: "Ram Ghat, Ujjain 01.jpg",
          caption: "राम घाट, क्षिप्रा नदी के किनारे",
        },
        {
          file: "Ram Ghat and Kshipra river , Ujjain - panoramio.jpg",
          caption: "राम घाट और क्षिप्रा नदी का दृश्य",
        },
        { file: "Shri Ram Ghat 01.jpg", caption: "राम घाट, एक और दृश्य" },
        { file: "Ram ghat ujjain.jpg", caption: "राम घाट, उज्जैन" },
      ],
    },
    {
      key: "culture",
      label: "सांस्कृतिक कार्यक्रम",
      images: [
        {
          file: "Simhasth2016 Panchayati akhada nirmal Shahi Snan sawari.jpg",
          caption: "अखाड़े की शोभा यात्रा, शाही स्नान के दौरान",
        },
        {
          file: "Simhasth2016 Ujjain Saadhu 1.jpg",
          caption: "सिंहस्थ में एक साधु",
        },
        {
          file: "Simhasth2016 Shree Panchayati Bada Udaseen Akhada.jpg",
          caption: "श्री पंचायती बड़ा उदासीन अखाड़ा",
        },
        {
          file: "Simhasth2016 Ujjain Saadhu 2.jpg",
          caption: "सिंहस्थ में एक साधु, 2016",
        },
        {
          file: "Simhasth2016 Ujjain Saadhu 3.jpg",
          caption: "सिंहस्थ में एक और साधु, 2016",
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
    title: "गैलरी",
    subtitle:
      "पुरानी सिंहस्थ, मंदिर, घाट और सांस्कृतिक पल, एक झलक में",
  },
  en: {
    title: "Gallery",
    subtitle:
      "A glimpse of the previous Simhastha, temples, ghats, and cultural moments",
  },
  hinglish: {
    title: "Gallery",
    subtitle:
      "Purani Simhastha, mandir, ghat aur sanskritik pal, ek jhalak mein",
  },
};

const allLabel = { hi: "सभी", en: "All", hinglish: "Sabhi" };
const viewMoreLabel = { hi: "और देखें ↓", en: "View More ↓", hinglish: "Aur Dekhein ↓" };
const viewLessLabel = { hi: "कम देखें ↑", en: "View Less ↑", hinglish: "Kam Dekhein ↑" };
const INITIAL_COUNT = 9;

galleryData.hinglish = [
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
  ];


export default function Gallery() {
  const { lang } = useLanguage();
  const categories = galleryData[lang];
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [showAll, setShowAll] = useState(false);

  const allImages = categories.flatMap((cat) => cat.images);
  const fullList =
    activeCategory === "all"
      ? allImages
      : categories.find((c) => c.key === activeCategory)?.images || [];

  const visibleImages = showAll ? fullList : fullList.slice(0, INITIAL_COUNT);

  const slides = visibleImages.map((img) => ({
    src: wikiImg(img.file),
    alt: img.caption,
    title: img.caption,
  }));

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setShowAll(false);
  };

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
          onClick={() => handleCategoryChange("all")}
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
            onClick={() => handleCategoryChange(cat.key)}
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

      {fullList.length > INITIAL_COUNT && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-8 px-6 py-2 rounded-full bg-ujjain-gold text-ujjain-dark text-sm font-semibold hover:bg-ujjain-saffron transition"
        >
          {showAll ? viewLessLabel[lang] : viewMoreLabel[lang]}
        </button>
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
      />
    </section>
  );
}
