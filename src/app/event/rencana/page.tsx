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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { gtrUltra } from "@/data/event";
import { formatDate, formatInteger } from "@/lib/format";
import { readiness, readinessChecklist, trainingPlan } from "@/lib/race";

export const metadata: Metadata = {
  title: "Rencana latihan menuju GTR Ultra 30K",
  description:
    "Rencana pekanan yang diturunkan dari volume saat ini: fase bangun, puncak, lalu taper, plus checklist yang mengikuti gap kesiapan.",
};

const phaseTone: Record<string, string> = {
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
  const peak = plan.reduce((best, week) => (week.targetKm > best.targetKm ? week : best));

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarRange className="size-4 text-primary" />
              {plan.length} pekan sampai hari lomba
            </CardTitle>
            <CardDescription>
              Volume naik dari kondisi sekarang menuju puncak {peak.targetKm} km, lalu turun
              dua pekan terakhir. Angka ini titik awal, bukan harga mati.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pekan</TableHead>
                    <TableHead>Fase</TableHead>
                    <TableHead className="text-right">Volume</TableHead>
                    <TableHead className="text-right">Long run</TableHead>
                    <TableHead className="text-right">Elevasi</TableHead>
                    <TableHead>Fokus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plan.map((week) => (
                    <TableRow key={week.weekStart}>
                      <TableCell className="whitespace-nowrap">
                        <span className="font-medium">P{week.index}</span>
                        <span className="ml-1.5 text-xs text-muted-foreground">
                          {formatDate(week.weekStart)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            (phaseTone[week.phase] ?? "secondary") as
                              | "default"
                              | "secondary"
                              | "outline"
                          }
                        >
                          {week.phase}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {week.targetKm} km
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {week.longRunKm} km
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatInteger(week.elevM)} m
                      </TableCell>
                      <TableCell className="min-w-64 text-muted-foreground">
                        {week.focus}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Checklist kesiapan</CardTitle>
            <CardDescription>
              Isinya diturunkan dari gap kesiapan, jadi ikut berubah saat data baru masuk.
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aturan main saat rencana ini dijalankan</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2.5 text-sm text-muted-foreground sm:grid-cols-2">
            {[
              "Naikkan volume maksimal 10% per pekan; kalau tidur atau HR pagi memburuk, ulangi pekan yang sama.",
              "Satu long run trail per pekan lebih berharga daripada dua sesi tempo di jalan datar.",
              "Latih power hiking di tanjakan panjang—di km 8–14 nanti berjalan cepat lebih efisien daripada memaksa berlari.",
              "Turunan teknis butuh latihan tersendiri; jangan hanya mengejar elevasi naik.",
              "Pakai sepatu, vest, dan gel yang akan dipakai hari-H mulai dari pekan puncak.",
              "Dua pekan terakhir volume turun, tapi jangan hilangkan intensitas sama sekali.",
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
  );
}
