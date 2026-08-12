/**
 * TestimonialQuote — a single real quote, rendered inline next to the claim
 * it verifies (research: distributed testimonials outperform a quote wall).
 * "lg" is the promoted treatment; "sm" is the quiet rail version.
 */
import type { Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/cn";

interface TestimonialQuoteProps {
  testimonial: Testimonial;
  size?: "sm" | "lg";
  className?: string;
}

export default function TestimonialQuote({
  testimonial,
  size = "sm",
  className,
}: TestimonialQuoteProps) {
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
      <figcaption className="flex items-center gap-3">
        <span
          aria-hidden
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[0.6875rem] font-medium text-bg"
        >
          {testimonial.initials}
        </span>
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
