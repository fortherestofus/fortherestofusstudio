/**
 * StoreBadges — the official badges for whichever stores an app actually ships
 * on: Apple's, Google Play's, and Google's Chrome Web Store badge.
 *
 * Used as supplied: every artwork carries its own wordmark and none of the
 * owners permit rebuilding one from an icon plus our own text. They do not
 * share a ratio, so each is sized from its own and they are aligned on height.
 *
 * A key present with a null value means that store is coming but the listing is
 * not up: the badge renders, it is not a link, and the coming-soon line below
 * names it. Badges are deliberately not dimmed — greying someone else's mark is
 * a modification of it. A key that is absent means the app is not headed for
 * that store at all, so no badge appears: CaughtSlipping is a Chrome extension
 * and was never going to the App Store.
 */
import Image from "next/image";
import type { App } from "@/lib/apps";

const HEIGHT = 44;

const BADGES = {
  ios: {
    src: "/icons/download-on-the-app-store-1.svg",
    alt: "Download on the App Store",
    ratio: 3.375,
    label: "iOS",
  },
  android: {
    src: "/icons/google-play-badge-2022-2.svg",
    alt: "Get it on Google Play",
    ratio: 3.375,
    label: "Android",
  },
  chrome: {
    src: "/icons/chrome-web-store-badge.png",
    alt: "Available in the Chrome Web Store",
    ratio: 496 / 150,
    label: "Chrome",
  },
} as const;

type StoreKey = keyof typeof BADGES;
const ORDER = ["ios", "android", "chrome"] as const;

function Badge({ href, store }: { href: string | null; store: StoreKey }) {
  const { src, alt, ratio } = BADGES[store];
  const img = (
    <Image
      src={src}
      alt={alt}
      width={Math.round(HEIGHT * ratio)}
      height={HEIGHT}
      className="h-11 w-auto"
    />
  );

  if (!href) {
    return (
      <span aria-disabled="true" className="inline-flex cursor-default">
        {img}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex transition-transform duration-200 hover:-translate-y-0.5"
    >
      {img}
    </a>
  );
}

/** "iOS and Android", "iOS, Android and Chrome" — no Oxford comma, site voice. */
function list(labels: string[]): string {
  if (labels.length <= 1) return labels[0] ?? "";
  return `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}`;
}

export default function StoreBadges({
  app,
  className,
}: {
  app: App;
  className?: string;
}) {
  const { stores } = app;
  if (!stores) return null;

  const present = ORDER.filter((key) => key in stores);
  if (present.length === 0) return null;

  const pending = present.filter((key) => !stores[key]).map((k) => BADGES[k].label);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {present.map((key) => (
          <Badge key={key} href={stores[key] ?? null} store={key} />
        ))}
      </div>
      {pending.length > 0 && (
        <p className="mt-3 text-[0.875rem] text-faint">
          Coming soon to {list(pending)}.
        </p>
      )}
    </div>
  );
}
