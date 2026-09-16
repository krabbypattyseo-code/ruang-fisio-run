import { Info, Lightbulb, TriangleAlert } from "lucide-react";

import type { ContentBlock } from "@/content/types";

const calloutStyles = {
  tip: {
    icon: Lightbulb,
    wrapper: "border-primary/25 bg-primary/5",
    iconColor: "text-primary",
  },
  warning: {
    icon: TriangleAlert,
    wrapper: "border-amber-500/30 bg-amber-500/5",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  info: {
    icon: Info,
    wrapper: "border-foreground/15 bg-muted/60",
    iconColor: "text-muted-foreground",
  },
} as const;

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-8 font-heading text-lg font-semibold first:mt-0">{block.text}</h2>
      );

    case "paragraph":
      return <p className="text-[0.95rem] leading-relaxed text-foreground/85">{block.text}</p>;

    case "list": {
      const items = block.items.map((item, index) => (
        <li key={item} className="flex gap-2.5 leading-relaxed">
          {block.ordered ? (
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-[0.7rem] font-medium text-primary tabular-nums">
              {index + 1}
            </span>
          ) : (
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" />
          )}
          <span className="text-[0.95rem] text-foreground/85">{item}</span>
        </li>
      ));
      return <ul className="space-y-2">{items}</ul>;
    }

    case "callout": {
      const style = calloutStyles[block.variant];
      const Icon = style.icon;
      return (
        <div className={`rounded-xl border px-4 py-3.5 ${style.wrapper}`}>
          <p className="flex items-center gap-2 font-heading text-sm font-medium">
            <Icon className={`size-4 shrink-0 ${style.iconColor}`} />
            {block.title}
          </p>
          <p className="mt-1.5 text-[0.9rem] leading-relaxed text-foreground/80">
            {block.text}
          </p>
        </div>
      );
    }

    case "code":
      return (
        <figure className="overflow-hidden rounded-xl bg-foreground/[0.04] ring-1 ring-foreground/10">
          <figcaption className="border-b border-foreground/10 px-4 py-2 text-xs font-medium text-muted-foreground">
            {block.label}
          </figcaption>
          <pre className="overflow-x-auto px-4 py-3 font-mono text-[0.8rem] leading-relaxed">
            <code>{block.code}</code>
          </pre>
        </figure>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-xl ring-1 ring-foreground/10">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-muted/60">
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} className="px-3 py-2.5 font-heading text-xs font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="border-t border-foreground/10">
                  {row.map((cell) => (
                    <td key={cell} className="px-3 py-2.5 align-top text-foreground/85">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function LessonBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}
