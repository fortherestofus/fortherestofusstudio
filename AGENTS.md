# ForTheRestOfUs (studio website) — agent guide

Website for the **fortherestofus** solutions & consulting studio
(`fortherestofus-studio`). The studio has two arms and the site tells one
story about both: it **builds** (its own apps — CaughtSlipping,
InSpiritInTruth, tapa., Hakkan — plus custom apps, SaaS, and websites for
clients) and it **consults** (product and growth direction, brand and
content, business tech and automation — never call this arm "advice").
It also hosts each app's public pages: listings, privacy/terms, and
InSpiritInTruth's Giving + Giving FAQ. Next.js 16 (App Router), React 19.

## Ways of working (read first)

- **The site is a story (v3).** `docs/REDESIGN-V3.md` is the authoritative
  narrative spec: home is five numbered chapters (why → use cases →
  services → process → proof) between a promise hero and a single dark
  closing block. **Apps are use cases, never portfolio** — every app
  surface leads with its `problem` line from `lib/apps.ts`. Claims never
  travel without adjacent proof.
- **Design reference is authoritative.** `Design Reference/` (currently the
  Forth site: `Forth · Your city has plans for you.html` + `Website
  Screenshot.jpg`) is the spec for storytelling mechanics — numbered
  chapters, tinted feature cards, claim-then-artefact. The base direction
  stays clean, monotone editorial SaaS: off-white canvas, rounded white
  cards inside a sunken well, ink pill buttons, big grotesk headlines, dark
  closing block + footer. Treat any screenshots or links the user shares as
  the spec.
- **Only real numbers.** `lib/proof.ts` is the sole home for result stats
  (case proofs + studio stats), each with a `source` note. Never add an
  unmeasured or rounded-up number; honest "what didn't work" notes are a
  feature, not a bug.
- **Our results and other people's research never share a container.**
  A handful of service pages cite outside research to size the problem
  (McKinsey on IT overruns, Slack on owner busywork, Deloitte/Google on page
  speed, CB Insights on why startups fail). Those live **inline in prose with
  the source named in the sentence** — never in `lib/proof.ts`, never on a
  stat card, never in a `StatBand`. Stat cards are reserved for numbers we
  measured ourselves, and a borrowed figure sitting in one would read as our
  result. Before citing new research, check the attribution survives contact
  with the source: the widely-quoted IDC "20–30% of revenue lost to
  inefficiency" and the "$62k average app cost" listicle figures do not, and
  are not to be used.
- **Name clients; never publish their commercial data.** Naming a client and
  the problem solved is industry standard. What never ships — site, docs, or
  this public repo — is a client's pricing, pipeline/CRM volumes, media spend,
  absolute acquisition costs, or a vendor's quote to them. State those as
  ratios or outcomes ("~3× better than the category median", "0 → live").
  The absolute figures live in `docs/private/case-numbers.html` (gitignored)
  for closed-door pitches; add new ones there, not here.
- **`lib/apps.ts` is the single source of truth** for everything app-related:
  card + detail-page content, features, screenshots, status, accent colors,
  CTA, SEO, giving/legal paths. **`lib/services.ts`** does the same for the
  consulting arm and the shared process steps. Add or change content there —
  don't hand-edit page components with per-app or per-service copy.
- **Keep app pages in sync with the app repos.** When an app's behaviour,
  pricing, or data handling changes (tapa, CaughtSlipping, InSpiritInTruth,
  Hakkan), its listing/legal/giving pages here must follow. Giving copy is
  voluntary-gift only — a gift must never be said to unlock anything. Hakkan
  is in private beta; never describe it as launched. **CaughtSlipping is live**
  on the Chrome Web Store (August 2026) — status `Live`, CTA and badge both
  point at `CAUGHT_SLIPPING_CWS` in `lib/apps.ts`, with Google's share
  `utm_source` stripped.
- **Store badges only for stores an app is actually headed for.** Each key in
  an app's `stores` is opt-in: present-with-a-URL links, present-with-`null`
  renders unlinked and names that store in the coming-soon line, absent
  renders nothing. A Chrome extension is not going to the App Store, so
  CaughtSlipping carries `chrome` alone. Badges are used exactly as supplied
  and never dimmed or recoloured — greying someone else's mark modifies it.
- **Only real claims.** No invented stats, testimonials, or client logos.
  `lib/testimonials.ts` holds real quotes from real named people — never add an
  entry that was not actually said, and never invent a name, title, or company.
  Client names there are real engagements.
- **Never invent a person's likeness.** The mark beside a testimonial is the
  speaker's *organisation* logo (`logo` in `lib/testimonials.ts`), never a
  portrait: we hold no photographs of these people, and a generated face —
  photoreal, cartoon, or 3D — would fabricate the appearance of a real,
  named professional. Real headshots are fine with their permission. The
  generated faces in `ProcessBand` are the deliberate exception: generic
  personas standing in for roles, in an exchange the page labels as an
  illustration, carrying no names, numbers or results.
- **Client names are typographic; logos survive in one place only.** The
  `ClientMarquee` on `/services` and `/studio` is a rail of **names**, not
  marks. It carried the real logos until we looked at them at 44px: several of
  these companies only publish a dense lockup or a dark square, so Jenna
  Clifford read as a black box and African Agri Council as three coloured
  dots. A logo wall you cannot read is worse than the words, and this site is
  type-led. Organisation marks remain **only** beside a testimonial, at 64px,
  identifying the speaker. Every list reads from `clients` in
  `lib/testimonials.ts` — the marquee used to keep its own longer copy, which
  is how two records of the same fact drift apart. Always headed **"Work
  delivered for"**, never "trusted by" or anything implying endorsement; never
  in the hero or footer. Trademarks belong to their owners.
- **The tool rail says "the tools we use", and ends on "and more".** It was
  once a stricter claim — every name evidenced by a shipped case study — which
  was true but meant the list could never name something we can do and simply
  have not billed for yet. `ToolMarquee` is now explicitly non-exhaustive. The
  line that still must not be written is an aspirational one: add a tool only
  if someone here has actually run it.
- **One process: identify → build → grow.** Services group into those three
  chapters (`ServiceLifecycle`, `LIFECYCLE_CHAPTERS`). Two things this
  encodes deliberately. **Identity is not a step**: a product and its brand
  ship together, so `brand-and-content` sits under build — the old
  build → identity → grow order is retired, and any copy still implying it
  is a bug. **Identify carries no services**: it is the phase every project
  starts in rather than a line item, so its homepage card links to contact
  and its `/services` column lists what the phase hands over
  (`IDENTIFY_OUTPUTS`) instead of a service list. Automation is not a fourth
  pillar; it sits under grow. The five service slugs and URLs stay as they
  are — the grouping is presentational, and those pages carry real search
  intent. Identify takes the full-saturation ember card on both pages, which
  puts the first step in front.
- **One case anchors one page.** `lib/serviceShowcase.ts` maps each service
  to a work strip and a single case from `lib/proof.ts`. Filosofee spans
  three pillars, so it appears on three pages — but each shows a different
  face of it (the store, the identity, the economics) and never repeats an
  artefact. `CaseProof.kind` distinguishes `client` / `venture` (our own
  business, real customers) / `exploration` (no customers); every surface
  labels which it is.
- **Keep the docs current** — update this file and `docs/REDESIGN.md` after
  meaningful changes.
- **Commit + push after a coherent change** once gates are green. Repo:
  `github.com/fortherestofus/fortherestofusstudio`.
- **Pushing to `main` deploys the live site.** `fortherestofus.app` is a
  Hostinger Node app connected to this repo (`source_type: git`, Node 22,
  `app_type: next`, build script `build`). A push to `main` fires their webhook
  within ~30s and the build takes about two minutes; there is no separate
  deploy step and no `live` branch. Check with the Hostinger MCP
  (`hosting_listJsDeployments` / `hosting_getNodeJSBuildLogsV1`, user
  `u456896547`). Because HTML is served with `s-maxage=300`, the new build can
  take a few minutes more to appear at the edge even after the deploy
  completes — that lag is the cache, not a failed deploy.

## Stack

- **Next.js 16 App Router** (`app/`), React 19, TypeScript, **Tailwind 3**
  (`tailwind.config.ts`), `next-themes` for light/dark (manual toggle,
  `enableSystem: false`, light default).
- **Bundlers differ between dev and build, deliberately.** `next dev` uses the
  Next 16 default (Turbopack); `next build` is pinned to **`--webpack`** in
  `package.json`. That flag is load-bearing for production: the Hostinger build
  container ships an old glibc, so Next's native SWC binary cannot load there
  (`GLIBC_2.29 not found`) and it falls back to `@next/swc-wasm-nodejs`. Webpack
  tolerates that fallback; a native-Rust bundler has nothing to fall back to.
  The deploy log is full of those SWC warnings on every successful build — they
  are expected, not a regression. There is still no webpack *config* file, and
  adding one is a separate question from the flag.
- React's `react-hooks` rules run at **error** level via `eslint-config-next`,
  including `set-state-in-effect`. Don't reach for `useEffect` + `setState` to
  derive state: adjust it during render, or use `useSyncExternalStore` to read
  an external source (see `components/ui/DarkModeToggle.tsx`).
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
- **Image optimisation is on** (AVIF, then WebP), which server mode allows —
  `sharp` resizes on demand and Next caches the result. Two things this ties us
  to: the production install must keep optional dependencies (sharp is one), and
  `output: "export"` would disable optimisation entirely, so that switch means
  restoring `images: { unoptimized: true }` or wiring a custom loader. Always
  render raster art through `next/image`; SVGs pass through untouched.
- No backend of its own — the site is content-only. App backends live in their
  own repos (payments/giving run through the apps, not this site).

## Design system

**The system is monotone, with one sanctioned exception.** Warm off-white
canvas, ink type, ink buttons. Colour enters a page only through *imagery*,
through an app's own accent on that app's pages, and through the **tint
family** (`--tint-amber/olive/rust/lime` + `-deep` text partners, both
themes) — soft washes derived from the four app accents, allowed **only**
on the story chapter-card grids (use cases, services), the closing scatter,
and the **stat cards** (`/contact` hero, `StatBand` on `/studio`). Those two
are the deliberate extension: a real, sourced number is the one other thing
on this site that has earned a block of colour, and both replaced generated
still lifes that were carrying none. Everywhere else there is no
section-level brand colour and no pastel washes. `--color-accent` is a
restrained ember kept for small live moments (focus rings, hover, status
dots) — never a background.

Tokens live as CSS variables in `app/globals.css` and are mapped to Tailwind
colors in `tailwind.config.ts`. Use tokens, never raw palette hex.

- Surfaces: `bg` (cream canvas), `surface` (white cards), `sunken` (section
  tint / wells), `ink-surface` + `ink-raised` (dark blocks and footer).
- Text: `ink`, `muted`, `faint`; on dark: `ink-text`, `ink-muted`.
- Accent: `accent` (fills, hairlines), `accent-soft` (washes), `accent-ink`
  (text on a solid accent fill), **`accent-deep`** (text and icons on a pale
  wash — always use this for accent-coloured text; raw `accent` fails contrast
  on light surfaces).
- **Vertical rhythm.** Section padding is the *only* thing that spaces
  sections, and adjacent paddings stack — `md` (`py-12 sm:py-16`) means a
  128px boundary on desktop, not 64. Keep internal spacing visibly smaller
  than the boundary (`mt-12` max for a major break inside a section, `mt-8`
  after a heading) so proximity still reads. Before adding vertical space,
  measure the real gap rather than guessing: the old layout had 192px
  boundaries plus 64px internal margins and read as broken.
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
photography until real assets exist.

**Screenshots are statically imported** in `lib/apps.ts` (from
`public/screenshots/`), not referenced by path string: a missing file breaks
the build, and each image carries its intrinsic dimensions so story-band
frames take the screenshot's own aspect ratio exactly — never letterboxed,
never cropped. Only the detail-page hero crops, deliberately, at the fold
(bottom-only via `object-top`). Frame shapes: `phone`, `browser`, and `panel`
(the extension popup, ~3:4).

**No simulated UI anywhere.** `components/services/Vignettes.tsx` (miniature
product UI built in HTML/CSS) was retired: every service page now opens on a
real artefact of what that service actually sells, via `heroArtefact()` in
`app/services/[slug]/page.tsx`. A vignette on every page regardless of
subject — a voice-and-palette card heading the automation page — was the
mismatch that killed it. Real screenshots or nothing.

**Two ways to make contact, and the booker is the heavy one.**
`/contact` offers email and a cal.com booking; both URLs live in
`lib/contact.ts` and point at Alroy's own Cal account, so the booker shows his
name. `components/contact/CalBooking.tsx` carries the traps that cost real
time to find, and the comments in it are load-bearing: the embed is not
requested until the section is nearly in view; the theme goes in the iframe's
**query string** as well as through `ui` (theme by postMessage alone is the
white flash everyone reports, and `ui.color-scheme` is separately needed or
the iframe canvas stays white); the frame uses `min-height` and **never**
`height`/`overflow`; the fallback anchor is absolutely positioned so it adds
no height, is a real working link, and retires only on Cal's `linkReady`.
Colours are read from our tokens at call time and re-sent on a theme flip —
one frame later, because next-themes swaps the class from a parent effect.
The paid consultation is a **panel below the embed**, not a second event type
inside it: pointing Cal at the profile page does list both, at the cost of a
"choose an event type" step in front of the free intro call, which is the
action the page exists for.

**`/studio` says who we are, and stops there.** It does not restate the
three-step lifecycle (that is `/services`) and does not list the products
(that is `/apps`) — both were verbatim repeats that made the page the longest
on the site while adding nothing. What it does carry: the studio's argument,
three pieces of real craft beside it (a wordmark, foiled cards, a
photograph — the hand-made end of the work, because everywhere else is
screens), the `StatBand` as the seam between the studio and the person, Alroy,
and then who the work was for and what it was built with.

**Every section must earn its place.** Before adding one, ask what it proves
that its page does not already prove. The service detail pages carry no
process strip and no "other things we do" grid: both repeated `/services`
verbatim, and a detail page's job is depth on one subject, not a second
menu. `/services` alone carries the process and the full pillar list.

**Websites is filmed, not photographed.** `builtSites` in `lib/work.ts`
holds click-to-play walkthroughs (Filosofee, Festival of Eventing, Deja
Media); a still frame of a website says almost nothing about it. The page
says there are more and points at contact rather than padding the list. A
storefront product photo is not a website — do not put one in that strip.

**Territories.** Cards belong to the studio side (home, services). App pages
are editorial: full-bleed alternating bands, big type, screenshots bleeding off
the outer edge, a hairline spec strip, no card stacks. Keeping each language in
its own territory is what stops the site reading as two designs.

**The apps index is an app surface, not a studio one.** `/apps` used to be a
grid of four `AppCard`s on a tray, which broke the rule above and — worse —
showed four icons on the one page whose entire subject is four products. It is
now four `AppBand`s in the same editorial language as the detail pages:
problem line as the headline, real screenshot bleeding past the outer edge,
hairline spec strip, the app's own accent washed behind its frame. Phone apps
get a **staggered pair** of screenshots; one 290px handset in a 700px column
strands 400px of air, and flush handsets read as a comparison rather than a
product. `AppCard` survives only for the detail pages' "other apps" grid.

## Layout

- `app/page.tsx` — home; `app/apps/` — apps index; `app/apps/<slug>/` —
  per-app pages (`caught-slipping`, `hakkan`, `inspiritintruth` incl. giving +
  giving-faq, `tapa` incl. privacy + terms); `app/services/` and
  `app/services/[slug]/` (five SEO detail pages from `lib/services.ts`);
  `app/studio/`, `app/contact/`; `app/not-found.tsx`, `app/sitemap.ts`,
  `app/robots.ts`.
- `components/` — `home/` (the story chapters: Hero + HeroArtefact,
  WhyChapter, UseCasesChapter, ServicesChapter, ProcessChapter (client,
  state timeline), ProofChapter, CallToAction with scatter), `apps/`
  (AppDetail, AppBand, AppStorySection, AppJsonLd…), `layout/` (Navbar, Footer,
  PageHero), `legal/`, `contact/` (CalBooking), `studio/` (StatBand),
  `services/`, `ui/` (the kit: PillButton,
  EyebrowChip, Section, Card/Well/VignetteCard/IconCard/ProcessStrip,
  ChapterMark, TestimonialQuote, CaseProofCard, PlaceholderBlock, Badge,
  AppCard, Icon).
- `lib/apps.ts` (incl. per-app `problem` line), `lib/services.ts` (incl.
  `lifecycle` + `LIFECYCLE_CHAPTERS`), `lib/proof.ts` (real result stats,
  sourced), `lib/studio.ts` (founder note + portrait), `lib/testimonials.ts`,
  `lib/contact.ts` (emails + cal.com links), `lib/cn.ts`.
- `public/` — icons (`/icons/[slug].png|svg`), screenshots
  (`/screenshots/[slug]-[view].jpg`, statically imported by `lib/apps.ts`),
  OG images.

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

`next dev` and `next build` can now run at the same time — since Next 16 dev
writes to `.next/dev` and the build to `.next`, so they no longer clobber each
other's cache. A lockfile stops two `dev` (or two `build`) runs on the same
project instead. If the cache ever does look corrupt, `rm -rf .next` and restart.

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

## Copy rules (audit, Aug 2026)

- **No em dashes in user-facing copy.** They were the house punctuation and
  the most consistent AI tell on the site (~180 instances). Use a colon when
  the second half explains the first, a full stop when it is a new thought,
  commas for a parenthetical. Comments in the source may keep them. The one
  survivor is "IFC — International Finance Corporation" in
  `lib/testimonials.ts`, which is the organisation's own name.
- **The honesty line lives on `/contact` only.** "Tell us X and we will tell
  you honestly Y" was on six surfaces and read as a template. Elsewhere the
  CTA says what actually happens next ("We will come back with scope, time,
  and cost").
- **One quip per page, not five.** The voice keeps its wit — "A tiger,
  obviously", the CaughtSlipping verdicts — but rule-of-three fragments,
  "not X but Y" antitheses, and punchline-fragments were stacking up. Thin
  them; do not purge them.
- **Say it once.** Four sentences were duplicated verbatim across pages
  ("we would rather you could leave…", "Launch is the middle", "wherever they
  genuinely remove work", "whether there is a project here"). Each now has one
  home. Before reusing a good line on a second surface, change it or cut it.
- **Lead with the symptom, not the service.** Buyers search "why is my
  website not converting", not "conversion rate optimisation"; and every
  high-intent query is a cost query. Page copy should name the problem in the
  reader's words before naming what we sell.
