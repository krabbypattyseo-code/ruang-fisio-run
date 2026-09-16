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
  terrain: string;
  checkpoints: Checkpoint[];
  mandatoryGear: string[];
};

/**
 * Parameter lomba masih data manual sesuai brief. Sesuaikan angka di sini kalau
 * race book resmi sudah keluar—seluruh proyeksi dan strategi ikut menyesuaikan.
 */
export const gtrUltra: RaceEvent = {
  slug: "gtr-ultra-30k",
  name: "GTR Ultra",
  category: "30K",
  date: "2026-11-22",
  startTime: "05:00",
  location: "Gunung Gajah, Semarang",
  distanceKm: 30,
  elevGainM: 1650,
  elevLossM: 1650,
  cutoffMin: 420,
  terrain: "Singletrack tanah, tanjakan panjang di km 8–14, turunan teknis di km 22–27",
  checkpoints: [
    {
      name: "WS 1 – Cibeureum",
      km: 7.5,
      elevationM: 420,
      gainFromPrevM: 320,
      lossFromPrevM: 200,
      cutoffMin: 85,
      hasWater: true,
      hasFood: false,
      note: "Masih ramai, jangan terpancing pace peserta 15K",
    },
    {
      name: "WS 2 – Pos Bayangan",
      km: 14,
      elevationM: 1180,
      gainFromPrevM: 860,
      lossFromPrevM: 100,
      cutoffMin: 195,
      hasWater: true,
      hasFood: true,
      note: "Titik tertinggi, isi penuh dua botol dan makan padat",
    },
    {
      name: "WS 3 – Saung Kopi",
      km: 21.5,
      elevationM: 760,
      gainFromPrevM: 210,
      lossFromPrevM: 630,
      cutoffMin: 295,
      hasWater: true,
      hasFood: true,
      note: "Sebelum turunan teknis; kencangkan sepatu dan pakai gaiter",
    },
    {
      name: "WS 4 – Jembatan Cipanas",
      km: 27,
      elevationM: 320,
      gainFromPrevM: 160,
      lossFromPrevM: 600,
      cutoffMin: 375,
      hasWater: true,
      hasFood: false,
      note: "Tinggal 3 km jalan kampung, cukup gel terakhir",
    },
    {
      name: "Finish",
      km: 30,
      elevationM: 280,
      gainFromPrevM: 100,
      lossFromPrevM: 120,
      cutoffMin: 420,
      hasWater: true,
      hasFood: true,
      note: "Naik ringan 400 m terakhir menuju garis finis",
    },
  ],
  mandatoryGear: [
    "Hydration pack kapasitas minimal 1 liter",
    "Jas hujan ringan dan emergency blanket",
    "Headlamp + baterai cadangan",
    "Gelas lipat (lomba tanpa cup)",
    "Ponsel terisi penuh + nomor panitia",
  ],
};

/** Profil pelari; nantinya bisa diisi dari halaman pengaturan. */
export const runnerProfile = {
  name: "Harist",
  title: "Pelari trail · Ruang Fisio Run",
  /** Ganti dengan foto profil asli di /public/profile.jpg */
  photoSrc: "/profile.svg",
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
