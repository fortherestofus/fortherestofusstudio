# ForTheRestOfUs (studio website) — agent guide

Marketing/portfolio website for the **fortherestofus** app studio
(`fortherestofus-studio`). Showcases the studio's apps (currently
CaughtSlipping, InSpiritInTruth, tapa.) and hosts each app's public pages:
listings, privacy/terms, and InSpiritInTruth's Giving + Giving FAQ pages.
Next.js 15 (App Router), React 19.

## Ways of working (read first)

- **Design reference is authoritative.** `Design Reference/` (Home Page,
  App Description Page JPGs) is the spec — analyse the composition rather than
  approximating. For new UI, research current best practice first; treat any
  screenshots/links the user shares as the spec.
- **`lib/apps.ts` is the single source of truth** for everything app-related:
  card + detail-page content, features, screenshots, status, accent colors,
  CTA, SEO, giving/legal paths. Add or change app content there — don't
  hand-edit page components with per-app copy.
- **Keep app pages in sync with the app repos.** When an app's behaviour,
  pricing, or data handling changes (tapa, CaughtSlipping, InSpiritInTruth),
  its listing/legal/giving pages here must follow. Giving copy is
  voluntary-gift only — a gift must never be said to unlock anything.
- **Keep the docs current** — update this file after meaningful changes.
- **Commit + push after a coherent change** once gates are green. Repo:
  `github.com/fortherestofus/fortherestofusstudio`.

## Stack

- **Next.js 15 App Router** (`app/`), React 19, TypeScript, **Tailwind 3**
  (`tailwind.config.ts`), `next-themes` for light/dark.
- Motion/visuals: **@shadergradient/react + three / @react-three/fiber**
  (WebGL gradient hero), **gsap**, **framer-motion**, lucide icons (via the
  `components/ui/Icon.tsx` registry — icon names in `lib/apps.ts` map to it).
- Fonts: self-hosted **Apfel Grotezk** (Regular/Mittel) in `fonts/` — the
  studio brand face across all fortherestofus products. Don't add Google-hosted
  fonts.
- **Server-mode build** (`next build` + `next start`, for Hostinger /
  @netlify/next). `next.config.ts` sets baseline security headers —
  intentionally **no CSP yet** (inline styles + WebGL shader need a tested
  pass first); `headers()` is ignored if the site is ever switched to
  `output: "export"`, so revisit them together.
- No backend of its own — the site is content-only. App backends live in
  their own repos (payments/giving run through the apps, not this site).

## Layout

- `app/page.tsx` — home; `app/apps/<slug>/` — per-app pages
  (`caught-slipping`, `inspiritintruth` incl. giving + giving-faq, `tapa`
  incl. privacy + terms).
- `components/` — `home/`, `apps/`, `layout/`, `legal/`, `ui/`.
- `lib/apps.ts` — the app registry (see above).
- `public/` — icons (`/icons/[slug].png`), screenshots
  (`/screenshots/[slug]-N.png`), OG images.

## Conventions

- TypeScript everywhere; keep `npx tsc --noEmit` clean.
- One component per file; PascalCase components.
- Keep file/function header comments.
- Wide/heavy visuals must degrade gracefully — the shader hero should not
  block content rendering; test reduced-motion.

## Verify

Static gates (run before every commit):
- Type-check: `npx tsc --noEmit`
- Lint: `npm run lint`
- Build: `npm run build` (catches App Router + prerender errors)

Runtime:
- `npm run dev` → check home, one app detail page, a legal page, and the
  giving pages in both light and dark themes, desktop + mobile widths.

## Related repos

- `fortherestofus/inspiritintruth` — mobile app; its AGENTS.md documents the
  Giving (Paystack) backend these giving pages describe.
- `fortherestofus/tapa` — mobile app; privacy/terms pages live here.
- `fortherestofus/caught-slipping` — Chrome extension; its
  `docs/store-listing.md` should match the listing page here.
