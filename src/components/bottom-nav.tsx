"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  CalendarCheck2,
  ChevronUp,
  Home,
} from "lucide-react";

import { gtrUltra } from "@/data/event";
import { cn } from "@/lib/utils";

const gtrBase = `/event/${gtrUltra.slug}`;

const eventLinks = [
  { href: gtrBase, label: "GTR Ultra" },
  { href: `${gtrBase}/proyeksi`, label: "Proyeksi" },
  { href: `${gtrBase}/rencana`, label: "Rencana" },
  { href: `${gtrBase}/strategi`, label: "Strategi" },
];

function isHome(pathname: string) {
  return pathname === "/";
}

function isDashboard(pathname: string) {
  return pathname === "/dashboard" || pathname.startsWith("/sesi");
}

function isEvent(pathname: string) {
  return pathname === "/event" || pathname.startsWith("/event/");
}

/**
 * Bottom nav sesuai sketsa: muncul setelah user masuk dari Home
 * lewat Dashboard Monitoring / Event Joined.
 */
export function BottomNav() {
  const pathname = usePathname();
  const [eventOpen, setEventOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEventOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!eventOpen) return;
    const onPointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (panelRef.current && target && !panelRef.current.contains(target)) {
        setEventOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [eventOpen]);

  const homeActive = isHome(pathname);
  const dashboardActive = isDashboard(pathname);
  const eventActive = isEvent(pathname);

  return (
    <div ref={panelRef} className="sticky bottom-0 z-40">
      {eventOpen ? (
        <div className="border-t border-foreground/10 bg-background/98 px-3 pt-2 pb-1 backdrop-blur">
          <p className="px-2 pb-1.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            Event
          </p>
          <ul className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
            {eventLinks.map((item, index) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setEventOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-3 text-sm transition-colors",
                      index > 0 ? "border-t border-foreground/8" : "",
                      active
                        ? "bg-[var(--brand-teal)] font-medium text-white"
                        : "bg-background text-foreground hover:bg-muted",
                    )}
                  >
                    {item.label}
                    {active ? <span className="text-[10px] uppercase opacity-80">Aktif</span> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      <nav
        aria-label="Navigasi utama"
        className="border-t border-foreground/10 bg-background/98 pb-[max(0.35rem,env(safe-area-inset-bottom))] backdrop-blur"
      >
        <ul className="grid grid-cols-3 px-1 pt-1">
          <li>
            <Link
              href="/"
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-[11px] transition-colors",
                homeActive
                  ? "text-[var(--brand-teal)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Home className="size-5" strokeWidth={homeActive ? 2.4 : 1.9} />
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-[11px] transition-colors",
                dashboardActive
                  ? "text-[var(--brand-teal)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <BarChart3 className="size-5" strokeWidth={dashboardActive ? 2.4 : 1.9} />
              Dashboard
            </Link>
          </li>
          <li>
            <button
              type="button"
              aria-expanded={eventOpen}
              aria-haspopup="menu"
              onClick={() => setEventOpen((open) => !open)}
              className={cn(
                "flex w-full flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-[11px] transition-colors",
                eventActive || eventOpen
                  ? "text-[var(--brand-teal)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span className="relative">
                <CalendarCheck2
                  className="size-5"
                  strokeWidth={eventActive || eventOpen ? 2.4 : 1.9}
                />
                <ChevronUp
                  className={cn(
                    "absolute -right-2.5 -top-0.5 size-3 transition-transform",
                    eventOpen ? "rotate-180" : "",
                  )}
                />
              </span>
              Event
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
