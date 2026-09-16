"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMinutes, formatPace } from "@/lib/format";
import type { Scenario } from "@/lib/race";

/** Tabel split per pos; skenario bisa ditukar tanpa memuat ulang halaman. */
export function ScenarioSplits({ scenarios }: { scenarios: Scenario[] }) {
  const [activeKey, setActiveKey] = useState(scenarios[1]?.key ?? scenarios[0].key);
  const active = scenarios.find((scenario) => scenario.key === activeKey) ?? scenarios[0];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-1.5">
        {scenarios.map((scenario) => (
          <button
            key={scenario.key}
            type="button"
            aria-pressed={scenario.key === activeKey}
            onClick={() => setActiveKey(scenario.key)}
            className={`rounded-4xl px-3 py-1.5 text-xs font-medium transition-colors ${
              scenario.key === activeKey
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {scenario.label} · {formatMinutes(scenario.finishMin)}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">{active.description}</p>

      <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pos</TableHead>
              <TableHead className="text-right">Km</TableHead>
              <TableHead className="text-right">Waktu segmen</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Jam dinding</TableHead>
              <TableHead className="text-right">Sisa ke cut-off</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {active.splits.map((split) => {
              const tight = split.marginMin < 25;
              return (
                <TableRow key={split.name}>
                  <TableCell className="font-medium whitespace-nowrap">{split.name}</TableCell>
                  <TableCell className="text-right tabular-nums">{split.km}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatMinutes(split.segmentMin)}
                    <span className="ml-1.5 text-xs text-muted-foreground">
                      {formatPace((split.segmentMin * 60) / split.segmentKm)}/km
                    </span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatMinutes(split.elapsedMin)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{split.arrivalClock}</TableCell>
                  <TableCell
                    className={`text-right tabular-nums ${
                      tight ? "font-medium text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {formatMinutes(split.marginMin)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
