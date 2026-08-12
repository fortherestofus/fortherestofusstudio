import Hero from "@/components/home/Hero";
import WhyChapter from "@/components/home/WhyChapter";
import UseCasesChapter from "@/components/home/UseCasesChapter";
import ServicesChapter from "@/components/home/ServicesChapter";
import ProcessChapter from "@/components/home/ProcessChapter";
import ProofChapter from "@/components/home/ProofChapter";
import CallToAction from "@/components/home/CallToAction";

/**
 * Home — one story told down the page (docs/REDESIGN-V3.md):
 * the promise, the why, the use cases that prove it, the services that
 * offer it, the process that runs it, the clients it worked for, one ask.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <WhyChapter />
      <UseCasesChapter />
      <ServicesChapter />
      <ProcessChapter />
      <ProofChapter />
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
