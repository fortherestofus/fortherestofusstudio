/**
 * TestimonialQuote — a single real quote, rendered inline next to the claim
 * it verifies (research: distributed testimonials outperform a quote wall).
 *
 * The mark beside the name is the speaker's ORGANISATION, never a portrait.
 * These are real, named, findable professionals and we hold no photographs
 * of them — a generated face (photoreal or illustrated) would invent a real
 * person's appearance. The logo identifies the engagement honestly and adds
 * the colour a monogram cannot. Falls back to the monogram when no logo is
 * on file.
 */
import Image from "next/image";
import type { Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/cn";

interface TestimonialQuoteProps {
  testimonial: Testimonial;
  size?: "sm" | "lg";
  className?: string;
}

/** A quiet tint per person, cycled from the app accents. */
const MONOGRAM_TINTS = [
  "bg-tint-rust text-tint-rust-deep",
  "bg-tint-olive text-tint-olive-deep",
  "bg-tint-amber text-tint-amber-deep",
];

export default function TestimonialQuote({
  testimonial,
  size = "sm",
  className,
}: TestimonialQuoteProps) {
  // Stable per-person tint: derived from the initials, not render order.
  const tint =
    MONOGRAM_TINTS[
      (testimonial.initials.charCodeAt(0) + testimonial.initials.charCodeAt(1)) %
        MONOGRAM_TINTS.length
    ];

  return (
    <figure className={cn("flex flex-col gap-5", className)}>
      <blockquote
        className={cn(
          "text-pretty text-ink",
          size === "lg"
            ? "text-[1.375rem] font-medium leading-snug tracking-[-0.01em] sm:text-[1.75rem]"
            : "text-base leading-relaxed"
        )}
      >
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="flex items-center gap-3.5">
        {testimonial.logo ? (
          <span
            className={cn(
              // The three marks are drawn very differently — a transparent
              // roundel, a full-bleed red square, a gradient square — so they
              // sit inset on a neutral tile rather than flush, which would
              // crop the ones whose artwork runs to the canvas edge.
              "relative shrink-0 overflow-hidden rounded-[12px] border border-border bg-surface p-2",
              size === "lg" ? "h-16 w-16" : "h-14 w-14"
            )}
          >
            <Image
              src={testimonial.logo.src}
              alt={testimonial.logo.alt}
              fill
              sizes="64px"
              className="object-contain"
            />
          </span>
        ) : (
          <span
            aria-hidden
            className={cn(
              "grid shrink-0 place-items-center rounded-[12px] font-medium tracking-[0.02em]",
              size === "lg" ? "h-12 w-12 text-[0.9375rem]" : "h-11 w-11 text-[0.875rem]",
              tint
            )}
          >
            {testimonial.initials}
          </span>
        )}
        <span className="text-sm leading-tight">
          <span className="block font-medium text-ink">{testimonial.name}</span>
          <span className="block text-muted">
            {testimonial.title}, {testimonial.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
