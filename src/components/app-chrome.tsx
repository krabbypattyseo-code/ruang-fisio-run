"use client";

import { usePathname } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { BottomNav } from "@/components/bottom-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * Home (/) = landing tanpa chrome (CTA Dashboard Monitoring / Event Joined).
 * Setelah masuk dashboard/event/sesi: header + bottom nav sesuai sketsa mobile.
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <AppShell>
      {isHome ? null : <SiteHeader />}
      <main className="flex flex-1 flex-col">{children}</main>
      {isHome ? null : <SiteFooter />}
      {isHome ? null : <BottomNav />}
    </AppShell>
  );
}
