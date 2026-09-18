import type { Metadata } from "next";
import { Backpack, Droplets, Sandwich, Timer, Zap } from "lucide-react";

import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
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
import { gtrUltra, runnerProfile } from "@/data/event";
import { formatInteger, formatMinutes, formatNumber, formatPace } from "@/lib/format";
import { fuelingPlan, projection } from "@/lib/race";

export const metadata: Metadata = {
  title: "Strategi hari-H GTR Ultra 30K",
  description:
    "Logistik cairan, kalori, pacing malam hari, dan jadwal dari flag off 03.00 WIB.",
};

export default function StrategyPage() {
  const forecast = projection();
  const scenario = forecast.target;
  const fuel = fuelingPlan(scenario, gtrUltra, runnerProfile);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          label="Target waktu"
          value={formatMinutes(scenario.finishMin)}
          unit="jam"
          hint={`Pace rata-rata ${formatPace(scenario.paceSecPerKm)} /km`}
          icon={Timer}
        />
        <StatCard
          label="Total cairan"
          value={formatNumber(fuel.totalFluidMl / 1000)}
          unit="liter"
          hint={`${fuel.perHourFluidMl} ml/jam · rentang 400–600`}
          icon={Droplets}
        />
        <StatCard
          label="Total karbohidrat"
          value={formatInteger(fuel.totalCarbG)}
          unit="gram"
          hint={`${fuel.perHourCarbG} g/jam · bawa ${fuel.gelsFromStart} gel dari start`}
          icon={Zap}
        />
        <StatCard
          label="Sodium"
          value={formatInteger(fuel.totalSodiumMg)}
          unit="mg"
          hint="Dataran tinggi dini hari — lebih dingin dari Jakarta"
          icon={Sandwich}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="size-4 text-primary" />
            Logistik per segmen
          </CardTitle>
          <CardDescription>
            {fuel.fluidNote} Isi ulang 1–1,5 L tiap WS. Berat badan tidak boleh naik selama
            lomba; turun 1–2% masih wajar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sampai pos</TableHead>
                  <TableHead className="text-right">Durasi</TableHead>
                  <TableHead className="text-right">Cairan</TableHead>
                  <TableHead className="text-right">Karbo</TableHead>
                  <TableHead className="text-right">Sodium</TableHead>
                  <TableHead>Isi ulang</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fuel.segments.map((segment) => (
                  <TableRow key={segment.name}>
                    <TableCell className="whitespace-nowrap">
                      <span className="font-medium">{segment.name}</span>
                      <span className="ml-1.5 text-xs text-muted-foreground tabular-nums">
                        km {segment.km}
                      </span>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatMinutes(segment.durationMin)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {segment.fluidMl} ml
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {segment.carbG} g
                      <span className="ml-1.5 text-xs text-muted-foreground">
                        {segment.gels} gel
                      </span>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {segment.sodiumMg} mg
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <span className="flex flex-wrap items-center gap-1.5">
                        {segment.hasWater ? <Badge variant="outline">air</Badge> : null}
                        {segment.hasFood ? <Badge variant="outline">makanan</Badge> : null}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="size-4 text-primary" />
              Aturan pacing
            </CardTitle>
            <CardDescription>
              Start {gtrUltra.startTime} — sekitar 2,5 jam pertama dalam gelap (matahari
              terbit ±05.30). Profil rute detail menunggu GPX resmi.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                `Km 0–6 (gelap): tahan di ${formatPace((scenario.splits[0].segmentMin * 60) / scenario.splits[0].segmentKm)} /km. Sengaja pelan — headlamp kritis, jangan meminjam waktu dari km 22.`,
                "Tanjakan: power hiking begitu gradien terasa berat; jaga HR di bawah 155. Asumsi sebaran tanjakan menunggu GPX.",
                "Turunan: langkah pendek dan cepat. Kencangkan sepatu di WS 3 sebelum masuk segmen teknis (asumsi, menunggu GPX).",
                "Km akhir: sisakan satu gel. Jalan kampung / finis — jangan sprint bodoh.",
                "Windproof jacket wajib: suhu dini hari di dataran tinggi jauh di bawah data latihan Jakarta 30–32 °C.",
              ].map((rule) => (
                <li key={rule} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {rule}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Backpack className="size-4 text-primary" />
              Isi vest dan jadwal dari start 03.00
            </CardTitle>
            <CardDescription>
              H−1: race pack + technical meeting siang, tidur sore. Lewati Opening MC 23.00.
              Layanan drop bag belum terverifikasi — tanyakan di TM Sabtu 15.00.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              {[
                { time: "00:30", label: "Bangun · sarapan 400–500 kkal rendah serat" },
                {
                  time: "01:30",
                  label: "Berangkat ke Lapangan Dusun Kayuwangi · minum 300–500 ml",
                },
                {
                  time: "02:15",
                  label: "Tiba · cek 10 perlengkapan wajib · nyalakan headlamp, cek baterai",
                },
                { time: "02:40", label: "Pemanasan ringan 10 menit · satu gel" },
                {
                  time: "03:00",
                  label: "Flag off 30K — km 1–6 dalam gelap, sengaja pelan",
                },
                { time: "±05:30", label: "Matahari terbit — biasanya antara WS 1 dan WS 2" },
                { time: "11:21", label: "Target finis disiplin (8:21)" },
                { time: "13:00", label: "COT 30K resmi" },
              ].map((item) => (
                <li key={item.time} className="flex gap-3">
                  <span className="w-14 shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                    {item.time}
                  </span>
                  <span className="text-foreground/85">{item.label}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-xl bg-muted/50 px-3.5 py-3 text-sm">
              <p className="font-medium">Isi vest</p>
              <p className="mt-1 text-muted-foreground">
                ±{fuel.gelsFromStart} gel dari start (isi ulang di WS + snack wajib), dua
                softflask 500 ml, satu tablet elektrolit per botol, plus 10 item wajib panitia
                — termasuk headlamp, peluit, dan windproof jacket.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
