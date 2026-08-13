"use client";

/**
 * ToolMarquee — the tools we work with, as a slow rail of typographic chips.
 *
 * Names, not logos: a text chip is honest, needs no trademark artwork, and
 * (as the client rail found out the hard way) stays legible at any size.
 *
 * Every name below is a tool we actually work with. It used to be a stricter
 * claim — every name evidenced by a shipped case study — which was true but
 * meant the list could never mention something we can do and simply have not
 * billed for yet. So the rail now ends on "and more" and says what it is: the
 * tools we use, not an exhaustive inventory. The line that still must not be
 * written is an aspirational one — a tool nobody here has actually run.
 *
 * Reduced motion gets a plain wrapped list.
 */
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Tools we work with. Add only what someone here has actually used. */
const TOOLS = [
  "Apollo.io",
  "Zoho",
  "Zapier",
  "Claude",
  "ChatGPT",
  "Google Veo",
  "Replit",
  "Social Crawl",
  "Supabase",
  "Vercel",
  "Next.js",
  "Expo",
  "RevenueCat",
  "Paystack",
  "LinkedIn Ads",
  "GSAP",
];

function Chip({ name }: { name: string }) {
  return (
    <span className="shrink-0 rounded-[10px] border border-border bg-surface px-4 py-2 text-[0.875rem] font-medium text-muted">
      {name}
    </span>
  );
}

/**
 * Closes each pass of the rail. Unbordered on purpose — it is not a tool, it
 * is the admission that the list is not the whole list. No italic: Apfel has
 * no true italics and a synthesised oblique is banned sitewide, so it
 * separates itself by losing the chip instead.
 */
function AndMore() {
  return (
    <span className="shrink-0 whitespace-nowrap px-1 py-2 text-[0.875rem] uppercase tracking-[0.14em] text-faint">
      and more
    </span>
  );
}

export default function ToolMarquee({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
        {TOOLS.map((t) => (
          <Chip key={t} name={t} />
        ))}
        <AndMore />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className
      )}
    >
      {/* Two identical passes, each closing on "and more" — the rail is
          translated by exactly half its width, so the seam is invisible and
          the admission lands once per cycle. */}
      <div className="flex w-max animate-marquee items-center gap-2.5 hover:[animation-play-state:paused]">
        {[0, 1].map((pass) => (
          <span key={pass} className="flex items-center gap-2.5">
            {TOOLS.map((t) => (
              <Chip key={`${pass}-${t}`} name={t} />
            ))}
            <AndMore />
          </span>
        ))}
      </div>
    </div>
  );
}
