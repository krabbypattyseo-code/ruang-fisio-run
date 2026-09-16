"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { glossary, glossaryCategories } from "@/content/glossary";

export function GlossaryBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] =
    useState<(typeof glossaryCategories)[number]>("Semua");

  const entries = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return glossary
      .filter((entry) => category === "Semua" || entry.category === category)
      .filter(
        (entry) =>
          !needle ||
          entry.term.toLowerCase().includes(needle) ||
          entry.definition.toLowerCase().includes(needle),
      )
      .sort((a, b) => a.term.localeCompare(b.term, "id"));
  }, [query, category]);

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari istilah, misalnya: kanonik, CLS, anchor"
            aria-label="Cari istilah SEO"
            className="h-10 pl-9"
          />
          {query ? (
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Hapus pencarian"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-1.5 -translate-y-1/2"
            >
              <X />
            </Button>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {glossaryCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-4xl px-2.5 py-1 text-xs font-medium transition-colors ${
                category === item
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground tabular-nums">
        {entries.length} istilah ditampilkan dari {glossary.length} total
      </p>

      {entries.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-10 text-center">
            <p className="font-heading font-medium">Tidak ada istilah yang cocok</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Coba kata kunci yang lebih pendek, atau kembalikan filter kategori ke
              &ldquo;Semua&rdquo;.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setQuery("");
                setCategory("Semua");
              }}
            >
              Reset pencarian
            </Button>
          </CardContent>
        </Card>
      ) : (
        <dl className="grid gap-3 sm:grid-cols-2">
          {entries.map((entry) => (
            <Card key={entry.term} size="sm">
              <CardContent>
                <div className="flex items-start justify-between gap-2">
                  <dt className="font-heading text-sm font-semibold">{entry.term}</dt>
                  <Badge variant="outline">{entry.category}</Badge>
                </div>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {entry.definition}
                </dd>
              </CardContent>
            </Card>
          ))}
        </dl>
      )}
    </div>
  );
}
