/**
 * TrustBand — a slim, unnumbered strip of social proof before the closing
 * ask: two real quotes and the named engagements. The numbers and the
 * founder story deliberately live elsewhere (service pages and /studio) —
 * the homepage points at depth instead of carrying it.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import TestimonialQuote from "@/components/ui/TestimonialQuote";
import { testimonials, clients } from "@/lib/testimonials";

export default function TrustBand() {
  return (
    <Section tone="canvas" size="sm">
      <div className="grid gap-10 border-y border-border py-12 lg:grid-cols-12 lg:gap-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
          <TestimonialQuote testimonial={testimonials[1]} />
          <TestimonialQuote testimonial={testimonials[2]} />
        </div>

        <div className="lg:col-span-4">
          <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
            Work delivered for
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {clients.map((client) => (
              <li
                key={client}
                className="text-[0.9375rem] font-medium text-muted"
              >
                {client}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-2.5">
            <Link
              href="/services/"
              className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink"
            >
              See the client results
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/studio/"
              className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink"
            >
              About the studio
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
