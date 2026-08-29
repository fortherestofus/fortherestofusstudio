import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { HELLO_EMAIL } from "@/lib/contact";

/**
 * /apps/tapa/support/ — the Support URL submitted to App Store Connect and
 * Play Console.
 *
 * WHY IT EXISTS: Apple requires an http(s) Support URL (a mailto: is rejected)
 * that actually helps a user of THIS app. The studio's /contact/ page does not:
 * it is for commissioning work, never mentions tapa., and would meet someone
 * whose Pro will not restore with a question about scope and budget.
 * "Your Support URL does not provide support for your app" is a standard
 * rejection.
 *
 * It has to resolve for someone who has never installed tapa., so it is a
 * plain public page: no auth, no app dependency, same shape as the privacy
 * and terms pages beside it.
 *
 * KEEP IN STEP WITH THE APP. Every route named below is a real one:
 * Profile tab → gear → Settings holds Manage subscription, Restore purchases,
 * Contact support and Delete account; Dietary preferences sit on Profile
 * itself; "Forgot password?" on the sign-in screen emails a six-digit CODE,
 * not a reset link. If any of those move, the directions here walk someone
 * into a dead end.
 */
export const metadata: Metadata = {
  title: { absolute: "tapa. · Support" },
  description:
    "Help with tapa.: cancelling or restoring Pro, your free recipes, signing in, dietary settings, photo scanning, saved recipes, and deleting your account.",
  alternates: { canonical: "/apps/tapa/support/" },
};

const LAST_UPDATED = "28 August 2026";

export default function TapaSupportPage() {
  return (
    <LegalDocument
      title="Support"
      lastUpdated={LAST_UPDATED}
      backHref="/apps/tapa/"
      backLabel="Back to tapa."
      intro={[
        `Something not working, or not making sense? Email ${HELLO_EMAIL} and a person will answer, usually within 24 hours.`,
        "Most of what people write in about is answered below, and several of these you can sort out yourself in under a minute.",
      ]}
      sections={[
        {
          id: "pro",
          heading: "Cancel or change Pro",
          body: [
            "Pro is billed by Apple or Google, not by us, so the cancel switch lives in your phone's own settings and only you can reach it. We cannot cancel a subscription on your behalf.",
          ],
          bullets: [
            "Quickest route: in tapa., open the Profile tab, tap the gear, then Manage subscription. It opens the store's own page for your plan.",
            "On iPhone you can also open Settings, tap your name, then Subscriptions, then tapa. Pro.",
            "On Android, open the Play Store, tap your profile picture, then Payments and subscriptions, then Subscriptions.",
            "You keep Pro until the end of the period you have already paid for. Refunds are handled by Apple or Google under their own terms.",
          ],
        },
        {
          id: "restore",
          heading: "You paid, but Pro is not showing",
          body: [
            "This is nearly always a sign-in mismatch rather than a lost payment. A subscription belongs to the Apple Account or Google account that bought it, not to your tapa. account.",
          ],
          bullets: [
            "In tapa., go to Profile, tap the gear, then Restore purchases. The same button sits at the bottom of the Pro screen.",
            "Check you are signed in to the same Apple Account or Google account you used to buy it, especially on a new phone.",
            `If it still does not appear, email ${HELLO_EMAIL} with the email address on your tapa. account and roughly when you subscribed, and we will sort it out.`,
          ],
        },
        {
          id: "free-recipes",
          heading: "How many free recipes you get",
          body: [
            "Every account gets 10 recipes at no cost. That is a one-time allowance for the life of the account, not a weekly one — it does not reset, and deleting a recipe does not give one back.",
            "Try another is free. Re-rolling a recipe you did not like never spends the allowance, so use it as often as you need to get a result worth cooking.",
          ],
          bullets: [
            "Want to change the ingredients rather than re-roll? Use Edit ingredients — it hands your list back so you can adjust it.",
            "Pro removes the limit entirely, along with photo scanning of ingredients.",
          ],
        },
        {
          id: "signing-in",
          heading: "Trouble signing in",
          body: [
            "You can sign in with an email and password, with Apple, or with Google. Whichever you used the first time is the one that holds your account — signing in a different way makes a second, empty account rather than opening the first.",
            "If you used Sign in with Apple and chose to hide your email, your account sits under Apple's private relay address rather than your usual one. That is normal and nothing is lost.",
          ],
          bullets: [
            "Forgotten your password: tap Forgot password? on the sign-in screen. We email you a six-digit code — not a link — which you type into the app to set a new password. The code can only be used once, so ask for a fresh one if it expires.",
            "Nothing arrives: check your spam folder, and check you are using the address you signed up with. For your safety the screen never says whether an account exists for an address.",
            "Signed in with Apple or Google and cannot remember which: try the other one before making a new account. An account made the second way starts empty and does not merge with the first.",
          ],
        },
        {
          id: "dietary",
          heading: "Allergies and dietary needs",
          body: [
            "Set them once and every recipe is generated against them. Open the Profile tab and tap Dietary preferences to add allergies, intolerances, and how you eat.",
            "They are strong constraints, not a safety guarantee. tapa. cannot see your kitchen or read a label, so check every ingredient yourself before you cook — especially with a serious allergy.",
          ],
        },
        {
          id: "photos",
          heading: "Photographing your ingredients",
          body: [
            "Photo scanning is a Pro feature. Point the camera at what you have and tapa. reads it into a list of ingredients you can edit before generating.",
            "The photo is sent to our server, turned into ingredient names, and is not kept. Camera access is entirely optional — typing or dictating the same ingredients works identically.",
          ],
          bullets: [
            "Poor read? Better light and one clear shot of the shelf beats several dark ones. You can always add or remove ingredients by hand afterwards.",
            "tapa. never records audio. If you dictate ingredients, that is your keyboard's own microphone button doing the work.",
          ],
        },
        {
          id: "saved",
          heading: "Saved recipes and history",
          body: [
            "Anything you save lives in the Saved tab and stays readable with no connection. The Home screen keeps your three most recently generated recipes so you can find one you did not save.",
            "Everything is tied to the account you are signed in to. If you share a phone, each person sees only their own recipes and preferences — signing in as someone else never shows yours.",
          ],
        },
        {
          id: "account",
          heading: "Deleting your account",
          body: [
            "Open the Profile tab, tap the gear, then Delete account. It permanently removes your account and everything in it from our servers, and it cannot be undone.",
            "Deleting does not cancel a subscription. That belongs to your Apple Account or Google account and has to be cancelled separately, using the steps at the top of this page.",
            "Already uninstalled tapa., or locked out of your account? You can ask us to delete it instead. The full picture of what goes and what stays is at https://fortherestofus.app/apps/tapa/delete-account/.",
          ],
        },
        {
          id: "privacy",
          heading: "Privacy and terms",
          body: [
            "What we collect and what we do not is set out at https://fortherestofus.app/apps/tapa/privacy/, and the terms are at https://fortherestofus.app/apps/tapa/terms/.",
          ],
        },
        {
          id: "still-stuck",
          heading: "Still stuck",
          body: [
            `Write to ${HELLO_EMAIL}. Tell us what you were doing, what happened, and what you expected instead — and if you can, which phone you are on. A paragraph is plenty, and a real person reads it, usually within 24 hours.`,
          ],
        },
      ]}
    />
  );
}
