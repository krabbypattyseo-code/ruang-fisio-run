import { Badge } from "@/components/ui/badge";
import type { EventStatus } from "@/data/event";

const MAP = {
  dnf: {
    text: "DNF",
    className: "bg-[var(--brand-rose)] text-white border-transparent",
  },
  finished: {
    text: "Finish",
    className: "bg-[var(--brand-teal)] text-white border-transparent",
  },
} as const;

export function StatusBadge({ status }: { status: EventStatus }) {
  if (status === "upcoming") return null;
  const s = MAP[status];
  return (
    <Badge className={s.className} aria-label={`Status lomba: ${s.text}`}>
      {s.text}
    </Badge>
  );
}
