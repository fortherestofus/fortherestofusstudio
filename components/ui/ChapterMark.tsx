/**
 * ChapterMark — the small "01 / 06" numeral that labels a story chapter,
 * borrowed from the reference's numbered sections. Sits above or beside a
 * section headline; tabular figures, faint, quietly insistent.
 */
import { cn } from "@/lib/cn";

interface ChapterMarkProps {
  /** 1-based chapter index. */
  index: number;
  /** Total chapters; omit to render the index alone. */
  total?: number;
  /** Render on a tinted or dark surface. */
  tone?: "default" | "onTint" | "onInk";
  className?: string;
}

const TONES = {
  default: "text-faint",
  onTint: "text-current opacity-60",
  onInk: "text-ink-muted",
} as const;

const pad = (n: number) => String(n).padStart(2, "0");

export default function ChapterMark({
  index,
  total,
  tone = "default",
  className,
}: ChapterMarkProps) {
  return (
    <span
      className={cn(
        "nums inline-flex items-baseline gap-1 text-[0.8125rem] leading-none tracking-[0.08em]",
        TONES[tone],
        className
      )}
      aria-hidden="true"
    >
      {pad(index)}
      {total !== undefined && (
        <span className="opacity-60">/ {pad(total)}</span>
      )}
    </span>
  );
}
