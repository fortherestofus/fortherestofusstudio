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
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

import { getTrafficSource, tagPlayLink } from "@/lib/trafficSource";

const KEY = "phc_kW4HvLxEsKYgbGd7JChCQCdHcUuQkMeiWU7DCgVzmMao";
// Our own domain, proxied to PostHog's EU ingest by the rewrites in
// next.config.mjs — so an ad blocker doesn't silently drop the visit.
const HOST = "/ingest";
const UI_HOST = "https://eu.posthog.com";

let started = false;

export default function TapaAnalytics() {
  useEffect(() => {
    // Read before anything else, while the landing URL still carries
    // any ?utm_source=. The store badge listener below uses it.
    getTrafficSource();
    if (started || process.env.NODE_ENV !== "production") return;
    started = true;
    posthog.init(KEY, {
      api_host: HOST,
      ui_host: UI_HOST,
      cookieless_mode: "always",
      // OFF: the pathname effect below sends every $pageview. The default
      // (capture on load) PLUS an explicit capture sent TWO per load,
      // ~5 ms apart — measured 2026-10-14 — and `history_change` was
      // tried before that and did not fire the initial one at all. This
      // also covers client-side moves between tapa's pages, which a
      // load-time capture never saw.
      capture_pageview: false,
      // Off too. PostHog stays initialised after someone leaves tapa's
      // pages for the rest of the studio site, so a $pageleave would
      // report other apps' URLs into tapa's project.
      capture_pageleave: false,
      // Autocapture records clicks on every element including their text.
      // The store link is captured explicitly instead — it is the only
      // click here that answers a question we actually have.
      autocapture: false,
      // Same reason: dead-click capture records the element's text. The
      // project setting has it on, so it is switched off here explicitly.
      capture_dead_clicks: false,
      disable_session_recording: true,
      capture_heatmaps: false,
      // Page-speed numbers (LCP, CLS, INP, FCP) for the Web Vitals tab.
      // The SDK sends them 5 s after the first paint and NOT on leaving,
      // so a visit shorter than that reports none — expect few.
      capture_performance: { web_vitals: true },
    });
  }, []);

  // One $pageview per tapa page, first load and client-side moves alike.
  // Runs after the init effect above (effects run in order), so the
  // first page is counted once the client exists.
  const pathname = usePathname();
  useEffect(() => {
    if (!started) return;
    posthog.capture("$pageview");
  }, [pathname]);

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
      const platform = href.includes("apps.apple.com")
        ? "ios"
        : href.includes("play.google.com")
          ? "android"
          : null;
      if (!link || !platform) return;

      // Changed at click time, before the browser follows the link, so
      // it only applies on tapa's pages — the badge component is shared
      // with every app page.
      // - Play: carry the visit's source (tiktok, instagram...) as utm
      //   tags, which Play Console shows under Acquisition.
      // - Both: drop `noreferrer`, so the store sees this site as the
      //   referrer (App Store Connect's "Web Referrer" report).
      if (platform === "android") link.href = tagPlayLink(href, "ftrou-tapa");
      link.rel = "noopener";

      posthog.capture("store_badge_clicked", {
        platform,
        source: getTrafficSource() ?? "direct",
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
