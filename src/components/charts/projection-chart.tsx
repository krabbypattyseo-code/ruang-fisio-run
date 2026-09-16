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
  agresif: typeColor.trail,
  target: typeColor.road,
  aman: brand.clay,
};

/** Kurva waktu tempuh tiap skenario dibanding garis cut-off panitia. */
export function ProjectionChart({
  scenarios,
  event,
}: {
  scenarios: Scenario[];
  event: RaceEvent;
}) {
  const data = [
    { km: 0, cutoff: 0, agresif: 0, target: 0, aman: 0, name: "Start" },
    ...event.checkpoints.map((checkpoint, index) => ({
      km: checkpoint.km,
      name: checkpoint.name,
      cutoff: checkpoint.cutoffMin,
      agresif: scenarios.find((item) => item.key === "agresif")!.splits[index].elapsedMin,
      target: scenarios.find((item) => item.key === "target")!.splits[index].elapsedMin,
      aman: scenarios.find((item) => item.key === "aman")!.splits[index].elapsedMin,
    })),
  ];

  return (
    <div className="space-y-3">
      <div className="h-72 w-full">
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
                        label: "Agresif",
                        value: formatMinutes(point.agresif),
                        color: scenarioColor.agresif,
                      },
                      {
                        label: "Target",
                        value: formatMinutes(point.target),
                        color: scenarioColor.target,
                      },
                      {
                        label: "Aman",
                        value: formatMinutes(point.aman),
                        color: scenarioColor.aman,
                      },
                      {
                        label: "Cut-off",
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
              dataKey="agresif"
              stroke={scenarioColor.agresif}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke={scenarioColor.target}
              strokeWidth={2.5}
              dot={{ r: 3.5 }}
            />
            <Line
              type="monotone"
              dataKey="aman"
              stroke={scenarioColor.aman}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend
        items={[
          { label: "Agresif", color: scenarioColor.agresif },
          { label: "Target", color: scenarioColor.target },
          { label: "Aman", color: scenarioColor.aman },
          { label: "Cut-off panitia", color: metricColor.cutoff, dashed: true },
        ]}
      />
      <p className="text-xs text-muted-foreground">
        Garis apa pun yang menyentuh garis cut-off berarti berhenti di pos itu. Jaga jarak
        minimal 20 menit dari garis merah di setiap water station.
      </p>
    </div>
  );
}
