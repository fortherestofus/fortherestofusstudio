import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { apps } from "@/lib/apps";
import { services } from "@/lib/services";
import { caseProofs } from "@/lib/proof";
import {
  automationStillLife,
  identityWork,
  innovatrRedesign,
  marketingWork,
  socialSweepCharts,
} from "@/lib/work";
import Section, { SectionHeading } from "@/components/ui/Section";
import CaseProofCard from "@/components/ui/CaseProofCard";
import EyebrowChip from "@/components/ui/EyebrowChip";
import AppIcon from "@/components/ui/AppIcon";
import PillButton from "@/components/ui/PillButton";
import ProcessChapter from "@/components/home/ProcessChapter";
import CallToAction from "@/components/home/CallToAction";

const DESCRIPTION =
  "We build custom apps, SaaS, and websites, and consult on product and growth, brand and content, and business tech and automation. A solutions and consulting studio in Johannesburg.";

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

/** A real artefact per service, for the index list. */
const SERVICE_THUMBS: Record<string, { src: string; alt: string }> = {
  "apps-and-saas": {
    src: socialSweepCharts.src,
    alt: socialSweepCharts.alt,
  },
  websites: {
    src: innovatrRedesign.after.src,
    alt: innovatrRedesign.after.alt,
  },
  "product-and-growth": {
    src: marketingWork[0].src,
    alt: marketingWork[0].alt,
  },
  "brand-and-content": {
    src: identityWork[1].src,
    alt: identityWork[1].alt,
  },
  "tech-and-automation": {
    src: automationStillLife.src,
    alt: automationStillLife.alt,
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero — the promise, with real work behind it */}
      <section className="bg-bg pt-28 sm:pt-36">
        <div className="mx-auto w-full max-w-content px-5 sm:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <EyebrowChip>Services &amp; consulting</EyebrowChip>
              <h1 className="mt-6 text-balance text-[2.5rem] font-medium leading-[1.04] tracking-[-0.035em] sm:text-[3.5rem]">
                <span className="block text-ink">Product help</span>
                <span className="block text-muted">for the rest of us.</span>
              </h1>
              <p className="mt-6 max-w-[50ch] text-pretty leading-relaxed text-muted sm:text-lg">
                Some clients need something built. Some need to work out what to
                build, who it is for, and how anyone will hear about it. We do
                both — and most projects turn out to be a mix.
              </p>
              <div className="mt-9">
                <PillButton href="/contact/" size="lg">
                  Start a project
                </PillButton>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                <figure className="col-span-2 overflow-hidden rounded-card border border-border bg-surface">
                  <div className="relative" style={{ aspectRatio: "16 / 10" }}>
                    <Image
                      src={innovatrRedesign.after.src}
                      alt={innovatrRedesign.after.alt}
                      fill
                      sizes="(max-width: 1024px) 92vw, 460px"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </figure>
                {[identityWork[1], marketingWork[0]].map((piece) => (
                  <figure
                    key={piece.src}
                    className="overflow-hidden rounded-card border border-border bg-surface"
                  >
                    <div className="relative" style={{ aspectRatio: "1 / 1" }}>
                      <Image
                        src={piece.src}
                        alt={piece.alt}
                        fill
                        sizes="230px"
                        className="object-cover"
                      />
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The four lifecycle chapters, as the organising view */}
      <Section id="what-we-do" tone="canvas">
        <div className="grid gap-x-8 gap-y-0 lg:grid-cols-2">
          {services.map((service, i) => {
            const thumb = SERVICE_THUMBS[service.slug];
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/`}
                className="group flex items-center gap-6 border-b border-border py-6 transition-colors hover:border-ink"
              >
                <span className="nums shrink-0 text-[0.8125rem] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-[10px] border border-border bg-sunken sm:block">
                  {thumb && (
                    <Image
                      src={thumb.src}
                      alt={thumb.alt}
                      fill
                      sizes="96px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[1.25rem] font-medium tracking-[-0.015em] text-ink">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted">
                    {service.summary}
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink" />
              </Link>
            );
          })}
        </div>
      </Section>

      {/* The full process story lives here, not on the homepage. */}
      <ProcessChapter />

      <Section tone="canvas">
        <SectionHeading
          eyebrow="Proof"
          title="Real engagements, real numbers."
          subtitle="Client work we can talk about with numbers attached — including the parts that did not work."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {caseProofs.map((proof) => (
            <CaseProofCard key={proof.slug} proof={proof} />
          ))}
        </div>
      </Section>

      <Section tone="sunken" size="sm">
        <SectionHeading
          align="left"
          eyebrow="Use cases"
          title="We also build for ourselves."
          subtitle="Four products, each started as a real problem in our own lives — the working proof behind every service on this page."
        />
        <div className="mt-10 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}/`}
              className="group flex items-center gap-3 rounded-card border border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                style={{
                  backgroundColor: `color-mix(in srgb, ${app.accentColor} 15%, #ffffff)`,
                }}
              >
                <AppIcon
                  icon={app.icon}
                  color={app.accentColor}
                  label={app.name}
                  size={28}
                  className="rounded-lg"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-ink">
                  {app.name}
                </span>
                <span className="block truncate text-[0.8125rem] text-muted">
                  {app.problem}
                </span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-ink" />
            </Link>
          ))}
        </div>
      </Section>

      <CallToAction
        eyebrow="Start here"
        title="Tell us what you are building."
        body="Send a short note about the problem you are trying to solve. We will tell you honestly whether we are the right studio for it, and what it would take."
        primaryLabel="Start a project"
        primaryHref="/contact"
        secondaryLabel="See our apps"
        secondaryHref="/apps"
      />
    </>
  );
}
