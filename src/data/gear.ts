export type GearType =
  | "shoes"
  | "watch"
  | "vest"
  | "backpack"
  | "tent"
  | "powerbank"
  | "accessory";

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
  backpack: "Backpack",
  tent: "Tent",
  powerbank: "Powerbank",
  accessory: "Accessory",
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
    images: ["/gear/hoka-mach-2-skyward-blue-1.webp"],
    notes: "Sepatu road yang sedang dipakai untuk sesi Jakarta.",
  },
  {
    id: "coros-pace",
    brand: "COROS",
    nickname: "COROS Pace",
    type: "watch",
    status: "currently-use",
    images: ["/gear/coros-pace-1.webp"],
    notes: "Jam utama untuk track jarak, pace, dan rute lari.",
  },
  {
    id: "garmin-forerunner",
    brand: "Garmin",
    nickname: "Garmin Forerunner",
    type: "watch",
    status: "currently-use",
    images: ["/gear/garmin-forerunner-1.webp"],
    notes: "Pantau kebugaran (VO2 Max) dan metrik recovery.",
  },
  {
    id: "forclaz-trek-pack",
    brand: "Forclaz",
    nickname: "Forclaz Trek Pack",
    type: "backpack",
    status: "currently-use",
    images: ["/gear/forclaz-trek-pack-1.webp"],
    notes: "Carrier multi-day untuk trek dan hiking panjang.",
  },
  {
    id: "torch-daypack",
    brand: "Torch",
    nickname: "Torch Daypack",
    type: "backpack",
    status: "currently-use",
    images: ["/gear/torch-daypack-1.webp"],
    notes: "Daypack ringan untuk jalan kaki dan aktivitas harian.",
  },
  {
    id: "trail-hiking-pack",
    brand: "Trail",
    nickname: "Hiking Pack",
    type: "backpack",
    status: "currently-use",
    images: ["/gear/trail-daypack-1.webp", "/gear/city-daypack-bottle-1.webp"],
    notes: "Pack trail untuk hiking berkabut dan jalan kota.",
  },
  {
    id: "life-vest-travel",
    brand: "Boevboo",
    nickname: "Life Vest Travel",
    type: "vest",
    status: "currently-use",
    images: ["/gear/life-vest-hat-1.webp"],
    notes: "Vest apung untuk aktivitas air; sering dipasangkan dengan topi trek.",
  },
  {
    id: "quechua-camp-tent",
    brand: "Quechua",
    nickname: "Quechua Camp Tent",
    type: "tent",
    status: "currently-use",
    images: ["/gear/quechua-camp-tent-1.webp"],
    notes: "Tenda camping untuk basecamp dan overnight trek.",
  },
  {
    id: "popup-sun-shelter",
    brand: "Quechua",
    nickname: "Pop-up Sun Shelter",
    type: "tent",
    status: "currently-use",
    images: ["/gear/quechua-sun-shelter-1.webp"],
    notes: "Shelter lipat untuk naungan di pantai atau area terbuka.",
  },
  {
    id: "cuktech-15",
    brand: "CUKTECH",
    nickname: "CUKTECH 15 20000mAh",
    type: "powerbank",
    status: "currently-use",
    images: ["/gear/cuktech-15-1.webp"],
    notes: "Powerbank 150W max — andalan charge jam dan HP di perjalanan.",
  },
  {
    id: "onpoint-breeze-wipe",
    brand: "Onpoint",
    nickname: "Breeze Cooling Sports Wipe",
    type: "accessory",
    status: "currently-use",
    images: ["/gear/onpoint-breeze-wipe-1.webp"],
    notes: "Wet wipe cooling mint untuk recovery setelah sesi.",
  },
];

export function getGear(id: string) {
  return gearItems.find((item) => item.id === id);
}
