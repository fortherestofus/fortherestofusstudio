import type { NextConfig } from "next";

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

const nextConfig: NextConfig = {
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
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
