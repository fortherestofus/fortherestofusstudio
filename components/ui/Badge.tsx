/**
 * Badge — small status and platform markers.
 *
 * Status colours are semantic (not brand) so they stay readable on any app
 * page regardless of that app's accent.
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
  "In Development":
    "border-[#e8c99a] bg-[#fbf1e0] text-[#8a6400] dark:border-[#8a6400]/40 dark:bg-[#8a6400]/15 dark:text-[#e8bd77]",
  Beta: "border-[#a9c9e8] bg-[#e4eef7] text-[#2c5d8a] dark:border-[#2c5d8a]/40 dark:bg-[#2c5d8a]/15 dark:text-[#8fbde8]",
  Live: "border-[#a8d5bb] bg-[#e3f1e8] text-[#2f6b47] dark:border-[#2f6b47]/40 dark:bg-[#2f6b47]/15 dark:text-[#7fc79c]",
};

export default function Badge({
  children,
  variant = "platform",
  status,
  className,
}: BadgeProps) {
  const base =
    "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium";

  if (variant === "status" && status) {
    return (
      <span className={cn(base, STATUS_STYLES[status], className)}>
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
        {children}
      </span>
    );
  }

  if (variant === "accent") {
    return (
      <span
        className={cn(base, "border-transparent bg-accent-soft text-accent", className)}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(base, "border-border bg-surface text-muted", className)}
    >
      {children}
    </span>
  );
}
