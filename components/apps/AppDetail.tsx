/**
 * AppDetail — the shared template for every app page.
 *
 * The app's accent is scoped here via AppThemeProvider, so the section
 * components below can use accent tokens without knowing which app they are
 * rendering.
 */
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { App } from "@/lib/apps";
import { getOtherApps } from "@/lib/apps";
import AppThemeProvider from "@/components/apps/AppThemeProvider";
import AppDetailHero from "@/components/apps/AppDetailHero";
import AppScreenshots from "@/components/apps/AppScreenshots";
import AppFeatureList from "@/components/apps/AppFeatureList";
import Section, { SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import AppCard from "@/components/ui/AppCard";
import CallToAction from "@/components/home/CallToAction";

function SpecList({ app }: { app: App }) {
  const specs = [
    { label: "Category", value: app.category },
    { label: "Platform", value: app.platform.join(", ") },
    { label: "Status", value: app.status },
    { label: "Price", value: app.price },
  ];

  return (
    <Card className="h-fit p-6">
      <dl className="divide-y divide-border">
        {specs.map((spec, i) => (
          <div
            key={spec.label}
            className={`flex items-baseline justify-between gap-4 ${
              i === 0 ? "pb-3" : "py-3 last:pb-0"
            }`}
          >
            <dt className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
              {spec.label}
            </dt>
            <dd className="text-right text-[0.9375rem] font-medium text-ink">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

export default function AppDetail({ app }: { app: App }) {
  const others = getOtherApps(app.slug);

  return (
    <AppThemeProvider app={app}>
      <AppDetailHero app={app} />

      {/* Screenshots */}
      <section className="bg-bg pb-4">
        <div className="mx-auto w-full max-w-content px-5 sm:px-8">
          <AppScreenshots app={app} />
        </div>
      </section>

      {/* Overview + specs */}
      <Section tone="canvas">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div>
            <h2 className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
              Overview
            </h2>
            <div className="mt-5 space-y-5">
              {app.overview.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-pretty text-lg leading-relaxed text-ink sm:text-xl"
                      : "text-pretty leading-relaxed text-muted"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <SpecList app={app} />
        </div>
      </Section>

      {/* Features */}
      <Section tone="sunken">
        <AppFeatureList app={app} />
      </Section>

      {/* Giving (InSpiritInTruth only) */}
      {app.giving && (
        <Section tone="canvas" size="sm">
          <Card className="overflow-hidden p-8 sm:p-10">
            <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
              Giving
            </p>
            <h2 className="mt-3 text-[1.75rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.25rem]">
              Help keep it going
            </h2>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted">
              Gifts fund the work behind {app.name} — new features, quality, and
              the devotional content itself — and 10% of all giving goes to acts
              of kindness. Giving lives in the app, and a gift never unlocks
              anything.
            </p>
            <Link
              href={app.giving}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.9375rem] font-medium text-bg transition-all hover:-translate-y-0.5 hover:shadow-pill"
            >
              Learn about giving
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </Section>
      )}

      {/* More apps */}
      <Section tone="canvas">
        <SectionHeading align="left" eyebrow="More from the studio" title="Our other apps" />
        <div className="mt-10 grid gap-3 sm:gap-4 md:grid-cols-3">
          {others.map((other) => (
            <AppCard key={other.slug} app={other} />
          ))}
        </div>

        {app.legal && (
          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-8 text-[0.9375rem] text-muted">
            <span className="text-faint">Legal</span>
            <Link
              href={app.legal.privacy}
              {...(app.legal.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex items-center gap-1 font-medium transition-colors hover:text-ink"
            >
              Privacy Policy
              {app.legal.external && <ArrowUpRight className="h-3.5 w-3.5" />}
            </Link>
            <Link
              href={app.legal.terms}
              {...(app.legal.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex items-center gap-1 font-medium transition-colors hover:text-ink"
            >
              Terms &amp; Conditions
              {app.legal.external && <ArrowUpRight className="h-3.5 w-3.5" />}
            </Link>
          </div>
        )}
      </Section>

      <CallToAction
        eyebrow="Work with us"
        title="Want something like this built?"
        body="We build products like this one for other people too, and advise on the product, brand, and growth work around them."
        primaryLabel="Start a project"
        primaryHref="/contact"
        secondaryLabel="See our services"
        secondaryHref="/services"
      />
    </AppThemeProvider>
  );
}
