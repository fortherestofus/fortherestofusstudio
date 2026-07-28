import type { Metadata } from "next";
import { apps } from "@/lib/apps";
import PageHero from "@/components/layout/PageHero";
import Section from "@/components/ui/Section";
import { Well } from "@/components/ui/Card";
import AppCard from "@/components/ui/AppCard";
import CallToAction from "@/components/home/CallToAction";

const DESCRIPTION =
  "The products For The Rest Of Us designs and builds for itself — CaughtSlipping, InSpiritInTruth, tapa., and Hakkan. Each one started as a problem we had ourselves.";

export const metadata: Metadata = {
  title: "Apps",
  description: DESCRIPTION,
  alternates: { canonical: "/apps/" },
  openGraph: {
    title: "Apps — For The Rest Of Us",
    description: DESCRIPTION,
    url: "https://fortherestofus.app/apps/",
    type: "website",
  },
};

export default function AppsIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Built by us"
        title="Our own products."
        titleMuted="Built the way we would build yours."
        lead="We keep a small shelf of products of our own. They are where we test ideas, learn what actually holds up in people's hands, and stay honest about how long good work takes. They are also the clearest proof of what this studio can do."
      />

      <Section tone="canvas" size="sm">
        <Well>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {apps.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        </Well>
      </Section>

      <CallToAction
        eyebrow="Your turn"
        title="Want something like this for your idea?"
        body="We take on a small number of client projects at a time. If you have something you want built properly, tell us about it."
        primaryLabel="Start a project"
        primaryHref="/contact"
        secondaryLabel="See our services"
        secondaryHref="/services"
      />
    </>
  );
}
