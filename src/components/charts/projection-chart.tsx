"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartLegend,
  ChartTooltipCard,
  axisProps,
  gridProps,
} from "@/components/charts/chart-kit";
import type { RaceEvent } from "@/data/event";
import { brand, metricColor, typeColor } from "@/lib/colors";
import { formatMinutes } from "@/lib/format";
import type { Scenario } from "@/lib/race";

const scenarioColor: Record<string, string> = {
  disiplin: typeColor.trail,
  sedang: typeColor.road,
  april: brand.clay,
};

/** Kurva waktu tempuh tiap skenario dibanding batas mundur pribadi + COT finish. */
export function ProjectionChart({
  scenarios,
  event,
}: {
  scenarios: Scenario[];
  event: RaceEvent;
}) {
  const data = [
    { km: 0, cutoff: 0, disiplin: 0, sedang: 0, april: 0, name: "Start" },
    ...event.checkpoints.map((checkpoint, index) => ({
      km: checkpoint.km,
      name: checkpoint.name,
      cutoff: checkpoint.cutoffMin,
      disiplin: scenarios.find((item) => item.key === "disiplin")!.splits[index].elapsedMin,
      sedang: scenarios.find((item) => item.key === "sedang")!.splits[index].elapsedMin,
      april: scenarios.find((item) => item.key === "april")!.splits[index].elapsedMin,
    })),
  ];

  return (
    <div className="space-y-3">
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 10, bottom: 0, left: -8 }}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="km" {...axisProps} unit=" km" type="number" domain={[0, event.distanceKm]} />
            <YAxis
              {...axisProps}
              width={54}
              tickFormatter={(value: number) => formatMinutes(value)}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const point = payload[0].payload as (typeof data)[number];
                return (
                  <ChartTooltipCard
                    title={point.name}
                    subtitle={`Km ${point.km}`}
                    rows={[
                      {
                        label: "Disiplin",
                        value: formatMinutes(point.disiplin),
                        color: scenarioColor.disiplin,
                      },
                      {
                        label: "Sedang",
                        value: formatMinutes(point.sedang),
                        color: scenarioColor.sedang,
                      },
                      {
                        label: "Seperti 11 April",
                        value: formatMinutes(point.april),
                        color: scenarioColor.april,
                      },
                      {
                        label: "Batas mundur pribadi",
                        value: formatMinutes(point.cutoff),
                        color: metricColor.cutoff,
                      },
                    ]}
                  />
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="cutoff"
              stroke={metricColor.cutoff}
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="disiplin"
              stroke={scenarioColor.disiplin}
              strokeWidth={2.5}
              dot={{ r: 3.5 }}
            />
            <Line
              type="monotone"
              dataKey="sedang"
              stroke={scenarioColor.sedang}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="april"
              stroke={scenarioColor.april}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend
        items={[
          { label: "Disiplin", color: scenarioColor.disiplin },
          { label: "Sedang", color: scenarioColor.sedang },
          { label: "Seperti 11 April", color: scenarioColor.april },
          { label: "Batas mundur pribadi (estimasi)", color: metricColor.cutoff, dashed: true },
        ]}
      />
      <p className="text-xs text-muted-foreground">
        Garis putus-putus adalah batas mundur pribadi, bukan cut-off panitia. COT resmi hanya
        di finish: {event.cutoffClock} WIB ({formatMinutes(event.cutoffMin)} dari start).
      </p>
    </div>
  );
}
