"use client";

import {
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Scatter,
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
import { brand, typeColor } from "@/lib/colors";
import { formatKm, formatPace } from "@/lib/format";
import type { TrendPoint } from "@/lib/metrics";

export function PaceTrendChart({ data }: { data: TrendPoint[] }) {
  if (data.length < 2) {
    return <ChartEmpty>Butuh minimal dua sesi untuk menggambar tren pace.</ChartEmpty>;
  }

  return (
    <div className="space-y-3">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -6 }}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="label" {...axisProps} minTickGap={24} />
            <YAxis
              {...axisProps}
              width={52}
              reversed
              domain={["dataMin - 30", "dataMax + 30"]}
              tickFormatter={(value: number) => formatPace(value)}
            />
            <Tooltip
              cursor={{ stroke: "currentColor", strokeOpacity: 0.15 }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const point = payload[0].payload as TrendPoint;
                return (
                  <ChartTooltipCard
                    title={point.label}
                    subtitle={`${workoutTypeLabel[point.type]} · ${formatKm(point.distanceKm)}`}
                    rows={[
                      {
                        label: "Pace sesi",
                        value: `${formatPace(point.paceSecPerKm)} /km`,
                        color: typeColor[point.type],
                      },
                      {
                        label: "Tren 5 sesi",
                        value: `${formatPace(point.paceTrend)} /km`,
                        color: brand.slate,
                      },
                      { label: "HR rata-rata", value: `${point.avgHr} bpm` },
                    ]}
                  />
                );
              }}
            />
            <Scatter
              dataKey="paceSecPerKm"
              shape={(props: { cx?: number; cy?: number; payload?: TrendPoint }) => {
                const { cx, cy, payload } = props;
                if (cx === undefined || cy === undefined || !payload) return <g />;
                return <circle cx={cx} cy={cy} r={3.4} fill={typeColor[payload.type]} />;
              }}
            />
            <Line
              type="monotone"
              dataKey="paceTrend"
              stroke={brand.slate}
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend
        items={[
          { label: "Road", color: typeColor.road },
          { label: "Trail", color: typeColor.trail },
          { label: "Hiking", color: typeColor.hiking },
          { label: "Tren 5 sesi", color: brand.slate, dashed: true },
        ]}
      />
    </div>
  );
}
