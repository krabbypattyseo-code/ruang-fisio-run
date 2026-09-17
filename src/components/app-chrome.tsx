"use client";

import { usePathname } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { BottomNav } from "@/components/bottom-nav";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * Home (/) = landing tanpa chrome (CTA Dashboard Monitoring / Event Joined).
 * Setelah masuk dashboard/event/sesi: header + bottom nav fixed di bawah frame.
 * Konten (main + footer) yang di-scroll — bottom nav tidak ikut turun.
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <AppShell>
      {isHome ? null : <SiteHeader />}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" data-app-scroll>
        <main className="flex min-h-full flex-col">{children}</main>
        {isHome ? null : <SiteFooter />}
      </div>
      {isHome ? null : <BottomNav />}
    </AppShell>
  );
}
