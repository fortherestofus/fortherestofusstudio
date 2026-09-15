"use client";

/**
 * OpenInTapaButton — "Open in tapa." on a shared recipe, Android only.
 *
 * WHY IT EXISTS: a verified App Link opens the app when the share is tapped in
 * a real browser or messenger, but in-app browsers (Instagram, X, Gmail) keep
 * https links to themselves and load this page instead. An intent:// URL is
 * the one thing those WebViews hand to the OS. If tapa. is not installed,
 * Chrome follows S.browser_fallback_url back to this same page.
 *
 * No iOS equivalent on purpose: tapa. has no custom URL scheme, and Universal
 * Links cannot be forced from inside a page.
 *
 * The page HTML is cached and identical for every visitor, so the platform is
 * read on the client. useSyncExternalStore reports false on the server and
 * during hydration (no mismatch), then the real answer, without the
 * setState-in-effect the lint rules forbid (same pattern as DarkModeToggle).
 */
import { useSyncExternalStore } from "react";
import { ArrowUpRight } from "lucide-react";
import { shareUrl } from "@/lib/tapaShare";
import { cn } from "@/lib/cn";

const subscribe = () => () => {};
const isAndroid = () => /android/i.test(navigator.userAgent);

export default function OpenInTapaButton({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const android = useSyncExternalStore(subscribe, isAndroid, () => false);
  if (!android) return null;

  const href =
    `intent://fortherestofus.app/apps/tapa/r/${code}/#Intent;scheme=https;` +
    `package=com.fortherestofus.tapa;` +
    `S.browser_fallback_url=${encodeURIComponent(shareUrl(code))};end`;

  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[12px] bg-ink px-6 py-3 text-base font-medium text-bg",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pill",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        className,
      )}
    >
      Open in tapa.
      <ArrowUpRight aria-hidden className="h-4 w-4" />
    </a>
  );
}
