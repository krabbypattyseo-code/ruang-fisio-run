import Link from "next/link";

import { gtrUltra } from "@/data/event";
import { dataRange, sessions } from "@/data/sessions";
import { formatDate } from "@/lib/format";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-foreground/10 bg-muted/40">
      <div className="space-y-5 px-4 py-7">
        <div>
          <p className="font-heading text-sm font-semibold">Ruang Fisio Run</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Dashboard latihan pribadi menuju {gtrUltra.name} {gtrUltra.category}.{" "}
            {sessions.length} sesi dari Garmin + COROS · {formatDate(dataRange.from)} –{" "}
            {formatDate(dataRange.to)}. Tidak ada sesi di luar ekspor itu.
          </p>
        </div>
        <div>
          <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            Layar
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
            {[
              { href: "/", label: "Home" },
              { href: "/dashboard", label: "Dashboard" },
              { href: "/event", label: "Kesiapan" },
              { href: "/event/proyeksi", label: "Proyeksi" },
              { href: "/event/rencana", label: "Rencana" },
              { href: "/event/strategi", label: "Strategi" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          Frame 390px seperti Ruang Fisio Pasien · #005A64 / #139CAB · Kind Sans menunggu
          lisensi web.
        </p>
      </div>
    </footer>
  );
}
