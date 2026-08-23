import type { Metadata } from "next";
import { getApp } from "@/lib/apps";
import AppThemeProvider from "@/components/apps/AppThemeProvider";
import LegalDocument from "@/components/legal/LegalDocument";
import {
  PRIVACY_INTRO,
  PRIVACY_SECTIONS,
  LEGAL_LAST_UPDATED,
} from "@/lib/legal/inspiritintruth";

export const metadata: Metadata = {
  title: { absolute: "InSpiritInTruth · Privacy Policy" },
  description:
    "What InSpiritInTruth collects, why, who processes it, and how to get it back or delete it. Including how we handle the personal things you share to get a devotional.",
  // Canonical lives on the app's own domain — this is the mirror.
  alternates: { canonical: "https://inspiritintruth.net/privacy/" },
};

const app = getApp("inspiritintruth")!;

export default function InSpiritInTruthPrivacyPage() {
  return (
    <AppThemeProvider app={app}>
      <LegalDocument
        title="Privacy Policy"
        lastUpdated={LEGAL_LAST_UPDATED}
        backHref="/apps/inspiritintruth/"
        backLabel="Back to InSpiritInTruth"
        intro={PRIVACY_INTRO}
        sections={PRIVACY_SECTIONS}
      />
    </AppThemeProvider>
  );
}
