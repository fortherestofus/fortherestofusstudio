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

/**
 * The sites we have built, filmed scrolling — the Websites page shows these
 * as click-to-play videos, because a static frame of a website says almost
 * nothing about one. There are more; the page says so and points at
 * contact rather than padding the list.
 */
export const builtSites: {
  src: string;
  poster: string;
  title: string;
  caption: string;
}[] = [
  {
    src: "/video/filosofee-site.mp4",
    poster: "/video/filosofee-site-poster.webp",
    title: "Filosofee",
    caption: "Our own store — product, checkout, payment gateways.",
  },
  {
    src: "/video/festival-site.mp4",
    poster: "/video/festival-site-poster.webp",
    title: "Festival of Eventing",
    caption: "An event brand's home — programme, partners, registration.",
  },
  {
    src: "/video/dejamedia-site.mp4",
    poster: "/video/dejamedia-site-poster.webp",
    title: "Deja Media",
    caption: "A studio site built to be edited by the people who own it.",
  },
];

/** The Deja Media site, filmed scrolling. Kept for the services surfaces. */
export const dejaMediaVideo = {
  src: "/video/dejamedia-site.mp4",
  poster: "/video/dejamedia-site-poster.webp",
  width: 1280,
  height: 720,
  caption: "Deja Media — a site built to be edited by the people who own it.",
  /** The poster as a still, for rails that cannot hold a video. */
  posterAsWork: {
    src: "/video/dejamedia-site-poster.webp",
    alt: "The Deja Media site",
    width: 1280,
    height: 720,
    caption: "Deja Media — built to be edited by its owners",
  } satisfies WorkImage,
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

/**
 * Filosofee — our own clothing brand, and the one case that touches all
 * three pillars. Grouped by which pillar each artefact argues for, so a
 * service page can take the slice that belongs to it and no page repeats
 * another.
 */
export const filosofeeVideo = {
  src: "/video/filosofee-site.mp4",
  poster: "/video/filosofee-site-poster.webp",
  width: 1280,
  height: 720,
  caption: "filosofee.shop — the store, built and taking payments.",
};

/**
 * Build: the storefront. The payments strip lives separately — it is a
 * 700×59 utility graphic, and anything that thin turns a fixed-height rail
 * into a very wide empty box.
 */
export const filosofeeStore: WorkImage[] = [
  {
    src: "/work/filosofee/site-home.jpg",
    alt: "The Filosofee storefront homepage",
    width: 570,
    height: 600,
    caption: "The storefront",
  },
];

export const filosofeePayments: WorkImage = {
  src: "/work/filosofee/site-payments.png",
  alt: "Card, Mastercard and PayPal payment options on the Filosofee checkout",
  width: 700,
  height: 59,
  caption: "Gateways, live",
};

/** Identity: the shoot that set the product truth, and the voice on it. */
export const filosofeeIdentity: WorkImage[] = [
  {
    src: "/work/filosofee/shoot-wordmark.jpg",
    alt: "Studio shot of the Filosofee wordmark tee",
    width: 1080,
    height: 1350,
    caption: "The wordmark, shot",
  },
  {
    src: "/work/filosofee/shoot-pair.jpg",
    alt: "Two models in Filosofee tees against a studio backdrop",
    width: 1080,
    height: 1350,
    caption: "The range",
  },
  {
    src: "/work/filosofee/tee-indoda.png",
    alt: "“indoda must what?” speech-bubble graphic tee design",
    width: 900,
    height: 900,
    caption: "Voice, worn",
  },
  {
    src: "/work/filosofee/tee-zero.png",
    alt: "“I have zero talking stages left in me” graphic tee design",
    width: 900,
    height: 900,
    caption: "Voice, worn",
  },
];

/**
 * Grow: the AI set. Deliberately the frames a shoot could not reach — a
 * New York street, a diner, a field with a tiger — because that is the
 * actual argument. The studio shoot above gave these their base.
 */
export const filosofeeAiMedia: WorkImage[] = [
  {
    src: "/work/filosofee/ai-street.jpg",
    alt: "Generated campaign frame: a model in Filosofee on a brownstone street",
    width: 1024,
    height: 1536,
    caption: "A street we never flew to",
  },
  {
    src: "/work/filosofee/ai-diner.jpg",
    alt: "Generated campaign frame: a model in Filosofee in a diner",
    width: 1024,
    height: 1536,
    caption: "A diner we never booked",
  },
  {
    src: "/work/filosofee/ai-tiger.jpg",
    alt: "Generated campaign frame: a model in Filosofee in a field beside a tiger",
    width: 1024,
    height: 1536,
    caption: "A tiger, obviously",
  },
];

/** The product we stopped making — the honest chapter. */
export const filosofeeStickers: WorkImage = {
  src: "/work/filosofee/site-stickers.jpg",
  alt: "Filosofee sticker product photographed on a laptop",
  width: 570,
  height: 600,
  caption: "Stickers — the line we closed",
};

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
 * The one commissioned still life left, generated for the studio (Grok
 * Imagine). It stands in where no real artefact exists — automation is a
 * process, not a screen. Everything else on the site is real work.
 *
 * A second one sat on /contact until Alroy called it: a generated table and
 * two cups is not a portfolio and proves nothing at the moment someone is
 * deciding whether to write. The studio's real numbers took its place.
 */
export const automationStillLife: WorkImage = {
  src: "/media/automate-visual.jpg",
  alt: "Brass clockwork mechanism driving a cascade of dominoes, one glowing ember-orange",
  width: 1248,
  height: 832,
  caption: "One thing sets off the next. That is the whole idea.",
};

/** Social Sweep's report charts — the automation/product artefact. */
export const socialSweepCharts: WorkImage = {
  src: "/work/social-sweep-charts.jpg",
  alt: "Social Sweep report charts across 46 platforms",
  width: 2332,
  height: 1512,
  caption: "Social Sweep — one report, 46 platforms",
};
