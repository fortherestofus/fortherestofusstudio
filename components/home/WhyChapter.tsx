/**
 * WhyChapter — chapter 01 of the story. Opens with the client's problem
 * (StoryBrand: the visitor is the hero), then the three convictions that
 * make up the lifecycle — solve it, name it, make it known — each proven
 * by a real artefact from real work. Closes on the first trust marker.
 */
import Section, { SectionHeading } from "@/components/ui/Section";
import EyebrowChip from "@/components/ui/EyebrowChip";
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
    body: "CB Insights puts \"no market need\" at the top of why startups fail. So we start from the moment that costs you money or time. Innovatr's site looked fine and converted badly; we rebuilt it around the buyer.",
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
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-6">
          <SectionHeading
            align="left"
            chapter={1}
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

      {/* One label layer per card: the stage word alone. These used to carry
          their own 01–03 ChapterMarks, which double-numbered the page —
          chapter 01 held a second 01/02/03, and the process chapter numbers
          the same three stages again further down. */}
      <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
        {BELIEFS.map((belief) => (
          <div key={belief.title} className="flex flex-col">
            <EyebrowChip tone="accent">{belief.stage}</EyebrowChip>
            {/* A clear step above the body rather than a whisker above it:
                1.375 to 0.9375 is the size jump that lets the eye find the
                three claims without reading the paragraphs first. */}
            <h3 className="mt-5 text-balance text-[1.375rem] font-medium leading-[1.25] tracking-[-0.015em] text-ink">
              {belief.title}
            </h3>
            <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">
              {belief.body}
            </p>
            <div className="mt-7">{belief.artefact}</div>
          </div>
        ))}
      </div>

      {/* First trust marker */}
      <div className="mt-16 border-t border-border pt-10">
        <TestimonialQuote
          testimonial={testimonials[0]}
          size="lg"
          className="max-w-3xl"
        />
      </div>
    </Section>
  );
}
