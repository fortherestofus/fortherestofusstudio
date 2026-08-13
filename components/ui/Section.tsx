/**
 * Section shell + section header.
 *
 * Section handles vertical rhythm and the content max-width so pages stay on
 * one grid. SectionHeading is the eyebrow + two-line headline + sub pattern
 * used at the top of nearly every section in the design reference.
 */
import { cn } from "@/lib/cn";
import EyebrowChip from "./EyebrowChip";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  tone?: "canvas" | "sunken" | "ink";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const TONES = {
  canvas: "bg-bg text-ink",
  sunken: "bg-sunken text-ink",
  ink: "bg-ink-surface text-ink-text",
} as const;

const SIZES = {
  sm: "py-10 sm:py-12",
  md: "py-12 sm:py-16",
  lg: "py-16 sm:py-20",
} as const;

export default function Section({
  children,
  id,
  tone = "canvas",
  size = "md",
  className,
}: SectionProps) {
  return (
    <section id={id} className={cn(TONES[tone], SIZES[size], className)}>
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  /** Rendered in muted ink under the title — the second line of the headline. */
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  onInk?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  onInk = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow && (
        <EyebrowChip tone={onInk ? "onInk" : "default"}>{eyebrow}</EyebrowChip>
      )}
      <h2
        className={cn(
          "text-balance font-medium tracking-[-0.02em]",
          "text-[2rem] leading-[1.1] sm:text-[2.75rem] lg:text-[3.25rem]",
          onInk ? "text-ink-text" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-reading text-pretty text-base leading-relaxed sm:text-lg",
            onInk ? "text-ink-muted" : "text-muted",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
