/**
 * tapa. recipe shares: fetch and normalise one shared recipe.
 *
 * The app shares https://fortherestofus.app/apps/tapa/r/<code>/, and the
 * recipe behind that code comes from tapa's `recipe-share` edge function (no
 * auth: the unguessable code is the capability). The payload is the app's
 * Recipe type minus allergenWarning and timeNote, which the function strips
 * because they are personal to the sharer.
 *
 * Nothing here trusts the payload. Every field is re-read into a known shape,
 * malformed list items are dropped, and any failure (bad code, 404, network,
 * timeout, unparseable JSON, no title, nothing to cook) returns null. Callers
 * render the result as plain text only.
 *
 * TAPA_SHARE_ENDPOINT overrides the function URL so a local mock can stand in.
 */
import { cache } from "react";

const DEFAULT_ENDPOINT =
  "https://zxtvtjmxllqxpsjntigy.supabase.co/functions/v1/recipe-share";

/** The share code format the app mints: 12 lowercase hex characters. */
const CODE_PATTERN = /^[0-9a-f]{12}$/;

/*
 * A hung upstream would otherwise hang the page until the host's proxy gives
 * up, and preview crawlers stop waiting long before that. Not a user-facing
 * limit: a failed fetch reads as not found.
 */
const FETCH_TIMEOUT_MS = 8000;

export type Difficulty = "easy" | "medium" | "hard";

export interface SharedIngredient {
  name: string;
  quantity: string | null;
}

export interface SharedStep {
  instruction: string;
  durationSeconds: number | null;
}

export interface SharedSubstitution {
  original: string;
  substitute: string;
  note: string | null;
}

export interface SharedNutrition {
  calories: string | null;
  protein: string | null;
  carbs: string | null;
  fat: string | null;
}

export interface SharedRecipe {
  title: string;
  description: string | null;
  cookTimeMinutes: number | null;
  servings: number | null;
  difficulty: Difficulty | null;
  ingredients: SharedIngredient[];
  steps: SharedStep[];
  substitutionTips: SharedSubstitution[];
  nutritionalOverview: SharedNutrition;
}

export interface TapaShare {
  code: string;
  recipe: SharedRecipe;
  createdAt: string | null;
}

export function isShareCode(code: unknown): code is string {
  return typeof code === "string" && CODE_PATTERN.test(code);
}

/** Site-relative share path, trailing slash included (the site's canonical form). */
export function sharePath(code: string): string {
  return `/apps/tapa/r/${code}/`;
}

export function shareUrl(code: string): string {
  return `https://fortherestofus.app${sharePath(code)}`;
}

/** "Easy", "Medium", "Hard". */
export function difficultyLabel(difficulty: Difficulty): string {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

/** "25 min · Easy · Serves 2", skipping whatever the recipe does not carry. */
export function recipeMetaLine(recipe: SharedRecipe): string {
  const parts: string[] = [];
  if (recipe.cookTimeMinutes !== null) parts.push(`${recipe.cookTimeMinutes} min`);
  if (recipe.difficulty !== null) parts.push(difficultyLabel(recipe.difficulty));
  if (recipe.servings !== null) parts.push(`Serves ${recipe.servings}`);
  return parts.join(" · ");
}

/* ------------------------------------------------------------------ */
/* Normalisation                                                       */
/* ------------------------------------------------------------------ */

type Loose = Record<string, unknown>;

function isObject(value: unknown): value is Loose {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** A trimmed, non-empty string, or null. Numbers are accepted as text. */
function text(value: unknown): string | null {
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/** A positive whole number from a number or a numeric string, or null. */
function positiveInt(value: unknown): number | null {
  const n =
    typeof value === "number"
      ? value
      : typeof value === "string" && /^\s*\d+(\.\d+)?\s*$/.test(value)
        ? Number(value)
        : NaN;
  if (!Number.isFinite(n)) return null;
  const rounded = Math.round(n);
  return rounded > 0 ? rounded : null;
}

function difficulty(value: unknown): Difficulty | null {
  const v = typeof value === "string" ? value.trim().toLowerCase() : "";
  return v === "easy" || v === "medium" || v === "hard" ? v : null;
}

function list(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function normaliseRecipe(raw: unknown): SharedRecipe | null {
  if (!isObject(raw)) return null;

  const title = text(raw.title);
  if (!title) return null;

  const ingredients = list(raw.ingredients).flatMap((item): SharedIngredient[] => {
    if (!isObject(item)) return [];
    const name = text(item.name);
    return name ? [{ name, quantity: text(item.quantity) }] : [];
  });

  // Array order is the method order; stepNumber is not trusted for it.
  const steps = list(raw.steps).flatMap((item): SharedStep[] => {
    if (!isObject(item)) return [];
    const instruction = text(item.instruction);
    return instruction
      ? [{ instruction, durationSeconds: positiveInt(item.durationSeconds) }]
      : [];
  });

  // A share with nothing to cook is treated as not found.
  if (ingredients.length === 0 && steps.length === 0) return null;

  const substitutionTips = list(raw.substitutionTips).flatMap(
    (item): SharedSubstitution[] => {
      if (!isObject(item)) return [];
      const original = text(item.original);
      const substitute = text(item.substitute);
      return original && substitute
        ? [{ original, substitute, note: text(item.note) }]
        : [];
    },
  );

  const nutrition = isObject(raw.nutritionalOverview) ? raw.nutritionalOverview : {};

  return {
    title,
    description: text(raw.description),
    cookTimeMinutes: positiveInt(raw.cookTimeMinutes),
    servings: positiveInt(raw.servings),
    difficulty: difficulty(raw.difficulty),
    ingredients,
    steps,
    substitutionTips,
    nutritionalOverview: {
      calories: text(nutrition.calories),
      protein: text(nutrition.protein),
      carbs: text(nutrition.carbs),
      fat: text(nutrition.fat),
    },
  };
}

/* ------------------------------------------------------------------ */
/* Fetch                                                               */
/* ------------------------------------------------------------------ */

function endpoint(): string {
  const override = process.env.TAPA_SHARE_ENDPOINT?.trim();
  return (override || DEFAULT_ENDPOINT).replace(/\/+$/, "");
}

async function fetchTapaShare(code: string): Promise<TapaShare | null> {
  if (!isShareCode(code)) return null;

  try {
    const res = await fetch(`${endpoint()}/${code}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) return null;

    const body: unknown = await res.json();
    if (!isObject(body)) return null;

    const recipe = normaliseRecipe(body.recipe);
    if (!recipe) return null;

    return { code, recipe, createdAt: text(body.createdAt) };
  } catch {
    return null;
  }
}

/**
 * Fetch one share, or null. Wrapped in React's cache because the timeout
 * signal opts the fetch out of Next's automatic memoization, and the page and
 * its generateMetadata would otherwise each call the function once per render.
 */
export const getTapaShare = cache(fetchTapaShare);
