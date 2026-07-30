/**
 * Hero — headline and CTAs beside a moving collage of what the studio does
 * (the SMS Portal pattern, built our way — see HeroCollage).
 *
 * The collage tiles are real artefacts (an app screen, the Hakkan window, an
 * app mark) plus two small animated service tiles. Screenshot slots fall back
 * to placeholders until designed images land, so assets drop in without
 * layout shift. Client names below the CTAs are real engagements, shown as
 * text — a logo is a trademark.
 */
import { clients } from "@/lib/testimonials";
import PillButton from "@/components/ui/PillButton";
import EyebrowChip from "@/components/ui/EyebrowChip";
import HeroCollage from "@/components/home/HeroCollage";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-32 sm:pt-36 lg:pt-40">
      <div className="relative mx-auto w-full max-w-content px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-14">
          {/* Copy */}
          <div className="lg:col-span-6">
            <EyebrowChip>Solutions studio · Johannesburg</EyebrowChip>

            <h1 className="mt-7 text-balance text-[2.5rem] font-medium leading-[1.03] tracking-[-0.035em] sm:text-[3.5rem] lg:text-[4rem]">
              <span className="block text-ink">We build apps for</span>
              <span className="block text-ink">the rest of us.</span>
              <span className="block text-muted">And help you ship yours.</span>
            </h1>

            <p className="mt-7 max-w-[46ch] text-pretty leading-relaxed text-muted sm:text-lg">
              Apps, SaaS, and websites — for our clients and for our own ideas.
              Plus the product, marketing, and automation thinking that decides
              whether any of it works.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PillButton href="/contact" size="lg">
                Start a project
              </PillButton>
              <PillButton
                href="/apps"
                variant="ghost"
                size="lg"
                withArrow={false}
              >
                See our apps
              </PillButton>
            </div>

            {/* Named work, not a trust badge. */}
            <div className="mt-12 border-t border-border pt-8">
              <h2 className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
                Featured engagements
              </h2>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {clients.slice(0, 4).map((client) => (
                  <li
                    key={client}
                    className="text-[0.9375rem] font-medium text-muted"
                  >
                    {client}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The collage */}
          <div className="lg:col-span-6">
            <HeroCollage />
          </div>
        </div>
      </div>
    </section>
  );
}
