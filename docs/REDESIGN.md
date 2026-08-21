# ForTheRestOfUs — Website Redesign Plan

Direction: from "app studio landing page" to a **solutions studio** — we build our own
apps AND we build/consult for others. Clean, light, editorial-SaaS look per
`Design Reference/IMG_7712.JPG` (Opero-style: cream canvas, rounded cards, one warm
accent, black pill CTAs, dark closing block + footer).

Status legend used below: [ ] todo · [x] done. Update this file as phases complete.

---

## 1. Positioning & messaging

**Who we are.** A solutions studio run by Alroy Ndhlovu (Johannesburg, South Africa).
Two arms that feed each other:

1. **We build** — custom apps, SaaS, websites. Our own products (CaughtSlipping,
   InSpiritInTruth, tapa., Hakkan) are the proof we can ship.
2. **We advise** — product-management consulting: digital marketing, design &
   content direction, business tech & automation.

**The resolve-the-duality sentence** (Big Human pattern — "for businesses, non-profits,
and our own startups"):

> We design and build digital products — for our clients, and for our own ideas.

**Hero headline candidates** (two-line, second line muted, per Design Reference):

- "We build apps for the rest of us. / And help you ship yours."  ← recommended
- "An ecosystem of solutions / that support each other."
- "We build. We advise. / Products people actually use."

**Trust model (no client logos yet).** The Iconfactory "we walk the walk" pattern:
our shipped/in-build apps ARE the credentials for the consulting arm. Support with:

- Honest stats band: "4 products in build · 1 studio · Johannesburg" (real numbers only).
- Named process (3–4 steps) — signals operational maturity.
- Founder-forward: Alroy's name, photo (placeholder for now), location, direct email.
- Never fake testimonials, logos, or download counts.

**Copy rules** (adopted from Hakkan's `docs/COPY.md` — they fit the studio voice):
second person, active voice, short sentences, verb-first buttons, concrete numbers
over vague claims. No em dashes in site copy, no exclamation marks, no
"unlock/supercharge/seamless/empower/delve".

---

## 2. Design system (the new look)

The Design Reference and Hakkan's marketing system converge on the same language.
We adopt it as the studio system so every fortherestofus surface matches.

### Tokens (CSS vars in `globals.css`, mapped in `tailwind.config.ts`)

| Token | Light | Notes |
|---|---|---|
| `--bg` | `#F7F5F0` | keep current offwhite (matches Hakkan cream) |
| `--surface` | `#FFFFFF` | cards |
| `--surface-sunken` | `#EFECE4` | section tints, input wells |
| `--ink` | `#16150F` | text + black pill buttons + dark blocks |
| `--muted` | `#6E6A5E` | secondary text, muted headline line 2 |
| `--border` | `#E7E3D8` | hairlines |
| `--accent` | `#C4552F` | restrained ember, small live moments only |
| `--accent-soft` | `#F4E7DE` | rare washes |
| `--accent-deep` | `#A8431F` | accent text/icons on light surfaces |

> **Superseded (v2).** The system is now **monotone**: there is no
> section-level brand colour. Colour enters a page only through imagery and
> through an app's own accent on that app's pages. The accent above is kept
> for focus rings, hover, and status dots — never a background or a section
> fill. Pastel washes were removed entirely.

- **Dark mode**: keep the `next-themes` toggle; dark tokens become ink-canvas
  (`bg #121210`, `surface #1B1A16`, borders `rgba(247,245,240,.1)`). Everything is
  CSS-var driven so this is cheap. Light stays the default.
- **Per-app accent** stays in `lib/apps.ts` and overrides `--accent` (+ a computed
  soft wash) on app detail pages only — see §5.
- Radii 12/16/24/full; 4px spacing grid; content max-width 1200px.
- Kill the pthalo/forest green palette everywhere except where an app accent uses it.

### Typography

- **Apfel Grotezk (self-hosted)** via `next/font/local` — Regular 400 + Mittel 500
  from `fonts/` (already in repo, currently unused). This is the studio brand face
  per AGENTS.md and what Hakkan uses.
- Remove all three Google fonts (Fraunces, Inter, DM Sans). Serif display is gone —
  the new look is grotesk-only, big sizes, tight leading.
- Numerals/mono moments (stats, step numbers 01. 02. 03.): system mono stack
  (`ui-monospace, SFMono-Regular, Menlo, monospace`) — no Google-hosted fonts.

### Components / motifs (from the Design Reference)

- Eyebrow chips: small rounded outline pill above each section headline
  ("Features", "Advantage" style).
- Black pill primary CTA with circular arrow chip; ghost/outline secondary.
- White rounded cards on cream; card groups inside a slightly sunken rounded well.
- Feature cards: small rounded icon tile + title + 2-line description + "Learn more →".
- Numbered step cards with big mono numerals on soft pastel washes.
- One **dark ink moment** near the page end (CTA block) + dark footer. Max two dark
  moments per page, never in the same viewport.
- Grain: keep the existing `.grain` utility but only on placeholder blocks and the
  dark CTA — the canvas itself stays flat and clean.

### Placeholder system (user-approved)

New `ui/PlaceholderBlock.tsx`: colored grainy gradient blocks (accent-tinted
gradient + `.grain` overlay + optional label), with aspect-ratio presets
(`phone` 9:19.5, `browser` 16:10, `square`, `portrait` 4:5). Used for app
screenshots, studio photos, and service illustrations until real assets exist.
Existing `PlaceholderIcon`/`PlaceholderImage` get restyled to match.

### Motion policy

Calm > clever. Framer-motion `whileInView` fade/rise reveals with stagger, subtle
hover lift on cards. **Remove**: WebGL shader (`@shadergradient/react`, `three`,
`@react-three/fiber`), GSAP (hero timeline, chat vignette, scroll counters — the
counter can be a small framer-motion count-up or static), 3D card tilt, dock
magnification in the navbar. This drops the heaviest dependencies in the tree and
clears the path for a CSP later. All remaining motion respects reduced-motion.

---

## 3. Information architecture

Research consensus for hybrid studios: two clean buckets — "things you can use"
vs "things you can hire us for" — plus About and Contact. 4–6 nav items max.

```
Nav:  Apps · Services · Studio · Contact          [Start a project]  ← black pill
```

Route map (new/changed marked):

| Route | Status | Purpose |
|---|---|---|
| `/` | rebuild | Solutions-studio home (see §4) |
| `/apps` | **new** | Apps index: all four apps as cards + short "why we build" intro |
| `/apps/caught-slipping` | restyle | keep content, new template + gold theming |
| `/apps/inspiritintruth` (+ giving, giving/faq) | restyle | keep, lime theming; giving copy untouched (voluntary-gift rules) |
| `/apps/tapa` (+ privacy, terms) | restyle | keep, terracotta theming |
| `/apps/hakkan` | **new** | Hakkan listing, acid-yellow theming (see §5) |
| `/services` | **new** | The consulting + build-for-you arm (see §4) |
| `/studio` | **new** | About: story, Alroy, principles, honest stats |
| `/contact` | **new** | Email + (later) book-a-call embed |
| legal pages (CS privacy/terms, tapa privacy/terms) | restyle | `LegalDocument` re-skin only |
| `not-found.tsx`, `sitemap.ts`, `robots.ts` | **new** | currently missing |

Footer (dark, per reference): brand block + one display line, columns for Apps
(from registry), Services, Studio, Connect (real social URLs or drop the icons —
no more `href="#"`).

---

## 4. Page blueprints

### Home `/`

Section order mirrors the Design Reference composition:

1. **Hero** — eyebrow chip ("Solutions studio · Johannesburg"), two-line grotesk
   headline (line 2 muted), one-sentence sub (the duality sentence), black pill
   "Start a project" + ghost "See our apps". Right/below: a collage of app-card
   frames (real app icons + PlaceholderBlock screenshots) replacing the old
   HeroAppChat vignette.
2. **Proof strip** — restyled marquee: the four app icons + names, monochrome-ish,
   "Built and shipped by this studio" microcopy. (Replaces logo-cloud row from the
   reference — our apps are the logos.)
3. **Apps — "Built by us"** — eyebrow + headline ("An ecosystem of solutions that
   support each other."), 4 app cards (icon, name, tagline, status chip, accent
   hairline) inside a sunken well. CTA → `/apps`.
4. **Services — "Built with you"** — 2×2 or 1+3 card layout: Custom apps & SaaS ·
   Websites · Product & growth consulting (marketing, branding, content) · Business
   tech & automation. Each card: icon tile, benefit statement, "Learn more →" to
   `/services` anchors.
5. **Process** — 3 numbered step cards on pastel washes (mono numerals):
   01 Understand → 02 Build → 03 Grow. One line each.
6. **Studio band** — honest stats (4 products in build · 1 studio · ZA) + founder
   card (photo placeholder, name, one-line bio) → `/studio`.
7. **Dark CTA block** — "Have an idea worth building? Let's talk." black rounded
   full-width block, pill CTA, subtle grain.
8. **Dark footer.**

### Services `/services`

ustwo's engagement-shaped model + thoughtbot pillars, adapted:

1. Positioning line: "Product help for the rest of us." + sub: strategy to shipped.
2. **Build offers** (what we make): Custom apps & SaaS · Websites — each with
   what's included and "from" framing (pricing stays conversational; a productized
   entry offer, e.g. a fixed-price website sprint or automation audit, can be added
   later once Alroy sets numbers — leave a slot for it).
3. **Advise offers** (product management): Marketing & growth direction · Brand,
   design & content direction · Business tech & automation. Benefit statements,
   not feature lists.
4. **Process** — same named 3-step process as home, expanded one level.
5. **Proof** — "We walk the walk": compact strip of the four apps linking to `/apps`.
6. CTA: "Tell us what you're building" → `/contact` + direct email link.

Content lives in a new `lib/services.ts` registry (same philosophy as `lib/apps.ts`:
pages render from data, no per-page copy edits).

### Apps index `/apps`

Short intro (why we build our own products), 4 cards, each with status chip.
Per-card accent tint. SEO: collection page metadata.

### Studio `/studio`

Story (evolved from current StudioIntro/StudioStory copy), principles (3 cards —
borrow the honesty ethos: "Receipts, not vibes" energy but studio-flavored),
founder section (Alroy — builder + product/growth consultant; Innovatr background
can inform the copy), stats, CTA.

### Contact `/contact`

Keep it 2 paths: primary "Email us" (standardize on `hello@fortherestofus.app`;
note: CaughtSlipping legal currently uses `hello@alroyndhlovu.com` — Alroy to
confirm which is canonical before we sweep it) + slot for a Cal.com/Calendly
"Book a call" embed when Alroy has one. No multi-field form.

---

## 5. App pages: keep, restyle, theme + add Hakkan

**Template** (`AppDetail` and friends) is restyled, not rebuilt: hero gets a
low-saturation accent wash over cream, icon on a soft accent tile, status chip,
black pill CTA. Screenshots section uses PlaceholderBlock until real captures
exist. Features become reference-style cards (icon tile + title + description) in
a sunken well. Spec `<dl>` becomes a clean bordered card. "More apps" and legal
links keep working.

**Per-app theming rule** (research-validated): global background/surface/type/black
pills never change; only the accent slot varies. Accent drives: hero wash, icon
backdrop, chips/eyebrows, feature icon tiles, screenshot frames, hover states.
Implementation: the app layout sets `--accent` / `--accent-soft` inline from the
registry; components consume tokens instead of hex-concatenation
(`${accentColor}1f` string-alpha usage in 5 components gets replaced).

**Registry changes** (`lib/apps.ts`):

- Add optional `accentInk` (readable text-on-accent color) and `accentSoft` fields.
- Add **hakkan** entry:
  - name: Hakkan · category: Research & Content · platform: Web
  - tagline: "Worth listening to." · hero line: "We do the searching. You do the leading."
  - shortDescription: research across social + the web → cited report → thought
    leadership in your voice. Features (6–7): 18+ platform research sweep ·
    receipts on every claim · report tabs (themes, voices, angles) · 8 content
    formats · voice personas · Topic Radar · AI Visibility.
  - status: Beta ("private beta, launching soon" — do NOT say launched)
  - price: "Free trial · from $39/mo" (3 full studies free, no card)
  - accent: `#D8F34E` with `accentInk: #3A4409` (acid works as wash/chip fill with
    dark ink text — never colored text on white)
  - cta: "Join the beta" → https://hakkan.app (or waitlist anchor until live)
  - legal: external links to hakkan.app/privacy and /terms (extend registry to
    allow external legal URLs)
  - icon: none exists as an image — export the H brand-mark (ink rounded square,
    white H) to `/public/icons/hakkan.png` (recreate as SVG→PNG; the mark is a
    code component in the Hakkan repo, `components/marketing/brand-mark.tsx`).
- Existing three entries: copy stays as-is (already accurate per app repos).

**JSON-LD**: extend the CaughtSlipping `SoftwareApplication` pattern to all four
app pages via a shared helper (fixes current inconsistency).

---

## 6. Technical cleanup (bundled into phases)

- [ ] Remove deps: `@shadergradient/react`, `three`, `@react-three/fiber`, `gsap`.
- [ ] `next/font/local` for Apfel Grotezk; delete Google font imports.
- [ ] Shared metadata helper for app pages (kills the ~25-line copy-paste blocks);
      keep explicit page folders (legal subpages differ per app).
- [ ] Fix canonical/trailing-slash inconsistency (site uses `trailingSlash: true`;
      canonicals and registry paths must match).
- [ ] `sitemap.ts`, `robots.ts`, `not-found.tsx` (styled 404).
- [ ] Resize `/public/icons/tapa.png` (960 KB serving a 22px slot) + delete the six
      unused/duplicate icon files.
- [ ] Per-app OG images (accent-tinted template) — placeholder-block style is fine.
- [ ] Reduced-motion: all remaining motion gated (the old card tilt gap dies with
      the tilt itself).
- [ ] After shader removal: attempt a baseline CSP in `next.config.ts` (the blocker
      cited in comments was WebGL + inline styles; inline `style` for accent vars
      still needs `style-src 'unsafe-inline'` — acceptable v1).
- [ ] Footer socials: real URLs from Alroy or remove icons.
- [ ] Update `AGENTS.md` (new IA, services registry, design tokens) at the end.

---

## 6b. v2 design pass (after client review)

Seven critiques drove a second pass. What changed and why:

1. **Services section** rebuilt to the reference exactly — a sunken well with
   one row of cards carrying CSS mini-UI vignettes, then a quieter icon row.
2. **Apps shown once.** The marquee proof strip was saying the same thing as
   the apps grid; it is gone, and app cards gained their own artwork slot.
3. **App pages went editorial** — alternating full-bleed bands, big type, real
   screenshot slots, a hairline spec strip. No card stacks.
4. **Nav** is a plain transparent bar that gains blur and a hairline on scroll.
5. **Process** shrank from a pastel card section to a slim numbered strip.
6. **Studio page** rewritten around Alroy's real background, clients, and
   testimonials. Stat cards deleted.
7. **Services link to five real pages** (`/services/[slug]`) built for SEO.

**Hero direction (researched).** Floating avatar clusters were rejected: only
three testimonials exist, none have photographs, and the quotes are personal
praise rather than outcome claims — the pattern's payload is "there are many of
us", which we cannot honestly supply. Placeholder rectangles standing in for
screens that do not exist were also rejected as the simulated-UI problem in
another form. The hero instead shows **the studio's own app marks as objects**:
real finished assets, and the only colour on the page. Client names appear as
text under the heading "Featured engagements" — describing work done rather
than claiming endorsement, and avoiding trademark use.

**Outstanding:** written permission before any client logo is reproduced as a
mark; real screenshots and a studio portrait; per-app OG images; JSON-LD for
all four apps; a CSP attempt.

## 7. Progress

- [x] **Phase 1 — Foundation.** Tokens, Apfel Grotezk via `next/font/local`,
      removed shader/three/gsap, UI kit, Navbar + Footer, rebuilt home page.
- [x] **Phase 2 — Pages.** `/apps`, `/services`, `/studio`, `/contact`, 404,
      restyled app detail template, per-app accent scoping, Hakkan page.
- [x] **Phase 3 — Polish.** Legal + giving pages restyled, `accent-deep`
      contrast token, dark-mode and mobile pass, hydration fix in the theme
      toggle, `sitemap.ts` + `robots.ts`, trailing-slash canonicals, image
      cleanup (icons 5 MB → 392 KB), AGENTS.md rewritten.

Remaining (see §8 and the checklist in §6): per-app OG images, JSON-LD for all
four apps, CSP attempt, real screenshots and studio photography, and the open
items awaiting Alroy.

## 7b. Original phase plan (for reference)

Each phase ends green on `npx tsc --noEmit` + `npm run lint` + `npm run build`,
a dev-server visual check (light + dark, mobile + desktop), then commit + push.

**Phase 1 — Foundation** *(the look)*
Tokens + Tailwind config, Apfel Grotezk local fonts, dependency removals, base UI
kit (PillButton, EyebrowChip, SectionShell, Card, StepCard, PlaceholderBlock,
restyled Badge/Icon), redesigned Navbar (simple links + pill CTA) and dark Footer.
Site will look half-old for one commit; that's fine on this branch.

**Phase 2 — Home** — rebuild `app/page.tsx` sections per §4 blueprint; delete
HeroAppChat, ShaderGradientBg, EditorialVisual (or re-skin as placeholder art).

**Phase 3 — Apps** — registry extensions + Hakkan entry + icon export; restyle
AppDetail template with token-based theming; new `/apps` index; re-skin
LegalDocument + giving pages (copy untouched).

**Phase 4 — Services + Studio + Contact** — `lib/services.ts`, three new pages
per blueprints.

**Phase 5 — Polish & ship-ready** — SEO (sitemap/robots/OG/JSON-LD), 404, image
cleanup, CSP attempt, reduced-motion + a11y pass (contrast check on accent uses),
AGENTS.md update, full QA sweep, merge to main.

Estimated shape: 5 working sessions, each independently shippable on this branch.

---

## 8. Open items for Alroy (non-blocking, defaults chosen)

1. **Canonical contact email** — defaulting to `hello@fortherestofus.app`
   everywhere except CaughtSlipping legal (left as-is until confirmed).
2. **Studio accent** — defaulting to Design-Reference orange `#EE5B2E`. Say the
   word if you'd rather use a different studio color.
3. **Social URLs** for the footer (Instagram/TikTok currently `#`).
4. **Book-a-call link** (Cal.com/Calendly) for `/contact` — email-only until provided.
5. **Productized offer pricing** on `/services` ("from" prices) — copy slots exist,
   numbers omitted until you set them.
