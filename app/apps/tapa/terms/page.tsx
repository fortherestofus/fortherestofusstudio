import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { LEGAL_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: { absolute: "tapa. — Terms of Service" },
  description:
    "The terms for using tapa. — the AI cooking app that turns your ingredients into recipes.",
};

const LAST_UPDATED = "8 July 2026";
const CONTACT = LEGAL_EMAIL;

export default function TapaTermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      lastUpdated={LAST_UPDATED}
      backHref="/apps/tapa/"
      backLabel="Back to tapa."
      intro={[
        "These terms govern your use of the tapa. app. By creating an account or using the app, you agree to them. If you do not agree, please don't use tapa.",
      ]}
      sections={[
        {
          heading: "The app",
          body: [
            "tapa. takes the ingredients you have — typed, spoken, or photographed — and uses AI to generate recipes built around your tastes and dietary needs. It's a cooking aid to help you decide what to make. It is not a professional nutrition, dietary, medical, or food-safety service.",
          ],
        },
        {
          heading: "Recipes are AI-generated — use your judgement",
          body: [
            "Recipes, ingredient readings, and other content in tapa. are generated automatically by AI and may be inaccurate, incomplete, or unsuitable for you. Always use your own judgement before cooking or eating anything it suggests.",
          ],
          bullets: [
            "Check every ingredient yourself, especially if you have allergies or intolerances. The dietary settings are a guide, not a guarantee — never rely on them alone to keep you safe.",
            "Follow safe food-handling, cooking temperatures, and storage practices. tapa. can't see your kitchen or the state of your ingredients.",
            "If you have a medical condition, allergy, or specific dietary requirement, confirm suitability with a qualified professional. tapa. does not give medical or nutritional advice.",
          ],
        },
        {
          heading: "Your account",
          body: [
            "You're responsible for your account and for keeping your login secure. You must be old enough to form a binding agreement in your country to create one. Please give accurate information and keep your dietary settings up to date so the app can work as intended.",
          ],
        },
        {
          heading: "Subscriptions and payments",
          body: [
            "tapa. is free to use, with an optional Pro subscription that unlocks features such as the camera ingredient scanner and higher generation limits. Pro is billed through the Apple App Store or Google Play under the price and terms shown at purchase.",
          ],
          bullets: [
            "Subscriptions renew automatically until cancelled. You can cancel any time through your App Store or Google Play account settings.",
            "Payments, renewals, and refunds are handled by Apple or Google under their terms; you can request a refund or manage your plan through them, or from within the app's subscription settings.",
            "If we change Pro pricing or what it includes, existing terms of a purchase are honoured as required by the store and applicable law.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "You agree not to misuse tapa. — including reverse-engineering or tampering with it, abusing or overloading the service, attempting to bypass Pro limits, or using it to break any law. The recipes you generate are for your own personal, non-commercial cooking.",
          ],
        },
        {
          heading: "Availability and changes",
          body: [
            "We may update, change, or discontinue features over time to keep tapa. working and improving, and generation may depend on third-party services being available. We'll try to avoid removing things you rely on, but we can't guarantee any feature will remain available forever.",
          ],
        },
        {
          heading: "No warranty",
          body: [
            "tapa. is provided “as is” and “as available”, without warranties of any kind. We don't guarantee that recipes will be accurate, safe for you, to your taste, or that the app will be error-free or uninterrupted.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "To the maximum extent permitted by law, we are not liable for any indirect or consequential loss arising from your use of tapa., including any outcome of cooking or eating food prepared from a generated recipe. You are responsible for what you choose to make and eat.",
          ],
        },
        {
          heading: "Termination",
          body: [
            "You can stop using tapa. at any time by deleting your account or uninstalling the app. We may suspend or discontinue access if the app is misused in breach of these terms.",
          ],
        },
        {
          heading: "Governing law",
          body: [
            "These terms are governed by the laws of South Africa. Any dispute will be dealt with by the courts of South Africa, without affecting any mandatory consumer protections available to you where you live.",
          ],
        },
        {
          heading: "Contact",
          body: [
            <>
              Questions about these terms? Email{" "}
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
