"use client";

/**
 * ProcessChapter — chapter 04. The engagement as three states (the
 * reference's discovered→saved→confirmed device, retold as identify→build→
 * grow) with one real product as the worked example: Hakkan's brief, its
 * build screen, its report with the measured result. One story told deeply
 * beats four told thinly.
 *
 * The timeline is clickable and advances on its own while in view; both are
 * off under reduced motion, which gets an instant, static swap.
 */
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Section, { SectionHeading } from "@/components/ui/Section";
import ChapterMark from "@/components/ui/ChapterMark";
import { getApp } from "@/lib/apps";
import { PROCESS_STEPS } from "@/lib/services";
import { cn } from "@/lib/cn";

const STAMPS = ["Week 0", "Week by week", "Launch onward"];
const ADVANCE_MS = 4500;

export default function ProcessChapter() {
  const reduced = useReducedMotion();
  const app = getApp("hakkan")!;
  const buildShot = app.screenshots[3]; // the create-content view
  const growShot = app.screenshots[0]; // the report view

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);

  // Auto-advance while the chapter is on screen, until the reader takes over.
  useEffect(() => {
    if (reduced || !inView || interacted) return;
    const timer = setInterval(
      () => setActive((a) => (a + 1) % PROCESS_STEPS.length),
      ADVANCE_MS
    );
    return () => clearInterval(timer);
  }, [reduced, inView, interacted]);

  const select = (i: number) => {
    setInteracted(true);
    setActive(i);
  };

  const mocks = [
    // 01 · Identify — the brief, as a document
    <div key="identify" className="flex h-full flex-col justify-center p-6 sm:p-8">
      <p className="text-[0.625rem] uppercase tracking-[0.14em] text-faint">
        The brief · {app.name}
      </p>
      <p className="mt-4 text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
        Problem
      </p>
      <p className="mt-1 text-[1.0625rem] font-medium leading-snug text-ink">
        “{app.problem}”
      </p>
      <p className="mt-5 text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
        Success looks like
      </p>
      <p className="mt-1 text-[1.0625rem] font-medium leading-snug text-ink">
        Content a reader would cite — real sources, real voices.
      </p>
    </div>,
    // 02 · Build — the real product taking shape
    <div key="build" className="relative h-full">
      <Image
        src={buildShot}
        alt={`${app.name} in the middle of a build cycle`}
        fill
        sizes="(max-width: 1024px) 92vw, 560px"
        className="object-cover object-left-top"
      />
    </div>,
    // 03 · Grow — shipped, measured, improved
    <div key="grow" className="relative h-full">
      <Image
        src={growShot}
        alt={`${app.name} report view after launch`}
        fill
        sizes="(max-width: 1024px) 92vw, 560px"
        className="object-cover object-left-top"
      />
      <div className="absolute bottom-4 left-4 rounded-full border border-border bg-surface px-3.5 py-1.5 shadow-card">
        <p className="nums text-[0.75rem] font-medium text-ink">
          Human voices in citations: 12% → 57%
        </p>
      </div>
    </div>,
  ];

  return (
    <Section tone="sunken" id="process">
      <div ref={ref}>
        <ChapterMark index={4} total={5} />
        <SectionHeading
          align="left"
          className="mt-4"
          eyebrow="How it works"
          title="From problem to product."
          subtitle="Three states, and you can always see which one we are in. Hakkan — our own research tool — shown as the worked example."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          {/* The timeline */}
          <ol className="flex flex-col lg:col-span-5">
            {PROCESS_STEPS.map((step, i) => {
              const isActive = i === active;
              return (
                <li key={step.step}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-current={isActive ? "step" : undefined}
                    className={cn(
                      "group w-full rounded-card border p-5 text-left transition-all duration-300 sm:p-6",
                      isActive
                        ? "border-border bg-surface shadow-card"
                        : "border-transparent hover:bg-surface/60"
                    )}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="flex items-baseline gap-3">
                        <span
                          className={cn(
                            "nums text-[0.8125rem]",
                            isActive ? "text-accent-deep" : "text-faint"
                          )}
                        >
                          {String(step.step).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "text-[1.125rem] font-medium tracking-[-0.01em]",
                            isActive ? "text-ink" : "text-muted"
                          )}
                        >
                          {step.title}
                        </span>
                      </span>
                      <span className="nums text-[0.75rem] text-faint">
                        {STAMPS[i]}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-2 pl-8 text-[0.9375rem] leading-relaxed transition-colors",
                        isActive ? "text-muted" : "text-faint"
                      )}
                    >
                      {step.description}
                    </p>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* The state mock */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-card border border-border bg-surface shadow-card">
              <div className="flex items-center gap-1.5 border-b border-border bg-bg px-3 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-border" />
                <span className="h-1.5 w-1.5 rounded-full bg-border" />
                <span className="h-1.5 w-1.5 rounded-full bg-border" />
                <span className="ml-2 truncate rounded-full bg-sunken px-2.5 py-0.5 text-[0.5625rem] text-faint">
                  {PROCESS_STEPS[active].title.toLowerCase()} · hakkan.app
                </span>
              </div>
              <div className="relative" style={{ aspectRatio: "16 / 10" }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {mocks[active]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
