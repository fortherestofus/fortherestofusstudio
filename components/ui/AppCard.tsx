/**
 * AppCard — an app summary tile.
 *
 * Icon-led rather than screenshot-led: an app screen cropped into a short
 * banner loses everything that made it worth showing. Real screenshots live
 * on the home hero collage, where they get the room to read.
 *
 * The app's colour appears only on the icon tile and a top hairline; the card
 * frame, type, and marks stay on the studio's monotone system so a grid of
 * four reads as one set.
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
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        className
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ backgroundColor: app.accentColor }}
      />

      <div className="flex items-start justify-between gap-4">
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-border"
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

      {/* The use case leads — every app is a problem first, a product second. */}
      <p className="mt-5 text-pretty text-[1.0625rem] font-medium leading-snug tracking-[-0.01em] text-ink">
        “{app.problem}”
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <h3 className="text-[0.9375rem] font-medium tracking-[-0.01em] text-ink">
          {app.name}
        </h3>
        <span className="text-[0.875rem] text-muted">· {app.category}</span>
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
