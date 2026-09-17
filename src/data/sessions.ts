import { generatedSessions } from "@/data/sessions.generated";
import type { Session } from "@/data/types";

/**
 * Arsip sesi = sheet Komparatif di `5-analisis-lari-gtr.xlsx` (road Jul–Sep 2026)
 * plus `Garmin_Hiking_TrailRunning.xlsx` (hiking/trail Jan 2025–Apr 2026).
 * Wonosobo Garmin dikeluarkan (data sah dari COROS). Impor ulang:
 * python3 scripts/import-sessions.py
 */
export const sessions: Session[] = [...generatedSessions];

export const getSession = (id: string) => sessions.find((session) => session.id === id);

export const dataRange = {
  from: sessions.at(-1)?.date ?? "",
  to: sessions[0]?.date ?? "",
};

/** Tanggal sesi terbaru di arsip — dipakai untuk hitung mundur dan filter bawaan. */
export const today = dataRange.to;
