/**
 * Media used by the home hero collage only.
 *
 * Deliberately separate from lib/apps.ts: app pages stay editorial with
 * placeholder art, and real screenshots appear on the home page alone. Keeping
 * the two apart means adding a screenshot here never leaks onto an app page.
 *
 * Every entry is optional — an empty value falls back to a placeholder block
 * sized identically, so files can land one at a time with no layout shift.
 */

/** The large desktop/SaaS window. Real Hakkan report view. */
export const desktopShot = "/screenshots/hakkan-report.jpg";

/** The small phone screen. Real tapa home screen. */
export const phoneShot = "/screenshots/tapa-home.jpg";

export interface ContentSample {
  src: string;
  alt: string;
}

/**
 * Real work samples for the content tile — photography and graphic design.
 * Add files to /public/media/ and list them here (2 is the design intent;
 * more are ignored). Until then the tile shows placeholder frames.
 */
export const contentSamples: ContentSample[] = [];

/** Lines the content tile types out, in order. Kept short so they fit. */
export const contentTypedLines = [
  "Built for the rest of us.",
  "Say it plainly.",
  "Ship, then improve.",
];
