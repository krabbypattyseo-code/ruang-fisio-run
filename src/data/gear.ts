export type GearType =
  | "shoes"
  | "watch"
  | "vest"
  | "backpack"
  | "tent"
  | "powerbank"
  | "accessory";

export type GearStatus = "currently-use" | "retired";

export type GearShop = {
  id: "shopee" | "tiktok";
  label: string;
  /** URL produk / toko. Kosong = tombol tampil tapi disabled. */
  url: string;
};

export type GearItem = {
  id: string;
  brand: string;
  nickname: string;
  type: GearType;
  status: GearStatus;
  /** Foto produk; urutan = urutan carousel di halaman detail. */
  images: string[];
  notes?: string;
  /** Harga tampilan di product nav, contoh "Rp 1.899.000". */
  price?: string;
  /** Link belanja (Shopee / TikTok). Dipakai di "Check Shop". */
  shops?: GearShop[];
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
 * price + shops opsional — mengisi keduanya mengaktifkan blok harga di product nav.
 */
export const gearItems: GearItem[] = [
  {
    id: "hoka-mach-2-skyward-blue",
    brand: "Hoka",
    nickname: "Hoka Mach X2 Skyward Blue",
    type: "shoes",
    status: "currently-use",
    images: ["/gear/hoka-mach-2-skyward-blue-1.webp"],
    notes: "Sepatu road yang sedang dipakai untuk sesi Jakarta.",
    price: "Rp 2.499.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "https://atid.me/go/yYbV4hMl" },
      { id: "tiktok", label: "TikTok", url: "https://atid.me/go/51Kt1YZR" },
    ],
  },
  {
    id: "coros-pace",
    brand: "COROS",
    nickname: "COROS Pace",
    type: "watch",
    status: "currently-use",
    images: ["/gear/coros-pace-1.webp"],
    notes: "Jam utama untuk track jarak, pace, dan rute lari.",
    price: "Rp 3.199.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "" },
      { id: "tiktok", label: "TikTok", url: "" },
    ],
  },
  {
    id: "garmin-forerunner",
    brand: "Garmin",
    nickname: "Garmin Forerunner 165",
    type: "watch",
    status: "currently-use",
    images: ["/gear/garmin-forerunner-1.webp"],
    notes: "Pantau kebugaran (VO2 Max) dan metrik recovery.",
    price: "Rp 2.850.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "https://atid.me/go/clEWjoYk" },
      { id: "tiktok", label: "TikTok", url: "https://atid.me/go/TDof1Lka" },
    ],
  },
  {
    id: "forclaz-trek-pack",
    brand: "Forclaz",
    nickname: "Forclaz Trek Pack",
    type: "backpack",
    status: "currently-use",
    images: ["/gear/forclaz-trek-pack-1.webp"],
    notes: "Carrier multi-day untuk trek dan hiking panjang.",
    price: "Rp 1.299.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "" },
      { id: "tiktok", label: "TikTok", url: "" },
    ],
  },
  {
    id: "torch-daypack",
    brand: "Torch",
    nickname: "Torch Daypack",
    type: "backpack",
    status: "currently-use",
    images: ["/gear/torch-daypack-1.webp"],
    notes: "Daypack ringan untuk jalan kaki dan aktivitas harian.",
    price: "Rp 349.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "" },
      { id: "tiktok", label: "TikTok", url: "" },
    ],
  },
  {
    id: "trail-hiking-pack",
    brand: "Trail",
    nickname: "Hiking Pack",
    type: "backpack",
    status: "currently-use",
    images: ["/gear/trail-daypack-1.webp", "/gear/city-daypack-bottle-1.webp"],
    notes: "Pack trail untuk hiking berkabut dan jalan kota.",
    price: "Rp 459.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "" },
      { id: "tiktok", label: "TikTok", url: "" },
    ],
  },
  {
    id: "life-vest-travel",
    brand: "Boevboo",
    nickname: "Life Vest Travel",
    type: "vest",
    status: "currently-use",
    images: ["/gear/life-vest-hat-1.webp"],
    notes: "Vest apung untuk aktivitas air; sering dipasangkan dengan topi trek.",
    price: "Rp 289.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "" },
      { id: "tiktok", label: "TikTok", url: "" },
    ],
  },
  {
    id: "quechua-camp-tent",
    brand: "Quechua",
    nickname: "Quechua Camp Tent",
    type: "tent",
    status: "currently-use",
    images: ["/gear/quechua-camp-tent-1.webp"],
    notes: "Tenda camping untuk basecamp dan overnight trek.",
    price: "Rp 1.899.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "" },
      { id: "tiktok", label: "TikTok", url: "" },
    ],
  },
  {
    id: "cuktech-15",
    brand: "CUKTECH",
    nickname: "CUKTECH 15 20000mAh",
    type: "powerbank",
    status: "currently-use",
    images: ["/gear/cuktech-15-1.webp"],
    notes: "Powerbank 150W max — andalan charge jam dan HP di perjalanan.",
    price: "Rp 979.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "https://atid.me/go/RFDtBg1U" },
      { id: "tiktok", label: "TikTok", url: "https://atid.me/go/IDKfKJz1" },
    ],
  },
  {
    id: "onpoint-breeze-wipe",
    brand: "Onpoint",
    nickname: "Breeze Cooling Sports Wipe",
    type: "accessory",
    status: "currently-use",
    images: ["/gear/onpoint-breeze-wipe-1.webp"],
    notes: "Wet wipe cooling mint untuk recovery setelah sesi.",
    price: "Rp 15.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "" },
      { id: "tiktok", label: "TikTok", url: "" },
    ],
  },
  {
    id: "kiprun-running-belt",
    brand: "KIPRUN",
    nickname: "KIPRUN Running Belt Hidrasi",
    type: "accessory",
    status: "currently-use",
    images: ["/gear/kiprun-running-belt-1.webp"],
    notes: "Belt hidrasi marathon Decathlon KIPRUN — softflask siap di pinggang.",
    price: "Rp 280.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "https://atid.me/go/LchaDzO1" },
      { id: "tiktok", label: "TikTok", url: "https://atid.me/go/YOs0qAd1" },
    ],
  },
  {
    id: "prolink-mifi",
    brand: "Prolink",
    nickname: "Prolink MiFi Hotspot 4G LTE",
    type: "accessory",
    status: "currently-use",
    images: ["/gear/prolink-mifi-1.webp"],
    notes: "Modem WiFi hotspot 4G LTE unlock all operator — cadangan internet di trail dan travel.",
    price: "Rp 799.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "https://atid.me/go/tZqLiaSc" },
      { id: "tiktok", label: "TikTok", url: "https://atid.me/go/U9EqkJbm" },
    ],
  },
  {
    id: "ej-sport-orange",
    brand: "EJ Sport",
    nickname: "EJ Sport Orange 2 Pack",
    type: "accessory",
    status: "currently-use",
    images: ["/gear/ej-sport-orange-1.webp"],
    notes: "Gel energi orange (L-Carnitine + BCAA) — before & during sport, isi 5 sachet.",
    price: "Rp 168.300",
    shops: [
      { id: "shopee", label: "Shopee", url: "https://atid.me/go/XYuhXW1v" },
      { id: "tiktok", label: "TikTok", url: "https://atid.me/go/fVgb3tOk" },
    ],
  },
  {
    id: "quechua-arpenaz-1p",
    brand: "Quechua",
    nickname: "Quechua Arpenaz 1P",
    type: "tent",
    status: "currently-use",
    images: [
      "/gear/quechua-arpenaz-1p-1.webp",
      "/gear/quechua-sun-shelter-1.webp",
    ],
    notes: "Tenda kemah Decathlon Quechua Arpenaz 1P — basecamp ringan / naungan di area terbuka.",
    price: "Rp 404.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "https://atid.me/go/0z7I2X6M" },
      { id: "tiktok", label: "TikTok", url: "https://atid.me/go/VOL1aRGL" },
    ],
  },
  {
    id: "ugreen-nexode-160w",
    brand: "UGREEN",
    nickname: "UGREEN Nexode GaN Pro 160W",
    type: "accessory",
    status: "currently-use",
    images: ["/gear/ugreen-nexode-160w-1.webp"],
    notes: "Charger GaN 160W PD/QC — charge laptop, jam, dan HP sekaligus.",
    price: "Rp 1.000.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "https://atid.me/go/Al3ZjP2Y" },
      { id: "tiktok", label: "TikTok", url: "https://atid.me/go/0r4PHSs0" },
    ],
  },
  {
    id: "quechua-hiking-pole",
    brand: "Quechua",
    nickname: "Quechua Tongkat Hiking",
    type: "accessory",
    status: "currently-use",
    images: ["/gear/quechua-hiking-pole-1.webp"],
    notes: "Tongkat hiking telescopic Decathlon Quechua — penopang di tanjakan dan turunan.",
    price: "Rp 138.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "https://atid.me/go/9hy5ej5Y" },
      { id: "tiktok", label: "TikTok", url: "https://atid.me/go/FJlmkOca" },
    ],
  },
  {
    id: "greenforest-arvensis-10l",
    brand: "Greenforest",
    nickname: "Greenforest Arvensis 10L",
    type: "backpack",
    status: "currently-use",
    images: ["/gear/greenforest-arvensis-10l-1.webp"],
    notes: "Hydration pack 10L reflektif — daypack trail ringan dengan mesh depan.",
    price: "Rp 265.000",
    shops: [
      { id: "shopee", label: "Shopee", url: "https://atid.me/go/kre4yxbk" },
      { id: "tiktok", label: "TikTok", url: "https://atid.me/go/qCdUdRXY" },
    ],
  },
];

export function getGear(id: string) {
  return gearItems.find((item) => item.id === id);
}
