import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { ReviewBadge } from "@/components/programs/review-badge";
import { SportTile } from "@/components/programs/program-cards";
import { getProgram, programsContent } from "@/data/programs";

type PageProps = { params: Promise<{ programId: string }> };

export function generateStaticParams() {
  return programsContent.programs.map((program) => ({ programId: program.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { programId } = await params;
  const program = getProgram(programId);
  if (!program) return { title: "Program" };
  return { title: program.title, description: program.summary };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { programId } = await params;
  const program = getProgram(programId);
  if (!program) notFound();

  return (
    <div className="w-full px-4 pb-6">
      <div className="pt-3">
        <Link
          href="/programs/sport"
          className="inline-flex items-center gap-1 rounded-[26px] bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Sport
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {programsContent.programs.map((item) => (
          <SportTile
            key={item.id}
            program={item}
            href={`/programs/sport/${item.id}`}
            active={item.id === program.id}
          />
        ))}
      </div>

      <header className="pt-5 pb-3">
        <p className="text-[10.5px] font-semibold tracking-[0.12em] text-[var(--brand-cyan)] uppercase">
          {program.eyebrow}
        </p>
        <h1 className="mt-1 font-heading text-xl font-semibold text-[var(--brand-teal)]">
          {program.title}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{program.summary}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-[26px] bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            {program.meta.level}
          </span>
          <span className="rounded-[26px] bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            {program.meta.duration}
          </span>
          <span className="rounded-[26px] bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
            {program.meta.frequency}
          </span>
        </div>
        <div className="mt-3">
          <ReviewBadge review={program.review} />
        </div>
      </header>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-foreground">Modul</h2>
        <ul className="space-y-2">
          {program.modules.map((module) => (
            <li key={module.id}>
              <Link
                href={`/programs/sport/${program.id}/${module.id}`}
                className="flex items-center justify-between gap-3 rounded-[14px] px-3.5 py-3 ring-1 ring-foreground/10 transition-colors hover:bg-muted/40"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{module.title}</p>
                  <p className="mt-0.5 text-[12.5px] text-muted-foreground">{module.summary}</p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
