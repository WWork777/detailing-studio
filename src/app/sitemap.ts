import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
import { LANDINGS } from "@/lib/landings";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];

  const landings: MetadataRoute.Sitemap = LANDINGS.map((l) => ({
    url: `${SITE.url}/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...home, ...landings];
}
