const numberFormat = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 });
const integerFormat = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 });

export const formatNumber = (value: number) => numberFormat.format(value);
export const formatInteger = (value: number) => integerFormat.format(Math.round(value));

export const formatKm = (value: number) => `${numberFormat.format(value)} km`;

/** 342 → "5:42" */
export function formatPace(secPerKm: number) {
  if (!Number.isFinite(secPerKm) || secPerKm <= 0) return "–";
  const minutes = Math.floor(secPerKm / 60);
  const seconds = Math.round(secPerKm % 60);
  return `${minutes}:${String(seconds === 60 ? 0 : seconds).padStart(2, "0")}`;
}

export const formatPaceUnit = (secPerKm: number) => `${formatPace(secPerKm)} /km`;

/** 5076 → "1j 24m" */
export function formatDuration(totalSec: number) {
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.round((totalSec % 3600) / 60);
  if (hours === 0) return `${minutes}m`;
  return `${hours}j ${String(minutes).padStart(2, "0")}m`;
}

/** 444 → "7:24", dipakai untuk durasi pendek seperti lap. */
export function formatMinSec(totalSec: number) {
  const minutes = Math.floor(totalSec / 60);
  const seconds = Math.round(totalSec % 60);
  return `${minutes}:${String(seconds === 60 ? 0 : seconds).padStart(2, "0")}`;
}

/** 5076 → "1:24:36" */
export function formatClock(totalSec: number) {
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = Math.round(totalSec % 60);
  return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export const parseDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

export function formatDate(iso: string, style: "short" | "long" | "weekday" = "short") {
  const date = parseDate(iso);
  if (style === "long") {
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  }
  if (style === "weekday") {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: "UTC",
    });
  }
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function daysBetween(fromIso: string, toIso: string) {
  const ms = parseDate(toIso).getTime() - parseDate(fromIso).getTime();
  return Math.round(ms / 86_400_000);
}

export function addDays(iso: string, days: number) {
  const date = parseDate(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Senin pada pekan tanggal tersebut. */
export function startOfWeek(iso: string) {
  const date = parseDate(iso);
  const day = date.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setUTCDate(date.getUTCDate() + diff);
  return date.toISOString().slice(0, 10);
}

/** "4:02" untuk menit total, dipakai pada proyeksi waktu finis. */
export function formatMinutes(totalMin: number) {
  const hours = Math.floor(totalMin / 60);
  const minutes = Math.round(totalMin % 60);
  return `${hours}:${String(minutes === 60 ? 0 : minutes).padStart(2, "0")}`;
}

/** Waktu jam dinding, misalnya start 05:00 + 245 menit → "09:05". */
export function clockFromStart(startTime: string, offsetMin: number) {
  const [hour, minute] = startTime.split(":").map(Number);
  const total = hour * 60 + minute + Math.round(offsetMin);
  const hours = Math.floor(total / 60) % 24;
  return `${String(hours).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}
