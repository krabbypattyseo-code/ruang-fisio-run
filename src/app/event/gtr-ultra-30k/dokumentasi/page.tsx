import type { Metadata } from "next";

import { EventDocGallery } from "@/components/event-doc-gallery";
import { gtrUltraDocs } from "@/data/gtr-ultra-docs";

export const metadata: Metadata = {
  title: "Dokumentasi GTR Ultra 30K",
  description:
    "Foto dokumentasi GTR Ultra 30K bib 3042 Harist — dari ambil bib sampai di jalur malam.",
};

export default function DokumentasiPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading text-lg font-semibold">Dokumentasi</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {gtrUltraDocs.photos.length} foto · bib {gtrUltraDocs.bib} · {gtrUltraDocs.runner}.{" "}
          Dari ambil bib di D&apos;Emmerick sampai di jalur malam.
        </p>
      </div>

      <EventDocGallery />
    </div>
  );
}
