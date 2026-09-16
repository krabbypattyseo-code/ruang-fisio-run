"use client";

import Link from "next/link";
import { CircleAlert, RefreshCw } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-20 text-center sm:px-6">
      <span className="mx-auto grid size-11 place-items-center rounded-full bg-destructive/10 text-destructive">
        <CircleAlert className="size-5" />
      </span>
      <h1 className="mt-4 font-heading text-2xl font-semibold">
        Ada yang gagal dimuat di halaman ini
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        Progres belajarmu tetap aman karena tersimpan di peramban. Coba muat ulang bagian
        ini, atau kembali ke daftar modul.
      </p>
      {error.digest ? (
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          Kode kesalahan: {error.digest}
        </p>
      ) : null}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Button onClick={reset}>
          <RefreshCw data-icon="inline-start" className="size-4" />
          Coba lagi
        </Button>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Ke daftar modul
        </Link>
      </div>
    </div>
  );
}
