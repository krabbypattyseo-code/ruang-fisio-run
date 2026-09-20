import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { ReviewBadge } from "@/components/programs/review-badge";
import { getCategory, programsContent } from "@/data/programs";

export const metadata: Metadata = {
  title: "Injury Programs",
  description: getCategory("injury")?.description ?? "Panduan cedera pelari dan pendaki.",
};

export default function InjuryIndexPage() {
  const category = getCategory("injury")!;
  const { injuryIntro, injuries } = programsContent;

  return (
    <div className="w-full px-4 pb-6">
      <div className="pt-3">
        <Link
          href="/programs"
          className="inline-flex items-center gap-1 rounded-[26px] bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Programs
        </Link>
      </div>

      <header className="pt-4 pb-3">
        <p className="text-xs font-medium tracking-[0.16em] text-[var(--brand-cyan)] uppercase">
          Injury
        </p>
        <h1 className="mt-1 font-heading text-xl font-semibold text-[var(--brand-teal)]">
          {category.title}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{category.description}</p>
        <div className="mt-3">
          <ReviewBadge review={category.review} />
        </div>
      </header>

      <section className="space-y-2.5">
        <h2 className="text-sm font-semibold text-foreground">Aturan nyeri</h2>
        <ul className="space-y-2">
          {injuryIntro.rules.map((rule) => (
            <li key={rule} className="flex gap-2.5 text-sm text-muted-foreground">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--brand-cyan)]" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-5 space-y-2.5">
        <h2 className="text-sm font-semibold text-foreground">POLICE</h2>
        <div className="grid grid-cols-2 gap-2">
          {injuryIntro.police.map((item) => (
            <div key={item.letter} className="rounded-xl bg-secondary/80 px-3 py-2.5">
              <p className="text-sm font-semibold text-[var(--brand-teal)]">
                {item.letter} · {item.name}
              </p>
              <p className="mt-1 text-[12.5px] text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 space-y-2.5">
        <h2 className="text-sm font-semibold text-foreground">Daftar cedera</h2>
        <ul className="space-y-2.5">
          {injuries.map((injury) => (
            <li key={injury.id}>
              <Link
                href={`/programs/injury/${injury.id}`}
                className="block overflow-hidden rounded-[14px] bg-background ring-1 ring-foreground/10 transition-shadow hover:shadow-sm"
              >
                <div className="flex gap-3 p-3">
                  <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-[#e6f4f5] text-[12.5px] font-semibold text-[var(--brand-teal)]">
                    {injury.area.split(" ")[0]}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                    <div>
                      <p className="text-[10.5px] font-semibold tracking-[0.12em] text-[var(--brand-cyan)] uppercase">
                        {injury.aka}
                      </p>
                      <h3 className="mt-0.5 text-sm font-semibold text-foreground">{injury.title}</h3>
                      <p className="mt-1 line-clamp-2 text-[12.5px] text-muted-foreground">
                        {injury.summary}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <ReviewBadge review={injury.review} />
                      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-foreground">
                        Details
                        <ChevronRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
