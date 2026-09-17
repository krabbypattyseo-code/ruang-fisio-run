"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { gtrUltra } from "@/data/event";

type NavNode = {
  href: string;
  label: string;
  children?: NavNode[];
};

const gtrBase = `/event/${gtrUltra.slug}`;

const navTree: NavNode[] = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  {
    href: "/event",
    label: "Event",
    children: [
      {
        href: gtrBase,
        label: `${gtrUltra.name} ${gtrUltra.category}`,
        children: [
          { href: `${gtrBase}/proyeksi`, label: "Proyeksi" },
          { href: `${gtrBase}/rencana`, label: "Rencana" },
          { href: `${gtrBase}/strategi`, label: "Strategi" },
        ],
      },
    ],
  },
  { href: "/gear", label: "Gear" },
];

function pathMatches(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/dashboard") return pathname === "/dashboard" || pathname.startsWith("/sesi");
  if (href === "/event") return pathname === "/event" || pathname.startsWith("/event/");
  if (href === "/gear") return pathname === "/gear" || pathname.startsWith("/gear/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavBranch({
  node,
  depth,
  pathname,
  onNavigate,
}: {
  node: NavNode;
  depth: number;
  pathname: string;
  onNavigate: () => void;
}) {
  const hasChildren = Boolean(node.children?.length);
  const branchActive = pathMatches(pathname, node.href);
  const selfActive =
    pathname === node.href ||
    (node.href === "/dashboard" && (pathname === "/dashboard" || pathname.startsWith("/sesi"))) ||
    (node.href === "/gear" && (pathname === "/gear" || pathname.startsWith("/gear/")));
  const [open, setOpen] = useState(branchActive);

  return (
    <div>
      <div
        className="flex items-center gap-1"
        style={{ paddingLeft: depth === 0 ? 0 : depth * 12 }}
      >
        <Link
          href={node.href}
          onClick={onNavigate}
          className={`min-w-0 flex-1 rounded-lg px-2 py-2 text-sm transition-colors ${
            selfActive && !hasChildren
              ? "bg-muted font-medium text-foreground"
              : selfActive && hasChildren && pathname === node.href
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {node.label}
        </Link>
        {hasChildren ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={open ? `Tutup ${node.label}` : `Buka ${node.label}`}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </Button>
        ) : null}
      </div>
      {hasChildren && open ? (
        <div className="mt-0.5 space-y-0.5 border-l border-foreground/10 ml-3">
          {node.children!.map((child) => (
            <NavBranch
              key={child.href}
              node={child}
              depth={depth + 1}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="z-40 shrink-0 border-b border-foreground/10 bg-background">
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
        <nav className="flex flex-col gap-0.5 border-t border-foreground/10 bg-background px-3 pb-3 pt-2">
          {navTree.map((node) => (
            <NavBranch
              key={node.href}
              node={node}
              depth={0}
              pathname={pathname}
              onNavigate={() => setMenuOpen(false)}
            />
          ))}
        </nav>
      ) : null}
    </header>
  );
}
