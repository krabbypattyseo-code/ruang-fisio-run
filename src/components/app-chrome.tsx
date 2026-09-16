"use client";

import { usePathname } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/**
 * Home (/) menampilkan landing tanpa chrome, sesuai sketsa.
 * Layar lain memakai header + footer di dalam shell 390px.
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <AppShell>
      {isHome ? null : <SiteHeader />}
      <main className="flex flex-1 flex-col">{children}</main>
      {isHome ? null : <SiteFooter />}
    </AppShell>
  );
}
