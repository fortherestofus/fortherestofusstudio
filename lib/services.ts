/**
 * Service registry: the consulting and build-for-you arm.
 *
 * Same philosophy as lib/apps.ts: pages render from this data, so copy changes
 * happen here rather than inside page components. Each service also has its
 * own detail page at /services/[slug].
 */

export interface ServiceSection {
  heading: string;
  body: string;
}

/**
 * The three steps of the process, in the order they happen: identify the
 * problem worth solving, build the product, grow it.
 *
 * Two things this encodes deliberately. Identity is not a step of its own:
 * a product and its brand ship together, so brand-and-content sits under
 * "build". And automation is not a fourth pillar; it is how growth happens
 * without adding headcount, so it lives under "grow".
 *
 * "identify" is a valid chapter key but no service carries it. It is the
 * phase every engagement starts in, not something bought separately.
 */
export type ServiceLifecycle = "identify" | "build" | "grow";

export interface Service {
  slug: string;
  /** "build" = things we make for you. "consult" = services/consulting work. */
  arm: "build" | "consult";
  /** Which lifecycle chapter this service tells. */
  lifecycle: ServiceLifecycle;
  /** Lucide icon name, used in the quieter card row and in lists. */
  icon: string;
  title: string;
  /** One-line benefit statement, not a feature list. */
  summary: string;
  /** Longer paragraph for the services index. */
  description: string;
  /** Concrete deliverables. Keep to 4-5, phrased as nouns. */
  includes: string[];
  /** Detail-page hero. */
  page: {
    /** Ink first line of the headline. */
    title: string;
    /** Muted second line. */
    titleMuted: string;
    lead: string;
    /**
     * Headline over the explainer sections. Written out per service rather
     * than templated from `title`: `What ${title.toLowerCase()} looks like`
     * produced "What websites looks like with us" (plural subject, singular
     * verb) and lowercased SaaS into "saas".
     */
    howTitle: string;
    /**
     * Lowercase noun phrase for the closing ask ("Need help with ...?").
     * Also written out per service: lowercasing `title` turned SaaS into
     * "saas".
     */
    ctaSubject: string;
    /** Two or three explainer sections. */
    sections: ServiceSection[];
    /** Who this is usually for. */
    goodFit: string[];
  };
  seo: {
    title: string;
    description: string;
  };
}

export const services: Service[] = [
  {
    slug: "apps-and-saas",
    arm: "build",
    lifecycle: "build",
    icon: "Smartphone",
    title: "Custom apps & SaaS",
    summary:
      "From an idea in a doc to something real people can use on their phone or in a browser.",
    description:
      "We take a product from first sketch to shipped: mobile apps, web apps, and subscription software with the billing, accounts, and admin that make them a business rather than a demo.",
    includes: [
      "Product scoping and a build plan you can read",
      "iOS, Android, and web builds",
      "Accounts, payments, and subscriptions",
      "Launch support and store submission",
    ],
    page: {
      title: "Software that ships.",
      titleMuted: "And keeps working after launch.",
      lead: "Most app projects die between the idea and the store listing. We build the whole path: the product, the plumbing underneath it, and the launch.",
      howTitle: "What a custom app or SaaS build looks like with us",
      ctaSubject: "a custom app or SaaS build",
      sections: [
        {
          heading: "We start by cutting the scope",
          body: "McKinsey's research with Oxford put the average IT project 45% over budget. Scope is where that happens. The first version of anything should be small enough to finish and useful enough to matter, so before writing code we work out the shortest route to something real people can hold, and tell you plainly which ideas belong in version two.",
        },
        {
          heading: "The unglamorous parts are the product",
          body: "Accounts, payments, subscriptions, receipts, admin screens, error states. These are what separate a business from a prototype, and they are where most builds run out of budget. We plan for them from the start rather than discovering them in month three.",
        },
        {
          heading: "You own what we build",
          body: "Clean code in your repository, on mainstream tooling other developers know, documented well enough to hand over. We would rather you could leave than have you locked in.",
        },
      ],
      goodFit: [
        "You have an idea validated by something other than enthusiasm",
        "You want one accountable builder, not an agency handoff chain",
        "You would rather ship a small real thing than plan a big one",
      ],
    },
    seo: {
      title: "Custom app & SaaS development",
      description:
        "Mobile and web apps built end to end: product scoping, iOS, Android and web builds, payments and subscriptions, and launch support. A product development consultancy in Johannesburg.",
    },
  },
  {
    slug: "websites",
    arm: "build",
    lifecycle: "build",
    icon: "Globe",
    title: "Websites",
    summary:
      "Fast, well-written sites that look like you take your work seriously.",
    description:
      "Marketing sites, landing pages, and product sites built on modern tooling and designed around what you actually need visitors to do.",
    includes: [
      "Design and build, mobile first",
      "Copy direction and page structure",
      "SEO, analytics, and social previews",
      "Handover so you can edit it yourself",
    ],
    page: {
      title: "A site that earns its traffic.",
      titleMuted: "And loads before people leave.",
      lead: "A website is the one piece of marketing you fully control. It should be quick, say something specific, and make the next step obvious.",
      howTitle: "What a website build looks like with us",
      ctaSubject: "a website",
      sections: [
        {
          heading: "Structure before decoration",
          body: "We start with what a visitor needs to understand and what you need them to do, then build the page order around that. Design follows the argument rather than the other way round.",
        },
        {
          heading: "Words are part of the build",
          body: "Most sites fail on copy, not visuals. We write or direct the writing alongside the design, so the headline and the layout are solving the same problem instead of fighting.",
        },
        {
          heading: "Fast by default, yours to edit",
          body: "Deloitte and Google measured a 0.1-second mobile speed improvement lifting retail conversions 8.4%. So: modern tooling, images that do not stall the page, sensible SEO and social previews, and analytics that answer real questions. Handover includes showing you how to change things without calling us.",
        },
      ],
      goodFit: [
        "Your current site is slow, dated, or says nothing specific",
        "You are launching something and need a home for it",
        "You want to be able to edit copy yourself afterwards",
      ],
    },
    seo: {
      title: "Website design & development",
      description:
        "Fast, well-written marketing sites and product sites. Design, copy direction, SEO and analytics, built mobile first and handed over so you can edit them yourself.",
    },
  },
  {
    slug: "product-and-growth",
    arm: "consult",
    lifecycle: "grow",
    icon: "LineChart",
    title: "Product & growth direction",
    summary:
      "Deciding what to build next, who it is for, and how people will find it.",
    description:
      "The product-management work that usually goes missing in small teams: turning a rough ambition into a roadmap, choosing what to cut, and building the marketing motion that gets it in front of the right people.",
    includes: [
      "Positioning and audience definition",
      "Roadmap and release planning",
      "Marketing and channel strategy",
      "Launch plans and measurement",
    ],
    page: {
      title: "Know what to build next.",
      titleMuted: "And who it is actually for.",
      lead: "Ten years of running campaigns and shipping products, applied to the two questions that decide whether yours works: what goes in the next release, and how anyone hears about it.",
      howTitle: "What product and growth direction looks like with us",
      ctaSubject: "product and growth direction",
      sections: [
        {
          heading: "Positioning comes first",
          body: "Most growth problems are positioning problems. If you cannot say who the product is for and what it replaces, no channel strategy will fix it. We start there, in plain language, and everything downstream gets easier.",
        },
        {
          heading: "A roadmap you can defend",
          body: "Not a wish list. A short, ordered set of releases with a reason each one exists and something measurable at the end. Just as importantly, an explicit list of what you are choosing not to build yet.",
        },
        {
          heading: "Marketing that matches the product",
          body: "Channel choice, message, and cadence built around how your buyers actually decide, informed by campaign work for organisations from Meta to the IFC and by shipping our own products to real users.",
        },
      ],
      goodFit: [
        "You are pre-launch and unsure what version one should contain",
        "You launched, and it went quieter than you expected",
        "You have a team building but nobody deciding",
      ],
    },
    seo: {
      title: "Product & growth consulting",
      description:
        "Positioning, roadmap, and go-to-market direction for small teams: what to build next, who it is for, and how the right people will find it.",
    },
  },
  {
    slug: "brand-and-content",
    arm: "consult",
    lifecycle: "build",
    icon: "Palette",
    title: "Brand, design & content",
    summary:
      "A look and a voice that stay consistent everywhere you show up.",
    description:
      "Visual direction and content direction handled together, because they fail together. We set the design language, the tone, and the content rhythm, then leave you with something repeatable.",
    includes: [
      "Visual identity and design system",
      "Tone of voice and messaging",
      "Content strategy and calendars",
      "Templates your team can reuse",
    ],
    page: {
      title: "Look like yourself.",
      titleMuted: "Everywhere, without thinking about it.",
      lead: "Brand falls apart in the gap between the logo file and the Tuesday afternoon social post. We close that gap with a system, not a mood board.",
      howTitle: "What brand, design and content looks like with us",
      ctaSubject: "brand, design and content",
      sections: [
        {
          heading: "Identity as a working system",
          body: "Type, colour, spacing, and imagery rules defined tightly enough that someone who is not a designer can make something on-brand. A logo is the smallest part of this.",
        },
        {
          heading: "Voice written down",
          body: "How you sound, what you never say, and how you handle the awkward moments: pricing, apologies, launches. Written as examples people can copy rather than adjectives they have to interpret.",
        },
        {
          heading: "A rhythm you can keep",
          body: "Content strategy sized to the team you actually have. Formats, a calendar, and reusable templates, so publishing consistently stops depending on someone feeling inspired.",
        },
      ],
      goodFit: [
        "Every asset looks like it came from a different company",
        "You have a logo but no system around it",
        "Content happens in bursts and then stops",
      ],
    },
    seo: {
      title: "Brand, design & content direction",
      description:
        "Visual identity, tone of voice, and content strategy built as one system, with templates your team can actually reuse.",
    },
  },
  {
    slug: "tech-and-automation",
    arm: "consult",
    lifecycle: "grow",
    icon: "Workflow",
    title: "Business tech & automation",
    summary:
      "Getting the manual, repetitive parts of your business off your plate.",
    description:
      "An audit of how work actually moves through your business, then the tooling to make the tedious parts run themselves, including sensible use of AI where it genuinely saves time.",
    includes: [
      "Workflow and tooling audit",
      "System integrations and automations",
      "Practical AI where it earns its place",
      "Documentation and team training",
    ],
    page: {
      title: "Stop doing it by hand.",
      titleMuted: "Especially the parts nobody enjoys.",
      lead: "Most small businesses run on copy-paste between four tools and one person's memory. We map what is actually happening, then remove the steps that should never have been manual.",
      howTitle: "What business tech and automation looks like with us",
      ctaSubject: "business tech and automation",
      sections: [
        {
          heading: "Audit before automation",
          body: "Slack's 2024 survey put the average small-business owner at 96 minutes a day lost to busywork, close to three working weeks a year. Automating a broken process just breaks it faster, so we start by following real work through your business end to end and finding where that time actually disappears, which is rarely where people assume.",
        },
        {
          heading: "Connect what you already pay for",
          body: "Usually the answer is not new software. It is making the tools you own talk to each other, so a form fills a sheet, a sheet raises an invoice, and nobody retypes anything.",
        },
        {
          heading: "AI where it earns its place",
          body: "AI is useful for drafting, summarising, classifying, and answering repeat questions. It is not a replacement for a process you have never defined, and we will tell you which of your problems is which.",
        },
      ],
      goodFit: [
        "The same data gets typed into more than one system",
        "Reporting takes a day that should take a minute",
        "You are curious about AI but wary of buying a toy",
      ],
    },
    seo: {
      title: "Business tech & automation consulting",
      description:
        "Workflow audits, system integrations, and practical automation for small teams drowning in manual work, including AI where it genuinely saves time.",
    },
  },
];

/**
 * The named tools we actually run, for the automation page. Third-party
 * products, described by what we use them for, never presented as ours.
 * Keep this factual: if a capability is not one we have used on real work,
 * it does not belong here.
 */
export const TOOLBENCH: {
  name: string;
  role: string;
  detail: string;
}[] = [
  {
    name: "Apollo.io",
    role: "Finding the right people to talk to",
    detail:
      "Sourcing qualified contacts against an ICP: filtering by role, seniority and company, enriching what is missing, and pushing the result into a CRM. We built Innovatr's lead pipeline this way, from nothing to a working, segmented CRM.",
  },
  {
    name: "Zoho",
    role: "Following up without forgetting",
    detail:
      "Email sequencing and the CRM automations around it: what gets sent, when, and what happens when somebody replies. The unglamorous half of lead generation, and the half that usually breaks.",
  },
  {
    name: "Claude Cowork",
    role: "Orchestrating the office work",
    detail:
      "Design, data processing, dashboards, content drafting and SaaS orchestration, run against your own files and tools through MCP connections and computer use. It reads the folder so nobody has to.",
  },
  {
    name: "Zapier",
    role: "Making the tools talk",
    detail:
      "The joins between systems: a form filling a CRM, a signup starting a sequence, a lead routed by fit, content moving from draft to scheduled. Mapped on a canvas first, so we automate a process we have actually looked at.",
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Identify",
    description:
      "The problem, the people it affects, and what success would look like. No proposal until that is clear.",
  },
  {
    step: 2,
    title: "Build",
    description:
      "Short cycles with something visible at the end of each one, so you see progress as it happens.",
  },
  {
    step: 3,
    title: "Grow",
    description:
      "Launch is the middle, not the end. We measure what happens next and improve the parts that move.",
  },
];

/**
 * The three chapters of the process: how the services chapter on the
 * homepage groups the five services (see docs/REDESIGN-V3.md §4, chapter 04).
 * `tint` keys into the tint tokens in globals.css; "ink" renders the dark
 * card in the grid.
 *
 * "identify" carries no services on purpose: it is the phase every project
 * starts in rather than a line item, so its card sells the conversation and
 * takes the full-saturation ember to put the first step in front.
 */
export const LIFECYCLE_CHAPTERS: {
  key: ServiceLifecycle;
  title: string;
  /** The one-line promise. */
  blurb: string;
  /** The belief underneath it, for the services page. */
  belief: string;
  tint: "rust" | "amber" | "ink";
  serviceSlugs: string[];
}[] = [
  {
    key: "identify",
    title: "We identify",
    blurb:
      "What is not working, or what is being missed, and who it affects. Every project starts here, before anything gets built.",
    belief:
      "Most products fail because nobody needed them. Finding that out early is cheaper than finding out at launch.",
    tint: "rust",
    serviceSlugs: [],
  },
  {
    key: "build",
    title: "We build",
    blurb:
      "Apps, SaaS, websites, and the systems that run behind them, with the brand around them. The product and its identity ship together.",
    belief:
      "A product only exists once someone can use it. Everything before that is a document.",
    tint: "amber",
    serviceSlugs: ["apps-and-saas", "websites", "brand-and-content"],
  },
  {
    key: "grow",
    title: "We grow it",
    blurb:
      "Marketing, analytics, and automation that grow the product and the business behind it. Getting found, and running without you.",
    belief:
      "Shipping is not the finish line. What you measure next decides whether any of it mattered.",
    tint: "ink",
    serviceSlugs: ["product-and-growth", "tech-and-automation"],
  },
];

export function getServicesByArm(arm: Service["arm"]): Service[] {
  return services.filter((service) => service.arm === arm);
}

export function getServicesByLifecycle(
  lifecycle: ServiceLifecycle,
): Service[] {
  return services.filter((service) => service.lifecycle === lifecycle);
}

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getOtherServices(slug: string): Service[] {
  return services.filter((service) => service.slug !== slug);
}
