export type AppStatus = "In Development" | "Beta" | "Live";

export interface AppFeature {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export interface App {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: AppStatus;
  platform: string[];
  icon: string; // path: /icons/[slug].png
  accentColor: string; // per-app tint color
  features: AppFeature[];
  screenshots: string[]; // paths: /screenshots/[slug]-1.png
  ctaLabel: string;
  ctaHref: string;
}

export const apps: App[] = [
  {
    slug: "caught-slipping",
    name: "CaughtSlipping",
    tagline: "The Chrome extension that calls you out.",
    description:
      "Tracks the time you waste on social media and serves it back to you without mercy. Free, honest, and a little embarrassing.",
    status: "In Development",
    platform: ["Chrome Extension"],
    icon: "/icons/caught-slipping.png",
    accentColor: "#F0B331",
    features: [
      {
        icon: "Clock",
        title: "Real-time tracking",
        description: "Live stats on YouTube, Facebook, X, and LinkedIn.",
      },
      {
        icon: "BarChart2",
        title: "Shame stats",
        description: "Weekly and daily breakdowns that are hard to ignore.",
      },
      {
        icon: "Share2",
        title: "Social sharing",
        description:
          "Share your worst screen-time moments (or flex on those who are worse).",
      },
    ],
    screenshots: [],
    ctaLabel: "Get Early Access",
    ctaHref: "#",
  },
  {
    slug: "inspiritintruth",
    name: "InSpiritInTruth",
    tagline: "Daily devotionals. No noise.",
    description:
      "A mobile companion to the InSpiritInTruth newsletter. Scripture, reflection, and short daily content — without the algorithm.",
    status: "In Development",
    platform: ["iOS", "Android"],
    icon: "/icons/inspiritintruth.png",
    accentColor: "#90A842",
    features: [
      {
        icon: "BookOpen",
        title: "Daily devotionals",
        description: "Short, grounded content delivered every morning.",
      },
      {
        icon: "Search",
        title: "Bible integration",
        description: "Full scripture lookup via API.Bible.",
      },
      {
        icon: "Share2",
        title: "Native sharing",
        description: "Share verses and devotionals directly from the app.",
      },
    ],
    screenshots: [],
    ctaLabel: "Join the Waitlist",
    ctaHref: "#",
  },
  {
    slug: "recipeai",
    name: "RecipeAI",
    tagline: "What can I cook with this?",
    description:
      "Tell it what is in your fridge. Get a real recipe back. No subscriptions, no food blogger stories — just the recipe.",
    status: "In Development",
    platform: ["Web"],
    icon: "/icons/recipeai.png",
    accentColor: "#CC5833",
    features: [
      {
        icon: "Refrigerator",
        title: "Ingredient-first",
        description: "Start from what you have, not what you wish you had.",
      },
      {
        icon: "Sparkles",
        title: "AI-generated recipes",
        description:
          "Smart, real recipes built from your available ingredients.",
      },
      {
        icon: "Zap",
        title: "Instant results",
        description: "No loading screens, no stories, no waiting.",
      },
    ],
    screenshots: [],
    ctaLabel: "Try It Free",
    ctaHref: "#",
  },
];

export function getApp(slug: string): App | undefined {
  return apps.find((app) => app.slug === slug);
}

export function getOtherApps(slug: string): App[] {
  return apps.filter((app) => app.slug !== slug);
}
