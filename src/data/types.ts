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
  /** Elevasi di akhir lap, dipakai untuk profil rute. */
  elevationM: number;
};

export type Weather = {
  tempC: number;
  humidity: number;
  condition: "Cerah" | "Berawan" | "Gerimis" | "Hujan ringan" | "Berkabut";
};

export type Session = {
  id: string;
  date: string;
  type: WorkoutType;
  /** Label latihan, misalnya "Long run trail" atau "Tempo 6 km". */
  title: string;
  route: string;
  distanceKm: number;
  durationSec: number;
  paceSecPerKm: number;
  elevGainM: number;
  elevLossM: number;
  avgHr: number;
  maxHr: number;
  cadence: number;
  /** Panjang langkah rata-rata dalam meter, diturunkan dari pace dan cadence. */
  strideM: number;
  calories: number;
  /** Rate of perceived exertion, skala 1–10. */
  rpe: number;
  weather: Weather;
  laps: Lap[];
  /** Detik di zona HR 1–5. */
  hrZones: [number, number, number, number, number];
  notes: string;
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
