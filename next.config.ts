import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on"
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload"
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN"
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin"
  },
  {
    key: "Content-Security-Policy",
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self' data:; connect-src 'self'; media-src 'self' blob: data:; object-src 'none'; frame-ancestors 'none';"
  }
];

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok.io",
    "serrated-turbulent-collie.ngrok-free.dev",
    "localhost:3000",
    "localhost:3001",
  ],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/hero", destination: "/#hero", permanent: true },
      { source: "/problem", destination: "/#problem", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/features", destination: "/#services", permanent: true },
      { source: "/solution", destination: "/#solution", permanent: true },
      { source: "/process", destination: "/#solution", permanent: true },
      { source: "/testimonials", destination: "/#testimonials", permanent: true },
      { source: "/work", destination: "/#testimonials", permanent: true },
      { source: "/pricing", destination: "/#pricing", permanent: true },
      { source: "/faq", destination: "/#faq", permanent: true },
      { source: "/ecosystem", destination: "/#ecosystem", permanent: true },
      { source: "/cta", destination: "/#cta", permanent: true },
    ];
  },
};

export default nextConfig;
