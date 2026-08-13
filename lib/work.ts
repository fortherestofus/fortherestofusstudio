/**
 * Real work artefacts — client and craft pieces carried over from
 * alroyndhlovu.com (see docs/ASSETS.md for provenance).
 *
 * Same contract as lib/proof.ts: everything here is work actually done for
 * a named client or shot by the studio. Nothing generated, nothing stock.
 * Dimensions are recorded so next/image reserves the right box.
 */

export interface WorkImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Short caption shown under or over the artefact. */
  caption?: string;
}

/**
 * The LumiSkin site, filmed scrolling — the studio's most complete
 * lifecycle piece in one artefact: a product, an identity, and a shop.
 */
export const lumiskinVideo = {
  src: "/video/lumiskin-site.mp4",
  poster: "/video/lumiskin-site-poster.webp",
  width: 1280,
  height: 660,
  caption: "LumiSkin — the version that made it out of the notes app.",
};

/** The Deja Media site, filmed scrolling. Kept for the services surfaces. */
export const dejaMediaVideo = {
  src: "/video/dejamedia-site.mp4",
  poster: "/video/dejamedia-site-poster.webp",
  width: 1280,
  height: 720,
  caption: "Deja Media — a site built to be edited by the people who own it.",
};

/**
 * LumiSkin — the storefront in its three colourways plus the product
 * frames. Captions describe the colourway rather than naming individual
 * bars: the filenames and the on-screen product cards do not line up
 * reliably, and guessing a product name would be inventing one.
 */
export const lumiskinWork: WorkImage[] = [
  {
    src: "/work/lumiskin/hero-aurora.jpg",
    alt: "LumiSkin storefront hero in lavender, the chameleon matched to the bar beside it",
    width: 1600,
    height: 824,
    caption: "The lavender colourway",
  },
  {
    src: "/work/lumiskin/hero-jade.jpg",
    alt: "LumiSkin storefront hero in pink, the chameleon matched to the bar beside it",
    width: 1600,
    height: 824,
    caption: "The pink colourway",
  },
  {
    src: "/work/lumiskin/hero-peach.jpg",
    alt: "LumiSkin storefront hero in amber, the chameleon matched to the bar beside it",
    width: 1600,
    height: 824,
    caption: "The amber colourway",
  },
  {
    src: "/work/lumiskin/collection-aurora.jpg",
    alt: "A LumiSkin soap bar pressed with dried lavender",
    width: 1200,
    height: 1200,
    caption: "The bar itself",
  },
  {
    src: "/work/lumiskin/macro-mold.jpg",
    alt: "A carved LumiSkin bar surrounded by botanicals and tools",
    width: 1200,
    height: 1200,
    caption: "Sculptural moulds",
  },
  {
    src: "/work/lumiskin/protocol-research.jpg",
    alt: "LumiSkin botanical ingredients laid out on a plate",
    width: 1200,
    height: 1200,
    caption: "Botanical research",
  },
];

/**
 * The automation bench — the platforms we actually build on. Third-party
 * product screens (Zapier, Claude), shown as the tools of the trade, never
 * as something we made.
 */
export const automationWork: WorkImage[] = [
  {
    src: "/work/automation-zapier-canvas.png",
    alt: "A Zapier Canvas board mapping a lead-triage workflow end to end",
    width: 1942,
    height: 1107,
    caption: "Mapping the workflow before automating it",
  },
  {
    src: "/work/automation-claude-cowork.jpg",
    alt: "Claude Cowork working through a task list against a folder of documents",
    width: 1280,
    height: 720,
    caption: "AI doing the repetitive reading",
  },
  {
    src: "/work/automation-zapier-pricing.png",
    alt: "Zapier consulting and automation pricing screen",
    width: 1140,
    height: 642,
    caption: "Costing the automation honestly",
  },
];

/** Social Sweep's demo, for the automation and product surfaces. */
export const socialSweepVideo = {
  src: "/video/social-sweep-demo.mp4",
  poster: "/work/social-sweep-charts.jpg",
  width: 1280,
  height: 720,
  caption: "Social Sweep — a full study running end to end.",
};

/** Social content in motion, used where a still would go flat. */
export const socialContentVideo = {
  src: "/video/social-content.mp4",
  poster: "/video/social-content-poster.webp",
  width: 1080,
  height: 1080,
  caption: "Campaign content, built to publish.",
};

/** Innovatr's homepage, before and after the rebuild. */
export const innovatrRedesign: { before: WorkImage; after: WorkImage } = {
  before: {
    src: "/work/innovatr-home-before.jpg",
    alt: "The Innovatr homepage before the rebuild",
    width: 2090,
    height: 1292,
  },
  after: {
    src: "/work/innovatr-home-after.jpg",
    alt: "The Innovatr homepage after the rebuild",
    width: 2642,
    height: 1508,
  },
};

/** Identity work — the look and feel of things we have named. */
export const identityWork: WorkImage[] = [
  {
    src: "/media/brand-logo-legacylab.webp",
    alt: "Legacy Lab wordmark and identity system",
    width: 2048,
    height: 1146,
    caption: "Legacy Lab — wordmark",
  },
  {
    src: "/media/brand-cards-gold.webp",
    alt: "Gold-foil business cards for Deja Media",
    width: 2048,
    height: 1536,
    caption: "Deja Media — gold foil",
  },
  {
    src: "/media/design-packaging.webp",
    alt: "Wine label design across three bottle mockups",
    width: 1200,
    height: 900,
    caption: "Wine label — packaging",
  },
  {
    src: "/media/brand-magazine.webp",
    alt: "Magazine cover and spread design",
    width: 1200,
    height: 1697,
    caption: "LE'CONTENT — editorial",
  },
  {
    src: "/media/photography-editorial-mag.webp",
    alt: "Editorial beauty photography shot for a magazine feature",
    width: 1200,
    height: 1500,
    caption: "Editorial — photography",
  },
];

/**
 * Store-listing design — where brand and content are the same job: the
 * screens, the headlines above them and the promise they make, designed
 * together. Wide sheets; render them contained, never cropped.
 */
export const storeDesignWork: WorkImage[] = [
  {
    src: "/work/store-tapa.jpg",
    alt: "tapa. App Store screens with their headlines: cook with what you have, one recipe tailored to you",
    width: 1926,
    height: 695,
    caption: "tapa. — store listing",
  },
  {
    src: "/work/store-isit.jpg",
    alt: "InSpiritInTruth App Store screens with their headlines: a devotion written just for you",
    width: 1926,
    height: 695,
    caption: "InSpiritInTruth — store listing",
  },
  {
    src: "/work/store-caughtslipping.png",
    alt: "CaughtSlipping work-mode screen: Caught Grinding, for the overworkers",
    width: 1280,
    height: 800,
    caption: "CaughtSlipping — work mode",
  },
];

/** Marketing artefacts, for the "be known" side of the lifecycle. */
export const marketingWork: WorkImage[] = [
  {
    src: "/work/thrifty-social.webp",
    alt: "Thrifty Adventures social campaign post grid",
    width: 1504,
    height: 846,
    caption: "Thrifty Adventures — campaign",
  },
  {
    src: "/work/innovatr-social-trends.png",
    alt: "Innovatr research carousel on Gen Z trends",
    width: 1200,
    height: 627,
    caption: "Innovatr — research content",
  },
];

/**
 * Two commissioned still lifes, generated for the studio (Grok Imagine).
 * They stand in only where no real artefact exists — automation is a
 * process, not a screen, and a contact page has nothing to photograph.
 * Everything else on the site is real work.
 */
export const automationStillLife: WorkImage = {
  src: "/media/automate-visual.jpg",
  alt: "Brass clockwork mechanism driving a cascade of dominoes, one glowing ember-orange",
  width: 1248,
  height: 832,
  caption: "One thing sets off the next. That is the whole idea.",
};

export const contactStillLife: WorkImage = {
  src: "/media/contact-visual.jpg",
  alt: "A small round table by a sunlit window, two cups and an open chair",
  width: 1248,
  height: 832,
};

/** Social Sweep's report charts — the automation/product artefact. */
export const socialSweepCharts: WorkImage = {
  src: "/work/social-sweep-charts.jpg",
  alt: "Social Sweep report charts across 46 platforms",
  width: 2332,
  height: 1512,
  caption: "Social Sweep — one report, 46 platforms",
};
