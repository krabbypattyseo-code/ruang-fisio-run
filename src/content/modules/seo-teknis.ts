import type { Module } from "@/content/types";

export const seoTeknis: Module = {
  slug: "seo-teknis",
  title: "SEO Teknis",
  tagline:
    "Pastikan mesin pencari bisa mengakses, merender, dan memahami situsmu—termasuk saat dibuka di ponsel dengan koneksi lemah.",
  level: "Menengah",
  icon: "Wrench",
  outcomes: [
    "Mengatur robots.txt, sitemap, dan tag kanonik dengan benar",
    "Membaca Core Web Vitals dan tahu penyebab umum tiap metrik",
    "Menambahkan data terstruktur yang valid untuk hasil kaya",
  ],
  lessons: [
    {
      slug: "crawling-dan-indexing",
      title: "Mengendalikan crawling dan indexing",
      summary:
        "robots.txt versus noindex, sitemap yang bersih, dan kapan memakai tag kanonik.",
      minutes: 9,
      blocks: [
        {
          type: "paragraph",
          text: "Dua alat ini sering tertukar, dan kesalahannya mahal: robots.txt mengatur akses, noindex mengatur penyimpanan. Memblokir URL di robots.txt tidak menghapusnya dari indeks—robot jadi tidak bisa membaca perintah noindex-mu.",
        },
        {
          type: "table",
          head: ["Tujuan", "Cara yang benar"],
          rows: [
            ["Halaman jangan muncul di hasil pencarian", "Meta robots noindex, dan biarkan URL bisa di-crawl"],
            ["Hemat crawl budget pada URL filter tak berguna", "Disallow di robots.txt"],
            ["Banyak URL mirip karena parameter", "Tag kanonik ke versi utama"],
            ["Halaman dipindah permanen", "Redirect 301"],
          ],
        },
        {
          type: "code",
          label: "robots.txt yang wajar",
          code: `User-agent: *
Disallow: /keranjang
Disallow: /pencarian?
Allow: /

Sitemap: https://contoh.com/sitemap.xml`,
        },
        { type: "heading", text: "Sitemap yang berguna" },
        {
          type: "list",
          items: [
            "Hanya berisi URL kanonik berstatus 200 yang ingin kamu indeks",
            "Jangan memasukkan URL noindex, redirect, atau halaman error",
            "Perbarui lastmod dengan jujur agar jadi sinyal yang bisa dipercaya",
            "Kirim sekali di Search Console; sisanya cukup jaga tetap akurat",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Kesalahan klasik saat pindah dari staging",
          text: "Situs staging sering memblokir semua robot. Kalau file itu ikut terbawa ke produksi, seluruh situs hilang dari indeks. Cek robots.txt setiap kali rilis besar.",
        },
      ],
      takeaways: [
        "robots.txt = izin akses, noindex = izin tampil di indeks",
        "Sitemap hanya untuk URL kanonik status 200",
        "Kanonik untuk duplikat, 301 untuk pemindahan permanen",
      ],
    },
    {
      slug: "core-web-vitals",
      title: "Core Web Vitals dalam praktik",
      summary:
        "Tiga metrik pengalaman halaman, target angkanya, dan penyebab yang paling sering muncul di situs nyata.",
      minutes: 10,
      blocks: [
        {
          type: "paragraph",
          text: "Core Web Vitals mengukur apa yang dirasakan pengguna: seberapa cepat konten utama terlihat, seberapa responsif halaman saat disentuh, dan seberapa stabil tata letaknya.",
        },
        {
          type: "table",
          head: ["Metrik", "Mengukur", "Target baik", "Penyebab umum"],
          rows: [
            ["LCP", "Waktu elemen terbesar tampil", "≤ 2,5 detik", "Gambar hero besar, font blocking, server lambat"],
            ["INP", "Respons terhadap interaksi", "≤ 200 ms", "JavaScript berat, skrip pihak ketiga"],
            ["CLS", "Pergeseran tata letak", "≤ 0,1", "Gambar tanpa dimensi, iklan/banner yang disuntik"],
          ],
        },
        { type: "heading", text: "Urutan perbaikan yang efisien" },
        {
          type: "list",
          ordered: true,
          items: [
            "Ukur dengan data lapangan lebih dulu (laporan Core Web Vitals di Search Console)",
            "Perbaiki gambar: format modern, ukuran responsif, prioritas untuk hero",
            "Kurangi dan tunda JavaScript pihak ketiga—chat widget dan pixel iklan sering jadi tersangka",
            "Pasang font dengan font-display: swap dan preload font utama",
            "Aktifkan cache serta CDN untuk menekan waktu respons server",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Lab vs lapangan",
          text: "PageSpeed Insights menunjukkan skor uji lab (Lighthouse) dan data pengguna nyata (CrUX). Yang dipakai Google untuk sinyal pengalaman halaman adalah data lapangan, jadi jangan mengejar angka 100 di lab.",
        },
        {
          type: "paragraph",
          text: "Pengalaman halaman adalah sinyal pemecah imbang, bukan pengganti relevansi. Halaman cepat yang tidak menjawab kueri tetap kalah dari halaman lebih lambat yang menjawabnya.",
        },
      ],
      takeaways: [
        "Target: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1",
        "Gambar dan skrip pihak ketiga adalah penyebab paling umum",
        "Prioritaskan data lapangan, bukan skor Lighthouse",
      ],
    },
    {
      slug: "data-terstruktur",
      title: "Data terstruktur dan hasil kaya",
      summary:
        "Schema.org dengan JSON-LD: jenis yang layak dipakai, cara memvalidasi, dan batas ekspektasinya.",
      minutes: 8,
      blocks: [
        {
          type: "paragraph",
          text: "Data terstruktur menerjemahkan isi halaman ke format yang bisa dibaca mesin. Ia tidak langsung menaikkan peringkat, tetapi membuka hasil kaya—bintang ulasan, harga, FAQ, breadcrumb—yang menaikkan CTR.",
        },
        {
          type: "table",
          head: ["Jenis halaman", "Schema yang relevan"],
          rows: [
            ["Artikel/panduan", "Article atau BlogPosting + BreadcrumbList"],
            ["Halaman produk", "Product + Offer + AggregateRating"],
            ["Resep, kursus, acara", "Recipe, Course, Event"],
            ["Bisnis dengan lokasi fisik", "LocalBusiness + OpeningHoursSpecification"],
          ],
        },
        {
          type: "code",
          label: "JSON-LD untuk artikel",
          code: `{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Panduan Core Web Vitals untuk Toko Online",
  "datePublished": "2026-02-10",
  "dateModified": "2026-09-01",
  "author": { "@type": "Person", "name": "Rani Prameswari" },
  "publisher": {
    "@type": "Organization",
    "name": "Contoh Digital",
    "logo": { "@type": "ImageObject", "url": "https://contoh.com/logo.png" }
  }
}`,
        },
        {
          type: "list",
          items: [
            "Pakai JSON-LD; paling mudah dirawat dan direkomendasikan Google",
            "Isinya harus cocok dengan yang terlihat pengguna di halaman",
            "Validasi di Rich Results Test dan Schema Markup Validator",
            "Pantau tab Peningkatan di Search Console untuk error yang muncul kemudian",
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Markup yang tidak sesuai isi halaman berisiko",
          text: "Menandai rating yang tidak ada di halaman bisa membuat hasil kaya dicabut untuk seluruh situs. Tandai hanya apa yang benar-benar ada.",
        },
      ],
      takeaways: [
        "JSON-LD adalah format pilihan untuk schema",
        "Markup harus mencerminkan isi halaman yang terlihat",
        "Hasil kaya menaikkan CTR, bukan peringkat secara langsung",
      ],
    },
  ],
  quiz: [
    {
      id: "teknis-1",
      question: "Kamu ingin satu halaman hilang dari hasil pencarian. Cara yang benar?",
      options: [
        "Disallow di robots.txt",
        "Pasang meta robots noindex dan biarkan URL bisa di-crawl",
        "Hapus dari sitemap saja",
        "Tambahkan tag kanonik ke beranda",
      ],
      answerIndex: 1,
      explanation:
        "Kalau URL diblokir robots.txt, robot tidak bisa membaca perintah noindex sehingga halaman bisa tetap terindeks.",
    },
    {
      id: "teknis-2",
      question: "Target \"baik\" untuk LCP adalah...",
      options: ["≤ 1 detik", "≤ 2,5 detik", "≤ 4 detik", "≤ 6 detik"],
      answerIndex: 1,
      explanation: "LCP ≤ 2,5 detik pada data lapangan dianggap baik; 2,5–4 detik perlu perbaikan.",
    },
    {
      id: "teknis-3",
      question: "CLS buruk paling sering disebabkan oleh...",
      options: [
        "Server lambat",
        "Gambar dan iklan tanpa ruang yang dipesan lebih dulu",
        "Terlalu banyak heading",
        "Sitemap yang besar",
      ],
      answerIndex: 1,
      explanation: "Elemen yang muncul belakangan tanpa dimensi mendorong konten lain sehingga layout bergeser.",
    },
    {
      id: "teknis-4",
      question: "Manfaat utama data terstruktur yang valid?",
      options: [
        "Naik peringkat secara otomatis",
        "Peluang mendapat hasil kaya yang menaikkan CTR",
        "Crawl budget bertambah dua kali",
        "Halaman jadi lebih cepat",
      ],
      answerIndex: 1,
      explanation: "Schema membuka tampilan hasil yang lebih menonjol; peringkat tetap ditentukan faktor lain.",
    },
    {
      id: "teknis-5",
      question: "Isi sitemap.xml yang benar adalah...",
      options: [
        "Semua URL termasuk redirect dan noindex",
        "Hanya URL kanonik berstatus 200 yang ingin diindeks",
        "Hanya beranda",
        "URL kompetitor untuk perbandingan",
      ],
      answerIndex: 1,
      explanation: "Sitemap kotor mengirim sinyal membingungkan dan membuang crawl budget.",
    },
  ],
};
