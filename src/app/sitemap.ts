import type { MetadataRoute } from "next";

import { sessions } from "@/data/sessions";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:43217";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/dashboard",
    "/event",
    "/event/gtr-ultra-30k",
    "/event/gtr-ultra-30k/proyeksi",
    "/event/gtr-ultra-30k/rencana",
    "/event/gtr-ultra-30k/strategi",
    ...sessions.map((session) => `/sesi/${session.id}`),
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.6,
  }));
}
