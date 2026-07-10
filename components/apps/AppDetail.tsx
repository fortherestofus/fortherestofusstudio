import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { App } from "@/lib/apps";
import { getOtherApps } from "@/lib/apps";
import AppDetailHero from "@/components/apps/AppDetailHero";
import AppScreenshots from "@/components/apps/AppScreenshots";
import AppFeatureList from "@/components/apps/AppFeatureList";
import AppCard from "@/components/ui/AppCard";

export default function AppDetail({ app }: { app: App }) {
  const others = getOtherApps(app.slug);

  return (
    <article className="mx-auto max-w-content px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <AppDetailHero app={app} />

      <div className="mt-12">
        <AppScreenshots app={app} />
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-muted">
            Overview
          </h2>
          <div className="mt-4 space-y-4">
            {app.overview.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-xl leading-relaxed text-ink"
                    : "leading-relaxed text-muted"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <dl className="grid h-fit grid-cols-2 gap-x-6 gap-y-5 rounded-2xl border border-border bg-surface p-6 shadow-card">
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">
              Category
            </dt>
            <dd className="mt-1 font-heading text-sm font-semibold text-ink">
              {app.category}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">
              Platform
            </dt>
            <dd className="mt-1 font-heading text-sm font-semibold text-ink">
              {app.platform.join(", ")}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">
              Status
            </dt>
            <dd className="mt-1 font-heading text-sm font-semibold text-ink">
              {app.status}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted">Price</dt>
            <dd className="mt-1 font-heading text-sm font-semibold text-ink">
              {app.price}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-16">
        <AppFeatureList app={app} />
      </div>

      {app.giving && (
        <section className="mt-20 overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-card sm:p-10">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">
            Giving
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Help keep it going
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">
            Gifts fund the work behind {app.name} — new features, quality, and the devotional
            content itself — and 10% of all giving goes to acts of kindness. Giving lives in the
            app.
          </p>
          <Link
            href={app.giving}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-pthalo px-6 py-3 font-heading text-sm font-medium text-offwhite transition-all hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold dark:bg-lime dark:text-forest"
          >
            Learn about giving
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      )}

      <section className="mt-20 border-t border-border pt-12">
        <h2 className="font-heading text-2xl font-bold text-ink">More apps</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {others.map((other) => (
            <AppCard key={other.slug} app={other} />
          ))}
        </div>
      </section>

      {app.legal && (
        <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-8 text-sm text-muted">
          <span>Legal</span>
          <Link
            href={app.legal.privacy}
            className="font-medium transition-colors hover:text-ink"
          >
            Privacy Policy
          </Link>
          <Link
            href={app.legal.terms}
            className="font-medium transition-colors hover:text-ink"
          >
            Terms &amp; Conditions
          </Link>
        </div>
      )}
    </article>
  );
}
