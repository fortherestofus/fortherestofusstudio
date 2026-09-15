/**
 * /apps/tapa/r/<code>/ — a recipe shared from the tapa. app.
 *
 * Phones WITH tapa. installed never reach this: the verified Universal Link
 * (app/.well-known/apple-app-site-association) or App Link
 * (public/.well-known/assetlinks.json) opens the app first. It is reached from
 * desktops, phones without the app, link-preview crawlers, and in-app browsers
 * that keep https links to themselves (hence the Android intent button).
 *
 * Never indexed: a share is one person's recipe sent to another, not content
 * for search. That is a robots meta tag, deliberately NOT a robots.txt
 * disallow: Twitterbot and other preview crawlers honour robots.txt and would
 * stop rendering the card at all.
 *
 * The og:image comes from ./opengraph-image.tsx (file-based metadata wins over
 * generateMetadata, and twitter:image inherits it).
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getApp } from "@/lib/apps";
import { getTapaShare, isShareCode, recipeMetaLine, sharePath } from "@/lib/tapaShare";
import TapaRecipeShare from "@/components/apps/TapaRecipeShare";

const app = getApp("tapa")!;

type Props = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const share = isShareCode(code) ? await getTapaShare(code) : null;

  if (!share) {
    return {
      title: { absolute: `Recipe not found · ${app.name}` },
      robots: { index: false, follow: false },
    };
  }

  const { recipe } = share;
  const title = `${recipe.title} · ${app.name}`;
  const description = recipe.description ?? recipeMetaLine(recipe);
  const path = sharePath(code);

  return {
    // absolute: the root layout's template would append "· For The Rest Of Us".
    title: { absolute: title },
    description: description || undefined,
    alternates: { canonical: path },
    robots: { index: false, follow: false },
    openGraph: {
      type: "article",
      url: path,
      title,
      description: description || undefined,
      siteName: app.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || undefined,
    },
  };
}

export default async function TapaSharedRecipePage({ params }: Props) {
  const { code } = await params;
  if (!isShareCode(code)) notFound();

  const share = await getTapaShare(code);
  if (!share) notFound();

  return <TapaRecipeShare share={share} app={app} />;
}
