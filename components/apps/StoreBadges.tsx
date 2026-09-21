/**
 * StoreBadges — the official store artwork for an app that ships on one.
 *
 * Used as supplied: each badge carries its own wordmark and none of the owners
 * permit rebuilding them from an icon plus our own text. They are close enough
 * in proportion that a single height keeps them level.
 *
 * An app declares only the stores it belongs in. A Chrome extension has no App
 * Store listing to be coming soon to, so listing every store for every app
 * would advertise a wait that is never going to end.
 *
 * A declared store with a null value means the app is coming but the listing is
 * not up: the badge renders, it is not a link, and the line underneath says so.
 * It is deliberately not dimmed — greying someone else's mark is a modification
 * of it.
 */
import Image from "next/image";
import type { App } from "@/lib/apps";

const HEIGHT = 44;

const STORE_ART = {
  ios: {
    src: "/icons/download-on-the-app-store-1.svg",
    alt: "Download on the App Store",
    ratio: 3.375,
    name: "iOS",
  },
  android: {
    src: "/icons/google-play-badge-2022-2.svg",
    alt: "Get it on Google Play",
    ratio: 3.375,
    name: "Android",
  },
  chrome: {
    src: "/icons/chrome-web-store.png",
    alt: "Available in the Chrome Web Store",
    ratio: 496 / 150,
    name: "Chrome",
  },
} as const;

type StoreKey = keyof typeof STORE_ART;
const ORDER: StoreKey[] = ["ios", "android", "chrome"];

/**
 * True when a live badge already points where `href` does.
 *
 * The hero used to render a "Download on the App Store" pill directly above
 * the App Store badge — the same destination, twice, one under the other. The
 * badge wins that tie: it is the owner's own artwork, it is what people scan
 * for, and it is the one that scales to a second store without the hero
 * growing a second pill. Once tapa. reached Play, the pill was naming one of
 * two stores while both badges sat beneath it.
 *
 * Apps whose CTA goes somewhere no badge does — Hakkan's beta signup — keep
 * their pill, which is why this asks about the destination rather than simply
 * hiding the pill whenever badges exist.
 */
export function badgesCover(app: App, href: string): boolean {
  if (!app.stores) return false;
  return Object.values(app.stores).some((url) => url === href);
}

/** "iOS", "iOS and Android", "iOS, Android and Chrome". */
function list(names: string[]): string {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function Badge({ href, art }: { href: string | null; art: (typeof STORE_ART)[StoreKey] }) {
  const img = (
    <Image
      src={art.src}
      alt={art.alt}
      width={Math.round(HEIGHT * art.ratio)}
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

export default function StoreBadges({ app, className }: { app: App; className?: string }) {
  if (!app.stores) return null;

  const declared = ORDER.filter((key) => key in app.stores!);
  if (declared.length === 0) return null;

  const pending = declared.filter((key) => !app.stores![key]);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {declared.map((key) => (
          <Badge key={key} href={app.stores![key] ?? null} art={STORE_ART[key]} />
        ))}
      </div>
      {pending.length > 0 && (
        <p className="mt-3 text-[0.875rem] text-faint">
          Coming soon to {list(pending.map((key) => STORE_ART[key].name))}.
        </p>
      )}
    </div>
  );
}
