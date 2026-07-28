import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { HELLO_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: { absolute: "InSpiritInTruth — Giving FAQs" },
  description:
    "Answers about giving to InSpiritInTruth — where gifts go, what a Keeper is, recurring gifts, receipts, security, and tax.",
  alternates: { canonical: "/apps/inspiritintruth/giving/faq/" },
};

const CONTACT = HELLO_EMAIL;

export default function GivingFaqPage() {
  return (
    <LegalDocument
      title="Giving FAQs"
      lastUpdated="10 July 2026"
      backHref="/apps/inspiritintruth/giving"
      backLabel="Back to Giving"
      intro={[
        "Everything you might want to know before you give to InSpiritInTruth. Still stuck? Email us and a real person will help.",
      ]}
      sections={[
        {
          heading: "Where does my gift go?",
          body: [
            "Two places. Most of it funds the work behind InSpiritInTruth — building new features, keeping the quality high, and creating the devotional content itself: the design, the writing, the servers. And 10% of all giving goes to acts of kindness: donations to people and organisations doing good for others.",
          ],
        },
        {
          heading: "Do I get anything in return?",
          body: [
            "No — and that's the point. Giving is a gift, not a purchase: it doesn't unlock features or content. (The app does have an optional Pro subscription — unlimited AI devotionals and deeper reflections — but that's entirely separate from giving, and giving is never required for it.)",
          ],
        },
        {
          heading: "What is a Keeper?",
          body: [
            "A Keeper gives a little on a regular schedule to keep InSpiritInTruth going — for themselves and for the next person. The name comes from an old question, “Am I my brother's keeper?” — giving is one small way to answer yes. You choose the amount and how often, and you can cancel anytime.",
          ],
        },
        {
          heading: "Can I change or cancel a recurring gift?",
          body: [
            <>
              Anytime — there&rsquo;s no lock-in and no penalty. If you&rsquo;d like
              a hand, email us at{" "}
              <a className="text-accent-deep underline" href={`mailto:${CONTACT}`}>
                {CONTACT}
              </a>
              .
            </>,
          ],
        },
        {
          heading: "How are payments handled?",
          body: [
            "Securely, through Paystack. We never see or store your card details. Gifts are processed in South African Rand (ZAR).",
          ],
        },
        {
          heading: "Will I get a receipt?",
          body: [
            "Yes — we send it to the email on your giving profile. We'll also send the occasional note on the good your giving does, and nothing more.",
          ],
        },
        {
          heading: "Is my gift tax-deductible?",
          body: [
            "No. InSpiritInTruth isn't a registered public-benefit organisation, so gifts aren't tax-deductible and we can't issue a tax certificate. You're giving simply to keep something good going.",
          ],
        },
        {
          heading: "Who is behind this?",
          body: [
            <>
              InSpiritInTruth is built by For The Rest Of Us. Any question about
              giving? Email{" "}
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
