"use client";

/**
 * HeroCollage — the "moving mosaic of what we do" (SMS Portal pattern, our way).
 *
 * SMS Portal's version is an After Effects Lottie: photos as raster layers,
 * UI as animated vectors. Ours is the same recipe without the 250KB runtime:
 * real screenshots in framed tiles where an artefact exists (an app screen,
 * the Hakkan window), and small animated vector tiles where the "artefact" is
 * a service (marketing data, content). Motion is framer-motion only — gentle
 * floats and one count-up — and stops entirely under reduced motion.
 *
 * Tiles read real assets from lib/apps.ts screenshot slots and fall back to
 * labelled placeholders, so designed images drop in without layout shift.
 */
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  animate,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getApp } from "@/lib/apps";
import { cn } from "@/lib/cn";
import AppIcon from "@/components/ui/AppIcon";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";

/** Wraps a tile with an idle float. Different delays de-sync the tiles. */
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: delay * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={
          reduced
            ? undefined
            : { y: [0, -7, 0], transition: { duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay } }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Marketing-results tile: count-up metric over a drawing sparkline. */
function StatTile() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(128);
      return;
    }
    const controls = animate(value, 128, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <div
      ref={ref}
      className="rounded-card border border-border bg-surface p-4 shadow-card"
    >
      <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-faint">
        Campaign reach
      </p>
      <p className="nums mt-1 text-[1.75rem] font-medium leading-none tracking-[-0.02em] text-ink">
        +{display}%
      </p>
      <svg
        className="mt-2 w-full text-ink"
        viewBox="0 0 160 44"
        aria-hidden="true"
      >
        <motion.path
          d="M2,38 C24,36 34,30 52,27 C74,23 84,16 106,12 C124,8 140,7 158,3"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <circle cx="158" cy="3" r="3" fill="currentColor" />
      </svg>
      <p className="mt-2 text-[0.6875rem] text-muted">last 90 days</p>
    </div>
  );
}

/** Content tile: the publishing rhythm a brand system produces. */
function ContentTile() {
  const reduced = useReducedMotion();
  const chips = ["Post drafted", "Carousel queued", "Newsletter sent"];

  return (
    <div className="rounded-card border border-border bg-surface p-4 shadow-card">
      <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-faint">
        Content
      </p>
      <ul className="mt-2.5 space-y-2">
        {chips.map((chip, i) => (
          <motion.li
            key={chip}
            className="flex items-center gap-2 rounded-lg border border-border bg-bg px-2.5 py-1.5"
            initial={reduced ? undefined : { opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.22, duration: 0.4 }}
          >
            <svg
              className="h-3.5 w-3.5 shrink-0 text-ink"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M3 8.5l3.5 3.5L13 5" />
            </svg>
            <span className="text-[0.75rem] font-medium text-ink">{chip}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default function HeroCollage() {
  // Real artefacts: one phone app, the Hakkan window, one mark as an object.
  const phoneApp = getApp("tapa")!;
  const saas = getApp("hakkan")!;
  const markApp = getApp("caught-slipping")!;
  const phoneShot = phoneApp.screenshots[0];
  const saasShot = saas.screenshots[0];

  return (
    <div className="mx-auto grid w-full max-w-[560px] grid-cols-[1.1fr_1.35fr] gap-4 lg:ml-auto lg:mr-0">
      {/* Column 1 — phone app + stat tile */}
      <div className="flex flex-col justify-center gap-4">
        <Float delay={0}>
          <Link
            href={`/apps/${phoneApp.slug}`}
            aria-label={`${phoneApp.name} — see the app`}
            className="block overflow-hidden rounded-well border border-border bg-surface p-2 shadow-card transition-shadow hover:shadow-card-hover"
          >
            {phoneShot ? (
              <div
                className="relative overflow-hidden rounded-[14px]"
                style={{ aspectRatio: "9 / 16" }}
              >
                <Image
                  src={phoneShot}
                  alt={`${phoneApp.name} app screen`}
                  fill
                  sizes="(max-width: 1024px) 40vw, 220px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            ) : (
              <PlaceholderBlock
                ratio="phone"
                tint={phoneApp.accentColor}
                label={`${phoneApp.name} screen`}
                className="rounded-[14px] border-0"
              />
            )}
          </Link>
        </Float>

        <Float delay={1.2}>
          <StatTile />
        </Float>
      </div>

      {/* Column 2 — SaaS window + content tile + mark */}
      <div className="flex flex-col justify-center gap-4">
        <Float delay={0.6}>
          <Link
            href={`/apps/${saas.slug}`}
            aria-label={`${saas.name} — see the product`}
            className="block overflow-hidden rounded-well border border-border bg-surface shadow-card transition-shadow hover:shadow-card-hover"
          >
            {/* Browser chrome is a frame, not content — the content is real. */}
            <div className="flex items-center gap-1.5 border-b border-border bg-bg px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-border" />
              <span className="h-1.5 w-1.5 rounded-full bg-border" />
              <span className="h-1.5 w-1.5 rounded-full bg-border" />
              <span className="ml-2 truncate rounded-full bg-sunken px-2.5 py-0.5 text-[0.5625rem] text-faint">
                hakkan.app
              </span>
            </div>
            {saasShot ? (
              <div
                className="relative w-full"
                style={{ aspectRatio: "16 / 11" }}
              >
                <Image
                  src={saasShot}
                  alt={`${saas.name} report view`}
                  fill
                  sizes="(max-width: 1024px) 55vw, 300px"
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

        <div className="grid grid-cols-[1.5fr_1fr] items-start gap-4">
          <Float delay={1.8} className="min-w-0">
            <ContentTile />
          </Float>

          <Float delay={2.4}>
            <Link
              href={`/apps/${markApp.slug}`}
              aria-label={`${markApp.name} — see the app`}
              className={cn(
                "flex aspect-square items-center justify-center rounded-card border border-border bg-surface shadow-card",
                "transition-shadow hover:shadow-card-hover"
              )}
            >
              <AppIcon
                icon={markApp.icon}
                color={markApp.accentColor}
                label={markApp.name}
                size={56}
                className="rounded-[14px] drop-shadow-[0_8px_18px_rgba(23,21,15,0.16)]"
              />
            </Link>
          </Float>
        </div>
      </div>
    </div>
  );
}
