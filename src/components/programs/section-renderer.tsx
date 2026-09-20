import { AlertTriangle, Info } from "lucide-react";

import type { Section } from "@/data/programs";
import { cn } from "@/lib/utils";

export function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-5">
      {sections.map((section, index) => (
        <section
          key={`${section.type}-${index}`}
          className={cn(index > 0 && "border-t border-foreground/10 pt-5")}
        >
          <SectionBlock section={section} />
        </section>
      ))}
    </div>
  );
}

function SectionBlock({ section }: { section: Section }) {
  switch (section.type) {
    case "text":
      return (
        <div className="space-y-2">
          {section.heading ? <SectionHeading>{section.heading}</SectionHeading> : null}
          <p className="text-sm leading-relaxed text-muted-foreground">{section.body}</p>
        </div>
      );
    case "list":
      return (
        <div className="space-y-2.5">
          {section.heading ? <SectionHeading>{section.heading}</SectionHeading> : null}
          <ul className="space-y-2">
            {section.items.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--brand-cyan)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {section.note ? <p className="text-[12.5px] text-muted-foreground/80">{section.note}</p> : null}
        </div>
      );
    case "steps": {
      const single = section.items.length === 1;
      return (
        <div className="space-y-2.5">
          {section.heading ? <SectionHeading>{section.heading}</SectionHeading> : null}
          {section.note ? <p className="text-[12.5px] text-muted-foreground/80">{section.note}</p> : null}
          <ol className="space-y-2">
            {section.items.map((item, index) => (
              <li
                key={`${item.name}-${index}`}
                className={cn(
                  "rounded-xl bg-secondary/80 px-3 py-2.5",
                  single ? "" : "grid grid-cols-[24px_1fr] gap-2.5",
                )}
              >
                {!single ? (
                  <span className="grid size-6 place-items-center rounded-full bg-background text-xs font-semibold text-[var(--brand-teal)] tabular-nums">
                    {index + 1}
                  </span>
                ) : null}
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs font-semibold text-[var(--brand-teal)] tabular-nums whitespace-nowrap">
                      {item.dose}
                    </p>
                  </div>
                  <p className="mt-0.5 text-[13px] text-muted-foreground">{item.cue}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    }
    case "table":
      return (
        <div className="space-y-2.5">
          {section.heading ? <SectionHeading>{section.heading}</SectionHeading> : null}
          {section.note ? <p className="text-[12.5px] text-muted-foreground/80">{section.note}</p> : null}
          <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
            <table className="w-full min-w-[320px] border-collapse text-[12.5px] tabular-nums">
              <thead>
                <tr className="bg-muted">
                  {section.columns.map((column) => (
                    <th
                      key={column}
                      className="px-2.5 py-2 text-left text-[11px] font-semibold tracking-wide text-muted-foreground uppercase"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-foreground/10">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`${rowIndex}-${cellIndex}`}
                        className={cn(
                          "px-2.5 py-2 align-top text-muted-foreground",
                          cellIndex === 0 && "font-semibold whitespace-nowrap text-[var(--brand-teal)]",
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case "callout": {
      const warn = section.tone === "warn";
      const Icon = warn ? AlertTriangle : Info;
      return (
        <div
          className={cn(
            "grid grid-cols-[18px_1fr] gap-2.5 rounded-xl px-3 py-3 text-[13px]",
            warn ? "bg-[#fbeef0] text-[#7f2a32]" : "bg-[#e6f4f5] text-[#164a50]",
          )}
        >
          <Icon className="mt-0.5 size-[18px] shrink-0" />
          <p>{section.body}</p>
        </div>
      );
    }
    default:
      return null;
  }
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[15px] font-semibold text-foreground">{children}</h2>;
}
