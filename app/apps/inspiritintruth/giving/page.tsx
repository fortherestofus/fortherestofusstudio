import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sprout } from "lucide-react";
import { getApp } from "@/lib/apps";
import AppThemeProvider from "@/components/apps/AppThemeProvider";
import { HELLO_EMAIL, LEGAL_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: { absolute: "InSpiritInTruth — Giving" },
  description:
    "How giving funds the work behind InSpiritInTruth, where your gift goes, and what it means to become a Keeper. A gift, never a purchase.",
  alternates: { canonical: "/apps/inspiritintruth/giving/" },
  openGraph: {
    title: "InSpiritInTruth — Giving",
    description:
      "Giving funds the work behind InSpiritInTruth — and 10% goes to acts of kindness.",
    url: "/apps/inspiritintruth/giving/",
    type: "website",
  },
};

const app = getApp("inspiritintruth")!;

// Kindness slice keeps its own colour so it reads as distinct from the app accent.
const KINDNESS = "#E0645C";

export default function GivingPage() {
  return (
    <AppThemeProvider app={app} className="bg-bg">
      <article className="mx-auto max-w-reading px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
        <Link
          href="/apps/inspiritintruth/"
          className="inline-flex items-center gap-1.5 text-[0.9375rem] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to InSpiritInTruth
        </Link>

        <p className="mt-9 text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
          Giving
        </p>
        <h1 className="mt-3 text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
          You can help keep this going.
        </h1>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-ink">
          InSpiritInTruth is built with care — the devotionals, the Bible, the
          daily verses. If it&rsquo;s meant something to you, a gift funds the
          work behind it and helps it reach more hearts.
        </p>

        {/* Where your gift goes */}
        <section className="mt-14">
          <h2 className="text-xl font-medium tracking-[-0.01em] text-ink">
            Where your gift goes
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted">
            Every gift does two things. Most of it funds the work — building new
            features, keeping the quality high, and creating the devotional
            content itself: the design, the writing, the servers. And 10% of all
            giving goes to acts of kindness: donations to people and
            organisations doing good for others. We&rsquo;ll share where it
            lands.
          </p>

          <div className="mt-6 flex h-4 overflow-hidden rounded-full">
            <div className="bg-accent" style={{ flex: 9 }} />
            <div
              className="ml-1 rounded-full"
              style={{ flex: 1, backgroundColor: KINDNESS }}
            />
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="ml-3 flex-1 text-ink">
                Building the app &amp; its content
              </span>
              <span className="nums font-medium text-ink">90%</span>
            </div>
            <div className="flex items-center">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: KINDNESS }}
              />
              <span className="ml-3 flex-1 text-ink">
                Acts of kindness — helping others
              </span>
              <span className="nums font-medium text-ink">10%</span>
            </div>
          </div>
        </section>

        {/* Keepers */}
        <section className="mt-14 rounded-well border border-border bg-surface p-8 shadow-card sm:p-10">
          <div className="flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-accent) 16%, transparent)",
              }}
            >
              <Sprout className="h-6 w-6 text-accent-deep" />
            </span>
            <h2 className="text-xl font-medium tracking-[-0.01em] text-ink">
              Become a Keeper
            </h2>
          </div>
          <p className="mt-5 text-pretty leading-relaxed text-muted">
            &ldquo;Am I my brother&rsquo;s keeper?&rdquo; someone once asked,
            hoping the answer was no. A Keeper gives a little each month to keep
            InSpiritInTruth going — for themselves, and for the next person who
            needs it. It&rsquo;s an ordinary way to answer yes. You choose the
            amount and how often, and you can change or cancel anytime.
          </p>
        </section>

        {/* A gift, not a purchase */}
        <section className="mt-14">
          <h2 className="text-xl font-medium tracking-[-0.01em] text-ink">
            A gift, not a purchase
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted">
            Giving is exactly that — a gift. It doesn&rsquo;t unlock anything,
            and it isn&rsquo;t required. You give because you want to keep
            something good going, not to get something back. (If you&rsquo;d
            rather get something in return, the app&rsquo;s optional Pro
            subscription — unlimited AI devotionals and deeper reflections —
            supports the work too, and is entirely separate from giving.)
          </p>
        </section>

        {/* Privacy */}
        <section id="privacy" className="mt-14 scroll-mt-28">
          <h2 className="text-xl font-medium tracking-[-0.01em] text-ink">
            Your privacy
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted">
            Payments are handled securely by Paystack — we never see or store
            your card details. We keep the email on your giving profile to send
            receipts and the occasional note on the good your giving does, and
            nothing more. Ask us to remove your details anytime at{" "}
            <a
              className="text-accent-deep underline"
              href={`mailto:${LEGAL_EMAIL}`}
            >
              {LEGAL_EMAIL}
            </a>
            .
          </p>
        </section>

        {/* Footer actions */}
        <div className="mt-14 border-t border-border pt-8">
          <p className="text-muted">Giving lives in the InSpiritInTruth app.</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/apps/inspiritintruth/giving/faq"
              className="inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink transition-colors hover:text-accent-deep"
            >
              Giving FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              className="text-[0.9375rem] text-muted transition-colors hover:text-ink"
              href={`mailto:${HELLO_EMAIL}?subject=Giving%20support`}
            >
              Email giving support
            </a>
          </div>
        </div>
      </article>
    </AppThemeProvider>
  );
}
