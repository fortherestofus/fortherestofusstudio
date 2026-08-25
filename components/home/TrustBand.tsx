/**
 * TrustBand — the slim strip of social proof before the closing ask, which
 * research keeps confirming is the highest-leverage spot for it: proof
 * belongs next to the decision, not mid-story. Two real quotes, then the
 * engagements as the sitewide name rail. The numbers and the founder story
 * deliberately live elsewhere (service pages and /studio) — the homepage
 * points at depth instead of carrying it.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
import TestimonialQuote from "@/components/ui/TestimonialQuote";
import ClientMarquee from "@/components/services/ClientMarquee";
import { testimonials } from "@/lib/testimonials";

export default function TrustBand() {
  return (
    <Section tone="canvas" size="sm">
      <div className="border-y border-border py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:gap-14">
          <TestimonialQuote testimonial={testimonials[1]} />
          <TestimonialQuote testimonial={testimonials[2]} />
        </div>

        <div className="mt-12">
          <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
            Work delivered for
          </h2>
          <ClientMarquee className="mt-5" />
        </div>

        <div className="mt-9 flex flex-wrap gap-x-8 gap-y-2.5">
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
    </Section>
  );
}
