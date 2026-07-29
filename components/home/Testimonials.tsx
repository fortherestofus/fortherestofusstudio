/**
 * Testimonials — real quotes from people Alroy has worked with.
 *
 * With only three, spreading them into equal cards reads as padding. One is
 * promoted to near-headline scale and the other two support it: as the count
 * goes down, prominence has to go up. Names, titles, and companies are always
 * shown in full — an unattributed quote is worth less than none.
 *
 * Copy lives in lib/testimonials.ts and must never be invented.
 */
import { testimonials } from "@/lib/testimonials";
import Section from "@/components/ui/Section";
import EyebrowChip from "@/components/ui/EyebrowChip";

export default function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <Section tone="sunken">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <EyebrowChip>In their words</EyebrowChip>

          <figure className="mt-8">
            <blockquote className="text-balance text-[1.5rem] font-medium leading-[1.25] tracking-[-0.02em] text-ink sm:text-[2rem]">
              &ldquo;{lead.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-[0.8125rem] font-medium text-bg">
                {lead.initials}
              </span>
              <span className="min-w-0">
                <span className="block font-medium text-ink">{lead.name}</span>
                <span className="block text-[0.875rem] text-muted">
                  {lead.title}, {lead.company}
                </span>
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="flex flex-col justify-center gap-8 lg:col-span-5">
          {rest.map((t) => (
            <figure key={t.name} className="border-t border-border pt-7">
              <blockquote className="text-pretty text-[0.9375rem] leading-relaxed text-ink">
                {t.quote}
              </blockquote>
              <figcaption className="mt-4 text-[0.875rem] text-muted">
                <span className="font-medium text-ink">{t.name}</span>
                {" — "}
                {t.title}, {t.company}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
