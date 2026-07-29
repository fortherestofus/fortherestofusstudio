/**
 * Hero — headline and CTAs beside the studio's own app marks, presented as
 * objects on the canvas.
 *
 * The icons are real, finished assets, which is the point: no invented UI, no
 * placeholder rectangles standing in for screens that do not exist yet, and no
 * avatar cluster we cannot fill honestly (three testimonials, no photos). The
 * marks are also the only colour on the page, which is exactly what the
 * monotone system asks for.
 *
 * When real screenshots land, the right place for them is the app pages and
 * the app cards — not here.
 */
import Link from "next/link";
import { apps } from "@/lib/apps";
import { clients } from "@/lib/testimonials";
import { cn } from "@/lib/cn";
import PillButton from "@/components/ui/PillButton";
import EyebrowChip from "@/components/ui/EyebrowChip";
import AppIcon from "@/components/ui/AppIcon";
import Badge from "@/components/ui/Badge";

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

            {/* Named work, not a trust badge. "Featured engagements" describes
                what was done rather than claiming an endorsement, and the
                names stay as text — a logo is a trademark. */}
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

          {/* The studio's own marks, as objects */}
          <div className="lg:col-span-6">
            <ul className="mx-auto grid max-w-[440px] grid-cols-2 gap-4 sm:gap-5 lg:ml-auto lg:mr-0">
              {apps.map((app, i) => (
                <li key={app.slug} className={cn(i % 2 === 1 && "lg:mt-10")}>
                  <Link
                    href={`/apps/${app.slug}`}
                    className="group flex flex-col items-start gap-4 rounded-well p-1 transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                  >
                    <span className="drop-shadow-[0_12px_28px_rgba(23,21,15,0.14)] transition-[filter] duration-300 group-hover:drop-shadow-[0_18px_36px_rgba(23,21,15,0.2)]">
                      <AppIcon
                        icon={app.icon}
                        color={app.accentColor}
                        label={app.name}
                        size={92}
                        className="rounded-[22px]"
                      />
                    </span>
                    <span>
                      <span className="block text-[0.9375rem] font-medium text-ink">
                        {app.name}
                      </span>
                      <span className="mt-1.5 block">
                        <Badge variant="status" status={app.status}>
                          {app.status}
                        </Badge>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
