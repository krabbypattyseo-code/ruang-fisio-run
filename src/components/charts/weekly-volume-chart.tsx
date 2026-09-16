"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartEmpty,
  ChartLegend,
  ChartTooltipCard,
  axisProps,
  gridProps,
} from "@/components/charts/chart-kit";
import { workoutTypeLabel } from "@/data/types";
import { typeColor } from "@/lib/colors";
import { formatInteger, formatNumber } from "@/lib/format";
import type { WeeklyPoint } from "@/lib/metrics";

export function WeeklyVolumeChart({ data }: { data: WeeklyPoint[] }) {
  if (data.length === 0) {
    return <ChartEmpty>Belum ada sesi pada rentang ini.</ChartEmpty>;
  }

  return (
    <div className="space-y-3">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -18 }}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="label" {...axisProps} />
            <YAxis {...axisProps} width={44} unit=" km" />
            <Tooltip
              cursor={{ fill: "currentColor", fillOpacity: 0.05 }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const point = payload[0].payload as WeeklyPoint;
                return (
                  <ChartTooltipCard
                    title={`Pekan ${label}`}
                    subtitle={`${formatNumber(point.total)} km · ${formatInteger(point.elevGainM)} m naik`}
                    rows={(["road", "trail", "hiking"] as const)
                      .filter((type) => point[type] > 0)
                      .map((type) => ({
                        label: workoutTypeLabel[type],
                        value: `${formatNumber(point[type])} km`,
                        color: typeColor[type],
                      }))}
                  />
                );
              }}
            />
            <Bar dataKey="road" stackId="km" fill={typeColor.road} radius={[0, 0, 0, 0]} />
            <Bar dataKey="trail" stackId="km" fill={typeColor.trail} />
            <Bar dataKey="hiking" stackId="km" fill={typeColor.hiking} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend
        items={[
          { label: "Road", color: typeColor.road },
          { label: "Trail", color: typeColor.trail },
          { label: "Hiking", color: typeColor.hiking },
        ]}
      />
    </div>
  );
}
