import type { Module } from "@/content/types";

export const seoOnPage: Module = {
  slug: "seo-on-page",
  title: "SEO On-Page",
  tagline:
    "Rapikan elemen di dalam halaman: judul, struktur, tautan internal, dan gambar—bagian yang paling kamu kendalikan.",
  level: "Menengah",
  icon: "FileText",
  outcomes: [
    "Menulis title tag dan meta description yang mengundang klik tanpa clickbait",
    "Menyusun struktur heading yang bisa dibaca manusia maupun mesin",
    "Memakai internal link dan optimasi gambar sebagai pengungkit peringkat",
  ],
  lessons: [
    {
      slug: "title-dan-meta-description",
      title: "Title tag dan meta description",
      summary:
        "Dua baris teks yang menentukan apakah orang mengklik hasilmu, plus pola penulisan yang bisa langsung dipakai.",
      minutes: 8,
      blocks: [
        {
          type: "paragraph",
          text: "Title tag masih salah satu sinyal on-page terkuat, dan meta description—meski bukan faktor peringkat—menentukan rasio klik. Keduanya adalah iklan gratis untuk halamanmu.",
        },
        { type: "heading", text: "Aturan praktis title tag" },
        {
          type: "list",
          items: [
            "Panjang 50–60 karakter agar tidak terpotong di desktop",
            "Kata kunci utama di awal bila terasa natural",
            "Satu title unik per halaman; jangan pakai template yang sama untuk semua",
            "Tambahkan pembeda: angka, tahun, lokasi, atau hasil yang dijanjikan",
          ],
        },
        {
          type: "code",
          label: "Contoh perbaikan",
          code: `Sebelum : Blog - Artikel - Tips SEO | PT Contoh Digital Indonesia
Sesudah : Panduan SEO On-Page 2026: 9 Langkah Praktis | Contoh Digital

Sebelum : Layanan
Sesudah : Jasa Audit SEO untuk Toko Online (Laporan 14 Hari)`,
        },
        { type: "heading", text: "Meta description yang bekerja" },
        {
          type: "list",
          items: [
            "120–155 karakter, satu kalimat janji + satu kalimat bukti",
            "Sebut siapa pembacanya agar terasa relevan",
            "Hindari mengulang title kata demi kata",
            "Google boleh menulis ulang deskripsimu—tetap tulis yang terbaik untuk kueri utama",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Uji dengan data yang kamu punya",
          text: "Ambil halaman dengan impresi tinggi tapi CTR rendah di Search Console. Ubah title-nya, tandai tanggalnya, lalu bandingkan CTR 28 hari sebelum dan sesudah.",
        },
      ],
      takeaways: [
        "Title 50–60 karakter, unik, kata kunci di depan bila natural",
        "Meta description tidak menaikkan peringkat tapi menaikkan CTR",
        "Halaman impresi tinggi + CTR rendah adalah kandidat tes pertama",
      ],
    },
    {
      slug: "struktur-konten",
      title: "Struktur heading dan keterbacaan",
      summary:
        "Menyusun H1–H3 yang logis, memakai pola jawaban-dulu, dan memenuhi kebutuhan pembaca yang membaca cepat.",
      minutes: 7,
      blocks: [
        {
          type: "paragraph",
          text: "Pembaca memindai sebelum membaca. Struktur yang jelas membuat mereka menemukan jawaban lebih cepat—dan membantu mesin pencari memahami bagian mana yang menjawab pertanyaan mana.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Satu H1 per halaman, menyebut topik utama",
            "H2 untuk pertanyaan atau tahap besar; H3 untuk rinciannya",
            "Jangan melompat dari H2 ke H4 hanya demi ukuran font",
            "Tulis heading sebagai frasa yang berarti, bukan \"Pendahuluan\" dan \"Penutup\"",
          ],
        },
        { type: "heading", text: "Pola jawaban-dulu" },
        {
          type: "paragraph",
          text: "Letakkan jawaban langsung di dua kalimat pertama setelah heading, lalu jelaskan detailnya. Pola ini menaikkan peluang terpilih untuk featured snippet dan cocok dengan cara orang membaca di ponsel.",
        },
        {
          type: "code",
          label: "Struktur artikel yang sehat",
          code: `H1  Panduan Core Web Vitals untuk Pemilik Toko Online
    ├─ Ringkasan 3 poin (jawaban cepat)
    ├─ H2 Apa itu LCP dan berapa targetnya
    │    └─ H3 Penyebab LCP lambat di halaman produk
    ├─ H2 Cara mengukur dengan PageSpeed Insights
    └─ H2 Checklist perbaikan mingguan`,
        },
        {
          type: "callout",
          variant: "warning",
          title: "Panjang bukan tujuan",
          text: "Menambah kata tanpa menambah informasi menurunkan kualitas halaman. Ukurannya: setiap paragraf harus membuat pembaca lebih dekat ke keputusan.",
        },
      ],
      takeaways: [
        "Satu H1, hierarki H2–H3 yang tidak melompat",
        "Jawab dulu dalam dua kalimat, baru jelaskan",
        "Tambah kedalaman, bukan jumlah kata",
      ],
    },
    {
      slug: "internal-link-dan-url",
      title: "Internal link, URL, dan anchor text",
      summary:
        "Menyalurkan otoritas ke halaman prioritas dengan tautan internal yang disengaja, plus pola URL yang bertahan lama.",
      minutes: 8,
      blocks: [
        {
          type: "paragraph",
          text: "Internal link adalah pengungkit yang paling sering disia-siakan. Ia gratis, sepenuhnya di bawah kendalimu, dan langsung memberi tahu mesin pencari halaman mana yang kamu anggap paling penting.",
        },
        { type: "heading", text: "Prinsip kerja" },
        {
          type: "list",
          items: [
            "Dari halaman yang sudah kuat, tautkan ke halaman yang ingin kamu dorong",
            "Pakai anchor text deskriptif: \"panduan riset kata kunci\", bukan \"klik di sini\"",
            "Setiap halaman baru sebaiknya menerima minimal tiga tautan internal",
            "Halaman penting jangan lebih dari tiga klik dari beranda",
          ],
        },
        { type: "heading", text: "Pola URL yang menua dengan baik" },
        {
          type: "code",
          label: "Bandingkan",
          code: `Buruk : /p?id=8823&cat=12
Buruk : /2024/03/12/artikel-seo-terbaru-banget-update
Baik  : /panduan/seo-on-page
Baik  : /jasa/audit-seo-toko-online`,
        },
        {
          type: "table",
          head: ["Kebiasaan", "Alasan"],
          rows: [
            ["Huruf kecil dan tanda hubung", "Menghindari duplikat karena beda kapitalisasi"],
            ["Tanpa tahun di URL artikel", "Konten bisa diperbarui tanpa mengubah URL"],
            ["Maksimal 2 tingkat folder", "Struktur mudah dipahami dan dirawat"],
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Audit 15 menit",
          text: "Daftar lima halaman yang paling menghasilkan uang. Cek berapa tautan internal yang mereka terima. Kalau kurang dari tiga, tambahkan dari artikel terpopulermu—ini pekerjaan sekali duduk dengan efek nyata.",
        },
      ],
      takeaways: [
        "Tautkan dari halaman kuat ke halaman prioritas dengan anchor deskriptif",
        "URL pendek, huruf kecil, tanpa tanggal, maksimal dua tingkat",
        "Halaman penting maksimal tiga klik dari beranda",
      ],
    },
    {
      slug: "optimasi-gambar",
      title: "Optimasi gambar dan media",
      summary:
        "Format modern, alt text yang benar, lazy loading, dan dimensi eksplisit agar layout tidak bergeser.",
      minutes: 6,
      blocks: [
        {
          type: "paragraph",
          text: "Gambar biasanya penyumbang terbesar berat halaman. Memperbaikinya menaikkan Core Web Vitals, aksesibilitas, dan sedikit trafik dari Google Images sekaligus.",
        },
        {
          type: "list",
          items: [
            "Pakai WebP atau AVIF; hemat 25–50% dibanding JPEG pada kualitas setara",
            "Selalu tulis width dan height agar tidak terjadi pergeseran layout (CLS)",
            "loading=\"lazy\" untuk gambar di bawah layar pertama, jangan untuk gambar hero",
            "Nama file deskriptif: sepatu-lari-pria-biru.webp, bukan IMG_4821.jpg",
          ],
        },
        {
          type: "code",
          label: "Markup yang sudah benar",
          code: `<img
  src="/gambar/sepatu-lari-pria-biru.webp"
  width="1200" height="800"
  loading="lazy" decoding="async"
  alt="Sepatu lari pria warna biru dilihat dari samping"
/>`,
        },
        { type: "heading", text: "Menulis alt text" },
        {
          type: "list",
          items: [
            "Jelaskan isi gambar untuk orang yang tidak bisa melihatnya",
            "Gambar dekoratif murni boleh memakai alt kosong (alt=\"\")",
            "Jangan menumpuk kata kunci; satu kalimat wajar sudah cukup",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Di Next.js",
          text: "Komponen next/image menangani format modern, ukuran responsif, dan lazy loading secara otomatis. Berikan prop priority hanya pada satu gambar hero per halaman.",
        },
      ],
      takeaways: [
        "WebP/AVIF + dimensi eksplisit = halaman ringan dan stabil",
        "Alt text mendeskripsikan gambar, bukan menampung kata kunci",
        "Lazy load semua gambar kecuali yang tampil pertama",
      ],
    },
  ],
  quiz: [
    {
      id: "onpage-1",
      question: "Panjang title tag yang aman agar tidak terpotong di hasil desktop?",
      options: ["20–30 karakter", "50–60 karakter", "80–100 karakter", "Tidak ada batas"],
      answerIndex: 1,
      explanation: "Google memotong berdasarkan lebar piksel; 50–60 karakter adalah rentang aman praktis.",
    },
    {
      id: "onpage-2",
      question: "Meta description berpengaruh langsung pada...",
      options: ["Peringkat", "Rasio klik (CTR)", "Kecepatan muat", "Anggaran crawl"],
      answerIndex: 1,
      explanation: "Deskripsi bukan faktor peringkat, tapi menentukan seberapa menarik hasilmu untuk diklik.",
    },
    {
      id: "onpage-3",
      question: "Anchor text internal yang paling membantu adalah...",
      options: ["\"klik di sini\"", "\"baca selengkapnya\"", "\"panduan riset kata kunci\"", "URL mentah"],
      answerIndex: 2,
      explanation: "Anchor deskriptif memberi konteks tentang isi halaman tujuan kepada pembaca dan mesin pencari.",
    },
    {
      id: "onpage-4",
      question: "Kenapa width dan height pada tag img penting?",
      options: [
        "Mengurangi ukuran file",
        "Mencegah pergeseran layout yang merusak skor CLS",
        "Menaikkan resolusi gambar",
        "Mempercepat crawling",
      ],
      answerIndex: 1,
      explanation: "Browser dapat menyiapkan ruang sebelum gambar selesai dimuat sehingga konten tidak melompat.",
    },
    {
      id: "onpage-5",
      question: "Gambar hero di atas layar sebaiknya...",
      options: [
        "Memakai loading=\"lazy\"",
        "Dimuat dengan prioritas tinggi, tanpa lazy loading",
        "Disembunyikan di mobile",
        "Diubah ke GIF",
      ],
      answerIndex: 1,
      explanation: "Lazy loading pada gambar hero menunda elemen terbesar di viewport dan memperburuk LCP.",
    },
  ],
};
