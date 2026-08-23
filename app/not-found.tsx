import PillButton from "@/components/ui/PillButton";
import EyebrowChip from "@/components/ui/EyebrowChip";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-bg px-5 pt-32 sm:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-28 h-[420px] w-[420px] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 26%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-content pb-20 text-center">
        <EyebrowChip>404</EyebrowChip>
        <h1 className="mx-auto mt-6 max-w-2xl text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[3rem]">
          <span className="text-ink">This page does not exist.</span>{" "}
          <span className="text-muted">Let us get you back.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-reading text-pretty leading-relaxed text-muted">
          The link may be old, or we may have moved something. Head back to the
          start, or go straight to what we build.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <PillButton href="/" size="lg">
            Back to home
          </PillButton>
          <PillButton href="/apps" variant="ghost" size="lg" withArrow={false}>
            See our apps
          </PillButton>
        </div>
      </div>
    </section>
  );
}
