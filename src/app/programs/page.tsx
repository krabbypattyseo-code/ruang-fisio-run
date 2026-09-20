import type { Metadata } from "next";
import Link from "next/link";

import { CategoryCard } from "@/components/programs/program-cards";
import { ReviewerProfile } from "@/components/programs/reviewer-profile";
import { programsContent } from "@/data/programs";

export const metadata: Metadata = {
  title: programsContent.page.title,
  description: programsContent.page.description,
};

export default function ProgramsPage() {
  const { page, reviewer, categories, sources } = programsContent;

  return (
    <div className="w-full px-4 pb-6">
      <header className="pt-4 pb-3">
        <p className="text-xs font-medium tracking-[0.16em] text-[var(--brand-cyan)] uppercase">
          {page.eyebrow}
        </p>
        <h1 className="mt-1 font-heading text-xl font-semibold text-[var(--brand-teal)]">
          {page.title}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{page.description}</p>
      </header>

      <div className="space-y-4">
        <ReviewerProfile reviewer={reviewer} />

        <ul className="space-y-2.5">
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryCard
                title={category.title}
                description={category.description}
                href={`/programs/${category.id}`}
                review={category.review}
                icon={category.id}
              />
            </li>
          ))}
        </ul>

        <div className="space-y-1.5 pt-2 text-[11.5px] text-muted-foreground">
          <p className="font-semibold text-foreground/70">Sumber</p>
          {sources.map((source) => (
            <p key={source}>{source}</p>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground hover:underline">
            Kembali ke Home
          </Link>
        </p>
      </div>
    </div>
  );
}
