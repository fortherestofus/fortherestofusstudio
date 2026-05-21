import Hero from "@/components/home/Hero";
import MarqueeBanner from "@/components/home/MarqueeBanner";
import StudioIntro from "@/components/home/StudioIntro";
import AppCarousel from "@/components/home/AppCarousel";
import Principles from "@/components/home/Principles";
import StudioStory from "@/components/home/StudioStory";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeBanner />
      <StudioIntro />
      <AppCarousel />
      <Principles />
      <StudioStory />
      <CallToAction />
    </>
  );
}
