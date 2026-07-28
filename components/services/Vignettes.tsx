/**
 * Service vignettes — miniature product UI built in HTML/CSS.
 *
 * These are deliberately not screenshots: they stay crisp at any DPI, follow
 * the theme tokens, and cost nothing to load. Each composition is rendered
 * near real size and cropped by its frame, which is what makes it read as a
 * fragment of a real product rather than a diagram.
 *
 * Only the service cards use these. App pages use real screenshots.
 */
import { cn } from "@/lib/cn";

const PANEL =
  "absolute rounded-xl border border-border bg-surface shadow-[0_8px_24px_rgba(23,21,15,0.06)]";
const LINE = "rounded-full bg-sunken";

/** Custom apps & SaaS — an app screen fragment with one selected row. */
export function AppVignette() {
  return (
    <>
      <div className={cn(PANEL, "inset-y-6 left-7 -right-8 p-4")}>
        <div className="flex items-center gap-2.5">
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-ink/80 to-ink/40" />
          <span className="flex-1">
            <span className={cn(LINE, "block h-2 w-24")} />
            <span className={cn(LINE, "mt-1.5 block h-2 w-14")} />
          </span>
        </div>
        <div className="mt-4 space-y-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-2.5 rounded-lg border px-2.5 py-2",
                i === 1
                  ? "border-ink/25 bg-ink/[0.04]"
                  : "border-border bg-bg"
              )}
            >
              <span
                className={cn(
                  "h-4 w-4 rounded-md",
                  i === 1 ? "bg-ink" : "bg-sunken"
                )}
              />
              <span className={cn(LINE, "h-2 flex-1")} />
              {i === 1 && (
                <svg
                  className="h-3.5 w-3.5 text-ink"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M3 8.5l3.5 3.5L13 5" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
      <span className="absolute bottom-6 right-10 rounded-full bg-ink px-4 py-2 text-[0.75rem] font-medium text-bg shadow-[0_8px_24px_rgba(23,21,15,0.18)]">
        Ship it
      </span>
    </>
  );
}

/** Websites — a mini browser window, with a second one receding behind it. */
export function SiteVignette() {
  return (
    <>
      <div
        className={cn(
          PANEL,
          "left-14 -right-16 top-4 bottom-[46%] opacity-40 blur-[1px]"
        )}
      />
      <div className={cn(PANEL, "inset-y-7 left-7 -right-10 overflow-hidden")}>
        <div className="flex items-center gap-1.5 border-b border-border bg-bg px-3 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-border" />
          <span className="ml-2 max-w-[150px] flex-1 truncate rounded-full bg-sunken px-2.5 py-1 text-center text-[0.5625rem] text-faint">
            yourstudio.site
          </span>
        </div>
        <div className="p-4">
          <span className="block h-3 w-3/5 rounded-md bg-ink/85" />
          <span className={cn(LINE, "mt-2.5 block h-2 w-4/5")} />
          <span className={cn(LINE, "mt-1.5 block h-2 w-3/5")} />
          <span className="mt-3.5 inline-block rounded-full bg-ink px-3 py-1.5 text-[0.5625rem] font-medium text-bg">
            Start here
          </span>
        </div>
      </div>
    </>
  );
}

/** Product & growth — a headline metric over an area chart. */
export function GrowthVignette() {
  return (
    <div className="absolute inset-x-6 inset-y-6">
      <p className="nums text-[2.25rem] font-medium leading-none tracking-[-0.03em] text-ink">
        +128%
      </p>
      <span className="mt-2 inline-block rounded-full border border-border bg-surface px-2.5 py-1 text-[0.625rem] text-muted">
        reach · last 90 days
      </span>
      <div className="absolute right-0 top-11 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[0.625rem] text-muted shadow-[0_8px_24px_rgba(23,21,15,0.08)]">
        Apr — <span className="nums font-medium text-ink">4.2k</span>
      </div>
      <svg
        className="absolute -left-6 -right-6 bottom-[-24px] w-[calc(100%+3rem)]"
        viewBox="0 0 300 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="text-ink">
          <path
            d="M0,78 C40,74 60,62 90,58 C130,52 150,40 190,30 C230,20 260,16 300,6 L300,90 L0,90 Z"
            fill="url(#growthFill)"
          />
          <path
            d="M0,78 C40,74 60,62 90,58 C130,52 150,40 190,30 C230,20 260,16 300,6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="190" cy="30" r="4" fill="currentColor" />
          <circle cx="190" cy="30" r="7" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

/** Business tech & automation — connected nodes with a run status. */
export function FlowVignette() {
  const nodes = ["Form", "Sheet", "Invoice"];
  return (
    <div className="absolute inset-y-8 left-7 -right-10">
      <svg
        className="absolute inset-0 h-full w-full text-border"
        viewBox="0 0 300 130"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M60,32 C110,32 110,65 160,65"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M160,65 C210,65 210,98 260,98"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>
      {nodes.map((node, i) => (
        <div
          key={node}
          className={cn(
            "absolute flex w-[124px] items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-2 shadow-[0_6px_18px_rgba(23,21,15,0.06)]",
            i === 0 && "left-0 top-0",
            i === 1 && "left-[34%] top-[38%]",
            i === 2 && "left-[68%] top-[74%]"
          )}
        >
          <span
            className={cn(
              "h-4 w-4 shrink-0 rounded-md",
              i === 1 ? "bg-ink" : "bg-sunken"
            )}
          />
          <span className="truncate text-[0.6875rem] font-medium text-ink">
            {node}
          </span>
        </div>
      ))}
      <span className="absolute right-14 top-1 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-[0.5625rem] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-ink" />
        Ran 2m ago
      </span>
    </div>
  );
}

/** Brand & content — layered type specimen cards. */
export function BrandVignette() {
  return (
    <>
      <div
        className={cn(
          PANEL,
          "left-16 -right-14 top-5 bottom-16 rotate-[-4deg] opacity-45"
        )}
      />
      <div className={cn(PANEL, "inset-y-7 left-7 -right-12 p-4")}>
        <span className="text-[0.5625rem] uppercase tracking-[0.16em] text-faint">
          Voice
        </span>
        <p className="mt-2 text-[1.375rem] font-medium leading-tight tracking-[-0.02em] text-ink">
          Say it plainly.
        </p>
        <div className="mt-3.5 flex gap-1.5">
          {["Warm", "Direct", "No jargon"].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-border bg-bg px-2 py-0.5 text-[0.5625rem] text-muted"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-1.5">
          {["bg-ink", "bg-muted", "bg-border", "bg-sunken"].map((swatch) => (
            <span key={swatch} className={cn("h-6 w-6 rounded-md", swatch)} />
          ))}
        </div>
      </div>
    </>
  );
}

export const VIGNETTES = {
  "apps-and-saas": AppVignette,
  websites: SiteVignette,
  "product-and-growth": GrowthVignette,
  "brand-and-content": BrandVignette,
  "tech-and-automation": FlowVignette,
} as const;

export type VignetteKey = keyof typeof VIGNETTES;
