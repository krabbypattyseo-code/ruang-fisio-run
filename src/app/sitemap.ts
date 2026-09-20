import type { MetadataRoute } from "next";

import { gearItems } from "@/data/gear";
import { programsContent } from "@/data/programs";
import { sessions } from "@/data/sessions";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:43217";

export default function sitemap(): MetadataRoute.Sitemap {
  const programRoutes = [
    "/programs",
    "/programs/sport",
    "/programs/injury",
    ...programsContent.programs.map((program) => `/programs/sport/${program.id}`),
    ...programsContent.programs.flatMap((program) =>
      program.modules.map((module) => `/programs/sport/${program.id}/${module.id}`),
    ),
    ...programsContent.injuries.map((injury) => `/programs/injury/${injury.id}`),
  ];

  const routes = [
    "",
    "/dashboard",
    "/event",
    "/event/gtr-ultra-30k",
    "/event/gtr-ultra-30k/proyeksi",
    "/event/gtr-ultra-30k/rencana",
    "/event/gtr-ultra-30k/strategi",
    "/gear",
    ...gearItems.map((item) => `/gear/${item.id}`),
    ...programRoutes,
    ...sessions.map((session) => `/sesi/${session.id}`),
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.6,
  }));
}
