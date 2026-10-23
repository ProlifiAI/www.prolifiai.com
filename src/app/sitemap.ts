import type { MetadataRoute } from "next";

import { nav, siteUrl } from "@/content/site";
import { activeCategories, articles } from "@/content/insights";

/**
 * Main pages from the navigation, plus Insights articles and the categories
 * that have articles (empty categories have no page, so they are not listed).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = nav.map((item) => ({
    url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    changeFrequency: item.href === "/insights" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
  const categoryPages: MetadataRoute.Sitemap = activeCategories().map((c) => ({
    url: `${siteUrl}/insights/category/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));
  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteUrl}/insights/${a.slug}`,
    lastModified: a.updated ?? a.published,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...pages, ...categoryPages, ...articlePages];
}
