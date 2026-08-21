"use client";

/**
 * The artefacts that prove the three convictions in the why chapter.
 * All three are real work: a client rebuild, the identity shelf, and two
 * campaigns with different business goals. Motion is gentle, pauses on
 * hover, and stops entirely under reduced motion.
 */
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { identityWork, siteRedesign } from "@/lib/work";
import { caseProofs } from "@/lib/proof";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Cycle an index while in view, unless the reader is hovering or reduced. */
function useCycle(length: number, ms: number, enabled = true) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15%" });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || !enabled || !inView || paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % length), ms);
    return () => clearInterval(timer);
  }, [reduced, enabled, inView, paused, length, ms]);

  return { ref, index, setIndex, setPaused };
}

/* ── 01 · A problem worth solving ─────────────────────────────────────
   A consumer insights client's homepage before and after the rebuild. The problem is the
   "before"; the product is the "after". Nothing states the case better. */
export function RedesignArtefact() {
  const { ref, index, setIndex, setPaused } = useCycle(2, 3200);
  const shots = [siteRedesign.before, siteRedesign.after];
  const labels = ["Before", "After"];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="overflow-hidden rounded-card border border-border bg-surface"
    >
      <div className="relative" style={{ aspectRatio: "16 / 10" }}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Image
              src={shots[index].src}
              alt={shots[index].alt}
              fill
              sizes="(max-width: 768px) 92vw, 380px"
              className="object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <p className="text-[0.75rem] leading-snug text-muted">
          Consumer insights client — site rebuilt around what buyers actually needed
        </p>
        <div className="flex shrink-0 gap-1">
          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className={cn(
                "rounded-full px-2.5 py-1 text-[0.6875rem] font-medium transition-colors",
                i === index
                  ? "bg-ink text-bg"
                  : "border border-border text-muted hover:text-ink"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 02 · An identity ────────────────────────────────────────────────
   The identity shelf: wordmark, print, packaging, editorial, photography
   — one hand, five faces. */
export function IdentityArtefact() {
  const { ref, index, setIndex, setPaused } = useCycle(identityWork.length, 2600);
  const piece = identityWork[index];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="overflow-hidden rounded-card border border-border bg-surface"
    >
      <div className="relative bg-sunken" style={{ aspectRatio: "16 / 10" }}>
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={piece.src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <Image
              src={piece.src}
              alt={piece.alt}
              fill
              sizes="(max-width: 768px) 92vw, 380px"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <p className="truncate text-[0.75rem] text-muted">{piece.caption}</p>
        <div className="flex shrink-0 gap-1.5">
          {identityWork.map((work, i) => (
            <button
              key={work.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={work.caption}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-5 bg-ink" : "w-1.5 bg-border hover:bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 03 · Being known ────────────────────────────────────────────────
   Two campaigns, two different business goals: leads from zero, and
   reaching the people who sign. Real numbers from lib/proof.ts. */
const KNOWN = [
  {
    slug: "travel-industry",
    goal: "Goal: leads from a standing start",
    statIndexes: [0, 1],
  },
  {
    slug: "consumer-insights",
    goal: "Goal: reach the people who sign",
    statIndexes: [1, 0],
  },
];

export function KnownArtefact() {
  const { ref, index, setIndex, setPaused } = useCycle(KNOWN.length, 3600);
  const entry = KNOWN[index];
  const proof = caseProofs.find((c) => c.slug === entry.slug)!;
  const stats = entry.statIndexes.map((i) => proof.stats[i]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface"
    >
      <div className="relative flex-1 px-5 py-6" style={{ minHeight: 190 }}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={entry.slug}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-accent-deep">
              {entry.goal}
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="nums text-[1.625rem] font-medium leading-none tracking-[-0.02em] text-ink">
                    {stat.value}
                  </dd>
                  <dt className="mt-1.5 text-[0.75rem] leading-snug text-muted">
                    {stat.label}
                    {stat.detail && (
                      <span className="block text-faint">{stat.detail}</span>
                    )}
                  </dt>
                </div>
              ))}
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <p className="truncate text-[0.75rem] text-muted">
          {proof.client} · {proof.period}
        </p>
        <div className="flex shrink-0 gap-1.5">
          {KNOWN.map((k, i) => (
            <button
              key={k.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={k.goal}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-5 bg-ink" : "w-1.5 bg-border hover:bg-muted"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── The chapter's opening artefact ──────────────────────────────────
   A real site we built, filmed scrolling. Movement where a static shot
   would say nothing. */
export function SiteVideoArtefact({
  src,
  poster,
  caption,
  className,
}: {
  src: string;
  poster: string;
  caption?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-well border border-border bg-surface shadow-card",
        className
      )}
    >
      <div className="relative" style={{ aspectRatio: "16 / 9" }}>
        {reduced ? (
          <Image
            src={poster}
            alt={caption ?? "A website we designed and built"}
            fill
            sizes="(max-width: 1024px) 92vw, 520px"
            className="object-cover"
          />
        ) : (
          <video
            className="h-full w-full object-cover"
            src={src}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            aria-label={caption ?? "A website we designed and built"}
          />
        )}
      </div>
      {caption && (
        <figcaption className="border-t border-border px-4 py-3 text-[0.75rem] text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
