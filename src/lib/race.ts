import {
  gtrCountdownDays,
  gtrUltra,
  runnerProfile,
  type CountdownDay,
  type RaceEvent,
} from "@/data/event";
import { sessions as allSessions } from "@/data/sessions";
import type { Session } from "@/data/types";
import { addDays, daysBetween, todayInJakarta } from "@/lib/format";
import { gradedKm, recentSessions } from "@/lib/metrics";

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

/** Sesi acuan proyeksi: Bogor Trail 11 Apr 2026. */
const PROJECTION_REF_ID = "garmin-ht-2026-04-11-21-bogor-trail-running";
/** Waktu bergerak resmi sesi itu (total 8:22:13 − berhenti ~2:01:28). */
const PROJECTION_MOVING_SEC = 6 * 3600 + 20 * 60 + 45; // 6:20:45

export type ReadinessComponent = {
  key: string;
  label: string;
  value: number;
  target: number;
  unit: string;
  weight: number;
  score: number;
  hint: string;
};

export type Readiness = {
  score: number;
  level: "Siap" | "Hampir siap" | "Perlu kerja" | "Belum siap";
  components: ReadinessComponent[];
  weeksLeft: number;
  daysLeft: number;
};

/** Status kesiapan: kapasitas trail/hiking sepanjang riwayat + volume 4 pekan terakhir. */
export function readiness(
  sessions: Session[] = allSessions,
  event: RaceEvent = gtrUltra,
  reference: string = todayInJakarta(),
): Readiness {
  const last28 = recentSessions(sessions, reference, 28);
  const history = sessions.filter((session) => session.date <= reference);
  const trailHistory = history.filter((session) => session.type !== "road");
  const yearAgo = addDays(reference, -365);
  const trailLast12 = trailHistory.filter((session) => session.date >= yearAgo);

  const weeklyKm = sum(last28.map((session) => session.distanceKm)) / 4;
  const longest = history.length ? Math.max(...history.map((item) => item.distanceKm)) : 0;
  const maxElev = history.length ? Math.max(...history.map((item) => item.elevGainM)) : 0;
  const maxDurationMin = history.length
    ? Math.max(...history.map((item) => item.durationSec)) / 60
    : 0;
  const trailSessionCount = trailLast12.length;
  const perWeek = last28.length / 4;

  const targets = {
    weeklyKm: Math.round(event.distanceKm * 1.2),
    longest: event.distanceKm,
    maxElev: event.elevGainM,
    timeOnFeet: event.targetFinishMin,
    trailSessions: 8,
    perWeek: 4,
  };

  const components: ReadinessComponent[] = [
    {
      key: "longrun",
      label: "Jarak terjauh",
      value: longest,
      target: targets.longest,
      unit: "km",
      weight: 0.25,
      score: clamp01(longest / targets.longest) * 100,
      hint: "Sesi terpanjang sepanjang riwayat dibanding jarak lomba.",
    },
    {
      key: "elevation",
      label: "Elevasi satu sesi",
      value: maxElev,
      target: targets.maxElev,
      unit: "m",
      weight: 0.25,
      score: clamp01(maxElev / targets.maxElev) * 100,
      hint: "Ascent tertinggi sepanjang riwayat dibanding elevasi lomba.",
    },
    {
      key: "timeOnFeet",
      label: "Waktu di kaki",
      value: maxDurationMin,
      target: targets.timeOnFeet,
      unit: "mnt",
      weight: 0.2,
      score: clamp01(maxDurationMin / targets.timeOnFeet) * 100,
      hint: "Durasi terpanjang sepanjang riwayat dibanding target finis 8:21.",
    },
    {
      key: "specificity",
      label: "Sesi trail & hiking",
      value: trailSessionCount,
      target: targets.trailSessions,
      unit: "sesi/12 bln",
      weight: 0.15,
      score: clamp01(trailSessionCount / targets.trailSessions) * 100,
      hint: "Jumlah sesi non-road 12 bulan terakhir; target 8.",
    },
    {
      key: "consistency",
      label: "Konsistensi 4 pekan",
      value: perWeek,
      target: targets.perWeek,
      unit: "sesi/pekan",
      weight: 0.15,
      score: clamp01(perWeek / targets.perWeek) * 100,
      hint: `Volume jalanan terkini ~${weeklyKm.toFixed(0)} km/pekan; tetap jaga frekuensi.`,
    },
  ];

  const score = Math.round(
    sum(components.map((component) => component.score * component.weight)),
  );
  const daysLeft = Math.max(0, daysBetween(reference, event.date));

  return {
    score,
    level: score >= 85 ? "Siap" : score >= 70 ? "Hampir siap" : score >= 55 ? "Perlu kerja" : "Belum siap",
    components,
    daysLeft,
    weeksLeft: Math.max(0, Math.ceil(daysLeft / 7)),
  };
}

export type ScenarioKey = "disiplin" | "sedang" | "april";

export type Split = {
  name: string;
  km: number;
  segmentKm: number;
  gainFromPrevM: number;
  elapsedMin: number;
  segmentMin: number;
  cutoffMin: number;
  marginMin: number;
  arrivalClock: string;
};

export type Scenario = {
  key: ScenarioKey;
  label: string;
  description: string;
  finishMin: number;
  movingMin: number;
  stopMin: number;
  paceSecPerKm: number;
  gradedPaceSecPerKm: number;
  marginMin: number;
  splits: Split[];
};

export type Projection = {
  reference: Session;
  movingSec: number;
  raceGradedKm: number;
  refGradedKm: number;
  /** Berapa kali lebih panjang lomba dibanding sesi acuan, dalam km setara datar. */
  stretch: number;
  exponent: number;
  scenarios: Scenario[];
  target: Scenario;
};

function buildSplits(finishMin: number, event: RaceEvent, startTime: string): Split[] {
  const segments = event.checkpoints.map((checkpoint, index) => {
    const previousKm = index === 0 ? 0 : event.checkpoints[index - 1].km;
    const segmentKm = checkpoint.km - previousKm;
    return {
      checkpoint,
      segmentKm,
      weight: gradedKm(segmentKm, checkpoint.gainFromPrevM) * (1 + index * 0.05),
    };
  });

  const totalWeight = sum(segments.map((segment) => segment.weight));
  let elapsed = 0;

  return segments.map(({ checkpoint, segmentKm, weight }) => {
    const segmentMin = (weight / totalWeight) * finishMin;
    const previousElapsed = elapsed;
    elapsed += segmentMin;
    // Durasi segmen = kumulatif − kumulatif sebelumnya (satu sumber).
    const derivedSegment = elapsed - previousElapsed;
    const [hour, minute] = startTime.split(":").map(Number);
    const clockTotal = hour * 60 + minute + Math.round(elapsed);
    return {
      name: checkpoint.name,
      km: checkpoint.km,
      segmentKm: Math.round(segmentKm * 10) / 10,
      gainFromPrevM: checkpoint.gainFromPrevM,
      elapsedMin: elapsed,
      segmentMin: derivedSegment,
      cutoffMin: checkpoint.cutoffMin,
      marginMin: checkpoint.cutoffMin - elapsed,
      arrivalClock: `${String(Math.floor(clockTotal / 60) % 24).padStart(2, "0")}:${String(
        ((clockTotal % 60) + 60) % 60,
      ).padStart(2, "0")}`,
    };
  });
}

/**
 * Proyeksi waktu finis: Riegel (eksponen 1,06) pada waktu bergerak sesi Bogor 11 Apr,
 * faktor 0,9 km / 100 m tanjakan. Waktu berhenti ditambahkan per skenario.
 */
export function projection(
  sessions: Session[] = allSessions,
  event: RaceEvent = gtrUltra,
): Projection {
  const referenceSession =
    sessions.find((session) => session.id === PROJECTION_REF_ID) ??
    sessions.find((session) => session.date === "2026-04-11" && session.type === "trail") ??
    sessions[0];

  const movingSec = PROJECTION_MOVING_SEC;
  const refGraded = gradedKm(referenceSession.distanceKm, referenceSession.elevGainM);
  const raceGraded = gradedKm(event.distanceKm, event.elevGainM);
  const stretch = raceGraded / refGraded;
  const exponent = 1.06;
  const movingMin = (movingSec / 60) * stretch ** exponent;

  const definitions: {
    key: ScenarioKey;
    label: string;
    stopMin: number;
    description: string;
  }[] = [
    {
      key: "disiplin",
      label: "Disiplin",
      stopMin: 23,
      description: "Target utama: berhenti total 23 menit di water station.",
    },
    {
      key: "sedang",
      label: "Sedang",
      stopMin: 60,
      description: "Berhenti lebih longgar (±60 menit total), tetap di dalam COT.",
    },
    {
      key: "april",
      label: "Seperti 11 April",
      stopMin: 121,
      description: "Pola berhenti seperti sesi Bogor (≈2 jam) — margin COT tipis.",
    },
  ];

  const scenarios = definitions.map(({ key, label, stopMin, description }) => {
    const finishMin = movingMin + stopMin;
    return {
      key,
      label,
      description,
      finishMin,
      movingMin,
      stopMin,
      paceSecPerKm: (finishMin * 60) / event.distanceKm,
      gradedPaceSecPerKm: (finishMin * 60) / raceGraded,
      marginMin: event.cutoffMin - finishMin,
      splits: buildSplits(finishMin, event, event.startTime),
    } satisfies Scenario;
  });

  return {
    reference: referenceSession,
    movingSec,
    raceGradedKm: raceGraded,
    refGradedKm: refGraded,
    stretch,
    exponent,
    scenarios,
    target: scenarios.find((scenario) => scenario.key === "disiplin") ?? scenarios[0],
  };
}

export type PlanWeek = {
  weekStart: string;
  index: number;
  phase: string;
  targetKm: number;
  longRunKm: number;
  elevM: number;
  stopBudget?: string;
  focus: string;
};

/** @deprecated Gunakan raceCountdown(). */
export function trainingPlan(): PlanWeek[] {
  return [];
}

/** Rencana harian 9 hari menuju lomba. */
export function raceCountdown(event: RaceEvent = gtrUltra): CountdownDay[] {
  void event;
  return gtrCountdownDays;
}

export type ChecklistItem = {
  id: string;
  label: string;
  detail: string;
  status: "aman" | "perlu-kerja" | "kritis";
};

/** Checklist yang isinya mengikuti gap kesiapan, bukan daftar statis. */
export function readinessChecklist(
  status: Readiness = readiness(),
  event: RaceEvent = gtrUltra,
): ChecklistItem[] {
  const byKey = (key: string) => status.components.find((item) => item.key === key)!;
  const level = (score: number): ChecklistItem["status"] =>
    score >= 95 ? "aman" : score >= 70 ? "perlu-kerja" : "kritis";

  const longrun = byKey("longrun");
  const elevation = byKey("elevation");
  const timeOnFeet = byKey("timeOnFeet");
  const specificity = byKey("specificity");

  return [
    {
      id: "longrun",
      label: `Jarak terjauh mendekati ${event.distanceKm} km`,
      detail:
        longrun.value >= longrun.target * 0.85
          ? `Sudah ${longrun.value.toFixed(1)} km (Bogor Trail 11 Apr 2026 ≈ 88% jarak lomba).`
          : `Terpanjang baru ${longrun.value.toFixed(1)} km. Target mendekati ${event.distanceKm} km di medan trail.`,
      status: level(longrun.score),
    },
    {
      id: "elevation",
      label: `Ascent satu sesi menuju ${formatElev(event.elevGainM)} m`,
      detail:
        elevation.value >= elevation.target * 0.8
          ? `Pernah ${Math.round(elevation.value)} m dalam satu sesi (terbaik sepanjang riwayat).`
          : `Ascent tertinggi ${Math.round(elevation.value)} m. Perlu long trail dengan vertikal lebih besar.`,
      status: level(elevation.score),
    },
    {
      id: "timeOnFeet",
      label: "Waktu di kaki ≥ target finis",
      detail:
        timeOnFeet.value >= timeOnFeet.target
          ? `Durasi terpanjang ${Math.round(timeOnFeet.value)} menit, sudah melampaui target 8:21.`
          : `Durasi terpanjang baru ${Math.round(timeOnFeet.value)} menit; target ~${event.targetFinishMin} menit.`,
      status: level(timeOnFeet.score),
    },
    {
      id: "specificity",
      label: "Minimal 8 sesi trail/hiking / 12 bulan",
      detail:
        specificity.value >= specificity.target
          ? `${Math.round(specificity.value)} sesi non-road dalam 12 bulan terakhir.`
          : `Baru ${Math.round(specificity.value)} sesi non-road dalam 12 bulan. Jaga kaki tetap segar sampai start.`,
      status: level(specificity.score),
    },
    {
      id: "stops",
      label: "Disiplin berhenti ≤ 23 menit di lomba",
      detail:
        "Latih di long trail terakhir (Sab 19 Sep): tekan lap setiap berhenti. Target per WS 3–6 menit.",
      status: "kritis",
    },
    {
      id: "gear",
      label: "Cek 10 perlengkapan wajib resmi",
      detail: `${event.mandatoryGear.length} item panitia. Uji kit lengkap di satu sesi terakhir — Sabtu 19 September.`,
      status: "kritis",
    },
  ];
}

function formatElev(meters: number) {
  return new Intl.NumberFormat("id-ID").format(meters);
}

export type FuelingSegment = {
  name: string;
  km: number;
  durationMin: number;
  fluidMl: number;
  carbG: number;
  sodiumMg: number;
  gels: number;
  hasWater: boolean;
  hasFood: boolean;
  note: string;
};

export type FuelingPlan = {
  finishMin: number;
  totalFluidMl: number;
  totalCarbG: number;
  totalSodiumMg: number;
  totalGels: number;
  /** Gel yang dibawa dari garis start (± dua segmen). */
  gelsFromStart: number;
  perHourFluidMl: number;
  perHourCarbG: number;
  fluidNote: string;
  segments: FuelingSegment[];
};

const GEL_CARB_G = 22;

/**
 * Logistik cairan/kalori untuk start malam dataran tinggi.
 * Target 400–600 ml/jam (bukan ganti seluruh keringat Jakarta).
 */
export function fuelingPlan(
  scenario = projection().target,
  event: RaceEvent = gtrUltra,
  profile = runnerProfile,
): FuelingPlan {
  const fluidPerHourMl = profile.raceFluidMlPerHour;
  const carbPerHour = profile.carbTolerancePerHour;

  const segments = scenario.splits.map((split, index) => {
    const checkpoint = event.checkpoints[index];
    const segmentHours = split.segmentMin / 60;
    const carbG = carbPerHour * segmentHours;
    const fluidMl = Math.min(1500, fluidPerHourMl * segmentHours);
    return {
      name: split.name,
      km: split.km,
      durationMin: split.segmentMin,
      fluidMl: Math.round(fluidMl / 50) * 50,
      carbG: Math.round(carbG),
      sodiumMg: Math.round((fluidMl / 1000) * profile.sodiumMgPerLiter * 0.5),
      gels: Math.max(1, Math.round(carbG / GEL_CARB_G)),
      hasWater: checkpoint.hasWater,
      hasFood: checkpoint.hasFood,
      note: checkpoint.note,
    } satisfies FuelingSegment;
  });

  const totalGels = sum(segments.map((segment) => segment.gels));
  const gelsFromStart = Math.min(10, Math.max(8, Math.round(totalGels * 0.35)));

  return {
    finishMin: scenario.finishMin,
    totalFluidMl: sum(segments.map((segment) => segment.fluidMl)),
    totalCarbG: sum(segments.map((segment) => segment.carbG)),
    totalSodiumMg: sum(segments.map((segment) => segment.sodiumMg)),
    totalGels,
    gelsFromStart,
    perHourFluidMl: Math.round(fluidPerHourMl),
    perHourCarbG: carbPerHour,
    fluidNote:
      "400–600 ml/jam di dataran tinggi dini hari; minum mengikuti haus. Jangan pakai sweat rate Jakarta.",
    segments,
  };
}

export const hoursLabel = (minutes: number) => {
  const abs = Math.abs(minutes);
  return `${Math.floor(abs / 60)} jam ${Math.round(abs % 60)} menit`;
};
