# Ruang Fisio Run — Running Dashboard

Dashboard data lari pribadi dan pusat persiapan **GTR Ultra 30K**. Dibangun dari sketsa alur
dan revisinya: Dashboard jadi halaman depan, filter hidup sebagai bar menetap dengan state di
URL, Session Detail dipisah sebagai layar tersendiri, dan halaman Event menarik angkanya dari
data latihan alih-alih diketik manual.

## Layar

| Rute | Isi | Sumber data |
| --- | --- | --- |
| `/` | Tren pace, cadence, stride, HR, volume mingguan per tipe, dan arsip sesi | Agregat semua sesi, difilter |
| `/sesi/[id]` | Lap, running dynamics, profil elevasi, distribusi zona HR, cuaca | Satu sesi + tabel lap |
| `/event` | Info acara, hitung mundur, skor kesiapan per komponen, pos & cut-off | Data lomba manual + agregat latihan |
| `/event/proyeksi` | Tiga skenario waktu finis, kurva waktu vs cut-off, split per pos | Sesi acuan + parameter lomba |
| `/event/rencana` | Rencana pekanan (bangun → puncak → taper) dan checklist | Turunan dari gap kesiapan |
| `/event/strategi` | Logistik cairan, karbo, sodium per segmen, aturan pacing, jadwal pagi | Proyeksi + sweat rate pribadi |

Filter di Dashboard menyimpan seluruh state di query string, misalnya
`/dashboard?tipe=trail&dari=2026-07-01&sampai=2026-09-16`, sehingga tautannya bisa di-bookmark dan
dibagikan apa adanya.

## Menjalankan secara lokal

Butuh Node.js 20 atau lebih baru.

```bash
npm install
npm run dev
```

Buka [http://localhost:43217](http://localhost:43217).

```bash
npm run build      # build produksi
npm start          # jalankan hasil build di port 43217
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run test:ui    # uji asap alur utama di browser (butuh dev server hidup)
```

`npm run test:ui` memakai Playwright; jalankan `npx playwright install chromium` sekali
sebelum pemakaian pertama.

Dev server di-bind ke `0.0.0.0` agar bisa dibuka dari luar mesin, karena itu
`allowedDevOrigins` di `next.config.ts` mencantumkan `127.0.0.1` dan `localhost`. Tanpa daftar
tersebut Next memblokir aset dev dan halaman tidak akan terhidrasi—tampilan terlihat normal,
tapi semua interaksi mati.

## Data

Semua angka di aplikasi ini berasal dari dua modul data, bukan dari basis data:

- `src/data/sessions.ts` — 50-an sesi contoh (road, trail, hiking) yang dibangkitkan
  deterministik untuk blok latihan 13 pekan, lengkap dengan lap, zona HR, dan cuaca. Ganti
  isi modul ini dengan hasil ekspor Garmin/Strava; seluruh halaman hanya bergantung pada
  bentuk tipe `Session` di `src/data/types.ts`.
- `src/data/event.ts` — parameter GTR Ultra 30K (jarak, elevasi, cut-off tiap pos,
  perlengkapan wajib) dan profil pelari termasuk sweat rate. Perbarui begitu race book
  resmi keluar.

Perhitungan turunan terpisah agar mudah diaudit:

- `src/lib/metrics.ts` — agregat, seri mingguan, tren per sesi, jarak setara datar
  (100 m tanjakan ≈ 0,9 km).
- `src/lib/race.ts` — skor kesiapan, proyeksi Riegel, rencana pekanan, checklist, dan
  logistik fueling.

## Layout

Seluruh antarmuka dikunci di kolom **390px** (pola yang sama dengan
[Ruang Fisio Pasien](https://ruang-fisio-pasien.vercel.app/)). Di desktop, kolom itu
tampil di tengah canvas abu-abu `#e5e9eb`; di ponsel mengisi lebar layar. Lihat
`src/components/app-shell.tsx` dan aturan `body` / `.app-shell` di `globals.css`.

## Brand

Diambil dari aset Ruang Fisio, dengan dua catatan yang masih perlu keputusan:

- **Warna** `#005A64` teal utama dan `#139CAB` cyan aksen sudah dipakai sebagai warna primer
  dan aksen, termasuk palet chart (trail cyan, road teal, hiking clay).
- **Font Kind Sans** belum dipakai karena berkas lisensinya menyebut "Demo for Personal Use",
  yang umumnya tidak mencakup web embedding. Sementara ini memakai Figtree sebagai pengganti
  dengan karakter geometris yang mendekati; ganti di `src/app/layout.tsx` setelah lisensi
  komersial dibeli.
- **Logo** pintu terbuka dengan figur pelari masih digambar ulang sebagai placeholder di
  `src/components/brand-mark.tsx`. Ganti dengan `logo-07.svg` dari brand folder.

## Struktur

```
src/
├─ app/
│  ├─ page.tsx                  # Home landing
│  ├─ dashboard/page.tsx         # Dashboard + filter bar
│  ├─ sesi/[id]/page.tsx        # Session Detail
│  ├─ event/layout.tsx          # Header acara + sub-navigasi
│  ├─ event/page.tsx            # Kesiapan
│  ├─ event/proyeksi/page.tsx   # Proyeksi waktu
│  ├─ event/rencana/page.tsx    # Rencana latihan
│  └─ event/strategi/page.tsx   # Strategi hari-H
├─ components/
│  ├─ charts/                   # Chart recharts (client component)
│  ├─ filter-bar.tsx            # Filter dengan state di URL
│  └─ session-table.tsx         # Tabel arsip + versi kartu untuk mobile
├─ data/                        # Sesi contoh & parameter lomba
└─ lib/                         # Format, filter, metrik, perhitungan lomba
```
