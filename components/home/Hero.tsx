/**
 * Hero — eyebrow, two-line headline (third line muted), sub, CTA pair, and a
 * collage of app frames. Mirrors the design reference: cream canvas, generous
 * space, accent used only on the soft bleed behind the headline.
 */
import Link from "next/link";
import { apps } from "@/lib/apps";
import PillButton from "@/components/ui/PillButton";
import EyebrowChip from "@/components/ui/EyebrowChip";
import AppIcon from "@/components/ui/AppIcon";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";

export default function Hero() {
  const featured = apps.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-bg pt-32 sm:pt-36 lg:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 26%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-content px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <EyebrowChip>Solutions studio · Johannesburg</EyebrowChip>

            <h1 className="mt-6 text-balance text-[2.5rem] font-medium leading-[1.05] tracking-[-0.03em] sm:text-[3.5rem] lg:text-[4rem]">
              <span className="block text-ink">We build apps for</span>
              <span className="block text-ink">the rest of us.</span>
              <span className="block text-muted">And help you ship yours.</span>
            </h1>

            <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
              We design and build digital products — apps, SaaS, and websites —
              for our clients and for our own ideas. And we advise on the parts
              around them: product, marketing, brand, and automation.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PillButton href="/contact" size="lg">
                Start a project
              </PillButton>
              <PillButton
                href="/apps"
                variant="ghost"
                size="lg"
                withArrow={false}
              >
                See our apps
              </PillButton>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {apps.map((app) => (
                  <span
                    key={app.slug}
                    className="grid h-10 w-10 place-items-center rounded-full border-2 border-bg"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${app.accentColor} 18%, var(--color-surface))`,
                    }}
                  >
                    <AppIcon
                      icon={app.icon}
                      color={app.accentColor}
                      label={app.name}
                      size={24}
                      className="rounded-lg"
                    />
                  </span>
                ))}
              </div>
              <p className="max-w-[16rem] text-[0.8125rem] leading-snug text-muted">
                {apps.length} products of our own, in build and in beta.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative mx-auto grid max-w-md grid-cols-2 gap-4 sm:max-w-lg lg:ml-auto lg:mr-0">
              {featured.map((app, i) => (
                <Link
                  key={app.slug}
                  href={`/apps/${app.slug}`}
                  className={
                    i === 0
                      ? "group col-span-1 row-span-2 self-center"
                      : "group col-span-1"
                  }
                >
                  <div className="overflow-hidden rounded-well border border-border bg-surface p-3 shadow-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-card-hover">
                    <PlaceholderBlock
                      ratio={i === 0 ? "phone" : "square"}
                      tint={app.accentColor}
                      className="rounded-xl border-0"
                    />
                    <div className="flex items-center gap-2.5 px-1 pb-1 pt-3">
                      <AppIcon
                        icon={app.icon}
                        color={app.accentColor}
                        label={app.name}
                        size={22}
                        className="rounded-md"
                      />
                      <span className="truncate text-[0.8125rem] font-medium text-ink">
                        {app.name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
