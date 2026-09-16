import type { Module } from "@/content/types";

export const fondasiSeo: Module = {
  slug: "fondasi-seo",
  title: "Fondasi SEO",
  tagline:
    "Pahami cara mesin pencari menemukan, menilai, dan menampilkan halaman sebelum menyentuh taktik apa pun.",
  level: "Pemula",
  icon: "Compass",
  outcomes: [
    "Menjelaskan alur crawling, indexing, dan ranking dengan bahasa sendiri",
    "Membedakan SEO on-page, teknis, dan off-page beserta porsi kerjanya",
    "Menentukan search intent sebuah kata kunci dari hasil pencarian",
  ],
  lessons: [
    {
      slug: "cara-kerja-mesin-pencari",
      title: "Cara kerja mesin pencari",
      summary:
        "Tiga tahap yang dilewati setiap halaman sebelum muncul di hasil pencarian, dan di mana halaman biasanya tersangkut.",
      minutes: 8,
      blocks: [
        {
          type: "paragraph",
          text: "Mesin pencari bukan bola kristal. Ia program yang menjelajah web, menyimpan salinan halaman, lalu mengurutkan salinan itu saat ada orang mengetik sesuatu di kotak pencarian. Kalau salah satu dari tiga tahap ini gagal, halamanmu tidak akan pernah muncul—sebagus apa pun tulisannya.",
        },
        { type: "heading", text: "1. Crawling: robot menemukan halamanmu" },
        {
          type: "paragraph",
          text: "Googlebot berpindah dari satu tautan ke tautan lain. Halaman yang tidak ditautkan dari mana pun dan tidak ada di sitemap praktis tidak terlihat. Inilah alasan halaman baru yang hanya dibagikan lewat pesan pribadi sering tidak terindeks berminggu-minggu.",
        },
        { type: "heading", text: "2. Indexing: halaman disimpan dan dipahami" },
        {
          type: "paragraph",
          text: "Setelah diambil, halaman dirender (termasuk JavaScript-nya), lalu isinya diurai: topik apa, entitas apa yang disebut, versi mana yang kanonik bila ada duplikat. Halaman bisa di-crawl tapi tidak diindeks—misalnya karena ditandai noindex, dianggap duplikat, atau isinya terlalu tipis.",
        },
        { type: "heading", text: "3. Ranking: urutan ditentukan per kueri" },
        {
          type: "paragraph",
          text: "Tidak ada \"peringkat 3\" yang permanen. Urutan dihitung ulang untuk setiap kueri, per perangkat, per lokasi, dan dipengaruhi personalisasi. Karena itu laporan peringkat harus dibaca sebagai tren, bukan angka mutlak.",
        },
        {
          type: "table",
          head: ["Tahap", "Pertanyaan yang dijawab", "Alat diagnosis"],
          rows: [
            ["Crawling", "Apakah robot bisa mengakses URL ini?", "Google Search Console → Pengaturan → Statistik crawl"],
            ["Indexing", "Apakah URL ini tersimpan di indeks?", "Search Console → Pengindeksan halaman / URL Inspection"],
            ["Ranking", "Untuk kueri apa URL ini muncul?", "Search Console → Hasil penelusuran (query & posisi)"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Uji cepat 30 detik",
          text: "Ketik site:domainmu.com di Google. Kalau halaman pentingmu tidak muncul di situ, masalahmu ada di crawling/indexing—bukan di pemilihan kata kunci.",
        },
        {
          type: "paragraph",
          text: "Urutan perbaikannya selalu sama: pastikan bisa di-crawl, pastikan terindeks, baru bicara peringkat. Banyak orang melompat ke tahap tiga dan bingung kenapa usahanya tidak berbuah.",
        },
      ],
      takeaways: [
        "Crawl → index → rank; kegagalan di tahap awal membuat tahap berikutnya tidak relevan",
        "Halaman tanpa tautan masuk sulit ditemukan robot",
        "Peringkat dihitung per kueri, jadi baca sebagai tren bukan angka tetap",
      ],
    },
    {
      slug: "tiga-pilar-seo",
      title: "Tiga pilar SEO dan porsi kerjanya",
      summary:
        "On-page, teknis, dan off-page: apa yang termasuk di masing-masing, serta cara membagi waktu saat sumber daya terbatas.",
      minutes: 7,
      blocks: [
        {
          type: "paragraph",
          text: "SEO gampang terasa seperti daftar tugas tanpa ujung. Mengelompokkannya ke tiga pilar membantumu tahu sedang menyentuh tuas yang mana—dan tuas mana yang sebenarnya macet.",
        },
        { type: "heading", text: "On-page: yang ada di dalam halaman" },
        {
          type: "list",
          items: [
            "Kualitas dan kelengkapan isi terhadap pertanyaan pengguna",
            "Title tag, meta description, struktur heading",
            "Penempatan kata kunci yang wajar, internal link, teks alt gambar",
          ],
        },
        { type: "heading", text: "Teknis: seberapa mudah situs diproses" },
        {
          type: "list",
          items: [
            "Arsitektur URL, robots.txt, sitemap, tag kanonik",
            "Kecepatan muat dan stabilitas layout (Core Web Vitals)",
            "Tampilan mobile, HTTPS, data terstruktur",
          ],
        },
        { type: "heading", text: "Off-page: reputasi dari luar" },
        {
          type: "list",
          items: [
            "Tautan dari situs lain yang relevan dan kredibel",
            "Penyebutan merek, ulasan, profil bisnis (penting untuk SEO lokal)",
          ],
        },
        {
          type: "table",
          head: ["Situasi", "Prioritas pertama"],
          rows: [
            ["Situs baru, konten sedikit", "On-page: bangun 10–20 halaman yang benar-benar menjawab satu topik"],
            ["Konten banyak tapi trafik datar", "Teknis + audit intent: cek indexing, kanibalisasi, dan kecocokan intent"],
            ["Sudah rapi tapi kalah dari kompetitor besar", "Off-page: otoritas dan liputan dari luar"],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Jangan mulai dari off-page",
          text: "Mencari backlink untuk halaman yang isinya belum layak adalah cara tercepat membakar anggaran. Tautan memperkuat halaman bagus; ia tidak menyelamatkan halaman lemah.",
        },
      ],
      takeaways: [
        "On-page = isi halaman, teknis = kemudahan diproses, off-page = reputasi eksternal",
        "Prioritas bergantung pada hambatan terbesar situsmu saat ini",
        "Off-page paling efektif setelah on-page dan teknis sehat",
      ],
    },
    {
      slug: "search-intent",
      title: "Membaca search intent",
      summary:
        "Empat jenis intent, cara memverifikasinya lewat SERP, dan kenapa salah intent membuat konten bagus tetap kalah.",
      minutes: 9,
      blocks: [
        {
          type: "paragraph",
          text: "Search intent adalah tujuan di balik kueri. Kalau formatmu tidak cocok dengan yang dicari orang, kamu bersaing di kompetisi yang salah. Artikel 2.000 kata tentang \"sejarah sepatu lari\" tidak akan menang untuk kueri \"beli sepatu lari pria\", sebaliknya juga begitu.",
        },
        {
          type: "table",
          head: ["Jenis intent", "Contoh kueri", "Format yang biasanya menang"],
          rows: [
            ["Informasional", "cara mengukur core web vitals", "Panduan, tutorial, penjelasan bertahap"],
            ["Navigasional", "login google search console", "Halaman resmi/brand, jalur masuk singkat"],
            ["Komersial", "tools riset keyword terbaik", "Perbandingan, ulasan, daftar berperingkat"],
            ["Transaksional", "harga jasa seo bulanan", "Halaman layanan/produk dengan harga dan CTA jelas"],
          ],
        },
        { type: "heading", text: "Verifikasi intent lewat SERP" },
        {
          type: "list",
          ordered: true,
          items: [
            "Cari kueri targetmu di mode penjelajahan privat agar hasil lebih netral",
            "Lihat 10 hasil teratas: apakah blog, halaman produk, atau halaman kategori?",
            "Perhatikan fitur SERP: kotak People Also Ask, video, peta lokal, atau daftar produk",
            "Tiru formatnya, lalu cari satu hal yang belum dijawab siapa pun di sana",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Satu kueri bisa punya intent campuran",
          text: "Untuk kueri seperti \"ssd vs hdd\" Google sering menampilkan artikel pembanding sekaligus halaman toko. Artinya ada ruang untuk dua jenis halaman—selama masing-masing punya sudut yang jelas.",
        },
        {
          type: "paragraph",
          text: "Latihan yang enak: ambil lima kueri yang paling dekat dengan bisnismu, tulis intent-nya di kolom sebelah, lalu bandingkan dengan halaman yang kamu punya sekarang. Ketidakcocokan yang kamu temukan biasanya penjelasan paling cepat untuk trafik yang mandek.",
        },
      ],
      takeaways: [
        "Intent menentukan format halaman, bukan sebaliknya",
        "SERP adalah sumber kebenaran untuk menebak intent",
        "Ketidakcocokan intent adalah penyebab umum konten bagus tidak berperingkat",
      ],
    },
  ],
  quiz: [
    {
      id: "fondasi-1",
      question: "Halamanmu muncul di laporan crawl tapi statusnya \"Ditemukan – belum diindeks\". Tahap mana yang bermasalah?",
      options: ["Crawling", "Indexing", "Ranking", "Off-page"],
      answerIndex: 1,
      explanation:
        "Robot sudah menemukan URL-nya (crawling berhasil) tetapi halaman belum masuk indeks. Cek tag noindex, duplikasi, kanonik, atau kualitas isi.",
    },
    {
      id: "fondasi-2",
      question: "Situs baru dengan 5 halaman tipis ingin naik trafik. Mana prioritas paling sehat?",
      options: [
        "Membeli 50 backlink dari direktori",
        "Membangun konten yang benar-benar menjawab topik inti",
        "Menambah 10 plugin SEO",
        "Mengganti domain agar lebih pendek",
      ],
      answerIndex: 1,
      explanation:
        "Tanpa isi yang layak, tautan dan plugin tidak punya apa pun untuk diperkuat. On-page dulu.",
    },
    {
      id: "fondasi-3",
      question: "Kueri \"tools riset keyword terbaik\" paling mungkin punya intent...",
      options: ["Navigasional", "Transaksional", "Komersial", "Informasional murni"],
      answerIndex: 2,
      explanation:
        "Kata \"terbaik\" menandakan orang sedang membandingkan sebelum membeli—intent komersial, biasanya dimenangkan oleh artikel perbandingan.",
    },
    {
      id: "fondasi-4",
      question: "Mana pernyataan yang benar soal peringkat?",
      options: [
        "Peringkat bersifat tetap sampai Google merilis update besar",
        "Peringkat dihitung per kueri dan dipengaruhi lokasi serta perangkat",
        "Peringkat sama untuk semua orang di satu negara",
        "Peringkat hanya berubah kalau kamu mengubah halaman",
      ],
      answerIndex: 1,
      explanation:
        "Hasil dihitung ulang tiap kueri dan bisa berbeda antar lokasi, perangkat, dan riwayat pengguna. Baca sebagai tren.",
    },
  ],
};
