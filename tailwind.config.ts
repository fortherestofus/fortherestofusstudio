import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens (driven by CSS custom properties in globals.css)
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        sunken: "var(--color-surface-sunken)",
        ink: "var(--color-text)",
        muted: "var(--color-text-muted)",
        faint: "var(--color-text-faint)",
        border: "var(--color-border)",

        // Accent — overridden per app page
        accent: "var(--color-accent)",
        "accent-soft": "var(--color-accent-soft)",
        "accent-ink": "var(--color-accent-ink)",
        "accent-deep": "var(--color-accent-deep)",

        // Ink surfaces (dark CTA block, footer)
        "ink-surface": "var(--color-ink-surface)",
        "ink-raised": "var(--color-ink-surface-raised)",
        "ink-text": "var(--color-ink-text)",
        "ink-muted": "var(--color-ink-text-muted)",
        "ink-border": "var(--color-ink-border)",

        // Tint family — chapter-card washes only (see globals.css note)
        "tint-amber": "var(--tint-amber)",
        "tint-amber-deep": "var(--tint-amber-deep)",
        "tint-olive": "var(--tint-olive)",
        "tint-olive-deep": "var(--tint-olive-deep)",
        "tint-rust": "var(--tint-rust)",
        "tint-rust-deep": "var(--tint-rust-deep)",
        "tint-lime": "var(--tint-lime)",
        "tint-lime-deep": "var(--tint-lime-deep)",
      },
      fontFamily: {
        // One family sitewide. Aliases kept so legacy classes resolve to Apfel.
        sans: ["var(--font-apfel)", "system-ui", "sans-serif"],
        display: ["var(--font-apfel)", "system-ui", "sans-serif"],
        heading: ["var(--font-apfel)", "system-ui", "sans-serif"],
        body: ["var(--font-apfel)", "system-ui", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        card: "16px",
        well: "24px",
        block: "32px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(22,21,15,0.04), 0 6px 20px rgba(22,21,15,0.06)",
        "card-hover":
          "0 2px 6px rgba(22,21,15,0.06), 0 14px 36px rgba(22,21,15,0.10)",
        pill: "0 1px 2px rgba(22,21,15,0.10), 0 8px 20px rgba(22,21,15,0.14)",
        nav: "0 1px 2px rgba(22,21,15,0.04), 0 8px 30px rgba(22,21,15,0.08)",
      },
      maxWidth: {
        content: "1200px",
        reading: "720px",
      },
    },
  },
  plugins: [],
};

export default config;
