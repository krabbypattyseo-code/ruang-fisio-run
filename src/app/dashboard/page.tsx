import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Clock,
  Footprints,
  Gauge,
  HeartPulse,
  Mountain,
  Route,
  TrendingUp,
} from "lucide-react";

import { MetricTrendChart } from "@/components/charts/metric-trend-chart";
import { PaceTrendChart } from "@/components/charts/pace-trend-chart";
import { WeeklyVolumeChart } from "@/components/charts/weekly-volume-chart";
import { FilterBar } from "@/components/filter-bar";
import { SessionArchive } from "@/components/session-archive";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { gtrUltra } from "@/data/event";
import { sessions } from "@/data/sessions";
import { workoutTypeLabel } from "@/data/types";
import { metricColor, typeColor } from "@/lib/colors";
import { filterSessions, filterToQuery, parseFilter } from "@/lib/filters";
import {
  formatDate,
  formatDuration,
  formatInteger,
  formatNumber,
  formatPace,
} from "@/lib/format";
import { splitByType, summarize, trendSeries, weeklySeries } from "@/lib/metrics";
import { readiness } from "@/lib/race";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filter = parseFilter(await searchParams);
  const filtered = filterSessions(sessions, filter);
  const summary = summarize(filtered);
  const weekly = weeklySeries(filtered);
  const splits = splitByType(filtered);
  const status = readiness();

  // Pace dan cadence hiking beda kelas dari lari; kalau dicampur, skala grafik
  // tren jadi tidak terbaca. Hiking baru ikut kalau memang hanya itu yang tersisa.
  const running = filtered.filter((session) => session.type !== "hiking");
  const hikingExcluded = running.length >= 2 && running.length < filtered.length;
  const trendSource = running.length >= 2 ? running : filtered;
  const trend = trendSeries(trendSource);
  const runSummary = summarize(trendSource);
  const movingLabel = hikingExcluded ? "saat berlari" : "pada rentang ini";

  const weeks = weekly.length || 1;

  return (
    <div className="w-full px-4">
      <div className="flex flex-col gap-2 py-4">
        <div>
          <h1 className="font-heading text-xl font-semibold">
            Dashboard latihan
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {formatDate(filter.from, "long")} – {formatDate(filter.to, "long")} ·{" "}
            {filter.type === "all" ? "semua tipe latihan" : workoutTypeLabel[filter.type]}
          </p>
        </div>
        <Link
          href="/event"
          className={buttonVariants({ variant: "outline", size: "sm" }) + " self-start"}
        >
          {status.daysLeft} hari ke GTR
          <ArrowRight data-icon="inline-end" className="size-3.5" />
        </Link>
      </div>

      <FilterBar filter={filter} resultCount={filtered.length} />

      <section className="mt-4 grid grid-cols-2 gap-2">
        <StatCard
          label="Total jarak"
          value={formatNumber(summary.distanceKm)}
          unit="km"
          hint={`${formatNumber(summary.distanceKm / weeks)} km per pekan`}
          icon={Route}
        />
        <StatCard
          label="Waktu bergerak"
          value={formatDuration(summary.durationSec)}
          hint={`${summary.sessions} sesi · ${summary.activeDays} hari aktif`}
          icon={Clock}
        />
        <StatCard
          label="Elevasi naik"
          value={formatInteger(summary.elevGainM)}
          unit="m"
          hint={`${formatInteger(summary.elevGainM / weeks)} m per pekan`}
          icon={Mountain}
        />
        <StatCard
          label="Pace rata-rata"
          value={formatPace(runSummary.paceSecPerKm)}
          unit="/km"
          hint={
            hikingExcluded
              ? `Road & trail saja · terpanjang ${formatNumber(summary.longestKm)} km`
              : `Terpanjang ${formatNumber(summary.longestKm)} km`
          }
          icon={Gauge}
        />
      </section>

      <section className="mt-3 grid gap-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-4 text-primary" />
              Volume mingguan per tipe
            </CardTitle>
            <CardDescription>
              Kilometer per pekan, ditumpuk menurut tipe latihan. Pekan turun setiap siklus
              keempat memang disengaja untuk pemulihan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WeeklyVolumeChart data={weekly} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-4 text-primary" />
              Komposisi latihan
            </CardTitle>
            <CardDescription>
              Porsi trail menentukan kesiapan medan {gtrUltra.name} {gtrUltra.category}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {splits.map((split) => (
              <div key={split.type} className="space-y-1.5">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: typeColor[split.type] }}
                    />
                    {workoutTypeLabel[split.type]}
                  </span>
                  <span className="tabular-nums">
                    {formatNumber(split.distanceKm)} km
                    <span className="ml-1.5 text-muted-foreground">
                      {Math.round(split.share * 100)}%
                    </span>
                  </span>
                </div>
                <Progress value={split.share * 100} />
                <p className="text-xs text-muted-foreground tabular-nums">
                  {split.sessions} sesi · {formatInteger(split.elevGainM)} m naik
                </p>
              </div>
            ))}
            <div className="rounded-xl bg-muted/50 px-3 py-2.5 text-xs text-muted-foreground">
              Angka di kartu ini memakai filter yang sama dengan seluruh halaman, jadi
              tautannya bisa dibagikan apa adanya.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="size-4 text-primary" />
              Tren pace per sesi
            </CardTitle>
            <CardDescription>
              Titik adalah pace tiap sesi, garis putus-putus adalah rata-rata bergerak lima
              sesi. Sumbu dibalik: makin ke atas makin cepat.
              {hikingExcluded
                ? " Sesi hiking dikecualikan di sini supaya skalanya tetap terbaca."
                : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaceTrendChart data={trend} />
          </CardContent>
        </Card>
      </section>

      <section className="mt-3 grid gap-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Footprints className="size-4" style={{ color: metricColor.cadence }} />
              Cadence
            </CardTitle>
            <CardDescription>
              Rata-rata {formatInteger(runSummary.cadence)} spm {movingLabel}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MetricTrendChart
              data={trend}
              metric="cadence"
              color={metricColor.cadence}
              unit="Cadence"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Route className="size-4" style={{ color: metricColor.stride }} />
              Panjang langkah
            </CardTitle>
            <CardDescription>
              {runSummary.strideM > 0 ? `Rata-rata ${formatNumber(runSummary.strideM)} m per langkah.` : "Panjang langkah hanya ada di sesi Garmin."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MetricTrendChart
              data={trend}
              metric="strideM"
              color={metricColor.stride}
              unit="Stride"
              decimals={2}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <HeartPulse className="size-4" style={{ color: metricColor.hr }} />
              Denyut jantung
            </CardTitle>
            <CardDescription>
              Rata-rata {formatInteger(runSummary.avgHr)} bpm {movingLabel}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MetricTrendChart
              data={trend}
              metric="avgHr"
              color={metricColor.hr}
              unit="HR"
            />
          </CardContent>
        </Card>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-heading text-lg font-semibold">Arsip sesi</h2>
            <p className="text-sm text-muted-foreground">
              Klik satu baris untuk melihat lap, running dynamics, profil elevasi, dan cuaca.
            </p>
          </div>
          <Badge variant="outline" className="tabular-nums">
            {filtered.length} sesi terpilih
          </Badge>
        </div>
        <SessionArchive key={filterToQuery(filter)} sessions={filtered} />
      </section>
    </div>
  );
}
