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
import CaseProofCard from "@/components/ui/CaseProofCard";
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
          <CaseProofCard key={proof.slug} proof={proof} />
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
