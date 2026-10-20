"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { GearItem } from "@/data/gear";
import { cn } from "@/lib/utils";

export function GearCarousel({ item }: { item: GearItem }) {
  const images = item.images.length ? item.images : ["/gear/hoka-mach-2-skyward-blue-1.webp"];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || images.length < 2) return;

    const syncIndex = () => {
      const width = el.clientWidth || 1;
      const next = Math.round(el.scrollLeft / width);
      setIndex(Math.max(0, Math.min(images.length - 1, next)));
    };

    el.addEventListener("scroll", syncIndex, { passive: true });
    syncIndex();
    return () => el.removeEventListener("scroll", syncIndex);
  }, [images.length]);

  const goTo = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    setIndex(i);
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className={cn(
          "flex aspect-[4/5] w-full snap-x snap-mandatory overflow-x-auto bg-muted",
          "scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          images.length > 1 && "touch-pan-x",
        )}
        style={{ WebkitOverflowScrolling: "touch" }}
        aria-roledescription="carousel"
        aria-label={`Foto ${item.nickname}`}
      >
        {images.map((src, i) => (
          <div key={src} className="relative aspect-[4/5] w-full shrink-0 snap-center snap-always">
            <Image
              src={src}
              alt={`${item.nickname} — foto ${i + 1}`}
              fill
              priority={i === 0}
              unoptimized
              className="pointer-events-none object-cover"
              sizes="390px"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {images.length > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/40 px-3 py-2 backdrop-blur-sm">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Foto ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  i === index ? "w-5 bg-white" : "w-2.5 bg-white/55",
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
