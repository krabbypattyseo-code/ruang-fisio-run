# Update Ruang Fisio Run — GTR Ultra 30K jadi DNF

**Dokumen tunggal.** Semua angka, copy, dan spesifikasi komponen ada di sini — tidak perlu buka file lain.

| | |
|---|---|
| Repo | `ruang-fisio-run` (Next.js + shadcn/ui + Tailwind v4) |
| Halaman | `/event` dan `/event/gtr-ultra-30k` |
| Dibuat | 29 September 2026 |
| Menggantikan | `9-update-event-gtr-dnf.md` (boleh dihapus) |
| Sumber data | `8-data-aktivitas-lengkap.xlsx` · `GTR 30K.gpx` · `COROS_GTR_Ultra_14-27Sep2026.xlsx` · `Hevy_Workout_dombaaa_Jul-Sep2026.xlsx` |

---

## Daftar isi

1. [Ringkasan perubahan](#1-ringkasan-perubahan)
2. [Data final terverifikasi](#2-data-final-terverifikasi)
3. [Data model](#3-data-model)
4. [Komponen StatusBadge](#4-komponen-statusbadge)
5. [Halaman /event — kartu daftar](#5-halaman-event--kartu-daftar)
6. [Halaman detail — tab Hasil](#6-halaman-detail--tab-hasil)
7. [Perubahan pada tab lama](#7-perubahan-pada-tab-lama)
8. [Post-mortem skor kesiapan](#8-post-mortem-skor-kesiapan)
9. [Checklist implementasi](#9-checklist-implementasi)
10. [Lampiran — data siap tempel](#10-lampiran--data-siap-tempel)
11. [Catatan revisi](#11-catatan-revisi)

---

## 1. Ringkasan perubahan

Race-nya sudah lewat. GTR Ultra 30K berubah dari kartu "event akan datang" jadi **catatan hasil ber-label DNF**, plus tab **Hasil** berisi evaluasi lengkap.

Enam perubahan:

1. Tambah `status: 'upcoming' | 'finished' | 'dnf'` di data event → GTR Ultra jadi `'dnf'`.
2. Tambah objek `result` berisi hasil + evaluasi.
3. Komponen `StatusBadge` dengan warna `--brand-rose`.
4. Kartu `/event`: badge hitung mundur → badge DNF, skor kesiapan → headline hasil.
5. Halaman detail: tab **Hasil** jadi tab default. Empat tab lama ditandai arsip pra-lomba.
6. **Jangan** ubah angka jarak/elevasi kursus — GPX membuktikan angka di situs sudah benar.

**Kalimat yang harus ada di halaman:** Harist berhenti **1,47 km dari garis finis**, di jalur yang praktis datar, ketika jam lomba sudah lewat COT 12 menit 27 detik. Dia butuh 30 menit; ada 51 menit tergeletak di turunan.

---

## 2. Data final terverifikasi

### 2.1 Kursus — dari GPX resmi

| | Situs | GPX resmi | Jam tangan COROS | Dipakai |
|---|---|---|---|---|
| Jarak | 30 km | **31,09 km** | 33,19 km | **31,09 km** |
| Elevasi naik | 1.800 m | **1.791 m** | 1.898 m | **1.791 m** |
| Titik tertinggi | — | **1.588 m** (km 11,5) | 1.558 m | 1.588 m |
| Bentuk | — | loop tertutup (start↔finis 1 m) | — | loop |

**Angka di situs sudah benar** — meleset ~1 km dan ~9 m. Tidak perlu dikoreksi.

Profil kursus per 5 km, kalau mau digambar:

| Segmen | Naik | Turun |
|---|---|---|
| km 1–5 | 599 m | 33 m |
| km 6–10 | 346 m | 184 m |
| km 11–15 | 330 m | 229 m |
| km 16–20 | 254 m | 327 m |
| km 21–25 | 52 m | 417 m |
| km 26–30 | 196 m | 566 m |
| km 31 | 15 m | 35 m |

### 2.2 Jalurnya benar — dan ini perlu ditegaskan

Profil ketinggian 34 lap COROS dicocokkan ke profil GPX:

| | |
|---|---|
| Residual rata-rata | +5,8 m (drift barometer biasa selama 10 jam) |
| Residual terbesar | 51 m |
| RMS 34 titik | **25,7 m** |

Kalau ada salah belok atau loop tambahan, profil akan pecah di satu titik dan tidak pernah nyambung lagi. **Ke-34 titik menempel dari start sampai berhenti.** Tidak ada penyimpangan jalur.

### 2.3 Posisi berhenti

- Rasio bacaan jam terhadap GPX: **1,12**
- Jam baca 33,19 km → posisi sebenarnya **95,3% lintasan** = km **29,62** dari 31,09
- **Sisa ke finis: 1,47 km** — naik 23 m, turun 46 m. Praktis datar.
- Pace sebenarnya **20:50/km** (bukan 18:36/km seperti terbaca di jam)
- Pace yang dibutuhkan untuk masuk COT: **19:17/km** — kurang **7,4%**

**Seberapa pasti angka 12% itu.** Ini rasio antara dua alat ukur yang dua-duanya tidak sempurna, bukan "jam salah 12%". GPX-nya Strava smart recording (1 titik tiap 15 m) yang memotong tikungan dan *under*-read:

| Kalau | Kursus sebenarnya |
|---|---|
| GPX akurat, COROS +12% | 31,1 km |
| GPX −4%, COROS +8% | ~32,3 km |
| GPX −7%, COROS +5% | ~33,3 km |

Kursus kemungkinan besar **31–33 km**; over-read COROS mungkin hanya 5–8%. **Apa pun pembagiannya, posisi berhenti tetap 95,3%** (dihitung dari bentuk profil, bukan angka jarak) dan sisa ke finis 1,47–1,56 km.

Kenapa over-read di trail bisa sebesar itu: noise GPS menumpuk per satuan **waktu**, bukan per kilometer. Pada pace 20:50/km, satu kilometer memakan waktu empat kali lipat lari jalan raya — jadi empat kali lipat noise di jarak yang sama. Tambah tutupan pohon rapat, jurang, switchback. Kemiringan **bukan** penyebabnya: jarak 3D cuma +1,33% (413 m) di atas jarak peta.

### 2.4 Jam lomba

| | |
|---|---|
| Flag off 30K | 03:00 WIB |
| COT 30K (hanya di finis) | 13:00 WIB — jendela **10 jam pas** |
| Jam tangan menyala | 02:47 WIB (dinyalakan lebih awal; start tetap 03:00) |
| Jam tangan berhenti | ~13:12 WIB |
| **Jam lomba saat berhenti** | **10:12:27** → **lewat COT 12:27** |
| Waktu aktif | 10:17:23 |
| Waktu berhenti | 0:08:04 (target rencana ≤ 23 menit — terlampaui jauh) |

Praktisnya **waktu aktif ≈ jam lomba + 5 menit**: start awal 13 menit hampir mengimbangi waktu berhenti 8 menit.

Jam dinding ini **tidak punya ketidakpastian sama sekali** — tidak ada GPS di dalamnya.

### 2.5 Metrik fisiologis

| | |
|---|---|
| HR rata-rata | 146 bpm (zona Aerobic Endurance) |
| Cadence rata-rata | 100 spm (sesi jalan raya 167–170) |
| Training load | 1.165 |
| Kalori | 6.437 kkal |
| Aerobic TE | 5,9 Overreaching |
| Anaerobic TE | 4,7 Optimized |
| Km tercepat | 9:37 (km-9 jam tangan) |

---

## 3. Data model

```ts
// types/event.ts
export type EventStatus = 'upcoming' | 'finished' | 'dnf';

export type EventResult = {
  status: Exclude<EventStatus, 'upcoming'>;
  label: string;                    // "DNF"
  headline: string;                 // muncul di kartu daftar
  reason: 'cot' | 'cedera' | 'mundur' | 'lainnya';

  courseKm: number;                 // 31.09
  courseAscentM: number;            // 1791
  coveredKm: number;                // 29.62
  remainingKm: number;              // 1.47
  watchKm: number;                  // 33.19
  watchOverreadPct: number;         // 12.1

  raceElapsed: string;              // "10:12:27"
  movingTime: string;               // "10:17:23"
  stoppedTime: string;              // "0:08:04"
  cutoff: string;                   // "10:00:00"
  overCutoffBy: string;             // "0:12:27"

  truePacePerKm: string;            // "20:50"
  requiredPacePerKm: string;        // "19:17"
  avgHr: number; avgCadence: number;
  trainingLoad: number; calories: number;
  aerobicTe: number; anaerobicTe: number;

  evaluation: EventEvaluation;
};

export type EventEvaluation = {
  verdict: string[];                              // paragraf
  budget: { label: string; value: string; note?: string; kind: 'need' | 'have' | 'sub' }[];
  causes: { title: string; severity: 'utama' | 'pendukung' | 'bukan'; body: string }[];
  segments: { label: string; km: number; time: string; pace: string; hr: number; note: string }[];
  terrain: { label: string; laps: number; time: string; pace: string; hr: number; note: string }[];
  hrZones: { zone: string; range: string; time: string; pct: number; note: string }[];
  worstLaps: { km: number; time: string; ascent: number; descent: number; hr: number; note: string }[];
  checkpoints: { pos: string; courseKm: number; watchKm: number; target: string;
                 personalLimit: string; actual: string; vsTarget: string; vsLimit: string }[];
  weeklyLoad: { week: string; sessions: number; km: number; time: string; ascent: number; gym: string }[];
  prepGaps: { metric: string; race: string; best: string; ratio: string; note: string }[];
  gym: { aspect: string; value: string; verdict: string; weak?: boolean }[];
  whatWorked: { title: string; body: string }[];
  actions: { priority: number; action: string; frequency: string; target: string; why: string }[];
};
```

```ts
// data/events.ts
{
  slug: 'gtr-ultra-30k',
  name: 'GTR Ultra 30K',
  status: 'dnf',
  result: gtrUltraResult,   // lihat bagian 10
}
```

---

## 4. Komponen StatusBadge

Pakai shadcn `Badge` yang sudah ada, cukup varian. Warna **`--brand-rose` (#c04a54)** — bukan `--destructive` (#e40014) yang terlalu menyala dan di luar palet brand.

```tsx
// components/ui/status-badge.tsx
import { Badge } from '@/components/ui/badge';
import type { EventStatus } from '@/types/event';

const MAP = {
  dnf:      { text: 'DNF',    className: 'bg-[var(--brand-rose)] text-white border-transparent' },
  finished: { text: 'Finish', className: 'bg-[var(--brand-teal)] text-white border-transparent' },
} as const;

export function StatusBadge({ status }: { status: EventStatus }) {
  if (status === 'upcoming') return null;
  const s = MAP[status];
  return <Badge className={s.className} aria-label={`Status lomba: ${s.text}`}>{s.text}</Badge>;
}
```

Aturan pakai:
- Di sebelah badge kategori (`30K`), menggantikan posisi badge hitung mundur.
- Tetap `rounded-4xl h-5 text-xs font-medium` — ikut Badge bawaan, jangan diubah.
- Tanpa ikon. Tiga huruf sudah jelas; ikon silang terasa menghakimi.
- `aria-label` wajib — screen reader tidak bisa membaca singkatan ini.
- Kemunculan pertama di body tulis lengkap: *"DNF (Did Not Finish)"*.
- Kontras `#c04a54` + teks putih ≈ 4,3:1 — cukup untuk teks kecil tebal. Jangan perkecil di bawah `text-xs font-medium`.

---

## 5. Halaman `/event` — kartu daftar

```
[30K] [DNF]
GTR Ultra 30K
29,6 dari 31,1 km · berhenti 1,5 km sebelum finis · lewat COT 12 menit
📅 Minggu, 27 September 2026 · flag off 03:00 WIB · COT 13:00
📍 Lapangan Dusun Kayuwangi, Desa Gedong, Banyubiru, Kab. Semarang
⛰ 31,1 km · 1.791 m naik
[Buka hasil & evaluasi →]
```

- Badge hitung mundur → `<StatusBadge status="dnf" />`
- Baris skor kesiapan → `result.headline`
- Label tombol → `Buka hasil & evaluasi`
- Heading: `1 event aktif` → **`1 event · terakhir: GTR Ultra, 27 September 2026`**
- Subjudul: → **`Buka detail untuk hasil, evaluasi, dan rencana perbaikan.`**

Kalau nanti ada event baru: urutkan `upcoming` dulu, lalu yang sudah lewat, terbaru di atas.

---

## 6. Halaman detail — tab Hasil

Urutan tab jadi: **Hasil** · Kesiapan · Proyeksi · Rencana · Strategi.
`defaultValue="hasil"` kalau `status !== 'upcoming'`.

### 6.1 Header — empat kartu angka

```
29,62 km        10:12:27        1,47 km          +12:27
dari 31,09      jam lomba       sisa ke finis    lewat COT
```

`tabular-nums`, gaya sama dengan kartu skor kesiapan yang sudah ada.

### 6.2 Vonis

> Race ini berhenti karena kehabisan waktu, dan berhentinya sangat dekat. Setelah dicocokkan dengan GPX resmi, Harist berada di km 29,6 dari 31,09 — **1,47 kilometer dari garis finis**, di jalur yang tinggal turun 46 meter dan naik 23 meter. Praktis datar. Tapi jam lomba sudah menunjuk 10:12:27, sementara COT-nya 10:00:00.
>
> Jalurnya diikuti dengan benar dari start sampai berhenti — profil ketinggian 34 lap menempel ke profil GPX dengan RMS 25,7 meter, tanpa satu pun titik yang lepas. Yang meleset alat ukurnya: COROS membaca 33,19 km untuk posisi yang sebenarnya km 29,62. Untuk lomba berlabel 30K, artinya sepanjang paruh kedua jam itu bilang jarak lomba sudah lewat, padahal finis masih di depan. Itu tidak menambah waktu sedetik pun, tapi membuat setiap keputusan di paruh kedua diambil dari peta yang salah.
>
> Yang jelas dari data: **batasnya bukan jantung.** Hanya 7% waktu di zona Threshold dan 0,4% di Anaerobic Endurance; 75% sisanya di Recovery dan Aerobic Endurance. Mesin aerobiknya tidak pernah didekati batasnya selama sepuluh jam. Yang menyerah lebih dulu adalah kaki, khususnya kemampuan menahan turunan.

### 6.3 Anggaran waktu — blok paling penting di halaman

Beri bobot visual paling besar. Ini yang bikin evaluasinya berguna, bukan cuma informatif.

| | |
|---|---|
| **DIBUTUHKAN untuk finis dalam COT** | **~30 menit** |
| — sudah lewat COT saat berhenti | 12:27 |
| — sisa 1,47 km @ 12:00/km | 17:38 |
| **TERSEDIA tapi tidak diambil** | **51 menit** |
| — 8 lap turunan ≥100 m dilari 12:00/km, bukan 17:09/km | 41:17 |
| — km-19 dinormalkan ke pace lap sejenis | 9:54 |

> Waktunya ada. Dia butuh 30 menit, dan ada 51 menit tergeletak di turunan dan di km-19. Bukan kebugaran aerobik yang kurang — itu masih utuh sampai akhir. Yang kurang adalah kaki yang bisa lari turun setelah jam kedelapan.

### 6.4 Penyebab

Severity `utama` → aksen `--brand-clay`. `bukan` → `--brand-cyan`.

| # | Temuan | Severity | Bukti |
|---|---|---|---|
| 1 | **Kekuatan menahan turunan** | utama | Lap net-turun rata-rata 17:25/km, lap net-naik 19:57/km — turun hanya 2:32/km lebih cepat daripada naik. Pada kaki yang masih berfungsi, turunan 2–3× lebih cepat dari tanjakan. Km-32 yang turun 155 m tanpa satu meter pun tanjakan butuh 25:12. Kerusakan eksentrik quad dan betis — di sinilah 41 menit yang hilang. |
| 2 | **Sesi panjang tidak pernah dilatih** | utama | Sesi terlama dalam 90 hari sebelum lomba: 4:47:20 — dan itu jalan santai di Wonosobo menemani orang lain. Lomba berlangsung 10:12:27, **2,13×** lebih lama. Pace ambruk ke 22:54/km di km 11–15, persis ketika masuk jam keempat. |
| 3 | **Volume elevasi terlalu kecil** | utama | Total tanjakan 90 hari sebelum lomba: 612 m. Kursusnya 1.791 m — **2,93× total tiga bulan, dalam satu hari.** Sesi ber-elevasi terakhir 30 Agustus, 28 hari sebelum start. |
| 4 | **Batas mundur terlewat sejak WS 1 — tapi tersamarkan** | pendukung | Dikonversi ke km kursus, batas mundur pribadi sudah terlewat sejak pos pertama (+4:36), melebar jadi +29:41 di WS 4. Ini bukan sinyal yang diabaikan — ini sinyal yang tidak terbaca. Di WS 1 jam menunjuk 6,7 km padahal posisinya km 6,0, jadi selisih 4 menit terasa jauh lebih ringan. Panitia hanya punya COT di finis, jadi tidak ada koreksi dari luar. |
| 5 | **Jam membaca jarak lebih jauh dari kenyataan** | pendukung | Di km kursus 6 jam menunjuk 6,7; di km 24 menunjuk 26,9; di titik berhenti 33,19 untuk posisi 29,62. Tidak menambah waktu sedetik pun — yang dirusak informasinya. |
| 6 | **Waktu terbuang di dua kilometer** | pendukung | Km-13 (40:11, tanjakan 188 m) dan km-19 (26:44). Km-19 cuma 3 m tanjakan dengan HR 126 — terendah sepanjang lomba. Dibanding lap sejenis, km-19 sendiri kehilangan 9:54. |
| 7 | **Bukan kapasitas aerobik** | bukan | 7% di Threshold, 0,4% di Anaerobic Endurance, 0% di Anaerobic Power. HR rata-rata 146. Mesin aerobiknya belum tersentuh — dan itu kabar baik. |
| 8 | **Bukan pacing** | bukan | Paruh pertama 18:33/km, paruh kedua 18:39/km. Nyaris identik, tanpa positive split. Start dini hari pun tidak bikin over-pace. |
| 9 | **Bukan disiplin berhenti** | bukan | Target ≤ 23 menit, aktual 8:04. Terlampaui jauh — salah satu eksekusi terbaik sepanjang lomba. |
| 10 | **Bukan navigasi** | bukan | Profil 34 lap menempel ke GPX, RMS 25,7 m, residual terbesar 51 m. Jalurnya benar dari start sampai berhenti. |

### 6.5 Anatomi per 5 km

Km di tabel ini **km jam tangan** (datanya per lap). Km kursus ≈ km jam ÷ 1,12 — beri catatan.

| Segmen | Jarak | Waktu | Pace /km | HR | Profil |
|---|---|---|---|---|---|
| km 1–5 | 5,00 | 1:28:50 | 17:46 | 158,0 | naik 514 m · turun 69 m — langsung menanjak dari start |
| km 6–10 | 5,00 | 1:17:28 | 15:29 | 150,6 | naik 356 m · turun 209 m — segmen tercepat |
| km 11–15 | 5,00 | 1:54:33 | **22:54** | 145,0 | naik 467 m · turun 107 m — terlambat, termasuk km-13 |
| km 16–20 | 5,00 | 1:35:59 | 19:11 | **134,4** | naik 85 m · turun 374 m — turunan, tapi HR justru jatuh |
| km 21–25 | 5,00 | 1:31:50 | 18:22 | 146,8 | naik 245 m · turun 355 m — HR pulih |
| km 26–30 | 5,00 | 1:31:49 | 18:21 | 145,6 | naik 216 m · turun 250 m |
| km 31–34 | 3,19 | 0:56:54 | 17:50 | 149,2 | naik 15 m · turun 462 m — turunan penuh, pace tetap 17:50 |

> Perhatikan km 31–34: turun 462 m tanpa tanjakan sama sekali, tapi pace-nya sama saja dengan km 21–25 yang masih ada 245 m tanjakan. Di titik itu kaki sudah habis.

### 6.6 Pace menurut medan

| Medan | Jml lap | Total waktu | Pace /km | HR | Catatan |
|---|---|---|---|---|---|
| Lap net **naik** (> +30 m) | 15 | 4:59:16 | 19:57 | 153 | 48,5% dari total waktu |
| Lap net **turun** (< −30 m) | 14 | 4:04:03 | **17:25** | 142 | 39,5% waktu — cuma 2:32/km lebih cepat dari tanjakan |
| Lap net datar (±30 m) | 5 | 1:14:04 | 17:40 | 143 | 12,0% waktu |
| Lap turunan ≥ 100 m | 8 | 2:17:17 | **17:09** | 146 | Di sinilah 41 menit itu |
| Lap tanjakan ≥ 150 m | 2 | 1:06:07 | 33:03 | 149 | km-3 dan km-13 |

Beri baris turunan penekanan visual — ini bukti utama seluruh evaluasi.

### 6.7 Waktu di zona HR

| Zona | Rentang | Waktu | % | Arti |
|---|---|---|---|---|
| Recovery | < 137 bpm | 1:59:32 | 19% | Termasuk jeda dan segmen paling pelan |
| Aerobic Endurance | 137–154 bpm | 5:45:49 | 56% | Zona kerja utama — ini yang benar untuk lomba 10 jam |
| Aerobic Power | 155–162 bpm | 1:48:50 | 18% | Tanjakan |
| Threshold | 163–174 bpm | 0:40:45 | 7% | Hanya 7% — sistem aerobik tidak pernah mendekati batas |
| Anaerobic Endurance | 175–181 bpm | 0:02:27 | 0,4% | Praktis nol |
| Anaerobic Power | > 181 bpm | 0:00:00 | 0% | Nol |

### 6.8 Lima lap terlambat

| Lap (jam) | Waktu | Naik | Turun | HR | Diagnosis |
|---|---|---|---|---|---|
| km-13 | 40:11 | 188 m | 14 m | 144 | Tanjakan terberat lomba. Wajar lambat, tapi 40 menit untuk 1 km artinya nyaris berhenti bergerak. |
| km-19 | 26:44 | 3 m | 81 m | **126** | **Anomali.** Nyaris datar, HR terendah sepanjang lomba. Ini berhenti — aid station, nutrisi, atau kram. Kehilangan 9:54 vs lap sejenis. |
| km-3 | 25:56 | 163 m | 4 m | 153 | Tanjakan awal, masih segar. |
| km-32 | 25:12 | 0 m | 155 m | 143 | **Anomali.** Nol tanjakan, turun 155 m. Ini seharusnya lap tercepat lomba, bukan urutan ke-4 terlambat. |
| km-21 | 22:30 | 110 m | 26 m | 150 | Tanjakan setelah jam keenam. |

### 6.9 Rencana vs aktual per pos

Semua dikonversi ke **km kursus sebenarnya**. Kolom "km di jam" menunjukkan apa yang dia lihat saat itu — itu bagian dari ceritanya.

| Pos | Km kursus | Km di jam | Target | Batas pribadi | Jam lomba aktual | vs target | vs batas |
|---|---|---|---|---|---|---|---|
| WS 1 | 6,00 | 6,7 | 1:28 | 1:50 | 1:54:36 | +26:36 | **+4:36** |
| WS 2 | 12,00 | 13,4 | 3:06 | 3:50 | 4:09:19 | +1:03:19 | **+19:19** |
| WS 3 | 18,00 | 20,2 | 4:52 | 5:50 | 6:15:42 | +1:23:42 | **+25:42** |
| WS 4 | 24,00 | 26,9 | 6:42 | 7:50 | 8:19:41 | +1:37:41 | **+29:41** |
| WS 5 | 28,00 | 31,4 | 7:54 | 9:10 | 9:39:06 | +1:45:06 | **+29:06** |
| Finis | 31,09 | 34,8 | 8:21 | 10:00 | tidak tercapai | — | — |

Catatan wajib di bawah tabel:

> Posisi WS di rencana adalah estimasi pribadi — panitia hanya menyebut 4–5 titik berjarak 5–8 km, dan COT resmi cuma ada di finis. "Jam lomba aktual" dihitung dari waktu aktif dikurangi 4:56, penyesuaian gabungan start awal 13 menit dan waktu berhenti 8 menit, diperlakukan rata sepanjang lomba — jadi tiap baris punya ketidakpastian beberapa menit. Yang kokoh adalah trennya.

Dan:

> Selisih terhadap batas mundur melebar dari 4 menit di pos pertama jadi 30 menit di WS 4, lalu berhenti melebar. Artinya keputusan lomba ini sudah terbentuk di paruh pertama, bukan di kilometer terakhir — dan di WS 1, ketika selisihnya masih 4 menit, itu masih bisa dikejar.
>
> Tapi perhatikan kolom "km di jam": di WS 1 jam menunjuk 6,7 km untuk posisi km 6,0. Selisih 4 menit terhadap batas mundur jadi terasa jauh lebih ringan daripada sebenarnya. Batas mundur per pos cuma berguna kalau kamu tahu persis kamu di km berapa — dan di trail, jam tangan tidak bisa memberitahu itu.

### 6.10 Beban persiapan — 12 pekan sebelum lomba

| Pekan | Sesi lari | Jarak | Waktu | Naik | Gym & catatan |
|---|---|---|---|---|---|
| H-84 … H-78 | 1 | 3,0 km | 0:23:54 | 0 m | — · Treadmill 2,99 km |
| H-77 … H-71 | 0 | 0 | — | 0 m | 22 Jul Legs (1.400 kg) · tidak ada sesi lari |
| H-70 … H-64 | 2 | 9,8 km | 1:59:36 | 9 m | 27 Jul Legs (3.650 kg) |
| H-63 … H-57 | 2 | 12,9 km | 2:48:13 | 25 m | 1 Agu Pull · 4 Agu Pull · Long Walk 7,74 km |
| H-56 … H-50 | 2 | 10,0 km | 1:36:23 | 18 m | 7 Agu Push · 9 Agu Legs (9.312 kg) · 10 Agu Pull |
| H-49 … H-43 | 2 | 10,0 km | 1:36:00 | 9 m | 15 Agu Push (88 menit, sesi terlama) |
| H-42 … H-36 | 2 | 11,4 km | 1:57:49 | 9 m | 21 Agu Legs (9.250 kg) · puncak blok gym |
| H-35 … H-29 | 1 | 5,0 km | 0:43:49 | 2 m | 24 Agu Pull · 25 Agu Legs (11.741 kg, tertinggi) |
| H-28 … H-22 | 3 | 18,2 km | 6:16:09 | **525 m** | — · Wonosobo 8,13 km / 4:47:20 / naik 516 m (jalan santai) |
| H-21 … H-15 | 2 | 10,1 km | 1:26:36 | 7 m | — · gym kosong |
| H-14 … H-8 | 2 | 9,4 km | 1:14:34 | 8 m | 17 Sep Legs (3.096 kg) · 19 Sep Pull · sesi terakhir apa pun |
| H-7 … H-1 | **0** | **0** | — | **0 m** | **KOSONG TOTAL** — tidak ada lari, tidak ada gym |
| **TOTAL** | **19** | **109,8 km** | **21:43:03** | **612 m** | Rata-rata 9,2 km per pekan |

**Rasio lomba vs persiapan terbaik:**

| Metrik | Lomba | Terbaik 90 hari | Rasio | Artinya |
|---|---|---|---|---|
| Jarak satu sesi | 31,09 km | 8,13 km (30 Agu) | **3,82×** | Sesi terpanjang cuma seperempat jarak lomba |
| Durasi satu sesi | 10:12:27 | 4:47:20 (30 Agu) | **2,13×** | Tidak ada satu pun sesi di atas 5 jam |
| Elevasi satu sesi | 1.791 m | 516 m (30 Agu) | **3,47×** | Dan sesi 516 m itu jalan santai |
| Elevasi vs **total** 90 hari | 1.791 m | 612 m (18 sesi) | **2,93×** | Tiga kali total tanjakan tiga bulan, dalam satu hari |
| Turunan satu sesi | 1.791 m | 681 m (30 Agu) | **2,63×** | Yang paling merusak, paling sedikit dilatih |
| Training load | 1.165 | 117 (10 Sep) | **9,96×** | Sepuluh kali sesi terberat dalam persiapan |

**Pola lain:**

- 10 dari 18 sesi tepat 5,0 ± 0,2 km — tidak ada progresi jarak dari Juli sampai September.
- Lari terpanjang dalam blok: 6,4 km (18 Agustus).
- 13 hari terakhir: 9,41 km total. 7 hari terakhir: nol.
- Gym kosong 23 hari (25 Agustus → 17 September), persis di fase yang seharusnya jadi puncak.
- Latihan elevasi berhenti 4 pekan sebelum lomba.

### 6.11 Evaluasi gym

Volume kaki proporsional. Yang tidak cocok jenis latihannya untuk medan 1.791 m turunan.

| Aspek | Angka | Penilaian |
|---|---|---|
| Total blok | 13 sesi · 197 set · 71.402 kg | Konsisten di Agustus, runtuh di September |
| Volume per bulan | Jul 5.050 · Agu 58.075 · Sep 8.277 kg | Jeda 23 hari persis di fase puncak |
| Distribusi volume | Legs 53,8% · Pull 28,5% · Push 17,7% | Proporsinya masuk akal. Ini bukan masalahnya |
| Distribusi set | Legs 37,6% · Pull 35,0% · Push 20,8% | Pull hampir sebanyak Legs — agak berat ke atas |
| Quads | 5 sesi · 21 set · 17.251 kg | Mayoritas Leg Extension (mesin, konsentrik, open-chain). Nyaris tidak transfer ke kontrol turunan |
| Hamstring | 5 sesi · 19 set · 8.830 kg | Leg Curl 4 sesi + RDL 1 sesi. RDL bagus tapi cuma sekali (17 Sep) |
| Unilateral | Lunge 5 sesi · 19 set | **Bagian terbaik.** Progresi 16 → 20 → 28 kg dalam 8 pekan |
| **Betis** | **1 sesi · 4 set (9 Agu)** | **Titik lemah terbesar.** Betis menanggung beban eksentrik terbesar saat turun |
| **Glutes / Abductors** | **1 sesi · 1 set (27 Jul)** | **Titik lemah.** Stabilitas pinggul menentukan kontrol lutut di turunan teknis |
| Core | 8 set, semuanya di 1 sesi (19 Sep) | Praktis tidak dilatih. Core menopang postur selama 10 jam |
| **Latihan eksentrik khusus** | **Tidak ada** | Tidak ada step-down, split squat tempo, calf raise eksentrik, single-leg RDL. Yang paling dibutuhkan, justru absen |

### 6.12 Yang sudah benar

Jangan dihapus. Halaman yang cuma berisi kesalahan bikin orang berhenti membukanya.

- **Pacing.** Paruh pertama dan kedua nyaris identik, HR terkendali, 0% di zona anaerobik. Untuk lomba 10 jam pertama, ini eksekusi yang matang.
- **Disiplin berhenti.** Target ≤ 23 menit, aktual 8:04. Terlampaui jauh.
- **Navigasi.** Jalur diikuti benar dari start sampai berhenti — terbukti dari kecocokan profil ketinggian.
- **Tidak menyerah setelah titik terburuk.** Setelah km-19, HR pulih ke 146–149 dan pace stabil sampai akhir. Dia menyelesaikan 12 km lagi setelah titik terendahnya.
- **Progresi lunge.** 16 kg × 20 → 28 kg × 18 dalam 8 pekan, di latihan yang paling relevan untuk trail.
- **Konsistensi frekuensi.** 18 sesi dalam 90 hari, jeda terpanjang 7 hari. Frekuensinya bagus — durasinya yang kurang.

### 6.13 Rencana perbaikan

| # | Aksi | Frekuensi | Target | Kenapa |
|---|---|---|---|---|
| 1 | Sesi turunan khusus: naik santai, turun terkontrol 300–500 m, ulang 3–5× | 1×/pekan | 1.500 m turunan per sesi di puncak | 41 dari 51 menit yang hilang ada di turunan |
| 2 | Long run trail progresif 3 → 5 → 7 jam | 1×/pekan | Minimal 2 sesi ≥ 7 jam | Lomba 10:12 vs sesi terlama 4:47 |
| 3 | Volume elevasi mingguan | akumulasi | 1.500–2.500 m naik/pekan di puncak | Elevasi lomba ≤ 1× elevasi mingguan puncak |
| 4 | Gym eksentrik: step-down, split squat tempo 3 detik, single-leg RDL, calf raise eksentrik | 2×/pekan | Betis 4 set 2×/pekan, tanpa jeda > 7 hari | Leg Extension mesin tidak melindungi dari 1.791 m turunan |
| 5 | Volume lari mingguan | akumulasi | 40–60 km/pekan di puncak | Sekarang rata-rata 9,2 km/pekan |
| 6 | Taper 3 pekan: 60% → 40% → 25%, tetap ada sesi elevasi pendek di pekan terakhir | sekali | Sesi terakhir H-3, bukan H-8 | Tujuh hari kosong bukan taper |
| 7 | Kalibrasi jam vs GPX di satu sesi trail sebelum lomba, catat faktor koreksinya | sekali per lomba | Tahu angka koreksinya sebelum start | Bacaan jam meleset 5–12%; tanpa tahu itu, angkanya menyesatkan |
| 8 | Pacing berdasarkan waktu dan nama pos, bukan jarak di jam | tiap lomba | Tempel batas mundur per pos di flask/stang | Jarak jam tidak bisa dipercaya di trail; waktu selalu bisa |
| 9 | Perlakukan batas mundur sebagai keputusan, bukan informasi | tiap lomba | Lewat batas di 2 pos berturut-turut → ubah rencana | Sinyalnya menyala di WS 1 dan berjalan terus tanpa tindakan |
| 10 | Uji durability back-to-back: Sabtu 4 jam, Minggu 3 jam | 2× per blok | Pekan 10 dan 13 | Menguji kaki dalam kondisi lelah |

---

## 7. Perubahan pada tab lama

Tambahkan satu baris di atas empat tab lama:

> *Arsip pra-lomba — isinya sengaja tidak diubah supaya bisa dibandingkan dengan hasil.*

### Blok info kursus

Tambah satu baris (jangan ubah angka 30 km / 1.800 m — sudah benar):

> Jarak resmi 31,09 km per GPX panitia. Jam tangan mencatat 33,19 km — bacaan jam memang meleset di trail bertutupan rapat.

### Tab Rencana

Tabel pos tetap apa adanya sebagai arsip. Tambahkan kotak catatan:

> **Catatan pasca-lomba.** Posisi WS di tabel ini estimasi, dan jarak kursus ternyata 31,09 km — cukup dekat dengan asumsi 30 km. Yang meleset bukan rencananya, tapi eksekusinya: dikonversi ke km kursus sebenarnya, batas mundur pribadi sudah terlewat sejak WS 1 dan selisihnya melebar jadi 30 menit di WS 4.

### Label & slug

Label "30K" dan slug `/event/gtr-ultra-30k` **tetap** — itu nama kategori resmi, dan link lama jangan sampai mati.

---

## 8. Post-mortem skor kesiapan

Skornya bilang "Hampir siap" 83/100 dan memproyeksikan **8:21**. Aktualnya **10:12 dan tidak finis** — meleset sekitar dua jam.

| Komponen | Nilai | Sesi sumbernya | Umur saat lomba |
|---|---|---|---|
| Jarak terjauh | 26,4 / 30 km | Bogor Trail 11 Apr 2026 | **169 hari** |
| Elevasi satu sesi | 1.488 / 1.800 m | Kerinci 25 Jan 2025 | **610 hari** |
| Waktu di kaki | 571,8 / 501 mnt | Kerinci 25 Jan 2025 | **610 hari** |
| Sesi trail & hiking | 9 / 8 per 12 bln | 12 bulan terakhir | — |
| Konsistensi 4 pekan | 1,5 / 4 per pekan | 4 pekan terakhir | 0 hari |

**Tiga dari lima komponen memakai rekor sepanjang riwayat, dua di antaranya dari sesi berumur 20 bulan.** Kebugaran tidak bertahan 20 bulan. Satu-satunya komponen yang mengukur kondisi terkini — konsistensi 4 pekan — adalah satu-satunya yang jeblok, dan itu justru sinyal yang benar.

**Usulan perubahan rumus** (kerjakan terpisah):

1. **Beri bobot waktu.** Sesi di luar 12 pekan terakhir dipotong bobotnya; di luar 6 bulan jangan dihitung sebagai bukti kesiapan.
2. **Tambah komponen elevasi 12 pekan** (target: elevasi lomba ≤ total 12 pekan). Untuk GTR: 612 m vs 1.791 m → sekitar **34/100**.
3. **Tambah komponen sesi terpanjang 12 pekan** (target ≥ 60% durasi lomba). Untuk GTR: 4:47 vs 10:00 → sekitar **48/100**.
4. **Batas atas.** Kalau ada komponen terkini di bawah 50, skor akhir jangan boleh di atas 70.

Dengan aturan itu skor GTR kemungkinan mendarat di kisaran 50-an — "belum siap", sesuai kenyataan.

Tampilkan terbuka di tab Kesiapan:

> **Skor ini meleset.** Waktu itu 83/100 dengan proyeksi finis 8:21. Aktualnya 10:12 dan tidak finis. Penyebabnya ada di rumusnya: tiga dari lima komponen memakai rekor sepanjang riwayat, dua di antaranya dari sesi berumur 20 bulan. Satu-satunya komponen yang mengukur kondisi terkini justru yang skornya paling jelek — dan itulah yang benar.

---

## 9. Checklist implementasi

- [ ] Tambah `EventStatus` dan `EventResult` di tipe event
- [ ] Set `status: 'dnf'` + isi objek `result` (bagian 10)
- [ ] `StatusBadge` pakai `--brand-rose`, dengan `aria-label`
- [ ] Kartu `/event`: badge, headline, label tombol
- [ ] Heading & subjudul `/event`
- [ ] Tab **Hasil**, jadi `defaultValue` untuk event yang sudah lewat
- [ ] Banner "arsip pra-lomba" di atas empat tab lama
- [ ] **Blok anggaran waktu (6.3)** — ini inti halaman, beri bobot visual paling besar
- [ ] Baris bacaan jam di blok info kursus
- [ ] Kotak catatan pasca-lomba di tab Rencana
- [ ] Kotak post-mortem di tab Kesiapan
- [ ] `metadata.title`: `Kesiapan GTR Ultra 30K` → `Hasil GTR Ultra 30K`
- [ ] Mobile: tabel 8 kolom di 6.9 perlu scroll horizontal atau ganti jadi kartu per pos
- [ ] Cek kontras badge DNF (≈ 4,3:1 — jangan perkecil di bawah `text-xs font-medium`)

---

## 10. Lampiran — data siap tempel

```ts
export const gtrUltraResult: EventResult = {
  status: 'dnf',
  label: 'DNF',
  headline: '29,6 dari 31,1 km · berhenti 1,5 km sebelum finis · lewat COT 12 menit',
  reason: 'cot',

  courseKm: 31.09,
  courseAscentM: 1791,
  coveredKm: 29.62,
  remainingKm: 1.47,
  watchKm: 33.19,
  watchOverreadPct: 12.1,

  raceElapsed: '10:12:27',
  movingTime: '10:17:23',
  stoppedTime: '0:08:04',
  cutoff: '10:00:00',
  overCutoffBy: '0:12:27',

  truePacePerKm: '20:50',
  requiredPacePerKm: '19:17',
  avgHr: 146,
  avgCadence: 100,
  trainingLoad: 1165,
  calories: 6437,
  aerobicTe: 5.9,
  anaerobicTe: 4.7,

  evaluation: { /* di bawah */ },
};

const budget = [
  { kind: 'need', label: 'Dibutuhkan untuk finis dalam COT', value: '~30:00' },
  { kind: 'sub',  label: 'Sudah lewat COT saat berhenti',    value: '12:27' },
  { kind: 'sub',  label: 'Sisa 1,47 km @ 12:00/km',          value: '17:38',
    note: 'Jalur datar: naik 23 m, turun 46 m' },
  { kind: 'have', label: 'Tersedia tapi tidak diambil',      value: '51:11' },
  { kind: 'sub',  label: '8 lap turunan ≥100 m @ 12:00/km',  value: '41:17',
    note: 'Sekarang 2:17:17 (17:09/km); pada 12:00/km jadi 1:36:00' },
  { kind: 'sub',  label: 'km-19 dinormalkan',                value: '9:54',
    note: 'Lap sejenis rata-rata 16:49; km-19 26:44' },
];

const segments = [
  { label: 'km 1–5',   km: 5.00, time: '1:28:50', pace: '17:46', hr: 158.0, note: 'naik 514 m · turun 69 m — langsung menanjak dari start' },
  { label: 'km 6–10',  km: 5.00, time: '1:17:28', pace: '15:29', hr: 150.6, note: 'naik 356 m · turun 209 m — segmen tercepat' },
  { label: 'km 11–15', km: 5.00, time: '1:54:33', pace: '22:54', hr: 145.0, note: 'naik 467 m · turun 107 m — terlambat, termasuk km-13' },
  { label: 'km 16–20', km: 5.00, time: '1:35:59', pace: '19:11', hr: 134.4, note: 'naik 85 m · turun 374 m — turunan, tapi HR justru jatuh' },
  { label: 'km 21–25', km: 5.00, time: '1:31:50', pace: '18:22', hr: 146.8, note: 'naik 245 m · turun 355 m — HR pulih' },
  { label: 'km 26–30', km: 5.00, time: '1:31:49', pace: '18:21', hr: 145.6, note: 'naik 216 m · turun 250 m' },
  { label: 'km 31–34', km: 3.19, time: '0:56:54', pace: '17:50', hr: 149.2, note: 'naik 15 m · turun 462 m — turunan penuh, pace tetap 17:50' },
];

const terrain = [
  { label: 'Lap net naik (> +30 m)',   laps: 15, time: '4:59:16', pace: '19:57', hr: 153, note: '48,5% dari total waktu' },
  { label: 'Lap net turun (< −30 m)',  laps: 14, time: '4:04:03', pace: '17:25', hr: 142, note: '39,5% waktu — cuma 2:32/km lebih cepat dari tanjakan' },
  { label: 'Lap net datar (±30 m)',    laps:  5, time: '1:14:04', pace: '17:40', hr: 143, note: '12,0% waktu' },
  { label: 'Lap turunan ≥ 100 m',      laps:  8, time: '2:17:17', pace: '17:09', hr: 146, note: 'Di sinilah 41 menit itu' },
  { label: 'Lap tanjakan ≥ 150 m',     laps:  2, time: '1:06:07', pace: '33:03', hr: 149, note: 'km-3 dan km-13' },
];

const hrZones = [
  { zone: 'Recovery',            range: '< 137 bpm',   time: '1:59:32', pct: 0.19,  note: 'Termasuk jeda dan segmen paling pelan' },
  { zone: 'Aerobic Endurance',   range: '137–154 bpm', time: '5:45:49', pct: 0.56,  note: 'Zona kerja utama — benar untuk lomba 10 jam' },
  { zone: 'Aerobic Power',       range: '155–162 bpm', time: '1:48:50', pct: 0.18,  note: 'Tanjakan' },
  { zone: 'Threshold',           range: '163–174 bpm', time: '0:40:45', pct: 0.07,  note: 'Sistem aerobik tidak pernah mendekati batas' },
  { zone: 'Anaerobic Endurance', range: '175–181 bpm', time: '0:02:27', pct: 0.004, note: 'Praktis nol' },
  { zone: 'Anaerobic Power',     range: '> 181 bpm',   time: '0:00:00', pct: 0,     note: 'Nol' },
];

// km = km jam tangan (bagi 1,12 untuk km kursus)
const worstLaps = [
  { km: 13, time: '40:11', ascent: 188, descent:  14, hr: 144, note: 'Tanjakan terberat lomba' },
  { km: 19, time: '26:44', ascent:   3, descent:  81, hr: 126, note: 'Anomali — HR terendah sepanjang lomba' },
  { km:  3, time: '25:56', ascent: 163, descent:   4, hr: 153, note: 'Tanjakan awal, masih segar' },
  { km: 32, time: '25:12', ascent:   0, descent: 155, hr: 143, note: 'Anomali — nol tanjakan, turun 155 m' },
  { km: 21, time: '22:30', ascent: 110, descent:  26, hr: 150, note: 'Tanjakan setelah jam keenam' },
];

const checkpoints = [
  { pos: 'WS 1',  courseKm:  6.00, watchKm:  6.7, target: '1:28', personalLimit: '1:50', actual: '1:54:36',        vsTarget: '+26:36',   vsLimit: '+4:36'  },
  { pos: 'WS 2',  courseKm: 12.00, watchKm: 13.4, target: '3:06', personalLimit: '3:50', actual: '4:09:19',        vsTarget: '+1:03:19', vsLimit: '+19:19' },
  { pos: 'WS 3',  courseKm: 18.00, watchKm: 20.2, target: '4:52', personalLimit: '5:50', actual: '6:15:42',        vsTarget: '+1:23:42', vsLimit: '+25:42' },
  { pos: 'WS 4',  courseKm: 24.00, watchKm: 26.9, target: '6:42', personalLimit: '7:50', actual: '8:19:41',        vsTarget: '+1:37:41', vsLimit: '+29:41' },
  { pos: 'WS 5',  courseKm: 28.00, watchKm: 31.4, target: '7:54', personalLimit: '9:10', actual: '9:39:06',        vsTarget: '+1:45:06', vsLimit: '+29:06' },
  { pos: 'Finis', courseKm: 31.09, watchKm: 34.8, target: '8:21', personalLimit: '10:00', actual: 'tidak tercapai', vsTarget: '—',       vsLimit: '—'      },
];

// Profil kursus dari GPX, untuk grafik elevasi
const courseProfile = [
  { seg: 'km 1–5',   up: 599, down:  33 },
  { seg: 'km 6–10',  up: 346, down: 184 },
  { seg: 'km 11–15', up: 330, down: 229 },
  { seg: 'km 16–20', up: 254, down: 327 },
  { seg: 'km 21–25', up:  52, down: 417 },
  { seg: 'km 26–30', up: 196, down: 566 },
  { seg: 'km 31',    up:  15, down:  35 },
];
// Titik tertinggi 1.588 m di km 11,5. Titik berhenti: km 29,62.
```

Tabel `weeklyLoad`, `prepGaps`, `gym`, `whatWorked`, dan `actions` tinggal disalin apa adanya dari bagian 6.10 sampai 6.13.

---

## 11. Catatan revisi

Dokumen ini menggantikan `9-update-event-gtr-dnf.md`, yang sempat dibangun di atas asumsi kursus 35 km sebelum GPX masuk. Dua hal dicabut — catat supaya tidak terbawa ke halaman:

1. ~~"Rencana dibuat untuk 30 km padahal kursusnya 35 km, jadi anggaran waktu per pos terlalu longgar 5 km."~~ **Salah.** Kursusnya 31,09 km; asumsi 30 km pada dasarnya benar.
2. ~~"Harist masuk di dalam setiap batas mundur sampai akhir."~~ **Salah.** Itu hasil membandingkan km jam tangan dengan km rencana. Setelah dikonversi ke km kursus, batas mundur sudah terlewat sejak WS 1.

Dua penyebab pendukung yang menggantikan keduanya (bacaan jam dan batas mundur yang tersamarkan) sengaja **tidak** diberi severity `utama` — keduanya merusak informasi, bukan menambah waktu. Penyebab utamanya tetap tiga: kekuatan turunan, sesi panjang, dan volume elevasi.

Angka "kurang 1,81 km" diganti **1,47 km** — kebetulan mirip, tapi dasarnya beda: yang pertama 35 − 33,19 (dua angka yang sama-sama salah), yang sekarang 31,09 − 29,62 dari pencocokan profil ketinggian.

Evaluasi lengkap dengan seluruh perhitungan mentahnya ada di `8-data-aktivitas-lengkap.xlsx`, tab **Evaluasi GTR Ultra** (bagian A–H).
