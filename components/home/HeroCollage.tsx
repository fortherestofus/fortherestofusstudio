"use client";

/**
 * HeroCollage — a moving mosaic of what the studio does (the SMS Portal
 * pattern, built with the framer-motion we already ship rather than a Lottie).
 *
 * Composition, largest to smallest:
 *   1. Desktop window  — the real Hakkan report view, the anchor tile
 *   2. Marketing dashboard — three KPIs and a bar chart, animated vectors
 *   3. Phone screen    — the real tapa home screen, deliberately small
 *   4. Content collage — photography and design work, plus copy being typed
 *   5. App marks       — CaughtSlipping and InSpiritInTruth as objects
 *
 * Real artefacts carry the two products that have screens. The dashboard and
 * the typing line are vector because the services they stand for have no
 * screenshot to take — the same boundary the service vignettes use.
 *
 * All motion is gentle, desynced, and disabled under reduced motion.
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
import {
  contentSamples,
  contentTypedLines,
  desktopShot,
  phoneShot,
} from "@/lib/homeMedia";
import { cn } from "@/lib/cn";
import AppIcon from "@/components/ui/AppIcon";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";

const TILE =
  "rounded-card border border-border bg-surface shadow-[0_10px_30px_rgba(23,21,15,0.07)]";

/** Idle float wrapper. Staggered delays keep the tiles out of lockstep. */
function Float({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        animate={
          reduced
            ? undefined
            : {
                y: [0, -6, 0],
                transition: {
                  duration: 7 + delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay,
                },
              }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** A single counting KPI. */
function Kpi({
  label,
  value,
  suffix = "",
  prefix = "",
  play,
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  play: boolean;
}) {
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!play) return;
    if (reduced) {
      setShown(value);
      return;
    }
    const controls = animate(mv, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [play, reduced, value, mv]);

  return (
    <div>
      <p className="text-[0.625rem] uppercase tracking-[0.12em] text-faint">
        {label}
      </p>
      <p className="nums mt-0.5 text-[1.0625rem] font-medium leading-none tracking-[-0.02em] text-ink">
        {prefix}
        {shown}
        {suffix}
      </p>
    </div>
  );
}

/** Marketing dashboard: three KPIs over a small growing bar chart. */
function DashboardTile() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const bars = [38, 52, 44, 68, 80, 96];

  return (
    <div ref={ref} className={cn(TILE, "p-4")}>
      <div className="flex items-center justify-between">
        <p className="text-[0.6875rem] font-medium text-ink">Campaign</p>
        <span className="rounded-full border border-border px-2 py-0.5 text-[0.5625rem] text-muted">
          90 days
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        <Kpi label="Reach" value={128} prefix="+" suffix="%" play={inView} />
        <Kpi label="Leads" value={412} play={inView} />
        <Kpi label="CPA" value={37} prefix="−" suffix="%" play={inView} />
      </div>

      <div className="mt-3.5 flex h-[46px] items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className={cn(
              "flex-1 rounded-[3px]",
              i === bars.length - 1 ? "bg-ink" : "bg-sunken"
            )}
            initial={{ height: reduced ? `${h}%` : "8%" }}
            animate={inView ? { height: `${h}%` } : undefined}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Content: real work samples plus a line of copy being written. */
function ContentTile() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [lineIndex, setLineIndex] = useState(0);
  const [typed, setTyped] = useState("");

  const full = contentTypedLines[lineIndex] ?? "";

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setTyped(contentTypedLines[0] ?? "");
      return;
    }
    let char = 0;
    const type = setInterval(() => {
      char += 1;
      setTyped(full.slice(0, char));
      if (char >= full.length) {
        clearInterval(type);
        // Hold the finished line, then move to the next one.
        setTimeout(
          () => setLineIndex((i) => (i + 1) % contentTypedLines.length),
          2200
        );
      }
    }, 55);
    return () => clearInterval(type);
  }, [inView, reduced, full]);

  const samples = contentSamples.slice(0, 2);

  return (
    <div ref={ref} className={cn(TILE, "overflow-hidden p-3")}>
      {/* Work samples */}
      <div className="grid grid-cols-2 gap-2">
        {samples.length > 0
          ? samples.map((sample) => (
              <div
                key={sample.src}
                className="relative overflow-hidden rounded-lg border border-border"
                style={{ aspectRatio: "4 / 3" }}
              >
                <Image
                  src={sample.src}
                  alt={sample.alt}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
            ))
          : [0, 1].map((i) => (
              <PlaceholderBlock
                key={i}
                ratio="browser"
                label={i === 0 ? "Photography" : "Design"}
                className="rounded-lg"
              />
            ))}
      </div>

      {/* Copy being written */}
      <div className="mt-2.5 rounded-lg border border-border bg-bg px-2.5 py-2">
        <p className="text-[0.5625rem] uppercase tracking-[0.12em] text-faint">
          Writing
        </p>
        <p className="mt-1 text-[0.75rem] font-medium leading-snug text-ink">
          {typed}
          {!reduced && (
            <motion.span
              aria-hidden
              className="ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[1px] bg-ink"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            />
          )}
        </p>
      </div>
    </div>
  );
}

/** A small app mark presented as an object. */
function MarkTile({ slug, delay }: { slug: string; delay: number }) {
  const app = getApp(slug);
  if (!app) return null;

  return (
    <Float delay={delay}>
      <Link
        href={`/apps/${app.slug}`}
        aria-label={`${app.name} — see the app`}
        className={cn(
          TILE,
          "flex aspect-square items-center justify-center transition-shadow hover:shadow-card-hover"
        )}
      >
        <AppIcon
          icon={app.icon}
          color={app.accentColor}
          label={app.name}
          size={44}
          className="rounded-xl drop-shadow-[0_6px_14px_rgba(23,21,15,0.16)]"
        />
      </Link>
    </Float>
  );
}

export default function HeroCollage() {
  const saas = getApp("hakkan")!;
  const phoneApp = getApp("tapa")!;

  return (
    <div className="mx-auto grid w-full max-w-[600px] grid-cols-12 items-start gap-3 lg:ml-auto lg:mr-0">
      {/* 1 — Desktop window, the anchor */}
      <Float delay={0} className="col-span-12 sm:col-span-8">
        <Link
          href={`/apps/${saas.slug}`}
          aria-label={`${saas.name} — see the product`}
          className={cn(TILE, "block overflow-hidden transition-shadow hover:shadow-card-hover")}
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
                alt={`${saas.name} report view`}
                fill
                sizes="(max-width: 640px) 92vw, 400px"
                className="object-cover object-top"
                priority
              />
            </div>
          ) : (
            <PlaceholderBlock
              ratio="browser"
              tint={saas.accentColor}
              label="Hakkan window"
              className="rounded-none border-0"
            />
          )}
        </Link>
      </Float>

      {/* 2 — Marketing dashboard */}
      <Float delay={0.8} className="col-span-7 sm:col-span-4">
        <DashboardTile />
      </Float>

      {/* 3 — Phone screen, small */}
      <Float delay={1.4} className="col-span-5 sm:col-span-3">
        <Link
          href={`/apps/${phoneApp.slug}`}
          aria-label={`${phoneApp.name} — see the app`}
          className={cn(TILE, "block overflow-hidden p-1.5 transition-shadow hover:shadow-card-hover")}
        >
          {phoneShot ? (
            <div
              className="relative overflow-hidden rounded-[10px]"
              style={{ aspectRatio: "9 / 16" }}
            >
              <Image
                src={phoneShot}
                alt={`${phoneApp.name} app screen`}
                fill
                sizes="(max-width: 640px) 40vw, 150px"
                className="object-cover object-top"
                priority
              />
            </div>
          ) : (
            <PlaceholderBlock
              ratio="phone"
              tint={phoneApp.accentColor}
              className="rounded-[10px] border-0"
            />
          )}
        </Link>
      </Float>

      {/* 4 — Content collage */}
      <Float delay={2} className="col-span-7 sm:col-span-6">
        <ContentTile />
      </Float>

      {/* 5 — App marks */}
      <div className="col-span-12 grid grid-cols-2 gap-3 sm:col-span-3">
        <MarkTile slug="caught-slipping" delay={2.6} />
        <MarkTile slug="inspiritintruth" delay={3.1} />
      </div>
    </div>
  );
}
