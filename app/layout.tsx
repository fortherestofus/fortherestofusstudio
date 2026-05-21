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

export const metadata: Metadata = {
  metadataBase: new URL("https://fortherestofus.studio"),
  title: {
    default: "For The Rest Of Us — Apps made for real people",
    template: "%s — For The Rest Of Us",
  },
  description:
    "A studio building apps for everyday people. See what we're making.",
  openGraph: {
    title: "For The Rest Of Us — Apps made for real people",
    description:
      "A studio building apps for everyday people. See what we're making.",
    url: "https://fortherestofus.studio",
    siteName: "For The Rest Of Us",
    type: "website",
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
      <body className="font-body">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
