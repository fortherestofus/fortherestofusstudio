"use client";

/**
 * StatBand — the studio's numbers, as the divider between what the studio is
 * and who runs it.
 *
 * They used to sit in a thin column beside the intro copy as three plain
 * numerals over hairlines, which read as a footnote to the paragraph next to
 * them. As a band they do the job Alroy wanted: they separate the two halves
 * of the page and carry the colour.
 *
 * Numbers count up once, when the band first comes into view. The DOM is
 * mutated directly rather than through state — a counter that re-renders the
 * tree sixty times a second for a second is a lot of React for an effect the
 * reader perceives as one motion.
 */

import { useEffect, useLayoutEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import type { ProofStat } from "@/lib/proof";
import { cn } from "@/lib/cn";

/*
 * The value is server-rendered in full so the real number is in the markup
 * for search and for no-JS, then reset to zero before the first client paint.
 * useEffect would run after paint, which is a visible flash of the final
 * number; useLayoutEffect warns during SSR, so it is swapped for the server.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const TINTS = [
  { card: "bg-tint-amber", deep: "text-tint-amber-deep" },
  { card: "bg-tint-olive", deep: "text-tint-olive-deep" },
  { card: "bg-tint-rust", deep: "text-tint-rust-deep" },
];

/** "1,200+" → prefix "", target 1200, suffix "+", grouped. */
function parse(value: string) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return null;
  const digits = match[2];
  const target = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(target)) return null;
  return {
    prefix: match[1],
    target,
    suffix: match[3],
    grouped: digits.includes(","),
  };
}

function Value({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduced = useReducedMotion();

  // Primitives, not the parsed object — a fresh object every render would
  // make the effect below re-run on every render.
  const parsed = parse(value);
  const target = parsed?.target ?? 0;
  const prefix = parsed?.prefix ?? "";
  const suffix = parsed?.suffix ?? "";
  const grouped = parsed?.grouped ?? false;
  const animatable = parsed !== null && !reduced;

  useIsomorphicLayoutEffect(() => {
    if (!animatable || !ref.current) return;
    ref.current.textContent = `${prefix}0${suffix}`;
  }, [animatable, prefix, suffix]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !animatable || !inView) return;

    const controls = animate(0, target, {
      duration: 1.2,
      // Fast out of the gate, long settle — a linear count reads mechanical.
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => {
        const rounded = Math.round(n);
        node.textContent = `${prefix}${
          grouped ? rounded.toLocaleString("en-GB") : rounded
        }${suffix}`;
      },
    });
    return () => controls.stop();
  }, [animatable, inView, target, prefix, suffix, grouped]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

export default function StatBand({
  stats,
  className,
}: {
  stats: ProofStat[];
  className?: string;
}) {
  return (
    <dl className={cn("grid gap-4 sm:gap-5 md:grid-cols-3", className)}>
      {stats.map((stat, i) => {
        const tint = TINTS[i % TINTS.length];
        return (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col rounded-card p-7 sm:p-9",
              tint.card
            )}
          >
            <dd
              className={cn(
                "nums font-medium leading-none tracking-[-0.03em]",
                "text-[3rem] sm:text-[4rem]",
                tint.deep
              )}
            >
              <Value value={stat.value} />
            </dd>
            <dt className="mt-4 text-pretty text-[1.0625rem] leading-snug text-ink/75">
              {stat.label}
              {stat.detail && (
                <span className={cn("mt-1.5 block text-[0.875rem]", tint.deep)}>
                  {stat.detail}
                </span>
              )}
            </dt>
          </div>
        );
      })}
    </dl>
  );
}
