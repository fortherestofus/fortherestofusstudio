/**
 * ServicesChapter — chapter 03. The services/consulting arm as four lifecycle
 * cards in the same tinted geometry as the use cases: the visual rhyme is the
 * argument — what we do for ourselves is what we do for you. The fourth card
 * (automation) is the ink card, per the reference grid. Never "advice".
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section, { SectionHeading } from "@/components/ui/Section";
import ChapterMark from "@/components/ui/ChapterMark";
import PillButton from "@/components/ui/PillButton";
import { LIFECYCLE_CHAPTERS, getService } from "@/lib/services";
import { cn } from "@/lib/cn";

const TINTS: Record<string, { card: string; deep: string; body: string; link: string }> = {
  rust: {
    card: "bg-tint-rust border-border",
    deep: "text-tint-rust-deep",
    body: "text-muted",
    link: "text-ink",
  },
  amber: {
    card: "bg-tint-amber border-border",
    deep: "text-tint-amber-deep",
    body: "text-muted",
    link: "text-ink",
  },
  olive: {
    card: "bg-tint-olive border-border",
    deep: "text-tint-olive-deep",
    body: "text-muted",
    link: "text-ink",
  },
  ink: {
    card: "bg-ink-surface border-transparent",
    deep: "text-ink-muted",
    body: "text-ink-muted",
    link: "text-ink-text",
  },
};

export default function ServicesChapter() {
  return (
    <Section tone="canvas" id="services">
      <ChapterMark index={3} total={5} />
      <SectionHeading
        align="left"
        className="mt-4"
        eyebrow="Services & consulting"
        title="The same lifecycle, run for you."
        subtitle="The hands that ship our own products work on yours — building custom products and solutions, and consulting on the brand, marketing, and systems around them."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {LIFECYCLE_CHAPTERS.map((chapter, i) => {
          const tint = TINTS[chapter.tint];
          const isInk = chapter.tint === "ink";
          return (
            <div
              key={chapter.key}
              className={cn(
                "flex flex-col rounded-card border p-6 sm:p-7",
                tint.card
              )}
            >
              <div className={tint.deep}>
                <ChapterMark index={i + 1} tone={isInk ? "onInk" : "onTint"} />
              </div>

              <h3
                className={cn(
                  "mt-5 text-balance text-[1.375rem] font-medium leading-snug tracking-[-0.015em] sm:text-[1.5rem]",
                  isInk ? "text-ink-text" : tint.deep
                )}
              >
                {chapter.title}
              </h3>
              <p className={cn("mt-2.5 flex-1 text-[0.9375rem] leading-relaxed", tint.body)}>
                {chapter.blurb}
              </p>

              <ul className="mt-6 flex flex-col gap-2">
                {chapter.serviceSlugs.map((slug) => {
                  const service = getService(slug);
                  if (!service) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/services/${slug}/`}
                        className={cn(
                          "group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium",
                          tint.link
                        )}
                      >
                        {service.title}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>

      {/* The honesty cell */}
      <div className="mt-5 flex flex-col items-start justify-between gap-5 rounded-card border border-border bg-surface p-6 sm:flex-row sm:items-center sm:p-7">
        <div>
          <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
            Not sure which you need?
          </h3>
          <p className="mt-1.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
            Most projects are a mix. Tell us what you are trying to do and we
            will tell you honestly what it takes.
          </p>
        </div>
        <PillButton href="/contact/">Start a project</PillButton>
      </div>
    </Section>
  );
}
