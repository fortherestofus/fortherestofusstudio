/**
 * Hero — the promise. Descriptive first (a visitor who reads only the H1
 * knows what we sell), with the lifecycle compressed into the muted line.
 * One floating artefact beside it (see HeroArtefact); the proof line under
 * the CTAs is real studio numbers, and the client names are real engagements
 * shown as text: a logo strip reads as endorsement, where a list reads as
 * a record. (Organisation logos do appear beside testimonials, where the
 * person actually spoke — see components/ui/TestimonialQuote.tsx.)
 */
import { clients } from "@/lib/testimonials";
import PillButton from "@/components/ui/PillButton";
import EyebrowChip from "@/components/ui/EyebrowChip";
import HeroArtefact from "@/components/home/HeroArtefact";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-32 sm:pt-36 lg:pt-40">
      <div className="relative mx-auto w-full max-w-content px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="grid items-center gap-20 lg:grid-cols-12 lg:gap-14">
          {/* Copy */}
          <div className="lg:col-span-6">
            <EyebrowChip>Solutions &amp; consulting studio · Johannesburg</EyebrowChip>

            <h1 className="mt-7 text-balance text-[2.5rem] font-medium leading-[1.03] tracking-[-0.035em] sm:text-[3.5rem] lg:text-[4rem]">
              <span className="block text-ink">Products that solve</span>
              <span className="block text-ink">real problems.</span>
              <span className="block text-muted">Built. Branded. Grown.</span>
            </h1>

            <p className="mt-7 max-w-[46ch] text-pretty leading-relaxed text-muted sm:text-lg">
              We build apps, SaaS, and websites — for clients and for our own
              ideas — then give them an identity and the marketing to be
              found. One studio, every side of the product.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PillButton href="/contact/" size="lg">
                Start a project
              </PillButton>
              <PillButton
                href="/apps/"
                variant="ghost"
                size="lg"
                withArrow={false}
              >
                See the apps
              </PillButton>
            </div>

            {/* Real numbers, not a trust badge. */}
            <p className="nums mt-6 text-[0.9375rem] text-muted">
              12+ years · 1,200+ projects and clients served
            </p>

            {/* Named work. */}
            <div className="mt-10 border-t border-border pt-8">
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

          {/* The artefact */}
          <div className="lg:col-span-6">
            <HeroArtefact />
          </div>
        </div>
      </div>
    </section>
  );
}
