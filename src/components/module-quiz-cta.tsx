"use client";

import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Module } from "@/content/types";
import { useProgress } from "@/lib/progress";

export function ModuleQuizCta({ module }: { module: Module }) {
  const { state, moduleProgress, isLoaded } = useProgress();

  if (!isLoaded) {
    return (
      <Card size="sm">
        <CardContent>
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  const result = state.quizResults[module.slug];
  const progress = moduleProgress(module.slug);
  const percent = result ? Math.round((result.score / result.total) * 100) : null;

  return (
    <Card size="sm" className="bg-muted/40">
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <p className="font-heading text-sm font-medium">
            {module.quiz.length} soal pilihan ganda dengan pembahasan
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {result
              ? `Skor terakhir ${result.score}/${result.total} (${percent}%). Bisa dikerjakan ulang kapan saja.`
              : progress.percent === 100
                ? "Semua pelajaran selesai—waktu yang tepat untuk menguji pemahaman."
                : "Boleh dikerjakan sekarang, tapi lebih enak setelah semua pelajaran selesai."}
          </p>
        </div>
        {result && percent !== null && percent >= 80 ? (
          <Trophy className="hidden size-5 text-primary sm:block" />
        ) : null}
        <Link
          href={`/kuis/${module.slug}`}
          className={buttonVariants({ variant: result ? "outline" : "default", size: "sm" })}
        >
          {result ? "Kerjakan ulang" : "Mulai kuis"}
          <ArrowRight data-icon="inline-end" className="size-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
