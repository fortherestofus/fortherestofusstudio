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
  "We identify the problem, build the product (custom apps, SaaS, websites, brand), and grow it with data-driven marketing, analytics and automation. A solutions and product development consultancy in Johannesburg.";

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

/**
 * Pillar treatments — pastel washes with their readable deep partners.
 * The plain white rows read as one large undifferentiated surface; the
 * washes give each pillar its own temperature, and the service rows lift
 * on hover like cards because they are the click targets.
 */
const PILLARS: Record<string, { card: string; deep: string }> = {
  identify: { card: "bg-tint-rust", deep: "text-tint-rust-deep" },
  build: { card: "bg-tint-amber", deep: "text-tint-amber-deep" },
  grow: { card: "bg-tint-olive", deep: "text-tint-olive-deep" },
};

/**
 * What the identify phase hands over. It carries no services, so the
 * pillar's second column would otherwise render empty — and what this
 * phase produces is the more useful answer anyway.
 */
const IDENTIFY_OUTPUTS = [
  {
    title: "A written problem statement",
    body: "What is broken, who it affects, and what success would look like.",
  },
  {
    title: "Scope, time, and cost",
    body: "Before any of it is committed, so nothing arrives as a surprise later.",
  },
  {
    title: "An honest recommendation",
    body: "Including do not build this, when that is the right answer.",
  },
];

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
                <span className="block text-ink">Identify. Build.</span>
                <span className="block text-muted">Grow.</span>
              </h1>
              <p className="mt-6 max-w-[50ch] text-pretty leading-relaxed text-muted sm:text-lg">
                Three steps, in the order they happen. Most projects need all
                three. Whatever already works, we keep.
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
        <ol className="flex flex-col gap-5">
          {LIFECYCLE_CHAPTERS.map((chapter, i) => {
            const pillar = PILLARS[chapter.key];
            return (
              <li
                key={chapter.key}
                className={cn(
                  "grid gap-8 rounded-card p-7 sm:p-9 lg:grid-cols-12 lg:gap-10",
                  pillar.card
                )}
              >
                <div className="lg:col-span-5">
                  <span className={cn("nums text-[0.8125rem]", pillar.deep)}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2
                    className={cn(
                      "mt-3 text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.025em] sm:text-[2.5rem]",
                      pillar.deep
                    )}
                  >
                    {chapter.title}
                  </h2>
                  <p className="mt-3 max-w-[38ch] text-pretty leading-relaxed text-ink/75">
                    {chapter.blurb}
                  </p>
                  <p
                    className={cn(
                      "mt-6 max-w-[40ch] border-t border-ink/10 pt-5 text-pretty text-[1.0625rem] font-medium leading-relaxed",
                      pillar.deep
                    )}
                  >
                    {chapter.belief}
                  </p>
                </div>

                {/* Identify sells nothing on its own, so its column shows
                    what the phase produces instead of a service list. */}
                {chapter.serviceSlugs.length === 0 ? (
                  <ul className="flex flex-col gap-3 self-center lg:col-span-7">
                    {IDENTIFY_OUTPUTS.map((output) => (
                      <li
                        key={output.title}
                        className="rounded-card bg-surface p-5 shadow-card"
                      >
                        <span className="block text-[1.0625rem] font-medium text-ink">
                          {output.title}
                        </span>
                        <span className="mt-0.5 block text-[0.9375rem] leading-relaxed text-muted">
                          {output.body}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                <ul className="flex flex-col gap-3 self-center lg:col-span-7">
                  {chapter.serviceSlugs.map((slug) => {
                    const service = getService(slug);
                    if (!service) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/services/${slug}/`}
                          className="group flex items-center justify-between gap-6 rounded-card bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
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
                )}
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
