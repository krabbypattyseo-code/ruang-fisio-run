import { CheckCircle2, Clock } from "lucide-react";

import type { Review } from "@/data/programs";
import { cn } from "@/lib/utils";

export function ReviewBadge({
  review,
  className,
}: {
  review: Review;
  className?: string;
}) {
  const pending = review.status === "pending";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[26px] px-2.5 py-1 text-[11px] font-medium leading-snug whitespace-nowrap",
        pending
          ? "bg-[#f7eee6] text-[var(--brand-clay)]"
          : "bg-[var(--brand-teal)] text-[#f0fbfc]",
        className,
      )}
    >
      {pending ? <Clock className="size-3 shrink-0" /> : <CheckCircle2 className="size-3 shrink-0" />}
      {pending
        ? "Menunggu review fisio"
        : `Approved by Fisio · ${review.reviewer ?? "Fisio"}`}
    </span>
  );
}
