import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: { absolute: "CaughtSlipping — Terms & Conditions" },
  description:
    "The terms for using CaughtSlipping — a free, private browser extension.",
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
            "CaughtSlipping is deliberately blunt and sarcastic. Its roasts and shame meters are meant as light entertainment to nudge your habits, not as genuine judgement, advice, or anything to be taken to heart. If that's not your style, it may not be the tool for you.",
          ],
        },
        {
          heading: "Your licence to use it",
          body: [
            "CaughtSlipping is free to use, with no paid tiers, subscriptions, or in-app purchases. We grant you a personal, non-exclusive, non-transferable licence to use it for your own use.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "You agree not to reverse-engineer, tamper with, resell, or redistribute the extension, or use it to break any law or any third-party website's terms.",
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
            "To the maximum extent permitted by law, we are not liable for any indirect or consequential loss arising from your use of the extension. Because CaughtSlipping is provided free of charge, our total liability to you for any claim is limited to the fullest extent the law allows.",
          ],
        },
        {
          heading: "Termination",
          body: [
            "You can stop using CaughtSlipping at any time by uninstalling it. We may discontinue the extension, or suspend access, if it is misused in breach of these terms.",
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
