/**
 * PageHero — the standard top block for interior pages: eyebrow, two-tone
 * headline, and an optional lead paragraph. Keeps every page opening on the
 * same rhythm as the home hero without repeating its collage.
 */
import EyebrowChip from "@/components/ui/EyebrowChip";
import { cn } from "@/lib/cn";

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  /** Rendered muted, directly under the title. */
  titleMuted?: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  align?: "left" | "center";
}

export default function PageHero({
  eyebrow,
  title,
  titleMuted,
  lead,
  children,
  align = "left",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-bg pb-12 pt-28 sm:pb-16 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-28 h-[420px] w-[420px] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 26%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-content px-5 sm:px-8">
        <div
          className={cn(
            "flex flex-col",
            align === "center" && "items-center text-center"
          )}
        >
          {eyebrow && <EyebrowChip>{eyebrow}</EyebrowChip>}

          <h1
            className={cn(
              "mt-6 max-w-3xl text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[3rem] lg:text-[3.5rem]",
              align === "center" && "mx-auto"
            )}
          >
            <span className="text-ink">{title}</span>
            {titleMuted && <span className="text-muted"> {titleMuted}</span>}
          </h1>

          {lead && (
            <p
              className={cn(
                "mt-6 max-w-reading text-pretty text-base leading-relaxed text-muted sm:text-lg",
                align === "center" && "mx-auto"
              )}
            >
              {lead}
            </p>
          )}

          {children && <div className="mt-9">{children}</div>}
        </div>
      </div>
    </section>
  );
}
