import Link from "next/link";

import { modules } from "@/content/curriculum";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10 bg-muted/30">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-heading font-semibold">SEO Learner</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Kurikulum SEO berbahasa Indonesia yang bisa kamu selesaikan sendiri. Progres
            belajar disimpan di peramban ini, tanpa akun dan tanpa server.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Modul
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {modules.map((module) => (
              <li key={module.slug}>
                <Link
                  href={`/modul/${module.slug}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {module.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Lainnya
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/glosarium" className="text-muted-foreground hover:text-foreground">
                Glosarium istilah SEO
              </Link>
            </li>
            <li>
              <Link href="/progres" className="text-muted-foreground hover:text-foreground">
                Ringkasan progres
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
