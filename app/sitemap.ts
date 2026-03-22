import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://alfaazo.com";

  const blogSlugs = [
    "10-essential-punjabi-phrases",
    "why-learning-mother-tongue-matters",
    "gurmukhi-vs-shahmukhi",
    "how-to-say-thank-you-in-punjabi",
    "beginners-guide-gurmukhi-alphabet",
    "punjabi-greetings-hello-goodbye",
    "is-punjabi-hard-to-learn",
    "punjabi-vs-hindi-difference",
    "importance-of-learning-punjabi-language-in-2026",
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
