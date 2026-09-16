"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, CircleCheckBig } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { lessonKey, neighbourLessons } from "@/content/curriculum";
import type { Lesson, Module } from "@/content/types";
import { useProgress } from "@/lib/progress";

export function LessonActions({ module, lesson }: { module: Module; lesson: Lesson }) {
  const router = useRouter();
  const { isLessonDone, setLessonDone, isLoaded } = useProgress();
  const key = lessonKey(module.slug, lesson.slug);
  const { previous, next } = neighbourLessons(key);
  const done = isLoaded && isLessonDone(module.slug, lesson.slug);

  const isLastOfModule = module.lessons.at(-1)?.slug === lesson.slug;
  const forwardHref = isLastOfModule
    ? `/kuis/${module.slug}`
    : next
      ? `/modul/${next.module.slug}/${next.lesson.slug}`
      : `/kuis/${module.slug}`;

  const handleComplete = () => {
    setLessonDone(module.slug, lesson.slug, !done);
    if (done) {
      toast.success("Ditandai belum selesai");
      return;
    }
    toast.success("Pelajaran selesai", {
      description: isLastOfModule
        ? "Pelajaran terakhir di modul ini. Lanjut ke kuis?"
        : "Progres kamu sudah disimpan di peramban ini.",
    });
    router.push(forwardHref);
  };

  if (!isLoaded) {
    return <Skeleton className="h-10 w-full" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button size="lg" variant={done ? "outline" : "default"} onClick={handleComplete}>
          {done ? (
            <>
              <CircleCheckBig data-icon="inline-start" className="size-4" />
              Sudah selesai — batalkan
            </>
          ) : (
            <>
              <Check data-icon="inline-start" className="size-4" />
              {isLastOfModule ? "Selesai & lanjut ke kuis" : "Selesai & lanjut"}
            </>
          )}
        </Button>
        <Link
          href={`/modul/${module.slug}`}
          className={buttonVariants({ variant: "ghost", size: "lg" })}
        >
          Kembali ke daftar pelajaran
        </Link>
      </div>

      <nav className="flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 pt-5">
        {previous ? (
          <Link
            href={`/modul/${previous.module.slug}/${previous.lesson.slug}`}
            className="group max-w-[45%] text-sm"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowLeft className="size-3" />
              Sebelumnya
            </span>
            <span className="mt-0.5 block truncate font-medium group-hover:underline">
              {previous.lesson.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/modul/${next.module.slug}/${next.lesson.slug}`}
            className="group max-w-[45%] text-right text-sm"
          >
            <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              Berikutnya
              <ArrowRight className="size-3" />
            </span>
            <span className="mt-0.5 block truncate font-medium group-hover:underline">
              {next.lesson.title}
            </span>
          </Link>
        ) : (
          <Link href="/progres" className="text-sm font-medium hover:underline">
            Lihat ringkasan progres
          </Link>
        )}
      </nav>
    </div>
  );
}
