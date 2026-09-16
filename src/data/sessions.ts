import { generatedSessions } from "@/data/sessions.generated";
import type { Session } from "@/data/types";

/**
 * Arsip sesi = gabungan ekspor Garmin (Jul–Agu 2026) + COROS (26 Agu–6 Sep 2026).
 * Tidak ada sesi di luar dua berkas itu. Untuk menambah workout baru, taruh file
 * Excel terbaru di data/raw/ lalu jalankan: python3 scripts/import-sessions.py
 */
export const sessions: Session[] = [...generatedSessions];

export const getSession = (id: string) => sessions.find((session) => session.id === id);

export const dataRange = {
  from: sessions.at(-1)?.date ?? "",
  to: sessions[0]?.date ?? "",
};

/** Tanggal sesi terbaru di arsip — dipakai untuk hitung mundur dan filter bawaan. */
export const today = dataRange.to;
