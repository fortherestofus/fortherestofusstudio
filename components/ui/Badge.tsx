/**
 * Badge — small status and platform markers, typographic: a live dot plus
 * small-caps text. (The bordered pill treatment was removed with the rest
 * of the template chrome, iteration 3.) Status colours stay semantic so
 * they read on any app page regardless of accent.
 */
import type { AppStatus } from "@/lib/apps";
import { cn } from "@/lib/cn";

type BadgeVariant = "status" | "platform" | "accent";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  status?: AppStatus;
  className?: string;
}

const STATUS_STYLES: Record<AppStatus, string> = {
  "In Development": "text-[#8a6400] dark:text-[#e8bd77]",
  Beta: "text-[#2c5d8a] dark:text-[#8fbde8]",
  Live: "text-[#2f6b47] dark:text-[#7fc79c]",
};

export default function Badge({
  children,
  variant = "platform",
  status,
  className,
}: BadgeProps) {
  const base =
    "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[0.6875rem] font-medium uppercase tracking-[0.1em]";

  if (variant === "status" && status) {
    return (
      <span className={cn(base, STATUS_STYLES[status], className)}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {children}
      </span>
    );
  }

  if (variant === "accent") {
    return (
      <span className={cn(base, "text-accent-deep", className)}>
        {children}
      </span>
    );
  }

  return <span className={cn(base, "text-muted", className)}>{children}</span>;
}
