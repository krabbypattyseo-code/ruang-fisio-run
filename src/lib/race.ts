import { gtrPlanWeeks, gtrUltra, runnerProfile, type RaceEvent } from "@/data/event";
import { sessions as allSessions, today } from "@/data/sessions";
import type { Session } from "@/data/types";
import { addDays, daysBetween, startOfWeek } from "@/lib/format";
import { gradedKm, recentSessions } from "@/lib/metrics";

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

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

/** Status kesiapan: kapasitas trail/hiking 12 bulan + volume/konsistensi 4 pekan terakhir. */
export function readiness(
  sessions: Session[] = allSessions,
  event: RaceEvent = gtrUltra,
  reference: string = today,
): Readiness {
  const last28 = recentSessions(sessions, reference, 28);
  // Kapasitas trail dihitung dari seluruh arsip (Jan 2025+), bukan hanya 12 bulan kalender
  // dari tanggal sesi terakhir — biar Kerinci / Magelang tetap masuk penilaian.
  const history = sessions.filter((session) => session.date <= reference);
  const trailHistory = history.filter((session) => session.type !== "road");

  const weeklyKm = sum(last28.map((session) => session.distanceKm)) / 4;
  const longest = history.length ? Math.max(...history.map((item) => item.distanceKm)) : 0;
  const maxElev = history.length ? Math.max(...history.map((item) => item.elevGainM)) : 0;
  const maxDurationMin = history.length
    ? Math.max(...history.map((item) => item.durationSec)) / 60
    : 0;
  const trailSessionCount = trailHistory.length;
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
      hint: "Sesi terpanjang 12 bulan terakhir dibanding jarak lomba.",
    },
    {
      key: "elevation",
      label: "Elevasi satu sesi",
      value: maxElev,
      target: targets.maxElev,
      unit: "m",
      weight: 0.25,
      score: clamp01(maxElev / targets.maxElev) * 100,
      hint: "Ascent tertinggi 12 bulan terakhir dibanding elevasi lomba.",
    },
    {
      key: "timeOnFeet",
      label: "Waktu di kaki",
      value: maxDurationMin,
      target: targets.timeOnFeet,
      unit: "mnt",
      weight: 0.2,
      score: clamp01(maxDurationMin / targets.timeOnFeet) * 100,
      hint: "Durasi terpanjang dibanding target finis 8:30.",
    },
    {
      key: "specificity",
      label: "Sesi trail & hiking",
      value: trailSessionCount,
      target: targets.trailSessions,
      unit: "sesi/tahun",
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
  const daysLeft = daysBetween(reference, event.date);

  return {
    score,
    level: score >= 85 ? "Siap" : score >= 70 ? "Hampir siap" : score >= 55 ? "Perlu kerja" : "Belum siap",
    components,
    daysLeft,
    weeksLeft: Math.max(0, Math.ceil(daysLeft / 7)),
  };
}

export type ScenarioKey = "agresif" | "target" | "aman";

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
  paceSecPerKm: number;
  gradedPaceSecPerKm: number;
  marginMin: number;
  splits: Split[];
};

export type Projection = {
  reference: Session;
  raceGradedKm: number;
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
      // Segmen belakang diberi bobot lebih besar: pace melambat saat lelah.
      weight: gradedKm(segmentKm, checkpoint.gainFromPrevM) * (1 + index * 0.05),
    };
  });

  const totalWeight = sum(segments.map((segment) => segment.weight));
  let elapsed = 0;

  return segments.map(({ checkpoint, segmentKm, weight }) => {
    const segmentMin = (weight / totalWeight) * finishMin;
    elapsed += segmentMin;
    const [hour, minute] = startTime.split(":").map(Number);
    const clockTotal = hour * 60 + minute + Math.round(elapsed);
    return {
      name: checkpoint.name,
      km: checkpoint.km,
      segmentKm: Math.round(segmentKm * 10) / 10,
      gainFromPrevM: checkpoint.gainFromPrevM,
      elapsedMin: elapsed,
      segmentMin,
      cutoffMin: checkpoint.cutoffMin,
      marginMin: checkpoint.cutoffMin - elapsed,
      arrivalClock: `${String(Math.floor(clockTotal / 60) % 24).padStart(2, "0")}:${String(
        clockTotal % 60,
      ).padStart(2, "0")}`,
    };
  });
}

/**
 * Proyeksi waktu finis memakai rumus Riegel di atas jarak setara datar, dengan sesi
 * terbaik 6 pekan terakhir sebagai acuan. Bukan ramalan—alat untuk menguji skenario.
 */
export function projection(
  sessions: Session[] = allSessions,
  event: RaceEvent = gtrUltra,
  reference: string = today,
): Projection {
  const pool = sessions.filter(
    (session) =>
      session.date <= reference &&
      (session.type === "trail" || (session.type === "road" && session.distanceKm >= 12)),
  );
  const candidates = pool.filter((session) => session.distanceKm >= 12);
  const longTrails = candidates
    .filter((session) => session.type === "trail" && session.distanceKm >= 15)
    .sort((a, b) => b.distanceKm - a.distanceKm);
  const ranked = (candidates.length ? candidates : pool).sort(
    (a, b) =>
      a.durationSec / gradedKm(a.distanceKm, a.elevGainM) -
      b.durationSec / gradedKm(b.distanceKm, b.elevGainM),
  );
  // Acuan utama: trail panjang mendekati jarak lomba (mis. Bogor 26,4 km), bukan 5K road.
  const referenceSession = longTrails[0] ?? ranked[0] ?? sessions[0];

  const refGraded = gradedKm(referenceSession.distanceKm, referenceSession.elevGainM);
  const raceGraded = gradedKm(event.distanceKm, event.elevGainM);
  // Eksponen Riegel dinaikkan saat lompatan jaraknya jauh: melipatgandakan jarak dari
  // sesi acuan selalu menghasilkan pelemahan lebih besar daripada 1,06 saja.
  const stretch = raceGraded / refGraded;
  const exponent = 1.06 + 0.05 * Math.max(0, stretch - 1.5);
  const baseMin = (referenceSession.durationSec / 60) * stretch ** exponent;

  const definitions: { key: ScenarioKey; label: string; factor: number; description: string }[] = [
    {
      key: "agresif",
      label: "Agresif",
      factor: 0.94,
      description: "Semua berjalan mulus: cuaca sejuk, perut aman, turunan dihajar.",
    },
    {
      key: "target",
      label: "Target",
      factor: 1,
      description: "Proyeksi dari kebugaran saat ini lewat rumus Riegel.",
    },
    {
      key: "aman",
      label: "Aman",
      factor: 1.12,
      description: "Ada kram, antre di pos, atau jalur becek—tetap finis nyaman.",
    },
  ];

  const scenarios = definitions.map(({ key, label, factor, description }) => {
    const finishMin = baseMin * factor;
    return {
      key,
      label,
      description,
      finishMin,
      paceSecPerKm: (finishMin * 60) / event.distanceKm,
      gradedPaceSecPerKm: (finishMin * 60) / raceGraded,
      marginMin: event.cutoffMin - finishMin,
      splits: buildSplits(finishMin, event, event.startTime),
    } satisfies Scenario;
  });

  return {
    reference: referenceSession,
    raceGradedKm: raceGraded,
    stretch,
    exponent,
    scenarios,
    target: scenarios.find((scenario) => scenario.key === "target") ?? scenarios[0],
  };
}

export type PlanWeek = {
  weekStart: string;
  index: number;
  phase: "Reintroduksi" | "Bangun" | "Pemulihan" | "Puncak" | "Taper" | "Pekan lomba";
  targetKm: number;
  longRunKm: number;
  elevM: number;
  stopBudget?: string;
  focus: string;
};

/** Rencana 8 minggu dari dokumen Revisi 3; di-anchor ke pekan setelah tanggal acuan. */
export function trainingPlan(
  sessions: Session[] = allSessions,
  event: RaceEvent = gtrUltra,
  reference: string = today,
): PlanWeek[] {
  void sessions;
  void event;
  return gtrPlanWeeks.map((week) => ({
    weekStart: startOfWeek(addDays(reference, 7 * week.index)),
    index: week.index,
    phase: week.phase,
    targetKm: week.targetKm,
    longRunKm: week.longRunKm,
    elevM: week.elevM,
    stopBudget: week.stopBudget,
    focus: week.focus,
  }));
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
          ? `Pernah ${Math.round(elevation.value)} m dalam satu sesi — mendekati elevasi lomba.`
          : `Ascent tertinggi ${Math.round(elevation.value)} m. Perlu long trail dengan vertikal lebih besar.`,
      status: level(elevation.score),
    },
    {
      id: "timeOnFeet",
      label: "Waktu di kaki ≥ target finis",
      detail:
        timeOnFeet.value >= timeOnFeet.target
          ? `Durasi terpanjang ${Math.round(timeOnFeet.value)} menit, sudah melampaui target 8:30.`
          : `Durasi terpanjang baru ${Math.round(timeOnFeet.value)} menit; target ~${event.targetFinishMin} menit.`,
      status: level(timeOnFeet.score),
    },
    {
      id: "specificity",
      label: "Minimal 8 sesi trail/hiking / tahun",
      detail:
        specificity.value >= specificity.target
          ? `${Math.round(specificity.value)} sesi non-road dalam 12 bulan.`
          : `Baru ${Math.round(specificity.value)} sesi. Risiko: jeda trail panjang mengikis ketajaman medan.`,
      status: level(specificity.score),
    },
    {
      id: "stops",
      label: "Disiplin berhenti ≤ 23 menit di lomba",
      detail:
        "Latih di tiap long trail: tekan lap setiap berhenti. Target per WS 3–6 menit, bukan istirahat panjang.",
      status: "kritis",
    },
    {
      id: "gear",
      label: "Cek perlengkapan wajib",
      detail: `${event.mandatoryGear.length} item; uji vest & nutrisi mulai minggu 5.`,
      status: "perlu-kerja",
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
  perHourFluidMl: number;
  perHourCarbG: number;
  segments: FuelingSegment[];
};

const GEL_CARB_G = 22;

/** Logistik cairan dan kalori memakai sweat rate pribadi dan proyeksi waktu. */
export function fuelingPlan(
  scenario = projection().target,
  event: RaceEvent = gtrUltra,
  profile = runnerProfile,
): FuelingPlan {
  // Target realistis: ganti 80% kehilangan cairan, sisanya toleransi tubuh.
  const fluidPerHourMl = profile.sweatRateLPerHour * 1000 * 0.8;

  const segments = scenario.splits.map((split, index) => {
    const checkpoint = event.checkpoints[index];
    const segmentHours = split.segmentMin / 60;
    const carbG = profile.carbTolerancePerHour * segmentHours;
    const fluidMl = fluidPerHourMl * segmentHours;
    return {
      name: split.name,
      km: split.km,
      durationMin: split.segmentMin,
      fluidMl: Math.round(fluidMl / 50) * 50,
      carbG: Math.round(carbG),
      sodiumMg: Math.round((fluidMl / 1000) * profile.sodiumMgPerLiter * 0.7),
      gels: Math.max(1, Math.round(carbG / GEL_CARB_G)),
      hasWater: checkpoint.hasWater,
      hasFood: checkpoint.hasFood,
      note: checkpoint.note,
    } satisfies FuelingSegment;
  });

  return {
    finishMin: scenario.finishMin,
    totalFluidMl: sum(segments.map((segment) => segment.fluidMl)),
    totalCarbG: sum(segments.map((segment) => segment.carbG)),
    totalSodiumMg: sum(segments.map((segment) => segment.sodiumMg)),
    totalGels: sum(segments.map((segment) => segment.gels)),
    perHourFluidMl: Math.round(fluidPerHourMl),
    perHourCarbG: profile.carbTolerancePerHour,
    segments,
  };
}

export const hoursLabel = (minutes: number) => `${Math.floor(minutes / 60)} jam ${Math.round(minutes % 60)} menit`;
