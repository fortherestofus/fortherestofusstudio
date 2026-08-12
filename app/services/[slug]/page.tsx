import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  services,
  getService,
  getOtherServices,
  PROCESS_STEPS,
} from "@/lib/services";
import { VIGNETTES, type VignetteKey } from "@/components/services/Vignettes";
import { testimonials } from "@/lib/testimonials";
import Section, { SectionHeading } from "@/components/ui/Section";
import { ProcessStrip } from "@/components/ui/Card";
import EyebrowChip from "@/components/ui/EyebrowChip";
import PillButton from "@/components/ui/PillButton";
import Icon from "@/components/ui/Icon";
import CallToAction from "@/components/home/CallToAction";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: {
      title: `${service.seo.title} — For The Rest Of Us`,
      description: service.seo.description,
      url: `https://fortherestofus.app/services/${service.slug}/`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = getOtherServices(slug);
  const Vignette = VIGNETTES[service.slug as VignetteKey];
  // One quote next to the CTA — hesitation peaks right before the click.
  const quote = testimonials[services.indexOf(service) % testimonials.length];

  return (
    <>
      {/* Hero */}
      <section className="bg-bg pb-16 pt-28 sm:pb-20 sm:pt-36">
        <div className="mx-auto w-full max-w-content px-5 sm:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-[0.9375rem] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-6">
              <EyebrowChip>
                {service.arm === "build" ? "We build" : "We consult"}
              </EyebrowChip>
              <h1 className="mt-6 text-balance text-[2.25rem] font-medium leading-[1.06] tracking-[-0.03em] sm:text-[3rem]">
                <span className="text-ink">{service.page.title}</span>{" "}
                <span className="text-muted">{service.page.titleMuted}</span>
              </h1>
              <p className="mt-6 max-w-reading text-pretty leading-relaxed text-muted sm:text-lg">
                {service.page.lead}
              </p>
              <div className="mt-9">
                <PillButton href="/contact" size="lg">
                  Start a project
                </PillButton>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-[280px] overflow-hidden rounded-well border border-border bg-surface sm:h-[320px]">
                <Vignette />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section tone="sunken">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              eyebrow="How it works"
              title={`What ${service.title.toLowerCase()} looks like with us`}
            />
            <div className="mt-10 space-y-10">
              {service.page.sections.map((section) => (
                <div
                  key={section.heading}
                  className="border-t border-border pt-8"
                >
                  <h3 className="text-xl font-medium tracking-[-0.01em] text-ink">
                    {section.heading}
                  </h3>
                  <p className="mt-3 max-w-reading text-pretty leading-relaxed text-muted">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-card border border-border bg-surface p-6 lg:sticky lg:top-28">
              <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
                What that includes
              </h2>
              <ul className="mt-5 space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                    <span className="text-[0.9375rem] leading-snug text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-faint">
                Usually a good fit if
              </h2>
              <ul className="mt-5 space-y-3">
                {service.page.goodFit.map((item) => (
                  <li
                    key={item}
                    className="text-[0.9375rem] leading-snug text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <figure className="mt-8 border-t border-border pt-6">
                <blockquote className="text-pretty text-[0.9375rem] leading-relaxed text-ink">
                  {quote.quote}
                </blockquote>
                <figcaption className="mt-3 text-[0.8125rem] text-muted">
                  {quote.name} — {quote.title}, {quote.company}
                </figcaption>
              </figure>
            </div>
          </aside>
        </div>
      </Section>

      {/* Process */}
      <Section tone="canvas">
        <SectionHeading
          eyebrow="How we work"
          title="Understand, build, grow."
        />
        <ProcessStrip steps={PROCESS_STEPS} className="mt-12 border-t-0 pt-0" />
      </Section>

      {/* Other services */}
      <Section tone="sunken" size="sm">
        <SectionHeading align="left" eyebrow="Also from the studio" title="Other things we do" />
        <div className="mt-10 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
          {others.map((other) => (
            <Link
              key={other.slug}
              href={`/services/${other.slug}`}
              className="group flex flex-col rounded-card border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-bg">
                <Icon name={other.icon} className="h-4 w-4" />
              </span>
              <span className="mt-4 font-medium text-ink">{other.title}</span>
              <span className="mt-1.5 flex-1 text-[0.875rem] leading-relaxed text-muted">
                {other.summary}
              </span>
              <ArrowRight className="mt-4 h-4 w-4 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-ink" />
            </Link>
          ))}
        </div>
      </Section>

      <CallToAction
        eyebrow="Start here"
        title={`Need help with ${service.title.toLowerCase()}?`}
        body="Send a short note about where you are and what you are trying to reach. We will tell you honestly whether we are the right studio for it."
        primaryLabel="Start a project"
        primaryHref="/contact"
        secondaryLabel="See all services"
        secondaryHref="/services"
      />
    </>
  );
}
