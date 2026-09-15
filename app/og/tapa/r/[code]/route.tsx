/**
 * The share card for a tapa. recipe: /og/tapa/r/<code>
 *
 * A rendered 1200x630 PNG on tapa's own cream ground: the recipe title in
 * Apfel Grotezk, a "25 min · Easy · Serves 2" meta line, the tapa. mark, and
 * a footer. The share page points og:image and twitter:image here.
 *
 * WHY A ROUTE HANDLER, NOT opengraph-image.tsx. The file-convention version
 * rendered fine locally and 503'd on Hostinger on every request ("failed to
 * pipe response" in the runtime log, cause swallowed), while InSpiritInTruth's
 * route-handler card on the same host works. A route handler also lets the
 * render be AWAITED: ImageResponse renders lazily into its stream, so a failure
 * only surfaces as a broken pipe after the headers are sent. Buffering it here
 * turns that into a catchable error — logged with its real cause — and a
 * simpler fallback render, so a preview is never a 503.
 *
 * Teaser discipline: title and meta only. The ingredients and method are what
 * the tap is for.
 *
 * Lessons carried over from InSpiritInTruth's card (app/og/d/[slug]/route.tsx
 * in that repo):
 * - Satori reads TTF/OTF/WOFF, never WOFF2, which is all the site itself
 *   ships, so the brand OTFs live in public/fonts/og/ (SIL OFL 1.1, licence
 *   in fonts/ApfelGrotezk-LICENSE.txt). In public/, not the repo-root fonts/:
 *   Hostinger's build output ships public/ but not arbitrary root folders,
 *   so a root fonts/og/ read ENOENT in production while working locally.
 * - Satori has no line clamp. An over-long block just grows and shoves its
 *   neighbours around, so the title shrinks with length and is trimmed on a
 *   word boundary.
 */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getApp } from "@/lib/apps";
import { getTapaShare, isShareCode, recipeMetaLine } from "@/lib/tapaShare";

export const dynamic = "force-dynamic";

const SIZE = { width: 1200, height: 630 };

// tapa's own brand tokens (tapa repo: tailwind.config.js / brand-kit.html),
// not the studio's: this card represents the app wherever it is posted.
const CREAM = "#FAF7F2";
const INK = "#1A1A1A";
const INK_MUTED = "#6B6B6B";
const SAGE = "#7C9A5E";

type Font = { name: string; data: Buffer; weight: 400 | 500 | 700; style: "normal" };
type Assets = { fonts: Font[]; mark: string | null };

async function readOptional(...segments: string[]): Promise<Buffer | null> {
  try {
    return await readFile(path.join(process.cwd(), ...segments));
  } catch (err) {
    console.error(`[tapa og] could not read ${segments.join("/")}:`, err);
    return null;
  }
}

let assets: Promise<Assets> | null = null;

/** Read once per server process; any file that fails is simply left out. */
function loadAssets(): Promise<Assets> {
  assets ??= (async () => {
    const [regular, mittel, fett, mark] = await Promise.all([
      readOptional("public", "fonts", "og", "ApfelGrotezk-Regular.otf"),
      readOptional("public", "fonts", "og", "ApfelGrotezk-Mittel.otf"),
      readOptional("public", "fonts", "og", "ApfelGrotezk-Fett.otf"),
      readOptional("public", "icons", "tapa-mark.png"),
    ]);
    const fonts: Font[] = [];
    if (regular) fonts.push({ name: "Apfel", data: regular, weight: 400, style: "normal" });
    if (mittel) fonts.push({ name: "Apfel", data: mittel, weight: 500, style: "normal" });
    if (fett) fonts.push({ name: "Apfel", data: fett, weight: 700, style: "normal" });
    return {
      fonts,
      mark: mark ? `data:image/png;base64,${mark.toString("base64")}` : null,
    };
  })();
  return assets;
}

const TITLE_MAX = 90;

/** Trim on a word boundary so the card never shows half a word. */
function trimTitle(title: string): string {
  if (title.length <= TITLE_MAX) return title;
  const cut = title.slice(0, TITLE_MAX);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.-]+$/, "")}…`;
}

/*
 * Sized for a ~700px text column: at each step the longest title that fits
 * stays within four lines, so the meta line and footer keep their places.
 */
function titleSize(title: string): number {
  if (title.length <= 26) return 84;
  if (title.length <= 44) return 70;
  if (title.length <= 66) return 58;
  return 50;
}

function card(title: string, meta: string, fonts: Font[], mark: string | null) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: CREAM,
        padding: "68px 72px",
        // Omitted, not undefined, without our fonts: Satori throws on an
        // undefined style value ("reading 'split'").
        ...(fonts.length ? { fontFamily: "Apfel" } : {}),
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
          paddingRight: 40,
        }}
      >
        <div style={{ display: "flex", width: 72, height: 6, borderRadius: 3, background: SAGE }} />

        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div
            style={{
              display: "block",
              fontSize: titleSize(title),
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: -1.5,
              color: INK,
            }}
          >
            {title}
          </div>
          {meta ? (
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontSize: 34,
                fontWeight: 500,
                color: INK_MUTED,
              }}
            >
              {meta}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", fontSize: 28, color: INK_MUTED }}>
          <span style={{ fontWeight: 700, color: INK }}>tapa.</span>
          <span style={{ marginLeft: 12, marginRight: 12 }}>·</span>
          <span>fortherestofus.app</span>
        </div>
      </div>

      {mark ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 300 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} width={290} height={290} alt="" />
        </div>
      ) : null}
    </div>
  );
}

export async function GET(_req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const tapa = getApp("tapa");

  const share = isShareCode(code) ? await getTapaShare(code) : null;
  const { fonts, mark } = await loadAssets();

  // Generic card: tapa's own line from the registry, no meta.
  const title = share ? trimTitle(share.recipe.title) : (tapa?.tagline ?? "tapa.");
  const meta = share ? recipeMetaLine(share.recipe) : "";

  // Full card first; then without the bitmap; then on next/og's bundled font.
  const attempts: { label: string; fonts: Font[]; mark: string | null }[] = [
    { label: "full", fonts, mark },
    { label: "no mark", fonts, mark: null },
    { label: "default font, no mark", fonts: [], mark: null },
  ];

  for (const attempt of attempts) {
    try {
      const rendered = new ImageResponse(card(title, meta, attempt.fonts, attempt.mark), {
        ...SIZE,
        // Omitted when empty: an empty list would replace next/og's bundled
        // fallback font with nothing.
        ...(attempt.fonts.length ? { fonts: attempt.fonts } : {}),
      });
      const png = await rendered.arrayBuffer();
      if (attempt.label !== "full") console.error(`[tapa og] served the "${attempt.label}" fallback`);
      return new Response(png, {
        headers: {
          "Content-Type": "image/png",
          // A share never changes; this only bounds how long a deleted
          // account's card lingers.
          "Cache-Control": "public, max-age=300, s-maxage=300",
        },
      });
    } catch (err) {
      console.error(`[tapa og] "${attempt.label}" render failed:`, err);
    }
  }

  return new Response("Card unavailable", { status: 500, headers: { "Cache-Control": "no-store" } });
}
