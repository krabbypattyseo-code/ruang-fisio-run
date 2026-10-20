"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import {
  docPhaseLabel,
  gtrUltraDocs,
  type DocPhoto,
} from "@/data/gtr-ultra-docs";
import { cn } from "@/lib/utils";

function groupByPhase(photos: DocPhoto[]) {
  const order: DocPhoto["phase"][] = ["pra-start", "di-jalur", "sesudah"];
  return order
    .map((phase) => ({
      phase,
      label: docPhaseLabel[phase],
      photos: photos.filter((photo) => photo.phase === phase),
    }))
    .filter((group) => group.photos.length > 0);
}

export function EventDocGallery() {
  const groups = groupByPhase(gtrUltraDocs.photos);
  const [active, setActive] = useState<DocPhoto | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      <div className="space-y-7">
        {groups.map((group) => (
          <section key={group.phase} className="space-y-3">
            <h2 className="font-heading text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              {group.label}
            </h2>
            <ul className="space-y-4">
              {group.photos.map((photo) => (
                <li key={photo.id}>
                  <button
                    type="button"
                    onClick={() => setActive(photo)}
                    className="group block w-full text-left"
                    aria-label={`Perbesar: ${photo.caption}`}
                  >
                    <figure className="overflow-hidden rounded-2xl ring-1 ring-foreground/10">
                      <div
                        className="relative w-full bg-muted"
                        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          unoptimized
                          sizes="390px"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02] group-active:scale-[1.01]"
                        />
                      </div>
                      <figcaption className="border-t border-foreground/8 bg-background px-3.5 py-2.5 text-sm leading-snug text-foreground">
                        {photo.caption}
                      </figcaption>
                    </figure>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {active ? <DocLightbox photo={active} onClose={() => setActive(null)} /> : null}
    </>
  );
}

function DocLightbox({ photo, onClose }: { photo: DocPhoto; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-3 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
        aria-label="Tutup"
      >
        <X className="size-5" />
      </button>
      <figure
        className="relative max-h-[90dvh] w-full max-w-[390px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={cn("relative w-full overflow-hidden rounded-2xl bg-black")}
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            unoptimized
            priority
            sizes="390px"
            className="object-contain"
          />
        </div>
        <figcaption className="mt-3 px-1 text-center text-sm text-white/90">
          {photo.caption}
        </figcaption>
      </figure>
    </div>
  );
}
