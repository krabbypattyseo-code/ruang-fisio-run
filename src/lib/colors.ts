import type { WorkoutType } from "@/data/types";

/**
 * Palet diambil dari aset brand Ruang Fisio: #005A64 teal utama dan #139CAB cyan aksen.
 * Dua warna tambahan dipakai agar tiga tipe latihan tetap terbaca saat ditumpuk.
 */
export const brand = {
  teal: "#005a64",
  cyan: "#139cab",
  clay: "#b4703a",
  rose: "#c04a54",
  slate: "#64748b",
} as const;

export const typeColor: Record<WorkoutType, string> = {
  road: brand.teal,
  trail: brand.cyan,
  hiking: brand.clay,
};

export const metricColor = {
  pace: brand.teal,
  cadence: brand.cyan,
  stride: brand.clay,
  hr: brand.rose,
  cutoff: brand.rose,
  elevation: brand.cyan,
} as const;
