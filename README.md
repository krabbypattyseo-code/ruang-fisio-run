# SEO Learner

Platform belajar SEO berbahasa Indonesia: 6 modul berurutan, 19 pelajaran, dan kuis
bermuatan pembahasan di tiap modul. Progres belajar disimpan di `localStorage` peramban,
jadi tidak perlu akun, database, atau backend.

## Isi kurikulum

| Modul | Fokus | Pelajaran |
| --- | --- | --- |
| Fondasi SEO | Crawling, indexing, ranking, tiga pilar SEO, search intent | 3 |
| Riset Kata Kunci | Sumber ide, metrik, keyword map, kanibalisasi | 3 |
| SEO On-Page | Title/meta, struktur heading, internal link, gambar | 4 |
| SEO Teknis | robots.txt & sitemap, Core Web Vitals, data terstruktur | 3 |
| Konten & E-E-A-T | Brief konten, topic cluster, audit & refresh | 3 |
| Off-Page & Analitik | Link building, SEO lokal, laporan Search Console & GA4 | 3 |

Selain modul, ada glosarium 30 istilah SEO yang bisa dicari dan disaring per kategori,
serta halaman progres yang merangkum pelajaran selesai dan skor kuis per modul.

## Menjalankan secara lokal

Butuh Node.js 20 atau lebih baru.

```bash
npm install
npm run dev
```

Buka [http://localhost:43217](http://localhost:43217).

Perintah lain:

```bash
npm run build      # build produksi
npm start          # jalankan hasil build di port 43217
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run test:ui    # uji asap alur utama di browser (butuh dev server hidup)
```

`npm run test:ui` memakai Playwright; sekali saja jalankan `npx playwright install chromium`
sebelum pemakaian pertama. Skripnya menelusuri alur nyata: menandai pelajaran selesai,
persistensi progres setelah reload, mengerjakan kuis sampai halaman skor, reset progres,
pencarian glosarium, dan menu navigasi versi mobile.

Dev server sengaja di-bind ke `0.0.0.0` agar bisa dibuka dari luar mesin. Karena itu
`allowedDevOrigins` di `next.config.ts` mencantumkan `127.0.0.1` dan `localhost` — tanpa
daftar tersebut Next memblokir aset dev dari origin lain dan halaman tidak akan terhidrasi
(tampilan terlihat normal, tapi semua interaksi mati). Tambahkan host lain ke daftar itu
kalau kamu mengakses dev server dari domain atau IP berbeda.

## Struktur proyek

```
src/
├─ app/
│  ├─ page.tsx                          # beranda: jalur belajar + progres
│  ├─ modul/[slug]/page.tsx             # ikhtisar modul & daftar pelajaran
│  ├─ modul/[slug]/[lessonSlug]/page.tsx# halaman materi
│  ├─ kuis/[slug]/page.tsx              # kuis per modul
│  ├─ glosarium/page.tsx                # glosarium istilah
│  ├─ progres/page.tsx                  # ringkasan progres & reset
│  ├─ sitemap.ts, robots.ts             # metadata SEO situs ini sendiri
│  └─ error.tsx, not-found.tsx          # state error & 404
├─ components/                          # komponen UI (shadcn/ui di components/ui)
├─ content/
│  ├─ modules/*.ts                      # materi tiap modul
│  ├─ curriculum.ts                     # indeks modul, navigasi, agregat
│  ├─ glossary.ts                        # daftar istilah
│  └─ types.ts                           # tipe materi & blok konten
└─ lib/progress.tsx                     # store progres berbasis localStorage
```

## Menambah atau mengubah materi

Materi berupa data TypeScript, bukan Markdown, supaya tipenya terjaga.

1. Buat berkas baru di `src/content/modules/` yang mengekspor objek `Module`.
2. Daftarkan di array `modules` pada `src/content/curriculum.ts` — urutan array adalah
   urutan jalur belajar.
3. Susun isi pelajaran dari blok yang tersedia di `src/content/types.ts`:
   `paragraph`, `heading`, `list`, `callout`, `code`, dan `table`.

Rute, sitemap, navigasi antar pelajaran, dan hitungan progres ikut menyesuaikan otomatis.

## Catatan teknis

- Next.js 16 (App Router) + TypeScript, Tailwind CSS 4, komponen shadcn/ui.
- Semua halaman materi dipra-render statis lewat `generateStaticParams`.
- Progres dibaca dengan `useSyncExternalStore` supaya aman terhadap hidrasi dan ikut
  tersinkron antar tab peramban.
- Setel `NEXT_PUBLIC_SITE_URL` saat deploy agar `sitemap.xml` dan `robots.txt` memakai
  domain produksi.
