"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartTooltipCard, axisProps, gridProps } from "@/components/charts/chart-kit";
import type { Lap, Session } from "@/data/types";
import { brand, metricColor } from "@/lib/colors";
import { formatDuration, formatInteger, formatMinSec, formatPace } from "@/lib/format";

export function ElevationProfileChart({ laps }: { laps: Lap[] }) {
  const data = [
    { km: 0, elevationM: Math.max(0, laps[0].elevationM - laps[0].elevGainM) },
    ...laps.map((lap) => ({
      km: laps.slice(0, lap.index).reduce((total, item) => total + item.distanceKm, 0),
      elevationM: lap.elevationM,
      gain: lap.elevGainM,
      loss: lap.elevLossM,
      pace: lap.paceSecPerKm,
    })),
  ];

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 6, bottom: 0, left: -12 }}>
          <defs>
            <linearGradient id="elevation-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={metricColor.elevation} stopOpacity={0.4} />
              <stop offset="100%" stopColor={metricColor.elevation} stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid {...gridProps} />
          <XAxis
            dataKey="km"
            {...axisProps}
            tickFormatter={(value: number) => `${value.toFixed(0)}`}
            unit=" km"
          />
          <YAxis {...axisProps} width={48} unit=" m" domain={["dataMin - 40", "dataMax + 40"]} />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const point = payload[0].payload as {
                km: number;
                elevationM: number;
                gain?: number;
                pace?: number;
              };
              return (
                <ChartTooltipCard
                  title={`Km ${point.km.toFixed(1)}`}
                  rows={[
                    {
                      label: "Elevasi",
                      value: `${formatInteger(point.elevationM)} m`,
                      color: metricColor.elevation,
                    },
                    ...(point.gain !== undefined
                      ? [{ label: "Naik di lap ini", value: `${formatInteger(point.gain)} m` }]
                      : []),
                    ...(point.pace !== undefined
                      ? [{ label: "Pace lap", value: `${formatPace(point.pace)} /km` }]
                      : []),
                  ]}
                />
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="elevationM"
            stroke={metricColor.elevation}
            strokeWidth={2}
            fill="url(#elevation-gradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LapPaceChart({ laps }: { laps: Lap[] }) {
  const paces = laps.map((lap) => lap.paceSecPerKm);
  const fastest = Math.min(...paces);

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={laps} margin={{ top: 6, right: 6, bottom: 0, left: -4 }}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="index" {...axisProps} />
          <YAxis
            {...axisProps}
            width={52}
            reversed
            domain={[fastest - 45, Math.max(...paces) + 30]}
            tickFormatter={(value: number) => formatPace(value)}
          />
          <Tooltip
            cursor={{ fill: "currentColor", fillOpacity: 0.05 }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const lap = payload[0].payload as Lap;
              return (
                <ChartTooltipCard
                  title={`Lap ${lap.index}`}
                  subtitle={`${lap.distanceKm.toFixed(2)} km · ${formatMinSec(lap.durationSec)}`}
                  rows={[
                    {
                      label: "Pace",
                      value: `${formatPace(lap.paceSecPerKm)} /km`,
                      color: metricColor.pace,
                    },
                    { label: "HR", value: `${lap.avgHr} bpm`, color: metricColor.hr },
                    { label: "Cadence", value: `${lap.cadence} spm` },
                    { label: "Naik", value: `${lap.elevGainM} m` },
                  ]}
                />
              );
            }}
          />
          <Bar dataKey="paceSecPerKm" radius={[4, 4, 0, 0]}>
            {laps.map((lap) => (
              <Cell
                key={lap.index}
                fill={lap.paceSecPerKm === fastest ? metricColor.cadence : metricColor.pace}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const zoneLabels = [
  "Z1 Pemulihan",
  "Z2 Aerobik",
  "Z3 Tempo",
  "Z4 Ambang",
  "Z5 Maksimal",
] as const;

const zoneColors = [brand.slate, metricColor.cadence, metricColor.pace, brand.clay, brand.rose];

export function HrZoneBars({ session }: { session: Session }) {
  const total = session.hrZones.reduce((sum, value) => sum + value, 0) || 1;

  return (
    <ul className="space-y-2.5">
      {session.hrZones.map((seconds, index) => {
        const share = seconds / total;
        return (
          <li key={zoneLabels[index]} className="space-y-1">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-muted-foreground">{zoneLabels[index]}</span>
              <span className="tabular-nums">
                {formatDuration(seconds)}
                <span className="ml-1.5 text-muted-foreground">
                  {Math.round(share * 100)}%
                </span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.max(share * 100, share > 0 ? 1.5 : 0)}%`,
                  backgroundColor: zoneColors[index],
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
