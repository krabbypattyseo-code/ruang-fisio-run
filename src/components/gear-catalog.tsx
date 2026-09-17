"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  gearItems,
  gearStatusLabel,
  gearTypeLabel,
  type GearItem,
  type GearStatus,
  type GearType,
} from "@/data/gear";
import { cn } from "@/lib/utils";

type TypeFilter = "all" | GearType;
type StatusFilter = "all" | GearStatus;

const typeOptions: { key: TypeFilter; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "shoes", label: "Shoes" },
  { key: "watch", label: "Watch" },
  { key: "vest", label: "Vest" },
  { key: "backpack", label: "Backpack" },
  { key: "tent", label: "Tent" },
  { key: "powerbank", label: "Powerbank" },
  { key: "accessory", label: "Accessory" },
];

const statusOptions: { key: StatusFilter; label: string }[] = [
  { key: "all", label: "Semua status" },
  { key: "currently-use", label: "Currently Use" },
  { key: "retired", label: "Retired" },
];

function GearCard({ item }: { item: GearItem }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-background ring-1 ring-foreground/10">
      <div className="flex gap-3 p-3">
        <div className="relative size-[88px] shrink-0 overflow-hidden rounded-xl bg-muted">
          <Image
            src={item.images[0]}
            alt={item.nickname}
            fill
            unoptimized
            className="object-cover"
            sizes="88px"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <div>
            <p className="text-[10px] font-medium tracking-wide text-[var(--brand-cyan)] uppercase">
              {item.brand} · {gearTypeLabel[item.type]}
            </p>
            <h2 className="mt-0.5 font-heading text-sm leading-snug font-semibold text-[var(--brand-teal)]">
              {item.nickname}
            </h2>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <Badge
              variant={item.status === "currently-use" ? "default" : "secondary"}
              className="rounded-full px-2 py-0.5 text-[10px]"
            >
              {gearStatusLabel[item.status]}
            </Badge>
            <Link
              href={`/gear/${item.id}`}
              className="inline-flex items-center gap-0.5 text-xs font-medium text-[var(--brand-teal)] hover:underline"
            >
              Details
              <ChevronRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function GearCatalog() {
  const [type, setType] = useState<TypeFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");

  const filtered = useMemo(
    () =>
      gearItems.filter((item) => {
        if (type !== "all" && item.type !== type) return false;
        if (status !== "all" && item.status !== status) return false;
        return true;
      }),
    [type, status],
  );

  return (
    <div className="space-y-3">
      <section
        aria-label="Filter gear"
        className="sticky top-0 z-20 -mx-4 border-b border-foreground/10 bg-background px-4 py-2.5"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-1">
            {typeOptions.map((option) => {
              const active = type === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setType(option.key)}
                  className={cn(
                    "rounded-4xl px-2.5 py-1 text-[11px] font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-1">
            {statusOptions.map((option) => {
              const active = status === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setStatus(option.key)}
                  className={cn(
                    "rounded-4xl px-2.5 py-1 text-[11px] font-medium transition-colors",
                    active
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
            <span className="ml-auto self-center text-[11px] text-muted-foreground tabular-nums">
              {filtered.length} item
            </span>
          </div>
        </div>
      </section>

      {filtered.length === 0 ? (
        <p className="rounded-2xl bg-muted/50 px-4 py-8 text-center text-sm text-muted-foreground">
          Belum ada gear untuk filter ini.
        </p>
      ) : (
        <ul className="space-y-2.5">
          {filtered.map((item) => (
            <li key={item.id}>
              <GearCard item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
