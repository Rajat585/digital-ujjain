"use client";
import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useLanguage } from "../components/LanguageContext";
import { api, openRazorpayCheckout } from "../lib/api";

const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

const sathiListData = {
  hi: [
    { id: 1, name: "रमेश चतुर्वेदी", aadharMasked: "XXXX-XXXX-4521", experience: "8 साल का अनुभव", languages: ["हिंदी", "अंग्रेज़ी"], rating: 4.9, pricePerDay: 800, zone: "महाकाल क्षेत्र", areas: ["महाकाल कॉरिडोर", "राम घाट", "काल भैरव"] },
    { id: 2, name: "सुनीता व्यास", aadharMasked: "XXXX-XXXX-7734", experience: "5 साल का अनुभव", languages: ["हिंदी", "मराठी"], rating: 4.8, pricePerDay: 700, zone: "घाट क्षेत्र", areas: ["राम घाट", "क्षिप्रा तट", "गढ़कालिका"] },
    { id: 3, name: "इक़बाल खान", aadharMasked: "XXXX-XXXX-1092", experience: "10 साल का अनुभव", languages: ["हिंदी", "अंग्रेज़ी", "गुजराती"], rating: 5.0, pricePerDay: 900, zone: "शहर केंद्र", areas: ["सांदीपनि आश्रम", "मंगलनाथ", "इस्कॉन"] },
    { id: 4, name: "पूजा सोलंकी", aadharMasked: "XXXX-XXXX-3387", experience: "4 साल का अनुभव", languages: ["हिंदी"], rating: 4.7, pricePerDay: 600, zone: "स्टेशन क्षेत्र", areas: ["रेलवे स्टेशन", "नानाखेड़ा बस स्टैंड", "देवास गेट"] },
  ],
  en: [
    { id: 1, name: "Ramesh Chaturvedi", aadharMasked: "XXXX-XXXX-4521", experience: "8 Years of Experience", languages: ["Hindi", "English"], rating: 4.9, pricePerDay: 800, zone: "Mahakal Area", areas: ["Mahakal Corridor", "Ram Ghat", "Kal Bhairav"] },
    { id: 2, name: "Sunita Vyas", aadharMasked: "XXXX-XXXX-7734", experience: "5 Years of Experience", languages: ["Hindi", "Marathi"], rating: 4.8, pricePerDay: 700, zone: "Ghat Area", areas: ["Ram Ghat", "Kshipra Riverbank", "Gadkalika"] },
    { id: 3, name: "Iqbal Khan", aadharMasked: "XXXX-XXXX-1092", experience: "10 Years of Experience", languages: ["Hindi", "English", "Gujarati"], rating: 5.0, pricePerDay: 900, zone: "City Center", areas: ["Sandipani Ashram", "Mangalnath", "ISKCON"] },
    { id: 4, name: "Pooja Solanki", aadharMasked: "XXXX-XXXX-3387", experience: "4 Years of Experience", languages: ["Hindi"], rating: 4.7, pricePerDay: 600, zone: "Station Area", areas: ["Railway Station", "Nanakheda Bus Stand", "Dewas Gate"] },
  ],
};

sathiListData.hinglish = [
  { id: 1, name: "Ramesh Chaturvedi", aadharMasked: "XXXX-XXXX-4521", experience: "8 Saal Ka Anubhav", languages: ["Hindi", "English"], rating: 4.9, pricePerDay: 800, zone: "Mahakal Area", areas: ["Mahakal Corridor", "Ram Ghat", "Kal Bhairav"] },
  { id: 2, name: "Sunita Vyas", aadharMasked: "XXXX-XXXX-7734", experience: "5 Saal Ka Anubhav", languages: ["Hindi", "Marathi"], rating: 4.8, pricePerDay: 700, zone: "Ghat Area", areas: ["Ram Ghat", "Kshipra Tat", "Gadkalika"] },
  { id: 3, name: "Iqbal Khan", aadharMasked: "XXXX-XXXX-1092", experience: "10 Saal Ka Anubhav", languages: ["Hindi", "English", "Gujarati"], rating: 5.0, pricePerDay: 900, zone: "City Center", areas: ["Sandipani Ashram", "Mangalnath", "ISKCON"] },
  { id: 4, name: "Pooja Solanki", aadharMasked: "XXXX-XXXX-3387", experience: "4 Saal Ka Anubhav", languages: ["Hindi"], rating: 4.7, pricePerDay: 600, zone: "Station Area", areas: ["Railway Station", "Nanakheda Bus Stand", "Dewas Gate"] },
];

const areaOptionsData = {
  hi: ["महाकाल कॉरिडोर", "राम घाट", "काल भैरव", "क्षिप्रा तट", "मंगलनाथ", "सांदीपनि आश्रम", "इस्कॉन", "रेलवे स्टेशन"],
  en: ["Mahakal Corridor", "Ram Ghat", "Kal Bhairav", "Kshipra Riverbank", "Mangalnath", "Sandipani Ashram", "ISKCON", "Railway Station"],
  hinglish: ["Mahakal Corridor", "Ram Ghat", "Kal Bhairav", "Kshipra Tat", "Mangalnath", "Sandipani Ashram", "ISKCON", "Railway Station"],
};

const languageOptions = ["Hindi", "English", "Marathi", "Gujarati", "Sanskrit"];

const text = {
  hi: {
    eyebrow: "सिंहस्थ सहायक",
    title: "साथी बुक करें",
    subtitle: "आपका सत्यापित स्थानीय गाइड — पूरी उज्जैन यात्रा में आपके साथ",
    trustBar: "आधार सत्यापित साथी  •  राशि तब तक लॉक जब तक ट्रिप पूरा न हो",
    howVerified: "सत्यापन कैसे होता है?",
    howVerifiedText:
      "हर साथी का आधार/सरकारी आईडी भौतिक रूप से सत्यापित किया जाता है (24–48 घंटे की प्रक्रिया)। सत्यापित होने के बाद ही वो बुकिंग सूची में आता है। भुगतान एस्क्रो-स्टाइल लॉक रहता है — साथी को तभी मिलेगा जब आप खुद ट्रिप पूरा होने की पुष्टि करें।",
    tabBook: "साथी बुक करें",
    tabRegister: "साथी बनें",
    verifyIntro: "🙏 सबसे पहले अपनी पहचान सत्यापित करें — इससे दोनों तरफ (आप और साथी) के लिए भरोसा बनता है।",
    fullName: "आपका पूरा नाम",
    mobile: "मोबाइल नंबर",
    idNumber: "आधार / सरकारी आईडी नंबर",
    verifying: "पहचान सत्यापित हो रही है...",
    verifyBtn: "पहचान सत्यापित करें",
    verifiedMsg: "✓ पहचान सत्यापित — अब आप किसी भी साथी को बुक कर सकते हैं",
    continueBtn: "आगे बढ़ें",
    greetSathiList: (name) => `नमस्ते ${name} 🙏 ये रहे आपके आस-पास के सत्यापित साथी:`,
    aadharVerified: "आधार सत्यापित ✓",
    idLabel: "आईडी:",
    perDay: "दिन",
    languagesLabel: "भाषाएं:",
    areasLabel: "क्षेत्र:",
    youChose: "आपने चुना:",
    days: "दिन",
    itineraryTitle: "यात्रा इटिनरी पूर्वावलोकन",
    dayLabel: "दिन",
    darshanText: "दर्शन और मार्गदर्शन",
    perDayCalc: (n, price) => `${n} दिन × ₹${price}/दिन`,
    confirmBookingBtn: "भुगतान करें और बुक करें",
    confirmingBtn: "भुगतान खुल रहा है...",
    congrats: "भुगतान सफल! आपकी बुकिंग पुष्टि हो गई है। ये रहा आपका डिजिटल रसीद:",
    released: "(ट्रिप पूरा — भुगतान प्रक्रिया में)",
    lockedTag: "(🔒 राशि लॉक)",
    lockedNote: "आपका पैसा सुरक्षित रूप से प्लेटफ़ॉर्म के पास है। साथी को भुगतान तभी होगा जब आप ट्रिप पूरा होने की पुष्टि करेंगे और एडमिन सत्यापित कर लेगा — बीच में कोई अतिरिक्त पैसा मान्य नहीं होगा।",
    releasedNote: "धन्यवाद! ट्रिप पूरा हो गया है। एडमिन सत्यापन के बाद साथी को भुगतान जारी होगा।",
    releaseBtn: "✓ ट्रिप पूरा हुआ — पुष्टि करें",
    releasingBtn: "पुष्टि हो रही है...",
    reportBtn: "⚠️ किसी साथी ने अतिरिक्त पैसा मांगा या गलत व्यवहार किया? रिपोर्ट करें",
    reportSentMsg: "आपकी शिकायत प्रशासन तक भेज दी गई है। धन्यवाद।",
    bookingError: "बुकिंग में दिक्कत आई। कृपया दोबारा कोशिश करें।",
    newBooking: "नई बुकिंग करें",
    regIntro: "🙏 उज्जैन के स्थानीय हैं और गाइड बनना चाहते हैं? नीचे अपनी जानकारी भरें — सत्यापन के बाद ही आप लाइव होंगे।",
    experiencePlaceholder: "गाइड का अनुभव (जैसे: 5 साल)",
    languagesQ: "आप कौन-सी भाषाएं बोल सकते हैं?",
    areasQ: "आप कौन-से क्षेत्र अच्छी तरह जानते हैं?",
    submitApp: "आवेदन जमा करें",
    submittingApp: "जमा हो रहा है...",
    appError: "आवेदन जमा नहीं हो पाया। कृपया दोबारा कोशिश करें।",
    privacyNote: "आपकी आधार जानकारी सिर्फ सत्यापन के लिए उपयोग होगी, किसी को साझा नहीं की जाएगी।",
    receivedTitle: "आवेदन मिल गया!",
    receivedMsg: (name) => `धन्यवाद ${name} जी। आपकी आधार सत्यापन 24–48 घंटों में पूरी होगी। सत्यापित होने के बाद हम आपको कॉल करेंगे और आप "साथी बुक करें" सूची में लाइव हो जाएंगे।`,
    refId: "संदर्भ आईडी:",
    newApp: "नया आवेदन भरें",
  },
  en: {
    eyebrow: "Simhastha Sahayak",
    title: "Book a Sathi",
    subtitle: "Your verified local guide — with you throughout your Ujjain journey",
    trustBar: "Aadhar Verified Sathi  •  Amount Locked Until Trip Is Complete",
    howVerified: "How does verification work?",
    howVerifiedText:
      "Every Sathi's Aadhar/Govt. ID is physically verified (a 24–48 hour process). Only after verification do they appear in the booking list. Payment stays escrow-locked — the Sathi is paid only after you personally confirm the trip is complete.",
    tabBook: "Book a Sathi",
    tabRegister: "Become a Sathi",
    verifyIntro: "🙏 First, verify your identity — this builds trust on both sides (you and your Sathi).",
    fullName: "Your full name",
    mobile: "Mobile number",
    idNumber: "Aadhar / Govt. ID number",
    verifying: "Verifying Identity...",
    verifyBtn: "Verify Identity",
    verifiedMsg: "✓ Identity Verified — You can now book any Sathi",
    continueBtn: "Continue",
    greetSathiList: (name) => `Hello ${name} 🙏 Here are the verified Sathis near you:`,
    aadharVerified: "Aadhar Verified ✓",
    idLabel: "ID:",
    perDay: "day",
    languagesLabel: "Languages:",
    areasLabel: "Areas:",
    youChose: "You chose:",
    days: "Days",
    itineraryTitle: "Trip Itinerary Preview",
    dayLabel: "Day",
    darshanText: "darshan and guidance",
    perDayCalc: (n, price) => `${n} day${n > 1 ? "s" : ""} × ₹${price}/day`,
    confirmBookingBtn: "Pay & Book",
    confirmingBtn: "Opening Payment...",
    congrats: "Payment successful! Your booking is confirmed. Here's your digital receipt:",
    released: "(Trip Complete — Payout In Process)",
    lockedTag: "(🔒 Amount Locked)",
    lockedNote: "Your payment is safely held by the platform. The Sathi's payout is processed once you confirm the trip is complete and admin verifies it — no extra charges are valid in between.",
    releasedNote: "Thanks! Trip marked complete. Payout to the Sathi will be released after admin verification.",
    releaseBtn: "✓ Trip Completed — Confirm",
    releasingBtn: "Confirming...",
    reportBtn: "⚠️ Did a Sathi ask for extra money or misbehave? Report It",
    reportSentMsg: "Your complaint has been sent to the administration. Thank you.",
    bookingError: "There was a problem with your payment or booking. If money was deducted it will be auto-refunded. Please try again.",
    newBooking: "New Booking",
    regIntro: "🙏 Are you a local from Ujjain and want to become a guide? Fill your details below — you'll go live only after verification.",
    experiencePlaceholder: "Guide experience (e.g., 5 years)",
    languagesQ: "Which languages can you speak?",
    areasQ: "Which areas do you know well?",
    submitApp: "Submit Application",
    submittingApp: "Submitting...",
    appError: "Could not submit your application. Please try again.",
    privacyNote: "Your Aadhar details will only be used for verification and will not be shared with anyone.",
    receivedTitle: "Application Received!",
    receivedMsg: (name) => `Thank you ${name}. Your Aadhar verification will be complete within 24–48 hours. Once verified, we'll call you and you'll go live on the "Book a Sathi" list.`,
    refId: "Reference ID:",
    newApp: "Submit New Application",
  },
};

text.hinglish = {
  eyebrow: "Simhastha Sahayak",
  title: "Book a Sathi",
  subtitle: "Aapka verified local guide — poori Ujjain yatra mein aapke saath",
  trustBar: "Aadhar Verified Sathi  •  Amount Locked Jab Tak Trip Poora Na Ho",
  howVerified: "Verification kaise hoti hai?",
  howVerifiedText:
    "Har Sathi ka Aadhar/Govt. ID physically verify kiya jaata hai (24–48 ghante ka process). Verified hone ke baad hi wo booking list mein aata hai. Payment escrow-style locked rehti hai — Sathi ko tabhi milegi jab aap khud trip complete confirm karein.",
  tabBook: "Sathi Book Karein",
  tabRegister: "Sathi Banein",
  verifyIntro: "🙏 Sabse pehle apni pehchan verify karein — isse dono taraf (aap aur Sathi) ke liye trust banta hai.",
  fullName: "Aapka poora naam",
  mobile: "Mobile number",
  idNumber: "Aadhar / Govt. ID number",
  verifying: "Pehchan Verify Ho Rahi Hai...",
  verifyBtn: "Pehchan Verify Karein",
  verifiedMsg: "✓ Pehchan Verified — Ab aap kisi bhi Sathi ko book kar sakte hain",
  continueBtn: "Aage Badhein",
  greetSathiList: (name) => `Namaste ${name} 🙏 Ye rahe aapke aas-paas ke verified Sathi:`,
  aadharVerified: "Aadhar Verified ✓",
  idLabel: "ID:",
  perDay: "din",
  languagesLabel: "Bhaashayein:",
  areasLabel: "Areas:",
  youChose: "Aapne chuna:",
  days: "Din",
  itineraryTitle: "Yatra Itinerary Preview",
  dayLabel: "Din",
  darshanText: "darshan aur guidance",
  perDayCalc: (n, price) => `${n} din × ₹${price}/din`,
  confirmBookingBtn: "Pay & Book Karein",
  confirmingBtn: "Payment Khul Raha Hai...",
  congrats: "Payment safal! Aapki booking confirm ho gayi hai. Ye raha aapka digital receipt:",
  released: "(Trip Complete — Payout Process Mein)",
  lockedTag: "(🔒 Amount Locked)",
  lockedNote: "Aapka paisa safely platform ke paas hai. Sathi ko payout tab process hoga jab aap trip complete confirm karenge aur admin verify kar lega — beech mein koi extra paisa maanya nahi hoga.",
  releasedNote: "Dhanyavaad! Trip complete mark ho gaya hai. Admin verification ke baad Sathi ko payout release hoga.",
  releaseBtn: "✓ Trip Poora Hua — Confirm Karein",
  releasingBtn: "Confirm Ho Raha Hai...",
  reportBtn: "⚠️ Kisi Sathi ne extra paisa maanga ya galat vyavhar kiya? Report Karein",
  reportSentMsg: "Aapki complaint administration tak bhej di gayi hai. Dhanyavaad.",
  bookingError: "Booking mein dikkat aayi. Kripya dobara koshish karein.",
  newBooking: "Nayi Booking Karein",
  regIntro: "🙏 Ujjain ke local ho aur guide banna chahte ho? Neeche apni details bharein — verification ke baad hi aap live honge.",
  experiencePlaceholder: "Guide ka anubhav (jaise: 5 saal)",
  languagesQ: "Aap kaunsi bhaashayein bol sakte hain?",
  areasQ: "Aap kaunse areas achhi tarah jaante hain?",
  submitApp: "Application Jama Karein",
  submittingApp: "Jama Ho Raha Hai...",
  appError: "Application submit nahi ho payi. Kripya dobara koshish karein.",
  privacyNote: "Aapki Aadhar details sirf verification ke liye use hongi, kisi ko share nahi ki jayengi.",
  receivedTitle: "Application Mil Gayi!",
  receivedMsg: (name) => `Dhanyavaad ${name} ji. Aapki Aadhar verification 24–48 ghanton mein poori hogi. Verify hone ke baad hum aapko call karenge aur aap "Book a Sathi" list mein live ho jayenge.`,
  refId: "Reference ID:",
  newApp: "Nayi Application Bharein",
};

export default function SathiBooking() {
  const { lang } = useLanguage();
  const t = text[lang];
  const sathiList = sathiListData[lang];
  const areaOptions = areaOptionsData[lang];

  const [mode, setMode] = useState("book");

  const [step, setStep] = useState(0);
  const [touristName, setTouristName] = useState("");
  const [touristPhone, setTouristPhone] = useState("");
  const [touristId, setTouristId] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [selectedSathi, setSelectedSathi] = useState(null);
  const [days, setDays] = useState(1);
  const [bookingId, setBookingId] = useState("");
  const [paymentReleased, setPaymentReleased] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [releasing, setReleasing] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // Scroll-triggered entrance for the whole section.
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Staggered reveal for the Sathi list whenever step 1 mounts.
  const [listVisible, setListVisible] = useState(false);
  useEffect(() => {
    if (step === 1) {
      setListVisible(false);
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => setListVisible(true));
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
    return undefined;
  }, [step]);

  // Fade-in for the "how verification works" info line.
  const [verifyInfoVisible, setVerifyInfoVisible] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 1200);
  };

  const confirmSathiBooking = async () => {
    setConfirming(true);
    setBookingError("");

    // Step 1: create a Razorpay order for this Sathi's day-rate × days.
    const orderResult = await api.createSathiOrder({
      sathiName: selectedSathi.name,
      touristName: touristName.trim(),
      touristPhone: touristPhone.trim(),
      days,
      pricePerDay: selectedSathi.pricePerDay,
    });
    if (!orderResult.ok) {
      setConfirming(false);
      setBookingError(orderResult.error || t.bookingError);
      setStep(3);
      return;
    }

    // Step 2: open Razorpay Checkout — money is captured now and held with
    // the platform (escrow) until the trip is marked complete and an admin
    // releases the payout to the Sathi.
    const payment = await openRazorpayCheckout({
      orderId: orderResult.data.orderId,
      amount: orderResult.data.amount,
      keyId: orderResult.data.keyId,
      name: "Digital Ujjain",
      description: `Sathi: ${selectedSathi.name} — ${days} ${t.days}`,
      prefill: { name: touristName.trim(), contact: touristPhone.trim() },
    });
    if (!payment.ok) {
      setConfirming(false);
      setBookingError(payment.error || t.bookingError);
      setStep(3);
      return;
    }

    // Step 3: verify payment + create the booking record.
    const result = await api.bookSathi({
      sathiName: selectedSathi.name,
      touristName: touristName.trim(),
      touristPhone: touristPhone.trim(),
      days,
      totalAmount,
      razorpay_order_id: payment.razorpay_order_id,
      razorpay_payment_id: payment.razorpay_payment_id,
      razorpay_signature: payment.razorpay_signature,
    });
    setConfirming(false);
    if (result.ok) {
      setBookingId(result.data.bookingId);
    } else {
      // Payment went through but booking save failed — don't fabricate an ID,
      // show the real payment ID so support can reconcile it.
      setBookingId(payment.razorpay_payment_id);
      setBookingError(result.error || t.bookingError);
    }
    setStep(3);
  };

  // Tourist confirms the trip is done. This does NOT move money — it just
  // flags the booking for admin review. Actual fund release to the Sathi is
  // admin-only (see backend /api/admin/bookings/sathi/:id/release), so a
  // stranger who only knows a bookingId can no longer drain the escrow.
  const handleMarkComplete = async () => {
    setReleasing(true);
    const result = await api.markSathiComplete(bookingId);
    setReleasing(false);
    if (result.ok) {
      setPaymentReleased(true); // reuse existing UI state to show the "trip marked complete" message
    } else {
      setBookingError(result.error || t.bookingError);
    }
  };

  const handleReport = async () => {
    setReportSent(true);
    await api.submitReport({
      type: "sathi",
      bookingId,
      description: `Misconduct/overcharging report for Sathi ${selectedSathi?.name || "unknown"}`,
      reporterPhone: touristPhone,
    });
    setTimeout(() => setReportSent(false), 3000);
  };

  const resetBooking = () => {
    setStep(0);
    setTouristName("");
    setTouristPhone("");
    setTouristId("");
    setVerifying(false);
    setVerified(false);
    setSelectedSathi(null);
    setDays(1);
    setBookingId("");
    setBookingError("");
    setPaymentReleased(false);
  };

  const canVerify = touristName.trim() && touristPhone.trim().length >= 10 && touristId.trim().length >= 4;
  const totalAmount = selectedSathi ? selectedSathi.pricePerDay * days : 0;

  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAadhar, setRegAadhar] = useState("");
  const [regExperience, setRegExperience] = useState("");
  const [regLanguages, setRegLanguages] = useState([]);
  const [regAreas, setRegAreas] = useState([]);
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [regError, setRegError] = useState("");
  const [regRefId, setRegRefId] = useState("");
  const [showVerifyInfo, setShowVerifyInfo] = useState(false);

  useEffect(() => {
    if (showVerifyInfo) {
      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => setVerifyInfoVisible(true));
        return () => cancelAnimationFrame(raf2);
      });
      return () => cancelAnimationFrame(raf1);
    }
    setVerifyInfoVisible(false);
    return undefined;
  }, [showVerifyInfo]);

  const toggleFromList = (list, setList, value) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const canSubmitReg = regName.trim() && regPhone.trim().length >= 10 && regAadhar.trim().length >= 4 && regLanguages.length > 0 && regAreas.length > 0;

  const handleRegSubmit = async () => {
    if (!canSubmitReg) return;
    setRegSubmitting(true);
    setRegError("");
    const result = await api.submitSathiApplication({
      name: regName.trim(),
      phone: regPhone.trim(),
      idNumber: regAadhar.trim(),
      experience: regExperience.trim(),
      languages: regLanguages,
      areas: regAreas,
    });
    setRegSubmitting(false);
    if (result.ok) {
      setRegRefId(result.data.referenceId);
      setRegSubmitted(true);
    } else {
      setRegError(result.error || t.appError);
    }
  };

  const resetReg = () => {
    setRegName("");
    setRegPhone("");
    setRegAadhar("");
    setRegExperience("");
    setRegLanguages([]);
    setRegAreas([]);
    setRegSubmitted(false);
    setRegError("");
    setRegRefId("");
  };

  return (
    <section id="sathi-booking" ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-ujjain-dark overflow-hidden">
      <div style={{ opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? "translateY(0)" : "translateY(24px)", transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}` }} className="flex flex-col items-center w-full">
        <span className="text-ujjain-saffron text-xs font-semibold tracking-widest uppercase mb-2">{t.eyebrow}</span>
        <h2 className="text-4xl md:text-5xl font-bold text-ujjain-gold mb-4 text-center">{t.title}</h2>
        <p className="text-ujjain-cream mb-4 text-center max-w-xl">{t.subtitle}</p>
        <div className="flex items-center gap-2 text-xs text-ujjain-saffron mb-2 bg-white/5 px-4 py-2 rounded-full border border-ujjain-saffron/30 text-center flex-wrap justify-center hover:border-ujjain-saffron/60 transition-colors duration-300">
          <span>✓</span> {t.trustBar}
          <button
            onClick={() => setShowVerifyInfo((v) => !v)}
            className="ml-1 w-4 h-4 rounded-full border border-ujjain-saffron/60 text-[10px] leading-none flex items-center justify-center hover:bg-ujjain-saffron/20 hover:rotate-12 transition-all duration-300"
            aria-label={t.howVerified}
          >
            ⓘ
          </button>
        </div>
        {showVerifyInfo && (
          <p style={{ opacity: verifyInfoVisible ? 1 : 0, transform: verifyInfoVisible ? "translateY(0)" : "translateY(-4px)", transition: `opacity 300ms ${EASE}, transform 300ms ${EASE}` }} className="text-ujjain-cream/60 text-xs max-w-lg text-center mb-8 -mt-1">{t.howVerifiedText}</p>
        )}
        {!showVerifyInfo && <div className="mb-8" />}

        <div className="relative flex gap-2 mb-8 bg-white/5 border border-ujjain-gold/20 rounded-full p-1 w-full max-w-xs">
          <div style={{ left: mode === "book" ? "4px" : "50%", transition: `left 400ms ${EASE}` }} className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-ujjain-gold" />
          <button onClick={() => setMode("book")} className={`relative z-10 flex-1 px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${mode === "book" ? "text-ujjain-dark" : "text-ujjain-cream/70 hover:text-ujjain-cream"}`}>
            {t.tabBook}
          </button>
          <button onClick={() => setMode("register")} className={`relative z-10 flex-1 px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${mode === "register" ? "text-ujjain-dark" : "text-ujjain-cream/70 hover:text-ujjain-cream"}`}>
            {t.tabRegister}
          </button>
        </div>

        {mode === "book" && (
          <div className="w-full max-w-xl bg-white/5 border border-ujjain-gold/30 rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-ujjain-gold/50">
            {step === 0 && (
              <div>
                <p className="text-ujjain-cream mb-6 text-center">{t.verifyIntro}</p>
                <div className="flex flex-col gap-3 mb-4">
                  <input type="text" placeholder={t.fullName} aria-label={t.fullName} value={touristName} onChange={(e) => setTouristName(e.target.value)} disabled={verified}
                    className="w-full bg-white/5 border border-ujjain-gold/30 rounded-lg px-4 py-3 text-ujjain-cream placeholder:text-ujjain-cream/40 focus:outline-none focus:border-ujjain-gold disabled:opacity-50 transition-colors duration-300" />
                  <input type="tel" placeholder={t.mobile} aria-label={t.mobile} value={touristPhone} onChange={(e) => setTouristPhone(e.target.value)} disabled={verified}
                    className="w-full bg-white/5 border border-ujjain-gold/30 rounded-lg px-4 py-3 text-ujjain-cream placeholder:text-ujjain-cream/40 focus:outline-none focus:border-ujjain-gold disabled:opacity-50 transition-colors duration-300" />
                  <input type="text" placeholder={t.idNumber} aria-label={t.idNumber} value={touristId} onChange={(e) => setTouristId(e.target.value)} disabled={verified}
                    className="w-full bg-white/5 border border-ujjain-gold/30 rounded-lg px-4 py-3 text-ujjain-cream placeholder:text-ujjain-cream/40 focus:outline-none focus:border-ujjain-gold disabled:opacity-50 transition-colors duration-300" />
                </div>
                {!verified && (
                  <button onClick={handleVerify} disabled={!canVerify || verifying}
                    className="w-full bg-ujjain-gold text-ujjain-dark font-bold px-6 py-3 rounded-lg hover:bg-ujjain-saffron hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ujjain-gold/20 transition-all duration-300 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none">
                    {verifying ? t.verifying : t.verifyBtn}
                  </button>
                )}
                {verified && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-ujjain-saffron bg-ujjain-saffron/10 border border-ujjain-saffron/40 rounded-full px-4 py-2 text-sm mb-4">
                      {t.verifiedMsg}
                    </div>
                    <button onClick={() => setStep(1)} className="w-full bg-ujjain-gold text-ujjain-dark font-bold px-6 py-3 rounded-lg hover:bg-ujjain-saffron hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ujjain-gold/20 transition-all duration-300">
                      {t.continueBtn}
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === 1 && (
              <div>
                <p className="text-ujjain-cream mb-6 text-center">{t.greetSathiList(touristName)}</p>
                <div className="flex flex-col gap-3">
                  {sathiList.map((s, i) => (
                    <button key={s.id} onClick={() => { setSelectedSathi(s); setStep(2); }}
                      style={{ opacity: listVisible ? 1 : 0, transform: listVisible ? undefined : "translateY(16px)", transition: `opacity 500ms ${EASE}, transform 500ms ${EASE}`, transitionDelay: `${i * 100}ms` }}
                      className="bg-white/5 border border-ujjain-gold/20 rounded-lg p-4 hover:border-ujjain-gold hover:-translate-y-1.5 hover:shadow-lg hover:shadow-ujjain-gold/10 transition-all duration-300 text-left">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-ujjain-gold font-semibold flex items-center gap-2 flex-wrap">
                            {s.name}
                            <span className="text-xs bg-ujjain-saffron/20 text-ujjain-saffron px-2 py-0.5 rounded-full">{t.aadharVerified}</span>
                          </div>
                          <div className="text-ujjain-cream/50 text-xs mt-0.5">{t.idLabel} {s.aadharMasked}</div>
                        </div>
                        <div className="text-ujjain-gold font-bold whitespace-nowrap">₹{s.pricePerDay}/{t.perDay}</div>
                      </div>
                      <div className="text-ujjain-cream/70 text-xs mb-1">⭐ {s.rating} &nbsp;•&nbsp; {s.experience} &nbsp;•&nbsp; 📍 {s.zone}</div>
                      <div className="text-ujjain-cream/60 text-xs mb-1">{t.languagesLabel} {s.languages.join(", ")}</div>
                      <div className="text-ujjain-cream/60 text-xs">{t.areasLabel} {s.areas.join(", ")}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && selectedSathi && (
              <div>
                <p className="text-ujjain-cream mb-4 text-center">
                  {t.youChose} <span className="text-ujjain-gold font-semibold">{selectedSathi.name}</span>
                </p>
                <div className="flex justify-center gap-3 mb-6">
                  {[1, 2, 3].map((d) => (
                    <button key={d} onClick={() => setDays(d)}
                      className={`px-5 py-2 rounded-full border transition-all duration-300 hover:-translate-y-0.5 ${days === d ? "bg-ujjain-gold text-ujjain-dark border-ujjain-gold shadow-lg shadow-ujjain-gold/20" : "border-ujjain-gold/40 text-ujjain-cream hover:border-ujjain-gold"}`}>
                      {d} {t.days}
                    </button>
                  ))}
                </div>
                <div className="bg-black/20 border border-ujjain-gold/20 rounded-lg p-4 mb-6">
                  <div className="text-ujjain-gold font-semibold mb-2 text-sm">{t.itineraryTitle}</div>
                  {Array.from({ length: days }).map((_, i) => (
                    <div key={i} className="text-ujjain-cream/80 text-sm mb-1">
                      <span className="text-ujjain-saffron">{t.dayLabel} {i + 1}:</span> {selectedSathi.areas[i % selectedSathi.areas.length]} {t.darshanText}
                    </div>
                  ))}
                </div>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-ujjain-gold">₹{totalAmount}</div>
                  <div className="text-ujjain-cream/60 text-xs">{t.perDayCalc(days, selectedSathi.pricePerDay)}</div>
                </div>
                <button onClick={confirmSathiBooking} disabled={confirming} className="w-full bg-ujjain-gold text-ujjain-dark font-bold px-6 py-3 rounded-lg hover:bg-ujjain-saffron hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ujjain-gold/20 transition-all duration-300 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none">
                  {confirming ? t.confirmingBtn : t.confirmBookingBtn}
                </button>
              </div>
            )}

            {step === 3 && selectedSathi && (
              <div className="text-center">
                <p className="text-ujjain-cream mb-6">{t.congrats}</p>
                <div className="bg-black/30 border border-ujjain-gold/30 rounded-xl p-6 flex flex-col items-center gap-4 transition-all duration-300 hover:border-ujjain-gold/50 hover:shadow-lg hover:shadow-ujjain-gold/10">
                  <QRCodeSVG value={bookingId} size={120} bgColor="transparent" fgColor="#D4AF37" />
                  <div className="text-ujjain-gold font-bold">{bookingId}</div>
                  <div className="text-ujjain-cream text-sm">{selectedSathi.name} — {days} {t.days}</div>
                  <div className="text-2xl font-bold text-ujjain-gold">
                    ₹{totalAmount} <span className="text-xs text-ujjain-cream/60">{paymentReleased ? t.released : t.lockedTag}</span>
                  </div>
                  <div className="text-xs text-ujjain-cream/50 max-w-sm">{paymentReleased ? t.releasedNote : t.lockedNote}</div>
                </div>
                {bookingError && <p className="text-red-400 text-xs mt-3">{bookingError}</p>}
                {!paymentReleased && (
                  <button onClick={handleMarkComplete} disabled={releasing} className="mt-6 w-full max-w-xs bg-ujjain-gold text-ujjain-dark font-bold px-6 py-3 rounded-lg hover:bg-ujjain-saffron hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ujjain-gold/20 transition-all duration-300 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none">
                    {releasing ? t.releasingBtn : t.releaseBtn}
                  </button>
                )}
                <button onClick={handleReport} className="mt-4 text-xs text-ujjain-saffron border border-ujjain-saffron/40 px-4 py-2 rounded-full hover:bg-ujjain-saffron/10 hover:-translate-y-0.5 transition-all duration-300 block mx-auto">
                  {t.reportBtn}
                </button>
                {reportSent && <p className="text-ujjain-saffron text-sm mt-3">{t.reportSentMsg}</p>}
                <div>
                  <button onClick={resetBooking} className="mt-6 text-ujjain-cream/60 text-sm underline hover:text-ujjain-gold transition-colors duration-300">{t.newBooking}</button>
                </div>
              </div>
            )}
          </div>
        )}

        {mode === "register" && (
          <div className="w-full max-w-xl bg-white/5 border border-ujjain-gold/30 rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-ujjain-gold/50">
            {!regSubmitted ? (
              <div>
                <p className="text-ujjain-cream mb-6 text-center">{t.regIntro}</p>
                <div className="flex flex-col gap-3 mb-4">
                  <input type="text" placeholder={t.fullName} aria-label={t.fullName} value={regName} onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-white/5 border border-ujjain-gold/30 rounded-lg px-4 py-3 text-ujjain-cream placeholder:text-ujjain-cream/40 focus:outline-none focus:border-ujjain-gold transition-colors duration-300" />
                  <input type="tel" placeholder={t.mobile} aria-label={t.mobile} value={regPhone} onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-white/5 border border-ujjain-gold/30 rounded-lg px-4 py-3 text-ujjain-cream placeholder:text-ujjain-cream/40 focus:outline-none focus:border-ujjain-gold transition-colors duration-300" />
                  <input type="text" placeholder={t.idNumber} aria-label={t.idNumber} value={regAadhar} onChange={(e) => setRegAadhar(e.target.value)}
                    className="w-full bg-white/5 border border-ujjain-gold/30 rounded-lg px-4 py-3 text-ujjain-cream placeholder:text-ujjain-cream/40 focus:outline-none focus:border-ujjain-gold transition-colors duration-300" />
                  <input type="text" placeholder={t.experiencePlaceholder} aria-label={t.experiencePlaceholder} value={regExperience} onChange={(e) => setRegExperience(e.target.value)}
                    className="w-full bg-white/5 border border-ujjain-gold/30 rounded-lg px-4 py-3 text-ujjain-cream placeholder:text-ujjain-cream/40 focus:outline-none focus:border-ujjain-gold transition-colors duration-300" />
                </div>
                <div className="mb-4">
                  <div className="text-ujjain-cream/80 text-sm mb-2">{t.languagesQ}</div>
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.map((lng) => (
                      <button key={lng} onClick={() => toggleFromList(regLanguages, setRegLanguages, lng)}
                        className={`px-3 py-1.5 rounded-full text-xs border transition-all duration-300 hover:-translate-y-0.5 ${regLanguages.includes(lng) ? "bg-ujjain-gold text-ujjain-dark border-ujjain-gold" : "border-ujjain-gold/30 text-ujjain-cream/80 hover:border-ujjain-gold"}`}>
                        {lng}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <div className="text-ujjain-cream/80 text-sm mb-2">{t.areasQ}</div>
                  <div className="flex flex-wrap gap-2">
                    {areaOptions.map((area) => (
                      <button key={area} onClick={() => toggleFromList(regAreas, setRegAreas, area)}
                        className={`px-3 py-1.5 rounded-full text-xs border transition-all duration-300 hover:-translate-y-0.5 ${regAreas.includes(area) ? "bg-ujjain-gold text-ujjain-dark border-ujjain-gold" : "border-ujjain-gold/30 text-ujjain-cream/80 hover:border-ujjain-gold"}`}>
                        {area}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={handleRegSubmit} disabled={!canSubmitReg || regSubmitting}
                  className="w-full bg-ujjain-gold text-ujjain-dark font-bold px-6 py-3 rounded-lg hover:bg-ujjain-saffron hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ujjain-gold/20 transition-all duration-300 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none">
                  {regSubmitting ? t.submittingApp : t.submitApp}
                </button>
                {regError && <p className="text-red-400 text-xs text-center mt-2">{regError}</p>}
                <p className="text-ujjain-cream/40 text-xs text-center mt-3">{t.privacyNote}</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-ujjain-gold mb-2">{t.receivedTitle}</h3>
                <p className="text-ujjain-cream mb-4">{t.receivedMsg(regName)}</p>
                <div className="text-ujjain-cream/60 text-xs mb-6">
                  {t.refId} {regRefId}
                </div>
                <button onClick={resetReg} className="text-ujjain-cream/60 text-sm underline hover:text-ujjain-gold transition-colors duration-300">{t.newApp}</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}