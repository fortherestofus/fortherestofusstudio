/**
 * AppJourneySection — the "how it actually happens" flow: numbered real
 * captures from one real run, a time note, and an excerpt as live text.
 *
 * The screenshots stay exactly as taken — LTE, low battery, real clock.
 * Honesty over polish is the rule (we seek God randomly), so nothing here
 * is sanitised into a marketing render.
 */
import Image from "next/image";
import type { App } from "@/lib/apps";
import Section, { SectionHeading } from "@/components/ui/Section";

export default function AppJourneySection({ app }: { app: App }) {
  const journey = app.journey;
  if (!journey) return null;

  return (
    <Section tone="sunken">
      <SectionHeading
        align="left"
        eyebrow={journey.eyebrow}
        title={journey.title}
        subtitle={journey.intro}
      />

      {/* The steps, numbered */}
      <div className="mt-12 grid gap-12 sm:grid-cols-3 sm:gap-6 lg:gap-10">
        {journey.steps.map((step, i) => (
          <div key={step.label} className="flex flex-col">
            <div className="mx-auto w-full max-w-[240px] overflow-hidden rounded-well border border-border bg-surface">
              <Image
                src={step.image}
                alt={`${app.name} — ${step.label}`}
                sizes="(max-width: 640px) 80vw, 240px"
                className="h-auto w-full"
              />
            </div>
            <div className="mx-auto mt-6 flex w-full max-w-[240px] items-start gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-medium"
                style={{
                  backgroundColor: `${app.accentColor}26`,
                  color: app.accentDeep ?? app.accentColor,
                }}
              >
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-ink">{step.label}</p>
                <p className="mt-1 text-pretty text-[0.9375rem] leading-relaxed text-muted">
                  {step.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* The clock tells the truth */}
      {journey.timeNote && (
        <p className="mt-10 text-center text-[0.9375rem] text-faint">
          {journey.timeNote}
        </p>
      )}

      {/* Excerpt as live text, not a crop */}
      {journey.excerpt && (
        <figure className="mx-auto mt-12 max-w-reading rounded-well border border-border bg-surface p-8 sm:p-10">
          <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
            {journey.excerpt.lead}
          </p>
          <blockquote
            className="mt-5 border-l-2 pl-6 font-serif text-lg leading-[1.7] text-ink"
            style={{ borderColor: app.accentColor }}
          >
            {journey.excerpt.text}
          </blockquote>
          <figcaption className="mt-5 text-[0.9375rem] text-muted">
            &ldquo;{journey.excerpt.source}&rdquo; &mdash; a tailored devotional
          </figcaption>
        </figure>
      )}
    </Section>
  );
}
