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
  formatDate,
  formatInteger,
  formatMinutes,
  formatNumber,
  formatPace,
} from "@/lib/format";
import { gradedKm } from "@/lib/metrics";
import { projection } from "@/lib/race";

export const metadata: Metadata = {
  title: "Proyeksi waktu GTR Ultra 30K",
  description:
    "Tiga skenario waktu finis yang dihitung dari sesi terbaik terakhir, dibandingkan dengan cut-off setiap pos.",
};

export default function ProjectionPage() {
  const forecast = projection();
  const { reference } = forecast;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {forecast.scenarios.map((scenario) => (
          <Card key={scenario.key} size="sm">
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Skenario {scenario.label}</p>
                {scenario.key === "target" ? <Badge>utama</Badge> : null}
              </div>
              <p className="mt-1 font-heading text-2xl font-semibold tabular-nums">
                {formatMinutes(scenario.finishMin)}
                <span className="ml-1 text-sm font-normal text-muted-foreground">jam</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground tabular-nums">
                {formatPace(scenario.paceSecPerKm)} /km di medan · setara{" "}
                {formatPace(scenario.gradedPaceSecPerKm)} /km datar
              </p>
              <p className="mt-2 text-xs tabular-nums">
                Sisa ke cut-off:{" "}
                <span
                  className={
                    scenario.marginMin < 45 ? "font-medium text-destructive" : "font-medium"
                  }
                >
                  {formatMinutes(scenario.marginMin)} jam
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
            Kurva waktu tempuh vs cut-off
          </CardTitle>
          <CardDescription>
            {gtrUltra.distanceKm} km dengan {formatInteger(gtrUltra.elevGainM)} m naik setara{" "}
            {formatNumber(forecast.raceGradedKm)} km di jalan datar.
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
            Segmen belakang sengaja diberi bobot waktu lebih besar karena pace melambat saat
            lelah.
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
            Proyeksi memakai rumus Riegel di atas jarak setara datar, dengan sesi terbaik
            enam pekan terakhir sebagai acuan.
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
              naik · pace {formatPace(reference.paceSecPerKm)} /km · setara{" "}
              {formatNumber(gradedKm(reference.distanceKm, reference.elevGainM))} km datar ·{" "}
              {workoutTypeLabel[reference.type]}
            </p>
          </div>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              Setiap 100 m tanjakan dihitung sebagai 0,9 km tambahan—patokan kasar yang
              cocok untuk trail teknis di Jawa Barat.
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              Lomba ini {formatNumber(forecast.stretch)}× lebih panjang dari sesi acuan, jadi
              eksponen Riegel dinaikkan dari 1,06 ke{" "}
              {forecast.exponent.toLocaleString("id-ID", { maximumFractionDigits: 2 })}.
              Melipatgandakan jarak selalu menghasilkan pelemahan lebih besar daripada
              perbandingan linear.
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              Cuaca, antrean di pos, dan kondisi jalur belum masuk hitungan; itulah gunanya
              skenario aman.
            </li>
          </ul>
          <div className="flex gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/5 px-3.5 py-3">
            <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <p className="text-muted-foreground">
              Angka ini alat uji skenario, bukan janji. Perbarui setelah setiap long run
              besar supaya acuannya tetap mencerminkan kebugaran terbaru.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
