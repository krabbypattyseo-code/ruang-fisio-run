import type { Metadata } from "next";

import { ProgressOverview } from "@/components/progress-overview";

export const metadata: Metadata = {
  title: "Progres belajar",
  description:
    "Rincian pelajaran yang sudah selesai dan skor kuis per modul, tersimpan di peramban kamu.",
};

export default function ProgresPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-heading text-2xl font-semibold sm:text-3xl">Progres belajar</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Semua catatan di halaman ini disimpan lokal di peramban yang kamu pakai sekarang.
          Tidak ada akun, tidak ada data yang dikirim ke server.
        </p>
      </header>

      <ProgressOverview />
    </div>
  );
}
