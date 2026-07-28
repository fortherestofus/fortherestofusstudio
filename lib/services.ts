/**
 * Service registry — the consulting and build-for-you arm.
 *
 * Same philosophy as lib/apps.ts: pages render from this data, so copy changes
 * happen here rather than inside page components.
 */

export interface Service {
  slug: string;
  /** "build" = things we make for you. "advise" = product direction work. */
  arm: "build" | "advise";
  icon: string; // Lucide icon name (see components/ui/Icon.tsx)
  title: string;
  /** One-line benefit statement, not a feature list. */
  summary: string;
  /** Longer paragraph for the services page. */
  description: string;
  /** Concrete deliverables. Keep to 4-5, phrased as nouns. */
  includes: string[];
}

export const services: Service[] = [
  {
    slug: "apps-and-saas",
    arm: "build",
    icon: "Smartphone",
    title: "Custom apps & SaaS",
    summary:
      "From an idea in a doc to something real people can use on their phone or in a browser.",
    description:
      "We take a product from first sketch to shipped: mobile apps, web apps, and subscription software with the billing, accounts, and admin that make them a business rather than a demo. You get one person who has shipped this before, not a handoff chain.",
    includes: [
      "Product scoping and a build plan you can read",
      "iOS, Android, and web builds",
      "Accounts, payments, and subscriptions",
      "Launch support and store submission",
    ],
  },
  {
    slug: "websites",
    arm: "build",
    icon: "Globe",
    title: "Websites",
    summary:
      "Fast, well-written sites that look like you take your work seriously.",
    description:
      "Marketing sites, landing pages, and product sites built on modern tooling and designed around what you actually need visitors to do. Fast by default, easy to edit, and set up so search engines and social previews behave.",
    includes: [
      "Design and build, mobile first",
      "Copy direction and page structure",
      "SEO, analytics, and social previews",
      "Handover so you can edit it yourself",
    ],
  },
  {
    slug: "product-and-growth",
    arm: "advise",
    icon: "LineChart",
    title: "Product & growth direction",
    summary:
      "Deciding what to build next, who it is for, and how people will find it.",
    description:
      "The product-management work that usually goes missing in small teams: turning a rough ambition into a roadmap, choosing what to cut, and building the marketing motion that gets it in front of the right people. Useful whether you are pre-launch or stuck after one.",
    includes: [
      "Positioning and audience definition",
      "Roadmap and release planning",
      "Marketing and channel strategy",
      "Launch plans and measurement",
    ],
  },
  {
    slug: "brand-and-content",
    arm: "advise",
    icon: "Palette",
    title: "Brand, design & content",
    summary:
      "A look and a voice that stay consistent everywhere you show up.",
    description:
      "Visual direction and content direction handled together, because they fail together. We set the design language, the tone, and the content rhythm, then leave you with something repeatable instead of a folder of one-off assets.",
    includes: [
      "Visual identity and design system",
      "Tone of voice and messaging",
      "Content strategy and calendars",
      "Templates your team can reuse",
    ],
  },
  {
    slug: "tech-and-automation",
    arm: "advise",
    icon: "Workflow",
    title: "Business tech & automation",
    summary:
      "Getting the manual, repetitive parts of your business off your plate.",
    description:
      "An audit of how work actually moves through your business, then the tooling to make the tedious parts run themselves: connected systems, automated handoffs, and sensible use of AI where it genuinely saves time rather than adding a new thing to manage.",
    includes: [
      "Workflow and tooling audit",
      "System integrations and automations",
      "Practical AI where it earns its place",
      "Documentation and team training",
    ],
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Understand",
    description:
      "We start with the problem, the people it affects, and what success would actually look like. No proposal until that is clear.",
    wash: "peach" as const,
  },
  {
    step: 2,
    title: "Build",
    description:
      "Short cycles with something visible at the end of each one. You see progress as it happens instead of waiting for a reveal.",
    wash: "sky" as const,
  },
  {
    step: 3,
    title: "Grow",
    description:
      "Launch is the middle, not the end. We measure what happens next and keep improving the parts that move.",
    wash: "lilac" as const,
  },
];

export function getServicesByArm(arm: Service["arm"]): Service[] {
  return services.filter((service) => service.arm === arm);
}
