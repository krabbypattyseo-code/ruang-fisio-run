"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CircleCheckBig, Circle, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { ModuleIcon } from "@/components/module-icon";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { modules } from "@/content/curriculum";
import { useProgress } from "@/lib/progress";

export function ProgressOverview() {
  const { overall, moduleProgress, state, isLoaded, resetProgress, nextLesson } =
    useProgress();
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-28 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  const next = nextLesson();
  const quizCount = Object.keys(state.quizResults).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <p className="font-heading text-3xl font-semibold tabular-nums">
              {overall.percent}%
            </p>
            <p className="text-sm text-muted-foreground tabular-nums">
              {overall.done} dari {overall.total} pelajaran · {quizCount} dari{" "}
              {modules.length} kuis dikerjakan
            </p>
          </div>
          <Progress value={overall.percent} />
          {next ? (
            <Link
              href={`/modul/${next.module.slug}/${next.lesson.slug}`}
              className={buttonVariants({ size: "sm" })}
            >
              Lanjut: {next.lesson.title}
              <ArrowRight data-icon="inline-end" className="size-3.5" />
            </Link>
          ) : (
            <p className="text-sm text-muted-foreground">
              Seluruh kurikulum selesai. Sekarang giliran praktik di situs sendiri—mulai dari
              audit indexing dan satu topic cluster.
            </p>
          )}
        </CardContent>
      </Card>

      {overall.done === 0 && quizCount === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-8 text-center">
            <p className="font-heading font-medium">Belum ada aktivitas</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Selesaikan satu pelajaran atau kerjakan satu kuis, lalu halaman ini akan
              menampilkan rincian progres per modul.
            </p>
            <Link
              href={`/modul/${modules[0].slug}/${modules[0].lessons[0].slug}`}
              className={`${buttonVariants({ size: "sm" })} mt-4`}
            >
              Mulai pelajaran pertama
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {modules.map((module, index) => {
            const progress = moduleProgress(module.slug);
            const quiz = state.quizResults[module.slug];
            return (
              <Card key={module.slug} size="sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2.5 text-sm">
                    <span className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary">
                      <ModuleIcon name={module.icon} className="size-3.5" />
                    </span>
                    <Link href={`/modul/${module.slug}`} className="hover:underline">
                      Modul {index + 1}: {module.title}
                    </Link>
                    <span className="ml-auto flex items-center gap-2">
                      {quiz ? (
                        <Badge
                          variant={
                            quiz.score / quiz.total >= 0.8 ? "default" : "secondary"
                          }
                        >
                          Kuis {quiz.score}/{quiz.total}
                        </Badge>
                      ) : (
                        <Badge variant="outline">Kuis belum dikerjakan</Badge>
                      )}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Progress value={progress.percent} />
                  <ul className="grid gap-1.5 sm:grid-cols-2">
                    {module.lessons.map((lesson) => {
                      const done = Boolean(
                        state.completedLessons[`${module.slug}/${lesson.slug}`],
                      );
                      return (
                        <li key={lesson.slug} className="flex items-center gap-2 text-sm">
                          {done ? (
                            <CircleCheckBig className="size-3.5 shrink-0 text-primary" />
                          ) : (
                            <Circle className="size-3.5 shrink-0 text-muted-foreground/60" />
                          )}
                          <Link
                            href={`/modul/${module.slug}/${lesson.slug}`}
                            className={`truncate hover:underline ${
                              done ? "text-muted-foreground" : "text-foreground/85"
                            }`}
                          >
                            {lesson.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Card size="sm" className="bg-muted/40">
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="font-heading text-sm font-medium">Mulai dari nol lagi?</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Progres hanya tersimpan di peramban ini. Menghapusnya tidak bisa dibatalkan.
            </p>
          </div>
          {confirmReset ? (
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  resetProgress();
                  setConfirmReset(false);
                  toast.success("Progres dihapus");
                }}
              >
                Ya, hapus semua
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmReset(false)}>
                Batal
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setConfirmReset(true)}>
              <RotateCcw data-icon="inline-start" className="size-3.5" />
              Reset progres
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
