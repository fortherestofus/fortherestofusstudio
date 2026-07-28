/**
 * StudioBand — founder-forward trust block. For a studio without client logos,
 * a real name, a real place, and honest numbers do the work instead.
 */
import { apps } from "@/lib/apps";
import Section from "@/components/ui/Section";
import EyebrowChip from "@/components/ui/EyebrowChip";
import PillButton from "@/components/ui/PillButton";
import PlaceholderBlock from "@/components/ui/PlaceholderBlock";

const STATS = [
  { value: String(apps.length), label: "products of our own" },
  { value: "4", label: "fields of practice" },
  { value: "1", label: "studio, Johannesburg" },
];

export default function StudioBand() {
  return (
    <Section id="studio" tone="sunken">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <EyebrowChip>The studio</EyebrowChip>

          <h2 className="mt-6 text-balance text-[2rem] font-medium leading-[1.1] tracking-[-0.02em] sm:text-[2.75rem]">
            <span className="text-ink">Run by one person</span>{" "}
            <span className="text-muted">
              who does the work, not a sales team who passes it on.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted">
            For The Rest Of Us is Alroy Ndhlovu — a builder and product
            consultant in Johannesburg. The studio exists because good software
            is still built mostly for people who already understand software.
            We would rather build for everyone else, and help other teams do the
            same.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="nums block text-[2rem] font-medium leading-none tracking-[-0.02em] text-ink sm:text-[2.5rem]">
                    {stat.value}
                  </span>
                  <span className="mt-2 block text-[0.8125rem] leading-snug text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <PillButton href="/studio" variant="ghost" withArrow={false}>
              More about the studio
            </PillButton>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-well border border-border bg-surface p-4 shadow-card">
            <PlaceholderBlock
              ratio="portrait"
              label="Studio portrait"
              className="rounded-xl"
            />
            <div className="flex items-center justify-between px-1 pb-1 pt-4">
              <div>
                <p className="font-medium text-ink">Alroy Ndhlovu</p>
                <p className="text-[0.8125rem] text-muted">
                  Founder, builder, product consultant
                </p>
              </div>
              <span className="font-mono text-[0.75rem] text-faint">ZA</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
