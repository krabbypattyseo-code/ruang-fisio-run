import { gtrUltra, runnerProfile, type RaceEvent } from "@/data/event";
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

/** Status kesiapan dihitung dari data latihan, bukan diisi manual. */
export function readiness(
  sessions: Session[] = allSessions,
  event: RaceEvent = gtrUltra,
  reference: string = today,
): Readiness {
  const last28 = recentSessions(sessions, reference, 28);
  const last42 = recentSessions(sessions, reference, 42);
  const last42Km = sum(last42.map((session) => session.distanceKm)) || 1;

  const weeklyKm = sum(last28.map((session) => session.distanceKm)) / 4;
  const weeklyElev = sum(last28.map((session) => session.elevGainM)) / 4;
  const longest = last42.length ? Math.max(...last42.map((item) => item.distanceKm)) : 0;
  const trailShare =
    sum(
      last42
        .filter((session) => session.type !== "road")
        .map((session) => session.distanceKm),
    ) / last42Km;
  const perWeek = last28.length / 4;

  const targets = {
    weeklyKm: Math.round(event.distanceKm * 1.8),
    longest: Math.round(event.distanceKm * 0.8),
    weeklyElev: Math.round(event.elevGainM * 0.75),
    trailShare: 0.45,
    perWeek: 4,
  };

  const components: ReadinessComponent[] = [
    {
      key: "volume",
      label: "Volume mingguan",
      value: weeklyKm,
      target: targets.weeklyKm,
      unit: "km/pekan",
      weight: 0.25,
      score: clamp01(weeklyKm / targets.weeklyKm) * 100,
      hint: "Rata-rata 4 pekan terakhir dibanding 1,8× jarak lomba.",
    },
    {
      key: "longrun",
      label: "Long run terpanjang",
      value: longest,
      target: targets.longest,
      unit: "km",
      weight: 0.25,
      score: clamp01(longest / targets.longest) * 100,
      hint: "Sesi terpanjang 6 pekan terakhir; patokan 80% jarak lomba.",
    },
    {
      key: "elevation",
      label: "Elevasi mingguan",
      value: weeklyElev,
      target: targets.weeklyElev,
      unit: "m/pekan",
      weight: 0.2,
      score: clamp01(weeklyElev / targets.weeklyElev) * 100,
      hint: "Rata-rata 4 pekan terakhir dibanding 75% elevasi lomba.",
    },
    {
      key: "specificity",
      label: "Porsi trail & hiking",
      value: trailShare * 100,
      target: targets.trailShare * 100,
      unit: "%",
      weight: 0.15,
      score: clamp01(trailShare / targets.trailShare) * 100,
      hint: "Kilometer non-road 6 pekan terakhir; lomba ini sepenuhnya trail.",
    },
    {
      key: "consistency",
      label: "Konsistensi",
      value: perWeek,
      target: targets.perWeek,
      unit: "sesi/pekan",
      weight: 0.15,
      score: clamp01(perWeek / targets.perWeek) * 100,
      hint: "Jumlah sesi per pekan dalam 4 pekan terakhir.",
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
  const pool = recentSessions(sessions, reference, 42).filter(
    (session) => session.type !== "hiking",
  );
  const candidates = pool.filter((session) => session.distanceKm >= 12);
  const ranked = (candidates.length ? candidates : pool).sort(
    (a, b) =>
      a.durationSec / gradedKm(a.distanceKm, a.elevGainM) -
      b.durationSec / gradedKm(b.distanceKm, b.elevGainM),
  );
  const referenceSession = ranked[0] ?? sessions[0];

  const refGraded = gradedKm(referenceSession.distanceKm, referenceSession.elevGainM);
  const raceGraded = gradedKm(event.distanceKm, event.elevGainM);
  const baseMin =
    (referenceSession.durationSec / 60) * (raceGraded / refGraded) ** 1.06;

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
    scenarios,
    target: scenarios.find((scenario) => scenario.key === "target") ?? scenarios[0],
  };
}

export type PlanWeek = {
  weekStart: string
  index: number;
  phase: "Bangun" | "Pemulihan" | "Puncak" | "Taper" | "Pekan lomba";
  targetKm: number;
  longRunKm: number;
  elevM: number;
  focus: string;
};

/** Rencana pekanan diturunkan dari volume saat ini menuju target lomba, ditutup taper. */
export function trainingPlan(
  sessions: Session[] = allSessions,
  event: RaceEvent = gtrUltra,
  reference: string = today,
): PlanWeek[] {
  const status = readiness(sessions, event, reference);
  const last28 = recentSessions(sessions, reference, 28);
  const currentKm = sum(last28.map((session) => session.distanceKm)) / 4;
  const currentElev = sum(last28.map((session) => session.elevGainM)) / 4;
  const longest = last28.length ? Math.max(...last28.map((item) => item.distanceKm)) : 12;

  const weeks = Math.max(3, status.weeksLeft);
  const buildWeeks = weeks - 3;
  const peakKm = Math.max(currentKm * 1.22, event.distanceKm * 1.8);
  const peakElev = Math.max(currentElev * 1.25, event.elevGainM * 0.9);
  const peakLongRun = Math.min(event.distanceKm * 0.95, 28);

  return Array.from({ length: weeks }, (_, index) => {
    const weekStart = startOfWeek(addDays(reference, 7 * (index + 1)));
    const progress = buildWeeks > 1 ? index / (buildWeeks - 1) : 1;
    const isDownWeek = index > 0 && (index + 1) % 4 === 0 && index < buildWeeks;

    if (index < buildWeeks) {
      const ramp = isDownWeek ? 0.75 : 1;
      return {
        weekStart,
        index: index + 1,
        phase: isDownWeek ? "Pemulihan" : "Bangun",
        targetKm: Math.round((currentKm + (peakKm - currentKm) * progress) * ramp),
        longRunKm: Math.round(
          (longest + (peakLongRun - longest) * progress) * (isDownWeek ? 0.7 : 1),
        ),
        elevM: Math.round((currentElev + (peakElev - currentElev) * progress) * ramp),
        focus: isDownWeek
          ? "Turunkan volume 25%, pertahankan satu sesi tanjakan pendek."
          : "Long run trail dengan profil menyerupai lomba, satu sesi tempo di road.",
      } satisfies PlanWeek;
    }

    if (index === buildWeeks) {
      return {
        weekStart,
        index: index + 1,
        phase: "Puncak",
        targetKm: Math.round(peakKm),
        longRunKm: Math.round(peakLongRun),
        elevM: Math.round(peakElev),
        focus: "Simulasi lomba: pakai vest, sepatu, dan fueling yang akan dipakai hari-H.",
      } satisfies PlanWeek;
    }

    if (index === weeks - 1) {
      return {
        weekStart,
        index: index + 1,
        phase: "Pekan lomba",
        targetKm: Math.round(peakKm * 0.35),
        longRunKm: 8,
        elevM: Math.round(peakElev * 0.2),
        focus: "Dua sesi ringan plus strides. Tidur dan karbo jadi prioritas utama.",
      } satisfies PlanWeek;
    }

    return {
      weekStart,
      index: index + 1,
      phase: "Taper",
      targetKm: Math.round(peakKm * 0.65),
      longRunKm: Math.round(peakLongRun * 0.6),
      elevM: Math.round(peakElev * 0.5),
      focus: "Volume turun, intensitas dijaga lewat 3×2 km pace lomba di trail landai.",
    } satisfies PlanWeek;
  });
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
  const specificity = byKey("specificity");
  const volume = byKey("volume");

  return [
    {
      id: "longrun",
      label: `Long run minimal ${Math.round(longrun.target)} km`,
      detail:
        longrun.value >= longrun.target
          ? `Sudah tercapai: terpanjang ${longrun.value.toFixed(1)} km dalam 6 pekan terakhir.`
          : `Terpanjang baru ${longrun.value.toFixed(1)} km. Tambah ${(longrun.target - longrun.value).toFixed(1)} km lagi, idealnya di jalur berprofil mirip lomba.`,
      status: level(longrun.score),
    },
    {
      id: "elevation",
      label: `Elevasi ${Math.round(elevation.target)} m per pekan`,
      detail:
        elevation.value >= elevation.target
          ? `Rata-rata ${Math.round(elevation.value)} m per pekan, cukup untuk ${event.elevGainM} m di hari lomba.`
          : `Baru ${Math.round(elevation.value)} m per pekan. Sisipkan satu sesi hill repeat untuk menutup ${Math.round(elevation.target - elevation.value)} m.`,
      status: level(elevation.score),
    },
    {
      id: "specificity",
      label: "Minimal 45% kilometer di trail",
      detail:
        specificity.value >= specificity.target
          ? `Porsi trail ${Math.round(specificity.value)}%, spesifik dengan medan lomba.`
          : `Porsi trail baru ${Math.round(specificity.value)}%. Pindahkan satu sesi road ke jalur tanah tiap pekan.`,
      status: level(specificity.score),
    },
    {
      id: "volume",
      label: `Volume ${Math.round(volume.target)} km per pekan`,
      detail:
        volume.value >= volume.target
          ? `Volume ${Math.round(volume.value)} km per pekan sudah di rentang aman.`
          : `Volume ${Math.round(volume.value)} km per pekan; naikkan bertahap maksimal 10% tiap pekan.`,
      status: level(volume.score),
    },
    {
      id: "fueling",
      label: "Uji fueling 60 g karbo per jam",
      detail:
        "Lakukan di dua long run terakhir dengan gel dan minuman yang sama seperti hari lomba.",
      status: "perlu-kerja",
    },
    {
      id: "gear",
      label: "Cek perlengkapan wajib",
      detail: `${event.mandatoryGear.length} item wajib menurut panitia; timbang vest penuh sebelum simulasi.`,
      status: "perlu-kerja",
    },
  ];
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
