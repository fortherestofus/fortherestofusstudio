import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { apps } from "@/lib/apps";
import { getServicesByArm, PROCESS_STEPS, type Service } from "@/lib/services";
import PageHero from "@/components/layout/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import { Card, StepCard } from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import AppIcon from "@/components/ui/AppIcon";
import PillButton from "@/components/ui/PillButton";
import CallToAction from "@/components/home/CallToAction";

const DESCRIPTION =
  "We build custom apps, SaaS, and websites, and advise on product and growth, brand and content, and business tech and automation. A solutions studio in Johannesburg.";

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

function ServiceRow({ service }: { service: Service }) {
  return (
    <Card className="p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent-deep">
            <Icon name={service.icon} className="h-5 w-5" />
          </span>
          <h3 className="mt-5 text-xl font-medium tracking-[-0.01em] text-ink sm:text-2xl">
            {service.title}
          </h3>
          <p className="mt-2 text-pretty text-[0.9375rem] font-medium text-ink/70">
            {service.summary}
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted">
            {service.description}
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-card border border-border bg-sunken p-5">
            <h4 className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
              What that includes
            </h4>
            <ul className="mt-4 space-y-3">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep" />
                  <span className="text-[0.9375rem] leading-snug text-muted">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function ServicesPage() {
  const build = getServicesByArm("build");
  const advise = getServicesByArm("advise");

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
            href="#build"
            variant="ghost"
            size="lg"
            withArrow={false}
          >
            What we do
          </PillButton>
        </div>
      </PageHero>

      {/* Build */}
      <Section id="build" tone="sunken">
        <SectionHeading
          align="left"
          eyebrow="We build"
          title="Things we make for you."
          subtitle="Design and engineering handled by the same people who ship our own products, so nothing gets lost in a handoff."
        />
        <div className="mt-10 grid gap-3 sm:gap-4">
          {build.map((service) => (
            <ServiceRow key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      {/* Advise */}
      <Section id="advise" tone="canvas">
        <SectionHeading
          align="left"
          eyebrow="We advise"
          title="Product direction, not slide decks."
          subtitle="The product-management work that usually goes missing in small teams: what to build, how it should look and sound, and how the business around it runs."
        />
        <div className="mt-10 grid gap-3 sm:gap-4">
          {advise.map((service) => (
            <ServiceRow key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section tone="sunken">
        <SectionHeading
          eyebrow="How we work"
          title="Understand, build, grow."
          subtitle="Three steps, run the same way whether the project is ours or yours."
        />
        <div className="mt-12 grid gap-3 sm:gap-4 md:grid-cols-3">
          {PROCESS_STEPS.map((step) => (
            <StepCard
              key={step.step}
              step={step.step}
              title={step.title}
              description={step.description}
              wash={step.wash}
            />
          ))}
        </div>
      </Section>

      {/* Proof — we walk the walk */}
      <Section tone="canvas">
        <SectionHeading
          eyebrow="Proof"
          title="We walk the walk."
          subtitle="We do not have a wall of client logos yet. What we do have is our own shelf of products, built end to end with the same hands that would build yours."
        />
        <div className="mt-12 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}`}
              className="group flex items-center gap-3 rounded-card border border-border bg-surface p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
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
              <span className="min-w-0">
                <span className="block truncate font-medium text-ink">
                  {app.name}
                </span>
                <span className="block truncate text-[0.8125rem] text-muted">
                  {app.category}
                </span>
              </span>
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
