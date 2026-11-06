@AGENTS.md

# Alur update website (preferensi pemilik)

- Vercel otomatis deploy **Production** setiap ada commit di `main`
  (https://ruang-fisio-run.vercel.app/). Branch lain hanya jadi Preview.
- Kalau pemilik minta update website (tambah/edit/hapus produk, teks, dll.),
  **commit dan push langsung ke `main`**. Tidak perlu PR atau branch terpisah.
- Sebelum push, jalankan `npm run typecheck`, `npm run lint`, dan `npm run build`,
  lalu pastikan semuanya lolos supaya Production tidak rusak.
- Produk Gear ada di `src/data/gear.ts`, fotonya disimpan sebagai `.webp` di `public/gear/`.
  Ikuti format entri yang sudah ada.
- Pakai panggilan aku–kamu, dan sampaikan ringkasan dalam bentuk tabel.
