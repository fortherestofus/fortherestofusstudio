/**
 * CallToAction — the full-width dark rounded block that closes a page. This is
 * the page's ink moment; nothing else above it should be dark.
 *
 * No eyebrow. An eyebrow earns its place when it is a category the reader can
 * scan for and the headline does not already carry — which is why "Why we
 * build" and "Work delivered for" stay. The closing ask is the opposite case:
 * its headline is already a verb, the button underneath names the action, and
 * "Start here" / "Say hello" / "Your turn" added a label layer that carried no
 * keyword. Cut them rather than let the pattern read as decoration.
 *
 * With `scatter`, real artefacts (the app marks and two product chips) orbit
 * the ask, the reference's closing-photos move told with the things we
 * actually make. Decorative only — hidden from assistive tech and from
 * viewports too narrow to hold them.
 */
import Image from "next/image";
import PillButton from "@/components/ui/PillButton";
import AppIcon from "@/components/ui/AppIcon";
import Badge from "@/components/ui/Badge";
import { getApp } from "@/lib/apps";
import { contentSamples } from "@/lib/homeMedia";
import { cn } from "@/lib/cn";

interface CallToActionProps {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Scatter real artefacts around the ask (home's closing block). */
  scatter?: boolean;
}

/** A small product chip — an app named as an object, like the reference's event cards. */
function ProductChip({ slug, className }: { slug: string; className?: string }) {
  const app = getApp(slug);
  if (!app) return null;
  return (
    <div
      className={cn(
        "flex w-[210px] items-center gap-3 rounded-card border border-ink-border bg-ink-raised p-3",
        className
      )}
    >
      <AppIcon
        icon={app.icon}
        color={app.accentColor}
        label={app.name}
        size={34}
        className="rounded-[9px]"
      />
      <div className="min-w-0">
        <p className="truncate text-[0.8125rem] font-medium text-ink-text">
          {app.name}
        </p>
        <Badge variant="status" status={app.status} className="mt-1 scale-90 origin-left">
          {app.status}
        </Badge>
      </div>
    </div>
  );
}

/** A real work photo as a tilted polaroid — warmth, not decoration. */
function PhotoChip({ index, className }: { index: number; className?: string }) {
  const sample = contentSamples[index];
  if (!sample) return null;
  return (
    <div
      className={cn(
        "w-[150px] overflow-hidden rounded-[14px] border border-ink-border bg-ink-raised p-1.5",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-[9px]" style={{ aspectRatio: "4 / 3" }}>
        <Image src={sample.src} alt={sample.alt} fill sizes="150px" className="object-cover" />
      </div>
    </div>
  );
}

/** An app mark presented as a tilted tile. */
function MarkChip({ slug, className }: { slug: string; className?: string }) {
  const app = getApp(slug);
  if (!app) return null;
  return (
    <div
      className={cn(
        "grid h-[74px] w-[74px] place-items-center rounded-card border border-ink-border bg-ink-raised",
        className
      )}
    >
      <AppIcon
        icon={app.icon}
        color={app.accentColor}
        label={app.name}
        size={42}
        className="rounded-xl"
      />
    </div>
  );
}

export default function CallToAction({
  title = "Have an idea worth building?",
  body = "Tell us what you are trying to make or fix. We will reply with what it would take, how long, and what it costs.",
  primaryLabel = "Start a project",
  primaryHref = "/contact/",
  secondaryLabel = "See what we build",
  secondaryHref = "/apps/",
  scatter = false,
}: CallToActionProps) {
  return (
    <section className="bg-bg px-4 pb-16 sm:px-6 sm:pb-20">
      <div className="grain relative mx-auto w-full max-w-content overflow-hidden rounded-block bg-ink-surface px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-[360px] w-[360px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 60%, transparent), transparent 70%)",
          }}
        />

        {scatter && (
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
            <PhotoChip index={0} className="absolute left-[6%] top-[10%] -rotate-6" />
            <MarkChip
              slug="caught-slipping"
              className="absolute left-[13%] top-[46%] rotate-3"
            />
            <ProductChip
              slug="tapa"
              className="absolute bottom-[12%] left-[5%] rotate-2"
            />
            <PhotoChip index={1} className="absolute right-[6%] top-[11%] rotate-6" />
            <MarkChip
              slug="inspiritintruth"
              className="absolute right-[13%] top-[48%] -rotate-3"
            />
            <ProductChip
              slug="hakkan"
              className="absolute bottom-[13%] right-[4.5%] -rotate-2"
            />
          </div>
        )}

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
          <h2 className="text-balance text-[2rem] font-medium leading-[1.08] tracking-[-0.02em] text-ink-text sm:text-[3rem]">
            {title}
          </h2>

          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-ink-muted">
            {body}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <PillButton href={primaryHref} variant="onInk" size="lg">
              {primaryLabel}
            </PillButton>
            <a
              href={secondaryHref}
              className="rounded-full border border-ink-border px-6 py-3 text-base text-ink-text transition-colors hover:bg-ink-raised"
            >
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
