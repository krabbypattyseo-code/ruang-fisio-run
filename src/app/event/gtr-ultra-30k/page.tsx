import type { Metadata } from "next";

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
import { gtrUltra } from "@/data/event";

export const metadata: Metadata = {
  title: "Hasil GTR Ultra 30K",
  description:
    "Hasil DNF GTR Ultra 30K: berhenti 1,47 km sebelum finis, lewat COT 12 menit, evaluasi lengkap.",
};

const result = gtrUltra.result!;
const ev = result.evaluation;

const fmt = (value: number, digits = 1) =>
  new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);

const severityTone = {
  utama: "border-l-[var(--brand-clay)] bg-[#f7eee6]",
  pendukung: "border-l-foreground/25 bg-muted/40",
  bukan: "border-l-[var(--brand-cyan)] bg-[#e6f4f5]",
} as const;

const severityLabel = {
  utama: "Utama",
  pendukung: "Pendukung",
  bukan: "Bukan penyebab",
} as const;

export default function HasilPage() {
  return (
    <div className="space-y-5">
      <p className="text-sm leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">DNF (Did Not Finish).</span> Harist
        berhenti{" "}
        <span className="font-medium text-foreground">1,47 km dari garis finis</span>, di jalur
        yang praktis datar, ketika jam lomba sudah lewat COT 12 menit 27 detik. Dia butuh 30
        menit; ada 51 menit tergeletak di turunan.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { value: fmt(result.coveredKm, 2), label: `dari ${fmt(result.courseKm, 2)} km` },
          { value: result.raceElapsed, label: "jam lomba" },
          { value: fmt(result.remainingKm, 2), label: "sisa ke finis" },
          { value: `+${result.overCutoffBy.slice(2)}`, label: "lewat COT" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-background px-3 py-3 ring-1 ring-foreground/10"
          >
            <p className="font-heading text-xl font-semibold tabular-nums tracking-tight">
              {stat.value}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vonis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          {ev.verdict.map((paragraph, index) => (
            <p key={index}>
              {paragraph.split(/(1,47 kilometer dari garis finis|batasnya bukan jantung)/).map(
                (part, i) =>
                  part === "1,47 kilometer dari garis finis" ||
                  part === "batasnya bukan jantung" ? (
                    <span key={i} className="font-medium text-foreground">
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  ),
              )}
            </p>
          ))}
        </CardContent>
      </Card>

      <Card className="ring-2 ring-[var(--brand-clay)]/30">
        <CardHeader>
          <CardTitle className="font-heading text-lg">Anggaran waktu</CardTitle>
          <CardDescription>
            Waktunya ada. Dia butuh 30 menit, dan ada 51 menit tergeletak di turunan dan di
            km-19. Bukan kebugaran aerobik yang kurang — itu masih utuh sampai akhir. Yang kurang
            adalah kaki yang bisa lari turun setelah jam kedelapan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {ev.budget.map((row) => (
            <div
              key={row.label}
              className={`flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 ${
                row.kind === "need"
                  ? "bg-[var(--brand-rose)]/10"
                  : row.kind === "have"
                    ? "bg-[var(--brand-teal)]/10"
                    : "bg-muted/40"
              } ${row.kind === "sub" ? "ml-3" : ""}`}
            >
              <div className="min-w-0">
                <p
                  className={`text-sm ${
                    row.kind === "sub" ? "text-muted-foreground" : "font-semibold"
                  }`}
                >
                  {row.kind === "need"
                    ? "DIBUTUHKAN untuk finis dalam COT"
                    : row.kind === "have"
                      ? "TERSEDIA tapi tidak diambil"
                      : row.label}
                </p>
                {row.note ? (
                  <p className="mt-0.5 text-xs text-muted-foreground">{row.note}</p>
                ) : null}
              </div>
              <p
                className={`shrink-0 font-heading tabular-nums ${
                  row.kind === "sub" ? "text-sm font-medium" : "text-xl font-semibold"
                }`}
              >
                {row.value}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Penyebab</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {ev.causes.map((cause, index) => (
            <div
              key={cause.title}
              className={`rounded-xl border-l-4 px-3 py-2.5 ${severityTone[cause.severity]}`}
            >
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-xs font-medium text-muted-foreground tabular-nums">
                  {index + 1}.
                </span>
                <p className="text-sm font-semibold">{cause.title}</p>
                <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                  {severityLabel[cause.severity]}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{cause.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Anatomi per 5 km</CardTitle>
          <CardDescription>{ev.segmentNote}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Segmen</TableHead>
                  <TableHead className="text-right">Km</TableHead>
                  <TableHead className="text-right">Waktu</TableHead>
                  <TableHead className="text-right">Pace</TableHead>
                  <TableHead className="text-right">HR</TableHead>
                  <TableHead>Profil</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ev.segments.map((seg) => (
                  <TableRow
                    key={seg.label}
                    className={seg.pace === "22:54" ? "bg-[var(--brand-rose)]/5" : undefined}
                  >
                    <TableCell className="font-medium whitespace-nowrap">{seg.label}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {fmt(seg.km, 2)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{seg.time}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{seg.pace}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {fmt(seg.hr, 1)}
                    </TableCell>
                    <TableCell className="min-w-[12rem] text-muted-foreground">{seg.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{ev.terrainNote}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pace menurut medan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medan</TableHead>
                  <TableHead className="text-right">Lap</TableHead>
                  <TableHead className="text-right">Waktu</TableHead>
                  <TableHead className="text-right">Pace</TableHead>
                  <TableHead className="text-right">HR</TableHead>
                  <TableHead>Catatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ev.terrain.map((row) => (
                  <TableRow
                    key={row.label}
                    className={row.emphasize ? "bg-[var(--brand-clay)]/10" : undefined}
                  >
                    <TableCell className="font-medium">{row.label}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.laps}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.time}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{row.pace}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.hr}</TableCell>
                    <TableCell className="text-muted-foreground">{row.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Waktu di zona HR</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {ev.hrZones.map((zone) => (
            <div key={zone.zone} className="space-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
                <span className="font-medium">
                  {zone.zone}{" "}
                  <span className="font-normal text-muted-foreground">({zone.range})</span>
                </span>
                <span className="tabular-nums">
                  {zone.time}
                  <span className="text-muted-foreground">
                    {" · "}
                    {Math.round(zone.pct * 1000) / 10}%
                  </span>
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-[var(--brand-teal)]"
                  style={{ width: `${Math.max(zone.pct * 100, zone.pct > 0 ? 1 : 0)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{zone.note}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lima lap terlambat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {ev.worstLaps.map((lap) => (
            <div
              key={lap.km}
              className="rounded-xl px-3 py-2.5 ring-1 ring-foreground/10"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-semibold">
                  km-{lap.km}{" "}
                  <span className="font-normal text-muted-foreground">· {lap.time}</span>
                </p>
                <p className="text-xs tabular-nums text-muted-foreground">
                  ↑{lap.ascent} m · ↓{lap.descent} m · HR {lap.hr}
                </p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{lap.note}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rencana vs aktual per pos</CardTitle>
          <CardDescription>
            Semua dikonversi ke km kursus sebenarnya. Kolom &quot;km di jam&quot; menunjukkan
            apa yang terbaca saat itu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pos</TableHead>
                  <TableHead className="text-right">Km kursus</TableHead>
                  <TableHead className="text-right">Km jam</TableHead>
                  <TableHead className="text-right">Target</TableHead>
                  <TableHead className="text-right">Batas</TableHead>
                  <TableHead className="text-right">Aktual</TableHead>
                  <TableHead className="text-right">vs target</TableHead>
                  <TableHead className="text-right">vs batas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ev.checkpoints.map((cp) => (
                  <TableRow key={cp.pos}>
                    <TableCell className="font-medium whitespace-nowrap">{cp.pos}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {fmt(cp.courseKm, 2)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {fmt(cp.watchKm, 1)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{cp.target}</TableCell>
                    <TableCell className="text-right tabular-nums">{cp.personalLimit}</TableCell>
                    <TableCell className="text-right tabular-nums whitespace-nowrap">
                      {cp.actual}
                    </TableCell>
                    <TableCell className="text-right tabular-nums whitespace-nowrap">
                      {cp.vsTarget}
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums whitespace-nowrap">
                      {cp.vsLimit}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-3 space-y-2 text-xs leading-relaxed text-muted-foreground">
            {ev.checkpointNotes.map((note, i) => (
              <p key={i}>{note}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Beban persiapan — 12 pekan</CardTitle>
          <CardDescription>
            19 sesi · 109,8 km · 21:43:03 · 612 m naik · rata-rata 9,2 km/pekan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pekan</TableHead>
                  <TableHead className="text-right">Sesi</TableHead>
                  <TableHead className="text-right">Km</TableHead>
                  <TableHead className="text-right">Waktu</TableHead>
                  <TableHead className="text-right">Naik</TableHead>
                  <TableHead>Gym & catatan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ev.weeklyLoad.map((week) => (
                  <TableRow
                    key={week.week}
                    className={
                      week.week.startsWith("H-7") ? "bg-[var(--brand-rose)]/5" : undefined
                    }
                  >
                    <TableCell className="font-medium whitespace-nowrap">{week.week}</TableCell>
                    <TableCell className="text-right tabular-nums">{week.sessions}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {fmt(week.km, 1)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{week.time}</TableCell>
                    <TableCell className="text-right tabular-nums">{week.ascent} m</TableCell>
                    <TableCell className="min-w-[14rem] text-muted-foreground">{week.gym}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <p className="mt-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Rasio lomba vs persiapan terbaik
          </p>
          <ul className="mt-2 space-y-2">
            {ev.prepGaps.map((gap) => (
              <li
                key={gap.metric}
                className="rounded-xl px-3 py-2.5 ring-1 ring-foreground/10"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-medium">{gap.metric}</p>
                  <p className="font-heading text-sm font-semibold tabular-nums text-[var(--brand-rose)]">
                    {gap.ratio}
                  </p>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Lomba {gap.race} · terbaik {gap.best}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{gap.note}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Evaluasi gym</CardTitle>
          <CardDescription>
            Volume kaki proporsional. Yang tidak cocok jenis latihannya untuk medan 1.791 m
            turunan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {ev.gym.map((row) => (
            <div
              key={row.aspect}
              className={`rounded-xl px-3 py-2.5 ring-1 ${
                row.weak
                  ? "bg-[var(--brand-rose)]/5 ring-[var(--brand-rose)]/25"
                  : "ring-foreground/10"
              }`}
            >
              <p className="text-sm font-semibold">{row.aspect}</p>
              <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">{row.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{row.verdict}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Yang sudah benar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {ev.whatWorked.map((item) => (
            <div key={item.title} className="rounded-xl bg-[#e6f4f5] px-3 py-2.5">
              <p className="text-sm font-semibold text-[var(--brand-teal)]">{item.title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rencana perbaikan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {ev.actions.map((action) => (
            <div
              key={action.priority}
              className="flex gap-3 rounded-xl px-3 py-2.5 ring-1 ring-foreground/10"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--brand-teal)] text-xs font-semibold text-white tabular-nums">
                {action.priority}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium">{action.action}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{action.frequency}</span>
                  {" · "}
                  Target: {action.target}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{action.why}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
