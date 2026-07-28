/**
 * StudioBand — founder-forward trust block.
 *
 * No stat cards: for a one-person studio the credible signals are a real name,
 * a real place, real clients, and ten years of work. Numbers like "4 products"
 * read as padding next to those.
 */
import { clients } from "@/lib/testimonials";
import Section from "@/components/ui/Section";
import EyebrowChip from "@/components/ui/EyebrowChip";
import PillButton from "@/components/ui/PillButton";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";

export default function StudioBand() {
  return (
    <Section id="studio" tone="canvas">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <PlaceholderBlock
            ratio="portrait"
            label="Portrait — to be supplied"
            className="rounded-well"
          />
        </div>

        <div className="lg:col-span-7">
          <EyebrowChip>The studio</EyebrowChip>

          <h2 className="mt-6 text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[2.75rem]">
            <span className="text-ink">One person,</span>{" "}
            <span className="text-muted">
              ten years, and every side of the product.
            </span>
          </h2>

          <p className="mt-6 max-w-[52ch] text-pretty leading-relaxed text-muted">
            For The Rest Of Us is run by Alroy Ndhlovu — a digital marketing,
            branding, and business technology consultant who got tired of
            handing projects between four agencies and learned to build them
            instead. Campaigns, identity, content, code, launch. One person to
            brief.
          </p>

          <div className="mt-10 border-t border-border pt-8">
            <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-faint">
              Work delivered for
            </h3>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2.5">
              {clients.map((client) => (
                <li
                  key={client}
                  className="text-[0.9375rem] font-medium text-muted"
                >
                  {client}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-9">
            <PillButton href="/studio" variant="ghost" withArrow={false}>
              More about the studio
            </PillButton>
          </div>
        </div>
      </div>
    </Section>
  );
}
