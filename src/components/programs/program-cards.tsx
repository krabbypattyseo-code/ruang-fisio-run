import Link from "next/link";
import { ChevronRight, Dumbbell, Mountain, PersonStanding } from "lucide-react";

import { ReviewBadge } from "@/components/programs/review-badge";
import type { Program, Review } from "@/data/programs";
import { cn } from "@/lib/utils";

const programIcons = {
  running: PersonStanding,
  dumbbell: Dumbbell,
  mountain: Mountain,
} as const;

export function ProgramCard({
  program,
  href,
}: {
  program: Program;
  href: string;
}) {
  const Icon = programIcons[program.icon as keyof typeof programIcons] ?? PersonStanding;

  return (
    <Link
      href={href}
      className="block overflow-hidden rounded-[14px] bg-background ring-1 ring-foreground/10 transition-shadow hover:shadow-sm"
    >
      <div className="flex gap-3 p-3">
        <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-[#e6f4f5] text-[var(--brand-teal)]">
          <Icon className="size-7" strokeWidth={1.75} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <p className="text-[10.5px] font-semibold tracking-[0.12em] text-[var(--brand-cyan)] uppercase">
              {program.eyebrow}
            </p>
            <h2 className="mt-0.5 font-heading text-[15px] leading-snug font-semibold text-foreground">
              {program.title}
            </h2>
            <p className="mt-1 line-clamp-2 text-[12.5px] text-muted-foreground">{program.summary}</p>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <ReviewBadge review={program.review} />
            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-foreground">
              Details
              <ChevronRight className="size-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CategoryCard({
  title,
  description,
  href,
  review,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  review: Review;
  icon: "sport" | "injury";
}) {
  return (
    <Link
      href={href}
      className="block overflow-hidden rounded-[14px] bg-background p-4 ring-1 ring-foreground/10 transition-shadow hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-xl bg-[#e6f4f5] text-[var(--brand-teal)]">
          {icon === "sport" ? (
            <PersonStanding className="size-6" strokeWidth={1.75} />
          ) : (
            <AlertCross className="size-6" />
          )}
        </div>
        <div className="min-w-0">
          <h2 className="font-heading text-[17px] font-semibold text-foreground">{title}</h2>
          <p className="mt-0.5 text-[12.5px] text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <ReviewBadge review={review} />
        <span className="inline-flex items-center gap-0.5 text-xs font-medium text-foreground">
          Details
          <ChevronRight className="size-3.5" />
        </span>
      </div>
    </Link>
  );
}

export function SportTile({
  program,
  href,
  active,
}: {
  program: Program;
  href: string;
  active?: boolean;
}) {
  const Icon = programIcons[program.icon as keyof typeof programIcons] ?? PersonStanding;

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center gap-2 rounded-[14px] px-1.5 py-3 text-center text-[12.5px] font-medium transition-colors",
        active
          ? "bg-[#e6f4f5] text-[var(--brand-teal)] ring-1 ring-[var(--brand-cyan)]/30"
          : "bg-secondary text-foreground hover:bg-[#e6f4f5]",
      )}
    >
      <span className="grid size-[52px] place-items-center rounded-[14px] bg-background text-[var(--brand-teal)] shadow-sm">
        <Icon className="size-7" strokeWidth={1.75} />
      </span>
      {program.shortTitle}
    </Link>
  );
}

function AlertCross({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 3c-2.2 3.8-6 5.4-6 10a6 6 0 0 0 12 0c0-4.6-3.8-6.2-6-10Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M12 10v4M12 16.5h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
