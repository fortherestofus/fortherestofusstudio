import type { Metadata } from "next";
import { getApp } from "@/lib/apps";
import AppDetail from "@/components/apps/AppDetail";

const app = getApp("inspiritintruth")!;

export const metadata: Metadata = {
  title: { absolute: app.seo.title },
  description: app.seo.description,
};

export default function InSpiritInTruthPage() {
  return <AppDetail app={app} />;
}
