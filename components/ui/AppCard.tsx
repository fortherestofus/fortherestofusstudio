/**
 * AppCard — an app summary tile with a screenshot slot on top.
 *
 * The app's colour enters through the artwork only; the card frame, type, and
 * marks stay on the studio's monotone system so a grid of four reads as one
 * set rather than four brands.
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { App } from "@/lib/apps";
import { cn } from "@/lib/cn";
import Badge from "@/components/ui/Badge";
import AppIcon from "@/components/ui/AppIcon";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";

interface AppCardProps {
  app: App;
  className?: string;
}

export default function AppCard({ app, className }: AppCardProps) {
  const shot = app.screenshots[0];

  return (
    <Link
      href={`/apps/${app.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-card border border-border bg-surface",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className
      )}
    >
      {/* Artwork */}
      <div className="relative h-[150px] overflow-hidden border-b border-border">
        {shot ? (
          <Image
            src={shot}
            alt={`${app.name} screenshot`}
            fill
            sizes="(max-width: 768px) 90vw, 300px"
            className="object-cover object-top"
          />
        ) : (
          <PlaceholderBlock
            ratio="browser"
            tint={app.accentColor}
            className="h-full rounded-none border-0"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border"
            style={{
              backgroundColor: `color-mix(in srgb, ${app.accentColor} 15%, #ffffff)`,
            }}
          >
            <AppIcon
              icon={app.icon}
              color={app.accentColor}
              label={app.name}
              size={28}
              className="rounded-lg"
            />
          </span>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
        </div>

        <h3 className="mt-4 text-lg font-medium tracking-[-0.01em] text-ink">
          {app.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-[0.875rem] text-muted">{app.category}</span>
          <Badge variant="status" status={app.status}>
            {app.status}
          </Badge>
        </div>

        <p className="mt-3 flex-1 text-pretty text-[0.875rem] leading-relaxed text-muted">
          {app.shortDescription}
        </p>
      </div>
    </Link>
  );
}
