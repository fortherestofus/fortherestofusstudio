import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";
import { HELLO_EMAIL, CAL_INTRO, CAL_CONSULT, calLink } from "@/lib/contact";
import { STUDIO_STATS } from "@/lib/proof";
import { testimonials } from "@/lib/testimonials";
import Section from "@/components/ui/Section";
import EyebrowChip from "@/components/ui/EyebrowChip";
import PillButton from "@/components/ui/PillButton";
import TestimonialQuote from "@/components/ui/TestimonialQuote";
import CalBooking from "@/components/contact/CalBooking";
import CallToAction from "@/components/home/CallToAction";

const EMAIL = HELLO_EMAIL;

const DESCRIPTION =
  "Start a project with For The Rest Of Us. Tell us what you are trying to build or fix and we will tell you honestly what it takes, including whether we are the right people for it.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact · For The Rest Of Us",
    description: DESCRIPTION,
    url: "https://fortherestofus.app/contact/",
    type: "website",
  },
};

/**
 * The studio's numbers, as the thing you look at while deciding whether to
 * write. A generated still life sat here and said nothing; these are real and
 * sourced (lib/proof.ts).
 *
 * Indices point into STUDIO_STATS — the registry order is About's reading
 * order and stays as it is. Here the widest number leads, because it is the
 * one that answers "have you done this before".
 */
const STAT_CARDS = [
  { index: 1, tint: "bg-tint-amber", deep: "text-tint-amber-deep", wide: true },
  { index: 0, tint: "bg-tint-olive", deep: "text-tint-olive-deep", wide: false },
  { index: 2, tint: "bg-tint-rust", deep: "text-tint-rust-deep", wide: false },
];

export default function ContactPage() {
  const subject = encodeURIComponent("Project enquiry");

  return (
    <>
      {/* Hero — the invitation, with something to look at */}
      <section className="bg-bg pb-12 pt-28 sm:pb-16 sm:pt-36">
        <div className="mx-auto w-full max-w-content px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <EyebrowChip>Start a project</EyebrowChip>
              <h1 className="mt-6 text-balance text-[2.5rem] font-medium leading-[1.04] tracking-[-0.035em] sm:text-[3.25rem]">
                <span className="block text-ink">Tell us the problem.</span>
                <span className="block text-muted">
                  We will tell you what it takes.
                </span>
              </h1>
              <p className="mt-6 max-w-[48ch] text-pretty leading-relaxed text-muted sm:text-lg">
                Email or book a call. Either one reaches the person who would
                do the work, and you get a straight answer on scope, time and
                cost. If we are not the right fit, we will point you somewhere
                better.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <PillButton href={`mailto:${EMAIL}?subject=${subject}`} size="lg">
                  Email {EMAIL}
                </PillButton>
                <PillButton href="#book" variant="ghost" size="lg">
                  Book an intro call
                </PillButton>
              </div>

              {/* What used to be a numbered "what to put in the first email"
                  section, at the size the instruction actually warrants. */}
              <p className="mt-6 max-w-[52ch] text-pretty text-[0.9375rem] leading-relaxed text-muted">
                In the email: what you are building or the problem you want
                solved, who it is for, where you are now, and roughly when you
                want it done. A paragraph is plenty. We will ask the rest.
              </p>

              <dl className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
                {[
                  { label: "Based in", value: "Johannesburg, South Africa" },
                  { label: "Replies", value: "Usually within two days" },
                  { label: "Taking on", value: "A few projects at a time" },
                ].map((item) => (
                  <div key={item.label}>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                      {item.label}
                    </dt>
                    <dd className="mt-2 text-[0.9375rem] font-medium text-ink">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-6">
              <dl className="grid gap-4 sm:grid-cols-2">
                {STAT_CARDS.map(({ index, tint, deep, wide }) => {
                  const stat = STUDIO_STATS[index];
                  return (
                    <div
                      key={stat.label}
                      className={`rounded-card p-7 sm:p-8 ${tint} ${
                        wide ? "sm:col-span-2" : ""
                      }`}
                    >
                      <dd
                        className={`nums font-medium leading-none tracking-[-0.03em] ${deep} ${
                          wide
                            ? "text-[3.25rem] sm:text-[4rem]"
                            : "text-[2.5rem] sm:text-[3rem]"
                        }`}
                      >
                        {stat.value}
                      </dd>
                      <dt className="mt-3 text-pretty text-[0.9375rem] leading-snug text-ink/75">
                        {stat.label}
                        {stat.detail && (
                          <span className={`mt-1 block text-[0.8125rem] ${deep}`}>
                            {stat.detail}
                          </span>
                        )}
                      </dt>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/*
        Book a time. Second route in, and the heaviest thing on the site — the
        embed itself defers until you scroll to it, and the link inside the
        frame works with no JS at all.
      */}
      {/* scroll-mt clears the fixed navbar when the hero's anchor lands here. */}
      <Section id="book" tone="sunken" className="scroll-mt-24">
        <div className="max-w-reading">
          <h2 className="text-[1.75rem] font-medium tracking-[-0.02em] text-ink sm:text-[2.25rem]">
            Or book a time
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted">
            Fifteen minutes, no deck. Bring the problem as you understand it
            today. Half-formed is normal, and usually the fastest way to find
            out whether there is a project here.
          </p>
        </div>

        <CalBooking
          className="mt-8"
          calLink={calLink(CAL_INTRO)}
          fallbackHref={CAL_INTRO}
          fallbackLabel="Book a 15 minute intro call"
        />

        {/*
          The second event type, as an option rather than a footnote. It could
          have gone inside the embed — pointing Cal at the profile page lists
          both — but that puts a "choose an event type" step in front of the
          free intro call, which is the action this page is actually for.
        */}
        <div className="mt-8 flex flex-col gap-6 rounded-card border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="text-[1.25rem] font-medium tracking-[-0.015em] text-ink">
              Or something more involved
            </h3>
            <p className="mt-2 max-w-[54ch] text-pretty text-[0.9375rem] leading-relaxed text-muted">
              A longer, paid session for when you already know what you want
              built and need to plan the how.
            </p>
          </div>
          <PillButton href={CAL_CONSULT} external variant="ghost" size="lg">
            Book a consultation
          </PillButton>
        </div>
      </Section>

      {/*
        Someone who has just looked at a calendar and not clicked it is exactly
        who a testimonial is for, so the quote lives here now rather than under
        a process list — the process belongs on /services, and repeating it
        here was the second menu this page did not need.
      */}
      <Section tone="canvas">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <TestimonialQuote testimonial={testimonials[2]} size="lg" />
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
              What people usually come to us for
            </h2>
            <div className="mt-6 grid gap-x-8 gap-y-1 sm:grid-cols-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}/`}
                  className="group flex items-center justify-between gap-4 border-b border-border py-4 transition-colors hover:border-ink"
                >
                  <span className="text-[1.0625rem] text-ink">
                    {service.title}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-ink" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CallToAction
        eyebrow="No pressure"
        title="Still deciding?"
        body="Read how a project actually runs, or look at the products we have built for ourselves. Then email or book a call whenever you are ready."
        primaryLabel="See how we work"
        primaryHref="/services/"
        secondaryLabel="See the apps"
        secondaryHref="/apps/"
      />
    </>
  );
}
