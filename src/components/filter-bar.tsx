"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Link2, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dataRange } from "@/data/sessions";
import {
  activeRangeKey,
  filterToQuery,
  rangePresets,
  rangeToFilter,
  typeOptions,
  type SessionFilter,
} from "@/lib/filters";

/**
 * Filter bukan halaman tersendiri: barnya menetap di atas Dashboard dan seluruh
 * state-nya hidup di URL (?tipe=trail&dari=2026-07-01) supaya bisa di-bookmark.
 */
export function FilterBar({ filter, resultCount }: { filter: SessionFilter; resultCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeRange = activeRangeKey(filter);

  const apply = useCallback(
    (next: SessionFilter) => {
      router.replace(`/?${filterToQuery(next)}`, { scroll: false });
    },
    [router],
  );

  const isDefault = searchParams.size === 0;

  return (
    <section
      aria-label="Filter sesi"
      className="sticky top-14 z-30 -mx-4 border-b border-foreground/10 bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center gap-1.5">
          {typeOptions.map((option) => {
            const isActive = filter.type === option.key;
            return (
              <button
                key={option.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => apply({ ...filter, type: option.key })}
                className={`rounded-4xl px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 lg:ml-2">
          {rangePresets.map((preset) => {
            const isActive = activeRange === preset.key;
            return (
              <button
                key={preset.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => apply(rangeToFilter(preset.key, filter))}
                className={`rounded-4xl px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Dari
            <Input
              type="date"
              value={filter.from}
              min={dataRange.from}
              max={filter.to}
              aria-label="Tanggal mulai"
              onChange={(event) => apply({ ...filter, from: event.target.value })}
              className="h-8 w-[9.5rem] text-xs"
            />
          </label>
          <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Sampai
            <Input
              type="date"
              value={filter.to}
              min={filter.from}
              max={dataRange.to}
              aria-label="Tanggal akhir"
              onChange={(event) => apply({ ...filter, to: event.target.value })}
              className="h-8 w-[9.5rem] text-xs"
            />
          </label>
        </div>

        <div className="flex items-center gap-1.5 lg:ml-auto">
          <span className="text-xs text-muted-foreground tabular-nums">
            {resultCount} sesi
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Salin tautan filter ini"
            onClick={() => {
              const url = `${window.location.origin}/?${filterToQuery(filter)}`;
              navigator.clipboard
                ?.writeText(url)
                .then(() => toast.success("Tautan filter disalin"))
                .catch(() => toast.error("Peramban menolak akses clipboard"));
            }}
          >
            <Link2 />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Kembalikan filter ke bawaan"
            disabled={isDefault}
            onClick={() => router.replace("/", { scroll: false })}
          >
            <RotateCcw />
          </Button>
        </div>
      </div>
    </section>
  );
}
