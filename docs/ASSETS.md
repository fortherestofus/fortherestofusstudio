# Assets needed from Alroy

Every slot below already exists at the right size — dropping a file in shifts
nothing.

## 0. Imported from the portfolio repo (v3 redesign)

| File | Source | Used by |
|---|---|---|
| `public/studio/alroy-portrait.jpg` (512×640) | `alroyportfolio/site/src/assets/images/Alroy-Ndhlovu-FOE.jpeg` — the shot used on alroyndhlovu.com | Founder note (home) + `/studio`, statically imported via `lib/studio.ts` |
| `public/video/lumiskin-site.mp4` + poster | `alroyportfolio` — LumiSkin storefront filmed scrolling | Home why-chapter artefact, `/services` LumiSkin band (`lib/work.ts`) |
| `public/work/lumiskin/*.jpg` (6) | `alroyportfolio/site/src/assets/case-studies/lumiskin/` | `lumiskinWork` in `lib/work.ts` |
| `public/video/social-sweep-demo.mp4` (5.3MB) | `alroyportfolio` — narrated Social Sweep walkthrough | `/services` build-vs-buy band, click-to-play via `WorkVideo` (never autoplays — it is two minutes long) |

**Re-encoding videos.** There is no system ffmpeg on this machine, but the
portfolio repo ships one via `ffmpeg-static`:
`alroyportfolio/site/node_modules/ffmpeg-static/ffmpeg`. Both clips here were
re-encoded through it at CRF 30 with `+faststart` (LumiSkin also 60→30fps and
audio stripped, since it autoplays muted; Social Sweep keeps its narration at
64k mono). Note these sources are already lean — the Social Sweep file is big
because it runs two minutes at 462 kb/s, not because its bitrate is high, so
raising the bitrate to "improve" it would only make it larger.
| `public/work/store-{tapa,isit,caughtslipping}` | `alroyportfolio/media/` — store-listing screen sheets | `storeDesignWork`, the brand & content band on `/services` |
| `public/logos/{energy-capital-power,ifc,gl-events}` | portfolio logos + Alroy's Downloads | Testimonial attribution (`lib/testimonials.ts`) |

**Provenance rule:** LumiSkin is a **self-directed exploration**, not client
work — `kind: "exploration"` in `lib/proof.ts` makes every surface label it
as such. Never let it render inside a "real clients" grid (`clientProofs`
exists for exactly that).

**Rule:** real screenshots and photography appear on the **home hero collage
only**. App pages stay editorial with placeholder art until we deliberately
decide otherwise. Home media is registered in `lib/homeMedia.ts`; app media
would go in `lib/apps.ts`.

## 1. Content collage — the outstanding piece

The content tile shows two work samples plus a line of copy typing itself.
The samples are currently placeholders.

| What | Where to put it | Shape |
|---|---|---|
| One photograph you shot | `public/media/content-photo.jpg` | Landscape 4:3, ≥ 800×600 |
| One piece of graphic design work | `public/media/content-design.jpg` | Landscape 4:3, ≥ 800×600 |

Then add them to `contentSamples` in `lib/homeMedia.ts`:

```ts
export const contentSamples: ContentSample[] = [
  { src: "/media/content-photo.jpg", alt: "Photography for <client>" },
  { src: "/media/content-design.jpg", alt: "Brand work for <client>" },
];
```

Pick images that read at thumbnail size — strong shape and contrast beat fine
detail here. They are the only photographic colour on the page, so they set
the temperature of the whole hero.

The typed lines are in `contentTypedLines` in the same file; change the wording
there if you want different copy.

## 2. Already wired (home hero collage)

| Slot | File | Status |
|---|---|---|
| Desktop window | `/screenshots/hakkan-report.jpg` | ✅ done |
| Phone screen | `/screenshots/tapa-home.jpg` | ✅ done |
| App marks | CaughtSlipping + InSpiritInTruth icons | ✅ done |

## 3. Studio portrait

| File | What |
|---|---|
| `public/studio/portrait.jpg` | Portrait of Alroy, 4:5, ≥ 1200×1500. Used on `/studio` and the home studio band. |

## 4. Later, not blocking

- CaughtSlipping and InSpiritInTruth screens, if we ever decide app pages
  should carry real screenshots.
- Testimonial headshots (with each person's permission) — would upgrade the
  quotes from monograms to faces.
- Written permission from Meta / IFC before any client *logo* is used as an
  image. Names as text are fine and are what the site uses today.
- Per-app OG images, 1200×630.

## Unused originals

`public/screenshots/tapa/` and `public/screenshots/hakkan/` hold the original
uploads with spaces in the filenames. They are untracked and unused — the site
reads the kebab-case copies. Delete them or keep them as source files.
