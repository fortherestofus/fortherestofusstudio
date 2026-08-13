"use client";

/**
 * ProcessBand — chapter 03, the lifecycle stated plainly: identify →
 * build → grow. It is the spine the whole site hangs on, so it earns a
 * band of its own rather than a footnote strip.
 *
 * The rule draws itself across the three steps as the band enters view,
 * and each step lifts in behind it. Under reduced motion everything is
 * simply already there.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Section, { SectionHeading } from "@/components/ui/Section";
import ChapterMark from "@/components/ui/ChapterMark";
import { PROCESS_STEPS } from "@/lib/services";

const EASE = [0.22, 1, 0.36, 1] as const;

/** What each stage produces — the methods, in the studio's own words. */
const OUTPUT = [
  "The problem, who it costs, and what winning looks like. No proposal until that is clear.",
  "The product, and the identity that makes it recognisable. Short cycles, something visible each one.",
  "Marketing, analytics, and the automation that keeps it running without you.",
];

export default function ProcessBand() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <Section tone="sunken" id="process">
      <div ref={ref}>
        <ChapterMark index={3} total={4} />
        <SectionHeading
          align="left"
          className="mt-4"
          eyebrow="How we work"
          title="Identify. Build. Grow."
          subtitle="One lifecycle, whether the product is ours or yours — powered by business tech, AI, and automation wherever they genuinely remove work."
        />

        <div className="relative mt-12">
          {/* The rule that draws itself */}
          <motion.span
            aria-hidden
            className="absolute left-0 right-0 top-[13px] hidden h-px origin-left bg-border md:block"
            initial={reduced ? false : { scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : undefined}
            transition={{ duration: 1.1, ease: EASE }}
          />

          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.li
                key={step.step}
                className="relative"
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + i * 0.14,
                  ease: EASE,
                }}
              >
                <span className="relative z-10 flex h-7 items-center">
                  <span className="nums flex h-7 w-7 items-center justify-center rounded-[9px] bg-ink text-[0.75rem] font-medium text-bg">
                    {String(step.step).padStart(2, "0")}
                  </span>
                </span>

                <h3 className="mt-5 text-[1.5rem] font-medium tracking-[-0.02em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[38ch] text-[0.9375rem] leading-relaxed text-muted">
                  {OUTPUT[i]}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        <Link
          href="/services/"
          className="group mt-12 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink"
        >
          See how a project actually runs
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  );
}
