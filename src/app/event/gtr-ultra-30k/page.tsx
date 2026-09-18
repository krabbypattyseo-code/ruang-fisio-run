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
import { formatCutoffMargin, formatInteger, formatMinutes, formatNumber } from "@/lib/format";
import { projection, readiness, readinessChecklist } from "@/lib/race";

export const metadata: Metadata = {
  title: "Kesiapan GTR Ultra 30K",
  description:
    "Status kesiapan dari riwayat hiking/trail sepanjang arsip dan konsistensi 4 pekan terakhir menuju GTR Ultra 30K.",
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
      <div className="grid gap-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="size-4 text-primary" />
              Skor kesiapan
            </CardTitle>
            <CardDescription>
              Kapasitas trail/hiking terbaik sepanjang riwayat + frekuensi 4 pekan terkini.
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
              Sisa {status.daysLeft} hari menuju lomba — taper sudah dimulai. Proyeksi disiplin{" "}
              <span className="font-medium text-foreground">
                {formatMinutes(forecast.target.finishMin)} jam
              </span>
              , {formatCutoffMargin(forecast.target.marginMin, "COT")}.
            </p>
            <Link
              href="/event/gtr-ultra-30k/proyeksi"
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
              Fokus 9 hari terakhir: kit wajib, disiplin berhenti, dan tidur.
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
              href="/event/gtr-ultra-30k/rencana"
              className={`${buttonVariants({ variant: "outline", size: "sm" })} mt-4`}
            >
              Buka rencana 9 hari
              <ArrowRight data-icon="inline-end" className="size-3.5" />
            </Link>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="size-4 text-primary" />
            Pos dan batas mundur pribadi
          </CardTitle>
          <CardDescription>
            {gtrUltra.terrain} Posisi WS dan kolom naik masih estimasi — tunggu GPX resmi.
            COT panitia hanya di finish: {gtrUltra.cutoffClock} WIB.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pos</TableHead>
                  <TableHead className="text-right">Km*</TableHead>
                  <TableHead className="text-right">Naik*</TableHead>
                  <TableHead className="text-right">Batas mundur</TableHead>
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
          <p className="mt-2 text-xs text-muted-foreground">
            *Estimasi pribadi. Panitia menyebut 4–5 titik dengan jarak 5–8 km.
          </p>

          <div className="mt-4">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Perlengkapan wajib resmi (10 item)
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

      <Card>
        <CardHeader>
          <CardTitle>Race schedule resmi</CardTitle>
          <CardDescription>
            Sabtu 26 – Minggu 27 September 2026. Flag off 30K jam {gtrUltra.startTime} WIB.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {gtrUltra.schedule.map((item) => (
              <li
                key={`${item.day}-${item.time}-${item.title}`}
                className={`flex gap-3 rounded-lg px-2.5 py-2 ${
                  item.highlight ? "bg-primary/10 font-medium" : ""
                }`}
              >
                <span className="w-[7.5rem] shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                  {item.day} · {item.time}
                </span>
                <span>
                  {item.title}
                  {item.location ? (
                    <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                      {item.location}
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
