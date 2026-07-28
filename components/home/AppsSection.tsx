/**
 * AppsSection — "Built by us". The studio's own products.
 *
 * This is the only place the apps appear on the home page; the old marquee
 * strip was saying the same thing twice. Each card carries a screenshot slot
 * so it does the proving the marquee was only gesturing at.
 */
import { apps } from "@/lib/apps";
import Section, { SectionHeading } from "@/components/ui/Section";
import AppCard from "@/components/ui/AppCard";
import PillButton from "@/components/ui/PillButton";

export default function AppsSection() {
  return (
    <Section id="apps" tone="sunken">
      <SectionHeading
        eyebrow="Built by us"
        title={
          <>
            An ecosystem of solutions
            <br />
            that support each other.
          </>
        }
        subtitle="Every product here started as a problem we had ourselves. They are how we learn what actually holds up in people's hands — and the proof behind the work we do for everyone else."
      />

      <div className="mt-12 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
        {apps.map((app) => (
          <AppCard key={app.slug} app={app} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <PillButton href="/apps" variant="ghost" withArrow={false}>
          Explore all apps
        </PillButton>
      </div>
    </Section>
  );
}
