import type { Metadata } from "next";
import { getApp } from "@/lib/apps";
import AppDetail from "@/components/apps/AppDetail";

const app = getApp("tapa")!;

export const metadata: Metadata = {
  title: { absolute: app.seo.title },
  description: app.seo.description,
};

export default function TapaPage() {
  return <AppDetail app={app} />;
}
