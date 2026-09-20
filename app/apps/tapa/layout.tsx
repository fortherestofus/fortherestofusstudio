/**
 * Exists only to scope analytics to tapa's pages.
 *
 * tapa's PostHog project lives in its own organization, so measurement
 * has to stop at this route segment — see components/analytics/
 * TapaAnalytics.tsx for why.
 */
import type { ReactNode } from "react";

import TapaAnalytics from "@/components/analytics/TapaAnalytics";

export default function TapaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TapaAnalytics />
      {children}
    </>
  );
}
