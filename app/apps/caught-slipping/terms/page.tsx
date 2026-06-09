import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: { absolute: "CaughtSlipping — Terms & Conditions" },
  description:
    "The terms for using CaughtSlipping, including the Pro license, payments, and refunds.",
};

const LAST_UPDATED = "9 June 2026";
const CONTACT = "hello@alroyndhlovu.com";

export default function CaughtSlippingTermsPage() {
  return (
    <LegalDocument
      title="Terms & Conditions"
      lastUpdated={LAST_UPDATED}
      backHref="/apps/caught-slipping/"
      backLabel="Back to CaughtSlipping"
      intro={[
        "These terms govern your use of the CaughtSlipping browser extension. By installing or using it, you agree to them. If you do not agree, please don't use the extension.",
      ]}
      sections={[
        {
          heading: "The extension",
          body: [
            "CaughtSlipping tracks the time you spend on certain websites and gives you stats, humorous commentary, optional pauses, and optional site blocking, to help you understand and manage your browsing. It is a self-improvement tool, not a medical, clinical, or professional service.",
          ],
        },
        {
          heading: "A note on the humour",
          body: [
            "CaughtSlipping is deliberately blunt and sarcastic. Its roasts, shame meters, and voice lines are meant as light entertainment to nudge your habits, not as genuine judgement, advice, or anything to be taken to heart. If that's not your style, it may not be the tool for you.",
          ],
        },
        {
          heading: "Your licence to use it",
          body: [
            "We grant you a personal, non-exclusive, non-transferable licence to use CaughtSlipping for your own use. The free version is available at no cost. The Pro version unlocks additional features and is unlocked with a licence key after purchase.",
          ],
        },
        {
          heading: "Pro purchases and payments",
          body: [
            "Pro is a one-time purchase that unlocks Pro features on your devices, subject to a per-key activation limit shown at checkout. Payments are handled by our payment provider and merchant of record, Lemon Squeezy, which collects and processes payment details and applicable taxes under its own terms. The price shown at checkout is the price you pay.",
          ],
        },
        {
          heading: "Licence keys",
          bullets: [
            "Your key is for your own use. Sharing or reselling it is not permitted and may cause it to stop working once its activation limit is reached.",
            "A valid key unlocks Pro. If a key is refunded, charged back, or found to be invalid, it will be deactivated and Pro access will end.",
            "You are responsible for keeping your key safe.",
          ],
        },
        {
          heading: "Refunds",
          body: [
            "If Pro isn't right for you, contact us within 14 days of purchase and we'll arrange a refund through Lemon Squeezy. Refunded keys are deactivated. Some jurisdictions grant additional statutory refund rights, which we honour.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "You agree not to reverse-engineer, tamper with, resell, or redistribute the extension, circumvent its licensing, or use it to break any law or any third-party website's terms.",
          ],
        },
        {
          heading: "Availability and changes",
          body: [
            "We may update, change, or discontinue features over time to keep the extension working and improving. We'll try to avoid removing things you rely on, but we can't guarantee any feature will remain available forever.",
          ],
        },
        {
          heading: "No warranty",
          body: [
            "CaughtSlipping is provided “as is” and “as available”, without warranties of any kind. We don't guarantee that tracking is perfectly accurate, that blocking is unbreakable, or that the extension will be error-free or uninterrupted.",
          ],
        },
        {
          heading: "Limitation of liability",
          body: [
            "To the maximum extent permitted by law, we are not liable for any indirect or consequential loss arising from your use of the extension. Our total liability to you is limited to the amount you paid for Pro (if any) in the 12 months before the claim.",
          ],
        },
        {
          heading: "Termination",
          body: [
            "You can stop using CaughtSlipping at any time by uninstalling it. We may suspend access tied to a licence key that is misused, shared in breach of these terms, or refunded.",
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
              <a className="text-accent underline" href={`mailto:${CONTACT}`}>
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
