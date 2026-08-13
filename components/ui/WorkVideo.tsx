"use client";

/**
 * WorkVideo — a click-to-play recording of real work.
 *
 * Deliberately not autoplaying: these files are heavy (the Social Sweep
 * walkthrough is ~7MB) and a demo nobody asked for should not cost a
 * visitor their data. Nothing but the poster loads until the play button
 * is pressed, which also means reduced-motion needs no special case —
 * nothing moves unless the reader asks it to.
 */
import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface WorkVideoProps {
  src: string;
  poster: string;
  /** Accessible name for the play control. */
  label: string;
  caption?: string;
  className?: string;
}

export default function WorkVideo({
  src,
  poster,
  label,
  caption,
  className,
}: WorkVideoProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure
      className={cn(
        "overflow-hidden rounded-well border border-border bg-surface shadow-card",
        className
      )}
    >
      <div className="relative bg-sunken" style={{ aspectRatio: "16 / 9" }}>
        {playing ? (
          <video
            className="h-full w-full object-cover"
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <Image
              src={poster}
              alt=""
              fill
              sizes="(max-width: 1024px) 92vw, 640px"
              className="object-cover object-top"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-ink-surface/25 transition-colors duration-300 group-hover:bg-ink-surface/15"
            />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[18px] bg-ink-text/95 shadow-card transition-transform duration-300 group-hover:scale-105">
              <Play className="h-6 w-6 translate-x-[1px] fill-ink text-ink" />
            </span>
            <span className="sr-only">{label}</span>
          </button>
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
