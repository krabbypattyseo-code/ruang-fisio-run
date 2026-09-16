export type WorkoutType = "road" | "trail" | "hiking";

export type Lap = {
  index: number;
  distanceKm: number;
  durationSec: number;
  paceSecPerKm: number;
  avgHr: number;
  cadence: number;
  elevGainM: number;
  elevLossM: number;
  /** Elevasi di akhir lap (relatif dari elevasi awal sesi jika tercatat). */
  elevationM: number;
};

export type Weather = {
  /** Null kalau sumber data tidak mencatat suhu. */
  tempC: number | null;
  humidity: number | null;
  condition: string | null;
};

export type SessionSource = "garmin" | "coros";

export type Session = {
  id: string;
  date: string;
  type: WorkoutType;
  title: string;
  route: string;
  distanceKm: number;
  durationSec: number;
  paceSecPerKm: number;
  elevGainM: number;
  elevLossM: number;
  avgHr: number;
  /** Null kalau sumber (mis. COROS) tidak menyediakan HR maksimum. */
  maxHr: number | null;
  cadence: number;
  /** Null kalau tidak tercatat di sumber. */
  strideM: number | null;
  calories: number;
  /** Null kalau RPE tidak tercatat. */
  rpe: number | null;
  weather: Weather;
  laps: Lap[];
  /** Detik di zona HR 1–5; nol semua kalau sumber tidak punya distribusi zona. */
  hrZones: [number, number, number, number, number];
  notes: string;
  source: SessionSource;
};

export const workoutTypeLabel: Record<WorkoutType, string> = {
  road: "Road Running",
  trail: "Trail Running",
  hiking: "Hiking",
};

export const workoutTypeShort: Record<WorkoutType, string> = {
  road: "Road",
  trail: "Trail",
  hiking: "Hiking",
};

export const sourceLabel: Record<SessionSource, string> = {
  garmin: "Garmin",
  coros: "COROS",
};
