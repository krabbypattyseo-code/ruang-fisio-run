import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { modules } from "@/content/curriculum";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-20 text-center sm:px-6">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 font-heading text-2xl font-semibold">
        Halaman ini tidak ada di kurikulum
      </h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">
        Mungkin tautannya salah ketik atau materinya sudah dipindahkan. Kembali ke jalur
        belajar dan lanjutkan dari modul yang kamu butuhkan.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link href="/" className={buttonVariants()}>
          Ke daftar modul
        </Link>
        <Link href="/glosarium" className={buttonVariants({ variant: "outline" })}>
          Buka glosarium
        </Link>
      </div>
      <div className="mt-10 text-left">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Modul yang tersedia
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {modules.map((module) => (
            <li key={module.slug}>
              <Link
                href={`/modul/${module.slug}`}
                className="text-sm text-muted-foreground hover:text-foreground hover:underline"
              >
                {module.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
