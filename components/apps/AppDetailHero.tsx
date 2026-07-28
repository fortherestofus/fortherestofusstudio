/**
 * AppDetailHero — the top of an app page. The app's accent appears as a soft
 * wash behind the block and on the icon tile; the CTA stays an ink pill so the
 * page still belongs to the studio.
 */
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { App } from "@/lib/apps";
import Badge from "@/components/ui/Badge";
import AppIcon from "@/components/ui/AppIcon";
import PillButton from "@/components/ui/PillButton";

export default function AppDetailHero({ app }: { app: App }) {
  return (
    <section className="relative overflow-hidden bg-bg pb-14 pt-28 sm:pb-16 sm:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-32 h-[460px] w-[460px] rounded-full opacity-45 blur-3xl"
        style={{
          background: `radial-gradient(circle, color-mix(in srgb, ${app.accentColor} 34%, transparent), transparent 70%)`,
        }}
      />

      <div className="relative mx-auto w-full max-w-content px-5 sm:px-8">
        <Link
          href="/apps"
          className="inline-flex items-center gap-1.5 text-[0.9375rem] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          All apps
        </Link>

        <div className="mt-10 flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-8">
          <span
            className="grid h-24 w-24 shrink-0 place-items-center rounded-[28px] border border-border"
            style={{
              backgroundColor: `color-mix(in srgb, ${app.accentColor} 14%, var(--color-surface))`,
            }}
          >
            <AppIcon
              icon={app.icon}
              color={app.accentColor}
              label={app.name}
              size={64}
              className="rounded-2xl"
            />
          </span>

          <div className="flex-1">
            <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
              {app.category}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h1 className="text-[2.25rem] font-medium leading-[1.05] tracking-[-0.03em] text-ink sm:text-[3rem]">
                {app.name}
              </h1>
              <Badge variant="status" status={app.status}>
                {app.status}
              </Badge>
            </div>

            <p className="mt-4 max-w-xl text-pretty text-lg text-muted">
              {app.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PillButton
                href={app.ctaHref}
                external={app.ctaExternal}
                size="lg"
              >
                {app.ctaLabel}
              </PillButton>
              <div className="flex flex-wrap gap-2">
                {app.platform.map((p) => (
                  <Badge key={p}>{p}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
