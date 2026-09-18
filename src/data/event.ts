/**
 * Parameter lomba GTR Ultra 30K — sumber resmi race schedule & mandatory gear (18 Sep 2026).
 * Proyeksi: Riegel pada waktu bergerak sesi Bogor 11 Apr 2026; waktu berhenti skenario terpisah.
 */

export type Checkpoint = {
  name: string;
  km: number;
  elevationM: number;
  /** Meter naik dan turun dari pos sebelumnya; totalnya sama dengan elevasi lomba. */
  gainFromPrevM: number;
  lossFromPrevM: number;
  /**
   * Batas mundur pribadi (menit dari start) — BUKAN cut-off panitia.
   * Panitia hanya merilis COT finish 13.00 WIB.
   */
  cutoffMin: number;
  hasWater: boolean;
  hasFood: boolean;
  note: string;
};

export type RaceScheduleItem = {
  day: "H-1" | "H";
  date: string;
  time: string;
  title: string;
  location?: string;
  highlight?: boolean;
};

export type RaceEvent = {
  slug: string;
  name: string;
  category: string;
  date: string;
  /** Flag off, format HH:MM 24 jam (WIB). */
  startTime: string;
  /** Cut-off jam dinding, format HH:MM WIB. */
  cutoffClock: string;
  location: string;
  distanceKm: number;
  elevGainM: number;
  elevLossM: number;
  /** Cut-off time keseluruhan dalam menit dari start. */
  cutoffMin: number;
  /** Target finis disiplin (menit). */
  targetFinishMin: number;
  terrain: string;
  checkpoints: Checkpoint[];
  mandatoryGear: string[];
  schedule: RaceScheduleItem[];
};

export type CountdownDay = {
  /** Hari relatif ke lomba, mis. -9 … 0 */
  offset: number;
  date: string;
  session: string;
  note: string;
  highlight?: boolean;
  raceDay?: boolean;
};

/**
 * Rencana 9 hari menuju lomba (18–27 Sep 2026).
 * Tidak ada kebugaran baru yang dibangun — fokus segar + uji kit.
 */
export const gtrCountdownDays: CountdownDay[] = [
  {
    offset: -9,
    date: "2026-09-18",
    session: "Istirahat",
    note: "Siapkan semua perlengkapan wajib untuk dicoba besok.",
  },
  {
    offset: -8,
    date: "2026-09-19",
    session: "Long trail terakhir: 12–14 km / ±500 m",
    note: "Mulai sebelum subuh pakai headlamp — gladi start malam. Kit lomba lengkap. Latih berhenti ≤ 3 mnt per titik.",
    highlight: true,
  },
  {
    offset: -7,
    date: "2026-09-20",
    session: "Istirahat / jalan santai",
    note: "Evaluasi apa yang tidak nyaman kemarin.",
  },
  {
    offset: -6,
    date: "2026-09-21",
    session: "Easy road 5 km + 4 strides",
    note: "Cadence 165–168.",
  },
  {
    offset: -5,
    date: "2026-09-22",
    session: "Strength ringan",
    note: "Beban 50–60%, tanpa deadlift/squat berat. Sesi strength terakhir.",
  },
  {
    offset: -4,
    date: "2026-09-23",
    session: "Easy road 5 km",
    note: "HR < 150.",
  },
  {
    offset: -3,
    date: "2026-09-24",
    session: "Istirahat",
    note: "Mulai perbanyak karbohidrat.",
  },
  {
    offset: -2,
    date: "2026-09-25",
    session: "Easy 3 km + 4 strides",
    note: "Tidur 7–8 jam malam ini — lebih menentukan dari malam H−1.",
  },
  {
    offset: -1,
    date: "2026-09-26",
    session: "Race pack 09.00–19.00 · Technical meeting 15.00–16.00",
    note: "Makan malam besar ±17.00. Tidur ±19.00. Lewati Opening MC 23.00.",
  },
  {
    offset: 0,
    date: "2026-09-27",
    session: "Flag off 03.00",
    note: "COT 13.00 WIB.",
    raceDay: true,
  },
];

/** @deprecated Diganti gtrCountdownDays; tetap diekspor kosong agar impor lama tidak pecah. */
export type PlanWeekTemplate = {
  index: number;
  phase: string;
  longRunKm: number;
  elevM: number;
  targetKm: number;
  stopBudget: string;
  focus: string;
};

export const gtrPlanWeeks: PlanWeekTemplate[] = [];

export const gtrUltra: RaceEvent = {
  slug: "gtr-ultra-30k",
  name: "GTR Ultra",
  category: "30K",
  date: "2026-09-27",
  startTime: "03:00",
  cutoffClock: "13:00",
  location: "Lapangan Dusun Kayuwangi, Desa Gedong, Banyubiru, Kab. Semarang",
  distanceKm: 30,
  elevGainM: 1800,
  elevLossM: 1800,
  cutoffMin: 600,
  targetFinishMin: 501,
  terrain:
    "Kepadatan ~60 m/km — tanjakan terus-menerus. ~1.800 m naik. Start dini hari: ~2,5 jam pertama dalam gelap.",
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
      note: "Estimasi · Gelap — headlamp. Target tiba ~1:28 (04.28), berhenti 3 menit.",
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
      note: "Estimasi · Baru terang. Target tiba ~3:06 (06.06), berhenti 5 menit.",
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
      note: "Estimasi · Titik kritis — makan penuh. Target tiba ~4:52 (07.52), berhenti 6 menit.",
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
      note: "Estimasi · Isi penuh terakhir. Target tiba ~6:42 (09.42), berhenti 6 menit.",
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
      note: "Estimasi · Top-up saja. Target tiba ~7:54 (10.54), berhenti 3 menit.",
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
      note: "Target disiplin 8:21 (11.21) · rencana 8:30 (11.30) · COT resmi 13.00.",
    },
  ],
  mandatoryGear: [
    "Running vest (hidrasi)",
    "Softflask (minimal 2 × 500 ml)",
    "Smartwatch / aplikasi GPX",
    "Smartphone",
    "Whistle (peluit)",
    "Headlamp with battery (baterai cadangan)",
    "Personal medications (obat pribadi)",
    "Snack (makanan padat, bukan hanya gel)",
    "Cash money (uang tunai)",
    "Windproof jacket (tahan angin)",
  ],
  schedule: [
    {
      day: "H-1",
      date: "2026-09-26",
      time: "09.00–19.00",
      title: "Race pack collection",
      location: "Hotel d'Emmerick",
    },
    {
      day: "H-1",
      date: "2026-09-26",
      time: "15.00–16.00",
      title: "Technical meeting",
      location: "Hotel d'Emmerick",
    },
    {
      day: "H-1",
      date: "2026-09-26",
      time: "21.00",
      title: "Open race village",
      location: "Lapangan Dusun Kayuwangi",
    },
    {
      day: "H-1",
      date: "2026-09-26",
      time: "23.00",
      title: "Opening MC (boleh dilewati)",
      location: "Lapangan Dusun Kayuwangi",
    },
    {
      day: "H",
      date: "2026-09-27",
      time: "00.00",
      title: "Flag off 52K",
      location: "Lapangan Dusun Kayuwangi",
    },
    {
      day: "H",
      date: "2026-09-27",
      time: "03.00",
      title: "Flag off 30K",
      location: "Lapangan Dusun Kayuwangi",
      highlight: true,
    },
    {
      day: "H",
      date: "2026-09-27",
      time: "05.00",
      title: "Flag off 12K & 7K",
    },
    {
      day: "H",
      date: "2026-09-27",
      time: "07.30",
      title: "COT 7K",
    },
    {
      day: "H",
      date: "2026-09-27",
      time: "09.00",
      title: "COT 12K",
    },
    {
      day: "H",
      date: "2026-09-27",
      time: "10.30",
      title: "Winner ceremony",
    },
    {
      day: "H",
      date: "2026-09-27",
      time: "13.00",
      title: "COT 30K",
      highlight: true,
    },
    {
      day: "H",
      date: "2026-09-27",
      time: "15.00",
      title: "COT 52K",
    },
    {
      day: "H",
      date: "2026-09-27",
      time: "16.00",
      title: "Closing event",
    },
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
  /**
   * Liter per jam dari uji Jakarta 30–32 °C. Untuk lomba dataran tinggi dini hari
   * jangan dipakai langsung sebagai target minum — pakai 400–600 ml/jam.
   */
  sweatRateLPerHour: 1.05,
  /** Miligram sodium per liter keringat. */
  sodiumMgPerLiter: 950,
  /** Toleransi karbohidrat per jam. */
  carbTolerancePerHour: 60,
  maxHr: 188,
  restingHr: 52,
  /** Target cairan lomba (highland + start malam), ml/jam. */
  raceFluidMlPerHour: 500,
};
