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
import { LIFECYCLE_CHAPTERS, getService } from "@/lib/services";
import { apps } from "@/lib/apps";
import { automationStillLife, identityWork, marketingWork } from "@/lib/work";
import { cn } from "@/lib/cn";

/**
 * Block treatments. "build" commits to the brand ember at full saturation
 * (the reference's orange card); the washes are strong tints; "automate"
 * is the ink block.
 */
const BLOCKS: Record<
  string,
  { card: string; mark: string; title: string; body: string; link: string }
> = {
  build: {
    card: "bg-accent border-transparent",
    mark: "text-accent-ink opacity-70",
    title: "text-accent-ink",
    body: "text-accent-ink opacity-80",
    link: "text-accent-ink",
  },
  brand: {
    card: "bg-tint-amber border-transparent",
    mark: "text-tint-amber-deep opacity-70",
    title: "text-tint-amber-deep",
    body: "text-ink opacity-75",
    link: "text-ink",
  },
  grow: {
    card: "bg-tint-olive border-transparent",
    mark: "text-tint-olive-deep opacity-70",
    title: "text-tint-olive-deep",
    body: "text-ink opacity-75",
    link: "text-ink",
  },
  automate: {
    card: "bg-ink-surface border-transparent",
    mark: "text-ink-muted",
    title: "text-ink-text",
    body: "text-ink-muted",
    link: "text-ink-text",
  },
};

/** Products we shipped — the artefact for the build block. */
function ProductsArtefact() {
  return (
    <div className="flex h-full items-end gap-3 px-5 pt-5">
      {apps.slice(0, 3).map((app, i) => (
        <div
          key={app.slug}
          className={cn(
            "relative flex-1 overflow-hidden rounded-t-[10px] border border-b-0 border-border bg-surface shadow-[0_-8px_24px_rgba(23,21,15,0.12)]",
            i === 1 ? "h-full" : "h-[86%]"
          )}
        >
          <Image
            src={app.screenshots[0]}
            alt={`${app.name} screen`}
            fill
            sizes="180px"
            className="object-cover object-left-top"
          />
        </div>
      ))}
    </div>
  );
}

/** Identity work — the artefact for the brand block. */
function IdentityStack() {
  const pieces = identityWork.slice(0, 3);
  return (
    <div className="flex h-full items-end gap-3 px-5 pt-5">
      {pieces.map((piece, i) => (
        <div
          key={piece.src}
          className={cn(
            "relative flex-1 overflow-hidden rounded-t-[10px] border border-b-0 border-border bg-surface shadow-[0_-8px_24px_rgba(23,21,15,0.12)]",
            i === 1 ? "h-full" : "h-[84%]"
          )}
        >
          <Image
            src={piece.src}
            alt={piece.alt}
            fill
            sizes="180px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

/** Campaign work — the artefact for the grow block. */
function CampaignArtefact() {
  const piece = marketingWork[0];
  return (
    <div className="relative h-full px-5 pt-5">
      <div className="relative h-full overflow-hidden rounded-t-[10px] border border-b-0 border-border bg-surface shadow-[0_-8px_24px_rgba(23,21,15,0.12)]">
        <Image
          src={piece.src}
          alt={piece.alt}
          fill
          sizes="(max-width: 640px) 92vw, 560px"
          className="object-cover object-top"
        />
        <div className="absolute bottom-3 left-3 rounded-[10px] bg-ink px-3 py-2 shadow-card">
          <p className="nums text-[1.125rem] font-medium leading-none text-bg">
            742 leads
          </p>
          <p className="mt-1 text-[0.625rem] uppercase tracking-[0.12em] text-bg opacity-70">
            at R29.57 · Thrifty Adventures
          </p>
        </div>
      </div>
    </div>
  );
}

/** The commissioned still life — the artefact for the automation block. */
function AutomationArtefact() {
  return (
    <div className="relative h-full px-5 pt-5">
      <div className="relative h-full overflow-hidden rounded-t-[10px] shadow-[0_-8px_24px_rgba(0,0,0,0.4)]">
        <Image
          src={automationStillLife.src}
          alt={automationStillLife.alt}
          fill
          sizes="(max-width: 640px) 92vw, 560px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

const ARTEFACTS: Record<string, React.ReactNode> = {
  build: <ProductsArtefact />,
  brand: <IdentityStack />,
  grow: <CampaignArtefact />,
  automate: <AutomationArtefact />,
};

export default function ServicesChapter() {
  return (
    <Section tone="canvas" id="services">
      <ChapterMark index={2} total={4} />
      <SectionHeading
        align="left"
        className="mt-4"
        eyebrow="Services & consulting"
        title="The same lifecycle, run for you."
        subtitle="Custom products and solutions, brand and identity, marketing and analytics, automation — run by the same hands that ship our own products. Each one opens to how it works and what it did for a real client."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {LIFECYCLE_CHAPTERS.map((chapter, i) => {
          const block = BLOCKS[chapter.key];
          const isInk = chapter.key === "automate";
          return (
            <div
              key={chapter.key}
              className={cn(
                "flex flex-col overflow-hidden rounded-card border",
                block.card
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
              </div>

              {/* Real work, bleeding off the block's bottom edge */}
              <div className="mt-auto h-[200px] sm:h-[230px]">
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
            Most projects are a mix. Tell us what you are trying to do and we
            will tell you honestly what it takes.
          </p>
        </div>
        <PillButton href="/contact/">Start a project</PillButton>
      </div>
    </Section>
  );
}
