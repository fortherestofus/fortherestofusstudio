import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { services, PROCESS_STEPS } from "@/lib/services";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import PillButton from "@/components/ui/PillButton";
import Icon from "@/components/ui/Icon";

const EMAIL = "hello@fortherestofus.app";

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

const DETAILS = [
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: MapPin, label: "Based in", value: "Johannesburg, South Africa" },
  { icon: Clock, label: "Response time", value: "Usually within two days" },
];

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
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are building."
        titleMuted="We will tell you honestly what it takes."
        lead="No forms with fifteen fields. Send a short email with the shape of the project and we will come back to you with a straight answer, including whether we are the wrong studio for it."
      >
        <PillButton href={`mailto:${EMAIL}?subject=${subject}`} size="lg">
          Email us
        </PillButton>
      </PageHero>

      <Section tone="canvas" size="sm">
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
          {/* What to include */}
          <Card className="p-6 sm:p-8 lg:col-span-7">
            <h2 className="text-xl font-medium tracking-[-0.01em] text-ink">
              What to put in the first email
            </h2>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
              None of this is required. It just means our first reply is useful
              instead of a list of questions.
            </p>
            <ul className="mt-6 space-y-3">
              {BRIEF_PROMPTS.map((prompt, i) => (
                <li key={prompt} className="flex gap-3">
                  <span className="nums mt-0.5 font-mono text-[0.8125rem] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.9375rem] leading-snug text-muted">
                    {prompt}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <PillButton href={`mailto:${EMAIL}?subject=${subject}`}>
                Start a project
              </PillButton>
            </div>
          </Card>

          {/* Details */}
          <div className="grid gap-3 sm:gap-4 lg:col-span-5">
            <Card className="p-6 sm:p-8">
              <dl className="space-y-6">
                {DETAILS.map(({ icon: DetailIcon, label, value, href }) => (
                  <div key={label} className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                      <DetailIcon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
                        {label}
                      </dt>
                      <dd className="mt-1 text-[0.9375rem] text-ink">
                        {href ? (
                          <a
                            href={href}
                            className="break-all transition-colors hover:text-accent"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Card>

            <Card className="bg-accent-soft p-6 sm:p-8">
              <h2 className="text-lg font-medium tracking-[-0.01em] text-ink">
                What happens next
              </h2>
              <ol className="mt-4 space-y-3">
                {PROCESS_STEPS.map((step) => (
                  <li key={step.step} className="flex gap-3">
                    <span className="nums mt-0.5 font-mono text-[0.8125rem] text-muted">
                      {String(step.step).padStart(2, "0")}
                    </span>
                    <span className="text-[0.9375rem] leading-snug text-muted">
                      <span className="font-medium text-ink">{step.title}</span>{" "}
                      — {step.description}
                    </span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>
      </Section>

      {/* What we can help with */}
      <Section tone="sunken" size="sm">
        <h2 className="text-center text-[0.8125rem] text-faint">
          Things people usually come to us for
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {services.map((service) => (
            <span
              key={service.slug}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-[0.9375rem] text-muted"
            >
              <Icon name={service.icon} className="h-4 w-4 text-accent" />
              {service.title}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
