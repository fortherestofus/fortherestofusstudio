import Hero from "@/components/home/Hero";
import AppsSection from "@/components/home/AppsSection";
import ServicesSection from "@/components/home/ServicesSection";
import Testimonials from "@/components/home/Testimonials";
import StudioBand from "@/components/home/StudioBand";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <AppsSection />
      <ServicesSection />
      <Testimonials />
      <StudioBand />
      <CallToAction />
    </>
  );
}
