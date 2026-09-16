"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/event", label: "GTR Ultra 30K" },
  { href: "/event/proyeksi", label: "Proyeksi" },
  { href: "/event/rencana", label: "Rencana" },
  { href: "/event/strategi", label: "Strategi" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" || pathname.startsWith("/sesi");
    if (href === "/event") return pathname === "/event";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/95 backdrop-blur">
      <div className="flex h-12 items-center gap-2 px-3">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <BrandMark className="size-7 shrink-0" />
          <span className="truncate font-heading text-sm leading-tight font-semibold">
            Ruang Fisio
            <span className="text-[var(--brand-cyan)]">.run</span>
          </span>
        </Link>

        <Button
          variant="ghost"
          size="icon-sm"
          className="ml-auto"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {menuOpen ? (
        <nav className="flex flex-col border-t border-foreground/10 bg-background px-3 pb-3 pt-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-2 py-2 text-sm transition-colors ${
                isActive(item.href)
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
