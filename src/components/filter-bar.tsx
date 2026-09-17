"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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
  type SessionFilter,
  type TypeFilter,
} from "@/lib/filters";
import { cn } from "@/lib/utils";

const typeOptions: { key: TypeFilter; label: string; short: string }[] = [
  { key: "all", label: "Semua", short: "Semua" },
  { key: "road", label: "Road", short: "Road" },
  { key: "trail", label: "Trail", short: "Trail" },
  { key: "hiking", label: "Hiking", short: "Hiking" },
];

/**
 * Filter menetap di bawah header (tanpa gap). Saat user scroll, bar
 * meredup agar tidak menindih konten secara agresif.
 */
export function FilterBar({ filter, resultCount }: { filter: SessionFilter; resultCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeRange = activeRangeKey(filter);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const root = sentinel.closest("[data-app-scroll]") as HTMLElement | null;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { root, threshold: 1, rootMargin: "0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const apply = useCallback(
    (next: SessionFilter) => {
      router.replace(`/dashboard?${filterToQuery(next)}`, { scroll: false });
    },
    [router],
  );

  const isDefault = searchParams.size === 0;

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-0 w-full" />
      <section
        aria-label="Filter sesi"
        data-stuck={stuck ? "true" : "false"}
        className={cn(
          "sticky top-0 z-30 -mx-4 border-b px-4 py-2.5 transition-[background-color,border-color,box-shadow,opacity] duration-200",
          stuck
            ? "border-foreground/5 bg-[color-mix(in_srgb,var(--background)_78%,#e8eef0)]/95 opacity-95 shadow-[0_6px_16px_rgba(0,90,100,0.06)] backdrop-blur-md"
            : "border-foreground/10 bg-background",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-2.5 transition-[opacity,filter] duration-200",
            stuck ? "opacity-80" : "opacity-100",
          )}
        >
          <div className="flex flex-wrap items-center gap-1">
            {typeOptions.map((option) => {
              const isActive = filter.type === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={isActive}
                  aria-label={option.label}
                  onClick={() => apply({ ...filter, type: option.key })}
                  className={cn(
                    "rounded-4xl px-2.5 py-1 text-[11px] font-medium transition-colors",
                    isActive
                      ? stuck
                        ? "bg-[var(--brand-teal)]/70 text-white"
                        : "bg-primary text-primary-foreground"
                      : stuck
                        ? "bg-white/55 text-muted-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  {option.short}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {rangePresets.map((preset) => {
              const isActive = activeRange === preset.key;
              return (
                <button
                  key={preset.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => apply(rangeToFilter(preset.key, filter))}
                  className={cn(
                    "rounded-4xl px-2.5 py-1 text-[11px] font-medium transition-colors",
                    isActive
                      ? stuck
                        ? "bg-foreground/55 text-background"
                        : "bg-foreground text-background"
                      : stuck
                        ? "bg-white/55 text-muted-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  {preset.label}
                </button>
              );
            })}
            <span
              className={cn(
                "ml-auto text-[11px] tabular-nums transition-colors",
                stuck ? "text-muted-foreground/80" : "text-muted-foreground",
              )}
            >
              {resultCount} sesi
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Salin tautan filter ini"
              className={stuck ? "opacity-70" : undefined}
              onClick={() => {
                const url = `${window.location.origin}/dashboard?${filterToQuery(filter)}`;
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
              className={stuck ? "opacity-70" : undefined}
              onClick={() => router.replace("/dashboard", { scroll: false })}
            >
              <RotateCcw />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <label
              className={cn(
                "space-y-1 text-[11px] transition-colors",
                stuck ? "text-muted-foreground/75" : "text-muted-foreground",
              )}
            >
              <span>Dari</span>
              <Input
                type="date"
                value={filter.from}
                min={dataRange.from}
                max={filter.to}
                aria-label="Tanggal mulai"
                onChange={(event) => apply({ ...filter, from: event.target.value })}
                className={cn(
                  "h-8 w-full px-2 text-xs transition-colors",
                  stuck ? "border-foreground/8 bg-white/60 text-muted-foreground" : undefined,
                )}
              />
            </label>
            <label
              className={cn(
                "space-y-1 text-[11px] transition-colors",
                stuck ? "text-muted-foreground/75" : "text-muted-foreground",
              )}
            >
              <span>Sampai</span>
              <Input
                type="date"
                value={filter.to}
                min={filter.from}
                max={dataRange.to}
                aria-label="Tanggal akhir"
                onChange={(event) => apply({ ...filter, to: event.target.value })}
                className={cn(
                  "h-8 w-full px-2 text-xs transition-colors",
                  stuck ? "border-foreground/8 bg-white/60 text-muted-foreground" : undefined,
                )}
              />
            </label>
          </div>
        </div>
      </section>
    </>
  );
}
