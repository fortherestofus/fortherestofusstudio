// Plain ESM, deliberately — NOT next.config.ts.
//
// Next has to transpile a TypeScript config before it can read it, and it does
// that with its native binary, writing the result to a temporary
// <hash>.next.config file. On the Hostinger build container that step fails
// (a GLIBC mismatch), so the temp file is never written and the build dies
// looking for a file that never existed. A .mjs config sidesteps it: Node
// loads this directly — no transpile, no native binary, no temp file. Types
// still come from the JSDoc annotation below.

// Baseline security headers applied to every route. Intentionally no CSP yet:
// per-app accent theming sets CSS variables via inline `style`, so a
// Content-Security-Policy needs `style-src 'unsafe-inline'` or a nonce pass
// before it's turned on.
// NOTE: headers() only applies in server mode — it is ignored under `output: "export"`.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-mode build (so `next start` works on Hostinger / @netlify/next).
  // Add `output: "export"` here only if you want pure static files in /out instead.
  trailingSlash: true,
  // Image optimisation needs a Node runtime, which server mode gives us — sharp
  // resizes and re-encodes on demand, then caches. If this ever moves to
  // `output: "export"`, optimisation is unavailable and `unoptimized: true` has
  // to come back (or a custom loader takes over).
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },

      // HTML documents must not be cached for a year.
      //
      // Next stamps prerendered pages with `s-maxage=31536000`, assuming the
      // CDN in front is purged on every deploy. Hostinger's is not: on the
      // InSpiritInTruth site the same setup served 40-hour-old HTML long after
      // a successful deploy, and a cache-busting query string did not shift it.
      // This site sits behind the same CDN, so it has the same trap.
      //
      // A short shared cache with a long stale-while-revalidate keeps the edge
      // fast while letting a deploy land within minutes. The negative lookahead
      // leaves content-hashed build assets on their own immutable caching.
      //
      // /screenshots is deliberately not excluded. Those filenames are stable
      // while their contents get replaced, so a year-long cache serves the
      // previous screenshot from the same URL — the trap that caught
      // inspiritintruth.net when the tailored-devotional captures were swapped.
      {
        source:
          "/((?!_next/static|_next/image|icons|fonts|\\.well-known).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
