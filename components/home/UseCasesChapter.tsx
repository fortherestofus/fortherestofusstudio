"use client";

/**
 * UseCasesChapter — chapter 04. The reference's scroll-driven state panel,
 * applied to our own products: the page holds still while the reader moves
 * through four problems, each swapping in that app's real screen. Apps are
 * evidence of the why, never a portfolio grid — so the problem line leads
 * and the product answers it.
 *
 * Desktop gets the sticky scroll mechanic; below lg it degrades to a plain
 * stacked list, which is the honest thing to do on a small screen. Reduced
 * motion keeps the swap but drops the animation.
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/Section";
import ChapterMark from "@/components/ui/ChapterMark";
import AppIcon from "@/components/ui/AppIcon";
import Badge from "@/components/ui/Badge";
import PillButton from "@/components/ui/PillButton";
import { apps } from "@/lib/apps";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Frame width per app shape, so a phone shot never sits in a browser box. */
function frameClass(app: (typeof apps)[number]) {
  if (app.platform.some((p) => /iOS|Android/i.test(p))) return "max-w-[260px]";
  if (app.platform.some((p) => /extension/i.test(p))) return "max-w-[380px]";
  return "max-w-[620px]";
}

export default function UseCasesChapter() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /*
   * How far the reader is through the pinned track, measured off the
   * track's own rect. Framer's useScroll offsets were fighting the sticky
   * child here; a rect read is deterministic and testable, and rAF keeps
   * it to one measurement per frame.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 0.999);
      const next = Math.floor(progress * apps.length);
      setActive((current) => (current === next ? current : next));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const current = apps[active];

  return (
    <section id="use-cases" className="bg-sunken">
      {/* Heading */}
      <div className="mx-auto w-full max-w-content px-5 pt-12 sm:px-8 sm:pt-16">
        <ChapterMark index={4} total={4} tone="default" />
        <SectionHeading
          align="left"
          className="mt-4"
          eyebrow="Built by us"
          title="Problems we couldn't leave alone."
          subtitle="Four products of our own, each one a problem from our own lives that we identified, built, named and are growing. The same lifecycle we just described — run on ourselves first."
        />
      </div>

      {/* Desktop: sticky scroll-through */}
      <div ref={trackRef} className="relative hidden lg:block" style={{ height: `${apps.length * 78}vh` }}>
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-content grid-cols-12 items-center gap-14 px-8">
            {/* The list of problems */}
            <ol className="col-span-5 flex flex-col gap-2">
              {apps.map((app, i) => {
                const isActive = i === active;
                return (
                  <li key={app.slug}>
                    <Link
                      href={`/apps/${app.slug}/`}
                      className={cn(
                        "block rounded-card border p-5 transition-all duration-300",
                        isActive
                          ? "border-border bg-surface shadow-card"
                          : "border-transparent opacity-55 hover:opacity-90"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <ChapterMark index={i + 1} />
                        <AppIcon
                          icon={app.icon}
                          color={app.accentColor}
                          label={app.name}
                          size={26}
                          className="rounded-[7px]"
                        />
                        <span className="text-[0.875rem] font-medium text-ink">
                          {app.name}
                        </span>
                        {isActive && (
                          <Badge
                            variant="status"
                            status={app.status}
                            className="ml-auto"
                          >
                            {app.status}
                          </Badge>
                        )}
                      </div>
                      <p
                        className={cn(
                          "mt-3 text-balance text-[1.25rem] font-medium leading-snug tracking-[-0.015em] transition-colors",
                          isActive ? "text-ink" : "text-muted"
                        )}
                      >
                        “{app.problem}”
                      </p>
                      {isActive && (
                        <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                          {app.tagline}
                        </p>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ol>

            {/* The screen that answers it */}
            <div className="col-span-7 flex justify-center">
              <div className={cn("relative w-full", frameClass(current))}>
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={current.slug}
                    initial={reduced ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -16 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden rounded-well border border-border bg-surface shadow-card"
                    style={{
                      boxShadow: `0 20px 60px color-mix(in srgb, ${current.accentColor} 22%, transparent)`,
                    }}
                  >
                    <Image
                      src={current.screenshots[0]}
                      alt={`${current.name} screen`}
                      sizes="620px"
                      className="h-auto w-full"
                      placeholder="blur"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: a plain stacked list */}
      <div className="mx-auto grid w-full max-w-content gap-4 px-5 py-12 sm:px-8 lg:hidden">
        {apps.map((app, i) => (
          <Link
            key={app.slug}
            href={`/apps/${app.slug}/`}
            className="overflow-hidden rounded-card border border-border bg-surface shadow-card"
          >
            <div className="relative h-[190px] overflow-hidden border-b border-border bg-sunken">
              <Image
                src={app.screenshots[0]}
                alt={`${app.name} screen`}
                fill
                sizes="92vw"
                className="object-cover object-left-top"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3">
                <ChapterMark index={i + 1} />
                <AppIcon
                  icon={app.icon}
                  color={app.accentColor}
                  label={app.name}
                  size={24}
                  className="rounded-[7px]"
                />
                <span className="text-[0.875rem] font-medium text-ink">
                  {app.name}
                </span>
                <Badge variant="status" status={app.status} className="ml-auto">
                  {app.status}
                </Badge>
              </div>
              <p className="mt-3 text-pretty text-[1.125rem] font-medium leading-snug text-ink">
                “{app.problem}”
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* The turn back to the reader */}
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 px-5 pb-12 text-center sm:px-8 sm:pb-16">
        <p className="max-w-[52ch] text-pretty text-lg leading-relaxed text-ink">
          Your business has a problem like one of these. We can build yours
          the same way.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <PillButton href="/contact/">Start a project</PillButton>
          <Link
            href="/apps/"
            className="group inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-[0.9375rem] text-ink transition-colors hover:bg-surface"
          >
            Explore all apps
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
