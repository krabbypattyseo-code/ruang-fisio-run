import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Mountain } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { gtrUltra } from "@/data/event";
import { formatDate, formatInteger } from "@/lib/format";
import { readiness } from "@/lib/race";

export const metadata: Metadata = {
  title: "Event",
  description: "Daftar event yang sedang diikuti, termasuk GTR Ultra 30K di Banyubiru, Semarang.",
};

const joinedEvents = [gtrUltra];

export default function EventIndexPage() {
  const status = readiness();

  return (
    <div className="w-full px-4 py-5">
      <header>
        <p className="text-xs font-medium tracking-[0.16em] text-[var(--brand-cyan)] uppercase">
          Event Joined
        </p>
        <h1 className="mt-1 font-heading text-xl font-semibold">Event</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {joinedEvents.length} event aktif. Buka detail untuk kesiapan, proyeksi, rencana, dan
          strategi.
        </p>
      </header>

      <ul className="mt-5 space-y-3">
        {joinedEvents.map((event) => (
          <li key={event.slug}>
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{event.category}</Badge>
                  <Badge variant="outline" className="tabular-nums">
                    {status.daysLeft} hari lagi
                  </Badge>
                </div>
                <CardTitle className="mt-1">
                  {event.name} {event.category}
                </CardTitle>
                <CardDescription>
                  Skor kesiapan {status.score}/100 · {status.level}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <dl className="space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="size-3.5 shrink-0" />
                    <dd>
                      {formatDate(event.date, "long")}, start {event.startTime}
                    </dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 shrink-0" />
                    <dd>{event.location}</dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mountain className="size-3.5 shrink-0" />
                    <dd>
                      {event.distanceKm} km · {formatInteger(event.elevGainM)} m naik
                    </dd>
                  </div>
                </dl>
                <Link
                  href={`/event/${event.slug}`}
                  className={buttonVariants({ size: "sm" })}
                >
                  Buka {event.name}
                  <ArrowRight data-icon="inline-end" className="size-3.5" />
                </Link>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
