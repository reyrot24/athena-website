import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://ssdcamathena.it";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/sign-in"], // 🚫 prevent Google from indexing sign-in
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
