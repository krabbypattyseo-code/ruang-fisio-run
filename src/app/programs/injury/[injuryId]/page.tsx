import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ReviewBadge } from "@/components/programs/review-badge";
import { getInjury, programsContent } from "@/data/programs";

type PageProps = { params: Promise<{ injuryId: string }> };

export function generateStaticParams() {
  return programsContent.injuries.map((injury) => ({ injuryId: injury.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { injuryId } = await params;
  const injury = getInjury(injuryId);
  if (!injury) return { title: "Cedera" };
  return { title: injury.title, description: injury.summary };
}

function BulletList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="space-y-2.5">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--brand-cyan)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function InjuryDetailPage({ params }: PageProps) {
  const { injuryId } = await params;
  const injury = getInjury(injuryId);
  if (!injury) notFound();

  return (
    <div className="w-full px-4 pb-6">
      <div className="pt-3">
        <Link
          href="/programs/injury"
          className="inline-flex items-center gap-1 rounded-[26px] bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Injury
        </Link>
      </div>

      <header className="pt-4 pb-4">
        <p className="text-[10.5px] font-semibold tracking-[0.12em] text-[var(--brand-cyan)] uppercase">
          {injury.area} · {injury.aka}
        </p>
        <h1 className="mt-1 font-heading text-xl font-semibold text-[var(--brand-teal)]">
          {injury.title}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{injury.summary}</p>
        <div className="mt-3">
          <ReviewBadge review={injury.review} />
        </div>
      </header>

      <div className="space-y-5">
        <BulletList title="Gejala" items={injury.symptoms} />
        <BulletList title="Penyebab umum" items={injury.causes} />
        <BulletList title="Langkah awal" items={injury.firstSteps} />
        <BulletList title="Latihan pendukung" items={injury.exercises} />
        <BulletList title="Kembali lari" items={injury.returnToRun} />

        <div className="rounded-xl bg-[#fbeef0] px-3.5 py-3 text-[13px] text-[#7f2a32]">
          Konten ini untuk edukasi, bukan diagnosis atau resep terapi. Kalau nyeri menetap atau
          memburuk, periksakan ke fisioterapis atau dokter.
        </div>
      </div>
    </div>
  );
}
