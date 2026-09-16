import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Session } from "@/data/types";
import { workoutTypeShort } from "@/data/types";
import { typeColor } from "@/lib/colors";
import { formatDate, formatDuration, formatInteger, formatNumber, formatPace } from "@/lib/format";

function TypeDot({ session }: { session: Session }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      <span
        className="size-2 shrink-0 rounded-full"
        style={{ backgroundColor: typeColor[session.type] }}
      />
      {workoutTypeShort[session.type]}
    </span>
  );
}

export function SessionTable({ sessions }: { sessions: Session[] }) {
  if (sessions.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-10 text-center">
          <p className="font-heading font-medium">Tidak ada sesi pada filter ini</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Coba lebarkan rentang tanggal, atau kembalikan tipe latihan ke{" "}
            <span className="font-medium">All Workout</span>.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Tabel penuh untuk layar lebar */}
      <div className="hidden overflow-hidden rounded-xl ring-1 ring-foreground/10 md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Sesi</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead className="text-right">Jarak</TableHead>
              <TableHead className="text-right">Waktu</TableHead>
              <TableHead className="text-right">Pace</TableHead>
              <TableHead className="text-right">Naik</TableHead>
              <TableHead className="text-right">HR</TableHead>
              <TableHead className="w-8" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id} className="group">
                <TableCell className="whitespace-nowrap text-muted-foreground tabular-nums">
                  {formatDate(session.date)}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/sesi/${session.id}`}
                    className="font-medium hover:underline"
                  >
                    {session.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{session.route}</p>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <TypeDot session={session} />
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatNumber(session.distanceKm)} km
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatDuration(session.durationSec)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatPace(session.paceSecPerKm)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatInteger(session.elevGainM)} m
                </TableCell>
                <TableCell className="text-right tabular-nums">{session.avgHr}</TableCell>
                <TableCell>
                  <Link
                    href={`/sesi/${session.id}`}
                    aria-label={`Buka detail ${session.title}`}
                    className="text-muted-foreground transition-colors group-hover:text-foreground"
                  >
                    <ChevronRight className="size-4" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Kartu ringkas untuk layar sempit */}
      <ul className="space-y-2 md:hidden">
        {sessions.map((session) => (
          <li key={session.id}>
            <Link
              href={`/sesi/${session.id}`}
              className="block rounded-xl px-3.5 py-3 ring-1 ring-foreground/10 transition-colors hover:bg-muted/60"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-medium">{session.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{session.route}</p>
                </div>
                <Badge variant="outline" className="shrink-0">
                  <TypeDot session={session} />
                </Badge>
              </div>
              <dl className="mt-2.5 grid grid-cols-4 gap-2 text-xs tabular-nums">
                <div>
                  <dt className="text-muted-foreground">Jarak</dt>
                  <dd>{formatNumber(session.distanceKm)} km</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Waktu</dt>
                  <dd>{formatDuration(session.durationSec)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Pace</dt>
                  <dd>{formatPace(session.paceSecPerKm)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Naik</dt>
                  <dd>{formatInteger(session.elevGainM)} m</dd>
                </div>
              </dl>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
