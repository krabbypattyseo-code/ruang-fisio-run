import type { Metadata } from "next";

import { GlossaryBrowser } from "@/components/glossary-browser";
import { glossary } from "@/content/glossary";

export const metadata: Metadata = {
  title: "Glosarium istilah SEO",
  description: `${glossary.length} istilah SEO yang paling sering muncul, dijelaskan singkat dalam bahasa Indonesia.`,
};

export default function GlosariumPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
          Glosarium istilah SEO
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Referensi cepat untuk istilah yang muncul di seluruh modul. Cari dengan kata kunci
          atau saring berdasarkan kategori.
        </p>
      </header>

      <GlossaryBrowser />
    </div>
  );
}
