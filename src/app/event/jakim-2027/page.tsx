import type { Metadata } from "next";
import { CalendarDays, ExternalLink, MapPin, Route, Timer } from "lucide-react";

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
import { jakim2027 as race } from "@/data/jakim";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: `${race.shortName} ${race.category}`,
  description: `${race.name} kategori ${race.category} (42,195 km), ${formatDate(race.date, "long")}, rute ${race.location}.`,
};

const fullDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

/** "10–12 Juni 2027" untuk rentang di bulan yang sama. */
const dayRange = (from: string, to: string) =>
  `${new Date(`${from}T00:00:00Z`).getUTCDate()}–${formatDate(to, "long")}`;

export default function Jakim2027Page() {
  return (
    <div className="w-full px-4 py-5">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{race.category}</Badge>
          <Badge variant="outline">Upcoming</Badge>
        </div>
        <h1 className="mt-2 font-heading text-xl font-semibold">
          {race.shortName} {race.category}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {race.name}
          {race.formerName ? ` (sebelumnya ${race.formerName})` : ""}. Target berikutnya
          setelah GTR Ultra 30K.
        </p>
        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            <dt className="sr-only">Tanggal</dt>
            <dd>{fullDate(race.date)}</dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            <dt className="sr-only">Lokasi</dt>
            <dd>{race.location}</dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Route className="size-3.5" />
            <dt className="sr-only">Jarak</dt>
            <dd>42,195 km · road</dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Timer className="size-3.5" />
            <dt className="sr-only">Cut-off</dt>
            <dd>COT {race.cutoffHours} jam</dd>
          </div>
        </dl>
      </header>

      <div className="mt-6 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Info lomba</CardTitle>
            <CardDescription>Data resmi panitia yang sudah diumumkan.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead className="w-32">Kategori</TableHead>
                  <TableCell className="whitespace-normal">Marathon · 42,195 km</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableCell className="whitespace-normal">{fullDate(race.date)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Flag off</TableHead>
                  <TableCell className="whitespace-normal">
                    {race.startTime ? `${race.startTime} WIB` : "Belum diumumkan"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Cut-off</TableHead>
                  <TableCell className="whitespace-normal">{race.cutoffHours} jam</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Rute</TableHead>
                  <TableCell className="whitespace-normal">{race.route}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead>Race pack</TableHead>
                  <TableCell className="whitespace-normal">
                    {dayRange(race.racePack.from, race.racePack.to)},{" "}
                    {race.racePack.venue}
                    {race.racePack.note ? ` (${race.racePack.note.toLowerCase()})` : ""}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Semua kategori</CardTitle>
            <CardDescription>
              Event dua hari, {dayRange(race.eventDates.from, race.eventDates.to)}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Jarak</TableHead>
                  <TableHead>Hari</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {race.categories.map((item) => (
                  <TableRow
                    key={item.label}
                    className={item.label === race.category ? "font-medium" : undefined}
                  >
                    <TableCell>
                      {item.label}
                      {item.label === race.category ? " (aku)" : ""}
                    </TableCell>
                    <TableCell>{item.distance}</TableCell>
                    <TableCell className="whitespace-normal">{item.day}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Belum diumumkan</CardTitle>
            <CardDescription>
              Halaman ini akan diperbarui begitu panitia merilis detailnya.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {race.pending.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          Sumber resmi:
          {race.sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-foreground"
            >
              {source.label}
              <ExternalLink className="size-3" />
            </a>
          ))}
        </p>
      </div>
    </div>
  );
}
