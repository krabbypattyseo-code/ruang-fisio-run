import Link from "next/link";

import { gtrUltra } from "@/data/event";
import { dataRange, sessions } from "@/data/sessions";
import { formatDate } from "@/lib/format";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-foreground/10 bg-muted/30">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <p className="font-heading font-semibold">Ruang Fisio Run</p>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Dashboard latihan pribadi menuju {gtrUltra.name} {gtrUltra.category}. Isinya{" "}
            {sessions.length} sesi contoh dari {formatDate(dataRange.from, "long")} sampai{" "}
            {formatDate(dataRange.to, "long")}, siap diganti dengan hasil ekspor Garmin.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Layar
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { href: "/", label: "Dashboard latihan" },
              { href: "/event", label: "Kesiapan lomba" },
              { href: "/event/proyeksi", label: "Proyeksi waktu" },
              { href: "/event/rencana", label: "Rencana latihan" },
              { href: "/event/strategi", label: "Strategi hari-H" },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Catatan aset
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Warna: #005A64 teal utama, #139CAB cyan aksen.</li>
            <li>Font Kind Sans belum bisa dipakai di web karena lisensi demo.</li>
            <li>Mark pintu-pelari masih placeholder, menunggu SVG resmi.</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
