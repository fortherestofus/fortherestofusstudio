import type { Metadata } from "next";
import { apps } from "@/lib/apps";
import PageHero from "@/components/layout/PageHero";
import Section, { SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";
import CallToAction from "@/components/home/CallToAction";

const DESCRIPTION =
  "For The Rest Of Us is a solutions studio in Johannesburg run by Alroy Ndhlovu — building its own apps, and building and advising for other people.";

export const metadata: Metadata = {
  title: "Studio",
  description: DESCRIPTION,
  alternates: { canonical: "/studio/" },
  openGraph: {
    title: "Studio — For The Rest Of Us",
    description: DESCRIPTION,
    url: "https://fortherestofus.app/studio/",
    type: "website",
  },
};

const PRINCIPLES = [
  {
    title: "Build to solve",
    body: "Every product here started as a real problem, usually one we had ourselves. If we cannot name the person it helps and the moment it helps them, we do not build it.",
  },
  {
    title: "Say it plainly",
    body: "No jargon, no invented metrics, no promises the software cannot keep. Clear writing is part of the product, not decoration applied at the end.",
  },
  {
    title: "Small and accountable",
    body: "You talk to the person doing the work. That limits how much we take on at once, and it means nothing gets lost being passed between people.",
  },
];

const STATS = [
  { value: String(apps.length), label: "products of our own" },
  { value: "4", label: "fields of practice" },
  { value: "1", label: "studio, Johannesburg" },
];

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="The studio"
        title="Technology is still built mostly for people who already understand it."
        titleMuted="We would rather build for everyone else."
        lead="For The Rest Of Us is a solutions studio in Johannesburg. We design and build digital products, and we advise the people building their own."
      />

      {/* Story + founder */}
      <Section tone="canvas" size="sm">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="max-w-reading space-y-5 text-pretty leading-relaxed text-muted">
              <p>
                The studio is run by Alroy Ndhlovu, a builder and product
                consultant. The work splits in two directions that keep feeding
                each other. On one side we make our own products: a browser
                extension that tells you the truth about your screen time, a
                devotional app, a cooking app that starts from whatever is
                actually in your kitchen, and a research tool for people who
                write in public.
              </p>
              <p>
                On the other side we do that same work for other people, plus
                the parts that usually go missing around it. Deciding what to
                build. Naming it. Writing it. Getting it in front of the right
                people, and making the business behind it run without three
                spreadsheets and a weekly headache.
              </p>
              <p>
                Building our own products is what keeps the consulting honest.
                We ship, we get things wrong, we fix them, and we carry what we
                learned into the next project. It is a small studio on purpose,
                which means the person you brief is the person who does the
                work.
              </p>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="nums block text-[2rem] font-medium leading-none tracking-[-0.02em] text-ink sm:text-[2.5rem]">
                      {stat.value}
                    </span>
                    <span className="mt-2 block text-[0.8125rem] leading-snug text-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-well border border-border bg-surface p-4 shadow-card lg:sticky lg:top-28">
              <PlaceholderBlock
                ratio="portrait"
                label="Studio portrait"
                className="rounded-xl"
              />
              <div className="px-1 pb-1 pt-4">
                <p className="font-medium text-ink">Alroy Ndhlovu</p>
                <p className="mt-0.5 text-[0.8125rem] text-muted">
                  Founder, builder, product consultant
                </p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                  Works across product, engineering, brand, and growth. Based in
                  Johannesburg, South Africa.
                </p>
                <a
                  href="mailto:hello@fortherestofus.app"
                  className="mt-4 inline-block text-[0.9375rem] font-medium text-accent transition-colors hover:text-ink"
                >
                  hello@fortherestofus.app
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Principles */}
      <Section tone="sunken">
        <SectionHeading
          eyebrow="How we think"
          title="Three things we hold to."
        />
        <div className="mt-12 grid gap-3 sm:gap-4 md:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <Card key={principle.title} className="p-6">
              <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
                {principle.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {principle.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <CallToAction
        eyebrow="Say hello"
        title="Come build something with us."
        body="Whether you want a product made or you want help working out what the product should be, start with a short note about where you are."
        primaryLabel="Start a project"
        primaryHref="/contact"
        secondaryLabel="See our services"
        secondaryHref="/services"
      />
    </>
  );
}
