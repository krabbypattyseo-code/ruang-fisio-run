"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Home, Reply, Store, X } from "lucide-react";

import type { GearItem, GearShop } from "@/data/gear";
import { cn } from "@/lib/utils";

const shopIcon: Record<GearShop["id"], string> = {
  shopee: "/shop/shopee.png",
  tiktok: "/shop/tiktok.svg",
};

/**
 * Bottom nav khusus single product `/gear/[id]`.
 * Tidak dipakai di `/gear` (category list) — lihat AppChrome.
 */
export function GearProductNav({ item }: { item: GearItem }) {
  const [shopOpen, setShopOpen] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const shops = item.shops ?? [];
  const hasAnyShopUrl = shops.some((shop) => Boolean(shop.url));

  useEffect(() => {
    if (!shopOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShopOpen(false);
    };
    const onPointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (panelRef.current && target && !panelRef.current.contains(target)) {
        setShopOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [shopOpen]);

  return (
    <div ref={panelRef} className="relative z-40 shrink-0">
      {shopOpen ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Pilih toko"
          className="absolute inset-x-0 bottom-full border-t border-foreground/10 bg-background/98 px-3 pt-2 pb-2 shadow-[0_-8px_24px_rgba(0,90,100,0.08)] backdrop-blur"
        >
          <div className="mb-1.5 flex items-center justify-between px-1">
            <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
              Check Shop
            </p>
            <button
              type="button"
              aria-label="Tutup"
              onClick={() => setShopOpen(false)}
              className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          </div>
          {shops.length === 0 ? (
            <p className="rounded-xl bg-muted/60 px-3.5 py-3 text-sm text-muted-foreground">
              Belum ada link toko untuk item ini.
            </p>
          ) : (
            <ul className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
              {shops.map((shop, index) => {
                const enabled = Boolean(shop.url);
                const rowClass = cn(
                  "flex w-full items-center gap-3 px-3.5 py-3 text-sm transition-colors",
                  index > 0 ? "border-t border-foreground/8" : "",
                  enabled
                    ? "bg-background text-foreground hover:bg-muted"
                    : "cursor-not-allowed bg-background text-muted-foreground opacity-60",
                );
                const content = (
                  <>
                    <span className="relative size-8 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={shopIcon[shop.id]}
                        alt=""
                        fill
                        unoptimized
                        className="object-contain p-1"
                        sizes="32px"
                      />
                    </span>
                    <span className="flex-1 font-medium">{shop.label}</span>
                    {!enabled ? (
                      <span className="text-[10px] uppercase tracking-wide">Soon</span>
                    ) : null}
                  </>
                );
                return (
                  <li key={shop.id}>
                    {enabled ? (
                      <a
                        href={shop.url}
                        target="_blank"
                        rel="noreferrer"
                        className={rowClass}
                        onClick={() => setShopOpen(false)}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={rowClass} aria-disabled="true">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          {!hasAnyShopUrl && shops.length > 0 ? (
            <p className="mt-2 px-1 text-[11px] text-muted-foreground">
              Link Shopee / TikTok belum diisi — tinggal tempel URL di data gear.
            </p>
          ) : null}
        </div>
      ) : null}

      <nav
        aria-label="Navigasi produk gear"
        className="border-t border-foreground/10 bg-background pb-[max(0.35rem,env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.55fr)] gap-1.5 px-2 pt-1.5 pb-1">
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-muted/70 px-2 py-2 text-[11px] font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Home className="size-4" strokeWidth={2} />
            Home
          </Link>

          <Link
            href="/gear"
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-muted/70 px-2 py-2 text-[11px] font-medium text-foreground transition-colors hover:bg-muted"
          >
            <span className="relative inline-flex items-center gap-1">
              <Reply
                className="size-3.5 -scale-x-100 text-[var(--brand-teal)]"
                aria-hidden
              />
              <span className="font-semibold tracking-wide">Gear</span>
            </span>
            <span className="sr-only">Kembali ke daftar Gear</span>
          </Link>

          <div className="flex min-w-0 flex-col justify-center gap-1 rounded-xl bg-[var(--brand-teal)] px-2.5 py-1.5 text-[#f0fbfc]">
            <p className="truncate text-center text-[12px] font-semibold tabular-nums leading-tight">
              {item.price ?? "Harga —"}
            </p>
            <button
              type="button"
              aria-expanded={shopOpen}
              aria-controls={panelId}
              onClick={() => setShopOpen((open) => !open)}
              className="inline-flex items-center justify-center gap-1 rounded-lg bg-white/15 px-2 py-1.5 text-[11px] font-medium transition-colors hover:bg-white/25"
            >
              <Store className="size-3.5" />
              Check Shop
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
