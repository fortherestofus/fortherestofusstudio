/**
 * Studio contact routes. Single source of truth — never hard-code an email or
 * a booking URL in a page or component.
 *
 * HELLO_EMAIL  general enquiries, project briefs, product support.
 * LEGAL_EMAIL  privacy policies, terms, and any data or deletion request.
 *
 * CAL_INTRO    the free intro call, embedded inline on /contact.
 * CAL_CONSULT  the paid working session, a secondary link only — the studio
 *              quotes per project, so this is the one place a rate appears
 *              and it stays quiet.
 *
 * Both point at Alroy's own Cal account: he runs the studio, and the booker
 * shows his name. If a studio-branded Cal team is ever set up, changing these
 * two lines moves everything.
 */
export const HELLO_EMAIL = "hello@fortherestofus.app";
export const LEGAL_EMAIL = "legal@fortherestofus.app";

export const CAL_INTRO = "https://cal.com/mralroyndhlovu/quick";
export const CAL_CONSULT = "https://cal.com/mralroyndhlovu/consultation";

/** Everything after cal.com/ — what Cal's embed calls the calLink. */
export const calLink = (url: string) =>
  new URL(url).pathname.replace(/^\/|\/$/g, "");
