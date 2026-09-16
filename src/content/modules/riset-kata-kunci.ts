import type { Module } from "@/content/types";

export const risetKataKunci: Module = {
  slug: "riset-kata-kunci",
  title: "Riset Kata Kunci",
  tagline:
    "Temukan kueri yang benar-benar dicari orang, saring yang realistis, lalu petakan ke halaman tanpa saling makan.",
  level: "Pemula",
  icon: "Search",
  outcomes: [
    "Membangun daftar kata kunci dari nol dengan sumber gratis",
    "Membaca volume, kesulitan, dan potensi bisnis sebuah kueri",
    "Memetakan satu kelompok kata kunci ke satu halaman untuk menghindari kanibalisasi",
  ],
  lessons: [
    {
      slug: "menemukan-ide-kata-kunci",
      title: "Menemukan ide kata kunci tanpa alat mahal",
      summary:
        "Tujuh sumber ide yang bisa dipakai hari ini, termasuk yang sudah ada di dalam datamu sendiri.",
      minutes: 8,
      blocks: [
        {
          type: "paragraph",
          text: "Riset kata kunci dimulai dari bahasa yang dipakai pelangganmu, bukan dari kotak pencarian alat berbayar. Kumpulkan dulu sebanyak mungkin frasa mentah; penyaringan datang belakangan.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Autocomplete Google: ketik topikmu lalu tambahkan huruf a–z untuk memunculkan variasi",
            "People Also Ask: sumber terbaik untuk pertanyaan turunan dan subjudul",
            "Related searches di dasar halaman hasil",
            "Search Console → laporan kueri: kata kunci yang sudah memberi impresi tapi posisi 8–30 (peluang paling cepat)",
            "Tim sales/CS: pertanyaan yang paling sering masuk biasanya belum ada halamannya",
            "Forum dan komunitas: Reddit, Kaskus, grup Facebook, kolom komentar YouTube",
            "Kompetitor: judul menu, nama kategori, dan judul artikel mereka",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Peluang tercepat biasanya sudah kamu miliki",
          text: "Di Search Console, filter kueri dengan posisi rata-rata 8–30 dan impresi tinggi. Halaman itu sudah dianggap relevan; memperbaikinya sering lebih cepat berbuah daripada menulis artikel baru dari nol.",
        },
        { type: "heading", text: "Kelompokkan sebelum menilai" },
        {
          type: "paragraph",
          text: "Setelah punya 100–300 frasa, satukan yang maknanya sama. \"Cara riset keyword\", \"tutorial riset keyword\", dan \"riset keyword untuk pemula\" umumnya satu halaman—bukan tiga. Satu kelompok = satu calon halaman, dengan satu frasa utama sebagai nama kelompok.",
        },
      ],
      takeaways: [
        "Kumpulkan ide dari SERP, data internal, dan percakapan pelanggan sebelum memakai alat berbayar",
        "Kueri posisi 8–30 di Search Console adalah peluang paling murah",
        "Satukan frasa bermakna sama menjadi satu kelompok/halaman",
      ],
    },
    {
      slug: "membaca-metrik-kata-kunci",
      title: "Membaca metrik: volume, kesulitan, nilai bisnis",
      summary:
        "Kenapa volume besar sering menipu, cara menilai kesulitan tanpa alat berbayar, dan kerangka skor sederhana.",
      minutes: 9,
      blocks: [
        {
          type: "paragraph",
          text: "Angka di alat riset adalah estimasi, bukan fakta. Yang penting adalah perbandingan relatif antar kandidat dan seberapa dekat kueri itu dengan uang.",
        },
        {
          type: "table",
          head: ["Metrik", "Artinya", "Jebakannya"],
          rows: [
            ["Volume pencarian", "Perkiraan jumlah pencarian per bulan", "Rata-rata tahunan; kueri musiman terlihat datar"],
            ["Keyword difficulty", "Perkiraan sulitnya masuk 10 besar", "Hanya menghitung tautan, bukan kecocokan intent"],
            ["Cost per click", "Harga iklan per klik", "Proksi bagus untuk nilai komersial sebuah kueri"],
            ["Potensi bisnis", "Seberapa dekat ke produkmu", "Metrik paling penting dan paling sering dilupakan"],
          ],
        },
        { type: "heading", text: "Menilai kesulitan secara manual" },
        {
          type: "list",
          items: [
            "Siapa yang mengisi 10 besar? Kalau semuanya marketplace dan media nasional, biaya masuknya tinggi",
            "Apakah ada hasil dari situs kecil atau forum? Itu tanda celah",
            "Seberapa dalam kontennya? Kalau semuanya tipis, kamu bisa menang dengan kedalaman",
            "Apakah hasil teratas benar-benar menjawab kueri? Kalau tidak, itu peluang",
          ],
        },
        { type: "heading", text: "Skor prioritas sederhana" },
        {
          type: "code",
          label: "Rumus penentu urutan kerja",
          code: `skor = (nilai_bisnis * 3) + (potensi_trafik * 2) - (kesulitan * 2)

nilai_bisnis   : 1–5  (5 = pembaca siap membeli)
potensi_trafik : 1–5  (5 = volume besar untuk nichemu)
kesulitan      : 1–5  (5 = SERP dikuasai situs raksasa)`,
        },
        {
          type: "callout",
          variant: "info",
          title: "Kueri panjang lebih ramah untuk situs baru",
          text: "\"Jasa audit seo untuk toko online\" mungkin hanya 70 pencarian per bulan, tetapi konversinya jauh lebih tinggi dan persaingannya jauh lebih sepi daripada \"jasa seo\".",
        },
      ],
      takeaways: [
        "Volume adalah estimasi; pakai untuk membandingkan, bukan meramal trafik",
        "Nilai kesulitan dengan melihat SERP langsung, bukan hanya skor alat",
        "Beri bobot terbesar pada kedekatan kueri dengan produkmu",
      ],
    },
    {
      slug: "memetakan-kata-kunci",
      title: "Memetakan kata kunci ke halaman",
      summary:
        "Membuat keyword map, mengenali kanibalisasi, dan memutuskan kapan menggabungkan halaman.",
      minutes: 7,
      blocks: [
        {
          type: "paragraph",
          text: "Keyword map adalah satu tabel yang menjawab: halaman mana bertanggung jawab atas kelompok kata kunci mana. Tanpa itu, kamu akan menulis tiga artikel untuk topik yang sama dan membuat Google bingung memilih.",
        },
        {
          type: "table",
          head: ["URL", "Kata kunci utama", "Intent", "Status"],
          rows: [
            ["/panduan/riset-keyword", "cara riset keyword", "Informasional", "Terbit"],
            ["/panduan/keyword-difficulty", "keyword difficulty adalah", "Informasional", "Draf"],
            ["/layanan/audit-seo", "jasa audit seo", "Transaksional", "Perlu revisi"],
          ],
        },
        { type: "heading", text: "Gejala kanibalisasi" },
        {
          type: "list",
          items: [
            "Dua URL-mu bergantian muncul untuk kueri yang sama di Search Console",
            "Posisi naik-turun tanpa pola padahal tidak ada perubahan",
            "Halaman yang kamu anggap utama justru bukan yang ditampilkan Google",
          ],
        },
        { type: "heading", text: "Cara menyelesaikannya" },
        {
          type: "list",
          ordered: true,
          items: [
            "Pilih satu URL sebagai pemenang—biasanya yang sudah punya tautan dan impresi terbanyak",
            "Gabungkan bagian terbaik dari halaman lain ke pemenang",
            "Pasang redirect 301 dari halaman yang dipensiunkan",
            "Perbarui internal link agar menunjuk ke URL pemenang",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Jangan hapus tanpa redirect",
          text: "Menghapus URL lama tanpa 301 membuang seluruh sinyal tautan yang sudah terkumpul dan meninggalkan 404 di hasil pencarian.",
        },
      ],
      takeaways: [
        "Satu kelompok kata kunci = satu halaman penanggung jawab",
        "Kanibalisasi terlihat dari URL yang bertukar posisi untuk kueri sama",
        "Gabungkan lalu 301, jangan hapus mentah-mentah",
      ],
    },
  ],
  quiz: [
    {
      id: "riset-1",
      question: "Laporan Search Console menunjukkan kueri dengan 4.000 impresi di posisi rata-rata 12. Langkah paling efisien?",
      options: [
        "Menulis artikel baru untuk kueri itu",
        "Memperbaiki dan memperdalam halaman yang sudah muncul",
        "Mengabaikannya karena belum halaman satu",
        "Memasang iklan untuk kueri itu",
      ],
      answerIndex: 1,
      explanation:
        "Halaman itu sudah dianggap relevan. Menyempurnakannya biasanya jauh lebih cepat berbuah daripada memulai dari nol.",
    },
    {
      id: "riset-2",
      question: "Mana yang paling menentukan saat memilih kata kunci untuk bisnis kecil?",
      options: [
        "Volume pencarian terbesar",
        "Skor kesulitan terendah saja",
        "Kedekatan kueri dengan produk yang kamu jual",
        "Jumlah kata dalam kueri",
      ],
      answerIndex: 2,
      explanation:
        "Trafik yang tidak pernah membeli tidak membayar tagihan. Nilai bisnis harus dapat bobot terbesar.",
    },
    {
      id: "riset-3",
      question: "Dua artikelmu bergantian muncul untuk kueri yang sama dan posisinya naik-turun. Ini gejala...",
      options: ["Google update", "Kanibalisasi kata kunci", "Masalah Core Web Vitals", "Penalti manual"],
      answerIndex: 1,
      explanation:
        "Google tidak yakin halaman mana yang paling relevan. Gabungkan keduanya ke satu URL dan pasang redirect 301.",
    },
    {
      id: "riset-4",
      question: "Kenapa skor keyword difficulty tidak boleh dipercaya sepenuhnya?",
      options: [
        "Karena selalu terlalu rendah",
        "Karena umumnya hanya menimbang profil tautan, bukan kecocokan intent",
        "Karena hanya berlaku untuk bahasa Inggris",
        "Karena diperbarui setiap jam",
      ],
      answerIndex: 1,
      explanation:
        "SERP dengan hasil yang tidak benar-benar menjawab kueri bisa dimenangkan konten lebih baik, meski skor kesulitannya tinggi.",
    },
  ],
};
