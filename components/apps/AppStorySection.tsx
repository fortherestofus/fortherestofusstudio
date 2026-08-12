/**
 * AppStorySection — one alternating editorial band on an app page.
 *
 * Deliberately un-carded: text column beside a large screenshot that bleeds
 * past the outer edge of the container. The image slot is sized for a real
 * designed screenshot and falls back to a labelled placeholder until one
 * exists, so dropping the real asset in later shifts nothing.
 */
import Image from "next/image";
import type { App } from "@/lib/apps";
import { cn } from "@/lib/cn";
import ChapterMark from "@/components/ui/ChapterMark";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";

type Story = NonNullable<App["story"]>[number];

interface AppStorySectionProps {
  story: Story;
  app: App;
  /** Odd sections flip so the page alternates left/right. */
  flipped?: boolean;
  index: number;
}

/**
 * Width caps per frame shape. Height is never set: the screenshot is a
 * static import carrying its intrinsic dimensions, so the frame takes the
 * image's own aspect ratio exactly — nothing is cropped away and no
 * letterbox ever shows. Hardcoding one ratio per shape was how a 3:4
 * extension popup ended up losing a third of itself to a 16:10 frame.
 */
const SHAPE_WIDTH = {
  phone: "mx-auto w-full max-w-[300px]",
  panel: "mx-auto w-full max-w-[380px]",
  browser: "w-full",
} as const;

export default function AppStorySection({
  story,
  app,
  flipped = false,
  index,
}: AppStorySectionProps) {
  const shape = story.shape ?? "browser";
  const isPhone = shape === "phone";

  return (
    <section className="overflow-hidden py-14 sm:py-20">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div className={cn(flipped && "lg:order-2")}>
            <span className="flex items-center gap-3">
              <ChapterMark index={index + 1} />
              <span className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
                {story.eyebrow}
              </span>
            </span>
            {/* Scales up at lg so the text column holds its own beside a
                full-height phone rather than stranding whitespace. */}
            <h2 className="mt-4 text-balance text-[1.75rem] font-medium leading-[1.12] tracking-[-0.025em] text-ink sm:text-[2.25rem] lg:text-[2.75rem]">
              {story.title}
            </h2>
            <p className="mt-5 max-w-[52ch] text-pretty leading-relaxed text-muted sm:text-lg lg:text-xl">
              {story.body}
            </p>
          </div>

          {/* Image — bleeds toward the outer edge */}
          <div
            className={cn(
              "relative",
              flipped ? "lg:order-1 lg:-ml-24" : "lg:-mr-24"
            )}
          >
            {story.image ? (
              <div
                className={cn(
                  "overflow-hidden rounded-well border border-border bg-surface",
                  SHAPE_WIDTH[shape]
                )}
              >
                <Image
                  src={story.image}
                  alt={`${app.name} — ${story.title}`}
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="h-auto w-full"
                  priority={index === 0}
                />
              </div>
            ) : (
              <PlaceholderBlock
                ratio={isPhone ? "phone" : "browser"}
                tint={app.accentColor}
                label={`${app.name} screenshot`}
                className={cn(
                  "rounded-well",
                  isPhone && "mx-auto max-w-[300px]"
                )}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
