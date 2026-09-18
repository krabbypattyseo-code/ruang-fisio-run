import type { Metadata } from "next";
import { CalendarRange, CircleAlert, CircleCheckBig, CircleDot } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { gtrUltra } from "@/data/event";
import { formatDate, formatMinutes } from "@/lib/format";
import { raceCountdown, readiness, readinessChecklist } from "@/lib/race";

export const metadata: Metadata = {
  title: "Rencana 9 hari menuju GTR Ultra 30K",
  description:
    "Countdown harian 18–27 September: long trail terakhir, taper, race pack, dan flag off 03.00.",
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
  const days = raceCountdown();
  const checklist = readinessChecklist(status, gtrUltra);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarRange className="size-4 text-primary" />
            Rencana 9 hari
          </CardTitle>
          <CardDescription>
            Tidak ada kebugaran baru yang bisa dibangun dalam {status.daysLeft} hari. Tugasnya
            tiba di garis start segar, dengan perlengkapan yang sudah pernah dipakai. Target
            finis {formatMinutes(gtrUltra.targetFinishMin)} · COT {formatMinutes(gtrUltra.cutoffMin)}{" "}
            ({gtrUltra.cutoffClock} WIB).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="rounded-xl bg-primary/10 px-3 py-2.5 text-sm">
            Taper dimulai sekarang. Semua uji perlengkapan terjadi di satu sesi terakhir —
            Sabtu 19 September (long trail + headlamp sebelum subuh).
          </p>
          <ul className="space-y-2">
            {days.map((day) => (
              <li
                key={day.date}
                className={`rounded-xl px-3.5 py-3 ring-1 ring-foreground/10 ${
                  day.raceDay
                    ? "bg-primary text-primary-foreground ring-primary"
                    : day.highlight
                      ? "bg-primary/5"
                      : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">
                    H{day.offset === 0 ? "" : day.offset}
                    <span
                      className={`ml-1.5 text-xs font-normal ${
                        day.raceDay ? "text-primary-foreground/80" : "text-muted-foreground"
                      }`}
                    >
                      {formatDate(day.date, "weekday")}
                    </span>
                  </p>
                  {day.raceDay ? (
                    <Badge variant="secondary">Lomba</Badge>
                  ) : day.highlight ? (
                    <Badge>Kunci</Badge>
                  ) : null}
                </div>
                <p className={`mt-1.5 text-sm font-medium ${day.raceDay ? "" : ""}`}>
                  {day.session}
                </p>
                <p
                  className={`mt-1 text-sm ${
                    day.raceDay ? "text-primary-foreground/85" : "text-muted-foreground"
                  }`}
                >
                  {day.note}
                </p>
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
              Fokus kit wajib, disiplin water station, dan tidur H−2.
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
            <CardTitle>Aturan main 9 hari terakhir</CardTitle>
            <CardDescription>
              Segar di garis start lebih berharga daripada volume tambahan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                "Berhenti hanya untuk hal yang tidak bisa dilakukan sambil berjalan; target total berhenti lomba 23 menit.",
                "Sabtu 19 Sep: uji kit lengkap + headlamp sebelum subuh — gladi start malam.",
                "Di tanjakan: power hiking lebih efisien daripada memaksa berlari.",
                "Jangan paksa long run baru setelah H−8; fokus tidur dan karbohidrat.",
                "Km 1–6 dalam gelap harus terasa terlalu pelan; headlamp wajib.",
                "Lewati Opening MC 23.00 — tidur H−1 lebih penting.",
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
