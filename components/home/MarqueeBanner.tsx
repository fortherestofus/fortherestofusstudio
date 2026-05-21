// Infinite marquee strip of our apps — two duplicated sets for a seamless loop.
// Boxed to the page width (matches the rest of the layout) with soft edge fades.
// Logos are placeholders (PlaceholderIcon); swap for real logos in /public/logos later.

import { apps } from "@/lib/apps";
import PlaceholderIcon from "@/components/ui/PlaceholderIcon";

// Repeat the apps so a single strip comfortably exceeds the container width.
const strip = Array.from({ length: 5 }, () => apps).flat();

function MarqueeContent() {
  return (
    <div className="flex shrink-0 items-center gap-10 mr-10" aria-hidden="true">
      {strip.map((app, i) => (
        <span
          key={`${app.slug}-${i}`}
          className="flex items-center gap-10 whitespace-nowrap"
        >
          <span className="flex items-center gap-3">
            <PlaceholderIcon
              color={app.accentColor}
              label={app.name}
              size={32}
            />
            <span className="font-display italic text-xl sm:text-2xl text-ink/70 dark:text-offwhite/60">
              {app.name}
            </span>
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
        </span>
      ))}
    </div>
  );
}

export default function MarqueeBanner() {
  return (
    <div className="mx-auto max-w-content px-5 py-6 sm:px-8 sm:py-8">
      <div
        className="overflow-hidden rounded-2xl border border-border bg-surface/40 py-4"
        aria-label="Our apps"
      >
        {/* Screen-reader accessible text — the animated version is hidden */}
        <p className="sr-only">{apps.map((a) => a.name).join(" · ")}</p>

        {/* Static, container-width wrapper carries the edge fade */}
        <div
          className="overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex animate-marquee" aria-hidden="true">
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </div>
      </div>
    </div>
  );
}
