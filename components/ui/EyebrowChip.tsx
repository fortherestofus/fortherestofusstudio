/**
 * EyebrowChip — small outlined pill that labels a section, sitting above the
 * section headline (the "Features" / "Advantage" markers in the reference).
 */
import { cn } from "@/lib/cn";

interface EyebrowChipProps {
  children: React.ReactNode;
  tone?: "default" | "accent" | "onInk";
  className?: string;
}

const TONES = {
  default: "border-border text-muted bg-surface",
  accent: "border-transparent bg-accent-soft text-accent-deep",
  onInk: "border-ink-border text-ink-muted bg-transparent",
} as const;

export default function EyebrowChip({
  children,
  tone = "default",
  className,
}: EyebrowChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3.5 py-1.5",
        "text-[0.8125rem] leading-none",
        TONES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
