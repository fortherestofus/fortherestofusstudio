/**
 * ServicesChapter — chapter 02, the centrepiece. The services/consulting arm
 * as four big colored blocks (the reference's feature grid): one
 * full-saturation ember block, two strong washes, one ink block. Each block
 * carries a real artefact — products we shipped, identity work we made,
 * campaign work we ran — and opens into the service page, where the case
 * study lives. Never "advice".
 */
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section, { SectionHeading } from "@/components/ui/Section";
import ChapterMark from "@/components/ui/ChapterMark";
import PillButton from "@/components/ui/PillButton";
import ArtefactRotator from "@/components/home/ArtefactRotator";
import KpiRotator from "@/components/home/KpiRotator";
import { LIFECYCLE_CHAPTERS, getService } from "@/lib/services";
import { getApp } from "@/lib/apps";
import { automationWork, identityWork, marketingWork } from "@/lib/work";
import { cn } from "@/lib/cn";

/**
 * Block treatments. "identify" commits to the brand ember at full
 * saturation (the reference's orange card), which puts the first step of
 * the process in front; "build" takes the amber wash; "grow" is the ink
 * block.
 */
const BLOCKS: Record<
  string,
  { card: string; mark: string; title: string; body: string; link: string }
> = {
  identify: {
    card: "bg-accent border-transparent",
    mark: "text-accent-ink opacity-70",
    title: "text-accent-ink",
    body: "text-accent-ink opacity-80",
    link: "text-accent-ink",
  },
  build: {
    card: "bg-tint-amber border-transparent",
    mark: "text-tint-amber-deep opacity-70",
    title: "text-tint-amber-deep",
    body: "text-ink opacity-75",
    link: "text-ink",
  },
  grow: {
    card: "bg-ink-surface border-transparent",
    mark: "text-ink-muted",
    title: "text-ink-text",
    body: "text-ink-muted",
    link: "text-ink-text",
  },
};

/**
 * Products we shipped — the artefact for the build block. Hakkan leads
 * (it is the one that is actually in beta), then CaughtSlipping and tapa.
 */
const BUILD_SHOWCASE = ["hakkan", "caught-slipping", "tapa"];

/** Shared frame treatment for anything sitting in the build row. */
const ARTEFACT_FRAME =
  "h-full w-auto shrink-0 rounded-t-[10px] border border-b-0 border-border object-contain shadow-[0_-8px_24px_rgba(23,21,15,0.12)]";

/**
 * Build's artefact: products first, then the identity work, in one row.
 * Brand is no longer a chapter of its own, so the proof for this block has
 * to show both halves — a shipped product and the identity around it. The
 * row is height-sized and bleeds off the card edge by design, which is what
 * lets a browser window, a handset, and a wordmark share it uncropped.
 */
function BuildArtefact() {
  const products = BUILD_SHOWCASE.slice(0, 2)
    .map((slug) => getApp(slug))
    .filter((app) => app !== undefined);

  return (
    <div className="flex h-full items-end gap-3 overflow-hidden px-5 pt-5">
      {products.map((app) => (
        <Image
          key={app.slug}
          src={app.screenshots[0]}
          alt={`${app.name} screen`}
          sizes="320px"
          className={ARTEFACT_FRAME}
        />
      ))}
      {identityWork.slice(0, 2).map((piece) => (
        <Image
          key={piece.src}
          src={piece.src}
          alt={piece.alt}
          width={piece.width}
          height={piece.height}
          sizes="320px"
          className={ARTEFACT_FRAME}
        />
      ))}
    </div>
  );
}

/**
 * Identify has no artefact to photograph — it is a conversation, and the
 * house rule is real screenshots or nothing. So its card closes on the
 * question the phase actually asks, set large on the ember.
 */
function IdentifyArtefact() {
  return (
    <div className="flex h-full items-end px-6 pb-7 sm:px-7">
      <p className="text-balance text-[1.375rem] font-medium leading-snug tracking-[-0.015em] text-accent-ink opacity-90 sm:text-[1.5rem]">
        “What is actually broken, and is it worth building for?”
      </p>
    </div>
  );
}

/**
 * Grow holds both halves of the pillar — the campaign that gets you found
 * and the automation that keeps it running — so its artefact is a pair,
 * which is also why this block takes the full width of the grid.
 */
function GrowArtefact() {
  const piece = marketingWork[0];
  return (
    <div className="grid gap-5 px-5 pt-5 md:grid-cols-2">
      <div className="relative h-[230px] overflow-hidden rounded-t-[10px] border border-b-0 border-ink-border">
        <Image
          src={piece.src}
          alt={piece.alt}
          fill
          sizes="(max-width: 768px) 92vw, 420px"
          className="object-cover object-top"
        />
        <KpiRotator />
      </div>
      <ArtefactRotator pieces={automationWork} onInk className="px-0 pt-0" />
    </div>
  );
}

const ARTEFACTS: Record<string, React.ReactNode> = {
  identify: <IdentifyArtefact />,
  build: <BuildArtefact />,
  grow: <GrowArtefact />,
};

export default function ServicesChapter() {
  return (
    <Section tone="canvas" id="services">
      <SectionHeading
        align="left"
        chapter={2}
        eyebrow="Services & consulting"
        title="The same process, run for you."
        subtitle="Custom products, brand, data-driven marketing, and automation, from the same hands that ship our own. Each one opens to how it works and what it did for a real client."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {LIFECYCLE_CHAPTERS.map((chapter, i) => {
          const block = BLOCKS[chapter.key];
          const isInk = chapter.key === "grow";
          return (
            <div
              key={chapter.key}
              className={cn(
                "flex flex-col overflow-hidden rounded-card border",
                block.card,
                /* Grow carries two artefacts, so it takes the full row. */
                isInk && "sm:col-span-2"
              )}
            >
              <div className="flex flex-col px-6 pt-6 sm:px-7 sm:pt-7">
                <div className={block.mark}>
                  <ChapterMark index={i + 1} tone={isInk ? "onInk" : "onTint"} />
                </div>

                <h3
                  className={cn(
                    "mt-4 text-balance text-[1.5rem] font-medium leading-snug tracking-[-0.015em] sm:text-[1.75rem]",
                    block.title
                  )}
                >
                  {chapter.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 max-w-[44ch] text-[0.9375rem] leading-relaxed",
                    block.body
                  )}
                >
                  {chapter.blurb}
                </p>

                {/* Identify sells no line items, so its card points at the
                    conversation instead of a service list. */}
                {chapter.serviceSlugs.length === 0 ? (
                  <div className="mb-6 mt-5">
                    <Link
                      href="/contact/"
                      className={cn(
                        "group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium underline-offset-4 hover:underline",
                        block.link
                      )}
                    >
                      Start with the problem
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                ) : (
                <ul className="mb-6 mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {chapter.serviceSlugs.map((slug) => {
                    const service = getService(slug);
                    if (!service) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/services/${slug}/`}
                          className={cn(
                            "group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium underline-offset-4 hover:underline",
                            block.link
                          )}
                        >
                          {service.title}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                )}
              </div>

              {/* Real work, bleeding off the block's bottom edge. The
                  rotator sizes itself by width, so it opts out of the
                  fixed height the stacked rows need. */}
              <div
                className={cn(
                  "mt-auto",
                  chapter.key === "grow" ? "" : "h-[200px] sm:h-[230px]"
                )}
              >
                {ARTEFACTS[chapter.key]}
              </div>
            </div>
          );
        })}
      </div>

      {/* The honesty cell */}
      <div className="mt-5 flex flex-col items-start justify-between gap-5 rounded-card border border-border bg-surface p-6 sm:flex-row sm:items-center sm:p-7">
        <div>
          <h3 className="text-lg font-medium tracking-[-0.01em] text-ink">
            Not sure which you need?
          </h3>
          <p className="mt-1.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
            Most projects are a mix. Send the problem and we will come back
            with scope, time, and cost.
          </p>
        </div>
        <PillButton href="/contact/">Start a project</PillButton>
      </div>
    </Section>
  );
}
