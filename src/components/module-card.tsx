"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CircleCheckBig, Clock } from "lucide-react";

import { ModuleIcon } from "@/components/module-icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { Module } from "@/content/types";
import { useProgress } from "@/lib/progress";

export function ModuleCard({ module, order }: { module: Module; order: number }) {
  const { moduleProgress, isLoaded, state } = useProgress();
  const progress = moduleProgress(module.slug);
  const minutes = module.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
  const quizResult = state.quizResults[module.slug];

  const firstUnfinished =
    module.lessons.find(
      (lesson) => !state.completedLessons[`${module.slug}/${lesson.slug}`],
    ) ?? module.lessons[0];

  const ctaLabel =
    progress.done === 0 ? "Mulai modul" : progress.percent === 100 ? "Tinjau ulang" : "Lanjutkan";

  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <ModuleIcon name={module.icon} className="size-4.5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground">
              Modul {order} · {module.level}
            </p>
            <CardTitle className="mt-0.5 text-base">{module.title}</CardTitle>
          </div>
          {progress.percent === 100 && isLoaded ? (
            <CircleCheckBig className="ml-auto size-4 shrink-0 text-primary" />
          ) : null}
        </div>
        <CardDescription className="mt-2 line-clamp-3">{module.tagline}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="size-3.5" />
            {module.lessons.length} pelajaran
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {minutes} menit
          </span>
          <span>{module.quiz.length} soal kuis</span>
        </div>

        {isLoaded ? (
          <div className="space-y-1.5">
            <Progress value={progress.percent} />
            <div className="flex items-center justify-between text-xs text-muted-foreground tabular-nums">
              <span>
                {progress.done} dari {progress.total} selesai
              </span>
              {quizResult ? (
                <Badge variant="secondary">
                  Kuis {quizResult.score}/{quizResult.total}
                </Badge>
              ) : null}
            </div>
          </div>
        ) : (
          <Skeleton className="h-6 w-full" />
        )}
      </CardContent>

      <CardFooter className="border-t border-foreground/5 pt-3 pb-3">
        <Link
          href={`/modul/${module.slug}`}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          Lihat isi modul
        </Link>
        <Link
          href={`/modul/${module.slug}/${firstUnfinished.slug}`}
          className={`${buttonVariants({ size: "sm" })} ml-auto`}
        >
          {ctaLabel}
          <ArrowRight data-icon="inline-end" className="size-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
