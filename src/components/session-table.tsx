import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
            <span className="font-medium">Semua</span>.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ul className="space-y-2">
      {sessions.map((session) => (
        <li key={session.id}>
          <Link
            href={`/sesi/${session.id}`}
            className="block rounded-xl px-3.5 py-3 ring-1 ring-foreground/10 transition-colors hover:bg-muted/60"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate font-medium">{session.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {formatDate(session.date)} · {session.route}
                </p>
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
  );
}
