export type GearType = "shoes" | "watch" | "vest";
export type GearStatus = "currently-use" | "retired";

export type GearItem = {
  id: string;
  brand: string;
  nickname: string;
  type: GearType;
  status: GearStatus;
  /** Foto produk; urutan = urutan carousel di halaman detail. */
  images: string[];
  notes?: string;
};

export const gearTypeLabel: Record<GearType, string> = {
  shoes: "Shoes",
  watch: "Watch",
  vest: "Vest",
};

export const gearStatusLabel: Record<GearStatus, string> = {
  "currently-use": "Currently Use",
  retired: "Retired",
};

/**
 * Inventori gear pribadi. Tambah item baru di sini + foto di /public/gear/.
 */
export const gearItems: GearItem[] = [
  {
    id: "hoka-mach-2-skyward-blue",
    brand: "Hoka",
    nickname: "Hoka Mach 2 Skyward Blue",
    type: "shoes",
    status: "currently-use",
    images: ["/gear/hoka-mach-2-skyward-blue-1.jpg"],
    notes: "Sepatu road yang sedang dipakai untuk sesi Jakarta.",
  },
];

export function getGear(id: string) {
  return gearItems.find((item) => item.id === id);
}
