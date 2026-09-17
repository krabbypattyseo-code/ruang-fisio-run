import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { runnerProfile } from "@/data/event";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Home — Ruang Fisio Run",
  description:
    "Welcome to my monitoring running dashboard. Buka dashboard latihan, event, atau inventori gear.",
};

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M14.2 3.2c.7 2.2 2.3 3.8 4.6 4.3v2.5c-1.6-.05-3.1-.55-4.4-1.4v6.4c0 3.3-2.6 5.8-5.9 5.8S2.6 18.3 2.6 15s2.6-5.8 5.9-5.8c.3 0 .6 0 .9.1v2.6c-.3-.1-.6-.1-.9-.1-1.8 0-3.2 1.5-3.2 3.2s1.4 3.2 3.2 3.2 3.2-1.5 3.2-3.2V3.2h2.5z" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-[linear-gradient(180deg,#f7fbfc_0%,#ffffff_42%,#eef6f7_100%)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(19,156,171,0.18),transparent_70%)]"
      />

      <div className="relative flex flex-1 flex-col px-5 pb-6 pt-8">
        <div className="mx-auto w-full max-w-[280px]">
          <div className="overflow-hidden rounded-[1.75rem] shadow-[0_12px_40px_rgba(0,90,100,0.18)] ring-1 ring-[var(--brand-teal)]/15">
            <Image
              src={runnerProfile.photoSrc}
              alt={`Foto profil ${runnerProfile.name}`}
              width={390}
              height={390}
              priority
              unoptimized
              className="aspect-square h-auto w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-[var(--brand-cyan)] uppercase">
            Ruang Fisio Run
          </p>
          <h1 className="mt-2 font-heading text-[1.65rem] leading-tight font-semibold text-[var(--brand-teal)]">
            Welcome to My Monitoring Running Dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Halo, ini adalah track record workout berlari, hiking, dan trail run yang
            terdokumentasi.
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3">
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 rounded-4xl text-base shadow-[0_8px_24px_rgba(0,90,100,0.22)]",
            )}
          >
            Dashboard Monitoring
          </Link>
          <Link
            href="/event"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-4xl border-[var(--brand-teal)]/25 bg-white/80 text-base text-[var(--brand-teal)] hover:bg-white",
            )}
          >
            Event Joined
          </Link>
          <Link
            href="/gear"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-4xl border-[var(--brand-teal)]/25 bg-white/80 text-base text-[var(--brand-teal)] hover:bg-white",
            )}
          >
            Gear
          </Link>
        </div>

        <div className="mt-auto flex items-center justify-center gap-5 pt-10">
          <a
            href={runnerProfile.socials.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="grid size-11 place-items-center rounded-full bg-white text-[var(--brand-teal)] shadow-sm ring-1 ring-foreground/10 transition-transform hover:scale-105"
          >
            <InstagramIcon className="size-5" />
          </a>
          <a
            href={runnerProfile.socials.tiktok}
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="grid size-11 place-items-center rounded-full bg-white text-[var(--brand-teal)] shadow-sm ring-1 ring-foreground/10 transition-transform hover:scale-105"
          >
            <TikTokIcon className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
