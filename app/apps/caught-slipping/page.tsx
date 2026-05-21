import type { Metadata } from "next";
import { getApp } from "@/lib/apps";
import AppDetail from "@/components/apps/AppDetail";

const app = getApp("caught-slipping")!;

export const metadata: Metadata = {
  title: {
    absolute: "CaughtSlipping — The Chrome extension that calls you out",
  },
  description:
    "Track your social media time and face the truth. Free Chrome extension.",
};

export default function CaughtSlippingPage() {
  return <AppDetail app={app} />;
}
