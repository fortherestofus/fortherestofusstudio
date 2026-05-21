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
        // Brand palette (fixed values)
        pthalo: "#123524",
        lime: "#90A842",
        gold: "#F0B331",
        offwhite: "#F7F5F0",
        forest: "#0C2218",
        // Theme-aware tokens (driven by CSS custom properties in globals.css)
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        ink: "var(--color-text)",
        muted: "var(--color-text-muted)",
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        "footer-bg": "var(--color-footer-bg)",
        border: "var(--color-border)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,53,36,0.06), 0 8px 24px rgba(18,53,36,0.08)",
        "card-hover": "0 4px 8px rgba(18,53,36,0.10), 0 18px 48px rgba(18,53,36,0.16)",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
