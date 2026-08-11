"use client";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

const knowledgeBase = [
  {
    keywords: ["mahakal", "mahakaleshwar", "temple", "mandir", "jyotirling", "jyotirlinga", "bhasma", "aarti"],
    reply: {
      hi: "Mahakaleshwar Mandir Ujjain ka sabse pramukh Jyotirlinga hai — 12 Jyotirlingon mein se ek, aur yahi ekmatra Dakshinmukhi Jyotirlinga hai. Bhasma Aarti roz subah 4 baje hoti hai, jiske liye advance booking zaroori hai. Mandir Kshipra nadi ke kinare sthit hai.",
      en: "Mahakaleshwar Temple is Ujjain's most important Jyotirlinga — one of the 12 Jyotirlingas, and the only south-facing (Dakshinmukhi) one. The Bhasma Aarti happens every day at 4 AM, and advance booking is required. The temple sits on the banks of the Kshipra river.",
    },
  },
  {
    keywords: ["simhastha", "kumbh", "kab", "date", "tarikh", "2028", "shuru"],
    reply: {
      hi: "Simhastha 2028, April mahine mein shuru hoga (exact tithi jyotish ganna ke hisaab se decide hoti hai). Ye ek Maha Kumbh hai jo Ujjain mein har 12 saal mein hota hai, jab Guru graha Simha rashi mein pravesh karta hai. Crore shraddhalu Kshipra nadi mein snan karne aayenge.",
      en: "Simhastha 2028 will begin in April (the exact date is decided based on astrological calculations). It's a Maha Kumbh that happens in Ujjain every 12 years, when Jupiter enters the sign of Leo. Crores of devotees will come to bathe in the Kshipra river.",
    },
  },
  {
    keywords: ["snan", "ghat", "kshipra", "nadi", "nahana", "dubki"],
    reply: {
      hi: "Simhastha ke pramukh snan ghat hain: Ram Ghat (sabse mukhya), Kal Bhairav Ghat, aur Dutt Akhada ke paas ke ghat. Kshipra nadi ka jal Simhastha ke dauraan sabse zyada pavitra mana jata hai. Ram Ghat par vishesh snan tithiyon par sabse zyada bhid hoti hai.",
      en: "The main bathing ghats for Simhastha are: Ram Ghat (the primary one), Kal Bhairav Ghat, and the ghats near Dutt Akhada. The Kshipra river's water is considered most sacred during Simhastha. Ram Ghat sees the heaviest crowds on special bathing dates.",
    },
  },
  {
    keywords: ["parking", "gaadi", "vehicle", "car", "bike", "kaha rakhu"],
    reply: {
      hi: "Simhastha ke dauraan mukhya vehicle parking Nanakheda Bus Stand ke paas hoga. Yahan se shuttle service ya paidal mandir tak pahuncha ja sakta hai. Private vehicles ko shehar ke andar le jaane ki anumati seemit hogi bhid niyantran ke liye.",
      en: "The main vehicle parking during Simhastha will be near Nanakheda Bus Stand. From there, you can reach the temple by shuttle service or on foot. Private vehicles will have limited access inside the city for crowd control.",
    },
  },
  {
    keywords: ["route", "kaise pahuche", "kaise jaye", "raasta", "direction", "kaha se"],
    reply: {
      hi: "Website ke 'Simhastha Planning Zone' section mein 19 mahatvapurn jagahon ki list hai — kisi bhi naam pe click karke 'Route Dekhein' button se seedha Google Maps mein directions mil jayenge, aapki current location se. Wahan pehle/agle darshan sthal bhi dikh jayenge.",
      en: "The 'Simhastha Planning Zone' section on the website has a list of 19 important places — click on any name and use the 'View Route' button to get directions straight to Google Maps from your current location. You'll also see the previous/next darshan spots there.",
    },
  },
  {
    keywords: ["hotel", "rukna", "thehrna", "booking", "stay", "dharamshala", "room"],
    reply: {
      hi: "Verified, fixed-price accommodation ke liye 'Stay Booking' section use karo — wahan government-verified dharamshala aur guest house milenge, bina kisi extra commission ke. Booking karte hi ek QR code receipt milega jisme amount locked rahega.",
      en: "For verified, fixed-price accommodation, use the 'Stay Booking' section — you'll find government-verified dharamshalas and guest houses there, with zero extra commission. Once you book, you'll get a QR code receipt with the amount locked.",
    },
  },
  {
    keywords: ["fraud", "cheat", "extra paisa", "dhoka", "complaint", "shikayat"],
    reply: {
      hi: "Agar koi extra paisa maange ya cheat kare, toh 'Stay Booking' ya 'Book a Sathi' section mein booking receipt ke neeche 'Report Karein' button hai — us se seedha administration tak complaint pahunch jayegi. Hamari saari accommodation fixed-price aur verified hai.",
      en: "If anyone asks for extra money or tries to cheat you, there's a 'Report It' button below the booking receipt in the 'Stay Booking' or 'Book a Sathi' section — this sends your complaint straight to the administration. All our accommodation is fixed-price and verified.",
    },
  },
  {
    keywords: ["harsiddhi", "shakti peeth"],
    reply: {
      hi: "Harsiddhi Mandir 51 Shakti Peethon mein se ek hai, Mahakal Mandir se sirf 5 minute paidal ki doori par. Yahan Devi Annapurna, Mahalakshmi, aur Mahasaraswati ki bhi murtiyan hain.",
      en: "Harsiddhi Temple is one of the 51 Shakti Peeths, just a 5-minute walk from Mahakal Temple. It also has idols of Goddess Annapurna, Mahalakshmi, and Mahasaraswati.",
    },
  },
  {
    keywords: ["kal bhairav", "bhairav", "sharab", "tantrik"],
    reply: {
      hi: "Kal Bhairav Mandir Ujjain ke rakshak devta ko samarpit hai, Ashta Bhairavon mein se pramukh. Yahan pramukh bhog roop mein sharab chadhai jaati hai — ye ek tantrik parampara wala mandir hai.",
      en: "Kal Bhairav Temple is dedicated to Ujjain's guardian deity, the chief among the eight Bhairavs. Liquor is offered here as a primary offering — it's a temple following tantric tradition.",
    },
  },
  {
    keywords: ["mangalnath", "mangal", "grah"],
    reply: {
      hi: "Mangalnath Mandir ko Mangal grah ki janmasthali mana jata hai, Kshipra nadi ke kinare sthit. Ye Mangal Dosh nivaran pooja ke liye bahut prasiddh hai.",
      en: "Mangalnath Temple is believed to be the birthplace of the planet Mars, located on the banks of the Kshipra. It's very famous for Mangal Dosh remedy rituals.",
    },
  },
  {
    keywords: ["bhartrihari", "gufa", "cave"],
    reply: {
      hi: "Bhartrihari Gufa Raja Bhartrihari (Vikramaditya ke bhai) ki tapasya sthali hai, Shipra nadi ke kinare, 10vi sadi purani. Gadkalika Mandir ke paas sthit hai.",
      en: "Bhartrihari Cave is where King Bhartrihari (Vikramaditya's brother) performed penance — a 10th-century cave on the Shipra riverbank, near Gadkalika Temple.",
    },
  },
  {
    keywords: ["sandipani", "krishna", "sudama", "ashram"],
    reply: {
      hi: "Sandipani Ashram wo sthan hai jaha Bhagwan Krishna aur Sudama ne Guru Sandipani se shiksha li thi. Ye Ujjain ka ek mahatvapurn aitihasik sthal hai.",
      en: "Sandipani Ashram is the place where Lord Krishna and Sudama received their education from Guru Sandipani. It's an important historical site in Ujjain.",
    },
  },
  {
    keywords: ["iskcon", "krishna balram"],
    reply: {
      hi: "ISKCON Mandir (Krishna Balram Mandir) apni bhavya vastukala aur sanjh aarti ke liye prasiddh hai — Ujjain ke pramukh darshan sthalon mein se ek.",
      en: "ISKCON Temple (Krishna Balram Temple) is famous for its magnificent architecture and evening aarti — one of Ujjain's major darshan spots.",
    },
  },
  {
    keywords: ["mahakal lok", "corridor", "lok"],
    reply: {
      hi: "Mahakal Lok ek 900 meter lamba shobhaymay corridor hai, jisme 100 se zyada Shiv katha ki murtiyan hain. Ye Mahakaleshwar Mandir ka hi vistarit hissa hai aur bahut sundar roshni se sajaya gaya hai.",
      en: "Mahakal Lok is a magnificent 900-meter corridor with over 100 sculptures depicting the Shiv Katha. It's an expanded part of the Mahakaleshwar Temple, beautifully lit up.",
    },
  },
  {
    keywords: ["vikas", "development", "smart city", "achievement"],
    reply: {
      hi: "Ujjain ne pichle 2 saalon mein bahut vikas kiya hai — 45 KM roads improve hui hain, Mahakal Lok ka vistar hua, 200+ CCTV cameras lage, aur 12 ghats ka renovation hua. Poori details 'Vikas' section mein hain.",
      en: "Ujjain has developed a lot over the past 2 years — 45 KM of roads improved, Mahakal Lok expanded, 200+ CCTV cameras installed, and 12 ghats renovated. Full details are in the 'Development' section.",
    },
  },
  {
    keywords: ["crowd", "bhid", "safety", "suraksha", "surakshit"],
    reply: {
      hi: "Simhastha ke dauraan crowd-management ke liye vishesh zones banaye gaye hain — 'Simhastha Planning Zone' section mein map aur details dekh sakte ho. CCTV surveillance aur helpline bhi available rahegi.",
      en: "Special zones have been created for crowd management during Simhastha — you can see the map and details in the 'Simhastha Planning Zone' section. CCTV surveillance and helplines will also be available.",
    },
  },
  {
    keywords: ["weather", "mausam", "temperature", "garmi", "thand"],
    reply: {
      hi: "Ujjain ka live weather 'Live Yatri Sahayta Dashboard' section mein dikh raha hai — real-time temperature aur humidity ke saath.",
      en: "Ujjain's live weather is shown in the 'Live Visitor Assistance Dashboard' section — with real-time temperature and humidity.",
    },
  },
  {
    keywords: ["namaste", "hello", "hi", "hey"],
    reply: {
      hi: "Namaste! Main Mahakal Mitra hoon, aapka digital Ujjain aur Simhastha guide. Aap mujhse mandir, ghat, route, booking, ya Simhastha se juda kuch bhi pooch sakte hain.",
      en: "Hello! I'm Mahakal Mitra, your digital Ujjain and Simhastha guide. Ask me anything about temples, ghats, routes, bookings, or Simhastha.",
    },
  },
  {
    keywords: ["dhanyavaad", "thanks", "thank you", "shukriya"],
    reply: {
      hi: "Aapka swagat hai! Jai Shree Mahakal 🙏 Aur kuch jaanna ho toh bataiye.",
      en: "You're welcome! Jai Shree Mahakal 🙏 Let me know if you'd like to know anything else.",
    },
  },
  {
    keywords: ["kaun", "kya ho tum", "tumhara naam", "who are you"],
    reply: {
      hi: "Main Mahakal Mitra hoon — Digital Ujjain website ka AI guide. Main aapko Ujjain ke mandir, ghat, Simhastha planning, booking, aur route ke baare mein poori jaankari de sakta hoon.",
      en: "I'm Mahakal Mitra — the AI guide for the Digital Ujjain website. I can give you complete information about Ujjain's temples, ghats, Simhastha planning, bookings, and routes.",
    },
  },
  {
    keywords: ["ujjain itihaas", "history", "purana naam", "avantika", "prachin"],
    reply: {
      hi: "Ujjain ka prachin naam 'Avantika' tha. Ye Bharat ki saptapuri (7 pavitra nagariyon) mein se ek hai. Mahabharat kaal mein ye Avanti Rajya ki rajdhani thi, aur Raja Vikramaditya ka darbar yahi laga karta tha.",
      en: "Ujjain's ancient name was 'Avantika'. It's one of India's Saptapuri (7 sacred cities). During the Mahabharata era it was the capital of the Avanti kingdom, and King Vikramaditya's court was held here.",
    },
  },
  {
    keywords: ["vikramaditya", "raja", "king", "samrat"],
    reply: {
      hi: "Samrat Vikramaditya Ujjain (Avantika) ke prasiddh raja the, jinke naam se Vikram Samvat kaal-ganna shuru hui. Unke darbar mein 'Navratna' (9 vidwan) rehte the, jisme Kalidas bhi shaamil the.",
      en: "Emperor Vikramaditya was the famous king of Ujjain (Avantika), after whom the Vikram Samvat calendar was named. His court had the 'Navratna' (9 scholars), which included Kalidas.",
    },
  },
  {
    keywords: ["kalidas", "kavi", "poet", "meghdoot"],
    reply: {
      hi: "Mahakavi Kalidas Ujjain se gehra sambandh rakhte the aur unhone Meghdoot jaisi prasiddh rachnaein likhi, jisme Ujjain ka sundar varnan hai. Kalidas Academy Ujjain mein sthit hai, jaha unki smriti mein karyakram hote hain.",
      en: "The great poet Kalidas had a deep connection with Ujjain and wrote famous works like Meghdoot, which beautifully describes the city. Kalidas Academy is located in Ujjain, where events are held in his memory.",
    },
  },
  {
    keywords: ["saptapuri", "7 nagari", "pavitra shehar"],
    reply: {
      hi: "Ujjain Bharat ki 7 saptapuriyon mein se ek hai — baaki hain Ayodhya, Mathura, Haridwar, Kashi, Kanchi, aur Dwarka. Ye saatho nagariyan Hinduon ke liye sabse pavitra maani jaati hain.",
      en: "Ujjain is one of India's 7 Saptapuri cities — the others being Ayodhya, Mathura, Haridwar, Kashi, Kanchi, and Dwarka. All seven cities are considered the most sacred for Hindus.",
    },
  },
  {
    keywords: ["tropic of cancer", "karkat rekha", "0 degree", "zero longitude"],
    reply: {
      hi: "Ujjain ko prachin kaal mein 'prithvi ki nabhi' (navel of earth) kaha jata tha, kyunki Surya Siddhant ke anusar ye Karkat Rekha (Tropic of Cancer) aur zero-longitude meridian ke kaatne wale bindu ke paas sthit hai.",
      en: "In ancient times, Ujjain was called the 'navel of the earth', because according to the Surya Siddhanta, it lies near the point where the Tropic of Cancer and the zero-longitude meridian intersect.",
    },
  },
  {
    keywords: ["train", "railway", "station", "junction"],
    reply: {
      hi: "Ujjain Junction shehar ka mukhya railway station hai (code: UJN), Western Railway zone ke antargat. Ye Indore, Bhopal, aur baaki bade shehron se achhi tarah connected hai. 'Simhastha Planning Zone' mein iska route bhi mil jayega.",
      en: "Ujjain Junction (code: UJN) is the city's main railway station, under the Western Railway zone. It's well-connected to Indore, Bhopal, and other major cities. You'll also find its route in the 'Simhastha Planning Zone' section.",
    },
  },
  {
    keywords: ["bus", "bus stand", "nanakheda", "dewas gate"],
    reply: {
      hi: "Ujjain mein do mukhya bus stand hain — Nanakheda Bus Stand (Simhastha ke dauraan mukhya parking bhi yahi hoga) aur Dewas Gate Bus Stand (shehar ke andar aane-jaane ke liye).",
      en: "Ujjain has two main bus stands — Nanakheda Bus Stand (which will also be the main parking during Simhastha) and Dewas Gate Bus Stand (for travel within the city).",
    },
  },
  {
    keywords: ["airport", "hawai adda", "flight", "plane"],
    reply: {
      hi: "Ujjain ka sabse nazdeeki airport Devi Ahilyabai Holkar Airport, Indore hai — jo Ujjain se lagbhag 55 km door hai.",
      en: "Ujjain's nearest airport is Devi Ahilyabai Holkar Airport, Indore — about 55 km from Ujjain.",
    },
  },
  {
    keywords: ["indore", "kitni door", "distance"],
    reply: {
      hi: "Ujjain, Indore se lagbhag 55 kilometer door hai, aur dono shehar road se achhi tarah connected hain (lagbhag 1-1.5 ghante ka safar).",
      en: "Ujjain is about 55 kilometers from Indore, and both cities are well-connected by road (about a 1-1.5 hour journey).",
    },
  },
  {
    keywords: ["khana", "food", "bhojan", "restaurant", "prasad"],
    reply: {
      hi: "Ujjain apne street food ke liye prasiddh hai — khaas taur par 'Poha-Jalebi' subah ke nashte mein bahut popular hai. Mandir parisar mein prasad bhi milta hai. Bahut se satvik bhojanalaya (pure-veg restaurants) bhi shehar mein available hain.",
      en: "Ujjain is famous for its street food — especially 'Poha-Jalebi' as a popular breakfast item. Prasad is also available at the temple premises. Many pure-veg restaurants are available across the city.",
    },
  },
  {
    keywords: ["darshan time", "mandir time", "khulne", "band hone", "timing"],
    reply: {
      hi: "Mahakaleshwar Mandir subah 4 baje Bhasma Aarti se khulta hai aur raat tak darshan chalte hain. Baaki mandiron ka time alag-alag hai — general roop se subah 5 baje se raat 9 baje tak zyada mandir khule rehte hain.",
      en: "Mahakaleshwar Temple opens at 4 AM with the Bhasma Aarti and darshan continues until night. Other temples have different timings — generally most temples stay open from 5 AM to 9 PM.",
    },
  },
  {
    keywords: ["dress code", "kapde", "clothes", "kya pehne"],
    reply: {
      hi: "Mandiron mein darshan ke liye saada aur sammanjanak vastra pehnana uchit hota hai. Kuch mandiron mein purushon ko dhoti/kurta pehnkar hi garbhagrih mein jaane ki anumati hoti hai — website ke andar specific mandir ki jaankari check kar sakte hain.",
      en: "It's appropriate to wear simple, respectful clothing for temple darshan. In some temples, men are only allowed into the inner sanctum wearing a dhoti/kurta — you can check specific temple info within the website.",
    },
  },
  {
    keywords: ["mobile", "network", "wifi", "internet"],
    reply: {
      hi: "Digital Ujjain ke tahat shehar mein free WiFi zones lagaye gaye hain, jo 'Vikas' section mein bataye gaye hain. Simhastha ke dauraan network capacity aur badhai jayegi bhid sambhalne ke liye.",
      en: "Under Digital Ujjain, free WiFi zones have been set up across the city, mentioned in the 'Development' section. Network capacity will be increased further during Simhastha to handle crowds.",
    },
  },
  {
    keywords: ["medical", "hospital", "ambulance", "ilaj", "davakhana"],
    reply: {
      hi: "Simhastha ke dauraan vishesh medical camps aur ambulance seva uplabdh rahegi pramukh ghaton aur mandiron ke paas. Emergency ke liye local prashasan ki helpline se sampark karein.",
      en: "During Simhastha, special medical camps and ambulance services will be available near major ghats and temples. For emergencies, contact the local administration's helpline.",
    },
  },
  {
    keywords: ["kho gaya", "lost", "gum", "khoya", "milna"],
    reply: {
      hi: "Agar koi saman ya vyakti kho jaye, toh nazdeeki police sahayta kendra ya 'Book a Sathi'/'Stay Booking' section ke Report button ka upyog karein. Simhastha ke dauraan vishesh khoya-paya kendra bhi sthapit kiye jaayenge.",
      en: "If something or someone gets lost, use the nearest police help desk or the Report button in the 'Book a Sathi'/'Stay Booking' section. Special lost-and-found centres will also be set up during Simhastha.",
    },
  },
  {
    keywords: ["language", "bhasha", "hindi english"],
    reply: {
      hi: "Ye website Hindi aur English dono mein available hai — Navbar mein upar diye gaye 'EN/हिं' button se aap language switch kar sakte hain.",
      en: "This website is available in both Hindi and English — you can switch language using the 'EN/हिं' button at the top of the navbar.",
    },
  },
  {
    keywords: ["free", "muft", "paisa lagega", "cost", "kharcha"],
    reply: {
      hi: "Website dekhna aur mandir darshan mein koi shulk nahi hai, ye sabke liye muft hai. Sirf agar aap dharamshala/hotel book karte hain, toh us accommodation ka fixed, government-verified charge lagega — koi hidden ya extra commission nahi.",
      en: "There's no fee for browsing the website or for temple darshan — it's free for everyone. Only if you book a dharamshala/hotel will there be a fixed, government-verified charge — no hidden fees or extra commission.",
    },
  },
  {
    keywords: ["akhada", "sadhu", "sant", "naga"],
    reply: {
      hi: "Dutt Akhada aur baaki akhade Simhastha ke dauraan sadhu-santon ke thehrne ka pramukh camp hote hain. Naga sadhuon ki shahi snan yatra Simhastha ka sabse mahatvapurn aur dekhne layak avsar hota hai.",
      en: "Dutt Akhada and other akhadas are the main camps where sadhus and saints stay during Simhastha. The royal bathing procession of the Naga sadhus is Simhastha's most important and spectacular event.",
    },
  },
  {
    keywords: ["chintaman", "ganesh", "hathi"],
    reply: {
      hi: "Chintaman Ganesh Mandir Kshipra nadi ke kinare sthit ek prachin swayambhu (khud-prakat) Ganesh mandir hai, jo Ujjain ke pramukh darshan sthalon mein se ek hai.",
      en: "Chintaman Ganesh Temple is an ancient self-manifested Ganesh temple on the banks of the Kshipra river, one of Ujjain's major darshan spots.",
    },
  },
  {
    keywords: ["gadkalika", "kalika", "devi"],
    reply: {
      hi: "Gadkalika Mandir Devi Kalika ko samarpit hai. Mana jata hai ki Mahakavi Kalidas ne yahi Devi Kalika ki aaradhna karke apni kavya-shakti prapt ki thi.",
      en: "Gadkalika Temple is dedicated to Goddess Kalika. It's believed that the great poet Kalidas obtained his poetic powers by worshipping Goddess Kalika here.",
    },
  },
  {
    keywords: ["bagalamukhi", "siddh peeth"],
    reply: {
      hi: "Ujjain Bagalamukhi Mandir Devi Bagalamukhi ko samarpit ek siddh peeth hai, jo shehar ke bhaktoin mein bahut shraddha ka sthan rakhta hai.",
      en: "Ujjain Bagalamukhi Temple is a siddh peeth dedicated to Goddess Bagalamukhi, holding great reverence among the city's devotees.",
    },
  },
  {
    keywords: ["mahakal mitra", "chatbot", "bot", "ai"],
    reply: {
      hi: "Main Mahakal Mitra hoon — is website ka digital guide, jo aapko Ujjain ke mandir, ghat, itihaas, Simhastha planning, booking, aur route ke baare mein turant jaankari deta hoon. Kuch bhi poochiye!",
      en: "I'm Mahakal Mitra — this website's digital guide, giving you instant information about Ujjain's temples, ghats, history, Simhastha planning, bookings, and routes. Ask me anything!",
    },
  },
  {
    keywords: ["badge", "gamification", "explorer", "unlock"],
    reply: {
      hi: "Jaise-jaise aap is website ko scroll karke explore karte hain, aapko alag-alag badges (jaise History Buff, Vikas Explorer, Ghat Explorer) unlock hote hain — screen ke neeche-left corner mein dikhte hain!",
      en: "As you scroll and explore this website, you unlock different badges (like History Buff, Development Explorer, Ghat Explorer) — they show up in the bottom-left corner of the screen!",
    },
  },
  {
    keywords: ["voice", "awaaz", "sunna", "narration"],
    reply: {
      hi: "Website mein ek 'Voice Narration' button hai (right side, speaker icon 🔊) jo aapko Ujjain ke baare mein ek chhota audio sunata hai. Try kariye!",
      en: "There's a 'Voice Narration' button on the website (right side, speaker icon 🔊) that plays a short audio about Ujjain. Give it a try!",
    },
  },
  {
    keywords: ["achievement", "puraskar", "award", "samman"],
    reply: {
      hi: "Ujjain ko Smart City Award, Swachh Sarvekshan mein achha rank, Heritage City recognition, aur Best Tourism Destination jaise samman mile hain. 'Ujjain Ki Uplabdhiyan' section mein poori details hain.",
      en: "Ujjain has received honours like the Smart City Award, a good rank in Swachh Sarvekshan, Heritage City recognition, and Best Tourism Destination. Full details are in the 'Ujjain's Achievements' section.",
    },
  },
  {
    keywords: ["traffic", "jam", "bhid niyantran", "crowd management"],
    reply: {
      hi: "Simhastha ke dauraan traffic aur bhid niyantran ke liye vishesh zones banaye gaye hain — vehicles ko shehar ke bahar hi parking mil jayegi, aur andar shuttle service chalegi. 'Simhastha Planning Zone' mein pura route dekh sakte hain taaki jam se bacha ja sake.",
      en: "Special zones have been set up for traffic and crowd control during Simhastha — vehicles will get parking outside the city, with shuttle services inside. You can check the full route in 'Simhastha Planning Zone' to avoid traffic jams.",
    },
  },
  {
    keywords: ["accommodation shortage", "hotel full", "kamra nahi mila", "jagah nahi"],
    reply: {
      hi: "Bhid zyada hone par hotel/dharamshala jaldi bhar sakte hain, isliye 'Stay Booking' section se pehle se hi fixed-price, verified booking kar lena behtar rahega. Prashasan dwara tent cities bhi banayi jayengi extra accommodation ke liye.",
      en: "With heavy crowds, hotels/dharamshalas can fill up quickly, so it's best to book fixed-price, verified accommodation in advance through the 'Stay Booking' section. The administration will also set up tent cities for extra accommodation.",
    },
  },
  {
    keywords: ["garmi", "heat", "dhool", "dust", "mausam problem"],
    reply: {
      hi: "Garmi aur dhool se bachne ke liye topi/chhata, paani ki bottle, aur halka suti kapda saath rakhein. Peak dopahar (12-3 baje) mein dhoop se bachna behtar hota hai. 'Live Dashboard' mein current weather dekh sakte hain.",
      en: "To avoid heat and dust, carry a cap/umbrella, a water bottle, and light cotton clothes. It's best to avoid the sun during peak afternoon hours (12-3 PM). You can check current weather in the 'Live Dashboard'.",
    },
  },
  {
    keywords: ["paani", "drinking water", "khana hygiene", "food safety"],
    reply: {
      hi: "Simhastha ke dauraan jagah-jagah drinking water stalls lagaye jaate hain — sirf inhi verified stalls ka paani piyein. Khane ke liye bhi authorized/prashasan-verified stalls hi use karein, sadak kinare ke khule khaane se bachna behtar hai.",
      en: "Drinking water stalls are set up in many places during Simhastha — only drink water from these verified stalls. For food too, use authorized/administration-verified stalls, avoiding open roadside food.",
    },
  },
  {
    keywords: ["washroom", "toilet", "sanitation", "shauchalay"],
    reply: {
      hi: "Prashasan dwara ghaton aur mandiron ke aas-paas temporary toilets aur sanitation units lagaye jaate hain, jo Simhastha ke dauraan continuously saaf kiye jaate hain.",
      en: "The administration sets up temporary toilets and sanitation units around the ghats and temples, which are continuously cleaned during Simhastha.",
    },
  },
  {
    keywords: ["network congestion", "internet slow", "call nahi lag raha"],
    reply: {
      hi: "Bhid zyada hone se mobile network kabhi-kabhi slow ho sakta hai. Simhastha ke liye telecom companies dwara temporary towers aur extra capacity lagayi jaati hai. Emergency ke liye helpline numbers alag se available rahenge jo har network par kaam karein.",
      en: "With heavy crowds, mobile networks can sometimes get slow. Telecom companies set up temporary towers and extra capacity for Simhastha. Emergency helpline numbers will be separately available and work across all networks.",
    },
  },
  {
    keywords: ["pickpocket", "chori", "safety concern", "jeb katna"],
    reply: {
      hi: "Bhid mein apna saman (mobile, purse) sambhal kar rakhein, khaas kar ghaton aur bhare mandiron mein. Police help desks jagah-jagah honge — koi bhi samasya ho toh turant sampark karein.",
      en: "Keep your belongings (phone, wallet) secure in crowds, especially at ghats and busy temples. Police help desks will be set up everywhere — contact them immediately if you face any problem.",
    },
  },
  {
    keywords: ["vedh shala", "jantar mantar", "observatory"],
    reply: {
      hi: "Vedh Shala (Jantar Mantar) Ujjain Raja Sawai Jai Singh dwara banwaya gaya khagol-vigyan vedhshala hai — yahan se surya aur graho ki gati ka adhyayan hota tha. Ye Ujjain ke 'zero longitude' se sambandh ko darshata hai.",
      en: "The Vedh Shala (Jantar Mantar) in Ujjain is an astronomical observatory built by King Sawai Jai Singh — used to study the movement of the sun and planets. It reflects Ujjain's connection to the 'zero longitude'.",
    },
  },
  {
    keywords: ["shipra kinara", "river bank", "nadi kinare"],
    reply: {
      hi: "Shipra nadi ke kinare kayi ghat aur mandir hain — Ram Ghat, Kal Bhairav Ghat, aur Bhartrihari Gufa jaise sthal. Ye nadi Simhastha snan ka sabse pavitra kendra hai.",
      en: "There are many ghats and temples along the Shipra river — sites like Ram Ghat, Kal Bhairav Ghat, and Bhartrihari Cave. This river is the most sacred centre for Simhastha bathing.",
    },
  },
  {
    keywords: ["stampede", "bhagdad", "kuchalna", "bhid ka khatra"],
    reply: {
      hi: "Bhid-prabandhan ke liye ghaton par entry-exit alag rakhe jaate hain aur crowd-control barriers lagaye jaate hain. Prashasan ke nirdeshon ka palan karein aur jaldbazi na karein, khaas kar shahi snan ke din.",
      en: "For crowd management, separate entry-exit points are maintained at ghats and crowd-control barriers are installed. Follow administration guidelines and don't rush, especially on royal bathing days.",
    },
  },
  {
    keywords: ["health risk", "beemari", "infection", "sankraman"],
    reply: {
      hi: "Zyada bhid mein swasthya sambandhi savdhaani zaroori hai — saaf paani piyein, haath baar-baar dhoyein, aur agar tabiyat kharab lage toh turant medical camp mein sampark karein.",
      en: "In heavy crowds, health precautions are important — drink clean water, wash hands frequently, and contact a medical camp immediately if you feel unwell.",
    },
  },
  {
    keywords: ["heat stroke", "loo", "dehydration", "chakkar"],
    reply: {
      hi: "Garmi mein loo se bachne ke liye zyada se zyada paani piyein, dhoop mein zyada der na rahein, aur agar chakkar/thakaan mahsoos ho toh turant chhaya mein aakar aaram karein aur medical camp jaayein.",
      en: "To avoid heat stroke, drink plenty of water, avoid staying in the sun for long, and if you feel dizzy/exhausted, move to shade immediately, rest, and visit a medical camp.",
    },
  },
  {
    keywords: ["fake guide", "nakli guide", "donation fraud", "chanda fraud"],
    reply: {
      hi: "Kisi bhi ajnabi guide ya 'chanda' maangne wale vyakti par bharosa na karein — hamari website ke andar hi verified guide (Mahakal Mitra, Book a Sathi) available hain. Kisi bhi sandeh mein Report button use karein.",
      en: "Don't trust strangers claiming to be guides or asking for 'donations' — verified guides (Mahakal Mitra, Book a Sathi) are available right within our website. Use the Report button whenever in doubt.",
    },
  },
  {
    keywords: ["bachhe kho gaye", "lost child", "khoya paya", "lost and found"],
    reply: {
      hi: "Simhastha ke dauraan vishesh 'Khoya-Paya Kendra' sthapit kiye jaate hain jaha bachhe ya saman kho jaane par report kar sakte hain. Bachhon ki jeb mein naam-mobile number wali parchi rakhna ek achha upay hai.",
      en: "Special 'Lost and Found Centres' are set up during Simhastha where you can report a lost child or belongings. Keeping a note with the child's name and a mobile number in their pocket is a good precaution.",
    },
  },
  {
    keywords: ["medical camp", "emergency service", "aapatkal"],
    reply: {
      hi: "Pramukh ghaton aur mandiron ke paas medical camps aur emergency ambulance seva 24 ghante uplabdh rahegi Simhastha ke dauraan.",
      en: "Medical camps and emergency ambulance services will be available 24 hours near major ghats and temples during Simhastha.",
    },
  },
  {
    keywords: ["shuttle", "special train", "vishesh train"],
    reply: {
      hi: "Simhastha ke dauraan bhid sambhalne ke liye shuttle buses aur special trains chalayi jaati hain, jo bade parking/station se ghaton tak connectivity dengi.",
      en: "During Simhastha, shuttle buses and special trains run to manage crowds, connecting major parking areas/stations to the ghats.",
    },
  },
  {
    keywords: ["temporary toilet", "asthaayi shauchalay"],
    reply: {
      hi: "Prashasan dwara jagah-jagah temporary toilets banaye jaate hain jo regular saaf kiye jaate hain, taaki visitors ko koi dikkat na ho.",
      en: "The administration sets up temporary toilets in many places, which are regularly cleaned so visitors don't face any issues.",
    },
  },
  {
    keywords: ["water stall", "paani stall", "pyaau"],
    reply: {
      hi: "Ghaton aur mukhya raston par drinking water stalls (pyaau) lagaye jaate hain — free aur verified paani ke liye inhi ka upyog karein.",
      en: "Drinking water stalls are set up on ghats and main roads — use these for free, verified water.",
    },
  },
  {
    keywords: ["police help desk", "help desk", "sahayta kendra"],
    reply: {
      hi: "Pramukh sthalon par Police Help Desk sthapit kiye jaate hain jaha koi bhi samasya, complaint, ya jaankari ke liye sampark kiya ja sakta hai.",
      en: "Police Help Desks are set up at major locations, where you can reach out for any problem, complaint, or information.",
    },
  },
  {
    keywords: ["helpline", "helpline number", "emergency number", "mobile app"],
    reply: {
      hi: "Simhastha ke liye vishesh helpline number aur mobile app jaari kiye jaate hain jisse real-time jaankari, emergency sahayta, aur crowd-updates milte hain.",
      en: "Special helpline numbers and a mobile app are released for Simhastha, providing real-time information, emergency assistance, and crowd updates.",
    },
  },
  {
    keywords: ["tent city", "tambu", "temporary accommodation"],
    reply: {
      hi: "Bhid zyada hone par prashasan dwara tent cities banayi jaati hain — ye temporary lekin surakshit thehrne ki vyavastha hoti hai, khaas kar shahi snan ke dino mein.",
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
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}

function normalizeForMatch(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function checkDistanceQuery(inputText, lang) {
  const distanceWords = ["dur", "door", "distance", "kitni", "km", "kilometer", "kitna", "paas", "duri"];
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
          normalizeForMatch(other).length > normalizeForMatch(place).length
      )
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
    return lang === "hi"
      ? `${p1Cap} se ${p2Cap} tak ki doori lagbhag ${dist} km hai. Exact route ke liye 'Simhastha Planning Zone' section mein us jagah pe click karke 'Route Dekhein' button use karein.`
      : `The distance from ${p1Cap} to ${p2Cap} is about ${dist} km. For the exact route, click on that place in the 'Simhastha Planning Zone' section and use the 'View Route' button.`;
  }

  if (finalPlaces.length === 1) {
    const p1 = finalPlaces[0];
    const d1 = placeDistances[p1];
    const dMahakal = calculateDistance(d1.lat, d1.lng, 23.1828, 75.7683);
    if (p1 === "mahakaleshwar" || p1 === "mahakal") {
      return lang === "hi"
        ? "Aap Mahakaleshwar Mandir ke baare mein pooch rahe hain — kis jagah se doori jaanni hai? Jaise 'Mahakal se Ram Ghat kitni door hai' is tarah poochiye."
        : "You're asking about Mahakaleshwar Temple — which place's distance would you like to know? Try asking like 'How far is Ram Ghat from Mahakal'.";
    }
    const p1Cap = p1.charAt(0).toUpperCase() + p1.slice(1);
    return lang === "hi"
      ? `${p1Cap}, Mahakaleshwar Mandir se lagbhag ${dMahakal} km door hai. 'Simhastha Planning Zone' section mein exact route dekh sakte hain.`
      : `${p1Cap} is about ${dMahakal} km from Mahakaleshwar Temple. You can see the exact route in the 'Simhastha Planning Zone' section.`;
  }

  return null;
}

const defaultRepliesData = {
  hi: [
    "Ye specific jaankari abhi mere paas nahi hai, lekin aap 'Simhastha Planning Zone' section mein 19 jagahon ki poori list dekh sakte hain, ya 'Vikas' section mein development details. Kuch aur poochna chahenge?",
    "Mujhe ye samajh nahi aaya, lekin main aapko website ke sections explore karne ka sujhaav dunga — Mandir, Ghat, Booking, ya Route ke baare mein poochh ke dekhiye.",
    "Iske baare mein mujhe exact jaankari nahi hai, lekin aap Mahakaleshwar, Simhastha, ghat, booking, ya route se juda kuch bhi pooch sakte hain, main zaroor madad karunga.",
  ],
  en: [
    "I don't have that specific information right now, but you can see the full list of 19 places in the 'Simhastha Planning Zone' section, or development details in the 'Development' section. Anything else you'd like to know?",
    "I didn't quite understand that, but I'd suggest exploring the website's sections — try asking about Temples, Ghats, Booking, or Routes.",
    "I don't have exact information on this, but you can ask me anything about Mahakaleshwar, Simhastha, ghats, booking, or routes — I'll be happy to help.",
  ],
};

const text = {
  hi: {
    greeting: "Namaste! Main Mahakal Mitra hoon 🙏 Mandir, ghat, Simhastha, booking, ya route — kuch bhi poochiye.",
    header: "Mahakal Mitra — Digital Guide",
    placeholder: "Kuch poochiye...",
  },
  en: {
    greeting: "Hello! I'm Mahakal Mitra 🙏 Ask me anything — temples, ghats, Simhastha, booking, or routes.",
    header: "Mahakal Mitra — Digital Guide",
    placeholder: "Ask something...",
  },
};

export default function MahakalMitra() {
  const { lang } = useLanguage();
  const t = text[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: text.hi.greeting }]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const normalize = (str) => str.toLowerCase().replace(/[?.,!]/g, "").trim();

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
      return bestMatch.reply[lang];
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
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-ujjain-gold text-ujjain-dark text-2xl shadow-lg flex items-center justify-center hover:scale-110 transition"
      >
        {isOpen ? "✕" : "🙏"}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[450px] bg-ujjain-dark border border-ujjain-gold/40 rounded-xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-ujjain-gold text-ujjain-dark px-4 py-3 font-bold">{t.header}</div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                  msg.from === "bot" ? "bg-white/10 text-ujjain-cream self-start" : "bg-ujjain-saffron text-ujjain-dark self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex border-t border-ujjain-gold/20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 bg-transparent px-4 py-3 text-ujjain-cream text-sm focus:outline-none"
            />
            <button type="submit" className="px-4 text-ujjain-gold font-bold">➤</button>
          </form>
        </div>
      )}
    </>
  );
}