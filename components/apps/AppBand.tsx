/**
 * AppBand — one product on the apps index, in the editorial language its own
 * detail page uses.
 *
 * This replaced a grid of four cards. Cards belong to the studio side of the
 * site (home, services); app surfaces are editorial — alternating bands, big
 * type, a screenshot bleeding past the outer edge, a hairline spec strip, no
 * card stack. The index is an app surface, so it speaks that language too.
 *
 * The other thing the cards could not do: show the product. AppCard is
 * icon-led by design, which made sense when screenshots lived only on the
 * home collage — but the page whose entire subject is four products was
 * showing four icons.
 *
 * The problem line is the headline, never the tagline: every app surface
 * leads with the use case, product second.
 */
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { App } from "@/lib/apps";
import { cn } from "@/lib/cn";
import Badge from "@/components/ui/Badge";
import ChapterMark from "@/components/ui/ChapterMark";
import PhoneFrame from "@/components/ui/PhoneFrame";
import AppIcon from "@/components/ui/AppIcon";
import AppThemeProvider from "@/components/apps/AppThemeProvider";

/**
 * Width caps per frame shape, matching AppStorySection. Height is never set:
 * screenshots are static imports carrying their intrinsic dimensions, so each
 * frame takes its image's own aspect ratio exactly. Hardcoding one ratio is
 * how a 3:4 extension popup once lost a third of itself to a 16:10 box.
 *
 * `phone` is not in here because a single handset cannot hold a half-width
 * band — a 290px phone in a 700px column strands 400px of air beside it,
 * which is exactly the emptiness this rebuild was meant to fix. Phone apps
 * get a staggered pair instead (see below); they have six to ten real
 * screenshots each, so the second frame costs nothing and shows more product.
 */
const SHAPE_WIDTH = {
  panel: "mx-auto w-full max-w-[400px]",
  browser: "w-full",
} as const;

function Frame({
  image,
  alt,
  className,
  priority,
}: {
  image: StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-well border border-border bg-surface shadow-card",
        className
      )}
    >
      <Image
        src={image}
        alt={alt}
        sizes="(max-width: 1024px) 90vw, 45vw"
        className="h-auto w-full"
        priority={priority}
      />
    </div>
  );
}

interface AppBandProps {
  app: App;
  index: number;
  total: number;
  /** Odd bands flip so the page alternates left/right. */
  flipped?: boolean;
}

export default function AppBand({
  app,
  index,
  total,
  flipped = false,
}: AppBandProps) {
  const shape = app.story?.[0]?.shape ?? "browser";
  const shot = app.screenshots[0];

  return (
    <AppThemeProvider
      app={app}
      className={cn(
        "overflow-hidden py-14 sm:py-20",
        flipped ? "bg-sunken" : "bg-bg"
      )}
    >
      <section id={app.slug} className="scroll-mt-24">
        <div className="mx-auto w-full max-w-content px-5 sm:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Text */}
            <div className={cn("lg:col-span-5", flipped && "lg:order-2")}>
              <span className="flex items-center gap-3">
                <ChapterMark index={index + 1} total={total} />
                <span className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
                  {app.category}
                </span>
              </span>

              {/* The use case is the headline — product second, always. */}
              <h2 className="mt-5 text-balance text-[1.75rem] font-medium leading-[1.12] tracking-[-0.025em] text-ink sm:text-[2.25rem] lg:text-[2.5rem]">
                “{app.problem}”
              </h2>

              <div className="mt-6 flex items-center gap-3.5">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-border"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${app.accentColor} 15%, #ffffff)`,
                  }}
                >
                  <AppIcon
                    icon={app.icon}
                    color={app.accentColor}
                    label={app.name}
                    size={32}
                    className="rounded-xl"
                  />
                </span>
                <span>
                  <span className="block text-[1.0625rem] font-medium tracking-[-0.01em] text-ink">
                    {app.name}
                  </span>
                  <Badge variant="status" status={app.status}>
                    {app.status}
                  </Badge>
                </span>
              </div>

              <p className="mt-5 max-w-[46ch] text-pretty leading-relaxed text-muted sm:text-lg">
                {app.shortDescription}
              </p>

              {/* Hairline spec strip — the detail pages' own device. */}
              <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5">
                {[
                  { label: "Platform", value: app.platform.join(" · ") },
                  { label: "Price", value: app.price },
                ].map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                      {spec.label}
                    </dt>
                    <dd className="mt-1.5 text-[0.9375rem] text-ink">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                href={`/apps/${app.slug}/`}
                className="group mt-8 inline-flex items-center gap-2 text-[1.0625rem] font-medium text-ink"
              >
                <span className="border-b border-border pb-0.5 transition-colors group-hover:border-ink">
                  See {app.name}
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Screenshot — bleeds toward the outer edge */}
            <div
              className={cn(
                "relative lg:col-span-7",
                flipped ? "lg:order-1 lg:-ml-20" : "lg:-mr-20"
              )}
            >
              {/* A soft wash of the app's own accent behind the frame, so the
                  four bands are visibly four different products rather than
                  one long grey scroll. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-6 inset-y-0 rounded-block opacity-60"
                style={{
                  background: `radial-gradient(70% 60% at 50% 40%, color-mix(in srgb, ${app.accentColor} 22%, transparent), transparent 70%)`,
                }}
              />
              {shape === "phone" ? (
                <div className="relative mx-auto flex w-full max-w-[540px] items-start justify-center gap-4 sm:gap-6">
                  <PhoneFrame
                    image={shot}
                    alt={`${app.name}: ${app.tagline}`}
                    className="w-1/2"
                    sizes="(max-width: 1024px) 42vw, 260px"
                    priority={index === 0}
                  />
                  {/* The offset is the whole point: two flush handsets read as
                      a comparison, two staggered ones read as a product. */}
                  <PhoneFrame
                    image={app.screenshots[1] ?? shot}
                    alt={`${app.name}: a second screen`}
                    className="mt-10 w-1/2 sm:mt-16"
                    sizes="(max-width: 1024px) 42vw, 260px"
                  />
                </div>
              ) : (
                <Frame
                  image={shot}
                  alt={`${app.name}: ${app.tagline}`}
                  className={SHAPE_WIDTH[shape]}
                  priority={index === 0}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </AppThemeProvider>
  );
}
