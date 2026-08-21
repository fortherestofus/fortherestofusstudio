/**
 * Proof registry — real, verifiable results only.
 *
 * Same contract as lib/testimonials.ts: never add a number that was not
 * actually measured on a real engagement, and never round a number into a
 * better-sounding one. Every entry carries a `source` note saying where it
 * comes from. If a claim cannot be traced, it does not ship.
 */

export interface ProofStat {
  /** Display value, e.g. "742" or "~3×". Keep units in the value. */
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
   * "client" = paid work for a named client. "venture" = a business of our
   * own that took real money from real customers. "exploration" = a
   * self-directed piece with no customers at all. The distinction is never
   * blurred on the page — each is labelled — because presenting our own
   * venture or a concept as a client engagement would be a claim we cannot
   * make.
   */
  kind: "client" | "venture" | "exploration";
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
  // CaughtSlipping shipped to the Chrome Web Store on 2026-08-13; the other
  // three are still in beta. Keep this split honest as each one lands.
  {
    value: "4",
    label: "products of our own",
    detail: "one live, three in beta",
  },
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
        detail: "from a channel that had never run before — cost per lead stays with the client",
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
        value: "~3×",
        label: "better cost per lead than the category median",
        detail: "against a published B2B services benchmark",
      },
      {
        value: "61%",
        label: "of ad delivery reached decision-makers",
      },
      {
        value: "0 → live",
        label: "CRM built from nothing",
        detail: "segmented, documented, and handed over",
      },
      {
        value: "91%",
        label: "of leads arriving on a work email",
        detail: "the lead quality the programme was built to reach",
      },
    ],
    source:
      "Platform and CRM reporting from the engagement. Absolute cost-per-lead and pipeline volumes are held back deliberately — they are the client's commercial data. Full case study at alroyndhlovu.com.",
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
        value: "In-house",
        label: "capability built instead of licensed",
        detail: "the alternative was an annual enterprise licence",
      },
      {
        value: "46",
        label: "platforms reachable through one API",
        detail: "368 endpoints; it picks the subset each question needs",
      },
      {
        value: "Cost → product",
        label: "a line of spend became something sellable",
        detail: "the capability now earns rather than bills",
      },
    ],
    note: "The category is real: a comparable tool was acquired by a market research group a few months later — a company that had spent four years and outside investment getting there. Social Sweep took about two months and two subscriptions. Not a claim of parity: theirs has a roadmap, a support desk and customers who are not us.",
    source:
      "Build records from the engagement. Commercial figures are held back deliberately — pricing belongs to the client. Full case study at alroyndhlovu.com.",
    serviceSlugs: ["apps-and-saas", "tech-and-automation"],
  },
  {
    slug: "filosofee",
    kind: "venture",
    client: "Filosofee",
    engagement:
      "Our own clothing brand, built end to end: product, store, payment gateways, photography and content — then validated by selling",
    period: "2024 – present",
    stats: [
      {
        value: "Month one",
        label: "first sales, local and international",
        detail: "the validation that mattered — people paid",
      },
      {
        value: "20 pieces",
        label: "first bulk order",
        detail: "branded merch produced for Thrifty Adventures",
      },
      {
        value: "B2C → B2B",
        label: "one storefront, two business models",
        detail: "direct to customers, then collaborations",
      },
    ],
    note: "We also killed a product: stickers. The admin per order, the packing, and the margin at that size never justified themselves for a small team — the honest answer was to stop, not to push harder.",
    source:
      "Our own brand, not client work. filosofee.shop. Sales figures are deliberately unstated — 'first sales in month one' is what we can evidence without publishing a revenue number.",
    serviceSlugs: ["websites", "brand-and-content", "product-and-growth"],
  },
  {
    slug: "lumiskin",
    kind: "exploration",
    client: "LumiSkin",
    engagement:
      "A concept that circulated as a joke about impossible briefs, built for real: a luxury cosmetics storefront whose hero performs the product — a chameleon matches the bar beside it, and the card arrives on the colour match",
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
    note: "The conclusion is narrower than \"AI is cheap\": what collapsed is the cost of producing assets. Moving the mechanic to a category whose identity is colour, and making sure the sequence never depends on autoplay, did not get cheaper — and that is what makes the page work.",
    source:
      "Self-directed design exploration, not client work. The chameleon mechanic is not ours: it came from a concept site circulated as a meme captioned to say the thing was unbuildable, credited to @uiux_sumeet. The build, the category and the costs are ours. Costs are list prices actually paid; comparison ranges are published 2026 market rates, not quotes anyone gave. Full case study at alroyndhlovu.com.",
    serviceSlugs: ["websites", "brand-and-content", "tech-and-automation"],
  },
];

export function getCaseProofsForService(slug: string): CaseProof[] {
  return caseProofs.filter((c) => c.serviceSlugs.includes(slug));
}

/** Client engagements only — what the "real clients, real numbers" surfaces show. */
export const clientProofs = caseProofs.filter((c) => c.kind === "client");
