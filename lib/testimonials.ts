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
  /** Two-letter monogram used until a real photo exists. */
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Worked with Alroy for 2+ years. He's extremely professional and has a variety of talents you can make use of. He's like a Swiss army knife.",
    name: "Kelly-Ann Ayuk",
    title: "Co-Founder & Chairperson",
    company: "Energy Capital & Power",
    initials: "KA",
  },
  {
    quote:
      "Alroy consistently produces high-quality and timely work, and is always willing to go the extra mile to ensure a project's completion.",
    name: "Hermione Nevill",
    title: "Senior Consultant",
    company: "IFC — International Finance Corporation",
    initials: "HN",
  },
  {
    quote:
      "Alroy demonstrated an exceptional work ethic, resourcefulness, and dedication to client success, including supporting post-contract.",
    name: "Devi Paulsen-Abbott",
    title: "Commercial & Strategy Director",
    company: "CIO Africa by dx5",
    initials: "DP",
  },
];

/** Organisations Alroy has done work for. Real engagements only. */
export const clients = [
  "Meta",
  "IFC — World Bank Group",
  "Digify Africa",
  "Energy Capital & Power",
  "African Agri Council",
  "Jenna Clifford",
];
