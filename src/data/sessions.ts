import { generatedSessions } from "@/data/sessions.generated";
import type { Session } from "@/data/types";

/**
 * Arsip sesi = sheet Komparatif di `5-analisis-lari-gtr.xlsx` (11 Jul–14 Sep 2026).
 * Lap / zona HR dilengkapi dari ekspor Garmin & COROS di data/raw/.
 * Untuk menambah workout baru: ganti Excel di data/raw/, lalu:
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
