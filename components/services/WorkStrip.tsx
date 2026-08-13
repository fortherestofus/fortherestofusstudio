"use client";

/**
 * WorkStrip — a horizontal rail of real work for a service page.
 *
 * Each piece keeps its own shape: a phone screen stays narrow, a campaign
 * grid stays wide. Height is the constant, width follows the picture, and
 * the rail scrolls rather than cropping anything to fit. Scroll-snap and
 * arrow controls, because a rail with no affordance reads as a broken grid.
 */
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { WorkImage } from "@/lib/work";
import { cn } from "@/lib/cn";

interface WorkStripProps {
  pieces: WorkImage[];
  className?: string;
}

export default function WorkStrip({ pieces, className }: WorkStripProps) {
  const railRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setAtStart(rail.scrollLeft < 8);
    setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    const rail = railRef.current;
    if (!rail) return;
    rail.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      rail.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: dir * Math.round(rail.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <ul
        ref={railRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {pieces.map((piece) => (
          <li key={piece.src} className="shrink-0 snap-start">
            <figure className="flex h-full flex-col">
              <div className="overflow-hidden rounded-card border border-border bg-surface">
                <Image
                  src={piece.src}
                  alt={piece.alt}
                  width={piece.width}
                  height={piece.height}
                  sizes="(max-width: 640px) 70vw, 420px"
                  /* Height fixed, width automatic — nothing is cropped to
                     match a neighbour of a different shape. Capped, because
                     an extremely wide piece would otherwise run to several
                     thousand pixels at this height. */
                  className="h-[260px] w-auto max-w-[560px] object-contain sm:h-[300px]"
                />
              </div>
              {piece.caption && (
                <figcaption className="mt-2.5 max-w-[42ch] text-[0.8125rem] text-muted">
                  {piece.caption}
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      {pieces.length > 2 && (
        <div className="mt-4 flex items-center gap-2">
          {(
            [
              ["Previous work", -1, ChevronLeft, atStart],
              ["Next work", 1, ChevronRight, atEnd],
            ] as const
          ).map(([label, dir, Icon, disabled]) => (
            <button
              key={label}
              type="button"
              onClick={() => nudge(dir)}
              disabled={disabled}
              aria-label={label}
              className={cn(
                "grid h-10 w-10 place-items-center rounded-[10px] border border-border transition-colors",
                disabled
                  ? "text-faint opacity-40"
                  : "text-ink hover:bg-surface"
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
