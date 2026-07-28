export type AppStatus = "In Development" | "Beta" | "Live";

export interface AppFeature {
  icon: string; // Lucide icon name (see components/ui/Icon.tsx registry)
  title: string;
  description: string;
}

export interface App {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  shortDescription: string; // used on cards (keep to ~2 lines)
  overview: string[]; // detail-page overview, one string per paragraph
  status: AppStatus;
  platform: string[];
  price: string;
  icon: string; // path: /icons/[slug].png
  /**
   * Per-app tint. Drives --color-accent on that app's pages only; global
   * surfaces, type, and ink buttons never change.
   */
  accentColor: string;
  /** Readable text/icon color on a solid accentColor fill. Defaults to white. */
  accentInk?: string;
  /**
   * A darkened accent used for text and icons sitting on a pale accent wash.
   * Several brand accents (gold, acid yellow) are unreadable at body sizes on
   * a light tint of themselves, so pages use this instead. Defaults to
   * accentColor.
   */
  accentDeep?: string;
  features: AppFeature[];
  screenshots: string[]; // paths: /screenshots/[slug]-1.png
  ctaLabel: string;
  ctaHref: string;
  /** Set when ctaHref points off-site (opens in a new tab). */
  ctaExternal?: boolean;
  seo: {
    title: string;
    description: string;
  };
  giving?: string; // path to the app's giving page, if it accepts gifts
  legal?: {
    privacy: string;
    terms: string;
    /** True when the legal pages live on the app's own domain. */
    external?: boolean;
  };
}

export const apps: App[] = [
  {
    slug: "caught-slipping",
    name: "CaughtSlipping",
    category: "Focus & Productivity",
    tagline: "The browser extension that calls you out.",
    shortDescription:
      "Tracks where your day online really goes — the scrolling and the overworking — and serves it back to you, without mercy.",
    overview: [
      "Your phone already nags you about screen time. But the real damage — and the real work — happens on the computer you sit at all day. CaughtSlipping lives there, quietly tracking where your hours go across YouTube, Reddit, X, Facebook, LinkedIn, and any site you add, then telling you the truth about it. It even counts the shows you watch hands-off, so an hour of video reads as an hour, not three minutes, and it stops the moment you're genuinely away.",
      "It has two personalities. Most days it's Caught Slipping: a dark-humour verdict on your scrolling and a shame meter you'd rather not see. But if your problem is the opposite — never logging off — flip on Caught Grinding and it tracks your focused time and warns you when 'productive' has quietly turned into overworking. Everything lives on your own device. No account, no servers, nothing leaving your browser — and every feature is free.",
    ],
    status: "In Development",
    platform: ["Chrome Extension"],
    price: "Free",
    icon: "/icons/caught-slipping.png",
    accentColor: "#F0B331",
    accentDeep: "#8A6400",
    features: [
      {
        icon: "Clock",
        title: "Built for your work machine",
        description:
          "Lives on the device where the real work — and the real procrastination — happens. It tracks YouTube, Reddit, X, Facebook, LinkedIn, and any site you add — and counts the video you're actually watching, so an hour-long show reads as an hour. It pauses the moment you go idle, lock the screen, or leave the browser.",
      },
      {
        icon: "BarChart2",
        title: "Distraction or focus — your call",
        description:
          "Catch the time you bleed into the feeds, or flip to the clean view: your percentage of focused time, a 7-day trend, and your longest distraction-free streak today.",
      },
      {
        icon: "Skull",
        title: "Shame Mode",
        description:
          "A tiered, dark-humour verdict on your day. Spend four hours scrolling and it'll tell you exactly how it feels about that.",
      },
      {
        icon: "Flame",
        title: "Work Mode — Caught Grinding",
        description:
          "Overwork is a problem too. Flip it on and CaughtSlipping flags the late nights, weekend grind, and 90-minute no-break streaks — then tells you, plainly, to log off. Off by default, and never leaves your device.",
      },
      {
        icon: "ShieldBan",
        title: "Limits, blocking & a speed bump",
        description:
          "Set a daily limit and the site hits a wall once you cross it, with a single 10-minute snooze. Re-open a rabbit hole you've already overdone and a three-second pause makes you choose to continue.",
      },
      {
        icon: "Share2",
        title: "One-tap sharing",
        description:
          "Turn today's damage into a branded card and post it — accountability, or a flex on the friends doing worse than you.",
      },
      {
        icon: "Lock",
        title: "Private by default",
        description:
          "All tracking lives on your device. No sign-up, no cloud, nothing to leak.",
      },
    ],
    screenshots: [],
    ctaLabel: "Get Early Access",
    ctaHref: "#",
    seo: {
      title: "CaughtSlipping — The browser extension that calls you out",
      description:
        "Track where your time online really goes. A free, private Chrome extension with focus stats, daily limits, site blocking, and dark-humour roasts.",
    },
    legal: {
      privacy: "/apps/caught-slipping/privacy/",
      terms: "/apps/caught-slipping/terms/",
    },
  },
  {
    slug: "inspiritintruth",
    name: "InSpiritInTruth",
    category: "Faith & Devotion",
    tagline: "Take your faith into your own hands.",
    shortDescription:
      "A weekly devotional, AI-written ones for whatever you're carrying, and the whole Bible — faith at the pace of real life.",
    overview: [
      "InSpiritInTruth puts your faith back in your own hands. It's the companion to the InSpiritInTruth devotional — true-to-life reflections for the modern Christian who can't always make it to church or read the Bible cover to cover, but still wants to stay close to it.",
      "Each week brings one devotional, written to be digested slowly rather than rushed through. And when you need something for right now, the AI writes a personal, scripture-rooted devotional from whatever you're feeling or going through. A full in-app Bible, a daily verse or quote to keep you connected, bookmarks, and notes hold your practice together the rest of the week — no algorithm, no ads, no pressure to be perfect.",
    ],
    status: "In Development",
    platform: ["iOS", "Android"],
    price: "Free · Premium from $6.99/mo",
    icon: "/icons/inspiritintruth-social.png",
    accentColor: "#90A842",
    accentDeep: "#4D6010",
    features: [
      {
        icon: "BookOpen",
        title: "A devotional a week",
        description:
          "One grounded, true-to-life devotional each week — meant to be read slowly and sat with, not rushed. Faith at the pace of a real life.",
      },
      {
        icon: "Sparkles",
        title: "Devotions on what you're carrying",
        description:
          "Tell it what you're feeling or facing and the AI writes a personal, scripture-rooted devotional for exactly that moment. Your faith, in your own hands. (Premium)",
      },
      {
        icon: "Quote",
        title: "Daily verses & quotes",
        description:
          "A short verse or quote each day to keep you connected between devotionals — a small anchor in a loud, distracting world.",
      },
      {
        icon: "Search",
        title: "The whole Bible, in-app",
        description:
          "Read any passage across multiple translations and tap any verse for instant context — powered by API.Bible.",
      },
      {
        icon: "Bookmark",
        title: "Bookmarks & notes",
        description:
          "Highlight verses, save devotionals, and keep your own reflections together in one quiet library.",
      },
      {
        icon: "Bell",
        title: "A gentle nudge",
        description:
          "One reminder at a time you choose — for the modern Christian who can't always get to church or open the Book, but wants to make the time.",
      },
    ],
    screenshots: [],
    ctaLabel: "Join the Waitlist",
    ctaHref: "#",
    seo: {
      title: "InSpiritInTruth — Take your faith into your own hands",
      description:
        "A weekly devotional, AI-written devotions for whatever you're going through, the full Bible, and daily verses. Built for the modern Christian — for iOS and Android.",
    },
    giving: "/apps/inspiritintruth/giving",
  },
  {
    slug: "tapa",
    name: "tapa.",
    category: "Food & Cooking",
    tagline: "What can I cook with this?",
    shortDescription:
      "Takes the daily 'what's for dinner' off your plate — tell it what you've got, get a real recipe back.",
    overview: [
      "tapa. exists to delete one very specific kind of mental load: figuring out what to eat. Tell it what's in the fridge — by typing, talking, or snapping a photo — and it hands back a real, cookable recipe built around your tastes. No food-blog life story, no twenty open tabs.",
      "It's for people tired of thinking about meals every single day — busy professionals, the ones hosting, and anyone who'd rather spend that energy elsewhere. Get a fresh idea each morning, discover new ways to cook what you already have, scale up for visitors and group dinners, and save the winners to cook again or share. Set your dietary needs once and they're enforced as hard rules, every recipe.",
    ],
    status: "In Development",
    platform: ["iOS", "Android"],
    price: "Free · Pro from $2.99/mo",
    icon: "/icons/tapa.png",
    accentColor: "#CC5833",
    accentDeep: "#A8431F",
    features: [
      {
        icon: "Refrigerator",
        title: "Cook what you've already got",
        description:
          "Start from what's in the fridge, not another shopping trip. A couple of smart questions and tapa. builds a real recipe around it.",
      },
      {
        icon: "Mic",
        title: "Type, speak, or snap",
        description:
          "Add ingredients however suits the moment — tap them in, say them out loud, or point your camera and let tapa. read the shelf. (camera on Pro)",
      },
      {
        icon: "Sparkles",
        title: "Made to your taste",
        description:
          "Set your tastes, cooking skill, and the time you've got — and every recipe works within them, so what comes back fits how you actually cook.",
      },
      {
        icon: "Shuffle",
        title: "A new meal every day",
        description:
          "Beat the 'what's for dinner' spiral with a fresh suggestion each day, plus new ways to cook the things you already love.",
      },
      {
        icon: "Users",
        title: "Cooking for a crowd",
        description:
          "Friends coming over? Feeding the group chat? Scale a recipe up for visitors and events without the mental math.",
      },
      {
        icon: "ShieldCheck",
        title: "Dietary guardrails",
        description:
          "Vegan, halal, gluten-free, allergies — set them once and they're enforced as hard constraints on every recipe.",
      },
      {
        icon: "Share2",
        title: "Save & share",
        description:
          "Keep your favourites in one place — offline included — and send the good ones to the people who'll actually make them.",
      },
    ],
    screenshots: [],
    ctaLabel: "Try It Free",
    ctaHref: "#",
    seo: {
      title: "tapa. — What can I cook with this?",
      description:
        "Type, speak, or snap your ingredients and get a real recipe built around your tastes — a fresh idea daily, easy scaling for guests, dietary guardrails, and offline saving.",
    },
    legal: {
      privacy: "/apps/tapa/privacy/",
      terms: "/apps/tapa/terms/",
    },
  },
  {
    slug: "hakkan",
    name: "Hakkan",
    category: "Research & Content",
    tagline: "Worth listening to.",
    shortDescription:
      "Researches the real conversation across social and the web, hands you a report with receipts, and turns it into thought leadership in your voice.",
    overview: [
      "Most AI writing tools start with a blank page and guess. Hakkan starts with research. Give it a question and it reads the conversation where it actually happens — Reddit, X, YouTube, TikTok, LinkedIn, Hacker News, reviews, news, and the open web — then returns a full report: the themes, the sentiment split, the voices, and where the evidence and the feelings diverge.",
      "Every claim in that report carries receipts. Click any bar, theme, or line and you get the verbatim quotes with platform, author, and link. From there Hakkan turns the research into publishable work — posts, threads, carousels, blogs, newsletters, video scripts — written in a voice profile learned from your own samples, not a generic house style.",
    ],
    status: "Beta",
    platform: ["Web"],
    price: "Free to start · from $39/mo",
    icon: "/icons/hakkan.svg",
    accentColor: "#D8F34E",
    accentDeep: "#3A4409",
    accentInk: "#3A4409",
    features: [
      {
        icon: "Search",
        title: "One question, every platform",
        description:
          "A single study sweeps social platforms and the open web at once, with a live pipeline showing exactly which sources were read and which failed.",
      },
      {
        icon: "Quote",
        title: "Receipts on every claim",
        description:
          "Nothing is asserted without a source. Every theme, sentiment bar, and key point opens into the real quotes behind it, with author and link.",
      },
      {
        icon: "BarChart2",
        title: "A report you can defend",
        description:
          "Themes, voices, sentiment split, timeline, and angles — plus an honest note on what was searched and where coverage was thin.",
      },
      {
        icon: "PenTool",
        title: "Eight content formats",
        description:
          "Turn one study into LinkedIn and X posts, threads, carousels, infographics, blog posts, newsletters, and short video scripts.",
      },
      {
        icon: "Mic",
        title: "Your voice, learned",
        description:
          "Paste a few samples and Hakkan builds a voice profile with tone, rhythm, and phrasing you can tune. Raw samples are never stored.",
      },
      {
        icon: "Radar",
        title: "Topic Radar",
        description:
          "Track the subjects you care about, watch interest move over time, and get a weekly shortlist of what is worth researching next.",
      },
      {
        icon: "Compass",
        title: "AI visibility",
        description:
          "For brand studies, see how often AI answer engines name you and which sources those answers are citing.",
      },
    ],
    screenshots: [],
    ctaLabel: "Join the beta",
    ctaHref: "https://hakkan.app",
    ctaExternal: true,
    seo: {
      title: "Hakkan — Research-led thought leadership",
      description:
        "Hakkan researches the real conversation across social and the web, returns a cited report you can defend, and turns it into thought leadership written in your voice.",
    },
    legal: {
      privacy: "https://hakkan.app/privacy",
      terms: "https://hakkan.app/terms",
      external: true,
    },
  },
];

export function getApp(slug: string): App | undefined {
  return apps.find((app) => app.slug === slug);
}

export function getOtherApps(slug: string): App[] {
  return apps.filter((app) => app.slug !== slug);
}
