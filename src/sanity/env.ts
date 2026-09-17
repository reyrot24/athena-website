// Il projectId non è un segreto (è anche in sanity/sanity.config.ts), quindi
// il fallback evita che il sito si rompa se la variabile manca in un ambiente.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.PROJECT_ID || "b0b0ndzw";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const apiVersion = "2025-09-01";

export const studioUrl = "https://ssdcamathena.sanity.studio";
