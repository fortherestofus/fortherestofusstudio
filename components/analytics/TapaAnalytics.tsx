"use client";

/**
 * PostHog web analytics, scoped to tapa's pages only.
 *
 * WHY SCOPED. This site carries the whole studio — tapa, InSpiritInTruth
 * and Caught Slipping legal pages, plus the studio itself. tapa's
 * analytics live in their own PostHog organization (the free plan allows
 * one project per org), so sending every page on this domain there would
 * fill tapa's numbers with views of other apps' privacy policies. This
 * component is mounted from app/apps/tapa/layout.tsx and nowhere else,
 * so only /apps/tapa/* is measured.
 *
 * WHY COOKIELESS. `cookieless_mode: 'always'` stores nothing in cookies,
 * localStorage or sessionStorage, so no consent banner is needed — there
 * is nothing to consent to. The trade-offs are real and accepted: no
 * cross-visit identity, and country is not resolved on web events
 * (PostHog strips the IP before its GeoIP step in this mode).
 *
 * The key is written here rather than read from an env var on purpose: a
 * PROJECT key only permits sending events, and NEXT_PUBLIC_* values are
 * inlined into the client bundle at build time anyway — so an env var
 * would be exactly as public, while adding a way for the build to end up
 * without it and quietly collect nothing.
 */

import { useEffect } from "react";
import posthog from "posthog-js";

const KEY = "phc_kW4HvLxEsKYgbGd7JChCQCdHcUuQkMeiWU7DCgVzmMao";
const HOST = "https://eu.i.posthog.com";

let started = false;

export default function TapaAnalytics() {
  useEffect(() => {
    if (started || process.env.NODE_ENV !== "production") return;
    started = true;
    posthog.init(KEY, {
      api_host: HOST,
      cookieless_mode: "always",
      // Left at the default (capture on page load). `history_change` was
      // tried first and measurably did NOT fire the initial $pageview —
      // production showed $pageleave events with no matching $pageview.
      // See the InSpiritInTruth site, where the same fix applies.
      // Autocapture records clicks on every element including their text.
      // The store link is captured explicitly instead — it is the only
      // click here that answers a question we actually have.
      autocapture: false,
      disable_session_recording: true,
      capture_heatmaps: false,
    });

    // Fired explicitly — see the InSpiritInTruth site, where relying on
    // `capture_pageview` measurably produced $pageleave events with no
    // matching $pageview.
    posthog.capture("$pageview");
  }, []);

  // The one click on this page worth measuring: it is the last thing
  // visible before an install, which carries no referrer of its own.
  // Delegated rather than wired into the CTA, because AppDetail is a
  // SERVER component shared by every app page — an onClick there would
  // mean making it a client component for all of them.
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href") ?? "";
      if (href.includes("apps.apple.com")) {
        posthog.capture("store_badge_clicked", { platform: "ios" });
      } else if (href.includes("play.google.com")) {
        posthog.capture("store_badge_clicked", { platform: "android" });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
