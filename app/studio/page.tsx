import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import PillButton from "@/components/ui/PillButton";
import CallToAction from "@/components/home/CallToAction";
import { testimonials, clients } from "@/lib/testimonials";
import { STUDIO_STATS } from "@/lib/proof";
import { FOUNDER } from "@/lib/studio";
import { HELLO_EMAIL } from "@/lib/contact";

const DESCRIPTION =
  "For The Rest Of Us is a solutions and consulting studio in Johannesburg run by Alroy Ndhlovu — a marketing, branding, business technology and product consultant with over twelve years of experience.";

export const metadata: Metadata = {
  title: "Studio",
  description: DESCRIPTION,
  alternates: { canonical: "/studio/" },
  openGraph: {
    title: "Studio — For The Rest Of Us",
    description: DESCRIPTION,
    url: "https://fortherestofus.app/studio/",
    type: "website",
  },
};

const PRACTICE = [
  {
    title: "Marketing that is measured",
    body: "Campaign strategy, paid and organic, analytics that answer a question rather than fill a slide. Built on twelve years of running this for other people's budgets.",
  },
  {
    title: "Brand and content direction",
    body: "Visual identity, tone of voice, and the content rhythm that keeps them alive after the launch week. Design and words treated as one job, because they fail as one.",
  },
  {
    title: "Product and engineering",
    body: "Full-stack building: mobile apps, web apps, and the subscription plumbing behind them. Four products of the studio's own are the working proof.",
  },
  {
    title: "Business tech and automation",
    body: "Auditing how work actually moves through a business, connecting the tools already paid for, and using AI where it genuinely removes a chore.",
  },
];

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="The studio"
        title="Technology is still built mostly for people who already understand it."
        titleMuted="We would rather build for everyone else."
        lead="For The Rest Of Us is a solutions and consulting studio in Johannesburg. We design and build digital products, and we consult for the people building their own."
      />

      {/* Founder */}
      <Section tone="canvas" size="sm">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-well border border-border shadow-card">
                <Image
                  src={FOUNDER.portrait}
                  alt={FOUNDER.portraitAlt}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 92vw, 460px"
                  priority
                />
              </div>
              <div className="mt-5">
                <p className="text-lg font-medium text-ink">{FOUNDER.name}</p>
                <p className="mt-1 text-[0.9375rem] text-muted">
                  {FOUNDER.role}
                </p>
                <a
                  href={`mailto:${HELLO_EMAIL}`}
                  className="mt-4 inline-block text-[0.9375rem] font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:decoration-ink"
                >
                  {HELLO_EMAIL}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="max-w-reading space-y-5 text-pretty leading-relaxed text-muted">
              <p className="text-lg text-ink">
                The studio is one person with an unusually wide toolkit. Alroy
                Ndhlovu has spent over twelve years in digital marketing,
                branding strategy, and business technology — the kind of career
                where you end up doing whatever the project actually needs.
              </p>
              <p>
                That has meant running campaigns and content for organisations
                from Meta to the IFC, training businesses across Africa as a
                Meta-certified lead trainer at Digify Africa, and handling
                e-commerce, visual identity, and analytics for brands in
                jewellery, sport, energy, and agriculture. One former client
                described him as a Swiss army knife, which is either a
                compliment or a diagnosis.
              </p>
              <p>
                Somewhere in there the tools stopped being separate. Marketing
                needed design, design needed content, content needed automation,
                and all of it needed someone who could actually build the thing.
                So he learned to build. For The Rest Of Us is what that turned
                into: a studio that can take an idea from positioning through
                design through code through launch, without handing it between
                four agencies.
              </p>
              <p>
                The studio&rsquo;s own apps came out of the same instinct.
                CaughtSlipping, InSpiritInTruth, tapa., and Hakkan were each
                built to solve a problem he had himself. They are how the studio
                stays honest: we ship, we get things wrong, we fix them, and we
                carry what we learned into the next person&rsquo;s project.
              </p>
              <p>
                It is a small studio on purpose. The person you brief is the
                person who does the work.
              </p>
            </div>

            {/* The record, in numbers (lib/proof.ts — real and sourced) */}
            <dl className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-3">
              {STUDIO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dd className="nums text-[1.75rem] font-medium leading-none tracking-[-0.02em] text-ink">
                    {stat.value}
                  </dd>
                  <dt className="mt-1.5 text-[0.8125rem] leading-snug text-muted">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="mt-10 border-t border-border pt-8">
              <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
                Work delivered for
              </h2>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
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

            <div className="mt-10">
              <PillButton href="/services" variant="ghost" withArrow={false}>
                What we do
              </PillButton>
            </div>
          </div>
        </div>
      </Section>

      {/* Practice */}
      <Section tone="sunken">
        <SectionHeading
          eyebrow="The practice"
          title="Four fields, one person to brief."
          subtitle="Most studios pick a lane. This one deliberately did not, because the problems clients actually have refuse to stay in one."
        />
        <div className="mt-12 grid gap-3 sm:gap-4 md:grid-cols-2">
          {PRACTICE.map((field) => (
            <div
              key={field.title}
              className="rounded-card border border-border bg-surface p-6"
            >
              <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
                {field.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {field.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section tone="canvas">
        <SectionHeading
          eyebrow="In their words"
          title="What working together is like."
        />
        <div className="mt-12 grid gap-3 sm:gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-card border border-border bg-surface p-6"
            >
              <blockquote className="flex-1 text-pretty text-[0.9375rem] leading-relaxed text-ink">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-[0.75rem] font-medium text-bg">
                  {t.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.9375rem] font-medium text-ink">
                    {t.name}
                  </span>
                  <span className="block truncate text-[0.8125rem] text-muted">
                    {t.title}, {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <CallToAction
        eyebrow="Say hello"
        title="Come build something with us."
        body="Whether you want a product made or help working out what the product should be, start with a short note about where you are."
        primaryLabel="Start a project"
        primaryHref="/contact"
        secondaryLabel="See our services"
        secondaryHref="/services"
      />
    </>
  );
}
