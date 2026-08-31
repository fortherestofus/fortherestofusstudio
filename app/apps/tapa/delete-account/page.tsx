import type { Metadata } from "next";
import Link from "next/link";
import LegalDocument from "@/components/legal/LegalDocument";
import { HELLO_EMAIL } from "@/lib/contact";

/**
 * /apps/tapa/delete-account/ — the Data deletion URL submitted to Play
 * Console (Data safety) and usable for App Store Connect's account-deletion
 * question.
 *
 * WHY IT EXISTS: Google requires a link where someone can request that their
 * account and its data be deleted, reachable WITHOUT signing in and without
 * installing the app. tapa. has had in-app deletion since launch
 * (Profile → gear → Delete account, which calls the account-delete edge
 * function), but that route is unreachable for the two cases the policy is
 * written for: a person who has uninstalled, and a person locked out of their
 * account. Hence the email route below.
 *
 * A section on the support page does not satisfy it — Play wants a URL that
 * lands on the deletion instructions themselves.
 *
 * KEEP IN STEP WITH THE APP. The list of what goes is the actual sequence in
 * tapa's supabase/functions/_shared/delete-user.ts: saved_recipes,
 * recipe_sessions, the avatar object, public.users, then the auth identity
 * last. If that function changes, this page changes with it.
 */
export const metadata: Metadata = {
  title: { absolute: "tapa. · Delete your account" },
  description:
    "How to delete your tapa. account and everything stored with it — in the app, or by email if you've uninstalled or can't sign in.",
  alternates: { canonical: "/apps/tapa/delete-account/" },
};

const LAST_UPDATED = "29 August 2026";

export default function TapaDeleteAccountPage() {
  return (
    <LegalDocument
      title="Delete your tapa. account"
      lastUpdated={LAST_UPDATED}
      backHref="/apps/tapa/"
      backLabel="Back to tapa."
      intro={[
        "You can delete your tapa. account and everything stored with it at any time. Deletion is permanent and immediate — there is no waiting period, and nothing is archived for later.",
        "If you still have the app and can sign in, do it yourself in under a minute. If you've uninstalled tapa. or can't get into your account, email us and we'll do it for you.",
      ]}
      sections={[
        {
          id: "in-app",
          heading: "Delete it yourself, in the app",
          body: [
            <>
              Open tapa., go to the <strong className="text-ink">Profile</strong>{" "}
              tab, tap the <strong className="text-ink">gear</strong> in the
              top corner, then{" "}
              <strong className="text-ink">Delete account</strong> at the bottom
              of Settings. You&rsquo;ll be asked to confirm once, and then it&rsquo;s done.
            </>,
          ],
        },
        {
          id: "by-email",
          heading: "Ask us to delete it",
          body: [
            <>
              Email{" "}
              <a className="text-accent-deep underline" href={`mailto:${HELLO_EMAIL}?subject=Delete%20my%20tapa%20account`}>
                {HELLO_EMAIL}
              </a>{" "}
              from the address on your tapa. account, with{" "}
              <strong className="text-ink">&ldquo;Delete my tapa account&rdquo;</strong>{" "}
              as the subject. That&rsquo;s the whole request. You don&rsquo;t need to
              explain why.
            </>,
            "We reply to confirm it's done, usually within 24 hours and always within 30 days. If you write from a different address we'll ask you one question to confirm the account is yours, because otherwise anyone could delete anyone's recipes.",
          ],
          bullets: [
            "Signed in with Apple and chose to hide your email? Your account sits under Apple's private relay address. Write to us from whichever address Apple forwards to and mention that you used Sign in with Apple.",
            "Can't remember which way you signed in? Tell us the email you'd expect and we'll find it.",
          ],
        },
        {
          id: "what-goes",
          heading: "What gets deleted",
          body: [
            "Everything attached to the account is removed from our servers straight away:",
          ],
          bullets: [
            "Your account itself, and the sign-in that goes with it — email, name, and profile picture.",
            "Your saved recipes and your recipe history, including the ingredients you entered and anything you rated.",
            "Your dietary preferences, allergies, and app settings.",
            "Your free-recipe count and the record of which plan you were on.",
          ],
        },
        {
          id: "what-stays",
          heading: "What doesn't go, and why",
          bullets: [
            <>
              <strong className="text-ink">
                Copies on your own phone.
              </strong>{" "}
              Saved recipes are also stored on the device so they open with no
              signal. Uninstalling tapa. clears them.
            </>,
            <>
              <strong className="text-ink">
                Your subscription, if you have one.
              </strong>{" "}
              Pro is billed by Apple or Google, not by us, so deleting your
              account does not cancel it. Cancel it first — the steps are on
              our{" "}
              <Link className="text-accent-deep underline" href="/apps/tapa/support/">
                support page
              </Link>
              .
            </>,
            <>
              <strong className="text-ink">Purchase records.</strong> Apple,
              Google, and our billing provider keep a record of transactions
              they processed, under their own terms and the tax rules they&rsquo;re
              held to. We can&rsquo;t erase those, and neither can they on request.
            </>,
            <>
              <strong className="text-ink">Backups.</strong> Our database is
              backed up daily on a rolling seven-day window. Your rows are gone
              from the live database immediately and fall out of the backups
              within seven days. Nothing deleted is ever restored or used
              again.
            </>,
          ],
        },
        {
          id: "questions",
          heading: "Questions before you decide",
          body: [
            <>
              If you&rsquo;re deleting because something isn&rsquo;t working, it may be
              worth reading the{" "}
              <Link className="text-accent-deep underline" href="/apps/tapa/support/">
                support page
              </Link>{" "}
              first — restoring a Pro purchase and resetting a password are both
              quick fixes. Either way, write to {HELLO_EMAIL} and a person will
              answer.
            </>,
            <>
              What we collect while you&rsquo;re using tapa. is set out in the{" "}
              <Link className="text-accent-deep underline" href="/apps/tapa/privacy/">
                privacy policy
              </Link>
              .
            </>,
          ],
        },
      ]}
    />
  );
}
