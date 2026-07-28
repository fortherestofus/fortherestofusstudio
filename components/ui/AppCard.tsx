/**
 * AppCard — an app summary tile. Used on the home page and the apps index.
 *
 * The app's accent appears only as a top hairline, the icon backdrop, and the
 * hover arrow; everything else stays on the global system so a grid of cards
 * still reads as one set.
 */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { App } from "@/lib/apps";
import { cn } from "@/lib/cn";
import Badge from "@/components/ui/Badge";
import AppIcon from "@/components/ui/AppIcon";

interface AppCardProps {
  app: App;
  className?: string;
}

export default function AppCard({ app, className }: AppCardProps) {
  return (
    <Link
      href={`/apps/${app.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card border border-border bg-surface p-6",
        "shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className
      )}
    >
      {/* Accent hairline */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ backgroundColor: app.accentColor }}
      />

      <div className="flex items-start justify-between gap-4">
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
          style={{
            backgroundColor: `color-mix(in srgb, ${app.accentColor} 15%, #ffffff)`,
          }}
        >
          <AppIcon
            icon={app.icon}
            color={app.accentColor}
            label={app.name}
            size={38}
            className="rounded-xl"
          />
        </span>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
      </div>

      <h3 className="mt-5 text-lg font-medium tracking-[-0.01em] text-ink">
        {app.name}
      </h3>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-[0.9375rem] text-muted">{app.category}</span>
        <Badge variant="status" status={app.status}>
          {app.status}
        </Badge>
      </div>

      <p className="mt-4 flex-1 text-pretty text-[0.9375rem] leading-relaxed text-muted">
        {app.shortDescription}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-1.5 border-t border-border pt-4">
        {app.platform.map((p) => (
          <Badge key={p}>{p}</Badge>
        ))}
      </div>
    </Link>
  );
}
