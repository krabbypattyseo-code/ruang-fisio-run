"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartEmpty, ChartTooltipCard, axisProps, gridProps } from "@/components/charts/chart-kit";
import { workoutTypeLabel } from "@/data/types";
import type { TrendPoint } from "@/lib/metrics";

type MetricKey = "cadence" | "strideM" | "avgHr";

export function MetricTrendChart({
  data,
  metric,
  color,
  unit,
  decimals = 0,
}: {
  data: TrendPoint[];
  metric: MetricKey;
  color: string;
  unit: string;
  decimals?: number;
}) {
  if (data.length < 2) {
    return <ChartEmpty>Data belum cukup.</ChartEmpty>;
  }

  const formatter = (value: number) => value.toFixed(decimals);

  const gradientId = `gradient-${metric}`;

  return (
    <div className="h-36 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 4, bottom: 0, left: -24 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="label" {...axisProps} minTickGap={40} />
          <YAxis
            {...axisProps}
            width={40}
            domain={["dataMin - 4", "dataMax + 4"]}
            tickFormatter={formatter}
          />
          <Tooltip
            cursor={{ stroke: "currentColor", strokeOpacity: 0.15 }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const point = payload[0].payload as TrendPoint;
              return (
                <ChartTooltipCard
                  title={point.label}
                  subtitle={workoutTypeLabel[point.type]}
                  rows={[
                    {
                      label: unit,
                      value: formatter(point[metric] as number),
                      color,
                    },
                  ]}
                />
              );
            }}
          />
          <Area
            type="monotone"
            dataKey={metric}
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
