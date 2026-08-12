/**
 * StoreBadges — Apple's and Google's official badges for an app that ships on
 * the stores.
 *
 * Used as supplied: both artworks carry their own wordmark and neither owner
 * permits rebuilding them from an icon plus our own text. They share a 3.375:1
 * ratio, so one height keeps them level.
 *
 * `stores` present with null values means the app is coming but the listing is
 * not up: the badges render, they are not links, and the caller's own
 * coming-soon line carries that. They are deliberately not dimmed — greying
 * someone else's mark is a modification of it.
 */
import Image from "next/image";
import type { App } from "@/lib/apps";

const HEIGHT = 44;
const WIDTH = Math.round(HEIGHT * 3.375);

function Badge({
  href,
  src,
  alt,
}: {
  href: string | null;
  src: string;
  alt: string;
}) {
  const img = (
    <Image src={src} alt={alt} width={WIDTH} height={HEIGHT} className="h-11 w-auto" />
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

export default function StoreBadges({
  app,
  className,
}: {
  app: App;
  className?: string;
}) {
  if (!app.stores) return null;
  const live = Boolean(app.stores.ios || app.stores.android);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Badge
          href={app.stores.ios}
          src="/icons/download-on-the-app-store-1.svg"
          alt="Download on the App Store"
        />
        <Badge
          href={app.stores.android}
          src="/icons/google-play-badge-2022-2.svg"
          alt="Get it on Google Play"
        />
      </div>
      {!live && (
        <p className="mt-3 text-[0.875rem] text-faint">
          Coming soon to iOS and Android.
        </p>
      )}
    </div>
  );
}
