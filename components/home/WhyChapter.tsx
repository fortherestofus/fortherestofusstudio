/**
 * WhyChapter — chapter 01 of the story. Opens with the client's problem
 * (StoryBrand: the visitor is the hero), then the three convictions that
 * make up the lifecycle — solve it, name it, make it known — each proven
 * by a real artefact from real work. Closes on the first trust marker.
 */
import Section, { SectionHeading } from "@/components/ui/Section";
import ChapterMark from "@/components/ui/ChapterMark";
import TestimonialQuote from "@/components/ui/TestimonialQuote";
import {
  IdentityArtefact,
  KnownArtefact,
  RedesignArtefact,
  SiteVideoArtefact,
} from "@/components/home/WhyArtefacts";
import { lumiskinVideo } from "@/lib/work";
import { testimonials } from "@/lib/testimonials";

const BELIEFS = [
  {
    stage: "Identify",
    title: "Most products fail because nobody needed them.",
    body: "The job is to find the moment that keeps costing someone money or time, not a market gap. Innovatr's site looked fine and converted badly. We rebuilt it around what buyers actually needed to know.",
    artefact: <RedesignArtefact />,
  },
  {
    stage: "Build",
    title: "The product and its brand are one build.",
    body: "Software people can use, with a name and a face they remember. Wordmarks, packaging, print, and photography made as one system, so the thing still looks like itself on a Tuesday afternoon post.",
    artefact: <IdentityArtefact />,
  },
  {
    stage: "Grow",
    title: "A product nobody finds solves nothing.",
    body: "Building it is half the work. Marketing and analytics decide whether the right people ever find it, and tell you what to fix next. Two clients, two very different goals.",
    artefact: <KnownArtefact />,
  },
];

export default function WhyChapter() {
  return (
    <Section tone="canvas" id="why">
      <ChapterMark index={1} total={4} />

      <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-6">
          <SectionHeading
            align="left"
            eyebrow="Why we build"
            title="The problem you've learned to live with."
            subtitle="Every business has one: a process held together with copy-paste, or an idea stuck in the notes app. Good ideas rarely die from bad code. They die in the handoffs between agencies."
          />
        </div>

        <div className="lg:col-span-6">
          <SiteVideoArtefact
            src={lumiskinVideo.src}
            poster={lumiskinVideo.poster}
            caption={lumiskinVideo.caption}
          />
        </div>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
        {BELIEFS.map((belief, i) => (
          <div key={belief.title} className="flex flex-col">
            <div className="flex items-center gap-3">
              <ChapterMark index={i + 1} />
              <span className="text-[0.8125rem] uppercase tracking-[0.14em] text-accent-deep">
                {belief.stage}
              </span>
            </div>
            <h3 className="mt-4 text-balance text-[1.25rem] font-medium leading-snug tracking-[-0.015em] text-ink">
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
      <div className="mt-12 border-t border-border pt-8">
        <TestimonialQuote
          testimonial={testimonials[0]}
          size="lg"
          className="max-w-3xl"
        />
      </div>
    </Section>
  );
}
