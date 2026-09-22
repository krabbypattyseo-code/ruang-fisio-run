"use client";

import { usePathname } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { BottomNav } from "@/components/bottom-nav";
import { GearProductNav } from "@/components/gear-product-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getGear } from "@/data/gear";

/**
 * Home (/) = landing tanpa chrome.
 * `/gear/[id]` = header + product nav khusus (Home | Gear back | harga + Check Shop).
 * Halaman lain (termasuk `/gear` category) = header + bottom nav biasa.
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const gearProductMatch = pathname.match(/^\/gear\/([^/]+)\/?$/);
  const gearProductId = gearProductMatch?.[1];
  const gearProduct = gearProductId ? getGear(gearProductId) : undefined;
  const isGearProduct = Boolean(gearProduct);

  return (
    <AppShell>
      {isHome ? null : <SiteHeader />}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" data-app-scroll>
        <main className="flex min-h-full flex-col">{children}</main>
        {isHome ? null : <SiteFooter />}
      </div>
      {isHome ? null : isGearProduct && gearProduct ? (
        <GearProductNav item={gearProduct} />
      ) : (
        <BottomNav />
      )}
    </AppShell>
  );
}
