import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/ui/Section";
import EyebrowChip from "@/components/ui/EyebrowChip";
import PillButton from "@/components/ui/PillButton";
import TestimonialQuote from "@/components/ui/TestimonialQuote";
import StatBand from "@/components/studio/StatBand";
import ClientMarquee from "@/components/services/ClientMarquee";
import ToolMarquee from "@/components/services/ToolMarquee";
import CallToAction from "@/components/home/CallToAction";
import { testimonials } from "@/lib/testimonials";
import { STUDIO_STATS } from "@/lib/proof";
import { FOUNDER } from "@/lib/studio";
import { identityWork } from "@/lib/work";
import { HELLO_EMAIL } from "@/lib/contact";

const DESCRIPTION =
  "For The Rest Of Us is a solutions and product development consultancy in Johannesburg. We identify real problems, build products that solve them, and grow them.";

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

/*
 * Three pieces of real craft beside the intro copy, not a portfolio: the
 * page's job is to say who we are, and these say it faster than another
 * paragraph. Deliberately the hand-made end of the work — a wordmark, foiled
 * cards, a photograph — because the rest of the site is screens.
 */
const CRAFT = {
  tall: identityWork[4], // editorial photography, 4:5
  top: identityWork[1], // Deja Media gold foil, 4:3
  bottom: identityWork[0], // Legacy Lab wordmark, 16:9
};

function Craft({ piece }: { piece: (typeof identityWork)[number] }) {
  return (
    <figure className="overflow-hidden rounded-card border border-border bg-surface">
      <div
        className="relative"
        style={{ aspectRatio: `${piece.width} / ${piece.height}` }}
      >
        <Image
          src={piece.src}
          alt={piece.alt}
          fill
          sizes="(max-width: 1024px) 45vw, 260px"
          className="object-cover"
        />
      </div>
      {piece.caption && (
        <figcaption className="border-t border-border px-4 py-3 text-[0.8125rem] text-muted">
          {piece.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function StudioPage() {
  return (
    <>
      {/* What FTROU is */}
      <section className="bg-bg pt-28 sm:pt-36">
        <div className="mx-auto w-full max-w-content px-5 sm:px-8">
          <EyebrowChip>About the studio</EyebrowChip>
          <h1 className="mt-6 max-w-[18ch] text-balance text-[2.5rem] font-medium leading-[1.03] tracking-[-0.035em] sm:text-[3.75rem]">
            <span className="text-ink">
              Technology is still built for people who already understand it.
            </span>{" "}
            <span className="text-muted">We build for everyone else.</span>
          </h1>

          <div className="mt-12 grid gap-10 border-t border-border pt-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="max-w-reading space-y-5 text-pretty text-[1.0625rem] leading-relaxed text-muted sm:text-[1.125rem]">
                <p className="text-ink">
                  For The Rest Of Us is a solutions and product development
                  consultancy in Johannesburg. We identify real problems, build
                  products that solve them, and grow them.
                </p>
                <p>
                  Most firms take one slice. A developer hands you something
                  unnamed. An agency names what it cannot build. Ideas die in
                  the gaps between them.
                </p>
                <p>
                  So we run all three steps: identify the problem, build the
                  product, grow it. Business tech, AI and automation come in
                  wherever they genuinely remove work.
                </p>
                <p>
                  It is deliberately small. Projects run as a small team
                  assembled for the job, and the person who scopes your work is
                  the person who leads it through to launch. No account layer,
                  no work handed down. Your repositories, accounts and content
                  are yours from day one, documented.
                </p>
              </div>
            </div>

            {/* Craft, not portfolio — three pieces, no headline needed */}
            {/* items-start, or the grid stretches the single tall figure to
                match the stacked pair and leaves white under its caption. */}
            <div className="grid grid-cols-2 items-start gap-4 self-start lg:col-span-5">
              <Craft piece={CRAFT.tall} />
              <div className="flex flex-col gap-4">
                <Craft piece={CRAFT.top} />
                <Craft piece={CRAFT.bottom} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The numbers, as the seam between the studio and the person */}
      <Section tone="canvas">
        <StatBand stats={STUDIO_STATS} />
      </Section>

      {/* The person behind it */}
      <Section tone="sunken">
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

            <div className="mt-8">
              <a
                href={`mailto:${HELLO_EMAIL}`}
                className="text-[0.9375rem] font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:decoration-ink"
              >
                {HELLO_EMAIL}
              </a>
            </div>

            <div className="mt-10 border-t border-border pt-8">
              <TestimonialQuote
                testimonial={testimonials[0]}
                size="lg"
                className="max-w-3xl"
              />
            </div>
          </div>
        </div>
      </Section>

      {/*
        Who the work was for, and what it was built with. The client list was
        a row of plain text names here; the marks are the same record, read
        faster. "Work delivered for" — never "trusted by" (AGENTS).
      */}
      <Section tone="canvas">
        <h2 className="text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
          Work delivered for
        </h2>
        <ClientMarquee className="mt-6" />

        <div className="mt-12 border-t border-border pt-8">
          <h2 className="text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
            The tools we use
          </h2>
          <ToolMarquee className="mt-6" />
          <p className="mt-5 max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted">
            We pick per job rather than per habit — and if your stack already
            runs on something else, we build on that instead.
          </p>
        </div>

        <div className="mt-12">
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
