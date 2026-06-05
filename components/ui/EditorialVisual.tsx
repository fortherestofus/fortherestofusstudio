// Editorial, type-led brand visuals for the studio sections — a high-end,
// on-brand stand-in until real photography is dropped in. To swap in a photo
// later, replace the <EditorialVisual /> in the studio component with a
// <PlaceholderImage src="/studio/your-photo.jpg" ... /> (same aspect class).

interface EditorialVisualProps {
  variant: "intro" | "story";
  className?: string;
}

export default function EditorialVisual({
  variant,
  className = "",
}: EditorialVisualProps) {
  if (variant === "intro") {
    return (
      <div
        className={`relative overflow-hidden rounded-3xl ring-1 ring-black/5 ${className}`}
        style={{
          background:
            "linear-gradient(150deg, #0C2218 0%, #123524 58%, #0f3d2a 100%)",
        }}
      >
        {/* Brand colour glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 80% 18%, rgba(144,168,66,0.30), transparent 64%), radial-gradient(52% 46% at 8% 92%, rgba(240,179,49,0.16), transparent 70%)",
          }}
        />
        {/* Soft gradient orb echoing the hero rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full opacity-50 blur-2xl"
          style={{
            background:
              "conic-gradient(from 0deg, #90A842, #C8DE86, #123524, #F0B331, #90A842)",
          }}
        />
        <div className="grain pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

        {/* Type-led editorial statement */}
        <div className="relative flex h-full flex-col justify-between p-8 sm:p-10">
          <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-lime/75">
            For The Rest Of Us
          </span>
          <p className="font-display text-4xl font-semibold leading-[1.04] tracking-tight text-offwhite sm:text-5xl">
            Build to <span className="text-lime">solve.</span>
            <br />
            Build to <span className="text-gold">learn.</span>
          </p>
          <span className="font-heading text-xs tracking-wide text-offwhite/55">
            Tech · Media · Design · Marketing
          </span>
        </div>
      </div>
    );
  }

  // variant === "story"
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ring-1 ring-black/5 ${className}`}
      style={{
        background:
          "linear-gradient(160deg, #0C2218 0%, #123524 68%, #0C2218 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full opacity-60 blur-2xl"
        style={{
          background:
            "conic-gradient(from 90deg, #90A842, #C8DE86, #123524, #F0B331, #90A842)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 42% at 18% 86%, rgba(204,88,51,0.20), transparent 70%)",
        }}
      />
      <div className="grain pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      {/* Text sits at the top so the frosted code chip (added by the parent)
          has clear space at the bottom-left. */}
      <div className="relative flex h-full flex-col justify-start p-8 sm:p-10">
        <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.22em] text-lime/75">
          The studio, in one person
        </span>
        <p className="mt-3 max-w-[15ch] font-display text-3xl font-semibold leading-tight tracking-tight text-offwhite sm:text-4xl">
          One builder.
          <br />
          <span className="text-lime">Every problem, end to end.</span>
        </p>
      </div>
    </div>
  );
}
