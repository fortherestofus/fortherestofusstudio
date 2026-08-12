# Redesign v3 — the story site

Supersedes the plan in `REDESIGN.md` (v1/v2, which stays as the record of the
current build). Goal: rebuild the site as **one story told down the page** —
the "why" — instead of a stack of sections. Brief from Alroy (Aug 2026):

> We build products and solutions because they solve real world problems.
> Every product needs identity (look and feel). Every product needs to be
> known (marketing). Our why is a passion to solve real world problems by
> building custom products/solutions, giving them identity, growing their
> visibility. Process: identify → formulate/build → maintain/grow.
> Methods: business tech / AI / automation / process optimisation.

Design reference: `Design Reference/Forth · Your city has plans for you.html`
(+ `Website Screenshot.jpg`) — the Forth waitlist site. We borrow its
*storytelling mechanics*, not its content. Design language (Apfel, monotone
tokens, ink pills) stays — with a controlled dose of colour ("pop") added.

---

## 1. What makes the reference work (analysis)

Anatomy of the Forth page, top to bottom:

| # | Section | Mechanic worth stealing |
|---|---------|-------------------------|
| 1 | Hero — "Your city has plans for you" | Descriptive promise + *one* floating product card + real social-proof line under the CTA |
| 2 | "A reason to leave the group chat" | Names the visitor's problem first, then three mini-beliefs, each proven by a tiny piece of real UI. Chapter number ("01 / 05") |
| 3 | "This week in Dubai" | **CUT** (per brief) — live inventory board |
| 4 | "Plans, without the planning" | Toggle (Discover/Host) + four numbered feature cards in tints (lilac / orange / lime / ink) |
| 5 | "From discovered to confirmed" | A three-state timeline with timestamps, paired with a phone mock that changes state as the story advances |
| 6 | "Built so you can just turn up" (dark) | Trust section: photo + four worry-killers, each with a micro-artefact (verified host card, capacity meter, address reveal, report chip) |
| 7 | "Launching city by city" | **CUT** (per brief) — roadmap + waitlist + FAQ |
| 8 | "Good people. Actual plans." (dark) | Closing block: scattered real photos + event chips orbiting one CTA. Warm, human, single ask |
| 9 | Footer (light) | — |

Why it reads as a story: **every claim sits next to its proof artefact**;
sections are numbered like chapters; there is exactly one problem statement
and one promise; colour appears only as a small tint family on an otherwise
monotone off-white/ink system (lilac `#DCE1FF`, peach `#F7E2DB`, lime
`#C8E64C`/`#DBEAA9`, rust `#C93A14` — strikingly close to our own tokens).

## 2. What the copy research says (best-performing sites)

Synthesis from MetaLab, Clay, ustwo, Instrument, Koto, Ramotion, Fantasy,
BASIC/DEPT, Basecamp/37signals, Linear, Stripe + StoryBrand / Golden Circle /
Julian Shapiro's landing-page rules:

1. **Descriptive hero, poetry second.** If a visitor reads only the H1 they
   must know what we sell. The "why" is the *second* beat, not the headline.
2. **Belief block right after the hero** ("We believe X, that's why Y") —
   Linear's pillars, 37signals' manifesto. This is where the Golden Circle
   lives on a page.
3. **Problem-first framing** (StoryBrand): the client is the hero; open with
   *their* situation, not our passion. We are the guide with a plan.
4. **Claim-then-show interleaving** (Linear/Stripe): no claims section and a
   separate gallery — every claim is followed immediately by real UI or a
   real number. Never let a claim travel more than one scroll from evidence.
5. **Process as named chapters** — the lifecycle IS the page spine.
6. **Depth over breadth in proof** (Fantasy): feature one worked example,
   list the rest compactly. Grids read as inventory; one story reads as
   confidence.
7. **Distribute testimonials** next to the claims they verify — inline quotes
   outperform a testimonial wall. One early (near hero), one mid-proof, one
   at the decision moment (closing CTA).
8. **The founder letter** (Basecamp): a short signed note mid-page. For a
   one-person studio this is the highest-leverage pattern — it turns "small"
   into the differentiator.
9. **Soft, verb-first CTA laddering**: exploratory CTAs mid-page ("See the
   apps"), the single business ask ("Start a project") once, after proof.
10. **Why studio sites feel "all over the place"**: everything-for-everyone
    positioning, two visual grammars colliding, beliefs with no adjacent
    proof, and padded/unattributed metrics. Fixes: one spine (the lifecycle),
    services *and* apps presented as evidence of the same story, and only
    real, named, quantified proof.

## 3. Messaging foundation

- **Positioning line (internal):** FTROU is a one-person solutions studio
  that takes real-world problems through a product lifecycle: **identify the
  problem → build the product → give it identity → grow its visibility** —
  for clients, and for its own ideas.
- **Two arms, one story (Alroy, Aug 2026 refinement):** FTROU *builds*
  custom products/solutions AND is a **services/consulting** business
  (custom products/solutions · branding/identity · marketing/analytics,
  powered by business tech/AI/automation). External language is
  **services / consulting — never "advice"/"advise"**. The internal
  `arm: "advise"` value and every "We advise" eyebrow must be renamed.
- **Apps are use cases, not portfolio.** We never present the apps as
  "look what we built". Each app is told **problem-first** — a worked
  answer to "why would anyone build a product for this?" (Hakkan: AI
  content nobody can trust → research-first content worth listening to;
  tapa: "what can I cook with this?"; CaughtSlipping: catching yourself
  slipping into distraction; InSpiritInTruth: faith content that isn't
  personal). They are evidence for the thesis, and the same thesis is the
  pitch for building a client's product.
- **The three beliefs** (Alroy's words, polished — these are the "why"
  chapter and also the service architecture):
  1. Every product starts as a **problem worth solving** (build).
  2. Every product needs an **identity** (brand, look and feel).
  3. Every product needs to be **known** (marketing, analytics, growth).
- **Process rename:** `PROCESS_STEPS` becomes **Identify → Build → Grow**
  (currently Understand → Build → Grow; copy bodies largely survive).
- **Methods** (how): business tech, AI, automation, process optimisation —
  presented as the toolbox inside the lifecycle, not a separate pillar.
- **Voice:** unchanged (second person, active, short sentences, verb-first
  buttons, concrete numbers, no unlock/seamless/empower). Borrow the
  portfolio's signature honesty ("built rather than just recommended",
  every case study ends with what didn't work).

### Real proof available (from the portfolio repo — no invention needed)

- **Studio stats:** 12+ years, 1,200+ projects/clients. Engagements: Meta,
  IFC — World Bank Group, Digify Africa, Energy Capital & Power, African
  Agri Council, Jenna Clifford, Innovatr, Thrifty Adventures.
- **Thrifty Adventures (client, growth):** 742 leads at ~R30; 4.91M
  impressions; CPM −81%; 0.97% CTR vs 0.52% benchmark.
- **Innovatr (client, full lifecycle):** rebrand + site rebuild + content
  engine + paid + CRM; R252 CPL vs ~R744 median; 61% of ad delivery reached
  decision-makers; built Social Sweep, replacing a US$8,000/yr licence.
- **Own products:** the four apps (with the caveat that Hakkan is private
  beta and nothing may be described as launched).
- **Testimonials:** the three real quotes already in `lib/testimonials.ts`
  (Kelly-Ann Ayuk, Hermione Nevill, Devi Paulsen-Abbott).
- **Portrait:** real headshots exist in the portfolio repo
  (`alroyportfolio/site/src/assets/images/Alroy-Ndhlovu-FOE.jpeg` + one
  alternate) — can finally replace the "Portrait — to be supplied"
  placeholder (pending Alroy's choice of shot).

## 4. The new homepage — chapter by chapter

Six numbered chapters ("01 / 06" chapter marks) + an unnumbered closing
block. One dark ink moment (the closing block) + dark footer = ink budget
respected. Arc: promise → why → use cases (our apps as proof of the why) →
services/consulting (we do this for you) → process → client proof + founder
→ one ask.

### 01 · Hero — the promise
Forth mapping: hero. Descriptive H1 with the lifecycle compressed into it.
Direction (copy to be finalised in build):

> **Products that solve real problems.**
> *Built. Given a face. Grown.* (muted second line)

Sub: apps, SaaS and websites — for clients and for our own ideas — plus the
brand, marketing and automation thinking around them. CTAs: **Start a
project** (ink) + **See the work** (ghost). Under the CTAs, a real-proof
line (12+ years · 1,200+ projects · Meta, IFC, Digify Africa…). Right side:
slim today's five-tile collage down to **one floating artefact** like
Forth's match card — a live app card (Hakkan browser tile or the campaign
KPI tile), subtle float, reduced-motion safe.

### 02 · The why — "the problem you've learned to live with"
Forth mapping: "A reason to leave the group chat". Open with the *client's*
problem, one honest paragraph (candidate: good ideas don't die from bad
code — they die in handoffs between four different agencies). Then the
**three beliefs**, each with a real micro-artefact beside it:

1. *Problem worth solving* → a problem→product pair (tapa: "What can I cook
   with this?" card next to the recipe screen).
2. *Needs an identity* → brand artefact (the four app icon tiles, or an
   Innovatr before/after pair).
3. *Needs to be known* → a real campaign numbers card (Thrifty: 742 leads at
   ~R30, 4.91M impressions — real, attributed).

One early testimonial (Kelly-Ann's "Swiss army knife" line) closes the
chapter as the first trust marker.

### 03 · Use cases — "problems we couldn't leave alone"
*(Supersedes the earlier toggle idea, per Alroy's refinement: the apps are
not "what we built" — they are worked answers to "why would anyone build a
product for this?")* Forth mapping: the numbered tinted card grid from
"Plans, without the planning". Four cards in the Forth geometry, each
washed in its app's own accent, each **problem-first**:

- 01 (amber) — *You know you're doomscrolling. Nothing calls you out.* →
  **CaughtSlipping**, the extension that does.
- 02 (olive) — *Faith content is generic. Your walk isn't.* →
  **InSpiritInTruth**, devotionals that know where you are.
- 03 (rust) — *It's 6pm and you're staring into the fridge.* → **tapa.**,
  "what can I cook with this?"
- 04 (lime) — *AI made content cheap. And worthless.* → **Hakkan**,
  research-first content worth listening to.

Card anatomy: the problem line big, the app as the answer (icon + name +
one line + real screenshot artefact), status badge, link to the app page.
Chapter closes with the bridge line that turns evidence into pitch:
*your business has one of these problems too — that's the next chapter.*

### 04 · Services — "we do this for you"
The services/consulting arm (never "advice"): four numbered lifecycle
cards in the same tinted-card geometry —

- 01 **Custom products & solutions** — apps, SaaS, websites
  (covers the two build services).
- 02 **Brand & identity** — look, feel, voice, content.
- 03 **Marketing & analytics** — being known: campaigns, growth,
  measurement, product direction.
- 04 **Business tech & automation** (the ink card) — AI, integrations,
  process optimisation: the toolbox that runs through everything.

Cards carry a proof crumb each (a real number or artefact) and link into
the five existing `/services/[slug]` pages. A quiet "Not sure which you
need?" honesty cell keeps the current voice.

### 05 · The process — "from problem to product"
Forth mapping: "From discovered to confirmed" (the strongest storytelling
device on the page). Left: a three-state engagement timeline —
**Identified** (the problem, success criteria — "no proposal until this is
clear") → **Built** (short cycles, something visible every week) →
**Growing** ("launch is the middle, not the end") — with week-stamps
standing in for Forth's timestamps. Right: a device mock that **changes
state** with the timeline, using one real product as the worked example
(brief note → build screenshot → live screen with real numbers). One
featured story, per the depth-over-breadth rule.

### 06 · Proof — client work + the studio behind it
Forth mapping: the dark trust section, but rendered **light** (sunken well)
to protect the ink budget. Two beats:

1. **Client proof:** Thrifty + Innovatr result cards (real numbers, honest
   captions), engagement list (text, as today), second testimonial inline
   (Hermione, IFC).
2. **Founder note:** the Basecamp pattern — a short, signed note from Alroy
   with the real portrait. Not a bio card: 3–4 sentences on why the studio
   exists (tired of handing projects between four agencies; learned to
   build them instead; 12 years across every side of the product). Links to
   `/studio` for the full story.

### Closing block — dark, warm, one ask
Forth mapping: "Good people. Actual plans." Scattered real artefacts (app
tiles, screenshots, a work photo) orbiting a centred close:

> **Real problems. Actual products.**

One CTA (**Start a project**), plus the honesty microcopy (one email, an
honest answer about what it takes — if we're not the right studio, we'll
say so). Third testimonial (Devi) can sit here as the decision-moment
proof. This becomes the new shared `CallToAction`, reused sitewide with
per-page copy overrides as today. Dark footer follows (unchanged pattern;
fix the placeholder social links and dead `/services#build` anchors).

Cut from the reference, confirmed: "This week in Dubai" (live board) and
"Launching city by city" (roadmap/waitlist/FAQ). Parking lot: Forth's
status-badge roadmap list is a nice pattern for the `/apps` index if we
ever want a "what's live / in beta / in development" board.

## 5. Inner pages

- **`/apps` + app detail pages:** facts, mocks, specs, journeys,
  giving/legal stay in substance. Each detail page gains a **problem-first
  opening** — a short "the problem" band above the current story (the use
  case the app answers), so every app page reads as a problem→solution
  story. Index reframed the same way. Chapter numbers on story bands, new
  closing block.
- **`/services` + `/services/[slug]`:** keep all five SEO pages and URLs,
  but rebuild each detail page **story-style** (per Alroy: "case study,
  use case, problem solution style"): the problem → how we approach it →
  a real embedded case (Thrifty on marketing/analytics; Innovatr rebrand
  on brand; Innovatr platform + Social Sweep on custom products and
  automation; the apps as use cases where client work doesn't exist yet)
  → what's included → good fit → CTA. This replaces a separate `/work`
  section — proof lives next to the claim it verifies. Index reframed
  around the four lifecycle cards. Registry gains a `lifecycle` grouping
  and a `case` slot per service.
- **`/studio`:** becomes the full "About Alroy" chapter — real portrait,
  the founder story, career highlights (Meta certified lead trainer at
  Digify Africa, IFC, Energy Capital & Power…), studio stats, all three
  testimonials, honest voice. Content sourced from the portfolio repo's
  bio/experience data (no invention).
- **`/contact`:** keep the honest structure; add the process rename;
  optionally add the cal.com booking link (exists:
  cal.com/mralroyndhlovu) — pending Alroy's decision (open item in
  REDESIGN.md already).
- **Legal / giving pages:** design already unified via `LegalDocument`;
  no content changes. Verify they inherit any token/component tweaks
  cleanly. Giving copy rules unchanged (voluntary gift, never unlocks).

## 6. Design-system deltas (the "pop")

Everything stays token-driven; changes are additive:

1. **Tint family** for the numbered feature cards + closing scatter,
   derived from the four app accents at low saturation (like the existing
   icon-tile formula, `color-mix(accent 12–16%, surface)`): amber
   (CaughtSlipping), olive (ISIT), rust (tapa), lime (Hakkan) + the ink
   card. Rule: tints are allowed **only** on the chapter-card grid and the
   closing scatter — the monotone discipline elsewhere is what makes them
   pop. New tokens `--tint-*` in `globals.css` + Tailwind aliases, both
   themes.
2. **`ChapterMark`** ui component — the small "01 / 06" numerals (tabular
   figures, faint) used on home chapters and app story bands.
3. **`FeatureCardGrid` / `TintCard`** — the numbered tinted card with an
   artefact slot (screenshot, mini-UI, or number card).
4. **`StateTimeline`** — the process timeline + swappable device mock
   (framer-motion, scroll- or click-driven, `useReducedMotion` gated).
   Motion note (Alroy, Aug 2026): framer-motion/GSAP approved "where it
   adds value" — default to framer-motion (already in the bundle); add
   GSAP only if a specific effect demands it.
5. **`FloatingArtefact`** — the hero's single floating card (slimmed
   `HeroCollage`).
6. **Closing scatter** — rebuilt `CallToAction` with absolutely-positioned
   artefact chips at desktop, stacked/hidden at mobile.
7. Vignettes stay on service cards only; app surfaces keep real
   screenshots (existing rule).

## 7. Content/data changes

- `lib/services.ts`: `PROCESS_STEPS` → Identify/Build/Grow; rename
  `arm: "advise"` → `"consult"` and every "We advise" string → "We
  consult"; add lifecycle grouping (`build | brand | grow | automate`)
  mapped onto the five services; add a `case` slot per service (real
  embedded case story); keep slugs/SEO pages stable (no URL changes).
- `lib/apps.ts`: add a `problem` field per app (the one-line use-case
  problem statement) consumed by the home use-case cards and the new
  problem-first band on detail pages.
- **New `lib/proof.ts`:** typed registry of real result stats (Thrifty,
  Innovatr, studio stats) with source notes — same "only real claims"
  contract as `lib/testimonials.ts`, enforced by a header comment.
- **New `lib/studio.ts`** (or extend existing copy): founder note, career
  highlights, portrait import.
- Assets to bring over from `alroyportfolio` (optimised for web):
  portrait JPEG(s) → `public/studio/`; if the case-study question (§8)
  lands yes: selected Innovatr before/afters + Social Sweep shots →
  `public/work/`. All raster art rendered through `next/image`.
- `docs/ASSETS.md` updated with provenance for every imported file.

## 8. Decisions (Alroy, 2026-08-12: "use best practice/research, we will
iterate")

1. **Split:** no toggle. Apps become the problem-first **use-cases
   chapter (03)**; services/consulting get their own chapter (04). The
   apps are evidence of the why, not a portfolio.
2. **Client case studies:** no separate `/work` section — real case
   stories are **embedded in the service detail pages** (proof next to
   claim), summary numbers on home/`/studio`. Deep dives stay on
   alroyndhlovu.com.
3. **Portrait:** use `Alroy-Ndhlovu-FOE.jpeg` (the portfolio shot).
4. **Tints:** derived from the four app accents (amber/olive/rust/lime),
   not a neutral Forth set.
5. **Motion:** framer-motion/GSAP approved where it adds value; default
   framer-motion.
6. Still open from v2 (need Alroy input, not blocking): real social URLs
   for the footer, cal.com link on `/contact`, studio accent.

## 9. Build order

> **Status (2026-08-12): Phases 0–3 built, then reworked per Alroy's
> review (iteration 2, same day).** His structural rules — recorded in
> memory and binding: client result stats do NOT belong on the homepage
> (they live on service pages); the colored-block treatment belongs to
> the SERVICES chapter, whose blocks open into the case-carrying service
> pages; the founder/profile lives on `/studio` ("About" in the nav),
> never on home; the site must not read as a one-pager — home stays
> short (why → services → use cases → trust band → ask) and depth
> disperses (process chapter → `/services`); canvas is **white**, not
> paper, with stronger tints, one full-saturation ember block, and real
> photography in the closing scatter. A `grok-image` MCP server is
> scaffolded at `~/.claude/mcp-servers/grok-image/` (user-scope
> registered) and activates once `XAI_API_KEY` is exported. Still open:
> real social URLs, cal.com link, per-app OG images, live dark-mode
> spot-check.

**Phase 0 — foundations** (no visual change yet)
1. Registry updates: process rename, lifecycle grouping, `lib/proof.ts`,
   `lib/studio.ts`; import portrait + any approved assets; tint tokens +
   Tailwind aliases; `ChapterMark`.
2. Gates green; commit.

**Phase 1 — the homepage story** (one chapter per commit)
3. Hero (new copy + single floating artefact).
4. Why chapter (problem + three beliefs + artefacts + first testimonial).
5. Use-cases chapter (four problem-first app cards in accent tints).
6. Services chapter (four lifecycle cards + honesty cell).
7. Process chapter (state timeline + worked example).
8. Proof chapter (client results + founder note).
9. New closing block + footer fixes.

**Phase 2 — inner pages**
10. `/services` index reframe + story-style detail pages with embedded
    real cases (the biggest Phase 2 item).
11. App pages: problem-first opening band + chapter marks + closing
    block (facts untouched).
12. `/studio` rebuild as the full About chapter.
13. `/contact` refresh.
14. Legal/giving visual verification.

**Phase 3 — polish + ship**
14. SEO pass: metadata/OG coherence, JSON-LD for all four apps, sitemap.
15. Motion + reduced-motion audit; dark mode audit; mobile audit
    (both themes, desktop + mobile, every template).
16. Gates (`tsc`, lint, build) + runtime walkthrough; update `AGENTS.md`
    (tint rules, new components) + this doc; commit + push.

## 10. Guardrails (unchanged, restated)

- Only real claims — every number traces to `lib/proof.ts` provenance;
  testimonials verbatim; no invented logos/quotes.
- Hakkan is private beta — never "launched".
- Giving copy stays voluntary-gift-only.
- Ink budget: ≤2 dark moments per page, never in one viewport.
- Trailing slashes everywhere; tokens not hex; motion respects
  reduced-motion; no new heavy dependencies.
