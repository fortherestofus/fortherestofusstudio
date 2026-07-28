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
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";

type Story = NonNullable<App["story"]>[number];

interface AppStorySectionProps {
  story: Story;
  app: App;
  /** Odd sections flip so the page alternates left/right. */
  flipped?: boolean;
  index: number;
}

export default function AppStorySection({
  story,
  app,
  flipped = false,
  index,
}: AppStorySectionProps) {
  const isPhone = story.shape === "phone";

  return (
    <section className="overflow-hidden py-14 sm:py-20">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <div className={cn(flipped && "lg:order-2")}>
            <span className="text-[0.8125rem] uppercase tracking-[0.14em] text-faint">
              {story.eyebrow}
            </span>
            <h2 className="mt-4 text-balance text-[1.75rem] font-medium leading-[1.12] tracking-[-0.025em] text-ink sm:text-[2.25rem]">
              {story.title}
            </h2>
            <p className="mt-5 max-w-[46ch] text-pretty leading-relaxed text-muted sm:text-lg">
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
                  "relative overflow-hidden rounded-well border border-border bg-surface",
                  isPhone ? "mx-auto max-w-[300px]" : "w-full"
                )}
                style={{ aspectRatio: isPhone ? "9 / 19.5" : "16 / 10" }}
              >
                <Image
                  src={story.image}
                  alt={`${app.name} — ${story.title}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
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
