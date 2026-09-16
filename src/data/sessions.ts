import type { Lap, Session, Weather, WorkoutType } from "@/data/types";

/**
 * Data contoh yang dibangkitkan secara deterministik agar tampilan konsisten di
 * setiap build. Ganti modul ini dengan hasil impor Garmin/Strava saat data asli siap;
 * seluruh halaman hanya bergantung pada bentuk `Session`.
 */

const SEED = 20260916;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(SEED);
const between = (min: number, max: number) => min + random() * (max - min);
const pick = <T,>(items: readonly T[]) => items[Math.floor(random() * items.length)];
const round = (value: number, digits = 0) => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};

type SlotTemplate = {
  type: WorkoutType;
  title: string;
  /** Porsi dari volume mingguan yang dialokasikan ke sesi ini. */
  share: number;
  paceRange: [number, number];
  hrRange: [number, number];
  cadenceRange: [number, number];
  /** Meter naik per kilometer. */
  climbPerKm: [number, number];
  rpeRange: [number, number];
  routes: readonly string[];
  notes: readonly string[];
};

const ROAD_ROUTES = [
  "Loop Gasibu – Sabuga",
  "Jalan Riau – Diponegoro",
  "Lintasan Saparua",
  "Kompleks Ruang Fisio – Dago Bawah",
] as const;

const TRAIL_ROUTES = [
  "Punclut – Warung Bandrek",
  "Maribaya – Batu Kuda",
  "Gunung Puntang – Curug Siliwangi",
  "Palintang – Bukit Moko",
] as const;

const HIKING_ROUTES = [
  "Tangkuban Perahu jalur lama",
  "Bukit Moko – Puncak Bintang",
  "Curug Cimahi – Kolam Gembung",
] as const;

const slots: Record<number, SlotTemplate> = {
  // Selasa: easy run pemulihan.
  2: {
    type: "road",
    title: "Easy run",
    share: 0.16,
    paceRange: [345, 372],
    hrRange: [136, 147],
    cadenceRange: [166, 173],
    climbPerKm: [4, 12],
    rpeRange: [3, 4],
    routes: ROAD_ROUTES,
    notes: [
      "Kaki masih berat dari long run, sengaja ditahan di zona 2.",
      "Napas enak, pace naik sendiri di 2 km terakhir.",
      "Panas dan lembap, HR naik 4 bpm dari biasanya di pace sama.",
    ],
  },
  // Rabu: sesi kualitas.
  3: {
    type: "road",
    title: "Tempo",
    share: 0.2,
    paceRange: [286, 308],
    hrRange: [158, 170],
    cadenceRange: [175, 182],
    climbPerKm: [3, 9],
    rpeRange: [6, 8],
    routes: ROAD_ROUTES,
    notes: [
      "Tiga blok tempo 2 km, blok terakhir paling stabil.",
      "Target pace kena, tapi HR sudah 170 di blok ketiga.",
      "Angin dari arah utara bikin blok kedua terasa lebih berat.",
    ],
  },
  // Jumat: easy run pendek sebelum long run.
  5: {
    type: "road",
    title: "Shakeout",
    share: 0.12,
    paceRange: [352, 378],
    hrRange: [130, 142],
    cadenceRange: [164, 172],
    climbPerKm: [3, 10],
    rpeRange: [2, 3],
    routes: ROAD_ROUTES,
    notes: [
      "Sengaja pelan, fokus cadence dan postur.",
      "Kaki enteng, siap long run besok.",
      "Tambah drill 4x20 detik strides di akhir.",
    ],
  },
  // Sabtu: long run trail, sesi kunci menuju GTR Ultra.
  6: {
    type: "trail",
    title: "Long run trail",
    share: 0.37,
    paceRange: [420, 510],
    hrRange: [142, 156],
    cadenceRange: [156, 168],
    climbPerKm: [30, 46],
    rpeRange: [6, 9],
    routes: TRAIL_ROUTES,
    notes: [
      "Tanjakan panjang dipakai power hiking, turunan masih hati-hati.",
      "Fueling tiap 35 menit, perut aman sampai selesai.",
      "Jalur basah setelah hujan semalam, turunan jadi lambat.",
      "Dua botol 500 ml habis, seharusnya bawa tiga untuk durasi ini.",
    ],
  },
  // Minggu: hiking sebagai pemulihan aktif plus adaptasi elevasi.
  0: {
    type: "hiking",
    title: "Hiking pemulihan",
    share: 0.15,
    paceRange: [690, 840],
    hrRange: [112, 128],
    cadenceRange: [108, 124],
    climbPerKm: [48, 82],
    rpeRange: [3, 5],
    routes: HIKING_ROUTES,
    notes: [
      "Jalan santai bareng keluarga, dipakai untuk adaptasi elevasi.",
      "Bawa vest 4 kg untuk latihan beban punggung.",
      "Sekalian uji sepatu trail baru di turunan berbatu.",
    ],
  },
};

/** Faktor volume per pekan: naik 3 pekan, turun 1 pekan untuk pemulihan. */
const weekVolumeKm = [32, 36, 40, 30, 38, 42, 45, 34, 42, 46, 40, 35, 39];

function makeWeather(type: WorkoutType): Weather {
  const condition =
    type === "trail"
      ? pick(["Berkabut", "Berawan", "Hujan ringan", "Cerah"] as const)
      : pick(["Cerah", "Berawan", "Gerimis"] as const);
  return {
    tempC: round(type === "hiking" ? between(19, 25) : between(23, 31)),
    humidity: Math.round(between(68, 92)),
    condition,
  };
}

function makeLaps(
  distanceKm: number,
  paceSecPerKm: number,
  avgHr: number,
  cadence: number,
  elevGainM: number,
  elevLossM: number,
): Lap[] {
  const lapCount = Math.max(1, Math.round(distanceKm));
  const laps: Lap[] = [];
  let elevation = Math.round(between(680, 1150));

  for (let index = 1; index <= lapCount; index += 1) {
    const isLast = index === lapCount;
    const lapDistance = isLast ? round(distanceKm - (lapCount - 1), 2) || 1 : 1;
    // Kelelahan bikin pace melambat sedikit, HR justru naik (cardiac drift).
    const fatigue = (index - 1) / Math.max(1, lapCount - 1);
    const lapPace = Math.round(
      paceSecPerKm * (1 + fatigue * between(0.02, 0.06) + between(-0.04, 0.04)),
    );
    const gain = Math.round((elevGainM / lapCount) * between(0.4, 1.7));
    const loss = Math.round((elevLossM / lapCount) * between(0.4, 1.7));
    elevation = Math.max(600, elevation + gain - loss);

    laps.push({
      index,
      distanceKm: lapDistance,
      durationSec: Math.round(lapPace * lapDistance),
      paceSecPerKm: lapPace,
      avgHr: Math.round(avgHr * (1 + fatigue * 0.045) + between(-3, 3)),
      cadence: Math.round(cadence + between(-4, 4)),
      elevGainM: gain,
      elevLossM: loss,
      elevationM: elevation,
    });
  }

  return laps;
}

function makeHrZones(durationSec: number, type: WorkoutType): Session["hrZones"] {
  const mix =
    type === "road"
      ? [0.08, 0.34, 0.31, 0.21, 0.06]
      : type === "trail"
        ? [0.06, 0.38, 0.4, 0.14, 0.02]
        : [0.3, 0.52, 0.16, 0.02, 0];
  const zones = mix.map((share) => Math.round(durationSec * share));
  const drift = durationSec - zones.reduce((sum, value) => sum + value, 0);
  zones[1] += drift;
  return zones as Session["hrZones"];
}

function buildSessions(): Session[] {
  const result: Session[] = [];
  // Blok latihan 13 pekan yang berakhir di pekan berjalan (Senin, 22 Juni 2026).
  const blockStart = new Date(Date.UTC(2026, 5, 22));
  const today = new Date(Date.UTC(2026, 8, 16));

  weekVolumeKm.forEach((volumeKm, weekIndex) => {
    for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
      const date = new Date(blockStart);
      date.setUTCDate(blockStart.getUTCDate() + weekIndex * 7 + dayOffset);
      if (date > today) return;

      const slot = slots[date.getUTCDay()];
      if (!slot) continue;
      // Hiking hanya dua pekan sekali supaya pola pekan terasa nyata.
      if (slot.type === "hiking" && weekIndex % 2 === 1) continue;

      const distanceKm = round(volumeKm * slot.share * between(0.92, 1.08), 1);
      const paceSecPerKm = Math.round(between(...slot.paceRange));
      const durationSec = Math.round(distanceKm * paceSecPerKm);
      const cadence = Math.round(between(...slot.cadenceRange));
      const elevGainM = Math.round(distanceKm * between(...slot.climbPerKm));
      const elevLossM = Math.round(elevGainM * between(0.82, 1.05));
      const avgHr = Math.round(between(...slot.hrRange));
      const strideM = round(1000 / (paceSecPerKm / 60) / cadence, 2);
      const dateKey = date.toISOString().slice(0, 10);

      result.push({
        id: `${dateKey}-${slot.type}`,
        date: dateKey,
        type: slot.type,
        title:
          slot.title === "Tempo"
            ? `Tempo ${Math.max(2, Math.round(distanceKm * 0.6))} km`
            : slot.title,
        route: pick(slot.routes),
        distanceKm,
        durationSec,
        paceSecPerKm,
        elevGainM,
        elevLossM,
        avgHr,
        maxHr: Math.round(avgHr + between(8, 18)),
        cadence,
        strideM,
        calories: Math.round(distanceKm * between(62, 78) + elevGainM * 0.9),
        rpe: Math.round(between(...slot.rpeRange)),
        weather: makeWeather(slot.type),
        laps: makeLaps(distanceKm, paceSecPerKm, avgHr, cadence, elevGainM, elevLossM),
        hrZones: makeHrZones(durationSec, slot.type),
        notes: pick(slot.notes),
      });
    }
  });

  return result.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Seluruh sesi, terbaru lebih dulu. */
export const sessions: Session[] = buildSessions();

export const getSession = (id: string) => sessions.find((session) => session.id === id);

export const dataRange = {
  from: sessions.at(-1)?.date ?? "",
  to: sessions[0]?.date ?? "",
};

/** Tanggal "hari ini" untuk data contoh, supaya hitung mundur konsisten dengan dataset. */
export const today = dataRange.to;
