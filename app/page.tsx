import Hero from "@/components/home/Hero";
import ProofStrip from "@/components/home/ProofStrip";
import AppsSection from "@/components/home/AppsSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import StudioBand from "@/components/home/StudioBand";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <AppsSection />
      <ServicesSection />
      <ProcessSection />
      <StudioBand />
      <CallToAction />
    </>
  );
}
