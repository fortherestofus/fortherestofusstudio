// Infinite marquee strip — two duplicated sets for seamless loop

const items = [
  "Apps made for real people",
  "Built in Johannesburg",
  "Honest software",
  "No dark patterns",
  "Built by one person",
  "Free of bloat",
];

function MarqueeContent() {
  return (
    <div className="flex shrink-0 items-center gap-10 mr-10" aria-hidden="true">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-display italic text-xl sm:text-2xl text-ink/70 dark:text-offwhite/60">
            {item}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
        </span>
      ))}
    </div>
  );
}

export default function MarqueeBanner() {
  return (
    <div
      className="border-y border-border bg-surface/30 py-4 overflow-hidden"
      aria-label="Studio values"
    >
      {/* Screen-reader accessible text — the animated version is hidden */}
      <p className="sr-only">{items.join(" · ")}</p>

      <div className="flex animate-marquee" aria-hidden="true">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}
