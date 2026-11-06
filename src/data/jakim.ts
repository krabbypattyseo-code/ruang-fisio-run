/**
 * Jakarta International Marathon (JAKIM) 2027 — kategori Marathon (42,195 km).
 * Sebelumnya bernama BTN JAKIM; situs resmi 2027 tidak lagi mencantumkan BTN.
 * Sumber: https://jakim.id/ dan https://jakim.id/race (dicek 6 Nov 2026).
 * Yang belum diumumkan panitia sengaja dibiarkan `null`, jangan diisi tebakan.
 */

export type UpcomingRoadRace = {
  slug: string;
  name: string;
  shortName: string;
  formerName?: string;
  category: string;
  distanceKm: number;
  /** Tanggal lomba kategori ini (ISO). */
  date: string;
  /** Rentang tanggal seluruh event (ISO). */
  eventDates: { from: string; to: string };
  /** Flag off HH:MM WIB; null bila belum diumumkan. */
  startTime: string | null;
  /** Cut-off time dalam jam. */
  cutoffHours: number;
  location: string;
  route: string;
  racePack: { from: string; to: string; venue: string; note?: string };
  categories: { label: string; distance: string; day: string }[];
  /** Info yang masih "to be announced" di situs resmi. */
  pending: string[];
  sources: { label: string; url: string }[];
  status: "upcoming";
};

export const jakim2027: UpcomingRoadRace = {
  slug: "jakim-2027",
  name: "Jakarta International Marathon 2027",
  shortName: "JAKIM 2027",
  formerName: "BTN JAKIM",
  category: "Marathon",
  distanceKm: 42.195,
  date: "2027-06-13",
  eventDates: { from: "2027-06-12", to: "2027-06-13" },
  startTime: null,
  cutoffHours: 7,
  location: "Monas – GBK, Jakarta",
  route: "Road, point-to-point dari Monumen Nasional (Monas) ke Gelora Bung Karno (GBK)",
  racePack: {
    from: "2027-06-10",
    to: "2027-06-12",
    venue: "Jakarta International Convention Center (JICC), Senayan",
    note: "Jam pengambilan belum diumumkan",
  },
  categories: [
    { label: "5K", distance: "5 km", day: "Sabtu, 12 Juni 2027" },
    { label: "10K", distance: "10 km", day: "Sabtu, 12 Juni 2027" },
    { label: "Half Marathon", distance: "21,0975 km", day: "Minggu, 13 Juni 2027" },
    { label: "Marathon", distance: "42,195 km", day: "Minggu, 13 Juni 2027" },
  ],
  pending: [
    "Jam flag off Marathon",
    "Detail rute dan profil elevasi",
    "Water station dan fasilitas di rute",
    "Informasi race center",
  ],
  sources: [
    { label: "jakim.id", url: "https://jakim.id/" },
    { label: "jakim.id/race", url: "https://jakim.id/race" },
  ],
  status: "upcoming",
};
