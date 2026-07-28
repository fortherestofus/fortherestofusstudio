/**
 * AppsSection — "Built by us". The studio's own products, presented as a card
 * grid inside a sunken well (the feature-grid treatment in the reference).
 */
import { apps } from "@/lib/apps";
import Section, { SectionHeading } from "@/components/ui/Section";
import { Well } from "@/components/ui/Card";
import AppCard from "@/components/ui/AppCard";
import PillButton from "@/components/ui/PillButton";

export default function AppsSection() {
  return (
    <Section id="apps" tone="canvas">
      <SectionHeading
        eyebrow="Built by us"
        title={
          <>
            An ecosystem of solutions
            <br />
            that support each other.
          </>
        }
        subtitle="Every product here started as a problem we had ourselves. They are how we learn what works, and they are the proof behind the work we do for other people."
      />

      <Well className="mt-12 sm:mt-14">
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
          {apps.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </Well>

      <div className="mt-10 flex justify-center">
        <PillButton href="/apps" variant="ghost" withArrow={false}>
          Explore all apps
        </PillButton>
      </div>
    </Section>
  );
}
