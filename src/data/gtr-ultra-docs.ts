/**
 * Dokumentasi foto GTR Ultra 30K (27 Sep 2026).
 * File webp di `public/event/gtr-ultra-30k/` — dioptimasi dari foto asli.
 */

export type DocPhoto = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  /** Lebar × tinggi file webp (untuk next/image). */
  width: number;
  height: number;
  phase: "pra-start" | "di-jalur" | "sesudah";
};

export const gtrUltraDocs = {
  bib: "3042",
  runner: "Harist",
  eventLabel: "GTR Ultra · Gajah Trail Run 30K",
  photos: [
    {
      id: "bib-pickup",
      src: "/event/gtr-ultra-30k/01-bib-pickup-demmerick.webp",
      alt: "Harist memegang bib 3042 di lobi D'Emmerick, layar TV menampilkan nomor yang sama",
      caption: "Ambil bib di D'Emmerick — nomor 3042",
      width: 1600,
      height: 1200,
      phase: "pra-start",
    },
    {
      id: "backdrop",
      src: "/event/gtr-ultra-30k/02-backdrop-bib-3042.webp",
      alt: "Harist memegang bib 3042 di depan backdrop GTR Ultra Gajah Run",
      caption: "Backdrop GTR Ultra Gajah Run",
      width: 1600,
      height: 1200,
      phase: "pra-start",
    },
    {
      id: "bib-closeup",
      src: "/event/gtr-ultra-30k/03-bib-closeup-3042.webp",
      alt: "Close-up bib GTR Ultra 3042 HARIST, kategori 30K, elevasi 2000 m, COT 10 jam",
      caption: "Bib 3042 · HARIST · 30K · EG 2000 m · COT 10 jam",
      width: 1600,
      height: 1200,
      phase: "pra-start",
    },
    {
      id: "night-pose",
      src: "/event/gtr-ultra-30k/04-trail-night-pose.webp",
      alt: "Harist berpose di trail malam dengan headlamp Nitecore, vest pink, dan tongkat",
      caption: "Di jalur malam — headlamp, vest, tongkat",
      width: 1068,
      height: 1600,
      phase: "di-jalur",
    },
    {
      id: "night-run",
      src: "/event/gtr-ultra-30k/05-trail-night-run.webp",
      alt: "Harist berlari di trail malam dengan bib 3042, headlamp menyala, kinesio tape biru di lutut",
      caption: "Aksi di trail malam menuju finis",
      width: 1066,
      height: 1600,
      phase: "di-jalur",
    },
    {
      id: "sunset-selfie",
      src: "/event/gtr-ultra-30k/06-sunset-selfie.webp",
      alt: "Selfie Harist dengan vest Green Forest saat golden hour di jalur",
      caption: "Golden hour — setelah usaha panjang",
      width: 906,
      height: 1600,
      phase: "sesudah",
    },
  ] satisfies DocPhoto[],
};

export const docPhaseLabel: Record<DocPhoto["phase"], string> = {
  "pra-start": "Pra-start",
  "di-jalur": "Di jalur",
  sesudah: "Sesudah",
};
