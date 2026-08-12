import type { Metadata } from "next";
import { getApp } from "@/lib/apps";
import AppDetail from "@/components/apps/AppDetail";
import AppJsonLd from "@/components/apps/AppJsonLd";

const app = getApp("caught-slipping")!;

export const metadata: Metadata = {
  title: { absolute: app.seo.title },
  description: app.seo.description,
  alternates: { canonical: `/apps/${app.slug}/` },
  icons: {
    icon: [
      { url: "/icons/caught-slipping-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/caught-slipping-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/icons/caught-slipping-512.png",
  },
  openGraph: {
    title: app.seo.title,
    description: app.seo.description,
    url: `/apps/${app.slug}/`,
    type: "website",
    images: [{ url: "/icons/caught-slipping-512.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
    title: app.seo.title,
    description: app.seo.description,
    images: ["/icons/caught-slipping-512.png"],
  },
};

export default function CaughtSlippingPage() {
  return (
    <>
      <AppJsonLd
        app={app}
        schemaType="SoftwareApplication"
        applicationCategory="BrowserApplication"
        operatingSystem="Chrome"
        image="/icons/caught-slipping-512.png"
      />
      <AppDetail app={app} />
    </>
  );
}
