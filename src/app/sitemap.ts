import type { MetadataRoute } from "next";

import { sessions } from "@/data/sessions";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:43217";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/event",
    "/event/proyeksi",
    "/event/rencana",
    "/event/strategi",
    ...sessions.map((session) => `/sesi/${session.id}`),
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.6,
  }));
}
