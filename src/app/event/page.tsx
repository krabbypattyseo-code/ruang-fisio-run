import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Mountain, Route } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { gtrUltra } from "@/data/event";
import { jakim2027 } from "@/data/jakim";
import { formatDate, formatInteger } from "@/lib/format";

export const metadata: Metadata = {
  title: "Event",
  description:
    "Daftar event yang diikuti: JAKIM 2027 Marathon (upcoming) dan hasil GTR Ultra 30K di Banyubiru, Semarang.",
};

const joinedEvents = [gtrUltra];
const upcoming = jakim2027;
const totalEvents = joinedEvents.length + 1;

const fmt1 = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);

export default function EventIndexPage() {
  const latest = joinedEvents[0];

  return (
    <div className="w-full px-4 py-5">
      <header>
        <p className="text-xs font-medium tracking-[0.16em] text-[var(--brand-cyan)] uppercase">
          Event Joined
        </p>
        <h1 className="mt-1 font-heading text-xl font-semibold">Event</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {totalEvents} event · berikutnya: {upcoming.shortName}, {formatDate(upcoming.date, "long")}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Terakhir: {latest.name} {latest.category}, {formatDate(latest.date, "long")}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Buka detail untuk hasil, evaluasi, dan rencana perbaikan.
        </p>
      </header>

      <ul className="mt-5 space-y-3">
        <li>
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{upcoming.category}</Badge>
                <Badge variant="outline">Upcoming</Badge>
              </div>
              <CardTitle className="mt-1">
                {upcoming.shortName} {upcoming.category}
              </CardTitle>
              <CardDescription>
                {upcoming.name}
                {upcoming.formerName ? ` (sebelumnya ${upcoming.formerName})` : ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <dl className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5 shrink-0" />
                  <dd>
                    {formatDate(upcoming.date, "weekday")} {upcoming.date.slice(0, 4)}
                    {upcoming.startTime
                      ? `, flag off ${upcoming.startTime} WIB`
                      : ", flag off belum diumumkan"}{" "}
                    · COT {upcoming.cutoffHours} jam
                  </dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0" />
                  <dd>{upcoming.location}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <Route className="size-3.5 shrink-0" />
                  <dd>42,195 km · road, point-to-point</dd>
                </div>
              </dl>
              <Link href={`/event/${upcoming.slug}`} className={buttonVariants({ size: "sm" })}>
                Buka {upcoming.shortName}
                <ArrowRight data-icon="inline-end" className="size-3.5" />
              </Link>
            </CardContent>
          </Card>
        </li>
        {joinedEvents.map((event) => {
          const result = event.result;
          return (
            <li key={event.slug}>
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{event.category}</Badge>
                    <StatusBadge status={event.status} />
                  </div>
                  <CardTitle className="mt-1">
                    {event.name} {event.category}
                  </CardTitle>
                  <CardDescription>
                    {result?.headline ?? `${event.distanceKm} km · ${event.location}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <dl className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 shrink-0" />
                      <dd>
                        {formatDate(event.date, "weekday")}, flag off {event.startTime} WIB · COT{" "}
                        {event.cutoffClock}
                      </dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="size-3.5 shrink-0" />
                      <dd>{event.location}</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mountain className="size-3.5 shrink-0" />
                      <dd>
                        {result
                          ? `${fmt1(result.courseKm)} km · ${formatInteger(result.courseAscentM)} m naik`
                          : `${event.distanceKm} km · ${formatInteger(event.elevGainM)} m naik`}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href={`/event/${event.slug}`}
                    className={buttonVariants({ size: "sm" })}
                  >
                    {event.status === "upcoming" ? `Buka ${event.name}` : "Buka hasil & evaluasi"}
                    <ArrowRight data-icon="inline-end" className="size-3.5" />
                  </Link>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
