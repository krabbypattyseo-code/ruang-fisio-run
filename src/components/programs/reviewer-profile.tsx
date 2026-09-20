import Image from "next/image";

import type { Reviewer } from "@/data/programs";

export function ReviewerProfile({ reviewer }: { reviewer: Reviewer }) {
  return (
    <article className="overflow-hidden rounded-[14px] ring-1 ring-foreground/10">
      <div className="flex items-center gap-3.5 bg-[#e6f4f5] px-4 py-4">
        <div className="relative size-[72px] shrink-0 overflow-hidden rounded-[18px] bg-muted shadow-sm">
          <Image
            src={reviewer.photo}
            alt={reviewer.name}
            fill
            unoptimized
            className="object-cover"
            sizes="72px"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[10.5px] font-semibold tracking-[0.12em] text-[var(--brand-teal)] uppercase">
            {reviewer.eyebrow}
          </p>
          <h2 className="mt-0.5 font-heading text-[17px] leading-snug font-bold text-[var(--brand-teal)]">
            {reviewer.name}
          </h2>
          <p className="mt-0.5 text-[12.5px] text-muted-foreground">{reviewer.role}</p>
        </div>
      </div>
      <div className="space-y-2.5 px-4 py-4">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
            {reviewer.education.heading}
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {reviewer.education.institution}
          </p>
          <p className="text-[13px] text-muted-foreground">{reviewer.education.degree}</p>
          <p className="mt-1.5 inline-flex rounded-[26px] bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            {reviewer.education.years}
          </p>
        </div>
        <p className="text-[12.5px] text-muted-foreground">{reviewer.note}</p>
      </div>
    </article>
  );
}
