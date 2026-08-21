/**
 * Client testimonials.
 *
 * These are real quotes from real people who have worked with Alroy, carried
 * over from alroyndhlovu.com. Never add an entry that was not actually said,
 * and never invent a name, title, or company. Only obvious transcription slips
 * have been corrected; wording is otherwise verbatim.
 */

export interface Testimonial {
  /** Verbatim quote. */
  quote: string;
  name: string;
  title: string;
  company: string;
  /** Two-letter monogram, used when no organisation logo is set. */
  initials: string;
  /**
   * The organisation the person spoke from. We attribute to the company
   * rather than inventing a likeness for a real, named professional — see
   * components/ui/TestimonialQuote.tsx. Trademarks belong to their owners
   * and are used here only to identify the engagement.
   */
  logo?: { src: string; alt: string };
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Worked with Alroy for 2+ years. He's extremely professional and has a variety of talents you can make use of. He's like a Swiss army knife.",
    name: "Kelly-Ann Ayuk",
    title: "Co-Founder & Chairperson",
    company: "Energy Capital & Power",
    initials: "KA",
    logo: {
      src: "/logos/energy-capital-power.png",
      alt: "Energy Capital & Power",
    },
  },
  {
    quote:
      "Alroy consistently produces high-quality and timely work, and is always willing to go the extra mile to ensure a project's completion.",
    name: "Hermione Nevill",
    title: "Senior Consultant",
    company: "IFC — International Finance Corporation",
    initials: "HN",
    logo: {
      src: "/logos/ifc.jpg",
      alt: "IFC — International Finance Corporation",
    },
  },
  {
    quote:
      "Alroy demonstrated an exceptional work ethic, resourcefulness, and dedication to client success, including supporting post-contract.",
    name: "Devi Paulsen-Abbott",
    title: "Commercial & Strategy Director",
    company: "CIO Africa by dx5",
    initials: "DP",
    logo: { src: "/logos/gl-events.png", alt: "GL events" },
  },
];

/**
 * Organisations Alroy has done work for. Real engagements only, and the single
 * source for every "Work delivered for" list on the site — the home band, the
 * hero's featured four (which take the first four, so order matters here), and
 * the marquee on /services and /studio.
 *
 * The marquee used to keep its own longer list alongside a shorter one here,
 * which is how two records of the same fact drift apart. This is the record.
 *
 * Two names are deliberately absent. Their engagements are written up as
 * anonymised cases in lib/proof.ts ("Travel Industry", "Consumer Insights
 * Industry"), and naming them here would undo that in one hop: there is only
 * one travel brand on the list, so the case would re-identify itself.
 */
export const clients = [
  "Meta",
  "IFC — World Bank Group",
  "Digify Africa",
  "Energy Capital & Power",
  "African Agri Council",
  "Jenna Clifford",
  "Deep Ocean",
];
