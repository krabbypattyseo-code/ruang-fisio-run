/**
 * Parameter lomba & rencana dari dokumen "Rencana GTR Ultra 30K" (Revisi 3, 17 Sep 2026).
 * Elevasi 1.800 m dan profil POS mengikuti info resmi edisi 2025; sesuaikan jika race book 2026 beda.
 */

export type Checkpoint = {
  name: string;
  km: number;
  elevationM: number;
  /** Meter naik dan turun dari pos sebelumnya; totalnya sama dengan elevasi lomba. */
  gainFromPrevM: number;
  lossFromPrevM: number;
  /** Batas waktu tiba di pos ini, dalam menit dari start. */
  cutoffMin: number;
  hasWater: boolean;
  hasFood: boolean;
  note: string;
};

export type RaceEvent = {
  slug: string;
  name: string;
  category: string;
  date: string;
  startTime: string;
  location: string;
  distanceKm: number;
  elevGainM: number;
  elevLossM: number;
  /** Cut-off time keseluruhan dalam menit. */
  cutoffMin: number;
  /** Target finis realistis (menit), dari rencana latihan. */
  targetFinishMin: number;
  terrain: string;
  checkpoints: Checkpoint[];
  mandatoryGear: string[];
};

export type PlanWeekTemplate = {
  index: number;
  phase: "Reintroduksi" | "Bangun" | "Pemulihan" | "Puncak" | "Taper" | "Pekan lomba";
  longRunKm: number;
  elevM: number;
  /** Perkiraan volume pekanan ≈ long trail + easy road + hills. */
  targetKm: number;
  stopBudget: string;
  focus: string;
};

/**
 * Program 8 minggu dari rencana Revisi 3 — penajaman, bukan bangun dari nol.
 * Kalau runway < 8 minggu, UI tetap menampilkan versi penuh + catatan short runway di halaman rencana.
 */
export const gtrPlanWeeks: PlanWeekTemplate[] = [
  {
    index: 1,
    phase: "Reintroduksi",
    longRunKm: 12,
    elevM: 400,
    targetKm: 28,
    stopBudget: "catat saja",
    focus: "Kembali ke medan. Pelan, kenali lagi jalur. ACWR naik dari 0,57 ke ~0,9.",
  },
  {
    index: 2,
    phase: "Bangun",
    longRunKm: 16,
    elevM: 650,
    targetKm: 34,
    stopBudget: "≤ 30 mnt",
    focus: "Mulai latih turunan panjang. Strength tetap 2×. Catat setiap berhenti.",
  },
  {
    index: 3,
    phase: "Bangun",
    longRunKm: 20,
    elevM: 900,
    targetKm: 40,
    stopBudget: "≤ 20 mnt",
    focus: "Tes disiplin pertama di water station. Bawa jam, catat tiap berhenti.",
  },
  {
    index: 4,
    phase: "Pemulihan",
    longRunKm: 12,
    elevM: 400,
    targetKm: 26,
    stopBudget: "bebas",
    focus: "Volume −35%. Checkpoint: 20 km / 900 m harus sudah pernah selesai.",
  },
  {
    index: 5,
    phase: "Bangun",
    longRunKm: 24,
    elevM: 1200,
    targetKm: 46,
    stopBudget: "≤ 25 mnt",
    focus: "Back-to-back: tambah easy 8 km keesokan hari. Uji nutrisi lomba.",
  },
  {
    index: 6,
    phase: "Puncak",
    longRunKm: 28,
    elevM: 1500,
    targetKm: 50,
    stopBudget: "≤ 25 mnt",
    focus: "Gladi bersih penuh: kit lomba, nutrisi, simulasi water station.",
  },
  {
    index: 7,
    phase: "Taper",
    longRunKm: 14,
    elevM: 600,
    targetKm: 28,
    stopBudget: "≤ 15 mnt",
    focus: "Volume −45%, intensitas dipertahankan. Jaga kaki utuh.",
  },
  {
    index: 8,
    phase: "Pekan lomba",
    longRunKm: 30,
    elevM: 1800,
    targetKm: 30,
    stopBudget: "23 mnt",
    focus: "Dua sesi ringan awal minggu, lalu istirahat total sampai start.",
  },
];

export const gtrUltra: RaceEvent = {
  slug: "gtr-ultra-30k",
  name: "GTR Ultra",
  category: "30K",
  date: "2026-09-27",
  startTime: "05:00",
  location: "Kayuwangi, Banyubiru, Semarang (kaki Gunung Telomoyo)",
  distanceKm: 30,
  elevGainM: 1800,
  elevLossM: 1800,
  cutoffMin: 600,
  targetFinishMin: 510,
  terrain:
    "Kepadatan ~60 m/km — tanjakan terus-menerus, bukan datar dengan satu puncak. ~1.800 m naik dan turun.",
  checkpoints: [
    {
      name: "WS 1",
      km: 6,
      elevationM: 360,
      gainFromPrevM: 360,
      lossFromPrevM: 200,
      cutoffMin: 110,
      hasWater: true,
      hasFood: false,
      note: "Isi botol · 1 gel · jangan duduk. Target tiba ~1:28, berhenti 3 menit.",
    },
    {
      name: "WS 2",
      km: 12,
      elevationM: 720,
      gainFromPrevM: 360,
      lossFromPrevM: 200,
      cutoffMin: 230,
      hasWater: true,
      hasFood: true,
      note: "Makan padat + elektrolit. Target tiba ~3:06, berhenti 5 menit.",
    },
    {
      name: "WS 3",
      km: 18,
      elevationM: 1080,
      gainFromPrevM: 360,
      lossFromPrevM: 360,
      cutoffMin: 350,
      hasWater: true,
      hasFood: true,
      note: "Titik kritis — makan penuh, cek kaki, ganti kaus kaki kalau basah.",
    },
    {
      name: "WS 4",
      km: 24,
      elevationM: 900,
      gainFromPrevM: 360,
      lossFromPrevM: 540,
      cutoffMin: 470,
      hasWater: true,
      hasFood: true,
      note: "Isi penuh terakhir. Target tiba ~6:42, berhenti 6 menit.",
    },
    {
      name: "WS 5",
      km: 28,
      elevationM: 480,
      gainFromPrevM: 240,
      lossFromPrevM: 400,
      cutoffMin: 550,
      hasWater: true,
      hasFood: false,
      note: "Top-up saja. Target tiba ~7:54, berhenti 3 menit.",
    },
    {
      name: "Finish",
      km: 30,
      elevationM: 320,
      gainFromPrevM: 120,
      lossFromPrevM: 100,
      cutoffMin: 600,
      hasWater: true,
      hasFood: true,
      note: "Target finis 8:30 · COT 10:00.",
    },
  ],
  mandatoryGear: [
    "Sepatu trail dengan grip masih layak",
    "Hydration vest kapasitas minimal 1,5 liter",
    "Gel & elektrolit merek yang sama dengan hari lomba",
    "Jas hujan ringan",
    "Headlamp + baterai cadangan",
    "Peluit dan P3K sesuai regulasi panitia",
    "Ponsel terisi penuh + nomor panitia",
  ],
};

/** Profil pelari; nantinya bisa diisi dari halaman pengaturan. */
export const runnerProfile = {
  name: "Harist",
  title: "Pelari trail · Ruang Fisio Run",
  /** Ganti dengan foto profil asli di /public/profile.webp */
  photoSrc: "/profile.webp",
  socials: {
    instagram: "https://instagram.com/",
    tiktok: "https://www.tiktok.com/",
  },
  weightKg: 68,
  /** Liter per jam, hasil uji timbang badan sebelum dan sesudah long run. */
  sweatRateLPerHour: 1.05,
  /** Miligram sodium per liter keringat. */
  sodiumMgPerLiter: 950,
  /** Toleransi karbohidrat per jam, hasil latihan fueling. */
  carbTolerancePerHour: 62,
  maxHr: 188,
  restingHr: 52,
};
