@AGENTS.md

# Alur update website (preferensi pemilik)

- Vercel otomatis deploy **Production** setiap ada commit di `main`
  (https://ruang-fisio-run.vercel.app/). Branch lain hanya jadi Preview.
- Kalau pemilik minta update website (tambah/edit/hapus produk, teks, dll.),
  **commit dan push langsung ke `main`**. Tidak perlu PR atau branch terpisah.
- Sebelum push, jalankan `npm run build` dulu (membuat tipe `PageProps`/`LayoutProps`),
  baru `npm run typecheck`. Keduanya wajib lolos supaya Production tidak rusak.
  `npm run lint` masih punya 2 error lama (`bottom-nav.tsx`, `programs.ts`); pastikan saja
  tidak ada error lint baru.
- Sesi lari COROS baru: simpan file mentah di `data/raw/`, lalu tambahkan sesinya
  di bagian atas `src/data/sessions.manual.ts` dengan format yang sama.
- Produk Gear ada di `src/data/gear.ts`, fotonya disimpan sebagai `.webp` di `public/gear/`.
  Ikuti format entri yang sudah ada.
- Pakai panggilan aku–kamu, dan sampaikan ringkasan dalam bentuk tabel.
