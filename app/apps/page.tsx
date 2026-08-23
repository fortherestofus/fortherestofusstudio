import type { Metadata } from "next";
import { apps } from "@/lib/apps";
import PageHero from "@/components/layout/PageHero";
import AppBand from "@/components/apps/AppBand";
import CallToAction from "@/components/home/CallToAction";

const DESCRIPTION =
  "The products For The Rest Of Us designs and builds for itself: CaughtSlipping, InSpiritInTruth, tapa., and Hakkan. Each one started as a problem we had ourselves.";

export const metadata: Metadata = {
  title: "Apps",
  description: DESCRIPTION,
  alternates: { canonical: "/apps/" },
  openGraph: {
    title: "Apps · For The Rest Of Us",
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
        lead="We keep a small shelf of products of our own. They are where we test ideas and learn what holds up in people's hands, and they are the clearest proof of what we can do."
      />

      {/*
        Four editorial bands, not a card grid. Each one leads with the problem
        and shows the actual product — the page's whole subject was previously
        represented by four icons on a tray. Alternating tone and side gives
        the scroll a rhythm; the accent wash behind each frame is the app's
        own, so four bands read as four products.
      */}
      {apps.map((app, i) => (
        <AppBand
          key={app.slug}
          app={app}
          index={i}
          total={apps.length}
          flipped={i % 2 === 1}
        />
      ))}

      <CallToAction
        eyebrow="Your turn"
        title="Want something like this for your idea?"
        body="We take on a small number of client projects at a time. If you have something you want built properly, tell us about it."
        primaryLabel="Start a project"
        primaryHref="/contact/"
        secondaryLabel="See our services"
        secondaryHref="/services/"
      />
    </>
  );
}
