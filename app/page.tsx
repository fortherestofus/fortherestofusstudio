import Hero from "@/components/home/Hero";
import WhyChapter from "@/components/home/WhyChapter";
import ServicesChapter from "@/components/home/ServicesChapter";
import ProcessBand from "@/components/home/ProcessBand";
import UseCasesChapter from "@/components/home/UseCasesChapter";
import TrustBand from "@/components/home/TrustBand";
import CallToAction from "@/components/home/CallToAction";

/**
 * Home — a short story, not a one-pager (docs/REDESIGN-V3.md):
 * 01 why we build (three convictions, each proven by real work)
 * 02 services — the colored centrepiece, opening into case studies
 * 03 how we work — identify, build, grow
 * 04 use cases — our own products, scrolled through one problem at a time
 * then a slim trust band and one ask. Depth lives behind the clicks.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <WhyChapter />
      <ServicesChapter />
      <ProcessBand />
      <UseCasesChapter />
      <TrustBand />
      <CallToAction
        title="Real problems. Actual products."
        body="Tell us the problem. One email gets you an honest answer about what it takes — and if we are not the right studio for it, we will say so."
        secondaryLabel="See the apps"
        secondaryHref="/apps/"
        scatter
      />
    </>
  );
}
