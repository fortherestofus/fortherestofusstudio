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
  /**
   * "client" = paid work for a named client. "exploration" = self-directed
   * work of our own. The distinction is never blurred on the page: an
   * exploration is labelled as one, because presenting it as a client
   * engagement would be a claim we cannot make.
   */
  kind: "client" | "exploration";
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
  { value: "4", label: "products of our own, all in beta testing" },
];

export const caseProofs: CaseProof[] = [
  {
    slug: "thrifty-adventures",
    kind: "client",
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
    kind: "client",
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
    kind: "client",
    client: "Innovatr — Social Sweep",
    engagement:
      "Built the social-listening capability in-house instead of licensing it: plain-language question in, a cited report out",
    period: "2026 · about two months",
    stats: [
      {
        value: "$8,000/yr",
        label: "licence it replaced",
        detail: "the quote Innovatr was working from",
      },
      {
        value: "46",
        label: "platforms reachable through one API",
        detail: "368 endpoints; it picks the subset each question needs",
      },
      {
        value: "R20,000",
        label: "positioned price per study",
        detail: "a line of cost became a line of product",
      },
    ],
    note: "The tool Innovatr was about to licence was itself acquired by a market research group a few months later — a company that had spent four years and outside investment getting there. Social Sweep took about two months and two subscriptions. Not a claim of parity: theirs has a roadmap, a support desk and customers who are not us.",
    source:
      "Build and pricing records from the engagement; R20,000 is the price it was positioned at, not revenue booked. Full case study at alroyndhlovu.com.",
    serviceSlugs: ["apps-and-saas", "tech-and-automation"],
  },
  {
    slug: "lumiskin",
    kind: "exploration",
    client: "LumiSkin",
    engagement:
      "A luxury cosmetics storefront whose hero performs the product: a chameleon matches the bar beside it, and the card arrives on the colour match",
    period: "Mar 2026",
    stats: [
      {
        value: "< $300",
        label: "to produce, all in",
        detail: "against $6,500+ taking the bottom of every conventional range",
      },
      {
        value: "~20×",
        label: "cheaper than the conventional route",
        detail: "studio day, CGI house, animal handler, build",
      },
      {
        value: "16 + 24s",
        label: "generated images and video",
        detail: "one person, no crew, no studio, no animal",
      },
    ],
    note: "The conclusion is narrower than \"AI is cheap\": what collapsed is the cost of producing assets. Deciding that a chameleon is the right idea, and that the sequence must never depend on autoplay, did not get cheaper — and that is what makes the page work.",
    source:
      "Self-directed design exploration, not client work. Costs are list prices actually paid; comparison ranges are published 2026 market rates, not quotes anyone gave. Full case study at alroyndhlovu.com.",
    serviceSlugs: ["websites", "brand-and-content", "tech-and-automation"],
  },
];

export function getCaseProofsForService(slug: string): CaseProof[] {
  return caseProofs.filter((c) => c.serviceSlugs.includes(slug));
}

/** Client engagements only — what the "real clients, real numbers" surfaces show. */
export const clientProofs = caseProofs.filter((c) => c.kind === "client");
