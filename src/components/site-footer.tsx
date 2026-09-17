import { gtrUltra } from "@/data/event";
import { dataRange, sessions } from "@/data/sessions";
import { formatDate } from "@/lib/format";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-foreground/10 bg-muted/40">
      <div className="space-y-3 px-4 py-5 pb-3">
        <div>
          <p className="font-heading text-sm font-semibold">Ruang Fisio Run</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Dashboard latihan pribadi menuju {gtrUltra.name} {gtrUltra.category}.{" "}
            {sessions.length} sesi dari Garmin + COROS · {formatDate(dataRange.from)} –{" "}
            {formatDate(dataRange.to)}. Tidak ada sesi di luar ekspor itu.
          </p>
        </div>
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          Frame 390px · navigasi bawah Home / Dashboard / Event · #005A64 / #139CAB.
        </p>
      </div>
    </footer>
  );
}
