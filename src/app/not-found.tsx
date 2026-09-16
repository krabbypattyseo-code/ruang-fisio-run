import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { sessions } from "@/data/sessions";
import { formatDate, formatNumber } from "@/lib/format";

export default function NotFound() {
  const recent = sessions.slice(0, 4);

  return (
    <div className="w-full px-4 py-16 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 font-heading text-2xl font-semibold">
        Halaman atau sesi ini tidak ada
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        Mungkin tautannya salah ketik, atau sesi itu belum masuk ke arsip. Kembali ke
        dashboard dan pakai filter untuk menemukan sesi yang kamu cari.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Ke home
        </Link>
        <Link href="/dashboard" className={buttonVariants()}>
          Ke dashboard
        </Link>
        <Link href="/event" className={buttonVariants({ variant: "outline" })}>
          Kesiapan GTR Ultra
        </Link>
      </div>
      <div className="mt-10 text-left">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Sesi terbaru
        </p>
        <ul className="mt-3 space-y-2">
          {recent.map((session) => (
            <li key={session.id}>
              <Link
                href={`/sesi/${session.id}`}
                className="text-sm text-muted-foreground hover:text-foreground hover:underline"
              >
                {formatDate(session.date)} · {session.title} ·{" "}
                {formatNumber(session.distanceKm)} km
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
