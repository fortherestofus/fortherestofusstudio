/**
 * Hero — headline, sub, CTAs, and an honest proof row on the left; a stack of
 * the studio's own product frames on the right.
 *
 * The frames are real image slots (placeholder until designed screenshots
 * exist), not simulated UI — the apps should show themselves. The proof row
 * uses real people from lib/testimonials.ts; nothing here is invented.
 */
import Image from "next/image";
import Link from "next/link";
import { apps } from "@/lib/apps";
import { testimonials } from "@/lib/testimonials";
import { cn } from "@/lib/cn";
import PillButton from "@/components/ui/PillButton";
import EyebrowChip from "@/components/ui/EyebrowChip";
import AppIcon from "@/components/ui/AppIcon";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";

/** One product frame. Real screenshot when supplied, placeholder until then. */
function AppFrame({
  app,
  className,
  ratio,
}: {
  app: (typeof apps)[number];
  className?: string;
  ratio: "phone" | "browser";
}) {
  const shot = app.screenshots[0];

  return (
    <Link
      href={`/apps/${app.slug}`}
      className={cn(
        "group block overflow-hidden rounded-well border border-border bg-surface p-2.5 shadow-card",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
        className
      )}
    >
      <div className="overflow-hidden rounded-xl">
        {shot ? (
          <div
            className="relative w-full"
            style={{ aspectRatio: ratio === "phone" ? "9 / 16" : "16 / 10" }}
          >
            <Image
              src={shot}
              alt={`${app.name} screenshot`}
              fill
              sizes="(max-width: 1024px) 45vw, 260px"
              className="object-cover object-top"
              priority
            />
          </div>
        ) : (
          <PlaceholderBlock
            ratio={ratio === "phone" ? "portrait" : "browser"}
            tint={app.accentColor}
            className="rounded-none border-0"
          />
        )}
      </div>
      <div className="flex items-center gap-2 px-1 pb-0.5 pt-2.5">
        <AppIcon
          icon={app.icon}
          color={app.accentColor}
          label={app.name}
          size={18}
          className="rounded-md"
        />
        <span className="truncate text-[0.75rem] font-medium text-ink">
          {app.name}
        </span>
      </div>
    </Link>
  );
}

export default function Hero() {
  const [lead, second, third] = apps;

  return (
    <section className="relative overflow-hidden bg-bg pt-32 sm:pt-36 lg:pt-40">
      <div className="relative mx-auto w-full max-w-content px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Copy */}
          <div className="lg:col-span-6">
            <EyebrowChip>Solutions studio · Johannesburg</EyebrowChip>

            <h1 className="mt-7 text-balance text-[2.5rem] font-medium leading-[1.03] tracking-[-0.035em] sm:text-[3.5rem] lg:text-[4rem]">
              <span className="block text-ink">We build apps for</span>
              <span className="block text-ink">the rest of us.</span>
              <span className="block text-muted">And help you ship yours.</span>
            </h1>

            <p className="mt-7 max-w-[46ch] text-pretty leading-relaxed text-muted sm:text-lg">
              Apps, SaaS, and websites — for our clients and for our own ideas.
              Plus the product, marketing, and automation thinking that decides
              whether any of it works.
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

            {/* Proof — real people, real engagements */}
            <div className="mt-12 flex items-center gap-4 border-t border-border pt-8">
              <div className="flex -space-x-2">
                {testimonials.map((t) => (
                  <span
                    key={t.name}
                    title={`${t.name} — ${t.company}`}
                    className="grid h-9 w-9 place-items-center rounded-full border-2 border-bg bg-ink text-[0.6875rem] font-medium text-bg"
                  >
                    {t.initials}
                  </span>
                ))}
              </div>
              <p className="max-w-[30ch] text-[0.8125rem] leading-snug text-muted">
                Ten years of client work — for Meta, the IFC, Digify Africa and
                more.
              </p>
            </div>
          </div>

          {/* Product frames */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto grid max-w-[520px] grid-cols-2 gap-4 lg:ml-auto lg:mr-0">
              <AppFrame
                app={lead}
                ratio="phone"
                className="col-span-1 row-span-2 self-center"
              />
              <AppFrame app={second} ratio="browser" className="col-span-1" />
              <AppFrame app={third} ratio="browser" className="col-span-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
