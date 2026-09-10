import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Vercel Analytics diproksi dari origin sendiri di produksi; hanya skrip debug dev yang lintas-origin.
const devScriptSrc = isDev
  ? " 'unsafe-eval' https://va.vercel-scripts.com"
  : "";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${devScriptSrc}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Next 16 membulatkan quality ke nilai terdekat di daftar ini, jadi 65 harus didaftarkan.
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [65, 75],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
