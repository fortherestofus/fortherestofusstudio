"use client";

/**
 * ProcessChapter — chapter 04. The engagement as three states (the
 * reference's discovered→saved→confirmed device, retold as identify→build→
 * grow) with a different real project evidencing each state: any problem
 * can arrive (the mosaic), one of ours mid-build (Hakkan), a client
 * campaign growing (Thrifty). Originally it was Hakkan three times —
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
import { filosofeeIdentity, identityWork, marketingWork } from "@/lib/work";
import { cn } from "@/lib/cn";

const STAMPS = ["Week 0", "Week by week", "Launch onward"];
const ADVANCE_MS = 4500;

interface ProcessChapterProps {
  /** Chapter numbering when the section sits inside a numbered story. */
  chapter?: { index: number; total: number };
}

export default function ProcessChapter({ chapter }: ProcessChapterProps) {
  const reduced = useReducedMotion();
  const app = getApp("hakkan")!;
  const buildShot = app.screenshots[2]; // the infographic build view
  const growShot = marketingWork[0]; // the Thrifty campaign grid

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

  /*
   * One state, one kind of evidence — and deliberately three different
   * projects, because the point of this section is range: any problem can
   * arrive, one of our products can be mid-build, a client campaign can be
   * the thing growing.
   */
  const identifyMosaic = [
    {
      src: identityWork[4].src,
      alt: identityWork[4].alt,
      label: "A brand that needs a face",
    },
    {
      src: filosofeeIdentity[1].src,
      alt: filosofeeIdentity[1].alt,
      label: "A product that needs a market",
    },
    {
      src: marketingWork[1].src,
      alt: marketingWork[1].alt,
      label: "Research nobody reads",
    },
    {
      src: identityWork[1].src,
      alt: identityWork[1].alt,
      label: "A launch with no story",
    },
  ];

  const mocks = [
    // 01 · Identify — problems arrive in every shape
    <div key="identify" className="flex h-full flex-col p-5 sm:p-6">
      <p className="text-[0.625rem] uppercase tracking-[0.14em] text-faint">
        Problems arrive in every shape
      </p>
      <div className="mt-4 grid flex-1 grid-cols-2 gap-3">
        {identifyMosaic.map((tile) => (
          <div
            key={tile.src}
            className="relative overflow-hidden rounded-[10px] border border-border"
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes="260px"
              className="object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-ink-surface/70 px-2.5 py-1.5 text-[0.625rem] font-medium text-ink-text">
              {tile.label}
            </span>
          </div>
        ))}
      </div>
    </div>,
    // 02 · Build — one of ours, mid-cycle
    <div key="build" className="relative h-full">
      <Image
        src={buildShot}
        alt={`${app.name} in the middle of a build cycle`}
        fill
        sizes="(max-width: 1024px) 92vw, 560px"
        className="object-cover object-top"
      />
      <div className="absolute bottom-4 left-4 rounded-[10px] border border-border bg-surface px-3.5 py-1.5 shadow-card">
        <p className="text-[0.75rem] font-medium text-ink">
          Hakkan · a build cycle in progress
        </p>
      </div>
    </div>,
    // 03 · Grow — a client campaign, measured
    <div key="grow" className="relative h-full">
      <Image
        src={growShot.src}
        alt={growShot.alt}
        fill
        sizes="(max-width: 1024px) 92vw, 560px"
        className="object-cover object-top"
      />
      <div className="absolute bottom-4 left-4 rounded-[10px] bg-ink px-3.5 py-2 shadow-card">
        <p className="nums text-[0.875rem] font-medium leading-none text-bg">
          742 leads · CTR ~2× the norm
        </p>
        <p className="mt-1 text-[0.625rem] uppercase tracking-[0.12em] text-bg opacity-70">
          Thrifty Adventures · LinkedIn
        </p>
      </div>
    </div>,
  ];

  return (
    <Section tone="sunken" id="process">
      <div ref={ref}>
        {chapter && <ChapterMark index={chapter.index} total={chapter.total} />}
        <SectionHeading
          align="left"
          className={chapter ? "mt-4" : undefined}
          eyebrow="How it works"
          title="From problem to product."
          subtitle="Three states, and you can always see which one we are in. Shown here with three different projects, because the spine is the same whatever arrives."
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
                  {PROCESS_STEPS[active].title.toLowerCase()} · fortherestofus
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
