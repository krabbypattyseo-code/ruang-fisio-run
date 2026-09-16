"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { gtrUltra } from "@/data/event";

const base = `/event/${gtrUltra.slug}`;

const items = [
  { href: base, label: "Kesiapan" },
  { href: `${base}/proyeksi`, label: "Proyeksi" },
  { href: `${base}/rencana`, label: "Rencana" },
  { href: `${base}/strategi`, label: "Strategi" },
];

export function EventNav() {
  const pathname = usePathname();

  return (
    <nav className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-0.5">
      <div className="flex min-w-max gap-1 rounded-xl bg-muted/60 p-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                isActive
                  ? "bg-background font-medium text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
