/**
 * EyebrowChip — the small label above a section headline. Typographic, not
 * a bordered pill: a small-caps label with an accent tick, the way the
 * reference labels its sections. (The pill treatment read as template UI —
 * removed at Alroy's direction, iteration 3.)
 */
import { cn } from "@/lib/cn";

interface EyebrowChipProps {
  children: React.ReactNode;
  tone?: "default" | "accent" | "onInk";
  className?: string;
}

const TONES = {
  default: "text-muted",
  accent: "text-accent-deep",
  onInk: "text-ink-muted",
} as const;

const TICK = {
  default: "bg-accent",
  accent: "bg-accent",
  onInk: "bg-ink-muted",
} as const;

export default function EyebrowChip({
  children,
  tone = "default",
  className,
}: EyebrowChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-[0.8125rem] font-medium uppercase leading-none tracking-[0.14em]",
        TONES[tone],
        className
      )}
    >
      <span
        aria-hidden
        className={cn("h-[3px] w-5 rounded-full", TICK[tone])}
      />
      {children}
    </span>
  );
}
