"use client";

import Link from "next/link";
import { Circle, CircleCheckBig, Clock } from "lucide-react";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import type { Module } from "@/content/types";
import { useProgress } from "@/lib/progress";

export function ModuleLessonList({ module }: { module: Module }) {
  const { isLessonDone, setLessonDone, isLoaded } = useProgress();

  if (!isLoaded) {
    return (
      <ul className="divide-y divide-foreground/10">
        {module.lessons.map((lesson) => (
          <li key={lesson.slug} className="py-4">
            <Skeleton className="h-12 w-full" />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="divide-y divide-foreground/10">
      {module.lessons.map((lesson, index) => {
        const done = isLessonDone(module.slug, lesson.slug);
        return (
          <li key={lesson.slug} className="flex items-start gap-3 py-4">
            <button
              type="button"
              aria-pressed={done}
              aria-label={
                done
                  ? `Tandai "${lesson.title}" belum selesai`
                  : `Tandai "${lesson.title}" selesai`
              }
              onClick={() => {
                setLessonDone(module.slug, lesson.slug, !done);
                toast.success(
                  done ? "Ditandai belum selesai" : `"${lesson.title}" selesai`,
                );
              }}
              className="mt-0.5 rounded-full text-muted-foreground transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {done ? (
                <CircleCheckBig className="size-5 text-primary" />
              ) : (
                <Circle className="size-5" />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <Link
                href={`/modul/${module.slug}/${lesson.slug}`}
                className="font-heading text-sm font-medium hover:underline"
              >
                {index + 1}. {lesson.title}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">{lesson.summary}</p>
            </div>

            <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground tabular-nums">
              <Clock className="size-3.5" />
              {lesson.minutes} mnt
            </span>
          </li>
        );
      })}
    </ul>
  );
}
