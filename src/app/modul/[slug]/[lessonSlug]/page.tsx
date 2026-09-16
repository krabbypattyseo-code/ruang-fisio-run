import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";

import { LessonActions } from "@/components/lesson-actions";
import { LessonBlocks } from "@/components/lesson-blocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLesson, modules } from "@/content/curriculum";

export function generateStaticParams() {
  return modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      slug: module.slug,
      lessonSlug: lesson.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/modul/[slug]/[lessonSlug]">) {
  const { slug, lessonSlug } = await params;
  const found = getLesson(slug, lessonSlug);
  if (!found) return { title: "Pelajaran tidak ditemukan" };
  return {
    title: `${found.lesson.title} — ${found.module.title}`,
    description: found.lesson.summary,
  };
}

export default async function LessonPage({
  params,
}: PageProps<"/modul/[slug]/[lessonSlug]">) {
  const { slug, lessonSlug } = await params;
  const found = getLesson(slug, lessonSlug);
  if (!found) notFound();

  const { module, lesson } = found;
  const position = module.lessons.findIndex((item) => item.slug === lesson.slug) + 1;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href={`/modul/${module.slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        {module.title}
      </Link>

      <header className="mt-5">
        <p className="text-xs font-medium text-muted-foreground">
          Pelajaran {position} dari {module.lessons.length}
          <span className="mx-1.5">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" />
            {lesson.minutes} menit baca
          </span>
        </p>
        <h1 className="mt-2 font-heading text-2xl leading-snug font-semibold sm:text-3xl">
          {lesson.title}
        </h1>
        <p className="mt-3 text-muted-foreground">{lesson.summary}</p>
      </header>

      <div className="mt-8">
        <LessonBlocks blocks={lesson.blocks} />
      </div>

      <Card className="mt-10 bg-primary/[0.04]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            Yang perlu diingat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {lesson.takeaways.map((takeaway) => (
              <li key={takeaway} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-foreground/85">{takeaway}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="mt-8">
        <LessonActions module={module} lesson={lesson} />
      </div>
    </article>
  );
}
