# Section "Programs" — Ruang Fisio Run

Dokumen implementasi untuk menambahkan section **Programs** ke `ruang-fisio-run.vercel.app`.
Konten sudah final di level materi. Tugas di Cursor tinggal memasang data ini ke halaman Next.js.

Terakhir diperbarui: 20 September 2026

---

## 1. Isi folder ini

| File | Fungsi |
|---|---|
| `programs.json` | Sumber utama seluruh konten. Kalau ada revisi materi, edit di sini. |
| `programs.ts` | Hasil generate dari JSON, sudah bertipe TypeScript. **Ini yang di-copy ke repo.** |
| `reviewer-awalin.jpg` | Foto fisioterapis peninjau, 400×400. Taruh di `public/`. |
| `preview.template.html` | Template preview (bukan untuk produksi, hanya referensi tampilan). |
| `programs-preview.html` | Preview jadi. Buka di browser untuk melihat target tampilannya. |

Preview online: https://claude.ai/artifact/6xq1kYVCgxNLbfaPSqEKqH

Kalau `programs.json` diedit, generate ulang `programs.ts` dan preview dengan:

```bash
python3 - <<'EOF'
import json, base64
data = json.load(open('programs.json'))
photo = 'data:image/jpeg;base64,' + base64.b64encode(open('reviewer-awalin.jpg','rb').read()).decode()
tpl = open('preview.template.html').read()
open('programs-preview.html','w').write(tpl.replace('__DATA__', json.dumps(data, ensure_ascii=False)).replace('__PHOTO__', photo))
ts = open('programs.ts').read()
head, sep, _ = ts.partition('export const programsContent: ProgramsContent = ')
open('programs.ts','w').write(head + sep + json.dumps(data, ensure_ascii=False, indent=2) + ';\n')
EOF
```

---

## 2. Struktur konten

```
Programs
├── Profil fisioterapis peninjau      ← tampil paling atas, sebelum judul section
├── Sport
│   ├── Running Programs
│   │   ├── Langkah untuk Pemula
│   │   ├── Pemanasan & Pendinginan
│   │   └── Strength Training Programs
│   ├── Hypertrophy Muscle
│   │   ├── Cara Otot Tumbuh
│   │   ├── Variabel Latihan
│   │   ├── Program Pemula
│   │   └── Nutrisi & Pemulihan
│   └── Hiking Program
│       ├── Kenali Beban Medan
│       └── Program 8 Minggu
└── Injury
    ├── Intro: aturan nyeri 3/10 + POLICE
    └── 6 cedera: runners-knee, achilles, shin-splints, plantar, it-band, ankle-sprain
```

---

## 3. Route

Mengikuti pola route yang sudah ada (`/gear`, `/event`, `/dashboard`).

| Route | Isi |
|---|---|
| `/programs` | Profil peninjau, judul section, kartu Sport & Injury |
| `/programs/sport` | Grid pilihan olahraga + daftar kartu program |
| `/programs/sport/[programId]` | Detail program: meta, badge review, daftar modul |
| `/programs/sport/[programId]/[moduleId]` | Isi modul |
| `/programs/injury` | Aturan nyeri, POLICE, daftar cedera |
| `/programs/injury/[injuryId]` | Detail satu cedera |

Semua `id` diambil dari `programs.ts`, jadi `generateStaticParams` bisa langsung memetakan dari data. Tidak ada fetch ke API, semua statis.

Tambahkan juga tombol **Programs** di halaman Home, tepat di bawah tombol **Gear**, dengan gaya tombol yang sama.

---

## 4. Data model

Tipe lengkap ada di bagian atas `programs.ts`. Ringkasnya:

```ts
programsContent = {
  meta, page, reviewer,
  categories: [{ id: "sport" | "injury", title, description, review }],
  programs: [{ id, category, icon, title, shortTitle, eyebrow, summary,
               meta: { level, duration, frequency }, review, modules: [{ id, title, summary, sections }] }],
  injuryIntro: { rules: string[], police: { letter, name, body }[] },
  injuries: [{ id, title, aka, area, summary, review,
               symptoms, causes, firstSteps, exercises, returnToRun }],
  sources: string[]
}
```

### Tipe section di dalam modul

Satu komponen renderer menangani lima tipe ini:

| `type` | Field | Render |
|---|---|---|
| `text` | `heading?`, `body` | Judul + paragraf |
| `list` | `heading?`, `items[]`, `note?` | Bullet list |
| `steps` | `heading?`, `note?`, `items[{ name, dose, cue }]` | List bernomor. `dose` ditonjolkan di kanan nama. Kalau item cuma satu, nomor disembunyikan. |
| `table` | `heading?`, `note?`, `columns[]`, `rows[][]` | Tabel, bungkus dengan `overflow-x: auto` |
| `callout` | `tone: "info" \| "warn"`, `body` | Kotak berwarna, `info` teal dan `warn` merah |

Urutan section wajib mengikuti urutan array. Jangan disortir ulang.

---

## 5. Logika badge review

```ts
review: { status: "pending" | "approved", reviewer: string | null, date: string | null }
```

- `pending` → chip oranye, ikon jam, teks **"Menunggu review fisio"**
- `approved` → chip teal, ikon centang, teks **"Approved by Fisio · {reviewer}"**

Saat ini **semua konten berstatus `pending`**. Jangan hardcode badge jadi approved. Status baru diubah di `programs.json` setelah fisioterapis benar-benar mereview.

Badge muncul di: kartu kategori, kartu program, halaman detail program, kartu cedera, dan halaman detail cedera.

---

## 6. Styling

Pakai token yang sudah ada di `globals.css`, jangan bikin warna baru:

| Peran | Token |
|---|---|
| Judul, aksen utama | `--brand-teal` `#005a64` |
| Eyebrow, aksen sekunder | `--brand-cyan` `#139cab` |
| Badge pending | `--brand-clay` `#b4703a` di atas `#f7eee6` |
| Callout warning | `--brand-rose` `#c04a54` di atas `#fbeef0` |
| Kartu | `--card`, border `--border`, radius 14px |
| Chip / pill | radius 26px, font 11px, weight 500 |

Font tetap Figtree. Anatomi kartu mengikuti kartu di halaman **Gear**: thumbnail kiri, eyebrow uppercase, judul, lalu baris bawah berisi badge di kiri dan "Details ›" di kanan.

Ikon program (`icon` di data): `running`, `dumbbell`, `mountain`. Ikon kategori: `sport`, `injury`. Ikon cedera dipetakan per area (lutut, kaki, tulang kering). Semua ikon SVG inline ada di `preview.template.html`, bagian konstanta `ICONS` — boleh disalin atau diganti dengan icon set yang dipakai repo.

---

## 7. Yang perlu dikerjakan

- [ ] Copy `programs.ts` ke `src/data/programs.ts`
- [ ] Copy `reviewer-awalin.jpg` ke `public/reviewer-awalin.jpg`
- [ ] Buat komponen: `ReviewBadge`, `ProgramCard`, `SportTile`, `SectionRenderer`, `ReviewerProfile`
- [ ] Buat 6 route di atas, pakai `generateStaticParams` dari data
- [ ] Tambah tombol **Programs** di Home, di bawah tombol Gear
- [ ] Tambah item **Programs** di bottom navigation
- [ ] Metadata per halaman: title dan description dari `title` + `summary` di data
- [ ] Cek tampilan di lebar 375px, tabel harus bisa di-scroll horizontal tanpa membuat halaman ikut geser

---

## 8. Sebelum tayang publik

1. **Review fisioterapis.** Seluruh materi belum ditinjau. Yang paling perlu dicek karena disusun sendiri, bukan kutipan buku: jadwal walk–run 12 minggu, progresi hiking 8 minggu, angka set/repetisi di modul strength, dan tambahan pemanasan khusus trail.
2. **Izin Awalin** untuk menampilkan foto, nama, tempat praktik, dan riwayat pendidikannya. IPK dan judul thesis sudah dihapus atas permintaan.
3. **Disclaimer.** Halaman detail cedera sudah memuat catatan bahwa isinya edukasi, bukan diagnosis. Jangan dihapus.

---

## 9. Prompt siap tempel untuk Cursor

```
Tambahkan section "Programs" ke project Next.js ini.

Data: src/data/programs.ts (sudah ada, jangan diubah isinya).
Foto: public/reviewer-awalin.jpg

Buat route berikut dengan App Router, semua statis via generateStaticParams:
- /programs                                   → profil peninjau (paling atas), judul section, kartu Sport & Injury
- /programs/sport                             → grid pilihan olahraga + daftar kartu program
- /programs/sport/[programId]                 → meta program, badge review, daftar modul
- /programs/sport/[programId]/[moduleId]      → isi modul
- /programs/injury                            → injuryIntro.rules, injuryIntro.police, daftar cedera
- /programs/injury/[injuryId]                 → gejala, penyebab, penanganan awal, latihan, kembali lari

Buat komponen SectionRenderer yang menangani section.type: text, list, steps, table, callout.
steps menampilkan name + dose + cue. table dibungkus container overflow-x auto.
callout tone "info" memakai brand-teal dan "warn" memakai brand-rose.

Buat komponen ReviewBadge dari field review:
- status "pending"  → chip oranye brand-clay, ikon jam, "Menunggu review fisio"
- status "approved" → chip teal, ikon centang, "Approved by Fisio · {reviewer}"

Ikuti style halaman /gear: kartu putih, border --border, radius 14px, eyebrow uppercase
warna brand-cyan, judul brand-teal, chip radius 26px, font Figtree. Jangan menambah warna
baru di luar token yang ada di globals.css.

Terakhir, tambahkan tombol "Programs" di halaman Home tepat di bawah tombol "Gear",
dengan gaya yang sama, dan tambahkan item Programs di bottom navigation.
```
