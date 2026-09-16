import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Droplets, Flag, Sandwich, ShieldCheck, Target } from "lucide-react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { gtrUltra } from "@/data/event";
import { formatInteger, formatMinutes, formatNumber } from "@/lib/format";
import { projection, readiness, readinessChecklist } from "@/lib/race";

export const metadata: Metadata = {
  title: "Kesiapan GTR Ultra 30K",
  description:
    "Status kesiapan yang dihitung langsung dari data latihan: volume, long run, elevasi, spesifisitas trail, dan konsistensi.",
};

const levelTone: Record<string, string> = {
  Siap: "text-primary",
  "Hampir siap": "text-primary",
  "Perlu kerja": "text-amber-600 dark:text-amber-400",
  "Belum siap": "text-destructive",
};

export default function EventReadinessPage() {
  const status = readiness();
  const forecast = projection();
  const checklist = readinessChecklist(status, gtrUltra);
  const gaps = checklist.filter((item) => item.status !== "aman");

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.25fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="size-4 text-primary" />
              Skor kesiapan
            </CardTitle>
            <CardDescription>
              Diambil dari sesi 4–6 pekan terakhir, bukan angka yang diketik manual.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-3">
              <p className="font-heading text-4xl leading-none font-semibold tabular-nums">
                {status.score}
                <span className="text-lg text-muted-foreground">/100</span>
              </p>
              <p className={`pb-1 font-medium ${levelTone[status.level]}`}>{status.level}</p>
            </div>
            <Progress value={status.score} />
            <p className="text-sm text-muted-foreground">
              Sisa {status.weeksLeft} pekan efektif sebelum taper dimulai. Proyeksi waktu
              saat ini{" "}
              <span className="font-medium text-foreground">
                {formatMinutes(forecast.target.finishMin)} jam
              </span>
              , masih {formatMinutes(forecast.target.marginMin)} jam di bawah cut-off.
            </p>
            <Link
              href="/event/proyeksi"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Lihat skenario waktu
              <ArrowRight data-icon="inline-end" className="size-3.5" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rincian per komponen</CardTitle>
            <CardDescription>
              Nilai kamu dibanding patokan untuk lomba {gtrUltra.distanceKm} km dengan{" "}
              {formatInteger(gtrUltra.elevGainM)} m elevasi.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {status.components.map((component) => (
              <div key={component.key} className="space-y-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
                  <span className="font-medium">{component.label}</span>
                  <span className="tabular-nums">
                    {formatNumber(component.value)}
                    <span className="text-muted-foreground">
                      {" / "}
                      {formatNumber(component.target)} {component.unit}
                    </span>
                  </span>
                </div>
                <Progress value={component.score} />
                <p className="text-xs text-muted-foreground">{component.hint}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {gaps.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              {gaps.length} hal yang masih perlu dikerjakan
            </CardTitle>
            <CardDescription>
              Daftar ini ikut berubah begitu data latihan baru masuk.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {gaps.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <span
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${
                      item.status === "kritis" ? "bg-destructive" : "bg-amber-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/event/rencana"
              className={`${buttonVariants({ variant: "outline", size: "sm" })} mt-4`}
            >
              Buka rencana latihan
              <ArrowRight data-icon="inline-end" className="size-3.5" />
            </Link>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="size-4 text-primary" />
            Pos dan batas waktu
          </CardTitle>
          <CardDescription>{gtrUltra.terrain}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pos</TableHead>
                  <TableHead className="text-right">Km</TableHead>
                  <TableHead className="text-right">Naik</TableHead>
                  <TableHead className="text-right">Cut-off</TableHead>
                  <TableHead>Fasilitas</TableHead>
                  <TableHead>Catatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gtrUltra.checkpoints.map((checkpoint) => (
                  <TableRow key={checkpoint.name}>
                    <TableCell className="font-medium whitespace-nowrap">
                      {checkpoint.name}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{checkpoint.km}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {checkpoint.gainFromPrevM} m
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatMinutes(checkpoint.cutoffMin)}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 text-muted-foreground">
                        {checkpoint.hasWater ? <Droplets className="size-3.5" /> : null}
                        {checkpoint.hasFood ? <Sandwich className="size-3.5" /> : null}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{checkpoint.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Perlengkapan wajib
            </p>
            <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
              {gtrUltra.mandatoryGear.map((item) => (
                <li key={item} className="flex gap-2">
                  <Badge variant="outline" className="mt-0.5 shrink-0">
                    wajib
                  </Badge>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
