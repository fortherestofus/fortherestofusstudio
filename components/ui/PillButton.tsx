/**
 * PillButton — the site's primary call to action.
 *
 * Ink-filled pill with an optional circular arrow chip (per the design
 * reference). Renders as a link when `href` is set, otherwise a button.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "ink" | "accent" | "ghost" | "onInk";
type Size = "md" | "lg";

interface PillButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}

const VARIANTS: Record<Variant, string> = {
  ink: "bg-ink text-bg hover:shadow-pill",
  accent: "bg-accent text-accent-ink hover:shadow-pill",
  ghost: "bg-transparent text-ink border border-border hover:bg-surface",
  onInk: "bg-ink-text text-ink-surface hover:shadow-pill",
};

const SIZES: Record<Size, string> = {
  md: "text-[0.9375rem] pl-5 pr-2 py-2 gap-3",
  lg: "text-base pl-6 pr-2.5 py-2.5 gap-4",
};

const SIZES_NO_ARROW: Record<Size, string> = {
  md: "text-[0.9375rem] px-5 py-2.5",
  lg: "text-base px-6 py-3",
};

const ARROW_CHIP: Record<Variant, string> = {
  ink: "bg-bg text-ink",
  accent: "bg-accent-ink/90 text-accent",
  ghost: "bg-ink text-bg",
  onInk: "bg-ink-surface text-ink-text",
};

export default function PillButton({
  children,
  href,
  variant = "ink",
  size = "md",
  withArrow = true,
  className,
  external,
  type = "button",
  onClick,
}: PillButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-medium",
    "transition-all duration-200 hover:-translate-y-0.5",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
    VARIANTS[variant],
    withArrow ? SIZES[size] : SIZES_NO_ARROW[size],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <span
          aria-hidden
          className={cn(
            "grid place-items-center rounded-full",
            size === "lg" ? "h-9 w-9" : "h-8 w-8",
            ARROW_CHIP[variant]
          )}
        >
          <ArrowRight className={size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5"} />
        </span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
