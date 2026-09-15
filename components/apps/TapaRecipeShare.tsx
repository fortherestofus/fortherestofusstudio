/**
 * TapaRecipeShare — a recipe someone shared from tapa., readable by anyone.
 *
 * Mirrors the in-app recipe screen (tapa: src/screens/RecipeScreen.tsx) in
 * order: title, description, cook time / difficulty / servings, the estimated
 * macros, ingredients, method, substitutions, and the same AI disclaimer. It
 * is told in this site's editorial language rather than the app's cards: a
 * hairline spec strip for the stats, hairline lists, the app's accent only in
 * small marks (AppThemeProvider). Then one closing band that says what tapa.
 * is, from lib/apps.ts, with the store badges.
 *
 * Everything recipe-derived renders as plain text. The payload is normalised
 * in lib/tapaShare.ts; sections with nothing in them do not render.
 *
 * What is deliberately absent: the sharer's allergen warning and time note
 * (stripped server-side as personal), the in-app step timers, and any claim
 * about price, trials or Pro.
 */
import Link from "next/link";
import type { App } from "@/lib/apps";
import type { SharedNutrition, TapaShare } from "@/lib/tapaShare";
import { difficultyLabel } from "@/lib/tapaShare";
import AppThemeProvider from "@/components/apps/AppThemeProvider";
import OpenInTapaButton from "@/components/apps/OpenInTapaButton";
import StoreBadges from "@/components/apps/StoreBadges";
import AppIcon from "@/components/ui/AppIcon";
import { cn } from "@/lib/cn";

/**
 * The compact figure the app shows for a macro ("~450 kcal" → "~450",
 * "32g protein" → "32g"). Ported from RecipeScreen's macroValue so both
 * surfaces print the same number; free text with no digits passes through.
 */
function macroValue(raw: string): string {
  const match = raw.match(/[~≈]?\s*\d+(?:\.\d+)?\s*(?:mg|g)?/i);
  return match ? match[0].replace(/\s+/g, "") : raw;
}

const MACROS: { key: keyof SharedNutrition; label: string }[] = [
  { key: "calories", label: "kcal" },
  { key: "protein", label: "Protein" },
  { key: "carbs", label: "Carbs" },
  { key: "fat", label: "Fat" },
];

const GRID_COLS = ["", "grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4"];

function SectionTitle({ children, aside }: { children: React.ReactNode; aside?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="text-[1.5rem] font-medium tracking-[-0.02em] text-ink sm:text-[1.75rem]">
        {children}
      </h2>
      {aside && <span className="nums shrink-0 text-[0.9375rem] text-faint">{aside}</span>}
    </div>
  );
}

export default function TapaRecipeShare({ share, app }: { share: TapaShare; app: App }) {
  const { recipe, code } = share;

  const stats = [
    recipe.cookTimeMinutes !== null && {
      label: "Cook time",
      value: `${recipe.cookTimeMinutes} min`,
    },
    recipe.difficulty !== null && {
      label: "Difficulty",
      value: difficultyLabel(recipe.difficulty),
    },
    recipe.servings !== null && { label: "Serves", value: String(recipe.servings) },
  ].filter((s): s is { label: string; value: string } => Boolean(s));

  const macros = MACROS.flatMap(({ key, label }) => {
    const raw = recipe.nutritionalOverview[key];
    return raw ? [{ label, value: macroValue(raw) }] : [];
  });

  const itemCount = recipe.ingredients.length;

  return (
    <AppThemeProvider app={app}>
      <article className="relative overflow-hidden bg-bg">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[640px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background: `radial-gradient(circle, color-mix(in srgb, ${app.accentColor} 26%, transparent), transparent 70%)`,
          }}
        />

        <div className="relative mx-auto w-full max-w-reading px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
          {/* Where this came from: someone shared it out of the app. */}
          <Link
            href={`/apps/${app.slug}/`}
            className="inline-flex items-center gap-3 text-muted transition-colors hover:text-ink"
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-[11px] border border-border"
              style={{
                backgroundColor: `color-mix(in srgb, ${app.accentColor} 15%, #ffffff)`,
              }}
            >
              <AppIcon
                icon={app.icon}
                color={app.accentColor}
                label={app.name}
                size={26}
                className="rounded-[7px]"
              />
            </span>
            <span className="text-[0.8125rem] uppercase tracking-[0.14em]">
              Shared from {app.name}
            </span>
          </Link>

          <h1 className="mt-8 text-balance break-words text-[2.25rem] font-medium leading-[1.06] tracking-[-0.03em] text-ink sm:text-[3rem]">
            {recipe.title}
          </h1>
          {recipe.description && (
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
              {recipe.description}
            </p>
          )}

          {stats.length > 0 && (
            <dl
              className={cn(
                "mt-9 grid border-y border-border",
                GRID_COLS[stats.length],
              )}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn("px-2 py-5 text-center", i > 0 && "border-l border-border")}
                >
                  <dt className="text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                    {stat.label}
                  </dt>
                  <dd className="nums mt-2 text-[1.0625rem] font-medium text-ink">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <OpenInTapaButton code={code} className="mt-8 w-full sm:w-auto" />

          {macros.length > 0 && (
            <section className="mt-12">
              <h2 className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted">
                Per serving, estimated
              </h2>
              <dl className={cn("mt-3 grid gap-2", GRID_COLS[macros.length])}>
                {macros.map((macro) => (
                  <div
                    key={macro.label}
                    className="flex flex-col-reverse rounded-card bg-sunken px-2 py-3 text-center"
                  >
                    <dt className="mt-0.5 text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                      {macro.label}
                    </dt>
                    <dd className="nums break-words text-[1.0625rem] font-medium text-ink">
                      {macro.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {itemCount > 0 && (
            <section className="mt-12">
              <SectionTitle aside={`${itemCount} ${itemCount === 1 ? "item" : "items"}`}>
                Ingredients
              </SectionTitle>
              <ul className="mt-5 divide-y divide-border border-y border-border">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="flex gap-3 py-3.5 leading-relaxed text-ink">
                    <span
                      aria-hidden
                      className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="min-w-0 break-words">
                      {ingredient.quantity && (
                        <span className="font-bold">{ingredient.quantity} </span>
                      )}
                      {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {recipe.steps.length > 0 && (
            <section className="mt-12">
              <SectionTitle>Method</SectionTitle>
              <ol className="mt-5 space-y-6">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      aria-hidden
                      className="nums grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-[0.875rem] font-medium text-ink"
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 pt-1">
                      {step.durationSeconds !== null && (
                        <p className="nums mb-1 text-[0.8125rem] text-muted">
                          {Math.ceil(step.durationSeconds / 60)} min
                        </p>
                      )}
                      <p className="break-words leading-relaxed text-ink">{step.instruction}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {recipe.substitutionTips.length > 0 && (
            <section className="mt-12">
              <SectionTitle>Substitutions</SectionTitle>
              <ul className="mt-5 space-y-5">
                {recipe.substitutionTips.map((tip, i) => (
                  <li key={i} className="border-t border-border pt-5">
                    <p className="break-words leading-relaxed text-ink">
                      <span className="font-bold">No {tip.original}?</span> {tip.substitute}
                    </p>
                    {tip.note && (
                      <p className="mt-1.5 break-words text-[0.9375rem] leading-relaxed text-muted">
                        {tip.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Muted, not faint: this is safety copy and has to pass contrast. */}
          <p className="mt-12 border-t border-border pt-6 text-[0.875rem] leading-relaxed text-muted">
            AI-generated recipe. Always verify for your specific dietary needs and allergies.
          </p>
        </div>
      </article>

      {/* What tapa. is, told the way its own page tells it: problem first. */}
      <section className="bg-sunken py-14 sm:py-20">
        <div className="mx-auto w-full max-w-reading px-5 text-center sm:px-8">
          <span
            className="mx-auto grid h-16 w-16 place-items-center rounded-[20px] border border-border"
            style={{
              backgroundColor: `color-mix(in srgb, ${app.accentColor} 15%, #ffffff)`,
            }}
          >
            <AppIcon
              icon={app.icon}
              color={app.accentColor}
              label={app.name}
              size={44}
              className="rounded-xl"
            />
          </span>
          <p className="mx-auto mt-6 max-w-[38ch] text-pretty text-[1.0625rem] font-medium leading-snug text-accent-deep">
            “{app.problem}”
          </p>
          <h2 className="mt-4 text-balance text-[2rem] font-medium leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.75rem]">
            {app.tagline}
          </h2>
          <p className="mx-auto mt-5 max-w-[48ch] text-pretty leading-relaxed text-muted">
            {app.shortDescription}
          </p>

          <StoreBadges app={app} className="mt-8" />

          <Link
            href={`/apps/${app.slug}/`}
            className="mt-8 inline-block text-[0.9375rem] font-medium text-muted underline underline-offset-4 transition-colors hover:text-ink"
          >
            More about {app.name}
          </Link>
        </div>
      </section>
    </AppThemeProvider>
  );
}
