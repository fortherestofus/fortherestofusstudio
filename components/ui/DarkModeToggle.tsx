"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  // The resolved theme is unknown during SSR, so both the label and the icon
  // stay neutral until mount. Anything derived from the theme before then is a
  // hydration mismatch.
  const label = !mounted
    ? "Toggle colour theme"
    : isDark
      ? "Switch to light mode"
      : "Switch to dark mode";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-sunken focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-5 w-5" strokeWidth={1.75} />
        ) : (
          <Moon className="h-5 w-5" strokeWidth={1.75} />
        )
      ) : (
        <span className="h-5 w-5" />
      )}
    </button>
  );
}
