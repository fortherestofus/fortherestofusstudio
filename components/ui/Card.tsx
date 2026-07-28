/**
 * Card primitives.
 *
 * Card is the white rounded surface. Well is the slightly sunken container
 * that card groups sit inside (the feature grid in the design reference).
 * VignetteCard carries a mini-UI illustration above its copy; IconCard is the
 * quieter second-row treatment. ProcessStrip replaces the old pastel step
 * cards — the monotone system has no coloured washes.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import Icon from "./Icon";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-surface shadow-card",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Well({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-well border border-border bg-sunken p-3 sm:p-4",
        className
      )}
    >
      {children}
    </div>
  );
}

interface VignetteCardProps {
  /** The mini-UI illustration. Should bleed past the frame on one edge. */
  visual: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}

export function VignetteCard({
  visual,
  title,
  description,
  href,
  linkLabel = "Learn more",
  className,
}: VignetteCardProps) {
  const body = (
    <>
      <div className="relative h-[210px] overflow-hidden border-b border-border bg-bg">
        {visual}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">
          {description}
        </p>
        {href && (
          <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink transition-colors group-hover:text-accent-deep">
            {linkLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </>
  );

  const classes = cn(
    "group flex flex-col overflow-hidden rounded-card border border-border bg-surface",
    "transition-all duration-300",
    href && "hover:-translate-y-1 hover:shadow-card-hover",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    );
  }
  return <div className={classes}>{body}</div>;
}

interface IconCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}

export function IconCard({
  icon,
  title,
  description,
  href,
  linkLabel = "Learn more",
  className,
}: IconCardProps) {
  const body = (
    <>
      <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-ink text-bg">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">
        {description}
      </p>
      {href && (
        <span className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink transition-colors group-hover:text-accent-deep">
          {linkLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      )}
    </>
  );

  const classes = cn(
    "group flex flex-col rounded-card border border-border bg-surface p-6",
    "transition-all duration-300",
    href && "hover:-translate-y-1 hover:shadow-card-hover",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    );
  }
  return <div className={classes}>{body}</div>;
}

interface ProcessStripProps {
  steps: { step: number; title: string; description: string }[];
  className?: string;
}

/**
 * A slim numbered strip, not a card grid. Reads as a footnote to the section
 * above it, which is where process belongs for a studio this size.
 */
export function ProcessStrip({ steps, className }: ProcessStripProps) {
  return (
    <ol
      className={cn(
        "grid gap-8 border-t border-border pt-9 sm:gap-6 md:grid-cols-3",
        className
      )}
    >
      {steps.map((step, i) => (
        <li key={step.step} className="relative md:pr-8">
          <span className="nums grid h-7 w-7 place-items-center rounded-full border border-border bg-surface font-mono text-[0.75rem] text-muted">
            {String(step.step).padStart(2, "0")}
          </span>
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute left-9 top-3.5 hidden border-t border-dashed border-border md:block md:right-4"
            />
          )}
          <h3 className="mt-4 text-base font-medium tracking-[-0.01em] text-ink">
            {step.title}
          </h3>
          <p className="mt-1.5 max-w-[34ch] text-[0.875rem] leading-relaxed text-muted">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
