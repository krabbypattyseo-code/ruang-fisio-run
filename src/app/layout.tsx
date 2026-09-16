import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/sonner";
import { ProgressProvider } from "@/lib/progress";

import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SEO Learner — Belajar SEO dari dasar sampai bisa dipraktikkan",
    template: "%s | SEO Learner",
  },
  description:
    "Kurikulum SEO berbahasa Indonesia dalam 6 modul: fondasi, riset kata kunci, on-page, teknis, konten, dan analitik. Lengkap dengan kuis dan pelacak progres.",
  keywords: [
    "belajar seo",
    "kursus seo bahasa indonesia",
    "riset kata kunci",
    "seo on-page",
    "seo teknis",
    "core web vitals",
  ],
  openGraph: {
    title: "SEO Learner — Belajar SEO dari dasar sampai bisa dipraktikkan",
    description:
      "Enam modul, 19 pelajaran, dan kuis per modul untuk belajar SEO secara terstruktur dalam bahasa Indonesia.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background">
        <ProgressProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Toaster position="bottom-right" />
        </ProgressProvider>
      </body>
    </html>
  );
}
