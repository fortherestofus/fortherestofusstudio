import type { Metadata } from "next";
import { getApp } from "@/lib/apps";
import AppDetail from "@/components/apps/AppDetail";

const app = getApp("caught-slipping")!;

export const metadata: Metadata = {
  title: { absolute: app.seo.title },
  description: app.seo.description,
  icons: {
    icon: [
      { url: "/icons/caught-slipping-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/caught-slipping-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/icons/caught-slipping-512.png",
  },
  openGraph: {
    images: [{ url: "/icons/caught-slipping-512.png", width: 512, height: 512 }],
  },
};

export default function CaughtSlippingPage() {
  return <AppDetail app={app} />;
}
