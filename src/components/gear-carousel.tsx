"use client";

import Image from "next/image";
import { useState } from "react";

import type { GearItem } from "@/data/gear";
import { cn } from "@/lib/utils";

export function GearCarousel({ item }: { item: GearItem }) {
  const [index, setIndex] = useState(0);
  const images = item.images.length ? item.images : ["/gear/hoka-mach-2-skyward-blue-1.jpg"];
  const current = images[Math.min(index, images.length - 1)];

  return (
    <div className="relative">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        <Image
          src={current}
          alt={`${item.nickname} — foto ${index + 1}`}
          fill
          priority
          unoptimized
          className="object-cover"
          sizes="390px"
        />
      </div>

      {images.length > 1 ? (
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1.5 backdrop-blur-sm">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Foto ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={cn(
                  "size-1.5 rounded-full transition-all",
                  i === index ? "w-3 bg-white" : "bg-white/50",
                )}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="absolute inset-x-0 bottom-3 flex justify-center">
          <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1.5">
            <span className="size-1.5 rounded-full bg-white" />
          </div>
        </div>
      )}

      {images.length > 1 ? (
        <div className="absolute inset-y-0 left-0 right-0 flex">
          <button
            type="button"
            aria-label="Foto sebelumnya"
            className="w-1/2"
            onClick={() => setIndex((value) => (value - 1 + images.length) % images.length)}
          />
          <button
            type="button"
            aria-label="Foto berikutnya"
            className="w-1/2"
            onClick={() => setIndex((value) => (value + 1) % images.length)}
          />
        </div>
      ) : null}
    </div>
  );
}
