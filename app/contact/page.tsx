import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services, PROCESS_STEPS } from "@/lib/services";
import { HELLO_EMAIL, CAL_INTRO, CAL_CONSULT, calLink } from "@/lib/contact";
import { contactStillLife } from "@/lib/work";
import { testimonials } from "@/lib/testimonials";
import Section from "@/components/ui/Section";
import EyebrowChip from "@/components/ui/EyebrowChip";
import PillButton from "@/components/ui/PillButton";
import TestimonialQuote from "@/components/ui/TestimonialQuote";
import CalBooking from "@/components/contact/CalBooking";
import CallToAction from "@/components/home/CallToAction";

const EMAIL = HELLO_EMAIL;

const DESCRIPTION =
  "Start a project with For The Rest Of Us. Tell us what you are trying to build or fix and we will tell you honestly what it takes.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact/" },
  openGraph: {
    title: "Contact — For The Rest Of Us",
    description: DESCRIPTION,
    url: "https://fortherestofus.app/contact/",
    type: "website",
  },
};

const BRIEF_PROMPTS = [
  "What you are trying to build, or the problem you want solved",
  "Who it is for, if you already know",
  "Where you are now: an idea, a draft, or something already live",
  "Roughly when you would like it done",
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
                Send an email or book a call — either one reaches the person who
                would do the work. You get an honest answer about scope, time
                and cost, and if we are not the right studio for it, we will say
                so and point you somewhere better.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <PillButton href={`mailto:${EMAIL}?subject=${subject}`} size="lg">
                  Email {EMAIL}
                </PillButton>
                <PillButton href="#book" variant="ghost" size="lg">
                  Book an intro call
                </PillButton>
              </div>

              <dl className="mt-12 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
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
              <figure className="overflow-hidden rounded-well border border-border shadow-card">
                <div className="relative" style={{ aspectRatio: "3 / 2" }}>
                  <Image
                    src={contactStillLife.src}
                    alt={contactStillLife.alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 560px"
                    className="object-cover"
                    priority
                  />
                </div>
              </figure>
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
            today — half-formed is normal, and it is usually the fastest way to
            find out whether there is a project here.
          </p>
        </div>

        <CalBooking
          className="mt-8"
          calLink={calLink(CAL_INTRO)}
          fallbackHref={CAL_INTRO}
          fallbackLabel="Book a 15 minute intro call"
        />

        <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
          Want to work through something properly instead?{" "}
          <a
            href={CAL_CONSULT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:decoration-ink"
          >
            Book a paid consultation
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </p>
      </Section>

      {/* What to send, and what happens next — side by side */}
      <Section tone="canvas">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <h2 className="text-[1.75rem] font-medium tracking-[-0.02em] text-ink">
              What to put in the first email
            </h2>
            <p className="mt-3 max-w-[46ch] leading-relaxed text-muted">
              None of it has to be polished. A paragraph is plenty — we will ask
              the rest.
            </p>
            <ol className="mt-8 flex flex-col">
              {BRIEF_PROMPTS.map((prompt, i) => (
                <li
                  key={prompt}
                  className="flex gap-5 border-t border-border py-5"
                >
                  <span className="nums shrink-0 text-[0.8125rem] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.0625rem] leading-snug text-ink">
                    {prompt}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6">
            <h2 className="text-[1.75rem] font-medium tracking-[-0.02em] text-ink">
              What happens next
            </h2>
            <p className="mt-3 max-w-[46ch] leading-relaxed text-muted">
              The same three stages every project runs on.
            </p>
            <ol className="mt-8 flex flex-col">
              {PROCESS_STEPS.map((step) => (
                <li
                  key={step.step}
                  className="flex gap-5 border-t border-border py-5"
                >
                  <span className="nums shrink-0 text-[0.8125rem] text-accent-deep">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-[1.0625rem] font-medium text-ink">
                      {step.title}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted">
                      {step.description}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-10 border-t border-border pt-8">
              <TestimonialQuote testimonial={testimonials[2]} />
            </div>
          </div>
        </div>
      </Section>

      {/* Where people usually start */}
      <Section tone="sunken" size="sm">
        <h2 className="text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
          What people usually come to us for
        </h2>
        <div className="mt-8 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}/`}
              className="group flex items-center justify-between gap-4 border-b border-border py-4 transition-colors hover:border-ink"
            >
              <span className="text-[1.0625rem] text-ink">{service.title}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-ink" />
            </Link>
          ))}
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
