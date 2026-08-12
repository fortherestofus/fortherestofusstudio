/**
 * WhyChapter — chapter 01 of the story. Opens with the client's problem
 * (StoryBrand: the visitor is the hero), then the studio's three convictions,
 * each with a real artefact beside it — a claim never travels without its
 * evidence. Closes on the first trust marker, a real quote.
 */
import Image from "next/image";
import Section, { SectionHeading } from "@/components/ui/Section";
import ChapterMark from "@/components/ui/ChapterMark";
import AppIcon from "@/components/ui/AppIcon";
import TestimonialQuote from "@/components/ui/TestimonialQuote";
import { apps, getApp } from "@/lib/apps";
import { caseProofs } from "@/lib/proof";
import { testimonials } from "@/lib/testimonials";

/** Belief 1 artefact: a real problem→product pair, no simulated UI. */
function ProblemPairArtefact() {
  const tapa = getApp("tapa")!;
  return (
    <div className="rounded-card border border-border bg-surface p-4">
      <p className="text-[0.625rem] uppercase tracking-[0.12em] text-faint">
        The problem
      </p>
      <p className="mt-1.5 text-[0.9375rem] font-medium leading-snug text-ink">
        “{tapa.problem}”
      </p>
      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
        <AppIcon
          icon={tapa.icon}
          color={tapa.accentColor}
          label={tapa.name}
          size={36}
          className="rounded-[10px]"
        />
        <div className="min-w-0">
          <p className="text-[0.8125rem] font-medium text-ink">{tapa.name}</p>
          <p className="truncate text-[0.75rem] text-muted">{tapa.tagline}</p>
        </div>
      </div>
    </div>
  );
}

/** Belief 2 artefact: four products, four faces, one hand. */
function IdentityArtefact() {
  return (
    <div className="rounded-card border border-border bg-surface p-4">
      <div className="flex items-center justify-between gap-2">
        {apps.map((app) => (
          <AppIcon
            key={app.slug}
            icon={app.icon}
            color={app.accentColor}
            label={app.name}
            size={44}
            className="rounded-xl"
          />
        ))}
      </div>
      <p className="mt-4 border-t border-border pt-3 text-[0.75rem] leading-relaxed text-muted">
        Four products, four faces — drawn by the same hand.
      </p>
    </div>
  );
}

/** Belief 3 artefact: real campaign numbers, named and dated. */
function NumbersArtefact() {
  const thrifty = caseProofs.find((c) => c.slug === "thrifty-adventures")!;
  const [leads, impressions] = thrifty.stats;
  return (
    <div className="rounded-card border border-border bg-surface p-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="nums text-[1.375rem] font-medium leading-none tracking-[-0.02em] text-ink">
            {leads.value}
          </p>
          <p className="mt-1 text-[0.75rem] text-muted">
            {leads.label} · {leads.detail}
          </p>
        </div>
        <div>
          <p className="nums text-[1.375rem] font-medium leading-none tracking-[-0.02em] text-ink">
            {impressions.value}
          </p>
          <p className="mt-1 text-[0.75rem] text-muted">{impressions.label}</p>
        </div>
      </div>
      <p className="mt-4 border-t border-border pt-3 text-[0.75rem] text-faint">
        {thrifty.client} · LinkedIn · {thrifty.period}
      </p>
    </div>
  );
}

const BELIEFS = [
  {
    title: "Every product starts as a problem worth solving.",
    body: "Not a market gap — a moment that keeps happening to a real person. If the problem is real, the product has a reason to exist.",
    artefact: <ProblemPairArtefact />,
  },
  {
    title: "Every product needs an identity.",
    body: "A look, a voice, a name people can hold onto. Products without one get forgotten — even the useful ones.",
    artefact: <IdentityArtefact />,
  },
  {
    title: "Every product needs to be known.",
    body: "Building it is half the work. Marketing and analytics decide whether anyone finds it — and tell you what to fix next.",
    artefact: <NumbersArtefact />,
  },
];

export default function WhyChapter() {
  return (
    <Section tone="canvas" id="why">
      <ChapterMark index={1} total={3} />

      <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-7">
          <SectionHeading
            align="left"
            eyebrow="Why we build"
            title="The problem you've learned to live with."
            subtitle="Every business has one — the process held together with copy-paste, the idea that never left the notes app, the product nobody can find. Good ideas rarely die from bad code. They die in handoffs. We run on three convictions instead:"
          />
        </div>

        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-well border border-border shadow-card">
            <Image
              src="/media/why-problem.jpg"
              alt="A desk at dusk: a laptop covered in sticky notes, a handwritten list, cold coffee and tangled cables"
              width={1248}
              height={832}
              sizes="(max-width: 1024px) 92vw, 460px"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
        {BELIEFS.map((belief) => (
          <div key={belief.title} className="flex flex-col">
            <h3 className="text-balance text-[1.25rem] font-medium leading-snug tracking-[-0.015em] text-ink">
              {belief.title}
            </h3>
            <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
              {belief.body}
            </p>
            <div className="mt-6">{belief.artefact}</div>
          </div>
        ))}
      </div>

      {/* First trust marker */}
      <div className="mt-16 border-t border-border pt-10">
        <TestimonialQuote testimonial={testimonials[0]} size="lg" className="max-w-3xl" />
      </div>
    </Section>
  );
}
