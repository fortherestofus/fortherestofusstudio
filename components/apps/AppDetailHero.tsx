import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { App } from "@/lib/apps";
import Badge from "@/components/ui/Badge";
import PlaceholderIcon from "@/components/ui/PlaceholderIcon";

export default function AppDetailHero({ app }: { app: App }) {
  return (
    <div>
      <Link
        href="/#apps"
        className="inline-flex items-center gap-1.5 text-sm font-medium font-heading text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        All Apps
      </Link>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
        <PlaceholderIcon
          color={app.accentColor}
          label={app.name}
          size={88}
          className="rounded-3xl"
        />

        <div className="flex-1">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted">
            {app.category}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {app.name}
            </h1>
            <Badge variant="status" status={app.status}>
              {app.status}
            </Badge>
          </div>

          <p className="mt-3 text-lg text-muted">{app.tagline}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={app.ctaHref}
              className="inline-flex items-center rounded-full bg-pthalo px-6 py-3 font-heading text-sm font-medium text-offwhite transition-all hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold dark:bg-lime dark:text-forest"
            >
              {app.ctaLabel}
            </a>
            <div className="flex flex-wrap gap-2">
              {app.platform.map((p) => (
                <Badge key={p} variant="platform">
                  {p}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
