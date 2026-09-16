import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { QuizRunner } from "@/components/quiz-runner";
import { getModule, modules } from "@/content/curriculum";

export function generateStaticParams() {
  return modules.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/kuis/[slug]">) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) return { title: "Kuis tidak ditemukan" };
  return {
    title: `Kuis ${mod.title}`,
    description: `Uji pemahaman modul ${mod.title} lewat ${mod.quiz.length} soal pilihan ganda dengan pembahasan.`,
  };
}

export default async function QuizPage({ params }: PageProps<"/kuis/[slug]">) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href={`/modul/${mod.slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        {mod.title}
      </Link>

      <header className="mt-5 mb-8">
        <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
          Kuis: {mod.title}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Pilih satu jawaban, periksa, lalu baca pembahasannya sebelum lanjut. Skor terakhir
          disimpan otomatis.
        </p>
      </header>

      <QuizRunner module={mod} />
    </div>
  );
}
