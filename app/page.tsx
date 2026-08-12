import Hero from "@/components/home/Hero";
import WhyChapter from "@/components/home/WhyChapter";
import ServicesChapter from "@/components/home/ServicesChapter";
import UseCasesChapter from "@/components/home/UseCasesChapter";
import TrustBand from "@/components/home/TrustBand";
import CallToAction from "@/components/home/CallToAction";

/**
 * Home — a short story, not a one-pager (docs/REDESIGN-V3.md §iteration-2):
 * the promise, the why, the services as the colored centrepiece, the apps
 * as proof of the why, a slim trust band, one ask. Depth lives behind the
 * clicks: case studies on the service pages, process on /services, the
 * founder on /studio.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <WhyChapter />
      <ServicesChapter />
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
