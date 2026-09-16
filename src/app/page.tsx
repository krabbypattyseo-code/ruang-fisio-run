import Link from "next/link";
import { BookOpen, Clock, ListChecks, Target } from "lucide-react";

import { ContinueBanner } from "@/components/continue-banner";
import { ModuleCard } from "@/components/module-card";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  modules,
  totalLessons,
  totalMinutes,
  totalQuizQuestions,
} from "@/content/curriculum";

const stats = [
  { label: "Modul", value: `${modules.length}`, icon: Target },
  { label: "Pelajaran", value: `${totalLessons}`, icon: BookOpen },
  { label: "Soal kuis", value: `${totalQuizQuestions}`, icon: ListChecks },
  { label: "Estimasi waktu", value: `${Math.round(totalMinutes / 60)} jam`, icon: Clock },
];

const principles = [
  {
    title: "Diagnosis sebelum taktik",
    body: "Setiap modul dimulai dari cara memeriksa keadaan situsmu, supaya kamu tidak memperbaiki hal yang tidak rusak.",
  },
  {
    title: "Contoh yang bisa ditiru",
    body: "Ada markup, rumus prioritas, dan template laporan yang bisa langsung kamu pakai di pekerjaan nyata.",
  },
  {
    title: "Kuis untuk mengunci ingatan",
    body: "Tiap modul ditutup kuis dengan pembahasan jawaban, bukan hanya benar atau salah.",
  },
];

export default function HomePage() {
  const firstLesson = modules[0].lessons[0];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        <div>
          <p className="text-xs font-medium tracking-wide text-primary uppercase">
            Kurikulum SEO berbahasa Indonesia
          </p>
          <h1 className="mt-3 font-heading text-3xl leading-tight font-semibold sm:text-4xl">
            Belajar SEO secara berurutan, dari cara kerja mesin pencari sampai laporan
            bulanan
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Enam modul yang dirancang untuk dikerjakan berurutan. Tidak ada janji peringkat
            satu dalam seminggu—yang ada kerangka kerja, contoh konkret, dan kuis untuk
            memastikan kamu benar-benar paham sebelum lanjut.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href={`/modul/${modules[0].slug}/${firstLesson.slug}`}
              className={buttonVariants({ size: "lg" })}
            >
              Mulai dari modul pertama
            </Link>
            <Link
              href="/glosarium"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Buka glosarium
            </Link>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-muted/50 px-3 py-3 ring-1 ring-foreground/5"
              >
                <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <stat.icon className="size-3.5" />
                  {stat.label}
                </dt>
                <dd className="mt-1 font-heading text-xl font-semibold tabular-nums">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-3">
          <ContinueBanner />
          <Card size="sm" className="bg-muted/40">
            <CardContent className="space-y-3">
              {principles.map((principle) => (
                <div key={principle.title}>
                  <p className="font-heading text-sm font-medium">{principle.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{principle.body}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-heading text-xl font-semibold">Jalur belajar</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ikuti urutannya kalau kamu baru mulai. Kalau sudah punya pengalaman, langsung
              lompat ke modul yang paling menghambat situsmu.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => (
            <ModuleCard key={module.slug} module={module} order={index + 1} />
          ))}
        </div>
      </section>
    </div>
  );
}
