import Link from "next/link";
import type { Metadata } from "next";
import { LineChart, TriangleAlert } from "lucide-react";

import { ProjectionChart } from "@/components/charts/projection-chart";
import { ScenarioSplits } from "@/components/scenario-splits";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { gtrUltra } from "@/data/event";
import { workoutTypeLabel } from "@/data/types";
import {
  formatClock,
  formatCutoffMargin,
  formatDate,
  formatInteger,
  formatMinutes,
  formatNumber,
  formatPace,
} from "@/lib/format";
import { projection } from "@/lib/race";

export const metadata: Metadata = {
  title: "Proyeksi waktu GTR Ultra 30K",
  description:
    "Tiga skenario waktu finis dari Riegel pada waktu bergerak Bogor 11 April, dibanding COT 13.00 WIB.",
};

export default function ProjectionPage() {
  const forecast = projection();
  const { reference } = forecast;

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        {forecast.scenarios.map((scenario) => (
          <Card key={scenario.key} size="sm">
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Skenario {scenario.label}</p>
                {scenario.key === "disiplin" ? <Badge>target</Badge> : null}
              </div>
              <p className="mt-1 font-heading text-2xl font-semibold tabular-nums">
                {formatMinutes(scenario.finishMin)}
                <span className="ml-1 text-sm font-normal text-muted-foreground">jam</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground tabular-nums">
                Bergerak {formatMinutes(scenario.movingMin)} + berhenti {scenario.stopMin} mnt ·
                pace {formatPace(scenario.paceSecPerKm)} /km
              </p>
              <p className="mt-2 text-xs tabular-nums">
                <span
                  className={
                    scenario.marginMin < 30 ? "font-medium text-amber-600 dark:text-amber-400" : "font-medium"
                  }
                >
                  {formatCutoffMargin(scenario.marginMin, "COT")}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="size-4 text-primary" />
            Kurva waktu tempuh vs batas mundur
          </CardTitle>
          <CardDescription>
            {gtrUltra.distanceKm} km dengan {formatInteger(gtrUltra.elevGainM)} m naik setara{" "}
            {formatNumber(forecast.raceGradedKm)} km di jalan datar. Start {gtrUltra.startTime} WIB.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectionChart scenarios={forecast.scenarios} event={gtrUltra} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Split per pos</CardTitle>
          <CardDescription>
            Durasi segmen = total kumulatif − total sebelumnya. Jam dinding dari flag off{" "}
            {gtrUltra.startTime}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScenarioSplits scenarios={forecast.scenarios} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dari mana angkanya</CardTitle>
          <CardDescription>
            Riegel (eksponen {forecast.exponent.toLocaleString("id-ID", { maximumFractionDigits: 2 })})
            pada waktu bergerak sesi acuan, faktor 0,9 km per 100 m tanjakan. Waktu berhenti
            ditambahkan terpisah per skenario (23 / 60 / 121 menit).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="rounded-xl bg-muted/50 px-3.5 py-3">
            <p className="font-medium">
              Sesi acuan:{" "}
              <Link href={`/sesi/${reference.id}`} className="hover:underline">
                {reference.title} · {formatDate(reference.date, "long")}
              </Link>
            </p>
            <p className="mt-1 text-muted-foreground tabular-nums">
              {formatNumber(reference.distanceKm)} km · {formatInteger(reference.elevGainM)} m
              naik · waktu bergerak {formatClock(forecast.movingSec)} (bukan total elapsed{" "}
              {formatClock(reference.durationSec)}) · setara{" "}
              {formatNumber(forecast.refGradedKm)} km datar · {workoutTypeLabel[reference.type]}
            </p>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              Setiap 100 m tanjakan dihitung sebagai 0,9 km tambahan — sama dengan faktor yang
              sudah dipakai sebelumnya.
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              Lomba {formatNumber(forecast.stretch)}× lebih panjang dari sesi acuan (km setara
              datar). Eksponen tetap 1,06; yang diubah hanya masukan: waktu bergerak, bukan
              waktu total.
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              Ketiga skenario berada di dalam COT 10 jam ({gtrUltra.cutoffClock} WIB). Target
              disiplin finis {formatMinutes(forecast.target.finishMin)}.
            </li>
          </ul>
          <div className="flex gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/5 px-3.5 py-3">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="text-muted-foreground">
              Angka ini alat uji skenario, bukan janji. Posisi water station masih estimasi —
              sesuaikan setelah GPX dan technical meeting.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
