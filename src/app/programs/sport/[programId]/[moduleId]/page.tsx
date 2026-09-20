import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { SectionRenderer } from "@/components/programs/section-renderer";
import { getModule, programsContent } from "@/data/programs";

type PageProps = { params: Promise<{ programId: string; moduleId: string }> };

export function generateStaticParams() {
  return programsContent.programs.flatMap((program) =>
    program.modules.map((module) => ({
      programId: program.id,
      moduleId: module.id,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { programId, moduleId } = await params;
  const data = getModule(programId, moduleId);
  if (!data) return { title: "Modul" };
  return { title: `${data.module.title} · ${data.program.shortTitle}`, description: data.module.summary };
}

export default async function ModulePage({ params }: PageProps) {
  const { programId, moduleId } = await params;
  const data = getModule(programId, moduleId);
  if (!data) notFound();
  const { program, module } = data;

  return (
    <div className="w-full px-4 pb-6">
      <div className="pt-3">
        <Link
          href={`/programs/sport/${program.id}`}
          className="inline-flex items-center gap-1 rounded-[26px] bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          {program.shortTitle}
        </Link>
      </div>

      <header className="pt-4 pb-4">
        <p className="text-[10.5px] font-semibold tracking-[0.12em] text-[var(--brand-cyan)] uppercase">
          {program.eyebrow} · Modul
        </p>
        <h1 className="mt-1 font-heading text-xl font-semibold text-[var(--brand-teal)]">
          {module.title}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{module.summary}</p>
      </header>

      <SectionRenderer sections={module.sections} />
    </div>
  );
}
