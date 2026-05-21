import type { AppStatus } from "@/lib/apps";

type BadgeVariant = "status" | "platform";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  status?: AppStatus;
}

const statusStyles: Record<AppStatus, string> = {
  "In Development":
    "bg-gold/15 text-[#8a6400] dark:text-gold border-gold/30",
  Beta: "bg-lime/15 text-[#4d6010] dark:text-lime border-lime/30",
  Live: "bg-pthalo/10 text-pthalo dark:bg-lime/15 dark:text-lime border-pthalo/20 dark:border-lime/30",
};

export default function Badge({
  children,
  variant = "platform",
  status,
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium font-heading tracking-wide";

  if (variant === "status" && status) {
    return (
      <span className={`${base} ${statusStyles[status]}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
        {children}
      </span>
    );
  }

  return (
    <span
      className={`${base} border-border bg-surface text-muted`}
    >
      {children}
    </span>
  );
}
