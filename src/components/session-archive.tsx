"use client";

import { useState } from "react";

import { SessionTable } from "@/components/session-table";
import { Button } from "@/components/ui/button";
import type { Session } from "@/data/types";

const PAGE_SIZE = 15;

/**
 * Arsip dimuat bertahap supaya dashboard tidak jadi gulungan tanpa ujung.
 * Pemanggil memberi `key` dari state filter agar hitungan kembali ke halaman pertama.
 */
export function SessionArchive({ sessions }: { sessions: Session[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  const shown = sessions.slice(0, visible);
  const remaining = sessions.length - shown.length;

  return (
    <div className="space-y-4">
      <SessionTable sessions={shown} />
      {remaining > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setVisible((current) => current + PAGE_SIZE)}
          >
            Tampilkan {Math.min(PAGE_SIZE, remaining)} sesi lagi
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setVisible(sessions.length)}>
            Tampilkan semua ({remaining} tersisa)
          </Button>
        </div>
      ) : null}
    </div>
  );
}
