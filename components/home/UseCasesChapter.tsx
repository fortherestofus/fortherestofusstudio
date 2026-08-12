/**
 * UseCasesChapter — chapter 02. The apps presented problem-first, never as
 * portfolio: each card leads with the moment the product answers, in the
 * reference's numbered tinted-card geometry. Tints are the apps' own accents
 * (the only place colour enters the canvas), and each card's artefact is a
 * real screenshot bleeding off the card's bottom edge.
 */
import Image from "next/image";
import Link from "next/link";
import Section, { SectionHeading } from "@/components/ui/Section";
import ChapterMark from "@/components/ui/ChapterMark";
import AppIcon from "@/components/ui/AppIcon";
import Badge from "@/components/ui/Badge";
import PillButton from "@/components/ui/PillButton";
import { apps } from "@/lib/apps";
import { cn } from "@/lib/cn";

/** Tint classes per app — keyed by slug so the mapping is explicit. */
const TINTS: Record<string, { card: string; deep: string }> = {
  "caught-slipping": { card: "bg-tint-amber", deep: "text-tint-amber-deep" },
  inspiritintruth: { card: "bg-tint-olive", deep: "text-tint-olive-deep" },
  tapa: { card: "bg-tint-rust", deep: "text-tint-rust-deep" },
  hakkan: { card: "bg-tint-lime", deep: "text-tint-lime-deep" },
};

export default function UseCasesChapter() {
  return (
    <Section tone="sunken" id="use-cases">
      <ChapterMark index={2} total={5} />
      <SectionHeading
        align="left"
        className="mt-4"
        eyebrow="Built by us"
        title="Problems we couldn't leave alone."
        subtitle="Every product here started as a real moment in our own lives. We built the answer, gave it a face, and are growing it — the same lifecycle we run for clients."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {apps.map((app, i) => {
          const tint = TINTS[app.slug] ?? TINTS.tapa;
          const shot = app.screenshots[0];
          return (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}/`}
              className={cn(
                "group flex flex-col overflow-hidden rounded-card border border-border",
                "transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                tint.card
              )}
            >
              <div className="flex flex-1 flex-col px-6 pt-6 sm:px-7 sm:pt-7">
                <div className={cn("flex items-center justify-between", tint.deep)}>
                  <ChapterMark index={i + 1} tone="onTint" />
                  <Badge variant="status" status={app.status}>
                    {app.status}
                  </Badge>
                </div>

                <p
                  className={cn(
                    "mt-5 max-w-[20ch] text-balance text-[1.375rem] font-medium leading-snug tracking-[-0.015em] sm:text-[1.625rem]",
                    tint.deep
                  )}
                >
                  {app.problem}
                </p>

                <div className="mt-6 flex items-center gap-3 pb-6">
                  <AppIcon
                    icon={app.icon}
                    color={app.accentColor}
                    label={app.name}
                    size={40}
                    className="rounded-xl"
                  />
                  <div className="min-w-0">
                    <p className="text-[0.9375rem] font-medium text-ink">
                      {app.name}
                    </p>
                    <p className="truncate text-[0.8125rem] text-muted">
                      {app.tagline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Real screenshot, bleeding off the card's bottom edge */}
              <div className="relative ml-6 h-[150px] overflow-hidden rounded-tl-[12px] border-l border-t border-border bg-surface sm:ml-7 sm:h-[170px]">
                <Image
                  src={shot}
                  alt={`${app.name} screen`}
                  fill
                  sizes="(max-width: 640px) 92vw, 560px"
                  className="object-cover object-left-top"
                />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-center gap-6 text-center">
        <p className="max-w-[52ch] text-pretty leading-relaxed text-muted">
          Your business has a moment like these too. The next chapter is what
          we do about yours.
        </p>
        <PillButton href="/apps/" variant="ghost" withArrow={false}>
          Explore all apps
        </PillButton>
      </div>
    </Section>
  );
}
