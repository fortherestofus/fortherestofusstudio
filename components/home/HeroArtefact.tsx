"use client";

/**
 * HeroArtefact — the single floating artefact beside the hero copy (the
 * reference floats exactly one product card; five tiles diluted the promise).
 *
 * Composition: the real Hakkan window as the anchor, with one small campaign
 * card overlapping its corner — build and grow in a single object. The
 * campaign numbers are real (Thrifty Adventures, LinkedIn) and attributed;
 * an unattributed dashboard reads as decoration.
 *
 * Motion: entrance + a slow idle float, both off under reduced motion.
 */
import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getApp } from "@/lib/apps";
import { desktopShot } from "@/lib/homeMedia";
import { cn } from "@/lib/cn";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";

const TILE =
  "rounded-card border border-border bg-surface shadow-[0_10px_30px_rgba(23,21,15,0.07)]";

/** A counting KPI; decimals allowed so real numbers stay exact. */
function Kpi({
  label,
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  play,
}: {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  play: boolean;
}) {
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!play || reduced) return;
    const controls = animate(mv, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setAnimated(v),
    });
    return () => controls.stop();
  }, [play, reduced, value, mv]);

  const shown = reduced && play ? value : animated;

  return (
    <div>
      <p className="text-[0.625rem] uppercase tracking-[0.12em] text-faint">
        {label}
      </p>
      <p className="nums mt-0.5 text-[1.0625rem] font-medium leading-none tracking-[-0.02em] text-ink">
        {prefix}
        {shown.toFixed(decimals)}
        {suffix}
      </p>
    </div>
  );
}

export default function HeroArtefact() {
  const reduced = useReducedMotion();
  const app = getApp("hakkan")!;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[560px] lg:ml-auto lg:mr-0">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={
            reduced
              ? undefined
              : {
                  y: [0, -7, 0],
                  transition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
        >
          {/* The product window */}
          <Link
            href={`/apps/${app.slug}/`}
            aria-label={`${app.name} — see the product`}
            className={cn(
              TILE,
              "block overflow-hidden transition-shadow hover:shadow-card-hover"
            )}
          >
            <div className="flex items-center gap-1.5 border-b border-border bg-bg px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-border" />
              <span className="h-1.5 w-1.5 rounded-full bg-border" />
              <span className="h-1.5 w-1.5 rounded-full bg-border" />
              <span className="ml-2 truncate rounded-full bg-sunken px-2.5 py-0.5 text-[0.5625rem] text-faint">
                hakkan.app
              </span>
            </div>
            {desktopShot ? (
              <div className="relative w-full" style={{ aspectRatio: "16 / 10" }}>
                <Image
                  src={desktopShot}
                  alt={`${app.name} report view`}
                  fill
                  sizes="(max-width: 640px) 92vw, 560px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            ) : (
              <PlaceholderBlock
                ratio="browser"
                tint={app.accentColor}
                label="Hakkan window"
                className="rounded-none border-0"
              />
            )}
          </Link>
        </motion.div>
      </motion.div>

      {/* The campaign card, overlapping — real numbers, named client */}
      <motion.div
        className="absolute -bottom-10 -left-3 w-[230px] sm:-left-8"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={
            reduced
              ? undefined
              : {
                  y: [0, -5, 0],
                  transition: {
                    duration: 6.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.2,
                  },
                }
          }
          className={cn(TILE, "p-4")}
        >
          <div className="flex items-center justify-between">
            <p className="text-[0.6875rem] font-medium text-ink">Campaign</p>
            <span className="rounded-full border border-border px-2 py-0.5 text-[0.5625rem] text-muted">
              6 months
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-2.5">
            <Kpi label="Leads" value={742} play={inView} />
            <Kpi label="CTR" value={0.97} decimals={2} suffix="%" play={inView} />
            <Kpi label="Impressions" value={4.91} decimals={2} suffix="M" play={inView} />
            <Kpi label="CPM" value={81} prefix="−" suffix="%" play={inView} />
          </div>

          <p className="mt-3 border-t border-border pt-2 text-[0.5625rem] text-faint">
            Thrifty Adventures · LinkedIn · 2025–26
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
