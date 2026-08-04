import type { Metadata } from "next";
import { getApp } from "@/lib/apps";
import AppThemeProvider from "@/components/apps/AppThemeProvider";
import LegalDocument from "@/components/legal/LegalDocument";
import {
  TERMS_INTRO,
  TERMS_SECTIONS,
  LEGAL_LAST_UPDATED,
} from "@/lib/legal/inspiritintruth";

export const metadata: Metadata = {
  title: { absolute: "InSpiritInTruth — Terms of Service" },
  description:
    "The agreement between you and For The Rest Of Us for using InSpiritInTruth — accounts, AI-written devotionals, scripture licensing, subscriptions, giving and liability.",
  // Canonical lives on the app's own domain — this is the mirror.
  alternates: { canonical: "https://inspiritintruth.net/terms/" },
};

const app = getApp("inspiritintruth")!;

export default function InSpiritInTruthTermsPage() {
  return (
    <AppThemeProvider app={app}>
      <LegalDocument
        title="Terms of Service"
        lastUpdated={LEGAL_LAST_UPDATED}
        backHref="/apps/inspiritintruth/"
        backLabel="Back to InSpiritInTruth"
        intro={TERMS_INTRO}
        sections={TERMS_SECTIONS}
      />
    </AppThemeProvider>
  );
}
