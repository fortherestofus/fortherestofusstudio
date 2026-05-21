import type { Metadata } from "next";
import { getApp } from "@/lib/apps";
import AppDetail from "@/components/apps/AppDetail";

const app = getApp("recipeai")!;

export const metadata: Metadata = {
  title: {
    absolute: "RecipeAI — What can I cook with this?",
  },
  description:
    "Enter your ingredients. Get a real recipe. No stories, no subscriptions.",
};

export default function RecipeAIPage() {
  return <AppDetail app={app} />;
}
