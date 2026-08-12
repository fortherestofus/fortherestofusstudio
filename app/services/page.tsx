import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { apps } from "@/lib/apps";
import { services, PROCESS_STEPS } from "@/lib/services";
import { caseProofs } from "@/lib/proof";
import { VIGNETTES, type VignetteKey } from "@/components/services/Vignettes";
import PageHero from "@/components/layout/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import { Well, VignetteCard, ProcessStrip } from "@/components/ui/Card";
import CaseProofCard from "@/components/ui/CaseProofCard";
import AppIcon from "@/components/ui/AppIcon";
import PillButton from "@/components/ui/PillButton";
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

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Work with us"
        title="Product help"
        titleMuted="for the rest of us."
        lead="Some clients need something built. Some need to work out what to build, who it is for, and how anyone will hear about it. We do both, and most projects turn out to be a mix of the two."
      >
        <div className="flex flex-wrap gap-3">
          <PillButton href="/contact" size="lg">
            Start a project
          </PillButton>
          <PillButton
            href="#what-we-do"
            variant="ghost"
            size="lg"
            withArrow={false}
          >
            What we do
          </PillButton>
        </div>
      </PageHero>

      <Section id="what-we-do" tone="canvas" size="sm">
        <Well>
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
            {services.map((service) => {
              const Vignette = VIGNETTES[service.slug as VignetteKey];
              return (
                <VignetteCard
                  key={service.slug}
                  visual={<Vignette />}
                  title={service.title}
                  description={service.summary}
                  href={`/services/${service.slug}`}
                  linkLabel="See how it works"
                />
              );
            })}
          </div>
        </Well>
      </Section>

      <Section tone="sunken">
        <SectionHeading
          eyebrow="How we work"
          title="Identify, build, grow."
          subtitle="Three steps, run the same way whether the project is ours or yours."
        />
        <ProcessStrip steps={PROCESS_STEPS} className="mt-12 border-t-0 pt-0" />
      </Section>

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
