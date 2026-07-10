import path from "node:path";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * The site is static and has no backend, no forms and no third-party scripts,
 * so the policy can be strict. Two unavoidable relaxations:
 *  - script-src 'unsafe-inline': Next inlines its bootstrap and the RSC payload.
 *  - style-src 'unsafe-inline': Tailwind's preflight and GSAP, which writes
 *    inline styles on every animated element.
 * Dev additionally needs 'unsafe-eval' and a websocket for fast refresh.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  // A lockfile in a parent directory made Next root the traced output at
  // ~/Documents, which buried server.js and broke both `npm start` and the
  // Dockerfile's `COPY .next/standalone ./`.
  outputFileTracingRoot: path.join(process.cwd()),
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Media only ever changes by filename, so it can be cached hard.
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
