import type { Metadata, Viewport } from "next";
import { Figtree, JetBrains_Mono } from "next/font/google";

import { AppShell } from "@/components/app-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

// Font brand Ruang Fisio adalah Kind Sans, tapi lisensinya "Demo for Personal Use"
// sehingga tidak bisa di-embed di web. Figtree dipakai sebagai pengganti sementara
// dengan karakter geometris yang mendekati.
const sans = Figtree({ variable: "--font-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Ruang Fisio Run — Dashboard latihan & persiapan GTR Ultra 30K",
    template: "%s | Ruang Fisio Run",
  },
  description:
    "Dashboard data lari pribadi: tren pace, cadence, stride, dan denyut jantung per sesi, plus kesiapan, proyeksi waktu, rencana latihan, dan strategi lomba GTR Ultra 30K.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="font-sans text-foreground">
        <AppShell>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </AppShell>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
