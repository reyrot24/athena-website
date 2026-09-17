import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components: pagine prerenderizzate + cache granulare con 'use cache'.
  cacheComponents: true,
  images: {
    // Obbligatorio da Next 16: le qualità consentite per l'ottimizzazione.
    qualities: [75, 90],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  transpilePackages: ["@mep-agency/next-iubenda"],
  poweredByHeader: false,
};

export default nextConfig;
