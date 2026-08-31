/**
 * Hero — the promise. Descriptive first (a visitor who reads only the H1
 * knows what we sell), with the lifecycle compressed into the muted line.
 * One floating artefact beside it (see HeroArtefact); the proof line under
 * the CTAs is real studio numbers. The named engagements used to sit here
 * too, but that was the same record twice on one page and it crowded the
 * hero — the full rail now lives once, beside the closing ask (TrustBand).
 */
import PillButton from "@/components/ui/PillButton";
import EyebrowChip from "@/components/ui/EyebrowChip";
import HeroArtefact from "@/components/home/HeroArtefact";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg pt-28 sm:pt-32 lg:pt-36">
      <div className="relative mx-auto w-full max-w-content px-5 pb-16 sm:px-8 sm:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Copy */}
          <div className="lg:col-span-6">
            <EyebrowChip>
              Solutions &amp; product development consultancy · Johannesburg
            </EyebrowChip>

            <h1 className="mt-7 text-balance text-[2.5rem] font-medium leading-[1.03] tracking-[-0.035em] sm:text-[3.5rem] lg:text-[4rem]">
              <span className="text-ink">Products and services that solve</span>{" "}
              <span className="text-muted">real problems.</span>
            </h1>

            <p className="mt-7 max-w-[46ch] text-pretty leading-relaxed text-muted sm:text-lg">
              We identify the problem, build the solution, and grow the
              business around it. Apps, SaaS, websites, systems, brand,
              data-driven marketing, and automation, from one team.
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
