import type { MetadataRoute } from "next";
import { apps } from "@/lib/apps";
import { services } from "@/lib/services";

const BASE = "https://fortherestofus.app";

/**
 * The site is served with trailingSlash: true, so every URL here ends in a
 * slash to match the canonical tags and avoid duplicate-URL signals.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/apps/", priority: 0.9 },
    { path: "/services/", priority: 0.9 },
    { path: "/studio/", priority: 0.7 },
    { path: "/contact/", priority: 0.7 },
  ];

  const appRoutes = apps.map((app) => ({
    path: `/apps/${app.slug}/`,
    priority: 0.8,
  }));

  const serviceRoutes = services.map((service) => ({
    path: `/services/${service.slug}/`,
    priority: 0.8,
  }));

  // Support, deletion, legal and giving pages hosted here (external ones are skipped).
  const supportingRoutes = apps.flatMap((app) => {
    const routes: { path: string; priority: number }[] = [];
    if (app.support) {
      routes.push({ path: app.support, priority: 0.5 });
    }
    if (app.deleteAccount) {
      routes.push({ path: app.deleteAccount, priority: 0.5 });
    }
    if (app.giving) {
      const giving = app.giving.endsWith("/") ? app.giving : `${app.giving}/`;
      routes.push({ path: giving, priority: 0.5 });
      routes.push({ path: `${giving}faq/`, priority: 0.4 });
    }
    if (app.legal && !app.legal.external) {
      routes.push({ path: app.legal.privacy, priority: 0.3 });
      routes.push({ path: app.legal.terms, priority: 0.3 });
    }
    return routes;
  });

  const lastModified = new Date();

  return [
    ...staticRoutes,
    ...appRoutes,
    ...serviceRoutes,
    ...supportingRoutes,
  ].map((route) => ({
    url: `${BASE}${route.path}`,
    lastModified,
    priority: route.priority,
  }));
}
