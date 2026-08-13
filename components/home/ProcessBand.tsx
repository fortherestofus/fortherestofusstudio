"use client";

/**
 * ProcessBand — chapter 03, the lifecycle told as the conversation it
 * actually is: identify → build → grow, played out in short exchanges
 * between a client, the studio and the build team.
 *
 * The faces are generated portraits of people who do not exist — generic
 * personas standing in for roles, never a real client or colleague. The
 * lines are likewise an illustration of how a project runs, deliberately
 * free of names, numbers and results, and the caption on the page says so.
 * That boundary is the whole point: real quotes live in
 * lib/testimonials.ts (attributed to real named people, with their
 * organisation's logo, never a generated face) and real numbers in
 * lib/proof.ts.
 *
 * Advances on its own while in view, or by clicking a stage. Reduced
 * motion shows the whole conversation at once and stops advancing.
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Section, { SectionHeading } from "@/components/ui/Section";
import ChapterMark from "@/components/ui/ChapterMark";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;
const STAGE_MS = 6200;

const CAST = {
  client: { src: "/avatars/client.jpg", name: "Client" },
  studio: { src: "/avatars/studio.jpg", name: "Us" },
  teamA: { src: "/avatars/team-a.jpg", name: "Build team" },
  teamB: { src: "/avatars/team-b.jpg", name: "Build team" },
} as const;

type Speaker = keyof typeof CAST;

interface Stage {
  key: string;
  step: string;
  title: string;
  blurb: string;
  /** Card wash + the text colour that passes on it. */
  tint: string;
  ink: string;
  line: string;
  turns: { who: Speaker; side: "left" | "right"; text: string }[];
}

const STAGES: Stage[] = [
  {
    key: "identify",
    step: "01",
    title: "Identify",
    blurb:
      "The problem, who it costs, and what winning looks like. No proposal until that is clear.",
    tint: "bg-tint-amber",
    ink: "text-tint-amber-deep",
    line: "bg-tint-amber-deep",
    turns: [
      {
        who: "client",
        side: "left",
        text: "People start our booking form and vanish halfway through. We cannot tell where.",
      },
      {
        who: "studio",
        side: "right",
        text: "Then that is the first job — finding where they go. No proposal until we can name it.",
      },
    ],
  },
  {
    key: "build",
    step: "02",
    title: "Build",
    blurb:
      "The product, and the identity that makes it recognisable. Short cycles, something visible each one.",
    tint: "bg-tint-rust",
    ink: "text-tint-rust-deep",
    line: "bg-tint-rust-deep",
    turns: [
      {
        who: "studio",
        side: "left",
        text: "Two steps instead of seven, and it remembers what you already typed.",
      },
      { who: "teamA", side: "right", text: "Let us build it." },
      {
        who: "teamB",
        side: "right",
        text: "Something you can click by the end of the week.",
      },
    ],
  },
  {
    key: "grow",
    step: "03",
    title: "Grow",
    blurb:
      "Marketing, analytics, and the automation that keeps it running without you.",
    tint: "bg-tint-olive",
    ink: "text-tint-olive-deep",
    line: "bg-tint-olive-deep",
    turns: [
      {
        who: "studio",
        side: "left",
        text: "It is live. Now we watch what people actually do with it, and fix what moves.",
      },
      { who: "client", side: "right", text: "This is what we needed." },
      {
        who: "studio",
        side: "left",
        text: "Good. Launch is the middle — here is the plan for the next quarter.",
      },
    ],
  },
];

function Avatar({ who, size = 40 }: { who: Speaker; size?: number }) {
  const person = CAST[who];
  return (
    <Image
      src={person.src}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-full border border-border"
      style={{ width: size, height: size }}
    />
  );
}

export default function ProcessBand() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25%" });
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (reduced || !inView || held) return;
    const timer = setInterval(
      () => setActive((n) => (n + 1) % STAGES.length),
      STAGE_MS
    );
    return () => clearInterval(timer);
  }, [reduced, inView, held]);

  const stage = STAGES[active];

  return (
    <Section tone="sunken" id="process">
      <div ref={ref}>
        <ChapterMark index={3} total={4} />
        <SectionHeading
          align="left"
          className="mt-4"
          eyebrow="How we work"
          title="Identify. Build. Grow."
          subtitle="One lifecycle, whether the product is ours or yours — powered by business tech, AI, and automation wherever they genuinely remove work. Here is how it sounds from the inside."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-14">
          {/* The conversation */}
          <div
            className="lg:col-span-7"
            onMouseEnter={() => setHeld(true)}
            onMouseLeave={() => setHeld(false)}
          >
            <div className="flex min-h-[340px] flex-col justify-center gap-4 rounded-well border border-border bg-surface p-6 sm:min-h-[320px] sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.ul
                  key={stage.key}
                  className="flex flex-col gap-4"
                  initial={reduced ? false : "hidden"}
                  animate="shown"
                  exit={reduced ? undefined : "gone"}
                  variants={{
                    hidden: {},
                    shown: { transition: { staggerChildren: 0.55 } },
                    gone: { opacity: 0, transition: { duration: 0.25 } },
                  }}
                >
                  {stage.turns.map((turn, i) => (
                    <motion.li
                      key={`${stage.key}-${i}`}
                      className={cn(
                        "flex items-end gap-3",
                        turn.side === "right" && "flex-row-reverse"
                      )}
                      variants={{
                        hidden: { opacity: 0, y: 14, scale: 0.97 },
                        shown: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: { duration: 0.45, ease: EASE },
                        },
                      }}
                    >
                      <Avatar who={turn.who} />
                      <span
                        className={cn(
                          "max-w-[44ch] text-pretty px-4 py-3 text-[0.9375rem] leading-relaxed",
                          turn.side === "right"
                            ? "rounded-[16px] rounded-br-[4px] bg-ink text-bg"
                            : cn(
                                "rounded-[16px] rounded-bl-[4px]",
                                stage.tint,
                                stage.ink
                              )
                        )}
                      >
                        {turn.text}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
            <p className="mt-3 text-[0.75rem] text-faint">
              An illustration of how a project runs, not a real conversation.
              Real client words are further down the page.
            </p>
          </div>

          {/* The stages, moving with it */}
          <ol className="flex flex-col gap-3 lg:col-span-5">
            {STAGES.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={on ? "step" : undefined}
                    className={cn(
                      "w-full rounded-card p-5 text-left transition-all duration-500",
                      on ? cn(s.tint, "shadow-card") : "bg-surface/60"
                    )}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className={cn(
                          "nums text-[0.8125rem]",
                          on ? s.ink : "text-faint"
                        )}
                      >
                        {s.step}
                      </span>
                      <span
                        className={cn(
                          "text-[1.25rem] font-medium tracking-[-0.015em]",
                          on ? s.ink : "text-muted"
                        )}
                      >
                        {s.title}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "mt-2 pl-8 text-[0.875rem] leading-relaxed transition-colors",
                        on ? "text-ink/75" : "text-faint"
                      )}
                    >
                      {s.blurb}
                    </p>
                    {/* Progress through the stage */}
                    <span
                      aria-hidden
                      className="mt-4 ml-8 block h-[3px] overflow-hidden rounded-full bg-ink/10"
                    >
                      <motion.span
                        className={cn("block h-full origin-left", s.line)}
                        initial={false}
                        animate={{ scaleX: on ? 1 : 0 }}
                        transition={{
                          duration: on && !reduced && !held ? STAGE_MS / 1000 : 0.3,
                          ease: "linear",
                        }}
                      />
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <Link
          href="/services/"
          className="group mt-10 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink"
        >
          See how a project actually runs
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  );
}
