"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GraduationCap, Menu, X } from "lucide-react";

import { modules } from "@/content/curriculum";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProgress } from "@/lib/progress";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/glosarium", label: "Glosarium" },
  { href: "/progres", label: "Progres" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { overall, isLoaded } = useProgress();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-heading font-semibold">
          <span className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-4" />
          </span>
          SEO Learner
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
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
          {isLoaded ? (
            <Badge variant="outline" className="hidden sm:inline-flex tabular-nums">
              {overall.done}/{overall.total} pelajaran
            </Badge>
          ) : (
            <Skeleton className="hidden h-5 w-24 rounded-4xl sm:block" />
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-foreground/10 bg-background px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col">
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
          <p className="mt-3 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Modul
          </p>
          <nav className="mt-1 flex flex-col">
            {modules.map((module) => (
              <Link
                key={module.slug}
                href={`/modul/${module.slug}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {module.title}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
