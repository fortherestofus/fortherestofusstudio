"use client";

/**
 * CalBooking — the cal.com inline booker.
 *
 * By a wide margin the heaviest thing on the contact page: embed.js is ~23KB
 * on the parent, and the iframe behind it pulls roughly a megabyte of chunks
 * and fonts. None of it is requested until the section is nearly in view.
 *
 * The link inside the frame is the real fallback, not a placeholder: a plain
 * anchor to the booking page, in the HTML, working with no JS, with the script
 * blocked, or if Cal is down. It is retired only once Cal reports the booker
 * actually ready.
 *
 * Ported from the version proven on alroyndhlovu.com, including the two traps
 * it cost to find — see the comments on theme delivery and on height.
 */

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { CalendarDays, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

const EMBED_SCRIPT = "https://app.cal.com/embed/embed.js";
/** A namespace isolates this embed from any popup CTA added later. */
const NAMESPACE = "studio-booking";
const FRAME_ID = "cal-booking";
/** How early to start loading — roughly one screen ahead. */
const PRELOAD_MARGIN = "600px";

type CalTheme = "light" | "dark";

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalFn>;
  q?: unknown[][];
};

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

/*
 * Cal's loader snippet, transcribed rather than pasted in as a <script> tag.
 * The snippet itself only defines a queueing shim — embed.js is not requested
 * until the first Cal(...) call, which is what makes deferring this genuinely
 * free rather than cosmetic.
 */
function loader(): CalFn {
  if (window.Cal) return window.Cal;

  const queue = (target: CalFn, args: unknown[]) => {
    target.q = target.q ?? [];
    target.q.push(args);
  };

  const cal = function (...args: unknown[]) {
    const self = window.Cal as CalFn;

    if (!self.loaded) {
      self.ns = {};
      self.q = self.q ?? [];
      document.head.appendChild(document.createElement("script")).src =
        EMBED_SCRIPT;
      self.loaded = true;
    }

    if (args[0] === "init") {
      const namespace = args[1];
      if (typeof namespace === "string") {
        const api = function (...inner: unknown[]) {
          queue(api as CalFn, inner);
        } as CalFn;
        self.ns![namespace] = self.ns![namespace] ?? api;
        queue(self.ns![namespace], args);
        queue(self, ["initNamespace", namespace]);
        return;
      }
    }

    queue(self, args);
  } as CalFn;

  window.Cal = cal;
  return cal;
}

/** Design values belong in the token layer, including the ones the iframe is told. */
function token(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

type Rgba = [number, number, number, number];

function parseColor(value: string): Rgba | null {
  const v = value.trim();

  if (v.startsWith("#")) {
    const raw = v.slice(1);
    const full =
      raw.length === 3 || raw.length === 4
        ? raw
            .split("")
            .map((c) => c + c)
            .join("")
        : raw;
    if (full.length < 6) return null;
    const at = (i: number) => parseInt(full.slice(i, i + 2), 16);
    return [at(0), at(2), at(4), full.length >= 8 ? at(6) / 255 : 1];
  }

  const match = v.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const parts = match[1]
    .split(/[\s,/]+/)
    .filter(Boolean)
    .map(Number);
  if (parts.length < 3 || parts.some(Number.isNaN)) return null;
  return [parts[0], parts[1], parts[2], parts.length > 3 ? parts[3] : 1];
}

/*
 * Cal wants flat colours. Two of our border tokens are translucent white in
 * dark mode, so they are composited over the canvas first — the result is what
 * the eye already sees, and the tokens stay the single source of truth.
 */
function flatten(value: string, backdrop: string): string {
  const c = parseColor(value);
  const b = parseColor(backdrop) ?? [255, 255, 255, 1];
  if (!c) return "#000000";
  const channel = (i: 0 | 1 | 2) =>
    Math.round(c[i] * c[3] + b[i] * (1 - c[3]))
      .toString(16)
      .padStart(2, "0");
  return `#${channel(0)}${channel(1)}${channel(2)}`;
}

/*
 * The booker renders in its own iframe, so nothing in our stylesheet can reach
 * inside it: unstyled, a white calendar lands in the middle of the page. Fonts
 * are not themeable at all — the booker keeps Cal Sans, and the section is
 * designed around that rather than pretending otherwise.
 *
 * cal-brand is the primary button, which on this site is ink, not accent.
 */
function palette() {
  const bg = token("--color-bg");
  return {
    "cal-brand": flatten(token("--color-text"), bg),
    "cal-brand-text": flatten(bg, bg),
    "cal-bg": flatten(bg, bg),
    "cal-bg-subtle": flatten(token("--color-surface-sunken"), bg),
    "cal-bg-emphasis": flatten(token("--color-surface-sunken"), bg),
    "cal-bg-muted": flatten(token("--color-surface-sunken"), bg),
    "cal-text": flatten(token("--color-text"), bg),
    "cal-text-emphasis": flatten(token("--color-text"), bg),
    "cal-text-subtle": flatten(token("--color-text-muted"), bg),
    "cal-text-muted": flatten(token("--color-text-faint"), bg),
    "cal-border": flatten(token("--color-border"), bg),
    "cal-border-subtle": flatten(token("--color-border"), bg),
    // Unitless zero: a length, not a colour.
    "cal-border-booker-width": "0",
  };
}

function uiConfig(theme: CalTheme) {
  const vars = palette();
  return {
    theme,
    layout: "month_view",
    hideEventTypeDetails: false,
    /* Cal scrolls itself into view when the booker advances a step, which
       yanks the reader up the page. */
    disableAutoScroll: true,
    // Both themes carry the same palette, so a Cal-side flip cannot unbrand it.
    cssVarsPerTheme: { light: vars, dark: vars },
  };
}

export default function CalBooking({
  calLink,
  fallbackHref,
  fallbackLabel,
  className,
}: {
  /** Everything after cal.com/ — use calLink() from lib/contact. */
  calLink: string;
  /** The full cal.com URL, for the no-JS fallback anchor. */
  fallbackHref: string;
  fallbackLabel: string;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const bookingRef = useRef<CalFn | null>(null);

  const { resolvedTheme } = useTheme();
  const theme: CalTheme = resolvedTheme === "dark" ? "dark" : "light";
  const themeRef = useRef<CalTheme>(theme);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const mount = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      const Cal = loader();
      Cal("init", NAMESPACE, { origin: "https://cal.com" });

      const booking = window.Cal!.ns![NAMESPACE];
      bookingRef.current = booking;

      booking("inline", {
        elementOrSelector: `#${FRAME_ID}`,
        calLink,
        /*
         * These become query parameters on the iframe URL, so the booker boots
         * in the right theme. Passing the theme only through the `ui` call
         * below delivers it by postMessage *after* load, which is where the
         * white flash everyone reports comes from. `ui.color-scheme` is
         * separate and also needed: without it the iframe canvas itself stays
         * opaque white behind a dark booker.
         */
        config: {
          layout: "month_view",
          theme: themeRef.current,
          "ui.color-scheme": themeRef.current,
          "ui.autoscroll": "false",
        },
      });

      booking("ui", uiConfig(themeRef.current));

      /*
       * Cal's own readiness event, rather than watching for an iframe to
       * appear. If the script is blocked or fails this never fires, the
       * fallback link stays exactly where it is, and the section still works.
       */
      booking("on", {
        action: "linkReady",
        callback: () => frame.setAttribute("data-cal-state", "ready"),
      });
    };

    if (!("IntersectionObserver" in window)) {
      mount();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          mount();
        }
      },
      { rootMargin: PRELOAD_MARGIN }
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [calLink]);

  useEffect(() => {
    themeRef.current = theme;
    const booking = bookingRef.current;
    if (!booking) return;
    /*
     * next-themes swaps the .dark class from a provider effect, and React runs
     * parent effects after child effects — read the tokens on the next frame
     * or they are still the outgoing theme's.
     */
    const id = requestAnimationFrame(() => booking("ui", uiConfig(theme)));
    return () => cancelAnimationFrame(id);
  }, [theme]);

  return (
    <div
      id={FRAME_ID}
      ref={frameRef}
      data-cal-state="idle"
      style={{ colorScheme: theme }}
      /*
       * Deliberately no `height` and no `overflow`. Cal's own generator emits
       * `height:100%;overflow:scroll`, which in normal page flow resolves the
       * height to auto and then hides the overflow behind their scrollbar
       * suppression — that pairing causes most "the embed collapsed" and "the
       * calendar is cut off" reports.
       *
       * min-height is the right lever: Cal's <cal-inline> wrapper sets
       * `min-height: inherit`, so this reserves the space before load and holds
       * the frame open, then the container grows freely once the iframe reports
       * its real height. Once the booker is in, the frame gets out of its way —
       * Cal draws its own bordered cards and pads them 48px, so keeping a
       * border and a surface here stacks three frames inside each other.
       */
      className={cn(
        "group relative w-full min-h-[560px]",
        "rounded-well border border-border bg-surface shadow-card",
        "data-[cal-state=ready]:min-h-0 data-[cal-state=ready]:border-transparent",
        "data-[cal-state=ready]:bg-transparent data-[cal-state=ready]:shadow-none",
        className
      )}
    >
      {/*
       * Absolutely positioned so it contributes no height. In flow it did: Cal
       * inserts its iframe as a sibling and only fires linkReady once the
       * booker is up, so for that window the container held both and measured
       * twice its final height before snapping back.
       */}
      <div className="absolute inset-0 flex min-h-[560px] flex-col items-center justify-center gap-5 p-6 text-center group-data-[cal-state=ready]:hidden">
        <CalendarDays
          className="h-10 w-10 text-accent-deep"
          strokeWidth={1.5}
          aria-hidden
        />
        <p className="max-w-[38ch] text-pretty leading-relaxed text-muted">
          Pick a slot that suits you. The calendar loads as you reach it.
        </p>
        <a
          href={fallbackHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-[12px] bg-ink px-6 py-3 font-medium text-bg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-pill focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          {fallbackLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </div>
  );
}
