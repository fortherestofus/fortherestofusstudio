import type { Metadata } from "next";
import { DM_Sans, Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Apfel Groteszk is not on Google Fonts and needs a commercial license check;
// the build plan names DM Sans as the heading/UI fallback until it's self-hosted.
const dmSans = DM_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "A build-to-solve studio by consultant Alroy Ndhlovu — making technology genuinely useful and accessible, for everyday people and businesses alike. See what we're building.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fortherestofus.studio"),
  title: {
    default: "For The Rest Of Us — Everyday apps for everyday people",
    template: "%s — For The Rest Of Us",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "For The Rest Of Us",
    "Alroy Ndhlovu",
    "app studio",
    "everyday apps",
    "accessible technology",
    "product design",
    "build to solve",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "For The Rest Of Us — Everyday apps for everyday people",
    description: SITE_DESCRIPTION,
    url: "https://fortherestofus.studio",
    siteName: "For The Rest Of Us",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For The Rest Of Us — Everyday apps for everyday people",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${dmSans.variable}`}
    >
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
