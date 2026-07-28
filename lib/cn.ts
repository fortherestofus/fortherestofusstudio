/**
 * Minimal class-name joiner. Falsy values are dropped so callers can pass
 * conditionals inline without pulling in a dependency.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
