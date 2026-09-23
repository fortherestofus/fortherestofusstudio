/**
 * Where a visit came from — "tiktok", "instagram", "google" — so a tap on a
 * store badge can carry it into the Play link. Used by tapa's pages (see
 * components/analytics/TapaAnalytics.tsx); a copy of the same logic lives on
 * inspiritintruth.net.
 *
 * WHY: an install has no referrer of its own. Play Console only knows the
 * source if the link that sent someone there says so.
 *
 * Held in memory only, never in storage — the privacy policy promises
 * nothing is stored in the browser. Client-side navigation keeps
 * `document.referrer` as the original external one, and the value is read
 * once on first load, before `?utm_source=` can drop off the URL.
 */

const OWN_HOST = "fortherestofus.app";

/** Hostname suffix → the label we want to see in the store dashboards. */
const KNOWN_SOURCES: [string, string][] = [
  ["tiktok.com", "tiktok"],
  ["instagram.com", "instagram"],
  ["facebook.com", "facebook"],
  ["fb.com", "facebook"],
  ["threads.net", "threads"],
  ["threads.com", "threads"],
  ["t.co", "x"],
  ["x.com", "x"],
  ["twitter.com", "x"],
  ["youtube.com", "youtube"],
  ["whatsapp.com", "whatsapp"],
  ["linkedin.com", "linkedin"],
  ["lnkd.in", "linkedin"],
  ["pinterest.com", "pinterest"],
  ["bing.com", "bing"],
  ["duckduckgo.com", "duckduckgo"],
];

const SOCIAL = new Set([
  "tiktok", "instagram", "facebook", "threads", "x", "youtube",
  "whatsapp", "linkedin", "pinterest",
]);
const SEARCH = new Set(["google", "bing", "duckduckgo"]);

/** Store-safe label: lowercase letters, digits, dot, dash. */
function clean(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9.-]/g, "").slice(0, 30);
}

function fromReferrer(referrer: string): string | null {
  let host: string;
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
  if (!host || host === OWN_HOST || host.endsWith(`.${OWN_HOST}`)) return null;
  if (/(^|\.)google\.[a-z.]+$/.test(host)) return "google";
  const hit = KNOWN_SOURCES.find(
    ([suffix]) => host === suffix || host.endsWith(`.${suffix}`),
  );
  return hit ? hit[1] : clean(host);
}

let cached: string | null | undefined;

/** The visit's source, or null for a direct visit. Read once, then fixed. */
export function getTrafficSource(): string | null {
  if (cached !== undefined) return cached;
  if (typeof window === "undefined") return null;
  const utm = new URLSearchParams(window.location.search).get("utm_source");
  cached = utm ? clean(utm) || null : fromReferrer(document.referrer);
  return cached;
}

/**
 * A Google Play link with the source attached as utm tags, which Play
 * Console reports under Acquisition. `utm_campaign` names the page, so a
 * direct visit still shows up rather than nothing.
 */
export function tagPlayLink(href: string, campaign: string): string {
  const source = getTrafficSource();
  const url = new URL(href);
  url.searchParams.set(
    "referrer",
    new URLSearchParams({
      utm_source: source ?? "website",
      utm_medium: source
        ? SOCIAL.has(source) ? "social" : SEARCH.has(source) ? "search" : "referral"
        : "direct",
      utm_campaign: campaign,
    }).toString(),
  );
  return url.toString();
}
