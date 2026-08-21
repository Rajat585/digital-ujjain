import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import BadgeSystem from "./components/BadgeSystem";
import VoiceNarrator from "./components/VoiceNarrator";
import Footer from "./components/Footer";
import FadeIn from "./components/FadeIn";
import Hero from "./sections/Hero";
import { Gateway3D, VR360, MahakalMitra } from "./components/LazySections";
import LiveDashboard from "./sections/LiveDashboard";
import OldVsNew from "./sections/OldVsNew";
import Timeline from "./sections/Timeline";
import FutureRoadmap from "./sections/FutureRoadmap";
import Countdown from "./sections/Countdown";
import SimhasthaInfo from "./sections/SimhasthaInfo";
import SimhasthaZone from "./sections/SimhasthaZone";
// import SimhasthaSahayak from "./sections/SimhasthaSahayak";
import HotelBooking from "./sections/HotelBooking";
import SathiBooking from "./sections/SathiBooking";
import Achievements from "./sections/Achievements";
import Gallery from "./sections/Gallery";
import Leadership from "./sections/Leadership";
import SentimentWall from "./sections/SentimentWall";
import CitizenEngagement from "./sections/CitizenEngagement";
import FAQAccordion from "./components/FAQAccordion";
import StickyBookButton from "./components/StickyBookButton";

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <BadgeSystem />
      <MahakalMitra />
      <VoiceNarrator />
      <StickyBookButton />
      <main>
        <Hero />
        <Gateway3D />
        <FadeIn>
          <LiveDashboard />
        </FadeIn>
        <FadeIn>
          <OldVsNew />
        </FadeIn>
        <FadeIn>
          <Timeline />
        </FadeIn>
        <FadeIn>
          <FutureRoadmap />
        </FadeIn>
        <FadeIn>
          <Countdown />
        </FadeIn>
        <FadeIn>
          <SimhasthaInfo />
        </FadeIn>
        <FadeIn>
          <SimhasthaZone />
        </FadeIn>
        <FadeIn>
          <HotelBooking />
        </FadeIn>
        <FadeIn>
          <SathiBooking />
        </FadeIn>
        <FadeIn>
          <Achievements />
        </FadeIn>
        <FadeIn>
          <Gallery />
        </FadeIn>
        <VR360 />
        <FadeIn>
          <Leadership />
        </FadeIn>
        <FadeIn>
          <SentimentWall />
        </FadeIn>
        <FadeIn>
          <CitizenEngagement />
        </FadeIn>
        <FadeIn>
          <FAQAccordion />
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
