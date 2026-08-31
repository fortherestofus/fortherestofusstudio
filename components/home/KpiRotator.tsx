"use client";

/**
 * KpiRotator — the result chip on the marketing card, cycling through real
 * measured outcomes instead of stating one forever.
 *
 * Every figure traces to lib/proof.ts and carries its client, so a rotating
 * chip never becomes a rotating claim. Colour changes with each one, which
 * is the only place on the card the palette moves. Stops on hover and under
 * reduced motion, where it simply shows the first result.
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { caseProofs } from "@/lib/proof";

const EASE = [0.22, 1, 0.36, 1] as const;
const HOLD_MS = 2600;

/**
 * Which proof stats to surface, in order, each with its own colour.
 *
 * All four are rates, not counts. A count ("742 leads") only means something
 * next to the client's size and spend, and both of those are commercial data
 * we do not publish, so it reads as trivia. A rate carries its own meaning.
 *
 * Opens on Thrifty, because the frame behind this chip is Thrifty's campaign
 * creative — a chip and a picture from two different clients read as stock.
 */
const PICKS: {
  proof: string;
  stat: number;
  bg: string;
  fg: string;
  sub: string;
}[] = [
  {
    proof: "thrifty-adventures",
    stat: 3,
    bg: "var(--color-ink-surface)",
    fg: "var(--color-ink-text)",
    sub: "var(--color-ink-text-muted)",
  },
  {
    proof: "thrifty-adventures",
    stat: 2,
    bg: "var(--color-accent)",
    fg: "var(--color-accent-ink)",
    sub: "var(--color-accent-ink)",
  },
  {
    proof: "innovatr",
    stat: 3,
    bg: "var(--tint-lime)",
    fg: "var(--tint-lime-deep)",
    sub: "var(--tint-lime-deep)",
  },
  {
    proof: "innovatr",
    stat: 1,
    bg: "var(--tint-rust)",
    fg: "var(--tint-rust-deep)",
    sub: "var(--tint-rust-deep)",
  },
];

export default function KpiRotator() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const timer = setInterval(() => setI((n) => (n + 1) % PICKS.length), HOLD_MS);
    return () => clearInterval(timer);
  }, [reduced, paused]);

  const pick = PICKS[i];
  const proof = caseProofs.find((c) => c.slug === pick.proof)!;
  const stat = proof.stats[pick.stat];

  return (
    <motion.div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="absolute bottom-3 left-3 min-w-[210px] overflow-hidden rounded-[12px] px-3.5 py-2.5 shadow-card"
      animate={{ backgroundColor: pick.bg }}
      initial={false}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${pick.proof}-${pick.stat}`}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          <p
            className="nums text-[1.25rem] font-medium leading-none tracking-[-0.02em]"
            style={{ color: pick.fg }}
          >
            {stat.value}{" "}
            <span className="text-[0.8125rem] font-normal opacity-80">
              {stat.label}
            </span>
          </p>
          <p
            className="mt-1.5 text-[0.625rem] uppercase tracking-[0.12em] opacity-70"
            style={{ color: pick.sub }}
          >
            {proof.client}
            {stat.detail ? ` · ${stat.detail}` : ""}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Which of the four you are on */}
      <div className="mt-2.5 flex gap-1">
        {PICKS.map((p, n) => (
          <span
            key={`${p.proof}-${p.stat}`}
            aria-hidden
            className="h-[3px] flex-1 rounded-full transition-opacity duration-300"
            style={{
              backgroundColor: pick.fg,
              opacity: n === i ? 0.9 : 0.25,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
