import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";
import { LANDINGS } from "@/lib/landings";
import { BLOG_ARTICLES, blogUrl } from "@/lib/blog";

const UPDATED_AT = new Date("2026-07-04");

function absoluteImage(path: string) {
  return path.startsWith("http") ? path : `${SITE.url}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap = [
    {
      url: `${SITE.url}/`,
      lastModified: UPDATED_AT,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE.url}/og.jpg`],
    },
  ];

  const landings: MetadataRoute.Sitemap = LANDINGS.map((l) => ({
    url: `${SITE.url}/${l.slug}`,
    lastModified: UPDATED_AT,
    changeFrequency: "monthly",
    priority: 0.9,
    images: [absoluteImage(l.hero)],
  }));

  const blog: MetadataRoute.Sitemap = [
    {
      url: blogUrl(),
      lastModified: UPDATED_AT,
      changeFrequency: "weekly",
      priority: 0.85,
      images: [`${SITE.url}/og.jpg`],
    },
    ...BLOG_ARTICLES.map((article) => ({
      url: blogUrl(article.slug),
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.78,
      images: [absoluteImage(article.cover)],
    })),
  ];

  return [...home, ...landings, ...blog];
}
