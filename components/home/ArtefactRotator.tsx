"use client";

/**
 * ArtefactRotator — shows one wide artefact at a time, whole.
 *
 * Three landscape product screens crammed side by side become three
 * illegible slivers; each of these is a working tool and deserves the full
 * width. So they take turns instead, at their own aspect ratio. Pauses on
 * hover; reduced motion shows the first and holds.
 */
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { WorkImage } from "@/lib/work";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ArtefactRotatorProps {
  pieces: WorkImage[];
  holdMs?: number;
  /** Dot + caption colouring for a dark card. */
  onInk?: boolean;
  className?: string;
}

export default function ArtefactRotator({
  pieces,
  holdMs = 3400,
  onInk = false,
  className,
}: ArtefactRotatorProps) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || pieces.length < 2) return;
    const timer = setInterval(() => setI((n) => (n + 1) % pieces.length), holdMs);
    return () => clearInterval(timer);
  }, [reduced, paused, pieces.length, holdMs]);

  const piece = pieces[i];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn("flex h-full flex-col justify-end px-5 pt-5", className)}
    >
      <div className="flex items-center justify-between gap-4 pb-2.5">
        <p
          className={cn(
            "truncate text-[0.75rem]",
            onInk ? "text-ink-muted" : "text-muted"
          )}
        >
          {piece.caption}
        </p>
        <div className="flex shrink-0 gap-1.5">
          {pieces.map((p, n) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setI(n)}
              aria-label={p.caption ?? `View ${n + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                n === i ? "w-5" : "w-1.5",
                onInk
                  ? n === i
                    ? "bg-ink-text"
                    : "bg-ink-text/30 hover:bg-ink-text/60"
                  : n === i
                    ? "bg-ink"
                    : "bg-border hover:bg-muted"
              )}
            />
          ))}
        </div>
      </div>

      {/* One wide screen, whole — 16:9 across the set, so the frame holds. */}
      <div
        className={cn(
          "relative overflow-hidden rounded-t-[10px] border border-b-0",
          onInk ? "border-ink-border bg-ink-raised" : "border-border bg-surface"
        )}
        style={{ aspectRatio: "16 / 9" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={piece.src}
            className="absolute inset-0"
            initial={reduced ? false : { opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <Image
              src={piece.src}
              alt={piece.alt}
              fill
              sizes="(max-width: 640px) 92vw, 560px"
              className="object-contain object-top"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
