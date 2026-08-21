/**
 * What each service page shows: a strip of real work, and the one case it
 * anchors on.
 *
 * The rule that keeps this honest and non-repetitive: **one case anchors
 * one page**. Filosofee touches all three pillars, so it appears on three
 * pages — but each shows a different face of it (the store, the identity,
 * the economics), never the same artefact twice. Anything a page cannot
 * evidence, it does not claim.
 */
import type { WorkImage } from "@/lib/work";
import {
  automationWork,
  filosofeeAiMedia,
  filosofeeIdentity,
  filosofeeStickers,
  identityWork,
  marketingWork,
  socialSweepCharts,
  storeDesignWork,
} from "@/lib/work";
import { apps } from "@/lib/apps";

export interface ServiceShowcase {
  /** Heading for the work strip. */
  stripTitle: string;
  stripIntro: string;
  pieces: WorkImage[];
  /** Slug in lib/proof.ts this page anchors on. */
  caseSlug: string;
  /** Which face of that case this page tells. */
  caseAngle: string;
}

const appShot = (slug: string): WorkImage => {
  const app = apps.find((a) => a.slug === slug)!;
  const shot = app.screenshots[0];
  return {
    src: shot.src,
    alt: `${app.name} — ${app.tagline}`,
    width: shot.width,
    height: shot.height,
    caption: app.name,
  };
};

export const SERVICE_SHOWCASE: Record<string, ServiceShowcase> = {
  "apps-and-saas": {
    stripTitle: "Products we have shipped",
    stripIntro:
      "Four of our own, plus the research tool we built for a client instead of licensing one.",
    pieces: [
      appShot("hakkan"),
      appShot("inspiritintruth"),
      appShot("tapa"),
      socialSweepCharts,
    ],
    caseSlug: "social-sweep",
    caseAngle:
      "The clearest version of this service: a client was about to rent a capability on an annual enterprise licence, so we built it instead — and it became something they could sell.",
  },
  websites: {
    stripTitle: "Sites we have built",
    stripIntro:
      "Filmed scrolling, because a static frame says almost nothing about a website.",
    /*
     * Empty on purpose: the Websites page renders its work as click-to-play
     * videos from lib/work's builtSites instead of a still-image strip
     * (app/services/[slug]/page.tsx special-cases the slug).
     */
    pieces: [],
    caseSlug: "filosofee",
    caseAngle:
      "Our own store, end to end: product, site, payment gateways — then the only validation that counts, people paying for it.",
  },
  "brand-and-content": {
    stripTitle: "Identity we have made",
    stripIntro:
      "Wordmarks, packaging, editorial, photography and the store listings where design and copy are visibly the same job.",
    pieces: [
      ...identityWork.slice(0, 3),
      ...filosofeeIdentity.slice(0, 3),
      storeDesignWork[0],
    ],
    caseSlug: "innovatr",
    caseAngle:
      "A rebrand that had to survive contact with reality: a new line, a rebuilt site, and a content engine the team could actually keep running.",
  },
  "product-and-growth": {
    stripTitle: "Campaigns and content that ran",
    stripIntro:
      "The work that went out, and the decisions behind what did not.",
    pieces: [...marketingWork, ...filosofeeAiMedia.slice(0, 2), filosofeeStickers],
    caseSlug: "thrifty-adventures",
    caseAngle:
      "Awareness to leads to sales for a travel brand starting from nothing — including the offer that worked and the one that did not.",
  },
  "tech-and-automation": {
    stripTitle: "The bench we build on",
    stripIntro:
      "The tools we actually run, and the media we generate instead of shooting when a shoot would not pay for itself.",
    pieces: [...automationWork, ...filosofeeAiMedia],
    caseSlug: "social-sweep",
    caseAngle:
      "Platform APIs and an AI reasoning layer, built in about two months instead of signing an annual enterprise licence.",
  },
};
