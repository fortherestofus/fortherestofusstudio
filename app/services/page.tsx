import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LIFECYCLE_CHAPTERS, getService } from "@/lib/services";
import Section, { SectionHeading } from "@/components/ui/Section";
import EyebrowChip from "@/components/ui/EyebrowChip";
import PillButton from "@/components/ui/PillButton";
import ServicesHero from "@/components/services/ServicesHero";
import ClientMarquee from "@/components/services/ClientMarquee";
import ProcessChapter from "@/components/home/ProcessChapter";
import CallToAction from "@/components/home/CallToAction";
import { cn } from "@/lib/cn";

const DESCRIPTION =
  "We build custom apps, SaaS and websites, give them an identity, and grow them with marketing, analytics and automation. A solutions and consulting studio in Johannesburg.";

export const metadata: Metadata = {
  title: "Services",
  description: DESCRIPTION,
  alternates: { canonical: "/services/" },
  openGraph: {
    title: "Services — For The Rest Of Us",
    description: DESCRIPTION,
    url: "https://fortherestofus.app/services/",
    type: "website",
  },
};

/** Pillar treatments — the same three colours the homepage grid uses. */
const PILLARS: Record<string, { mark: string; rule: string }> = {
  build: { mark: "text-accent-deep", rule: "bg-accent" },
  identity: { mark: "text-tint-amber-deep", rule: "bg-tint-amber-deep" },
  grow: { mark: "text-tint-olive-deep", rule: "bg-tint-olive-deep" },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero — the promise, and the variety behind it */}
      <section className="bg-bg pt-28 sm:pt-32">
        <div className="mx-auto w-full max-w-content px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <EyebrowChip>Services &amp; consulting</EyebrowChip>
              <h1 className="mt-6 text-balance text-[2.5rem] font-medium leading-[1.04] tracking-[-0.035em] sm:text-[3.5rem]">
                <span className="block text-ink">Build it. Name it.</span>
                <span className="block text-muted">Get it known.</span>
              </h1>
              <p className="mt-6 max-w-[50ch] text-pretty leading-relaxed text-muted sm:text-lg">
                Three things, in the order they happen. Most projects need all
                of them, and the parts you already have we leave alone.
              </p>
              <div className="mt-9">
                <PillButton href="/contact/" size="lg">
                  Start a project
                </PillButton>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ServicesHero />
            </div>
          </div>
        </div>
      </section>

      {/* The three pillars — the whole point of the page */}
      <Section id="what-we-do" tone="canvas">
        <ol className="flex flex-col">
          {LIFECYCLE_CHAPTERS.map((chapter, i) => {
            const pillar = PILLARS[chapter.key];
            return (
              <li
                key={chapter.key}
                className="grid gap-6 border-t border-border py-10 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3">
                    <span className={cn("nums text-[0.8125rem]", pillar.mark)}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className={cn("h-[3px] w-6 rounded-full", pillar.rule)}
                    />
                  </div>
                  <h2 className="mt-4 text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.025em] text-ink sm:text-[2.5rem]">
                    {chapter.title}
                  </h2>
                  <p className="mt-3 max-w-[38ch] text-pretty leading-relaxed text-muted">
                    {chapter.blurb}
                  </p>
                </div>

                <div className="lg:col-span-7">
                  <p className="max-w-[46ch] text-pretty text-[1.125rem] leading-relaxed text-ink">
                    {chapter.belief}
                  </p>
                  <ul className="mt-7 flex flex-col">
                    {chapter.serviceSlugs.map((slug) => {
                      const service = getService(slug);
                      if (!service) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/services/${slug}/`}
                            className="group flex items-center justify-between gap-6 border-b border-border py-4 transition-colors hover:border-ink"
                          >
                            <span>
                              <span className="block text-[1.0625rem] font-medium text-ink">
                                {service.title}
                              </span>
                              <span className="mt-0.5 block text-[0.9375rem] leading-relaxed text-muted">
                                {service.summary}
                              </span>
                            </span>
                            <ArrowRight className="h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </Section>

      {/* Who we have done it for */}
      <Section tone="sunken" size="sm">
        <SectionHeading
          align="left"
          eyebrow="Work delivered for"
          title="Some of the organisations we have worked with."
        />
        <ClientMarquee className="mt-8" />
      </Section>

      {/* How a project runs */}
      <ProcessChapter />

      <CallToAction
        eyebrow="Start here"
        title="Tell us what you are building."
        body="Send a short note about the problem you are trying to solve. We will tell you honestly whether we are the right studio for it, and what it would take."
        primaryLabel="Start a project"
        primaryHref="/contact/"
        secondaryLabel="See our apps"
        secondaryHref="/apps/"
      />
    </>
  );
}
