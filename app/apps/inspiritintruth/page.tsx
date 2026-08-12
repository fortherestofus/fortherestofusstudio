import type { Metadata } from "next";
import { getApp } from "@/lib/apps";
import AppDetail from "@/components/apps/AppDetail";
import AppJsonLd from "@/components/apps/AppJsonLd";

const app = getApp("inspiritintruth")!;

export const metadata: Metadata = {
  title: { absolute: app.seo.title },
  description: app.seo.description,
  alternates: { canonical: `/apps/${app.slug}/` },
  openGraph: {
    title: app.seo.title,
    description: app.seo.description,
    url: `/apps/${app.slug}/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: app.seo.title,
    description: app.seo.description,
  },
};

export default function InSpiritInTruthPage() {
  return (
    <>
      <AppJsonLd
        app={app}
        schemaType="MobileApplication"
        applicationCategory="LifestyleApplication"
        operatingSystem="iOS, Android"
      />
      <AppDetail app={app} />
    </>
  );
}
