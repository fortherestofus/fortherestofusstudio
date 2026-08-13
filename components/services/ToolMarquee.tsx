"use client";

/**
 * ToolMarquee — the breadth of tools we have actually shipped with, as a
 * slow rail of typographic chips.
 *
 * Names, not logos, until real logo files are supplied — a text chip is
 * honest and needs no trademark artwork. Every name here appears in a real
 * case study or a shipped product; the list is not aspirational. Reduced
 * motion gets a plain wrapped list.
 */
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

/** Tools evidenced by the case studies and shipped products. */
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

export default function ToolMarquee({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn("flex flex-wrap gap-2.5", className)}>
        {TOOLS.map((t) => (
          <Chip key={t} name={t} />
        ))}
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
      <div className="flex w-max animate-marquee gap-2.5 hover:[animation-play-state:paused]">
        {[...TOOLS, ...TOOLS].map((t, i) => (
          <Chip key={`${t}-${i}`} name={t} />
        ))}
      </div>
    </div>
  );
}
