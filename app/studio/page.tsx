import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import EyebrowChip from "@/components/ui/EyebrowChip";
import PillButton from "@/components/ui/PillButton";
import TestimonialQuote from "@/components/ui/TestimonialQuote";
import CallToAction from "@/components/home/CallToAction";
import { testimonials, clients } from "@/lib/testimonials";
import { STUDIO_STATS } from "@/lib/proof";
import { FOUNDER } from "@/lib/studio";
import { PROCESS_STEPS } from "@/lib/services";
import { identityWork, socialSweepCharts } from "@/lib/work";
import { apps } from "@/lib/apps";
import { HELLO_EMAIL } from "@/lib/contact";

const DESCRIPTION =
  "For The Rest Of Us is a solutions and consulting studio in Johannesburg. We build products that solve real problems, give them an identity, and grow their visibility.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/studio/" },
  openGraph: {
    title: "About — For The Rest Of Us",
    description: DESCRIPTION,
    url: "https://fortherestofus.app/studio/",
    type: "website",
  },
};

export default function StudioPage() {
  return (
    <>
      {/* What FTROU is */}
      <section className="bg-bg pt-28 sm:pt-36">
        <div className="mx-auto w-full max-w-content px-5 sm:px-8">
          <EyebrowChip>About the studio</EyebrowChip>
          <h1 className="mt-6 max-w-[18ch] text-balance text-[2.5rem] font-medium leading-[1.03] tracking-[-0.035em] sm:text-[3.75rem]">
            <span className="text-ink">Technology is still built for people who already understand it.</span>{" "}
            <span className="text-muted">We build for everyone else.</span>
          </h1>

          <div className="mt-12 grid gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="max-w-reading space-y-5 text-pretty text-[1.0625rem] leading-relaxed text-muted sm:text-[1.125rem]">
                <p className="text-ink">
                  For The Rest Of Us is a solutions and consulting studio in
                  Johannesburg. We build products because they solve real
                  problems — then give them an identity, and the marketing to
                  be found.
                </p>
                <p>
                  Most studios take one slice of that. A developer builds and
                  hands you a thing nobody has named. An agency names it and
                  cannot build it. A marketer arrives last and asks why it is
                  hard to sell. The gaps between them are where good ideas
                  quietly die.
                </p>
                <p>
                  So we run the whole lifecycle: identify the problem, build
                  the product, grow its visibility — with business tech, AI and
                  automation used wherever they genuinely remove work rather
                  than add software. It is deliberately a small studio. The
                  person you brief is the person who does the work.
                </p>
              </div>
            </div>

            <dl className="grid gap-8 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:gap-6">
              {STUDIO_STATS.map((stat) => (
                <div key={stat.label} className="border-t border-border pt-4">
                  <dd className="nums text-[2rem] font-medium leading-none tracking-[-0.025em] text-ink">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 text-[0.875rem] leading-snug text-muted">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* What that looks like — real work, no card stack */}
      <Section tone="canvas">
        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          <figure className="overflow-hidden rounded-card border border-border bg-surface md:col-span-2">
            <div className="relative" style={{ aspectRatio: "16 / 10" }}>
              <Image
                src={socialSweepCharts.src}
                alt={socialSweepCharts.alt}
                fill
                sizes="(max-width: 768px) 92vw, 740px"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="border-t border-border px-5 py-4 text-[0.875rem] text-muted">
              {socialSweepCharts.caption} — a research product built for a
              client, replacing a $8,000/yr licence.
            </figcaption>
          </figure>

          <figure className="overflow-hidden rounded-card border border-border bg-surface">
            <div className="relative" style={{ aspectRatio: "4 / 5" }}>
              <Image
                src={identityWork[1].src}
                alt={identityWork[1].alt}
                fill
                sizes="(max-width: 768px) 92vw, 380px"
                className="object-cover"
              />
            </div>
            <figcaption className="border-t border-border px-5 py-4 text-[0.875rem] text-muted">
              Identity work — the look and feel that makes a product
              recognisable.
            </figcaption>
          </figure>
        </div>

        {/* The lifecycle, stated once */}
        <ol className="mt-14 grid gap-8 border-t border-border pt-10 md:grid-cols-3">
          {PROCESS_STEPS.map((step) => (
            <li key={step.step}>
              <span className="nums text-[0.8125rem] text-accent-deep">
                {String(step.step).padStart(2, "0")}
              </span>
              <h2 className="mt-3 text-[1.375rem] font-medium tracking-[-0.02em] text-ink">
                {step.title}
              </h2>
              <p className="mt-2 max-w-[36ch] text-[0.9375rem] leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* The products, briefly — the proof that we run this on ourselves */}
      <Section tone="sunken" size="sm">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-[1.75rem] font-medium tracking-[-0.02em] text-ink">
            We run it on ourselves first.
          </h2>
          <Link
            href="/apps/"
            className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink"
          >
            All four products
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-8 grid gap-x-8 gap-y-1 sm:grid-cols-2">
          {apps.map((app) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}/`}
              className="group flex items-baseline justify-between gap-4 border-b border-border py-4 transition-colors hover:border-ink"
            >
              <span className="text-[1.0625rem] text-ink">{app.name}</span>
              <span className="flex-1 truncate text-right text-[0.875rem] text-muted">
                {app.problem}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* The person behind it — smaller, factual, one column */}
      <Section tone="canvas">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-card border border-border shadow-card">
              <Image
                src={FOUNDER.portrait}
                alt={FOUNDER.portraitAlt}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 60vw, 280px"
              />
            </div>
          </div>

          <div className="lg:col-span-9">
            <EyebrowChip>The person behind it</EyebrowChip>
            <h2 className="mt-5 text-[1.75rem] font-medium tracking-[-0.02em] text-ink">
              {FOUNDER.name}
            </h2>
            <p className="mt-1 text-[0.9375rem] text-muted">{FOUNDER.role}</p>

            <div className="mt-6 max-w-reading space-y-4 text-pretty leading-relaxed text-muted">
              <p>
                Twelve years across digital marketing, branding strategy and
                business technology — campaigns and content for organisations
                from Meta to the IFC, Meta-certified lead trainer at Digify
                Africa, and e-commerce, identity and analytics for brands in
                jewellery, sport, energy and agriculture.
              </p>
              <p>
                Somewhere in there the disciplines stopped being separate.
                Marketing needed design, design needed content, content needed
                automation, and all of it needed someone who could build the
                thing. So he learned to build. For The Rest Of Us is what that
                turned into.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={`mailto:${HELLO_EMAIL}`}
                className="text-[0.9375rem] font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:decoration-ink"
              >
                {HELLO_EMAIL}
              </a>
            </div>

            <div className="mt-10 border-t border-border pt-8">
              <h3 className="text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                Work delivered for
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {clients.map((client) => (
                  <li
                    key={client}
                    className="text-[0.9375rem] font-medium text-muted"
                  >
                    {client}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-10">
          <TestimonialQuote
            testimonial={testimonials[0]}
            size="lg"
            className="max-w-3xl"
          />
        </div>

        <div className="mt-10">
          <PillButton href="/services/" variant="ghost" withArrow={false}>
            What we do
          </PillButton>
        </div>
      </Section>

      <CallToAction
        eyebrow="Say hello"
        title="Come build something with us."
        body="Whether you want a product made or help working out what the product should be, start with a short note about where you are."
        primaryLabel="Start a project"
        primaryHref="/contact/"
        secondaryLabel="See our services"
        secondaryHref="/services/"
      />
    </>
  );
}
