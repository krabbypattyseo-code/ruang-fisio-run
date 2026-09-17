import type { Metadata } from "next";
import { CalendarRange, CircleCheckBig, CircleAlert, CircleDot } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { gtrUltra } from "@/data/event";
import { formatDate, formatInteger, formatMinutes } from "@/lib/format";
import { readiness, readinessChecklist, trainingPlan } from "@/lib/race";

export const metadata: Metadata = {
  title: "Rencana latihan menuju GTR Ultra 30K",
  description:
    "Program penajaman 8 minggu dari Rencana GTR Ultra Revisi 3: long trail, vertikal, disiplin berhenti, dan checklist kesiapan.",
};

const phaseTone: Record<string, "default" | "secondary" | "outline"> = {
  Reintroduksi: "secondary",
  Bangun: "default",
  Pemulihan: "secondary",
  Puncak: "default",
  Taper: "outline",
  "Pekan lomba": "outline",
};

const statusIcon = {
  aman: CircleCheckBig,
  "perlu-kerja": CircleDot,
  kritis: CircleAlert,
} as const;

const statusTone = {
  aman: "text-primary",
  "perlu-kerja": "text-amber-600 dark:text-amber-400",
  kritis: "text-destructive",
} as const;

export default function PlanPage() {
  const status = readiness();
  const plan = trainingPlan();
  const checklist = readinessChecklist(status, gtrUltra);
  const peak = plan.find((week) => week.phase === "Puncak") ?? plan[plan.length - 3];
  const shortRunway = status.weeksLeft < 8;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarRange className="size-4 text-primary" />
            {plan.length} pekan penajaman
          </CardTitle>
          <CardDescription>
            Bukan bangun dari nol — kamu sudah pernah 26,4 km / 1.209 m. Target finis{" "}
            {formatMinutes(gtrUltra.targetFinishMin)}, COT {formatMinutes(gtrUltra.cutoffMin)}.
            Puncak di P{peak.index}: {peak.longRunKm} km / {formatInteger(peak.elevM)} m.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {shortRunway ? (
            <p className="rounded-xl bg-amber-500/10 px-3 py-2.5 text-sm text-amber-800 dark:text-amber-200">
              Sisa {status.weeksLeft} pekan — lebih pendek dari 8 minggu penuh. Prioritaskan satu
              long trail 16–20 km lebih dulu, lalu taper; jangan paksa puncak 28 km di dalam 10
              hari terakhir. Target realistis 9:00–9:30.
            </p>
          ) : null}
          <ul className="space-y-2">
            {plan.map((week) => (
              <li key={week.weekStart} className="rounded-xl px-3.5 py-3 ring-1 ring-foreground/10">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">
                    P{week.index}
                    <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                      mulai {formatDate(week.weekStart)}
                    </span>
                  </p>
                  <Badge variant={phaseTone[week.phase] ?? "secondary"}>{week.phase}</Badge>
                </div>
                <dl className="mt-2.5 grid grid-cols-2 gap-2 text-xs tabular-nums sm:grid-cols-4">
                  <div>
                    <dt className="text-muted-foreground">Volume</dt>
                    <dd>{week.targetKm} km</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Long trail</dt>
                    <dd>{week.longRunKm} km</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Vertikal</dt>
                    <dd>{formatInteger(week.elevM)} m</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Berhenti</dt>
                    <dd>{week.stopBudget ?? "—"}</dd>
                  </div>
                </dl>
                <p className="mt-2 text-sm text-muted-foreground">{week.focus}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid gap-3">
        <Card>
          <CardHeader>
            <CardTitle>Checklist kesiapan</CardTitle>
            <CardDescription>
              Mengikuti gap kapasitas trail + disiplin water station dari rencana Revisi 3.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3.5">
              {checklist.map((item) => {
                const Icon = statusIcon[item.status];
                return (
                  <li key={item.id} className="flex gap-2.5">
                    <Icon className={`mt-0.5 size-4 shrink-0 ${statusTone[item.status]}`} />
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aturan main saat rencana ini dijalankan</CardTitle>
            <CardDescription>
              Tiga risiko tersisa: waktu berhenti, jeda trail, dan kerusakan turunan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                "Berhenti hanya untuk hal yang tidak bisa dilakukan sambil berjalan; target total berhenti lomba 23 menit.",
                "Setelah turunan >600 m, beri jeda minimal 4 hari sebelum sesi berkualitas berikutnya.",
                "Di tanjakan: power hiking lebih efisien daripada memaksa berlari (VAM ~360 m/jam).",
                "Pilih rute dengan turunan panjang sejak minggu 2 — lomba punya ~1.800 m turun.",
                "Pakai sepatu, vest, dan nutrisi lomba mulai minggu 5.",
                "Km 1–6 harus terasa terlalu pelan; bawa kebiasaan negative split dari sesi road terakhir.",
              ].map((rule) => (
                <li key={rule} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {rule}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
