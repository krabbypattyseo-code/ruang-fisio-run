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
| `/event` | Daftar event yang diikuti |
| `/event/gtr-ultra-30k` | Info acara, hitung mundur, skor kesiapan, race schedule, gear wajib | Data lomba resmi + agregat latihan |
| `/event/gtr-ultra-30k/proyeksi` | Tiga skenario (disiplin / sedang / seperti 11 Apr), kurva vs batas mundur | Riegel pada waktu bergerak Bogor |
| `/event/gtr-ultra-30k/rencana` | Countdown 9 hari + checklist | `gtrCountdownDays` |
| `/event/gtr-ultra-30k/strategi` | Cairan 400–600 ml/jam, pacing malam, jadwal dari flag off 03.00 | Proyeksi + profil cairan lomba |

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

Arsip sesi dari berkas di `data/raw/`:

- `5-analisis-lari-gtr.xlsx` — ringkasan 18 aktivitas road (11 Jul–14 Sep 2026)
- `Garmin_Hiking_TrailRunning.xlsx` — hiking & trail Garmin (Jan 2025–Apr 2026)
- `Garmin_Running_Data_JulAug_2026.xlsx` — lap & zona HR Garmin road
- `COROS_Running_26Agu6Sep2026.xlsx` / `COROS_Running_10-14Sep2026.xlsx` — lap COROS
- `1-rencana-gtr-ultra-30k.html` — brief awal parameter lomba (Revisi 3)
- `6-update-website-gtr.html` — audit & konten pengganti resmi (18 Sep 2026): start 03.00, COT 13.00, gear 10 item, proyeksi terkoreksi, rencana 9 hari

Impor ke TypeScript:

```bash
npm run import:sessions
# atau: python3 scripts/import-sessions.py
```

Hasilnya ditulis ke `src/data/sessions.generated.ts`. Field yang tidak ada di sumber
tetap `null` — tidak digenerate.

Untuk menambah workout baru: ganti/tambah file Excel di `data/raw/`, sesuaikan path di
`scripts/import-sessions.py` bila nama file berubah, lalu jalankan ulang impor.

Inventori gear (sepatu, jam, vest) ada di `src/data/gear.ts` + foto di `public/gear/`.

Parameter lomba GTR Ultra 30K (Kayuwangi, Banyubiru, Semarang) ada di `src/data/event.ts`.


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
