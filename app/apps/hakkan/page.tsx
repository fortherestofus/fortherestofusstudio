import type { Metadata } from "next";
import { getApp } from "@/lib/apps";
import AppDetail from "@/components/apps/AppDetail";
import AppJsonLd from "@/components/apps/AppJsonLd";

const app = getApp("hakkan")!;

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

export default function HakkanPage() {
  return (
    <>
      <AppJsonLd
        app={app}
        schemaType="WebApplication"
        applicationCategory="BusinessApplication"
        operatingSystem="Web"
      />
      <AppDetail app={app} />
    </>
  );
}
