import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CloudSun,
  Flame,
  Gauge,
  HeartPulse,
  Mountain,
  Route,
  Clock,
  Footprints,
} from "lucide-react";

import {
  ElevationProfileChart,
  HrZoneBars,
  LapPaceChart,
} from "@/components/charts/session-charts";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSession, sessions } from "@/data/sessions";
import { workoutTypeLabel } from "@/data/types";
import { typeColor } from "@/lib/colors";
import {
  formatDate,
  formatDuration,
  formatInteger,
  formatMinSec,
  formatNumber,
  formatPace,
} from "@/lib/format";
import { gradedKm } from "@/lib/metrics";

export function generateStaticParams() {
  return sessions.map((session) => ({ id: session.id }));
}

export async function generateMetadata({ params }: PageProps<"/sesi/[id]">) {
  const { id } = await params;
  const session = getSession(id);
  if (!session) return { title: "Sesi tidak ditemukan" };
  return {
    title: `${session.title} · ${formatDate(session.date, "long")}`,
    description: `${formatNumber(session.distanceKm)} km di ${session.route} dengan pace ${formatPace(session.paceSecPerKm)} /km.`,
  };
}

export default async function SessionDetailPage({ params }: PageProps<"/sesi/[id]">) {
  const { id } = await params;
  const session = getSession(id);
  if (!session) notFound();

  const index = sessions.findIndex((item) => item.id === session.id);
  const newer = index > 0 ? sessions[index - 1] : undefined;
  const older = index < sessions.length - 1 ? sessions[index + 1] : undefined;

  const fastestLap = session.laps.reduce((best, lap) =>
    lap.paceSecPerKm < best.paceSecPerKm ? lap : best,
  );
  const hardestLap = session.laps.reduce((worst, lap) =>
    lap.elevGainM > worst.elevGainM ? lap : worst,
  );
  const graded = gradedKm(session.distanceKm, session.elevGainM);

  return (
    <div className="w-full px-4 py-5">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Dashboard
      </Link>

      <header className="mt-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="gap-1.5">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: typeColor[session.type] }}
            />
            {workoutTypeLabel[session.type]}
          </Badge>
          <Badge variant="secondary">RPE {session.rpe}/10</Badge>
          <span className="text-sm text-muted-foreground">
            {formatDate(session.date, "weekday")}
          </span>
        </div>
        <h1 className="mt-2 font-heading text-xl font-semibold">
          {session.title}
        </h1>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Route className="size-3.5" />
            {session.route}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CloudSun className="size-3.5" />
            {session.weather.condition}, {session.weather.tempC}°C · kelembapan{" "}
            {session.weather.humidity}%
          </span>
        </p>
      </header>

      <section className="mt-4 grid grid-cols-2 gap-2">
        <StatCard
          label="Jarak"
          value={formatNumber(session.distanceKm)}
          unit="km"
          hint={`Setara ${formatNumber(graded)} km datar`}
          icon={Route}
        />
        <StatCard
          label="Waktu"
          value={formatDuration(session.durationSec)}
          hint={`Pace ${formatPace(session.paceSecPerKm)} /km`}
          icon={Clock}
        />
        <StatCard
          label="Elevasi naik"
          value={formatInteger(session.elevGainM)}
          unit="m"
          hint={`Turun ${formatInteger(session.elevLossM)} m`}
          icon={Mountain}
        />
        <StatCard
          label="HR rata-rata"
          value={`${session.avgHr}`}
          unit="bpm"
          hint={`Maks ${session.maxHr} bpm`}
          icon={HeartPulse}
        />
      </section>

      <section className="mt-3 grid gap-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mountain className="size-4 text-primary" />
              Profil elevasi
            </CardTitle>
            <CardDescription>
              Lap terberat ada di km {hardestLap.index} dengan {hardestLap.elevGainM} m naik.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ElevationProfileChart laps={session.laps} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartPulse className="size-4 text-primary" />
              Distribusi zona HR
            </CardTitle>
            <CardDescription>Waktu di setiap zona selama sesi ini.</CardDescription>
          </CardHeader>
          <CardContent>
            <HrZoneBars session={session} />
          </CardContent>
        </Card>
      </section>

      <section className="mt-3 grid gap-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="size-4 text-primary" />
              Pace per lap
            </CardTitle>
            <CardDescription>
              Lap tercepat: lap {fastestLap.index} di {formatPace(fastestLap.paceSecPerKm)} /km.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LapPaceChart laps={session.laps} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Footprints className="size-4 text-primary" />
              Running dynamics
            </CardTitle>
            <CardDescription>Angka yang hanya ada di level sesi.</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {[
                { label: "Cadence", value: `${session.cadence} spm` },
                { label: "Panjang langkah", value: `${formatNumber(session.strideM)} m` },
                {
                  label: "Kalori",
                  value: `${formatInteger(session.calories)} kkal`,
                },
                { label: "RPE", value: `${session.rpe}/10` },
                {
                  label: "Naik per km",
                  value: `${formatInteger(session.elevGainM / session.distanceKm)} m`,
                },
                { label: "Jumlah lap", value: `${session.laps.length}` },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd className="mt-0.5 font-medium tabular-nums">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 rounded-xl bg-muted/50 px-3 py-2.5 text-sm">
              <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Flame className="size-3.5" />
                Catatan sesi
              </p>
              <p className="mt-1 text-foreground/85">{session.notes}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-lg font-semibold">Tabel lap</h2>
        <p className="mt-1 mb-3 text-sm text-muted-foreground">
          Perhatikan kolom HR terhadap pace: kalau HR naik sementara pace melambat, itu
          tanda cardiac drift di akhir sesi.
        </p>
        <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lap</TableHead>
                <TableHead className="text-right">Jarak</TableHead>
                <TableHead className="text-right">Waktu</TableHead>
                <TableHead className="text-right">Pace</TableHead>
                <TableHead className="text-right">HR</TableHead>
                <TableHead className="text-right">Cadence</TableHead>
                <TableHead className="text-right">Naik</TableHead>
                <TableHead className="text-right">Turun</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {session.laps.map((lap) => (
                <TableRow key={lap.index}>
                  <TableCell className="tabular-nums">{lap.index}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatNumber(lap.distanceKm)} km
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatMinSec(lap.durationSec)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatPace(lap.paceSecPerKm)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{lap.avgHr}</TableCell>
                  <TableCell className="text-right tabular-nums">{lap.cadence}</TableCell>
                  <TableCell className="text-right tabular-nums">{lap.elevGainM} m</TableCell>
                  <TableCell className="text-right tabular-nums">{lap.elevLossM} m</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <nav className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 pt-6">
        {older ? (
          <Link
            href={`/sesi/${older.id}`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <ArrowLeft data-icon="inline-start" className="size-3.5" />
            {formatDate(older.date)} · {older.title}
          </Link>
        ) : (
          <span />
        )}
        {newer ? (
          <Link
            href={`/sesi/${newer.id}`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            {formatDate(newer.date)} · {newer.title}
            <ArrowRight data-icon="inline-end" className="size-3.5" />
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
