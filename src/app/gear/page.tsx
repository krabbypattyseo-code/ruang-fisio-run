import type { Metadata } from "next";

import { GearCatalog } from "@/components/gear-catalog";

export const metadata: Metadata = {
  title: "Gear",
  description:
    "Inventori sepatu, jam, vest, backpack, tenda, dan aksesoris untuk latihan dan trek.",
};

export default function GearPage() {
  return (
    <div className="w-full px-4 pb-4">
      <header className="pt-4 pb-3">
        <p className="text-xs font-medium tracking-[0.16em] text-[var(--brand-cyan)] uppercase">
          Feature
        </p>
        <h1 className="mt-1 font-heading text-xl font-semibold text-[var(--brand-teal)]">Gear</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Perlengkapan yang sedang dipakai dan yang sudah retired.
        </p>
      </header>

      <GearCatalog />
    </div>
  );
}
