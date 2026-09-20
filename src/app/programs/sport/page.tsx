import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ProgramCard, SportTile } from "@/components/programs/program-cards";
import { getCategory, programsContent } from "@/data/programs";

export const metadata: Metadata = {
  title: "Sport Programs",
  description: getCategory("sport")?.description ?? "Program latihan per olahraga.",
};

export default function SportProgramsPage() {
  const category = getCategory("sport")!;
  const programs = programsContent.programs;

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
          Sport
        </p>
        <h1 className="mt-1 font-heading text-xl font-semibold text-[var(--brand-teal)]">
          {category.title}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{category.description}</p>
      </header>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-foreground">Pilihan olahraga</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {programs.map((program) => (
            <SportTile
              key={program.id}
              program={program}
              href={`/programs/sport/${program.id}`}
            />
          ))}
        </div>
      </section>

      <ul className="mt-4 space-y-2.5">
        {programs.map((program) => (
          <li key={program.id}>
            <ProgramCard program={program} href={`/programs/sport/${program.id}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
