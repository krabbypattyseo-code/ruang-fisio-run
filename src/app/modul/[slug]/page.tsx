import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ListChecks, Target } from "lucide-react";

import { ModuleIcon } from "@/components/module-icon";
import { ModuleLessonList } from "@/components/module-lesson-list";
import { ModuleQuizCta } from "@/components/module-quiz-cta";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getModule, moduleIndex, modules } from "@/content/curriculum";

export function generateStaticParams() {
  return modules.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/modul/[slug]">) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) return { title: "Modul tidak ditemukan" };
  return { title: mod.title, description: mod.tagline };
}

export default async function ModulePage({ params }: PageProps<"/modul/[slug]">) {
  const { slug } = await params;
  const mod = getModule(slug);
  if (!mod) notFound();

  const index = moduleIndex(slug);
  const previousModule = index > 0 ? modules[index - 1] : undefined;
  const nextModule = index < modules.length - 1 ? modules[index + 1] : undefined;
  const minutes = mod.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Semua modul
      </Link>

      <header className="mt-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <ModuleIcon name={mod.icon} className="size-5" />
          </span>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Modul {index + 1} dari {modules.length} · {minutes} menit
            </p>
            <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
              {mod.title}
            </h1>
          </div>
          <Badge variant="outline" className="ml-auto hidden sm:inline-flex">
            {mod.level}
          </Badge>
        </div>
        <p className="mt-4 max-w-2xl text-muted-foreground">{mod.tagline}</p>
      </header>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="size-4 text-primary" />
            Setelah modul ini kamu bisa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {mod.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{outcome}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <section className="mt-10">
        <h2 className="font-heading text-lg font-semibold">Daftar pelajaran</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Klik lingkaran di samping judul untuk menandai pelajaran selesai tanpa membukanya.
        </p>
        <ModuleLessonList module={mod} />
      </section>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
          <ListChecks className="size-4 text-primary" />
          Kuis modul
        </h2>
        <div className="mt-3">
          <ModuleQuizCta module={mod} />
        </div>
      </section>

      <nav className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 pt-6">
        {previousModule ? (
          <Link
            href={`/modul/${previousModule.slug}`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <ArrowLeft data-icon="inline-start" className="size-3.5" />
            {previousModule.title}
          </Link>
        ) : (
          <span />
        )}
        {nextModule ? (
          <Link
            href={`/modul/${nextModule.slug}`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            {nextModule.title}
            <ArrowRight data-icon="inline-end" className="size-3.5" />
          </Link>
        ) : (
          <Link href="/progres" className={buttonVariants({ variant: "outline", size: "sm" })}>
            Lihat ringkasan progres
            <ArrowRight data-icon="inline-end" className="size-3.5" />
          </Link>
        )}
      </nav>
    </div>
  );
}
