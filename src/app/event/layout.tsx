import { CalendarDays, MapPin, Mountain, Timer } from "lucide-react";

import { EventNav } from "@/components/event-nav";
import { Badge } from "@/components/ui/badge";
import { gtrUltra } from "@/data/event";
import { formatDate, formatInteger, formatMinutes } from "@/lib/format";
import { readiness } from "@/lib/race";

export default function EventLayout({ children }: LayoutProps<"/event">) {
  const status = readiness();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <header>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{gtrUltra.category}</Badge>
          <Badge variant="outline" className="tabular-nums">
            {status.daysLeft} hari lagi
          </Badge>
        </div>
        <h1 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
          {gtrUltra.name} {gtrUltra.category}
        </h1>
        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            <dt className="sr-only">Tanggal</dt>
            <dd>
              {formatDate(gtrUltra.date, "long")}, start {gtrUltra.startTime}
            </dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            <dt className="sr-only">Lokasi</dt>
            <dd>{gtrUltra.location}</dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Mountain className="size-3.5" />
            <dt className="sr-only">Elevasi</dt>
            <dd>
              {gtrUltra.distanceKm} km · {formatInteger(gtrUltra.elevGainM)} m naik
            </dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Timer className="size-3.5" />
            <dt className="sr-only">Cut-off</dt>
            <dd>COT {formatMinutes(gtrUltra.cutoffMin)} jam</dd>
          </div>
        </dl>
      </header>

      <div className="mt-6">
        <EventNav />
      </div>

      <div className="mt-6">{children}</div>
    </div>
  );
}
