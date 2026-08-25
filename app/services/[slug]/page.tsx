import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { services, getService, TOOLBENCH } from "@/lib/services";
import { testimonials } from "@/lib/testimonials";
import { caseProofs } from "@/lib/proof";
import { SERVICE_SHOWCASE } from "@/lib/serviceShowcase";
import {
  automationWork,
  builtSites,
  identityWork,
  siteRedesign,
  marketingWork,
} from "@/lib/work";
import { getApp } from "@/lib/apps";
import WorkStrip from "@/components/services/WorkStrip";
import ToolMarquee from "@/components/services/ToolMarquee";
import WorkVideo from "@/components/ui/WorkVideo";
import Section, { SectionHeading } from "@/components/ui/Section";
import CaseProofCard from "@/components/ui/CaseProofCard";
import EyebrowChip from "@/components/ui/EyebrowChip";
import PillButton from "@/components/ui/PillButton";
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
      title: `${service.seo.title} · For The Rest Of Us`,
      description: service.seo.description,
      url: `https://fortherestofus.app/services/${service.slug}/`,
      type: "website",
    },
  };
}

/**
 * The hero artefact per service — each page opens on the thing it sells.
 * A vignette (simulated UI) used to sit here; real work replaced it, and
 * the mismatch (a voice-and-palette card on every page regardless of
 * subject) went with it.
 */
function heroArtefact(slug: string): { src: string; alt: string } | null {
  switch (slug) {
    case "apps-and-saas": {
      const hakkan = getApp("hakkan")!;
      return {
        src: hakkan.screenshots[0].src,
        alt: "Hakkan, a product we built and run",
      };
    }
    case "websites":
      return {
        src: siteRedesign.after.src,
        alt: siteRedesign.after.alt,
      };
    case "brand-and-content":
      return { src: identityWork[0].src, alt: identityWork[0].alt };
    case "product-and-growth":
      return { src: marketingWork[0].src, alt: marketingWork[0].alt };
    case "tech-and-automation":
      return { src: automationWork[0].src, alt: automationWork[0].alt };
    default:
      return null;
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  // One quote next to the claims — hesitation peaks right before the click.
  const quote = testimonials[services.indexOf(service) % testimonials.length];
  // The work strip and the single case this page anchors on.
  const showcase = SERVICE_SHOWCASE[slug];
  const anchorCase = showcase
    ? caseProofs.find((c) => c.slug === showcase.caseSlug)
    : undefined;
  const hero = heroArtefact(slug);

  return (
    <>
      {/* Hero — the promise, next to the thing itself */}
      <section className="bg-bg pb-12 pt-28 sm:pb-16 sm:pt-32">
        <div className="mx-auto w-full max-w-content px-5 sm:px-8">
          <Link
            href="/services/"
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
                <PillButton href="/contact/" size="lg">
                  Start a project
                </PillButton>
              </div>
            </div>

            <div className="lg:col-span-6">
              {hero && (
                <div className="relative h-[280px] overflow-hidden rounded-well border border-border bg-surface shadow-card sm:h-[340px]">
                  <Image
                    src={hero.src}
                    alt={hero.alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 560px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How it works — the explainer, with the scope beside it */}
      <Section tone="sunken">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              eyebrow="How it works"
              title={service.page.howTitle}
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
                  {quote.name} · {quote.title}, {quote.company}
                </figcaption>
              </figure>
            </div>
          </aside>
        </div>
      </Section>

      {/* The work — sites play as video; everything else is a strip */}
      {slug === "websites" ? (
        <Section tone="canvas">
          <SectionHeading
            align="left"
            eyebrow="The work"
            title="Sites we have built"
            subtitle="Filmed scrolling, because a static frame says almost nothing about a website. Press play."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {builtSites.map((site) => (
              <div key={site.src}>
                <WorkVideo
                  src={site.src}
                  poster={site.poster}
                  label={`Play the ${site.title} walkthrough`}
                />
                <p className="mt-3 text-[0.9375rem] font-medium text-ink">
                  {site.title}
                </p>
                <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-muted">
                  {site.caption}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[56ch] text-pretty text-[0.9375rem] leading-relaxed text-muted">
            There are more.{" "}
            <Link
              href="/contact/"
              className="font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:decoration-ink"
            >
              Ask for a walkthrough
            </Link>{" "}
            and we will show you the ones closest to what you are building.
          </p>
        </Section>
      ) : (
        showcase &&
        showcase.pieces.length > 0 && (
          <Section tone="canvas">
            <SectionHeading
              align="left"
              eyebrow="The work"
              title={showcase.stripTitle}
              subtitle={showcase.stripIntro}
            />
            <WorkStrip pieces={showcase.pieces} className="mt-10" />
          </Section>
        )
      )}

      {/* One case, told from this service's angle */}
      {anchorCase && (
        <Section tone="sunken">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <EyebrowChip tone={anchorCase.kind === "client" ? "default" : "accent"}>
                {anchorCase.kind === "client"
                  ? "Client case"
                  : anchorCase.kind === "venture"
                    ? "Our own venture"
                    : "Self-directed exploration"}
              </EyebrowChip>
              <h2 className="mt-5 text-balance text-[1.75rem] font-medium leading-snug tracking-[-0.02em] text-ink sm:text-[2.25rem]">
                {anchorCase.client}
              </h2>
              <p className="mt-4 max-w-[46ch] text-pretty leading-relaxed text-muted">
                {showcase?.caseAngle}
              </p>
            </div>
            <div className="lg:col-span-7">
              <CaseProofCard proof={anchorCase} />
            </div>
          </div>
        </Section>
      )}

      {/* Automation page only: the tools, framed as the case they served */}
      {slug === "tech-and-automation" && (
        <Section tone="canvas">
          <SectionHeading
            align="left"
            eyebrow="Case in point"
            title="One pipeline, four tools."
            subtitle="Innovatr's lead engine, tool by tool, and what each one actually did. The point is not these four; it is that we pick per job."
          />
          <ol className="mt-10 grid gap-x-10 gap-y-0 md:grid-cols-2">
            {TOOLBENCH.map((tool, i) => (
              <li key={tool.name} className="border-t border-border py-6">
                <div className="flex items-baseline gap-3">
                  <span className="nums text-[0.8125rem] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1.25rem] font-medium tracking-[-0.015em] text-ink">
                    {tool.name}
                  </h3>
                </div>
                <p className="mt-1 pl-8 text-[0.9375rem] font-medium text-accent-deep">
                  {tool.role}
                </p>
                <p className="mt-2 max-w-[46ch] pl-8 text-[0.9375rem] leading-relaxed text-muted">
                  {tool.detail}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 border-t border-border pt-8">
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
              The rest of the tools we use
            </h3>
            <ToolMarquee className="mt-5" />
            <p className="mt-4 max-w-[56ch] text-[0.875rem] leading-relaxed text-muted">
              We pick per job rather than per habit, and if your stack
              already runs on something else, we build on that instead.
            </p>
          </div>
        </Section>
      )}

      <CallToAction
        title={`Need help with ${service.page.ctaSubject}?`}
        body="Send a short note about where you are and what you are trying to reach. We will come back with what it would take."
        primaryLabel="Start a project"
        primaryHref="/contact/"
        secondaryLabel="See all services"
        secondaryHref="/services/"
      />
    </>
  );
}
