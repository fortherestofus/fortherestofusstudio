import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { LEGAL_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: { absolute: "tapa. · Privacy Policy" },
  description:
    "How tapa. handles your data. Your account and preferences are yours; ingredients you share are used only to generate your recipes.",
};

const LAST_UPDATED = "8 July 2026";
const CONTACT = LEGAL_EMAIL;

export default function TapaPrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      backHref="/apps/tapa/"
      backLabel="Back to tapa."
      intro={[
        "tapa. is a cooking app that turns the ingredients you have into a real recipe. To do that it needs a little information from you: an account to save your recipes, your tastes and dietary needs, and the ingredients you want to cook with. This policy explains exactly what we collect, who processes it, and why.",
        "The short version: we don't sell your data, we don't show ads, and the ingredients you share are used only to generate recipes for you.",
      ]}
      sections={[
        {
          heading: "Who we are",
          body: [
            <>
              tapa. is published by For The Rest Of Us, operated by Alroy
              Ndhlovu (&ldquo;we&rdquo;, &ldquo;us&rdquo;). For any privacy
              question, contact us at{" "}
              <a className="text-accent-deep underline" href={`mailto:${CONTACT}`}>
                {CONTACT}
              </a>
              .
            </>,
          ],
        },
        {
          heading: "Your account",
          body: [
            "To use tapa. you create an account. We store the basics needed to run it:",
          ],
          bullets: [
            "Your email address, used to sign you in and secure your account.",
            "An optional display name and profile picture, if you choose to add them, used to personalise the app.",
            "Your preferences: measurement system, default servings, cooking skill, dietary needs, and app settings such as theme.",
          ],
        },
        {
          heading: "Ingredients and recipes",
          body: [
            "The heart of tapa. is turning what you have into something to cook. When you ask for a recipe, we send the ingredients and preferences you provide to our AI to generate it:",
          ],
          bullets: [
            "Ingredients you add by typing or speaking them in.",
            "Photos of your ingredients, if you use the camera feature (available on Pro). The image is sent to be read for the ingredients in it, then used to generate a recipe.",
            "Your dietary needs, servings, cooking skill, and similar preferences, so the recipe fits how you actually cook.",
            "Recipes you save are stored on your account and on your device so you can open them again, including offline.",
          ],
        },
        {
          heading: "The AI that generates your recipes",
          body: [
            <>
              Recipes and ingredient photo recognition are powered by
              Anthropic&rsquo;s Claude models, which we call through our own
              secure backend. The ingredients and preferences for a request are
              sent to Anthropic only to produce your result. Anthropic does not
              use data sent through its API to train its models. We don&rsquo;t
              send your name, email, or account identifiers to the AI along with
              your ingredients.
            </>,
          ],
        },
        {
          heading: "Subscriptions and payments",
          body: [
            <>
              tapa. Pro is an optional paid subscription. Purchases are handled
              by the Apple App Store or Google Play and managed through{" "}
              <strong className="text-ink">RevenueCat</strong>, which tells us
              whether your subscription is active so we can unlock Pro features.
              We never see or store your card or payment details. Those stay
              with Apple, Google, and their payment processors.
            </>,
          ],
        },
        {
          heading: "Who processes your data",
          body: [
            "We keep the list of companies we rely on short, and each only handles what it needs to:",
          ],
          bullets: [
            <>
              <strong className="text-ink">Supabase</strong>: hosts our
              database, authentication, and storage (your account, saved
              recipes, preferences, and profile picture).
            </>,
            <>
              <strong className="text-ink">Anthropic</strong>: generates
              recipes and reads ingredient photos, as described above.
            </>,
            <>
              <strong className="text-ink">RevenueCat</strong>: manages your
              subscription status.
            </>,
            <>
              <strong className="text-ink">Apple &amp; Google</strong>: process
              payments and distribute the app through their stores.
            </>,
          ],
        },
        {
          heading: "What we never do",
          bullets: [
            "We never sell or rent your data to anyone.",
            "We don't show ads or use advertising trackers.",
            "We don't use your saved recipes or ingredients for anything other than running the app for you.",
          ],
        },
        {
          heading: "Keeping and deleting your data",
          body: [
            <>
              Your data lives with your account until you remove it. You can
              delete your account at any time from{" "}
              <strong className="text-ink">Settings → Delete account</strong>,
              which permanently removes your account, saved recipes, and
              associated data. Uninstalling the app clears the copies stored on
              your device.
            </>,
            <>
              Uninstalled the app, or can't sign in? You can still ask us to
              delete it. What goes, what stays, and how to request it are set
              out at{" "}
              <a
                className="text-accent-deep underline"
                href="/apps/tapa/delete-account/"
              >
                fortherestofus.app/apps/tapa/delete-account/
              </a>
              .
            </>,
          ],
        },
        {
          heading: "Children",
          body: [
            "tapa. is not directed at children and is not intended for anyone under the age required to form a binding agreement in their country.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Depending on where you live, you may have rights over your personal data under laws such as POPIA or the GDPR, including access, correction, and deletion. You can handle most of this yourself in the app, and we're happy to help with anything else. Just get in touch.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "If we change how tapa. handles your data, we'll update this page and the date above. Significant changes will be reflected in the app or its store listing.",
          ],
        },
        {
          heading: "Contact",
          body: [
            <>
              Questions about your privacy? Email{" "}
              <a className="text-accent-deep underline" href={`mailto:${CONTACT}`}>
                {CONTACT}
              </a>
              .
            </>,
          ],
        },
      ]}
    />
  );
}
