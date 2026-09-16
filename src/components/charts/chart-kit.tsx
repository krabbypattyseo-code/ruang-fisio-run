"use client";

import type { ReactNode } from "react";

export const axisProps = {
  stroke: "currentColor",
  tickLine: false,
  axisLine: false,
  tick: { fontSize: 11, fill: "currentColor" },
  className: "text-muted-foreground",
} as const;

export const gridProps = {
  stroke: "currentColor",
  strokeOpacity: 0.12,
  strokeDasharray: "3 3",
  vertical: false,
} as const;

export type TooltipRow = {
  label: string;
  value: string;
  color?: string;
};

export function ChartTooltipCard({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle?: string;
  rows: TooltipRow[];
}) {
  return (
    <div className="rounded-xl border border-foreground/10 bg-popover px-3 py-2 text-xs shadow-lg">
      <p className="font-heading font-medium text-popover-foreground">{title}</p>
      {subtitle ? <p className="mt-0.5 text-muted-foreground">{subtitle}</p> : null}
      <ul className="mt-1.5 space-y-1">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center gap-2 tabular-nums">
            {row.color ? (
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: row.color }}
              />
            ) : null}
            <span className="text-muted-foreground">{row.label}</span>
            <span className="ml-auto font-medium text-popover-foreground">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ChartLegend({
  items,
}: {
  items: { label: string; color: string; dashed?: boolean }[];
}) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span
            className="h-0.5 w-4 rounded-full"
            style={{
              backgroundColor: item.dashed ? "transparent" : item.color,
              borderTop: item.dashed ? `2px dashed ${item.color}` : undefined,
            }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export function ChartEmpty({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-full min-h-40 place-items-center rounded-xl border border-dashed border-foreground/15 px-6 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}
