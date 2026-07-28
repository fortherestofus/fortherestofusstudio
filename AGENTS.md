# ForTheRestOfUs (studio website) — agent guide

Website for the **fortherestofus** solutions studio (`fortherestofus-studio`).
The studio has two arms and the site sells both: it **builds** (its own apps —
CaughtSlipping, InSpiritInTruth, tapa., Hakkan — plus custom apps, SaaS, and
websites for clients) and it **advises** (product and growth direction, brand
and content, business tech and automation). It also hosts each app's public
pages: listings, privacy/terms, and InSpiritInTruth's Giving + Giving FAQ.
Next.js 15 (App Router), React 19.

## Ways of working (read first)

- **Design reference is authoritative.** `Design Reference/` (currently
  `IMG_7712.JPG`) is the spec — analyse the composition rather than
  approximating. The direction is clean, monotone editorial SaaS: off-white
  canvas, rounded white cards inside a sunken well, ink pill buttons, big
  grotesk headlines, dark closing block + footer. Treat any screenshots or
  links the user shares as the spec.
- **`lib/apps.ts` is the single source of truth** for everything app-related:
  card + detail-page content, features, screenshots, status, accent colors,
  CTA, SEO, giving/legal paths. **`lib/services.ts`** does the same for the
  consulting arm and the shared process steps. Add or change content there —
  don't hand-edit page components with per-app or per-service copy.
- **Keep app pages in sync with the app repos.** When an app's behaviour,
  pricing, or data handling changes (tapa, CaughtSlipping, InSpiritInTruth,
  Hakkan), its listing/legal/giving pages here must follow. Giving copy is
  voluntary-gift only — a gift must never be said to unlock anything. Hakkan
  is in private beta; never describe it as launched.
- **Only real claims.** No invented stats, testimonials, or client logos.
  `lib/testimonials.ts` holds real quotes from real named people — never add an
  entry that was not actually said, and never invent a name, title, or company.
  Client names there are real engagements.
- **Keep the docs current** — update this file and `docs/REDESIGN.md` after
  meaningful changes.
- **Commit + push after a coherent change** once gates are green. Repo:
  `github.com/fortherestofus/fortherestofusstudio`.

## Stack

- **Next.js 15 App Router** (`app/`), React 19, TypeScript, **Tailwind 3**
  (`tailwind.config.ts`), `next-themes` for light/dark (manual toggle,
  `enableSystem: false`, light default).
- Motion: **framer-motion** only, used sparingly (nav sheet, reveals). The
  WebGL shader, `three`, and `gsap` were removed in the redesign — do not
  reintroduce heavy visual dependencies without a reason.
- Icons: lucide via the `components/ui/Icon.tsx` registry — icon-name strings
  in `lib/apps.ts` / `lib/services.ts` map to it.
- Fonts: self-hosted **Apfel Grotezk** (Regular 400 / Mittel 500 / Fett 700,
  SIL Open Font License) in `fonts/`, loaded with `next/font/local` in
  `app/layout.tsx`. It is the only typeface sitewide. **No Google-hosted
  fonts.** The family has no italics — `globals.css` neutralises `<i>`/`<em>`.
- **Server-mode build** (`next build` + `next start`). `next.config.ts` sets
  baseline security headers — intentionally **no CSP yet** (accent theming
  uses inline `style` for CSS variables, so a CSP needs `style-src
  'unsafe-inline'` or a nonce pass); `headers()` is ignored under
  `output: "export"`, so revisit them together.
- No backend of its own — the site is content-only. App backends live in their
  own repos (payments/giving run through the apps, not this site).

## Design system

**The system is monotone.** Warm off-white canvas, ink type, ink buttons.
Colour enters a page only through *imagery* (screenshots, placeholder art) and
through an app's own accent on that app's pages. There is no section-level
brand colour and no pastel washes. `--color-accent` is a restrained ember kept
for small live moments (focus rings, hover, status dots) — never a background.

Tokens live as CSS variables in `app/globals.css` and are mapped to Tailwind
colors in `tailwind.config.ts`. Use tokens, never raw palette hex.

- Surfaces: `bg` (cream canvas), `surface` (white cards), `sunken` (section
  tint / wells), `ink-surface` + `ink-raised` (dark blocks and footer).
- Text: `ink`, `muted`, `faint`; on dark: `ink-text`, `ink-muted`.
- Accent: `accent` (fills, hairlines), `accent-soft` (washes), `accent-ink`
  (text on a solid accent fill), **`accent-deep`** (text and icons on a pale
  wash — always use this for accent-coloured text; raw `accent` fails contrast
  on light surfaces).
- **At most two ink (dark) moments per page, and never in the same viewport.**
  On most pages that budget is spent on the closing `CallToAction` block and
  the footer, so keep everything above them light.

**Per-app theming.** Global surfaces, type, and ink buttons never change. Only
the accent slot varies, scoped by `components/apps/AppThemeProvider.tsx`, which
sets `--color-accent`, `--color-accent-soft`, `--color-accent-ink`, and
`--color-accent-deep` from the registry. Wrap any page that belongs to an app
(detail, giving) in it.

**App icon tiles** use a light backdrop (`color-mix(accent 15%, #ffffff)`) in
both themes — the app icons are drawn for light backgrounds and disappear on a
dark tint.

**Placeholders.** `components/ui/PlaceholderBlock.tsx` renders grainy
accent-tinted blocks at fixed aspect ratios, standing in for screenshots and
photography until real assets exist. Every image slot is sized for the real
asset, so dropping one in shifts no layout.

**Vignettes vs screenshots.** `components/services/Vignettes.tsx` holds
miniature product UI built in HTML/CSS. These are used *only* on service cards
and service hero slots, where there is no real artefact to show. App pages must
use real screenshots (or a placeholder awaiting one) — never simulated UI.

**Territories.** Cards belong to the studio side (home, services). App pages
are editorial: full-bleed alternating bands, big type, screenshots bleeding off
the outer edge, a hairline spec strip, no card stacks. Keeping each language in
its own territory is what stops the site reading as two designs.

## Layout

- `app/page.tsx` — home; `app/apps/` — apps index; `app/apps/<slug>/` —
  per-app pages (`caught-slipping`, `hakkan`, `inspiritintruth` incl. giving +
  giving-faq, `tapa` incl. privacy + terms); `app/services/` and
  `app/services/[slug]/` (five SEO detail pages from `lib/services.ts`);
  `app/studio/`, `app/contact/`; `app/not-found.tsx`, `app/sitemap.ts`,
  `app/robots.ts`.
- `components/` — `home/` (page sections), `apps/`, `layout/` (Navbar, Footer,
  PageHero), `legal/`, `services/` (Vignettes), `ui/` (the kit: PillButton,
  EyebrowChip, Section, Card/Well/VignetteCard/IconCard/ProcessStrip,
  PlaceholderBlock, Badge, AppCard, Icon).
- `lib/apps.ts`, `lib/services.ts`, `lib/testimonials.ts`, `lib/contact.ts`,
  `lib/cn.ts`.
- `public/` — icons (`/icons/[slug].png|svg`), screenshots
  (`/screenshots/[slug]-N.png`), OG images.

## Conventions

- TypeScript everywhere; keep `npx tsc --noEmit` clean.
- One component per file; PascalCase components; keep file header comments.
- Copy voice: second person, active, short sentences, verb-first buttons,
  concrete numbers. Avoid "unlock / supercharge / seamless / empower / delve".
- The site is served with `trailingSlash: true` — canonicals, `alternates`,
  OG `url`s, sitemap entries, and registry paths must all end in a slash.
- Motion stays calm and must respect reduced-motion.

## Verify

Static gates (run before every commit):
- Type-check: `npx tsc --noEmit`
- Lint: `npm run lint`
- Build: `npm run build` (catches App Router + prerender errors)

**Stop the dev server before running `npm run build`** — both write to `.next`
and running them together corrupts the dev cache (missing-module and
missing-CSS errors). If that happens, `rm -rf .next` and restart.

Runtime:
- `npm run dev` → check home, the apps index, one app detail page, services,
  studio, contact, a legal page, and the giving pages in both light and dark
  themes, desktop + mobile widths.

## Related repos

- `fortherestofus/inspiritintruth` — mobile app; its AGENTS.md documents the
  Giving (Paystack) backend these giving pages describe.
- `fortherestofus/tapa` — mobile app; privacy/terms pages live here.
- `fortherestofus/caught-slipping` — Chrome extension; its
  `docs/store-listing.md` should match the listing page here.
- `Hakkan` (local: `~/Documents/CODING/Hakkan`) — web app, private beta;
  its privacy/terms live on hakkan.app, linked externally from the listing.
