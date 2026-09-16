"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Trophy } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useProgress } from "@/lib/progress";

export function ContinueBanner() {
  const { overall, nextLesson, isLoaded } = useProgress();

  if (!isLoaded) {
    return (
      <Card>
        <CardContent className="space-y-3">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-1 w-full" />
          <Skeleton className="h-8 w-40" />
        </CardContent>
      </Card>
    );
  }

  const next = nextLesson();
  const belumMulai = overall.done === 0;

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            {next ? (
              <Sparkles className="size-4 text-primary" />
            ) : (
              <Trophy className="size-4 text-primary" />
            )}
            <p className="font-heading text-sm font-medium">
              {belumMulai
                ? "Belum ada pelajaran yang diselesaikan"
                : next
                  ? `Progres kamu ${overall.percent}%`
                  : "Semua pelajaran selesai. Mantap!"}
            </p>
          </div>
          <Progress value={overall.percent} />
          <p className="text-xs text-muted-foreground tabular-nums">
            {overall.done} dari {overall.total} pelajaran ·{" "}
            {next
              ? `berikutnya: ${next.lesson.title}`
              : "coba ulang kuis mana pun untuk menguji ingatan"}
          </p>
        </div>

        <Link
          href={
            next
              ? `/modul/${next.module.slug}/${next.lesson.slug}`
              : "/progres"
          }
          className={buttonVariants({ size: "lg" })}
        >
          {belumMulai ? "Mulai pelajaran pertama" : next ? "Lanjutkan belajar" : "Lihat ringkasan"}
          <ArrowRight data-icon="inline-end" className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
