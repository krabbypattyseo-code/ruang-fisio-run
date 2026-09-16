import { dataRange, today } from "@/data/sessions";
import type { Session, WorkoutType } from "@/data/types";
import { addDays } from "@/lib/format";

export type TypeFilter = WorkoutType | "all";

export type SessionFilter = {
  type: TypeFilter;
  from: string;
  to: string;
};

export const rangePresets = [
  { key: "30", label: "30 hari" },
  { key: "90", label: "90 hari" },
  { key: "all", label: "Semua" },
] as const;

export const typeOptions: { key: TypeFilter; label: string }[] = [
  { key: "all", label: "All Workout" },
  { key: "road", label: "Road Running" },
  { key: "trail", label: "Trail Running" },
  { key: "hiking", label: "Hiking" },
];

const isValidDate = (value: string | undefined): value is string =>
  Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));

const isType = (value: string | undefined): value is TypeFilter =>
  value === "all" || value === "road" || value === "trail" || value === "hiking";

/** Membaca state filter dari query string; nilai tak dikenal jatuh ke default. */
export function parseFilter(params: Record<string, string | string[] | undefined>) {
  const read = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const type = read("tipe");
  const from = read("dari");
  const to = read("sampai");

  return {
    type: isType(type) ? type : "all",
    from: isValidDate(from) ? from : addDays(today, -89),
    to: isValidDate(to) ? to : dataRange.to,
  } satisfies SessionFilter;
}

export function filterSessions(sessions: Session[], filter: SessionFilter) {
  return sessions.filter(
    (session) =>
      (filter.type === "all" || session.type === filter.type) &&
      session.date >= filter.from &&
      session.date <= filter.to,
  );
}

export function filterToQuery(filter: SessionFilter) {
  const params = new URLSearchParams();
  if (filter.type !== "all") params.set("tipe", filter.type);
  params.set("dari", filter.from);
  params.set("sampai", filter.to);
  return params.toString();
}

/** Preset rentang yang cocok dengan filter aktif, untuk menandai tombol terpilih. */
export function activeRangeKey(filter: SessionFilter) {
  if (filter.to !== dataRange.to) return "custom";
  if (filter.from === dataRange.from) return "all";
  if (filter.from === addDays(today, -29)) return "30";
  if (filter.from === addDays(today, -89)) return "90";
  return "custom";
}

export function rangeToFilter(key: string, filter: SessionFilter): SessionFilter {
  if (key === "all") return { ...filter, from: dataRange.from, to: dataRange.to };
  const days = key === "30" ? 29 : 89;
  return { ...filter, from: addDays(today, -days), to: dataRange.to };
}
