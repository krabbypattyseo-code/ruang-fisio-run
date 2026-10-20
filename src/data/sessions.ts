import { generatedSessions } from "@/data/sessions.generated";
import { manualSessions } from "@/data/sessions.manual";
import type { Session } from "@/data/types";

/**
 * Arsip sesi = sheet Komparatif di `5-analisis-lari-gtr.xlsx` (road Jul–Sep 2026)
 * plus `Garmin_Hiking_TrailRunning.xlsx` (hiking/trail Jan 2025–Apr 2026)
 * plus impor manual COROS di `sessions.manual.ts`.
 * Wonosobo Garmin dikeluarkan (data sah dari COROS). Impor ulang Excel:
 * python3 scripts/import-sessions.py
 */
function byNewest(a: Session, b: Session) {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  return a.id < b.id ? 1 : -1;
}

const byId = new Map<string, Session>();
for (const session of [...generatedSessions, ...manualSessions]) {
  byId.set(session.id, session);
}

export const sessions: Session[] = [...byId.values()].sort(byNewest);

export const getSession = (id: string) => sessions.find((session) => session.id === id);

export const dataRange = {
  from: sessions.at(-1)?.date ?? "",
  to: sessions[0]?.date ?? "",
};

/** Tanggal sesi terbaru di arsip — dipakai untuk hitung mundur dan filter bawaan. */
export const today = dataRange.to;
