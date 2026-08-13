/**
 * AppDetail — the shared template for every app page.
 *
 * Editorial, not carded: a centred hero with one hero screenshot rising from
 * the fold, alternating full-width story bands, a hairline spec strip, and a
 * closing CTA. The app's accent is scoped by AppThemeProvider and appears only
 * in imagery and small marks — the type and buttons stay on the studio system.
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { App } from "@/lib/apps";
import { getOtherApps } from "@/lib/apps";
import AppThemeProvider from "@/components/apps/AppThemeProvider";
import AppStorySection from "@/components/apps/AppStorySection";
import AppJourneySection from "@/components/apps/AppJourneySection";
import StoreBadges from "@/components/apps/StoreBadges";
import AppIcon from "@/components/ui/AppIcon";
import Badge from "@/components/ui/Badge";
import PillButton from "@/components/ui/PillButton";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";
import Section, { SectionHeading } from "@/components/ui/Section";
import AppCard from "@/components/ui/AppCard";
import CallToAction from "@/components/home/CallToAction";

function SpecStrip({ app }: { app: App }) {
  const specs = [
    { label: "Platform", value: app.platform.join(" · ") },
    { label: "Price", value: app.price },
    { label: "Status", value: app.status },
    { label: "Category", value: app.category },
  ];

  return (
    <div className="mx-auto w-full max-w-content px-5 sm:px-8">
      <dl className="grid grid-cols-2 border-y border-border sm:grid-cols-4">
        {specs.map((spec, i) => (
          <div
            key={spec.label}
            className={`px-4 py-6 text-center ${
              i > 0 ? "border-border sm:border-l" : ""
            } ${i === 1 ? "border-l border-border" : ""} ${
              i === 2 ? "border-t border-border sm:border-t-0" : ""
            } ${i === 3 ? "border-l border-t border-border sm:border-t-0" : ""}`}
          >
            <dt className="text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
              {spec.label}
            </dt>
            <dd className="mt-2 text-[0.9375rem] font-medium text-ink">
              {spec.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function AppDetail({ app }: { app: App }) {
  const others = getOtherApps(app.slug);
  const heroShot = app.screenshots[0];
  const isPhoneApp = app.platform.some((p) => /iOS|Android/i.test(p));
  const isPanelApp = app.platform.some((p) => /extension/i.test(p));

  /*
   * The hero deliberately crops at the fold — the screenshot rises from the
   * bottom of the section and the spec strip cuts it off. The frame's WIDTH
   * must still fit the artwork's own proportions (a phone stays narrow, an
   * extension popup narrower than a browser window), and the crop is always
   * bottom-only via object-top, so nothing letterboxes and the top of the
   * screen — the part that identifies the app — is always whole.
   */
  const heroFrame = isPhoneApp
    ? { width: "max-w-[320px]", ratio: "9 / 14" }
    : isPanelApp
      ? { width: "max-w-[380px]", ratio: "3 / 3.4" }
      : { width: "max-w-4xl", ratio: "16 / 9" };

  return (
    <AppThemeProvider app={app}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg pt-28 sm:pt-36">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[440px] w-[720px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{
            background: `radial-gradient(circle, color-mix(in srgb, ${app.accentColor} 26%, transparent), transparent 70%)`,
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

          <div className="mx-auto mt-12 max-w-2xl text-center">
            <span
              className="mx-auto grid h-16 w-16 place-items-center rounded-[20px] border border-border"
              style={{
                backgroundColor: `color-mix(in srgb, ${app.accentColor} 15%, #ffffff)`,
              }}
            >
              <AppIcon
                icon={app.icon}
                color={app.accentColor}
                label={app.name}
                size={44}
                className="rounded-xl"
              />
            </span>

            <div className="mt-6 flex items-center justify-center gap-2.5">
              <span className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
                {app.name}
              </span>
              <Badge variant="status" status={app.status}>
                {app.status}
              </Badge>
            </div>

            {/* The use case, before the brand line: problem first, always. */}
            <p className="mx-auto mt-6 max-w-[38ch] text-pretty text-[1.0625rem] font-medium leading-snug text-accent-deep">
              “{app.problem}”
            </p>

            <h1 className="mt-4 text-balance text-[2.25rem] font-medium leading-[1.05] tracking-[-0.03em] text-ink sm:text-[3.25rem]">
              {app.tagline}
            </h1>
            <p className="mx-auto mt-6 max-w-[52ch] text-pretty leading-relaxed text-muted sm:text-lg">
              {app.shortDescription}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <PillButton
                href={app.ctaHref}
                external={app.ctaExternal}
                size="lg"
              >
                {app.ctaLabel}
              </PillButton>
              {/* Apps with their own site say so here — this page is the
                  studio's account of it, not its home. */}
              {app.website && (
                <PillButton
                  href={app.website.url}
                  external
                  variant="ghost"
                  size="lg"
                >
                  {app.website.label}
                </PillButton>
              )}
            </div>

            {/* Store badges, for apps that ship on them */}
            <StoreBadges app={app} className="mt-8" />
          </div>

          {/* Hero screenshot rising from the fold */}
          <div className="mt-12 sm:mt-16">
            {heroShot ? (
              <div
                className={`relative mx-auto overflow-hidden rounded-t-well border border-b-0 border-border bg-surface ${heroFrame.width}`}
                style={{ aspectRatio: heroFrame.ratio }}
              >
                <Image
                  src={heroShot}
                  alt={`${app.name} screenshot`}
                  fill
                  sizes="(max-width: 768px) 90vw, 900px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            ) : (
              <PlaceholderBlock
                ratio={isPhoneApp ? "phone" : "browser"}
                tint={app.accentColor}
                label={`${app.name} — hero screenshot`}
                className={`mx-auto rounded-t-well border-b-0 ${
                  isPhoneApp ? "max-w-[320px]" : "max-w-4xl"
                }`}
              />
            )}
          </div>
        </div>
      </section>

      <SpecStrip app={app} />

      {/* Story bands */}
      {app.story?.map((story, i) => (
        <AppStorySection
          key={story.title}
          story={story}
          app={app}
          flipped={i % 2 === 1}
          index={i}
        />
      ))}

      {/* How it actually happens — real captures, only for apps that carry one */}
      <AppJourneySection app={app} />

      {/* Everything else it does */}
      <Section tone="sunken">
        <SectionHeading
          align="left"
          eyebrow="Everything else"
          title={`The rest of what ${app.name} does`}
        />
        <ul className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {app.features.map((feature) => (
            <li key={feature.title} className="border-t border-border pt-6">
              <h3 className="text-base font-medium tracking-[-0.01em] text-ink">
                {feature.title}
              </h3>
              <p className="mt-2 max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Giving (InSpiritInTruth only) */}
      {app.giving && (
        <Section tone="canvas" size="sm">
          <div className="mx-auto max-w-reading text-center">
            <span className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
              Giving
            </span>
            <h2 className="mt-4 text-balance text-[1.75rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.25rem]">
              Help keep it going
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted">
              Gifts fund the work behind {app.name} — new features, quality, and
              the devotional content itself — and 10% of all giving goes to acts
              of kindness. A gift never unlocks anything.
            </p>
            <Link
              href={app.giving}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[0.9375rem] font-medium text-bg transition-all hover:-translate-y-0.5 hover:shadow-pill"
            >
              Learn about giving
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>
      )}

      {/* More apps */}
      <Section tone="canvas">
        <SectionHeading
          align="left"
          eyebrow="More from the studio"
          title="Our other apps"
        />
        <div className="mt-10 grid gap-3 sm:gap-4 md:grid-cols-3">
          {others.map((other) => (
            <AppCard key={other.slug} app={other} />
          ))}
        </div>

        {app.legal && (
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-8 text-[0.9375rem] text-muted">
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
        body="We build products like this one for other people too, and consult on the product, brand, and growth work around them."
        primaryLabel="Start a project"
        primaryHref="/contact"
        secondaryLabel="See our services"
        secondaryHref="/services"
      />
    </AppThemeProvider>
  );
}
