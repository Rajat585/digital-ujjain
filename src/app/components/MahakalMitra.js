"use client";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const knowledgeBase = [
  {
    keywords: [
      "mahakal",
      "mahakaleshwar",
      "temple",
      "mandir",
      "jyotirling",
      "jyotirlinga",
      "bhasma",
      "aarti",
    ],
    reply: {
      hi: "महाकालेश्वर मंदिर उज्जैन का सबसे प्रमुख ज्योतिर्लिंग है — 12 ज्योतिर्लिंगों में से एक, और यही एकमात्र दक्षिणमुखी ज्योतिर्लिंग है। भस्म आरती रोज़ सुबह 4 बजे होती है, जिसके लिए एडवांस बुकिंग ज़रूरी है। मंदिर क्षिप्रा नदी के किनारे स्थित है।",
      en: "Mahakaleshwar Temple is Ujjain's most important Jyotirlinga — one of the 12 Jyotirlingas, and the only south-facing (Dakshinmukhi) one. The Bhasma Aarti happens every day at 4 AM, and advance booking is required. The temple sits on the banks of the Kshipra river.",
    },
  },
  {
    keywords: ["simhastha", "kumbh", "kab", "date", "tarikh", "2028", "shuru"],
    reply: {
      hi: "सिंहस्थ 2028, अप्रैल महीने में शुरू होगा (सटीक तिथि ज्योतिष गणना के हिसाब से तय होती है)। यह एक महाकुंभ है जो उज्जैन में हर 12 साल में होता है, जब गुरु ग्रह सिंह राशि में प्रवेश करता है। करोड़ों श्रद्धालु क्षिप्रा नदी में स्नान करने आएंगे।",
      en: "Simhastha 2028 will begin in April (the exact date is decided based on astrological calculations). It's a Maha Kumbh that happens in Ujjain every 12 years, when Jupiter enters the sign of Leo. Crores of devotees will come to bathe in the Kshipra river.",
    },
  },
  {
    keywords: ["snan", "ghat", "kshipra", "nadi", "nahana", "dubki"],
    reply: {
      hi: "सिंहस्थ के प्रमुख स्नान घाट हैं: राम घाट (सबसे मुख्य), काल भैरव घाट, और दत्त अखाड़ा के पास के घाट। क्षिप्रा नदी का जल सिंहस्थ के दौरान सबसे ज़्यादा पवित्र माना जाता है। राम घाट पर विशेष स्नान तिथियों पर सबसे ज़्यादा भीड़ होती है।",
      en: "The main bathing ghats for Simhastha are: Ram Ghat (the primary one), Kal Bhairav Ghat, and the ghats near Dutt Akhada. The Kshipra river's water is considered most sacred during Simhastha. Ram Ghat sees the heaviest crowds on special bathing dates.",
    },
  },
  {
    keywords: ["parking", "gaadi", "vehicle", "car", "bike", "kaha rakhu"],
    reply: {
      hi: "सिंहस्थ के दौरान मुख्य वाहन पार्किंग नानाखेड़ा बस स्टैंड के पास होगी। यहां से शटल सेवा या पैदल मंदिर तक पहुंचा जा सकता है। निजी वाहनों को शहर के अंदर ले जाने की अनुमति सीमित होगी भीड़ नियंत्रण के लिए।",
      en: "The main vehicle parking during Simhastha will be near Nanakheda Bus Stand. From there, you can reach the temple by shuttle service or on foot. Private vehicles will have limited access inside the city for crowd control.",
    },
  },
  {
    keywords: [
      "route",
      "kaise pahuche",
      "kaise jaye",
      "raasta",
      "direction",
      "kaha se",
    ],
    reply: {
      hi: "वेबसाइट के 'सिंहस्थ प्लानिंग ज़ोन' सेक्शन में 19 महत्वपूर्ण जगहों की सूची है — किसी भी नाम पर क्लिक करके 'मार्ग देखें' बटन से सीधा गूगल मैप्स में दिशा-निर्देश मिल जाएंगे, आपकी वर्तमान लोकेशन से। वहां पिछले/अगले दर्शन स्थल भी दिख जाएंगे।",
      en: "The 'Simhastha Planning Zone' section on the website has a list of 19 important places — click on any name and use the 'View Route' button to get directions straight to Google Maps from your current location. You'll also see the previous/next darshan spots there.",
    },
  },
  {
    keywords: [
      "hotel",
      "rukna",
      "thehrna",
      "booking",
      "stay",
      "dharamshala",
      "room",
    ],
    reply: {
      hi: "सत्यापित, निश्चित-मूल्य ठहराव के लिए 'स्टे बुकिंग' सेक्शन उपयोग करें — वहां सरकारी-सत्यापित धर्मशाला और गेस्ट हाउस मिलेंगे, बिना किसी अतिरिक्त कमीशन के। बुकिंग करते ही एक क्यूआर कोड रसीद मिलेगी जिसमें राशि लॉक रहेगी।",
      en: "For verified, fixed-price accommodation, use the 'Stay Booking' section — you'll find government-verified dharamshalas and guest houses there, with zero extra commission. Once you book, you'll get a QR code receipt with the amount locked.",
    },
  },
  {
    keywords: [
      "fraud",
      "cheat",
      "extra paisa",
      "dhoka",
      "complaint",
      "shikayat",
    ],
    reply: {
      hi: "अगर कोई अतिरिक्त पैसा मांगे या धोखा दे, तो 'स्टे बुकिंग' या 'साथी बुक करें' सेक्शन में बुकिंग रसीद के नीचे 'रिपोर्ट करें' बटन है — उससे सीधा प्रशासन तक शिकायत पहुंच जाएगी। हमारी सारी ठहराव व्यवस्था निश्चित-मूल्य और सत्यापित है।",
      en: "If anyone asks for extra money or tries to cheat you, there's a 'Report It' button below the booking receipt in the 'Stay Booking' or 'Book a Sathi' section — this sends your complaint straight to the administration. All our accommodation is fixed-price and verified.",
    },
  },
  {
    keywords: ["harsiddhi", "shakti peeth"],
    reply: {
      hi: "हर्षिद्धि मंदिर 51 शक्ति पीठों में से एक है, महाकाल मंदिर से सिर्फ 5 मिनट पैदल की दूरी पर। यहां देवी अन्नपूर्णा, महालक्ष्मी, और महासरस्वती की भी मूर्तियां हैं।",
      en: "Harsiddhi Temple is one of the 51 Shakti Peeths, just a 5-minute walk from Mahakal Temple. It also has idols of Goddess Annapurna, Mahalakshmi, and Mahasaraswati.",
    },
  },
  {
    keywords: ["kal bhairav", "bhairav", "sharab", "tantrik"],
    reply: {
      hi: "काल भैरव मंदिर उज्जैन के रक्षक देवता को समर्पित है, अष्ट भैरवों में से प्रमुख। यहां प्रमुख भोग रूप में शराब चढ़ाई जाती है — यह एक तांत्रिक परंपरा वाला मंदिर है।",
      en: "Kal Bhairav Temple is dedicated to Ujjain's guardian deity, the chief among the eight Bhairavs. Liquor is offered here as a primary offering — it's a temple following tantric tradition.",
    },
  },
  {
    keywords: ["mangalnath", "mangal", "grah"],
    reply: {
      hi: "मंगलनाथ मंदिर को मंगल ग्रह की जन्मस्थली माना जाता है, क्षिप्रा नदी के किनारे स्थित। यह मंगल दोष निवारण पूजा के लिए बहुत प्रसिद्ध है।",
      en: "Mangalnath Temple is believed to be the birthplace of the planet Mars, located on the banks of the Kshipra. It's very famous for Mangal Dosh remedy rituals.",
    },
  },
  {
    keywords: ["bhartrihari", "gufa", "cave"],
    reply: {
      hi: "भर्तृहरि गुफा राजा भर्तृहरि (विक्रमादित्य के भाई) की तपस्या स्थली है, क्षिप्रा नदी के किनारे, 10वीं सदी पुरानी। गढ़कालिका मंदिर के पास स्थित है।",
      en: "Bhartrihari Cave is where King Bhartrihari (Vikramaditya's brother) performed penance — a 10th-century cave on the Shipra riverbank, near Gadkalika Temple.",
    },
  },
  {
    keywords: ["sandipani", "krishna", "sudama", "ashram"],
    reply: {
      hi: "सांदीपनि आश्रम वो स्थान है जहां भगवान कृष्ण और सुदामा ने गुरु सांदीपनि से शिक्षा ली थी। यह उज्जैन का एक महत्वपूर्ण ऐतिहासिक स्थल है।",
      en: "Sandipani Ashram is the place where Lord Krishna and Sudama received their education from Guru Sandipani. It's an important historical site in Ujjain.",
    },
  },
  {
    keywords: ["iskcon", "krishna balram"],
    reply: {
      hi: "इस्कॉन मंदिर (कृष्ण बलराम मंदिर) अपनी भव्य वास्तुकला और संध्या आरती के लिए प्रसिद्ध है — उज्जैन के प्रमुख दर्शन स्थलों में से एक।",
      en: "ISKCON Temple (Krishna Balram Temple) is famous for its magnificent architecture and evening aarti — one of Ujjain's major darshan spots.",
    },
  },
  {
    keywords: ["mahakal lok", "corridor", "lok"],
    reply: {
      hi: "महाकाल लोक एक 900 मीटर लंबा शोभायमान कॉरिडोर है, जिसमें 100 से ज़्यादा शिव कथा की मूर्तियां हैं। यह महाकालेश्वर मंदिर का ही विस्तारित हिस्सा है और बहुत सुंदर रोशनी से सजाया गया है।",
      en: "Mahakal Lok is a magnificent 900-meter corridor with over 100 sculptures depicting the Shiv Katha. It's an expanded part of the Mahakaleshwar Temple, beautifully lit up.",
    },
  },
  {
    keywords: ["vikas", "development", "smart city", "achievement"],
    reply: {
      hi: "उज्जैन ने पिछले 2 सालों में बहुत विकास किया है — 45 किमी सड़कें सुधरी हैं, महाकाल लोक का विस्तार हुआ, 200+ सीसीटीवी कैमरे लगे, और 12 घाटों का नवीनीकरण हुआ। पूरी जानकारी 'विकास' सेक्शन में है।",
      en: "Ujjain has developed a lot over the past 2 years — 45 KM of roads improved, Mahakal Lok expanded, 200+ CCTV cameras installed, and 12 ghats renovated. Full details are in the 'Development' section.",
    },
  },
  {
    keywords: ["crowd", "bhid", "safety", "suraksha", "surakshit"],
    reply: {
      hi: "सिंहस्थ के दौरान क्राउड-मैनेजमेंट के लिए विशेष ज़ोन बनाए गए हैं — 'सिंहस्थ प्लानिंग ज़ोन' सेक्शन में मानचित्र और जानकारी देख सकते हो। सीसीटीवी निगरानी और हेल्पलाइन भी उपलब्ध रहेगी।",
      en: "Special zones have been created for crowd management during Simhastha — you can see the map and details in the 'Simhastha Planning Zone' section. CCTV surveillance and helplines will also be available.",
    },
  },
  {
    keywords: ["weather", "mausam", "temperature", "garmi", "thand"],
    reply: {
      hi: "उज्जैन का लाइव मौसम 'लाइव यात्री सहायता डैशबोर्ड' सेक्शन में दिख रहा है — रीयल-टाइम तापमान और आर्द्रता के साथ।",
      en: "Ujjain's live weather is shown in the 'Live Visitor Assistance Dashboard' section — with real-time temperature and humidity.",
    },
  },
  {
    keywords: ["namaste", "hello", "hi", "hey"],
    reply: {
      hi: "नमस्ते! मैं महाकाल मित्र हूं, आपका डिजिटल उज्जैन और सिंहस्थ गाइड। आप मुझसे मंदिर, घाट, मार्ग, बुकिंग, या सिंहस्थ से जुड़ा कुछ भी पूछ सकते हैं।",
      en: "Hello! I'm Mahakal Mitra, your digital Ujjain and Simhastha guide. Ask me anything about temples, ghats, routes, bookings, or Simhastha.",
    },
  },
  {
    keywords: ["dhanyavaad", "thanks", "thank you", "shukriya"],
    reply: {
      hi: "आपका स्वागत है! जय श्री महाकाल 🙏 और कुछ जानना हो तो बताइए।",
      en: "You're welcome! Jai Shree Mahakal 🙏 Let me know if you'd like to know anything else.",
    },
  },
  {
    keywords: ["kaun", "kya ho tum", "tumhara naam", "who are you"],
    reply: {
      hi: "मैं महाकाल मित्र हूं — डिजिटल उज्जैन वेबसाइट का एआई गाइड। मैं आपको उज्जैन के मंदिर, घाट, सिंहस्थ योजना, बुकिंग, और मार्ग के बारे में पूरी जानकारी दे सकता हूं।",
      en: "I'm Mahakal Mitra — the AI guide for the Digital Ujjain website. I can give you complete information about Ujjain's temples, ghats, Simhastha planning, bookings, and routes.",
    },
  },
  {
    keywords: [
      "ujjain itihaas",
      "history",
      "purana naam",
      "avantika",
      "prachin",
    ],
    reply: {
      hi: "उज्जैन का प्राचीन नाम 'अवंतिका' था। यह भारत की सप्तपुरी (7 पवित्र नगरियों) में से एक है। महाभारत काल में यह अवंति राज्य की राजधानी थी, और राजा विक्रमादित्य का दरबार यहीं लगा करता था।",
      en: "Ujjain's ancient name was 'Avantika'. It's one of India's Saptapuri (7 sacred cities). During the Mahabharata era it was the capital of the Avanti kingdom, and King Vikramaditya's court was held here.",
    },
  },
  {
    keywords: ["vikramaditya", "raja", "king", "samrat"],
    reply: {
      hi: "सम्राट विक्रमादित्य उज्जैन (अवंतिका) के प्रसिद्ध राजा थे, जिनके नाम से विक्रम संवत काल-गणना शुरू हुई। उनके दरबार में 'नवरत्न' (9 विद्वान) रहते थे, जिसमें कालिदास भी शामिल थे।",
      en: "Emperor Vikramaditya was the famous king of Ujjain (Avantika), after whom the Vikram Samvat calendar was named. His court had the 'Navratna' (9 scholars), which included Kalidas.",
    },
  },
  {
    keywords: ["kalidas", "kavi", "poet", "meghdoot"],
    reply: {
      hi: "महाकवि कालिदास उज्जैन से गहरा संबंध रखते थे और उन्होंने मेघदूत जैसी प्रसिद्ध रचनाएं लिखीं, जिसमें उज्जैन का सुंदर वर्णन है। कालिदास अकादमी उज्जैन में स्थित है, जहां उनकी स्मृति में कार्यक्रम होते हैं।",
      en: "The great poet Kalidas had a deep connection with Ujjain and wrote famous works like Meghdoot, which beautifully describes the city. Kalidas Academy is located in Ujjain, where events are held in his memory.",
    },
  },
  {
    keywords: ["saptapuri", "7 nagari", "pavitra shehar"],
    reply: {
      hi: "उज्जैन भारत की 7 सप्तपुरियों में से एक है — बाकी हैं अयोध्या, मथुरा, हरिद्वार, काशी, कांची, और द्वारका। ये सातों नगरियां हिंदुओं के लिए सबसे पवित्र मानी जाती हैं।",
      en: "Ujjain is one of India's 7 Saptapuri cities — the others being Ayodhya, Mathura, Haridwar, Kashi, Kanchi, and Dwarka. All seven cities are considered the most sacred for Hindus.",
    },
  },
  {
    keywords: [
      "tropic of cancer",
      "karkat rekha",
      "0 degree",
      "zero longitude",
    ],
    reply: {
      hi: "उज्जैन को प्राचीन काल में 'पृथ्वी की नाभि' (नेवल ऑफ अर्थ) कहा जाता था, क्योंकि सूर्य सिद्धांत के अनुसार यह कर्क रेखा (ट्रॉपिक ऑफ कैंसर) और ज़ीरो-लॉन्गिट्यूड मेरिडियन के काटने वाले बिंदु के पास स्थित है।",
      en: "In ancient times, Ujjain was called the 'navel of the earth', because according to the Surya Siddhanta, it lies near the point where the Tropic of Cancer and the zero-longitude meridian intersect.",
    },
  },
  {
    keywords: ["train", "railway", "station", "junction"],
    reply: {
      hi: "उज्जैन जंक्शन शहर का मुख्य रेलवे स्टेशन है (कोड: UJN), पश्चिम रेलवे ज़ोन के अंतर्गत। यह इंदौर, भोपाल, और बाकी बड़े शहरों से अच्छी तरह जुड़ा हुआ है। 'सिंहस्थ प्लानिंग ज़ोन' में इसका मार्ग भी मिल जाएगा।",
      en: "Ujjain Junction (code: UJN) is the city's main railway station, under the Western Railway zone. It's well-connected to Indore, Bhopal, and other major cities. You'll also find its route in the 'Simhastha Planning Zone' section.",
    },
  },
  {
    keywords: ["bus", "bus stand", "nanakheda", "dewas gate"],
    reply: {
      hi: "उज्जैन में दो मुख्य बस स्टैंड हैं — नानाखेड़ा बस स्टैंड (सिंहस्थ के दौरान मुख्य पार्किंग भी यहीं होगी) और देवास गेट बस स्टैंड (शहर के अंदर आने-जाने के लिए)।",
      en: "Ujjain has two main bus stands — Nanakheda Bus Stand (which will also be the main parking during Simhastha) and Dewas Gate Bus Stand (for travel within the city).",
    },
  },
  {
    keywords: ["airport", "hawai adda", "flight", "plane"],
    reply: {
      hi: "उज्जैन का सबसे नज़दीकी हवाई अड्डा देवी अहिल्याबाई होल्कर एयरपोर्ट, इंदौर है — जो उज्जैन से लगभग 55 किमी दूर है।",
      en: "Ujjain's nearest airport is Devi Ahilyabai Holkar Airport, Indore — about 55 km from Ujjain.",
    },
  },
  {
    keywords: ["indore", "kitni door", "distance"],
    reply: {
      hi: "उज्जैन, इंदौर से लगभग 55 किलोमीटर दूर है, और दोनों शहर सड़क से अच्छी तरह जुड़े हुए हैं (लगभग 1-1.5 घंटे का सफर)।",
      en: "Ujjain is about 55 kilometers from Indore, and both cities are well-connected by road (about a 1-1.5 hour journey).",
    },
  },
  {
    keywords: ["khana", "food", "bhojan", "restaurant", "prasad"],
    reply: {
      hi: "उज्जैन अपने स्ट्रीट फूड के लिए प्रसिद्ध है — खास तौर पर 'पोहा-जलेबी' सुबह के नाश्ते में बहुत लोकप्रिय है। मंदिर परिसर में प्रसाद भी मिलता है। बहुत से सात्विक भोजनालय (प्योर-वेज रेस्टोरेंट) भी शहर में उपलब्ध हैं।",
      en: "Ujjain is famous for its street food — especially 'Poha-Jalebi' as a popular breakfast item. Prasad is also available at the temple premises. Many pure-veg restaurants are available across the city.",
    },
  },
  {
    keywords: ["darshan time", "mandir time", "khulne", "band hone", "timing"],
    reply: {
      hi: "महाकालेश्वर मंदिर सुबह 4 बजे भस्म आरती से खुलता है और रात तक दर्शन चलते हैं। बाकी मंदिरों का समय अलग-अलग है — सामान्य रूप से सुबह 5 बजे से रात 9 बजे तक ज़्यादातर मंदिर खुले रहते हैं।",
      en: "Mahakaleshwar Temple opens at 4 AM with the Bhasma Aarti and darshan continues until night. Other temples have different timings — generally most temples stay open from 5 AM to 9 PM.",
    },
  },
  {
    keywords: ["dress code", "kapde", "clothes", "kya pehne"],
    reply: {
      hi: "मंदिरों में दर्शन के लिए सादा और सम्मानजनक वस्त्र पहनना उचित होता है। कुछ मंदिरों में पुरुषों को धोती/कुर्ता पहनकर ही गर्भगृह में जाने की अनुमति होती है — वेबसाइट के अंदर विशिष्ट मंदिर की जानकारी देख सकते हैं।",
      en: "It's appropriate to wear simple, respectful clothing for temple darshan. In some temples, men are only allowed into the inner sanctum wearing a dhoti/kurta — you can check specific temple info within the website.",
    },
  },
  {
    keywords: ["mobile", "network", "wifi", "internet"],
    reply: {
      hi: "डिजिटल उज्जैन के तहत शहर में फ्री वाईफाई ज़ोन लगाए गए हैं, जो 'विकास' सेक्शन में बताए गए हैं। सिंहस्थ के दौरान नेटवर्क क्षमता और बढ़ाई जाएगी भीड़ संभालने के लिए।",
      en: "Under Digital Ujjain, free WiFi zones have been set up across the city, mentioned in the 'Development' section. Network capacity will be increased further during Simhastha to handle crowds.",
    },
  },
  {
    keywords: ["medical", "hospital", "ambulance", "ilaj", "davakhana"],
    reply: {
      hi: "सिंहस्थ के दौरान विशेष मेडिकल कैंप और एम्बुलेंस सेवा उपलब्ध रहेगी प्रमुख घाटों और मंदिरों के पास। आपातकाल के लिए स्थानीय प्रशासन की हेल्पलाइन से संपर्क करें।",
      en: "During Simhastha, special medical camps and ambulance services will be available near major ghats and temples. For emergencies, contact the local administration's helpline.",
    },
  },
  {
    keywords: ["kho gaya", "lost", "gum", "khoya", "milna"],
    reply: {
      hi: "अगर कोई सामान या व्यक्ति खो जाए, तो नज़दीकी पुलिस सहायता केंद्र या 'साथी बुक करें'/'स्टे बुकिंग' सेक्शन के रिपोर्ट बटन का उपयोग करें। सिंहस्थ के दौरान विशेष खोया-पाया केंद्र भी स्थापित किए जाएंगे।",
      en: "If something or someone gets lost, use the nearest police help desk or the Report button in the 'Book a Sathi'/'Stay Booking' section. Special lost-and-found centres will also be set up during Simhastha.",
    },
  },
  {
    keywords: ["language", "bhasha", "hindi english"],
    reply: {
      hi: "यह वेबसाइट हिंदी और अंग्रेज़ी दोनों में उपलब्ध है — नेवबार में ऊपर दिए गए 'EN/हिं' बटन से आप भाषा बदल सकते हैं।",
      en: "This website is available in both Hindi and English — you can switch language using the 'EN/हिं' button at the top of the navbar.",
    },
  },
  {
    keywords: ["free", "muft", "paisa lagega", "cost", "kharcha"],
    reply: {
      hi: "वेबसाइट देखना और मंदिर दर्शन में कोई शुल्क नहीं है, यह सबके लिए मुफ्त है। सिर्फ अगर आप धर्मशाला/होटल बुक करते हैं, तो उस ठहराव का निश्चित, सरकारी-सत्यापित शुल्क लगेगा — कोई छुपा या अतिरिक्त कमीशन नहीं।",
      en: "There's no fee for browsing the website or for temple darshan — it's free for everyone. Only if you book a dharamshala/hotel will there be a fixed, government-verified charge — no hidden fees or extra commission.",
    },
  },
  {
    keywords: ["akhada", "sadhu", "sant", "naga"],
    reply: {
      hi: "दत्त अखाड़ा और बाकी अखाड़े सिंहस्थ के दौरान साधु-संतों के ठहरने का प्रमुख शिविर होते हैं। नागा साधुओं की शाही स्नान यात्रा सिंहस्थ का सबसे महत्वपूर्ण और देखने लायक अवसर होता है।",
      en: "Dutt Akhada and other akhadas are the main camps where sadhus and saints stay during Simhastha. The royal bathing procession of the Naga sadhus is Simhastha's most important and spectacular event.",
    },
  },
  {
    keywords: ["chintaman", "ganesh", "hathi"],
    reply: {
      hi: "चिंतामण गणेश मंदिर क्षिप्रा नदी के किनारे स्थित एक प्राचीन स्वयंभू (खुद-प्रकट) गणेश मंदिर है, जो उज्जैन के प्रमुख दर्शन स्थलों में से एक है।",
      en: "Chintaman Ganesh Temple is an ancient self-manifested Ganesh temple on the banks of the Kshipra river, one of Ujjain's major darshan spots.",
    },
  },
  {
    keywords: ["gadkalika", "kalika", "devi"],
    reply: {
      hi: "गढ़कालिका मंदिर देवी कालिका को समर्पित है। माना जाता है कि महाकवि कालिदास ने यहीं देवी कालिका की आराधना करके अपनी काव्य-शक्ति प्राप्त की थी।",
      en: "Gadkalika Temple is dedicated to Goddess Kalika. It's believed that the great poet Kalidas obtained his poetic powers by worshipping Goddess Kalika here.",
    },
  },
  {
    keywords: ["bagalamukhi", "siddh peeth"],
    reply: {
      hi: "उज्जैन बगलामुखी मंदिर देवी बगलामुखी को समर्पित एक सिद्ध पीठ है, जो शहर के भक्तों में बहुत श्रद्धा का स्थान रखता है।",
      en: "Ujjain Bagalamukhi Temple is a siddh peeth dedicated to Goddess Bagalamukhi, holding great reverence among the city's devotees.",
    },
  },
  {
    keywords: ["mahakal mitra", "chatbot", "bot", "ai"],
    reply: {
      hi: "मैं महाकाल मित्र हूं — इस वेबसाइट का डिजिटल गाइड, जो आपको उज्जैन के मंदिर, घाट, इतिहास, सिंहस्थ योजना, बुकिंग, और मार्ग के बारे में तुरंत जानकारी देता हूं। कुछ भी पूछिए!",
      en: "I'm Mahakal Mitra — this website's digital guide, giving you instant information about Ujjain's temples, ghats, history, Simhastha planning, bookings, and routes. Ask me anything!",
    },
  },
  {
    keywords: ["badge", "gamification", "explorer", "unlock"],
    reply: {
      hi: "जैसे-जैसे आप इस वेबसाइट को स्क्रॉल करके एक्सप्लोर करते हैं, आपको अलग-अलग बैज (जैसे इतिहास प्रेमी, विकास अन्वेषक, घाट अन्वेषक) अनलॉक होते हैं — स्क्रीन के नीचे-बाएं कोने में दिखते हैं!",
      en: "As you scroll and explore this website, you unlock different badges (like History Buff, Development Explorer, Ghat Explorer) — they show up in the bottom-left corner of the screen!",
    },
  },
  {
    keywords: ["voice", "awaaz", "sunna", "narration"],
    reply: {
      hi: "वेबसाइट में एक 'वॉइस नैरेशन' बटन है (दाईं ओर, स्पीकर आइकन 🔊) जो आपको उज्जैन के बारे में एक छोटा ऑडियो सुनाता है। ट्राई कीजिए!",
      en: "There's a 'Voice Narration' button on the website (right side, speaker icon 🔊) that plays a short audio about Ujjain. Give it a try!",
    },
  },
  {
    keywords: ["achievement", "puraskar", "award", "samman"],
    reply: {
      hi: "उज्जैन को स्मार्ट सिटी अवार्ड, स्वच्छ सर्वेक्षण में अच्छा रैंक, हेरिटेज सिटी मान्यता, और सर्वश्रेष्ठ पर्यटन गंतव्य जैसे सम्मान मिले हैं। 'उज्जैन की उपलब्धियां' सेक्शन में पूरी जानकारी है।",
      en: "Ujjain has received honours like the Smart City Award, a good rank in Swachh Sarvekshan, Heritage City recognition, and Best Tourism Destination. Full details are in the 'Ujjain's Achievements' section.",
    },
  },
  {
    keywords: ["traffic", "jam", "bhid niyantran", "crowd management"],
    reply: {
      hi: "सिंहस्थ के दौरान ट्रैफिक और भीड़ नियंत्रण के लिए विशेष ज़ोन बनाए गए हैं — वाहनों को शहर के बाहर ही पार्किंग मिल जाएगी, और अंदर शटल सेवा चलेगी। 'सिंहस्थ प्लानिंग ज़ोन' में पूरा मार्ग देख सकते हैं ताकि जाम से बचा जा सके।",
      en: "Special zones have been set up for traffic and crowd control during Simhastha — vehicles will get parking outside the city, with shuttle services inside. You can check the full route in 'Simhastha Planning Zone' to avoid traffic jams.",
    },
  },
  {
    keywords: [
      "accommodation shortage",
      "hotel full",
      "kamra nahi mila",
      "jagah nahi",
    ],
    reply: {
      hi: "भीड़ ज़्यादा होने पर होटल/धर्मशाला जल्दी भर सकते हैं, इसलिए 'स्टे बुकिंग' सेक्शन से पहले से ही निश्चित-मूल्य, सत्यापित बुकिंग कर लेना बेहतर रहेगा। प्रशासन द्वारा टेंट सिटीज़ भी बनाई जाएंगी अतिरिक्त ठहराव के लिए।",
      en: "With heavy crowds, hotels/dharamshalas can fill up quickly, so it's best to book fixed-price, verified accommodation in advance through the 'Stay Booking' section. The administration will also set up tent cities for extra accommodation.",
    },
  },
  {
    keywords: ["garmi", "heat", "dhool", "dust", "mausam problem"],
    reply: {
      hi: "गर्मी और धूल से बचने के लिए टोपी/छाता, पानी की बोतल, और हल्का सूती कपड़ा साथ रखें। पीक दोपहर (12-3 बजे) में धूप से बचना बेहतर होता है। 'लाइव डैशबोर्ड' में वर्तमान मौसम देख सकते हैं।",
      en: "To avoid heat and dust, carry a cap/umbrella, a water bottle, and light cotton clothes. It's best to avoid the sun during peak afternoon hours (12-3 PM). You can check current weather in the 'Live Dashboard'.",
    },
  },
  {
    keywords: ["paani", "drinking water", "khana hygiene", "food safety"],
    reply: {
      hi: "सिंहस्थ के दौरान जगह-जगह ड्रिंकिंग वाटर स्टॉल लगाए जाते हैं — सिर्फ इन्हीं सत्यापित स्टॉल का पानी पिएं। खाने के लिए भी अधिकृत/प्रशासन-सत्यापित स्टॉल ही उपयोग करें, सड़क किनारे के खुले खाने से बचना बेहतर है।",
      en: "Drinking water stalls are set up in many places during Simhastha — only drink water from these verified stalls. For food too, use authorized/administration-verified stalls, avoiding open roadside food.",
    },
  },
  {
    keywords: ["washroom", "toilet", "sanitation", "shauchalay"],
    reply: {
      hi: "प्रशासन द्वारा घाटों और मंदिरों के आस-पास अस्थायी शौचालय और सैनिटेशन यूनिट लगाए जाते हैं, जो सिंहस्थ के दौरान लगातार साफ किए जाते हैं।",
      en: "The administration sets up temporary toilets and sanitation units around the ghats and temples, which are continuously cleaned during Simhastha.",
    },
  },
  {
    keywords: ["network congestion", "internet slow", "call nahi lag raha"],
    reply: {
      hi: "भीड़ ज़्यादा होने से मोबाइल नेटवर्क कभी-कभी धीमा हो सकता है। सिंहस्थ के लिए टेलीकॉम कंपनियों द्वारा अस्थायी टावर और अतिरिक्त क्षमता लगाई जाती है। आपातकाल के लिए हेल्पलाइन नंबर अलग से उपलब्ध रहेंगे जो हर नेटवर्क पर काम करें।",
      en: "With heavy crowds, mobile networks can sometimes get slow. Telecom companies set up temporary towers and extra capacity for Simhastha. Emergency helpline numbers will be separately available and work across all networks.",
    },
  },
  {
    keywords: ["pickpocket", "chori", "safety concern", "jeb katna"],
    reply: {
      hi: "भीड़ में अपना सामान (मोबाइल, पर्स) संभाल कर रखें, खास कर घाटों और भरे मंदिरों में। पुलिस हेल्प डेस्क जगह-जगह होंगे — कोई भी समस्या हो तो तुरंत संपर्क करें।",
      en: "Keep your belongings (phone, wallet) secure in crowds, especially at ghats and busy temples. Police help desks will be set up everywhere — contact them immediately if you face any problem.",
    },
  },
  {
    keywords: ["vedh shala", "jantar mantar", "observatory"],
    reply: {
      hi: "वेध शाला (जंतर मंतर) उज्जैन राजा सवाई जय सिंह द्वारा बनवाया गया खगोल-विज्ञान वेधशाला है — यहां से सूर्य और ग्रहों की गति का अध्ययन होता था। यह उज्जैन के 'ज़ीरो लॉन्गिट्यूड' से संबंध को दर्शाता है।",
      en: "The Vedh Shala (Jantar Mantar) in Ujjain is an astronomical observatory built by King Sawai Jai Singh — used to study the movement of the sun and planets. It reflects Ujjain's connection to the 'zero longitude'.",
    },
  },
  {
    keywords: ["shipra kinara", "river bank", "nadi kinare"],
    reply: {
      hi: "क्षिप्रा नदी के किनारे कई घाट और मंदिर हैं — राम घाट, काल भैरव घाट, और भर्तृहरि गुफा जैसे स्थल। यह नदी सिंहस्थ स्नान का सबसे पवित्र केंद्र है।",
      en: "There are many ghats and temples along the Shipra river — sites like Ram Ghat, Kal Bhairav Ghat, and Bhartrihari Cave. This river is the most sacred centre for Simhastha bathing.",
    },
  },
  {
    keywords: ["stampede", "bhagdad", "kuchalna", "bhid ka khatra"],
    reply: {
      hi: "भीड़-प्रबंधन के लिए घाटों पर एंट्री-एग्ज़िट अलग रखे जाते हैं और क्राउड-कंट्रोल बैरियर लगाए जाते हैं। प्रशासन के निर्देशों का पालन करें और जल्दबाज़ी न करें, खास कर शाही स्नान के दिन।",
      en: "For crowd management, separate entry-exit points are maintained at ghats and crowd-control barriers are installed. Follow administration guidelines and don't rush, especially on royal bathing days.",
    },
  },
  {
    keywords: ["health risk", "beemari", "infection", "sankraman"],
    reply: {
      hi: "ज़्यादा भीड़ में स्वास्थ्य संबंधी सावधानी ज़रूरी है — साफ पानी पिएं, हाथ बार-बार धोएं, और अगर तबीयत खराब लगे तो तुरंत मेडिकल कैंप में संपर्क करें।",
      en: "In heavy crowds, health precautions are important — drink clean water, wash hands frequently, and contact a medical camp immediately if you feel unwell.",
    },
  },
  {
    keywords: ["heat stroke", "loo", "dehydration", "chakkar"],
    reply: {
      hi: "गर्मी में लू से बचने के लिए ज़्यादा से ज़्यादा पानी पिएं, धूप में ज़्यादा देर न रहें, और अगर चक्कर/थकान महसूस हो तो तुरंत छाया में आकर आराम करें और मेडिकल कैंप जाएं।",
      en: "To avoid heat stroke, drink plenty of water, avoid staying in the sun for long, and if you feel dizzy/exhausted, move to shade immediately, rest, and visit a medical camp.",
    },
  },
  {
    keywords: ["fake guide", "nakli guide", "donation fraud", "chanda fraud"],
    reply: {
      hi: "किसी भी अजनबी गाइड या 'चंदा' मांगने वाले व्यक्ति पर भरोसा न करें — हमारी वेबसाइट के अंदर ही सत्यापित गाइड (महाकाल मित्र, साथी बुक करें) उपलब्ध हैं। किसी भी संदेह में रिपोर्ट बटन उपयोग करें।",
      en: "Don't trust strangers claiming to be guides or asking for 'donations' — verified guides (Mahakal Mitra, Book a Sathi) are available right within our website. Use the Report button whenever in doubt.",
    },
  },
  {
    keywords: ["bachhe kho gaye", "lost child", "khoya paya", "lost and found"],
    reply: {
      hi: "सिंहस्थ के दौरान विशेष 'खोया-पाया केंद्र' स्थापित किए जाते हैं जहां बच्चे या सामान खो जाने पर रिपोर्ट कर सकते हैं। बच्चों की जेब में नाम-मोबाइल नंबर वाली पर्ची रखना एक अच्छा उपाय है।",
      en: "Special 'Lost and Found Centres' are set up during Simhastha where you can report a lost child or belongings. Keeping a note with the child's name and a mobile number in their pocket is a good precaution.",
    },
  },
  {
    keywords: ["medical camp", "emergency service", "aapatkal"],
    reply: {
      hi: "प्रमुख घाटों और मंदिरों के पास मेडिकल कैंप और आपातकालीन एम्बुलेंस सेवा 24 घंटे उपलब्ध रहेगी सिंहस्थ के दौरान।",
      en: "Medical camps and emergency ambulance services will be available 24 hours near major ghats and temples during Simhastha.",
    },
  },
  {
    keywords: ["shuttle", "special train", "vishesh train"],
    reply: {
      hi: "सिंहस्थ के दौरान भीड़ संभालने के लिए शटल बसें और विशेष ट्रेनें चलाई जाती हैं, जो बड़े पार्किंग/स्टेशन से घाटों तक कनेक्टिविटी देंगी।",
      en: "During Simhastha, shuttle buses and special trains run to manage crowds, connecting major parking areas/stations to the ghats.",
    },
  },
  {
    keywords: ["temporary toilet", "asthaayi shauchalay"],
    reply: {
      hi: "प्रशासन द्वारा जगह-जगह अस्थायी शौचालय बनाए जाते हैं जो नियमित साफ किए जाते हैं, ताकि विज़िटर्स को कोई दिक्कत न हो।",
      en: "The administration sets up temporary toilets in many places, which are regularly cleaned so visitors don't face any issues.",
    },
  },
  {
    keywords: ["water stall", "paani stall", "pyaau"],
    reply: {
      hi: "घाटों और मुख्य रास्तों पर ड्रिंकिंग वाटर स्टॉल (प्याऊ) लगाए जाते हैं — फ्री और सत्यापित पानी के लिए इन्हीं का उपयोग करें।",
      en: "Drinking water stalls are set up on ghats and main roads — use these for free, verified water.",
    },
  },
  {
    keywords: ["police help desk", "help desk", "sahayta kendra"],
    reply: {
      hi: "प्रमुख स्थलों पर पुलिस हेल्प डेस्क स्थापित किए जाते हैं जहां कोई भी समस्या, शिकायत, या जानकारी के लिए संपर्क किया जा सकता है।",
      en: "Police Help Desks are set up at major locations, where you can reach out for any problem, complaint, or information.",
    },
  },
  {
    keywords: ["helpline", "helpline number", "emergency number", "mobile app"],
    reply: {
      hi: "सिंहस्थ के लिए विशेष हेल्पलाइन नंबर और मोबाइल ऐप जारी किए जाते हैं जिससे रीयल-टाइम जानकारी, आपातकालीन सहायता, और भीड़-अपडेट मिलते हैं।",
      en: "Special helpline numbers and a mobile app are released for Simhastha, providing real-time information, emergency assistance, and crowd updates.",
    },
  },
  {
    keywords: ["tent city", "tambu", "temporary accommodation"],
    reply: {
      hi: "भीड़ ज़्यादा होने पर प्रशासन द्वारा टेंट सिटीज़ बनाई जाती हैं — यह अस्थायी लेकिन सुरक्षित ठहरने की व्यवस्था होती है, खास कर शाही स्नान के दिनों में।",
      en: "When crowds are heavy, the administration sets up tent cities — temporary but safe accommodation, especially on royal bathing days.",
    },
  },
];

const placeDistances = {
  mahakaleshwar: { lat: 23.1828, lng: 75.7683 },
  mahakal: { lat: 23.1828, lng: 75.7683 },
  "mahakal lok": { lat: 23.1834, lng: 75.7679 },
  corridor: { lat: 23.1834, lng: 75.7679 },
  harsiddhi: { lat: 23.1839, lng: 75.7681 },
  "ram ghat": { lat: 23.1852, lng: 75.7691 },
  "dutt akhada": { lat: 23.187, lng: 75.77 },
  chintaman: { lat: 23.1697, lng: 75.7507 },
  "shani mandir": { lat: 23.181, lng: 75.781 },
  bhartrihari: { lat: 23.197, lng: 75.774 },
  rinmukteshwar: { lat: 23.1975, lng: 75.7745 },
  gadkalika: { lat: 23.1965, lng: 75.7735 },
  "kal bhairav": { lat: 23.2182, lng: 75.7686 },
  "kal bhairav ghat": { lat: 23.217, lng: 75.7695 },
  mangalnath: { lat: 23.2076, lng: 75.7906 },
  sandipani: { lat: 23.1745, lng: 75.792 },
  bagalamukhi: { lat: 23.166, lng: 75.7615 },
  iskcon: { lat: 23.159, lng: 75.754 },
  nanakheda: { lat: 23.1645, lng: 75.7845 },
  "dewas gate": { lat: 23.1795, lng: 75.7855 },
  "railway station": { lat: 23.1765, lng: 75.7887 },
  junction: { lat: 23.1765, lng: 75.7887 },
};

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}

function normalizeForMatch(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function checkDistanceQuery(inputText, lang) {
  const distanceWords = [
    "dur",
    "door",
    "distance",
    "kitni",
    "km",
    "kilometer",
    "kitna",
    "paas",
    "duri",
  ];
  const lower = inputText.toLowerCase();
  const hasDistanceWord = distanceWords.some((w) => lower.includes(w));
  if (!hasDistanceWord) return null;

  const normalizedQuery = normalizeForMatch(inputText);

  const foundPlaces = Object.keys(placeDistances).filter((place) => {
    const normalizedPlace = normalizeForMatch(place);
    return normalizedQuery.includes(normalizedPlace);
  });

  const uniqueFound = foundPlaces.filter(
    (place, index) =>
      !foundPlaces.some(
        (other, otherIndex) =>
          otherIndex !== index &&
          normalizeForMatch(other).includes(normalizeForMatch(place)) &&
          normalizeForMatch(other).length > normalizeForMatch(place).length,
      ),
  );

  const finalPlaces = [...new Set(uniqueFound)];

  if (finalPlaces.length >= 2) {
    const p1 = finalPlaces[0];
    const p2 = finalPlaces[1];
    const d1 = placeDistances[p1];
    const d2 = placeDistances[p2];
    const dist = calculateDistance(d1.lat, d1.lng, d2.lat, d2.lng);
    const p1Cap = p1.charAt(0).toUpperCase() + p1.slice(1);
    const p2Cap = p2.charAt(0).toUpperCase() + p2.slice(1);
    return lang !== "en"
      ? `${p1Cap} se ${p2Cap} tak ki doori lagbhag ${dist} km hai. Exact route ke liye 'Simhastha Planning Zone' section mein us jagah pe click karke 'Route Dekhein' button use karein.`
      : `The distance from ${p1Cap} to ${p2Cap} is about ${dist} km. For the exact route, click on that place in the 'Simhastha Planning Zone' section and use the 'View Route' button.`;
  }

  if (finalPlaces.length === 1) {
    const p1 = finalPlaces[0];
    const d1 = placeDistances[p1];
    const dMahakal = calculateDistance(d1.lat, d1.lng, 23.1828, 75.7683);
    if (p1 === "mahakaleshwar" || p1 === "mahakal") {
      return lang !== "en"
        ? "Aap Mahakaleshwar Mandir ke baare mein pooch rahe hain — kis jagah se doori jaanni hai? Jaise 'Mahakal se Ram Ghat kitni door hai' is tarah poochiye."
        : "You're asking about Mahakaleshwar Temple — which place's distance would you like to know? Try asking like 'How far is Ram Ghat from Mahakal'.";
    }
    const p1Cap = p1.charAt(0).toUpperCase() + p1.slice(1);
    return lang !== "en"
      ? `${p1Cap}, Mahakaleshwar Mandir se lagbhag ${dMahakal} km door hai. 'Simhastha Planning Zone' section mein exact route dekh sakte hain.`
      : `${p1Cap} is about ${dMahakal} km from Mahakaleshwar Temple. You can see the exact route in the 'Simhastha Planning Zone' section.`;
  }

  return null;
}

const defaultRepliesData = {
  hi: [
    "यह विशेष जानकारी अभी मेरे पास नहीं है, लेकिन आप 'सिंहस्थ प्लानिंग ज़ोन' सेक्शन में 19 जगहों की पूरी सूची देख सकते हैं, या 'विकास' सेक्शन में विकास विवरण। कुछ और पूछना चाहेंगे?",
    "मुझे यह समझ नहीं आया, लेकिन मैं आपको वेबसाइट के सेक्शन एक्सप्लोर करने का सुझाव दूंगा — मंदिर, घाट, बुकिंग, या मार्ग के बारे में पूछ के देखिए।",
    "इसके बारे में मुझे सटीक जानकारी नहीं है, लेकिन आप महाकालेश्वर, सिंहस्थ, घाट, बुकिंग, या मार्ग से जुड़ा कुछ भी पूछ सकते हैं, मैं ज़रूर मदद करूंगा।",
  ],
  en: [
    "I don't have that specific information right now, but you can see the full list of 19 places in the 'Simhastha Planning Zone' section, or development details in the 'Development' section. Anything else you'd like to know?",
    "I didn't quite understand that, but I'd suggest exploring the website's sections — try asking about Temples, Ghats, Booking, or Routes.",
    "I don't have exact information on this, but you can ask me anything about Mahakaleshwar, Simhastha, ghats, booking, or routes — I'll be happy to help.",
  ],
  hinglish: [
    "Ye specific jaankari abhi mere paas nahi hai, lekin aap 'Simhastha Planning Zone' section mein 19 jagahon ki poori list dekh sakte hain, ya 'Vikas' section mein development details. Kuch aur poochna chahenge?",
    "Mujhe ye samajh nahi aaya, lekin main aapko website ke sections explore karne ka sujhaav dunga — Mandir, Ghat, Booking, ya Route ke baare mein poochh ke dekhiye.",
    "Iske baare mein mujhe exact jaankari nahi hai, lekin aap Mahakaleshwar, Simhastha, ghat, booking, ya route se juda kuch bhi pooch sakte hain, main zaroor madad karunga.",
  ],
};

const text = {
  hi: {
    greeting:
      "नमस्ते! मैं महाकाल मित्र हूं 🙏 मंदिर, घाट, सिंहस्थ, बुकिंग, या मार्ग — कुछ भी पूछिए।",
    header: "महाकाल मित्र — डिजिटल गाइड",
    placeholder: "कुछ पूछिए...",
  },
  en: {
    greeting:
      "Hello! I'm Mahakal Mitra 🙏 Ask me anything — temples, ghats, Simhastha, booking, or routes.",
    header: "Mahakal Mitra — Digital Guide",
    placeholder: "Ask something...",
  },
  hinglish: {
    greeting:
      "Namaste! Main Mahakal Mitra hoon 🙏 Mandir, ghat, Simhastha, booking, ya route — kuch bhi poochiye.",
    header: "Mahakal Mitra — Digital Guide",
    placeholder: "Kuch poochiye...",
  },
};

export default function MahakalMitra() {
  const { lang } = useLanguage();
  const t = text[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: text.hi.greeting },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const normalize = (str) =>
    str
      .toLowerCase()
      .replace(/[?.,!]/g, "")
      .trim();

  const getBotReply = (userText) => {
    const distanceReply = checkDistanceQuery(userText, lang);
    if (distanceReply) return distanceReply;

    const lower = normalize(userText);
    const words = lower.split(/\s+/);

    let bestMatch = null;
    let bestScore = 0;

    knowledgeBase.forEach((entry) => {
      let score = 0;
      entry.keywords.forEach((keyword) => {
        const kw = keyword.toLowerCase();
        if (lower.includes(kw)) {
          score += kw.split(" ").length * 2;
        }
        words.forEach((word) => {
          if (word.length > 3 && (kw.includes(word) || word.includes(kw))) {
            score += 1;
          }
        });
      });
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    });

    if (bestMatch && bestScore > 0) {
      return bestMatch.reply[lang] || bestMatch.reply.hi;
    }

    const defaults = defaultRepliesData[lang];
    return defaults[Math.floor(Math.random() * defaults.length)];
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: getBotReply(input) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 left-4 md:bottom-6 md:right-6 z-40 w-14 h-14 md:w-16 md:h-16 rounded-full bg-ujjain-gold text-ujjain-dark text-2xl shadow-lg flex items-center justify-center hover:scale-110 transition"
      >
        {isOpen ? "✕" : "🙏"}
      </button>

      {isOpen && (
        <div className="fixed bottom-40 left-4 md:bottom-24 md:right-6 z-40 w-[calc(100vw-2rem)] max-w-80 md:w-96 h-[450px] bg-ujjain-dark border border-ujjain-gold/40 rounded-xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-ujjain-gold text-ujjain-dark px-4 py-3 font-bold">
            {t.header}
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                  msg.from === "bot"
                    ? "bg-white/10 text-ujjain-cream self-start"
                    : "bg-ujjain-saffron text-ujjain-dark self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSend}
            className="flex border-t border-ujjain-gold/20"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              className="flex-1 bg-transparent px-4 py-3 text-ujjain-cream text-sm focus:outline-none"
            />
            <button type="submit" className="px-4 text-ujjain-gold font-bold">
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
