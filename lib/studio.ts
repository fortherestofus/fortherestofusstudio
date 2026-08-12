/**
 * Studio/founder registry — the "who" behind the story.
 *
 * The founder note follows the signed-letter pattern (docs/REDESIGN-V3.md
 * §4, chapter 06): a few honest sentences, not a bio card. Facts trace to
 * the portfolio record (alroyndhlovu.com) — nothing here is invented.
 */

import type { StaticImageData } from "next/image";

import portrait from "@/public/studio/alroy-portrait.jpg";

export interface Founder {
  name: string;
  role: string;
  portrait: StaticImageData;
  portraitAlt: string;
  /** The signed note, one string per paragraph. */
  note: string[];
  signoff: string;
}

export const FOUNDER: Founder = {
  name: "Alroy Ndhlovu",
  role: "Founder · builder · consultant",
  portrait,
  portraitAlt: "Alroy Ndhlovu, founder of For The Rest Of Us",
  note: [
    "I've spent twelve years on every side of this work — campaigns and training for organisations from Meta to the IFC, brands, content, code — and watched too many good ideas die in the handoffs between four different agencies.",
    "So I learned to build the whole thing. One person to brief. The same hands on the product, the brand, and the growth around it.",
    "The apps on this site are problems from my own life I couldn't leave alone. Your problem gets the same treatment.",
  ],
  signoff: "— Alroy",
};
