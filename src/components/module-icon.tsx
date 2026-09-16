import {
  Compass,
  FileText,
  LineChart,
  PenLine,
  Search,
  Wrench,
  type LucideProps,
} from "lucide-react";

import type { Module } from "@/content/types";

const icons: Record<Module["icon"], React.ComponentType<LucideProps>> = {
  Compass,
  Search,
  FileText,
  Wrench,
  PenLine,
  LineChart,
};

export function ModuleIcon({
  name,
  ...props
}: { name: Module["icon"] } & LucideProps) {
  const Icon = icons[name] ?? Compass;
  return <Icon {...props} />;
}
