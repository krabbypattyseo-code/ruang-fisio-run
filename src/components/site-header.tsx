"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CalendarClock, Menu, X } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/event", label: "GTR Ultra 30K" },
  { href: "/event/proyeksi", label: "Proyeksi" },
  { href: "/event/rencana", label: "Rencana" },
  { href: "/event/strategi", label: "Strategi" },
];

export function SiteHeader({ daysLeft }: { daysLeft?: number } = {}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname.startsWith("/sesi");
    if (href === "/event") return pathname === "/event";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <BrandMark className="size-8" />
          <span className="font-heading leading-tight font-semibold">
            Ruang Fisio
            <span className="text-[var(--brand-cyan)]">.run</span>
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                isActive(item.href)
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {typeof daysLeft === "number" ? (
            <Badge variant="outline" className="hidden gap-1.5 sm:inline-flex">
              <CalendarClock className="size-3" />
              {daysLeft} hari ke GTR Ultra
            </Badge>
          ) : null}
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="flex flex-col border-t border-foreground/10 bg-background px-4 pb-4 pt-2 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
