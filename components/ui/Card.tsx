/**
 * Card primitives.
 *
 * Card is the white rounded surface used throughout. Well is the slightly
 * sunken container that card groups sit inside (the feature grid in the design
 * reference). FeatureCard is the icon-tile + title + description + optional
 * link pattern.
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

interface FeatureCardProps {
  icon?: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  href,
  linkLabel = "Learn more",
  className,
}: FeatureCardProps) {
  return (
    <Card hover={Boolean(href)} className={cn("flex flex-col p-6", className)}>
      {icon && (
        <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
          <Icon name={icon} className="h-5 w-5" />
        </span>
      )}
      <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">
        {description}
      </p>
      {href && (
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-accent transition-colors hover:text-ink"
        >
          {linkLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </Card>
  );
}

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  wash?: "sky" | "peach" | "lilac" | "mint";
  className?: string;
}

const WASHES = {
  sky: "bg-wash-sky",
  peach: "bg-wash-peach",
  lilac: "bg-wash-lilac",
  mint: "bg-wash-mint",
} as const;

export function StepCard({
  step,
  title,
  description,
  wash = "peach",
  className,
}: StepCardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-border p-6",
        WASHES[wash],
        className
      )}
    >
      <span className="nums font-mono text-[0.8125rem] text-muted">
        {String(step).padStart(2, "0")}.
      </span>
      <h3 className="mt-4 text-lg font-medium tracking-[-0.01em] text-ink">
        {title}
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
        {description}
      </p>
    </div>
  );
}
