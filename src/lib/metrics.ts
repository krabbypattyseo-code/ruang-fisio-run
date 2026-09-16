import type { Session, WorkoutType } from "@/data/types";
import { addDays, startOfWeek } from "@/lib/format";

export type Summary = {
  sessions: number;
  distanceKm: number;
  durationSec: number;
  elevGainM: number;
  /** Pace rata-rata berbobot jarak, bukan rata-rata dari rata-rata. */
  paceSecPerKm: number;
  avgHr: number;
  cadence: number;
  strideM: number;
  longestKm: number;
  activeDays: number;
};

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

export function summarize(sessions: Session[]): Summary {
  if (sessions.length === 0) {
    return {
      sessions: 0,
      distanceKm: 0,
      durationSec: 0,
      elevGainM: 0,
      paceSecPerKm: 0,
      avgHr: 0,
      cadence: 0,
      strideM: 0,
      longestKm: 0,
      activeDays: 0,
    };
  }

  const distanceKm = sum(sessions.map((session) => session.distanceKm));
  const durationSec = sum(sessions.map((session) => session.durationSec));
  const weight = (value: (session: Session) => number) =>
    sum(sessions.map((session) => value(session) * session.distanceKm)) / distanceKm;

  return {
    sessions: sessions.length,
    distanceKm,
    durationSec,
    elevGainM: sum(sessions.map((session) => session.elevGainM)),
    paceSecPerKm: durationSec / distanceKm,
    avgHr: weight((session) => session.avgHr),
    cadence: weight((session) => session.cadence),
    strideM: weight((session) => session.strideM),
    longestKm: Math.max(...sessions.map((session) => session.distanceKm)),
    activeDays: new Set(sessions.map((session) => session.date)).size,
  };
}

export type WeeklyPoint = {
  weekStart: string;
  label: string;
  road: number;
  trail: number;
  hiking: number;
  total: number;
  elevGainM: number;
  durationSec: number;
};

export function weeklySeries(sessions: Session[]): WeeklyPoint[] {
  const buckets = new Map<string, WeeklyPoint>();

  for (const session of sessions) {
    const weekStart = startOfWeek(session.date);
    const bucket =
      buckets.get(weekStart) ??
      {
        weekStart,
        label: "",
        road: 0,
        trail: 0,
        hiking: 0,
        total: 0,
        elevGainM: 0,
        durationSec: 0,
      };
    bucket[session.type] += session.distanceKm;
    bucket.total += session.distanceKm;
    bucket.elevGainM += session.elevGainM;
    bucket.durationSec += session.durationSec;
    buckets.set(weekStart, bucket);
  }

  return [...buckets.values()]
    .sort((a, b) => (a.weekStart < b.weekStart ? -1 : 1))
    .map((bucket) => ({
      ...bucket,
      road: Math.round(bucket.road * 10) / 10,
      trail: Math.round(bucket.trail * 10) / 10,
      hiking: Math.round(bucket.hiking * 10) / 10,
      total: Math.round(bucket.total * 10) / 10,
      label: new Date(`${bucket.weekStart}T00:00:00Z`).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
      }),
    }));
}

export type TrendPoint = {
  date: string;
  label: string;
  type: WorkoutType;
  paceSecPerKm: number;
  cadence: number;
  strideM: number;
  avgHr: number;
  distanceKm: number;
  /** Rata-rata bergerak 5 sesi, memuluskan naik-turun harian. */
  paceTrend: number;
};

export function trendSeries(sessions: Session[]): TrendPoint[] {
  const ascending = [...sessions].sort((a, b) => (a.date < b.date ? -1 : 1));

  return ascending.map((session, index) => {
    const window = ascending.slice(Math.max(0, index - 4), index + 1);
    const windowDistance = sum(window.map((item) => item.distanceKm));
    return {
      date: session.date,
      label: new Date(`${session.date}T00:00:00Z`).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
      }),
      type: session.type,
      paceSecPerKm: session.paceSecPerKm,
      cadence: session.cadence,
      strideM: session.strideM,
      avgHr: session.avgHr,
      distanceKm: session.distanceKm,
      paceTrend: sum(window.map((item) => item.durationSec)) / windowDistance,
    };
  });
}

export type TypeSplit = {
  type: WorkoutType;
  sessions: number;
  distanceKm: number;
  share: number;
  elevGainM: number;
};

export function splitByType(sessions: Session[]): TypeSplit[] {
  const totalKm = sum(sessions.map((session) => session.distanceKm)) || 1;
  const types: WorkoutType[] = ["road", "trail", "hiking"];

  return types.map((type) => {
    const subset = sessions.filter((session) => session.type === type);
    const distanceKm = sum(subset.map((session) => session.distanceKm));
    return {
      type,
      sessions: subset.length,
      distanceKm: Math.round(distanceKm * 10) / 10,
      share: distanceKm / totalKm,
      elevGainM: sum(subset.map((session) => session.elevGainM)),
    };
  });
}

/** Sesi dalam `days` hari terakhir terhitung dari `reference`. */
export function recentSessions(sessions: Session[], reference: string, days: number) {
  const from = addDays(reference, -(days - 1));
  return sessions.filter((session) => session.date >= from && session.date <= reference);
}

/**
 * Jarak setara datar: setiap 100 m tanjakan dihitung sebagai 0,9 km tambahan.
 * Dipakai untuk membandingkan sesi trail dengan road dan untuk memproyeksikan lomba.
 */
export const gradedKm = (distanceKm: number, elevGainM: number) =>
  distanceKm + (elevGainM / 100) * 0.9;
