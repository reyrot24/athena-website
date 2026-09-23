import type { MetadataRoute } from "next";
import { fesrProject, navLinks, site } from "@/lib/site";
import { getNewsList } from "@/sanity/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getNewsList();

  const pages: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    ...navLinks.map((link) => ({
      url: `${site.url}${link.href}`,
      changeFrequency: link.href === "/news" ? ("weekly" as const) : ("monthly" as const),
      priority: 0.8,
    })),
    { url: `${site.url}${fesrProject.href}`, changeFrequency: "yearly", priority: 0.4 },
  ];

  const articles: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${site.url}/news/${item.slug}`,
    lastModified: item.data ?? undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
