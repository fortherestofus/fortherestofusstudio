/**
 * ProofChapter — chapter 05. Client results with the honest bits included,
 * two real quotes beside the numbers they verify, then the signed founder
 * note (the highest-leverage pattern for a one-person studio: "small" told
 * as the differentiator, with a real face on it).
 */
import Image from "next/image";
import Section, { SectionHeading } from "@/components/ui/Section";
import ChapterMark from "@/components/ui/ChapterMark";
import TestimonialQuote from "@/components/ui/TestimonialQuote";
import PillButton from "@/components/ui/PillButton";
import EyebrowChip from "@/components/ui/EyebrowChip";
import { Card } from "@/components/ui/Card";
import { caseProofs } from "@/lib/proof";
import { testimonials, clients } from "@/lib/testimonials";
import { FOUNDER } from "@/lib/studio";

export default function ProofChapter() {
  return (
    <Section tone="canvas" id="proof">
      <ChapterMark index={5} total={5} />
      <SectionHeading
        align="left"
        className="mt-4"
        eyebrow="Client work"
        title="Real clients. Real numbers."
        subtitle="Engagements we can talk about with numbers attached — including the parts that did not work. A scorecard that only ever shows wins is a brochure."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-5">
        {caseProofs.map((proof) => (
          <Card key={proof.slug} className="flex flex-col p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
                {proof.client}
              </h3>
              <span className="nums shrink-0 rounded-full border border-border px-2.5 py-1 text-[0.6875rem] text-muted">
                {proof.period}
              </span>
            </div>
            <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted">
              {proof.engagement}
            </p>

            <dl className="mt-6 flex flex-1 flex-col gap-4">
              {proof.stats.map((stat) => (
                <div key={stat.label} className="border-t border-border pt-3.5">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="nums block text-[1.5rem] font-medium leading-none tracking-[-0.02em] text-ink">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] text-muted">
                      {stat.label}
                      {stat.detail && (
                        <span className="text-faint"> · {stat.detail}</span>
                      )}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {proof.note && (
              <p className="mt-5 border-t border-dashed border-border pt-4 text-[0.8125rem] leading-relaxed text-muted">
                {proof.note}
              </p>
            )}
          </Card>
        ))}
      </div>

      {/* The voices next to the numbers */}
      <div className="mt-14 grid gap-10 border-t border-border pt-10 md:grid-cols-2 md:gap-8">
        <TestimonialQuote testimonial={testimonials[1]} />
        <TestimonialQuote testimonial={testimonials[2]} />
      </div>

      {/* The founder note */}
      <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="overflow-hidden rounded-card border border-border shadow-card">
            <Image
              src={FOUNDER.portrait}
              alt={FOUNDER.portraitAlt}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 92vw, 380px"
            />
          </div>
          <p className="mt-4 text-sm">
            <span className="block font-medium text-ink">{FOUNDER.name}</span>
            <span className="block text-muted">{FOUNDER.role}</span>
          </p>
        </div>

        <div className="lg:col-span-8">
          <EyebrowChip>From the founder</EyebrowChip>
          <div className="mt-6 flex max-w-reading flex-col gap-5">
            {FOUNDER.note.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-pretty text-[1.0625rem] leading-relaxed text-ink sm:text-[1.125rem]"
              >
                {paragraph}
              </p>
            ))}
            <p className="text-[1.0625rem] font-medium text-ink">
              {FOUNDER.signoff}
            </p>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
              Work delivered for
            </h3>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
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

          <PillButton
            href="/studio/"
            variant="ghost"
            withArrow={false}
            className="mt-8"
          >
            More about the studio
          </PillButton>
        </div>
      </div>
    </Section>
  );
}
