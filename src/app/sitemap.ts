import type { MetadataRoute } from "next";

import { modules } from "@/content/curriculum";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:43217";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/glosarium", "/progres"].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.6,
  }));

  const moduleRoutes = modules.flatMap((module) => [
    {
      url: `${baseUrl}/modul/${module.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kuis/${module.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    ...module.lessons.map((lesson) => ({
      url: `${baseUrl}/modul/${module.slug}/${lesson.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);

  return [...staticRoutes, ...moduleRoutes];
}
