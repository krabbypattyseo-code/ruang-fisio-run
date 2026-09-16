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
    "Logistik cairan, kalori, dan pacing per segmen yang dihitung dari proyeksi waktu dan sweat rate pribadi.",
};

export default function StrategyPage() {
  const forecast = projection();
  const scenario = forecast.target;
  const fuel = fuelingPlan(scenario, gtrUltra, runnerProfile);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
          hint={`${fuel.perHourFluidMl} ml per jam`}
          icon={Droplets}
        />
        <StatCard
          label="Total karbohidrat"
          value={formatInteger(fuel.totalCarbG)}
          unit="gram"
          hint={`${fuel.perHourCarbG} g per jam · ${fuel.totalGels} gel`}
          icon={Zap}
        />
        <StatCard
          label="Sodium"
          value={formatInteger(fuel.totalSodiumMg)}
          unit="mg"
          hint={`Sweat rate ${formatNumber(runnerProfile.sweatRateLPerHour)} L/jam`}
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
            Angka ini turunan dari proyeksi waktu skenario target dan sweat rate hasil uji
            timbang badan, bukan patokan umum.
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

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="size-4 text-primary" />
              Aturan pacing
            </CardTitle>
            <CardDescription>
              Kesalahan paling umum di 30K bergunung: km 1–7 terasa terlalu enak.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                `Km 0–7,5: tahan di ${formatPace(scenario.splits[0].segmentMin * 60 / scenario.splits[0].segmentKm)} /km. Kalau lebih cepat dari itu, kamu sedang meminjam waktu dari km 22.`,
                "Km 7,5–14: tanjakan 860 m. Power hiking begitu gradien lewat 15%, jaga HR di bawah 155.",
                "Km 14–21,5: turunan panjang, langkah pendek dan cepat. Ini tempat menabung waktu tanpa menghabiskan kaki.",
                "Km 21,5–27: turunan teknis. Kencangkan sepatu di WS 3 dan makan sebelum masuk jalur ini.",
                "Km 27–30: jalan kampung menanjak ringan. Sisakan satu gel untuk 3 km terakhir.",
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
              Isi vest dan jadwal pagi
            </CardTitle>
            <CardDescription>
              Start {gtrUltra.startTime}, jadi mundurkan semuanya dari jam itu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              {[
                { time: "02:30", label: "Bangun, sarapan 600–700 kkal rendah serat" },
                { time: "03:30", label: "Berangkat ke lokasi, minum 500 ml elektrolit" },
                { time: "04:15", label: "Cek perlengkapan wajib dan titipkan drop bag" },
                { time: "04:40", label: "Pemanasan 10 menit plus gel pertama" },
                { time: "05:00", label: "Start di barisan tengah, tahan ego 2 km pertama" },
              ].map((item) => (
                <li key={item.time} className="flex gap-3">
                  <span className="w-12 shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                    {item.time}
                  </span>
                  <span className="text-foreground/85">{item.label}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-xl bg-muted/50 px-3.5 py-3 text-sm">
              <p className="font-medium">Isi vest</p>
              <p className="mt-1 text-muted-foreground">
                {Math.ceil(fuel.totalGels / 2)} gel di saku depan,{" "}
                {Math.floor(fuel.totalGels / 2)} gel di kantong belakang, dua botol 500 ml,
                satu tablet elektrolit per botol, plus perlengkapan wajib panitia.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
