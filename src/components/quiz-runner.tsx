"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, RotateCcw, Trophy, X } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { moduleIndex, modules } from "@/content/curriculum";
import type { Module } from "@/content/types";
import { useProgress } from "@/lib/progress";

type Phase = "menjawab" | "dikoreksi" | "selesai";

export function QuizRunner({ module }: { module: Module }) {
  const { saveQuizResult } = useProgress();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("menjawab");
  const [answers, setAnswers] = useState<number[]>([]);

  const question = module.quiz[current];
  const total = module.quiz.length;
  const score = useMemo(
    () =>
      answers.reduce(
        (sum, answer, index) => sum + (answer === module.quiz[index].answerIndex ? 1 : 0),
        0,
      ),
    [answers, module.quiz],
  );

  const nextModule = modules[moduleIndex(module.slug) + 1];

  const check = () => {
    if (selected === null) return;
    const answerIndex = Number(selected);
    const nextAnswers = [...answers];
    nextAnswers[current] = answerIndex;
    setAnswers(nextAnswers);
    setPhase("dikoreksi");
  };

  const advance = () => {
    if (current + 1 < total) {
      setCurrent(current + 1);
      setSelected(null);
      setPhase("menjawab");
      return;
    }
    const finalScore = answers.reduce(
      (sum, answer, index) => sum + (answer === module.quiz[index].answerIndex ? 1 : 0),
      0,
    );
    saveQuizResult(module.slug, finalScore, total);
    setPhase("selesai");
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setPhase("menjawab");
  };

  if (phase === "selesai") {
    const percent = Math.round((score / total) * 100);
    const lulus = percent >= 80;

    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="space-y-4 text-center">
            <span
              className={`mx-auto grid size-12 place-items-center rounded-full ${
                lulus ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              }`}
            >
              {lulus ? <Trophy className="size-6" /> : <RotateCcw className="size-6" />}
            </span>
            <div>
              <p className="font-heading text-2xl font-semibold tabular-nums">
                {score}/{total} benar ({percent}%)
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {lulus
                  ? "Pemahamanmu sudah kuat. Lanjut ke modul berikutnya."
                  : "Baca ulang pembahasan di bawah, lalu kerjakan sekali lagi. Target sehat: 80%."}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Button variant="outline" onClick={restart}>
                <RotateCcw data-icon="inline-start" className="size-4" />
                Kerjakan ulang
              </Button>
              {nextModule ? (
                <Link href={`/modul/${nextModule.slug}`} className={buttonVariants()}>
                  Modul berikutnya: {nextModule.title}
                  <ArrowRight data-icon="inline-end" className="size-4" />
                </Link>
              ) : (
                <Link href="/progres" className={buttonVariants()}>
                  Lihat ringkasan progres
                  <ArrowRight data-icon="inline-end" className="size-4" />
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold">Pembahasan</h2>
          {module.quiz.map((item, index) => {
            const chosen = answers[index];
            const benar = chosen === item.answerIndex;
            return (
              <Card key={item.id} size="sm">
                <CardHeader>
                  <CardTitle className="flex items-start gap-2 text-sm">
                    <span
                      className={`mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full ${
                        benar ? "bg-primary text-primary-foreground" : "bg-destructive/15 text-destructive"
                      }`}
                    >
                      {benar ? <Check className="size-3" /> : <X className="size-3" />}
                    </span>
                    {index + 1}. {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm">
                  {!benar ? (
                    <p className="text-muted-foreground">
                      Jawabanmu:{" "}
                      <span className="text-destructive">
                        {chosen === undefined ? "tidak dijawab" : item.options[chosen]}
                      </span>
                    </p>
                  ) : null}
                  <p className="text-muted-foreground">
                    Jawaban benar:{" "}
                    <span className="font-medium text-foreground">
                      {item.options[item.answerIndex]}
                    </span>
                  </p>
                  <p className="pt-1 text-foreground/85">{item.explanation}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </div>
    );
  }

  const chosenIndex = answers[current];

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground tabular-nums">
          <span>
            Soal {current + 1} dari {total}
          </span>
          <span>{score} benar sejauh ini</span>
        </div>
        <Progress value={(current / total) * 100} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base leading-snug">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selected}
            onValueChange={(value) => setSelected(String(value))}
            disabled={phase === "dikoreksi"}
          >
            {question.options.map((option, index) => {
              const isAnswer = index === question.answerIndex;
              const isChosen = chosenIndex === index;
              const revealed = phase === "dikoreksi";
              return (
                <label
                  key={option}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                    revealed && isAnswer
                      ? "border-primary/40 bg-primary/5"
                      : revealed && isChosen
                        ? "border-destructive/40 bg-destructive/5"
                        : "border-foreground/10 hover:bg-muted/60"
                  }`}
                >
                  <RadioGroupItem value={String(index)} className="mt-0.5" />
                  <span className="flex-1 text-foreground/90">{option}</span>
                  {revealed && isAnswer ? (
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  ) : null}
                  {revealed && isChosen && !isAnswer ? (
                    <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                  ) : null}
                </label>
              );
            })}
          </RadioGroup>

          {phase === "dikoreksi" ? (
            <div
              className={`mt-4 rounded-xl border px-3.5 py-3 text-sm ${
                chosenIndex === question.answerIndex
                  ? "border-primary/25 bg-primary/5"
                  : "border-amber-500/30 bg-amber-500/5"
              }`}
            >
              <p className="font-heading text-sm font-medium">
                {chosenIndex === question.answerIndex ? "Benar" : "Belum tepat"}
              </p>
              <p className="mt-1 text-foreground/80">{question.explanation}</p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        {phase === "menjawab" ? (
          <Button size="lg" onClick={check} disabled={selected === null}>
            Periksa jawaban
          </Button>
        ) : (
          <Button size="lg" onClick={advance}>
            {current + 1 < total ? "Soal berikutnya" : "Lihat hasil"}
            <ArrowRight data-icon="inline-end" className="size-4" />
          </Button>
        )}
        <Link
          href={`/modul/${module.slug}`}
          className={buttonVariants({ variant: "ghost", size: "lg" })}
        >
          Keluar dari kuis
        </Link>
      </div>
    </div>
  );
}
