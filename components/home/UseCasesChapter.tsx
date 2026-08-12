/**
 * UseCasesChapter — chapter 03. The apps as proof of the why, problem-first
 * and screenshot-led: real product UI carries the card, the app's accent
 * appears only as the hairline. White cards — the colored-block treatment
 * belongs to the services chapter, so the two read as different territories.
 */
import Image from "next/image";
import Link from "next/link";
import Section, { SectionHeading } from "@/components/ui/Section";
import ChapterMark from "@/components/ui/ChapterMark";
import AppIcon from "@/components/ui/AppIcon";
import Badge from "@/components/ui/Badge";
import PillButton from "@/components/ui/PillButton";
import { apps } from "@/lib/apps";

export default function UseCasesChapter() {
  return (
    <Section tone="sunken" id="use-cases">
      <ChapterMark index={3} total={3} />
      <SectionHeading
        align="left"
        className="mt-4"
        eyebrow="Built by us"
        title="Problems we couldn't leave alone."
        subtitle="Every product here started as a real moment in our own lives. We built the answer, gave it a face, and are growing it — the same lifecycle we run for clients."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
        {apps.map((app) => {
          const shot = app.screenshots[0];
          return (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}/`}
              className="group relative flex flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 z-10 h-[3px]"
                style={{ backgroundColor: app.accentColor }}
              />

              {/* The product leads */}
              <div className="relative h-[210px] overflow-hidden border-b border-border bg-sunken sm:h-[240px]">
                <Image
                  src={shot}
                  alt={`${app.name} screen`}
                  fill
                  sizes="(max-width: 640px) 92vw, 580px"
                  className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-pretty text-[1.25rem] font-medium leading-snug tracking-[-0.015em] text-ink sm:text-[1.375rem]">
                  “{app.problem}”
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <AppIcon
                    icon={app.icon}
                    color={app.accentColor}
                    label={app.name}
                    size={36}
                    className="rounded-[10px]"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.9375rem] font-medium text-ink">
                      {app.name}
                    </p>
                    <p className="truncate text-[0.8125rem] text-muted">
                      {app.tagline}
                    </p>
                  </div>
                  <Badge variant="status" status={app.status}>
                    {app.status}
                  </Badge>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-center gap-6 text-center">
        <p className="max-w-[52ch] text-pretty leading-relaxed text-muted">
          Your business has a moment like these too — the services above are
          how we take it on.
        </p>
        <PillButton href="/apps/" variant="ghost" withArrow={false}>
          Explore all apps
        </PillButton>
      </div>
    </Section>
  );
}
