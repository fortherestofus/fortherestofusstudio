/**
 * Testimonials — real quotes from people Alroy has worked with.
 *
 * Presented as plain bordered quotes rather than floating cards: with three
 * testimonials, a wall of chrome reads as padding. Copy comes from
 * lib/testimonials.ts and must never be invented.
 */
import { testimonials, clients } from "@/lib/testimonials";
import Section, { SectionHeading } from "@/components/ui/Section";

export default function Testimonials() {
  return (
    <Section tone="sunken">
      <SectionHeading
        eyebrow="Proof"
        title="Ten years of other people's deadlines."
        subtitle="The studio is new. The work behind it is not — here is what the people who hired Alroy say about it."
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

      <div className="mt-12 border-t border-border pt-8">
        <p className="text-center text-[0.8125rem] text-faint">
          Work delivered for
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
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
    </Section>
  );
}
