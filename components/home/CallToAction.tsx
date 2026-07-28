/**
 * CallToAction — the full-width dark rounded block that closes a page. This is
 * the page's ink moment; nothing else above it should be dark.
 */
import PillButton from "@/components/ui/PillButton";
import EyebrowChip from "@/components/ui/EyebrowChip";

interface CallToActionProps {
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CallToAction({
  eyebrow = "Start here",
  title = "Have an idea worth building?",
  body = "Tell us what you are trying to make or fix. If we are the right studio for it, we will say so. If we are not, we will tell you that too.",
  primaryLabel = "Start a project",
  primaryHref = "/contact",
  secondaryLabel = "See what we build",
  secondaryHref = "/apps",
}: CallToActionProps) {
  return (
    <section className="bg-bg px-4 pb-20 pt-4 sm:px-6 sm:pb-28">
      <div className="grain relative mx-auto w-full max-w-content overflow-hidden rounded-block bg-ink-surface px-6 py-16 text-center sm:px-12 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-[360px] w-[360px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 60%, transparent), transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6">
          <EyebrowChip tone="onInk">{eyebrow}</EyebrowChip>

          <h2 className="text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink-text sm:text-[3rem]">
            {title}
          </h2>

          <p className="max-w-xl text-pretty leading-relaxed text-ink-muted">
            {body}
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
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
