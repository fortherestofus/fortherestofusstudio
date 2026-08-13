"use client";

/**
 * ClientMarquee — the organisations we have delivered work for, as a slow
 * continuous rail.
 *
 * Headed "Work delivered for", not "trusted by": these marks record real
 * engagements, they are not endorsements, and the site's rule is that a
 * logo strip must never imply one (AGENTS.md). Trademarks belong to their
 * owners and appear here only to identify the work.
 *
 * The rail is duplicated once and translated by exactly half its width, so
 * the seam is invisible. Under reduced motion it stops and becomes a plain
 * wrapped list.
 */
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface ClientMark {
  src: string;
  name: string;
}

export const CLIENT_MARKS: ClientMark[] = [
  { src: "/logos/meta.png", name: "Meta" },
  { src: "/logos/ifc.jpg", name: "IFC — World Bank Group" },
  { src: "/logos/innovatr.jpg", name: "Innovatr" },
  { src: "/logos/thrifty.jpg", name: "Thrifty Adventures" },
  { src: "/logos/digify-africa.png", name: "Digify Africa" },
  { src: "/logos/energy-capital-power.png", name: "Energy Capital & Power" },
  { src: "/logos/deep-ocean.jpg", name: "Deep Ocean" },
  { src: "/logos/african-agri-council.png", name: "African Agri Council" },
  { src: "/logos/jenna-clifford.jpg", name: "Jenna Clifford" },
];

function Mark({ mark }: { mark: ClientMark }) {
  return (
    <span className="flex h-16 w-[150px] shrink-0 items-center justify-center rounded-card border border-border bg-surface p-3">
      <Image
        src={mark.src}
        alt={mark.name}
        width={120}
        height={44}
        className="h-full w-auto max-w-full object-contain"
      />
    </span>
  );
}

export default function ClientMarquee({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn("flex flex-wrap gap-3", className)}>
        {CLIENT_MARKS.map((m) => (
          <Mark key={m.src} mark={m} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        // Fade the ends so marks enter and leave rather than snapping off.
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className
      )}
    >
      <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {[...CLIENT_MARKS, ...CLIENT_MARKS].map((m, i) => (
          <Mark key={`${m.src}-${i}`} mark={m} />
        ))}
      </div>
    </div>
  );
}
