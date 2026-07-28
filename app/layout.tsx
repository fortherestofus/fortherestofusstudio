/**
 * Root layout — fonts, metadata, and the persistent shell (nav + footer).
 *
 * Typography is Apfel Grotezk sitewide (SIL Open Font License, Collletttivo),
 * self-hosted from /fonts. The family has no italics; globals.css neutralises
 * <i>/<em> so the browser never synthesises a slant.
 */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const apfel = localFont({
  variable: "--font-apfel",
  display: "swap",
  src: [
    {
      path: "../fonts/ApfelGrotezk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ApfelGrotezk-Mittel.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/ApfelGrotezk-Fett.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

const SITE_DESCRIPTION =
  "For The Rest Of Us is a solutions studio in Johannesburg. We design and build digital products — apps, SaaS and websites — for our clients and for our own ideas, and advise on product, marketing and automation.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fortherestofus.app"),
  title: {
    default: "For The Rest Of Us — A solutions studio that builds and advises",
    template: "%s — For The Rest Of Us",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "For The Rest Of Us",
    "Alroy Ndhlovu",
    "solutions studio",
    "app development",
    "SaaS development",
    "website studio",
    "product consulting",
    "digital marketing",
    "business automation",
    "Johannesburg",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "For The Rest Of Us — A solutions studio that builds and advises",
    description: SITE_DESCRIPTION,
    url: "https://fortherestofus.app",
    siteName: "For The Rest Of Us",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For The Rest Of Us — A solutions studio that builds and advises",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={apfel.variable}>
      <body className="font-body" suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
