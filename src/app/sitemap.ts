import type { MetadataRoute } from "next";

import { nav, siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return nav.map((item) => ({
    url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
