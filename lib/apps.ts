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
  accentColor: string; // per-app tint color
  features: AppFeature[];
  screenshots: string[]; // paths: /screenshots/[slug]-1.png
  ctaLabel: string;
  ctaHref: string;
  seo: {
    title: string;
    description: string;
  };
}

export const apps: App[] = [
  {
    slug: "caught-slipping",
    name: "CaughtSlipping",
    category: "Focus & Productivity",
    tagline: "The browser extension that calls you out.",
    shortDescription:
      "Tracks the time you lose to social media and serves it back to you — without mercy.",
    overview: [
      "CaughtSlipping is a Chrome extension that quietly tracks how long you spend on the internet's biggest time sinks — YouTube, Facebook, X, and LinkedIn — and then tells you the truth about it.",
      "Some days it shows you clean productivity stats. Other days it switches to Shame Mode and delivers a dark-humour verdict on your scrolling. It's honest, a little embarrassing, and surprisingly effective. Everything is tracked on your own device — no account, no servers, no data leaving your browser.",
    ],
    status: "In Development",
    platform: ["Chrome Extension"],
    price: "Free · Pro from $1.99/mo",
    icon: "/icons/caught-slipping.png",
    accentColor: "#F0B331",
    features: [
      {
        icon: "Clock",
        title: "Real-time tracking",
        description:
          "Live stats on YouTube, Facebook, X, and LinkedIn — with idle detection so only real attention counts.",
      },
      {
        icon: "Skull",
        title: "Shame Mode",
        description:
          "A tiered, dark-humour verdict on your day. Spend four hours scrolling and the app will let you know exactly how it feels about that.",
      },
      {
        icon: "BarChart2",
        title: "Productivity stats",
        description:
          "Flip to a clean view: percentage of focused time, a weekly trend line, and your longest distraction-free streak.",
      },
      {
        icon: "ShieldBan",
        title: "Aggressive blocking",
        description:
          "Set a daily limit per site and CaughtSlipping blocks it once you hit the wall — with a single 10-minute snooze if you really mean it. (Pro)",
      },
      {
        icon: "Share2",
        title: "One-tap sharing",
        description:
          "Generate a branded card of your shame score and post it — or flex on the friends doing worse than you.",
      },
      {
        icon: "Lock",
        title: "Private by default",
        description:
          "All tracking lives in your browser. No sign-up, no cloud, nothing to leak.",
      },
    ],
    screenshots: [],
    ctaLabel: "Get Early Access",
    ctaHref: "#",
    seo: {
      title: "CaughtSlipping — The browser extension that calls you out",
      description:
        "Track your social media time and face the truth. A free, private Chrome extension with shame stats, productivity insights, and site blocking.",
    },
  },
  {
    slug: "inspiritintruth",
    name: "InSpiritInTruth",
    category: "Faith & Devotion",
    tagline: "A devotional for real life and imperfect journeys.",
    shortDescription:
      "Daily devotionals and a full Bible — empathetic, grounded, and free of the noise.",
    overview: [
      "InSpiritInTruth is the mobile companion to the InSpiritInTruth newsletter — a real-life devotional for imperfect journeys. It's made for the busy, the curious, the inconsistent, and the devoted alike: anyone seeking a quiet moment of truth in a noisy day.",
      "Every morning brings a short, structured devotional paired with scripture you can tap to read in full context. A complete in-app Bible, verse bookmarks, personal notes, and a gentle reading streak keep your practice close — without the algorithm, the ads, or the pressure to be perfect.",
    ],
    status: "In Development",
    platform: ["iOS", "Android"],
    price: "Free · Premium from $6.99/mo",
    icon: "/icons/inspiritintruth.png",
    accentColor: "#90A842",
    features: [
      {
        icon: "BookOpen",
        title: "Daily devotionals",
        description:
          "Short, grounded reflections delivered every morning. Deep and relatable, never preachy.",
      },
      {
        icon: "Search",
        title: "Full in-app Bible",
        description:
          "Read any passage with multiple translations and tap any verse for instant context — powered by API.Bible.",
      },
      {
        icon: "Bookmark",
        title: "Bookmarks & notes",
        description:
          "Highlight verses, save devotionals, and keep your own reflections together in one library.",
      },
      {
        icon: "Flame",
        title: "Gentle streaks",
        description:
          "A quiet nudge to keep showing up — without guilt when life gets in the way.",
      },
      {
        icon: "Bell",
        title: "Daily reminders",
        description:
          "A single notification at a time you choose: start your day with purpose.",
      },
      {
        icon: "Sparkles",
        title: "Custom devotionals",
        description:
          "Tell it what you're carrying and receive a personal, scripture-rooted devotional written for the moment. (Premium)",
      },
    ],
    screenshots: [],
    ctaLabel: "Join the Waitlist",
    ctaHref: "#",
    seo: {
      title: "InSpiritInTruth — A devotional for real life",
      description:
        "Daily devotionals, a full in-app Bible, verse bookmarks, and notes. The mobile companion to the InSpiritInTruth newsletter — for iOS and Android.",
    },
  },
  {
    slug: "recipeai",
    name: "RecipeAI",
    category: "Food & Cooking",
    tagline: "What can I cook with this?",
    shortDescription:
      "Tell it what's in your fridge. Get a real recipe back — no stories, no subscriptions.",
    overview: [
      "RecipeAI starts where every weeknight actually starts: with whatever you already have. List a few ingredients — or snap a photo of your fridge — and it asks a quick question or two before handing you a real, cookable recipe.",
      "No endless food-blogger backstory, no twenty-tab search. Just clear steps with built-in timers, an ingredient checklist, and the freedom to save recipes for offline. Set dietary needs once and they're treated as hard rules every time, so what comes back is always safe to cook.",
    ],
    status: "In Development",
    platform: ["iOS", "Android"],
    price: "Free · Pro from $2.99/mo",
    icon: "/icons/recipeai.png",
    accentColor: "#CC5833",
    features: [
      {
        icon: "Refrigerator",
        title: "Ingredient-first",
        description:
          "Start from what you have, not what you wish you had. Add ingredients as quick tags and go.",
      },
      {
        icon: "Sparkles",
        title: "Real AI recipes",
        description:
          "A couple of smart follow-up questions, then a complete recipe built around your ingredients.",
      },
      {
        icon: "Camera",
        title: "Snap your fridge",
        description:
          "Point your camera, and RecipeAI identifies what's inside and turns it into options. (Pro)",
      },
      {
        icon: "ShieldCheck",
        title: "Dietary guardrails",
        description:
          "Vegan, halal, gluten-free, allergies — set them once and they're enforced as hard constraints, every recipe.",
      },
      {
        icon: "Timer",
        title: "Step timers built in",
        description:
          "Tap any step to start a countdown, with a checklist so you never lose your place mid-cook.",
      },
      {
        icon: "WifiOff",
        title: "Save & cook offline",
        description:
          "Keep the recipes you love on your device and pull them up with no signal needed.",
      },
    ],
    screenshots: [],
    ctaLabel: "Try It Free",
    ctaHref: "#",
    seo: {
      title: "RecipeAI — What can I cook with this?",
      description:
        "Enter your ingredients or snap your fridge and get a real recipe — with timers, dietary guardrails, and offline saving. No stories, no subscriptions.",
    },
  },
];

export function getApp(slug: string): App | undefined {
  return apps.find((app) => app.slug === slug);
}

export function getOtherApps(slug: string): App[] {
  return apps.filter((app) => app.slug !== slug);
}
