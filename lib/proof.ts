/**
 * Proof registry — real, verifiable results only.
 *
 * Same contract as lib/testimonials.ts: never add a number that was not
 * actually measured on a real engagement, and never round a number into a
 * better-sounding one. Every entry carries a `source` note saying where it
 * comes from. If a claim cannot be traced, it does not ship.
 */

export interface ProofStat {
  /** Display value, e.g. "742" or "R252". Keep units in the value. */
  value: string;
  /** What the number measures, lowercase, no full stop. */
  label: string;
  /** Optional comparison or context line. */
  detail?: string;
}

export interface CaseProof {
  slug: string;
  client: string;
  /** What the engagement was, one line. */
  engagement: string;
  period: string;
  stats: ProofStat[];
  /** Optional honest qualifier — we say what didn't work too. */
  note?: string;
  /** Provenance — where these numbers were measured/recorded. */
  source: string;
  /** Service detail pages allowed to cite this case. */
  serviceSlugs: string[];
}

/** Studio-level numbers, used in the hero proof line and the founder note. */
export const STUDIO_STATS: ProofStat[] = [
  { value: "12+", label: "years across product, brand, and growth" },
  { value: "1,200+", label: "projects and clients served" },
  { value: "4", label: "products of our own in active development" },
];

export const caseProofs: CaseProof[] = [
  {
    slug: "thrifty-adventures",
    client: "Thrifty Adventures",
    engagement: "LinkedIn paid media for a South African travel brand, from zero",
    period: "Jul 2025 – Jan 2026",
    stats: [
      {
        value: "742",
        label: "leads",
        detail: "at R29.57 each",
      },
      {
        value: "4.91M",
        label: "impressions",
        detail: "0.97% CTR vs a 0.52% benchmark",
      },
      {
        value: "−81%",
        label: "cost per thousand impressions",
        detail: "R63.16 down to R12.18",
      },
    ],
    note: "Not everything worked: the offer, not the audience, was what the channel actually rewarded — the brochure offer converted at 36.6% where the generic form managed 8.6%.",
    source:
      "Campaign reporting from the engagement; full case study at alroyndhlovu.com.",
    serviceSlugs: ["product-and-growth", "websites"],
  },
  {
    slug: "innovatr",
    client: "Innovatr",
    engagement:
      "Rebrand, website rebuild, content engine, paid programme, and CRM — brand & marketing manager role",
    period: "Mar – Sep 2026",
    stats: [
      {
        value: "R252",
        label: "cost per lead",
        detail: "against a ~R744 industry median",
      },
      {
        value: "61%",
        label: "of ad delivery reached decision-makers",
      },
      {
        value: "3,094",
        label: "CRM contacts built from zero",
        detail: "1,272 organisations",
      },
      {
        value: "91%",
        label: "of leads on work email by the end",
        detail: "up from 27%",
      },
    ],
    source:
      "Platform and CRM reporting from the engagement; full case study at alroyndhlovu.com.",
    serviceSlugs: ["brand-and-content", "product-and-growth"],
  },
  {
    slug: "social-sweep",
    client: "Innovatr — Social Sweep",
    engagement:
      "Internal research product: social listening reports across 46 platforms",
    period: "2026",
    stats: [
      {
        value: "$8,000/yr",
        label: "licence it replaced",
      },
      {
        value: "46",
        label: "platforms covered via one API",
      },
      {
        value: "R20,000",
        label: "price per study as a product",
      },
    ],
    source:
      "Build and pricing records from the engagement; full case study at alroyndhlovu.com.",
    serviceSlugs: ["apps-and-saas", "tech-and-automation"],
  },
];

export function getCaseProofsForService(slug: string): CaseProof[] {
  return caseProofs.filter((c) => c.serviceSlugs.includes(slug));
}
