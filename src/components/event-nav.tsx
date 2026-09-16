"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/event", label: "Kesiapan" },
  { href: "/event/proyeksi", label: "Proyeksi waktu" },
  { href: "/event/rencana", label: "Rencana latihan" },
  { href: "/event/strategi", label: "Strategi hari-H" },
];

export function EventNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto rounded-xl bg-muted/60 p-1">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors ${
              isActive
                ? "bg-background font-medium text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
