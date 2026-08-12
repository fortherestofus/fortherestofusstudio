/**
 * AppJsonLd — SoftwareApplication structured data for an app page, built
 * from the registry so search engines and AI answer engines describe the
 * app accurately (name, price, platform, publisher). Every app page
 * renders one of these.
 */
import type { App } from "@/lib/apps";

const SITE = "https://fortherestofus.app";

interface AppJsonLdProps {
  app: App;
  /** Schema.org subtype for the app's platform. */
  schemaType: "MobileApplication" | "WebApplication" | "SoftwareApplication";
  applicationCategory: string;
  operatingSystem: string;
  /** Absolute or site-relative image path; defaults to the app icon. */
  image?: string;
}

export default function AppJsonLd({
  app,
  schemaType,
  applicationCategory,
  operatingSystem,
  image,
}: AppJsonLdProps) {
  const img = image ?? app.icon;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: app.name,
    applicationCategory,
    operatingSystem,
    description: app.seo.description,
    url: `${SITE}/apps/${app.slug}/`,
    image: img.startsWith("http") ? img : `${SITE}${img}`,
    // Every app is free to start; paid tiers are described on the page.
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: "For The Rest Of Us",
      url: SITE,
    },
    creator: {
      "@type": "Person",
      name: "Alroy Ndhlovu",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
