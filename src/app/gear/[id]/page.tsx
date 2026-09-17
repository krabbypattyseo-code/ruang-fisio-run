import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { GearCarousel } from "@/components/gear-carousel";
import { Badge } from "@/components/ui/badge";
import {
  gearItems,
  gearStatusLabel,
  gearTypeLabel,
  getGear,
} from "@/data/gear";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return gearItems.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getGear(id);
  if (!item) return { title: "Gear" };
  return {
    title: item.nickname,
    description: `${item.brand} · ${gearTypeLabel[item.type]} · ${gearStatusLabel[item.status]}`,
  };
}

export default async function GearDetailPage({ params }: PageProps) {
  const { id } = await params;
  const item = getGear(id);
  if (!item) notFound();

  return (
    <div className="w-full pb-4">
      <div className="px-4 pt-3">
        <Link
          href="/gear"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Gear
        </Link>
      </div>

      <div className="mt-3">
        <GearCarousel item={item} />
      </div>

      <div className="space-y-3 px-4 pt-4">
        <Badge
          variant={item.status === "currently-use" ? "default" : "secondary"}
          className="rounded-full px-2.5 py-0.5 text-[11px]"
        >
          {gearStatusLabel[item.status]}
        </Badge>

        <div>
          <p className="text-xs font-medium tracking-wide text-[var(--brand-cyan)] uppercase">
            {item.brand} · {gearTypeLabel[item.type]}
          </p>
          <h1 className="mt-1 font-heading text-2xl leading-tight font-semibold text-[var(--brand-teal)]">
            {item.nickname}
          </h1>
        </div>

        {item.notes ? (
          <p className="text-sm leading-relaxed text-muted-foreground">{item.notes}</p>
        ) : null}
      </div>
    </div>
  );
}
