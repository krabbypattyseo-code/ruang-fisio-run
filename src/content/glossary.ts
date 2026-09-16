export type GlossaryEntry = {
  term: string;
  category: "Dasar" | "On-Page" | "Teknis" | "Off-Page" | "Analitik";
  definition: string;
};

export const glossary: GlossaryEntry[] = [
  {
    term: "SERP",
    category: "Dasar",
    definition:
      "Search Engine Results Page, halaman hasil pencarian. Isinya bukan hanya 10 tautan biru, tetapi juga People Also Ask, video, peta lokal, dan iklan.",
  },
  {
    term: "Crawling",
    category: "Teknis",
    definition:
      "Proses robot mesin pencari menjelajahi web melalui tautan untuk menemukan dan mengambil halaman.",
  },
  {
    term: "Indexing",
    category: "Teknis",
    definition:
      "Penyimpanan dan pemahaman halaman ke dalam indeks mesin pencari. Halaman bisa di-crawl tanpa pernah diindeks.",
  },
  {
    term: "Search intent",
    category: "Dasar",
    definition:
      "Tujuan di balik sebuah kueri: informasional, navigasional, komersial, atau transaksional. Menentukan format halaman yang bisa menang.",
  },
  {
    term: "Long-tail keyword",
    category: "Dasar",
    definition:
      "Kueri panjang dan spesifik dengan volume kecil tapi intent jelas, biasanya lebih mudah diperingkatkan dan lebih tinggi konversinya.",
  },
  {
    term: "Kanibalisasi kata kunci",
    category: "On-Page",
    definition:
      "Kondisi dua halaman atau lebih di satu situs bersaing untuk kueri sama sehingga posisi keduanya tidak stabil.",
  },
  {
    term: "Title tag",
    category: "On-Page",
    definition:
      "Judul halaman di HTML yang muncul sebagai teks tautan di hasil pencarian. Ideal 50–60 karakter dan unik per halaman.",
  },
  {
    term: "Meta description",
    category: "On-Page",
    definition:
      "Ringkasan halaman di bawah title pada hasil pencarian. Bukan faktor peringkat, tetapi memengaruhi rasio klik.",
  },
  {
    term: "Anchor text",
    category: "On-Page",
    definition:
      "Teks yang diklik pada sebuah tautan. Anchor deskriptif memberi konteks tentang isi halaman tujuan.",
  },
  {
    term: "Internal link",
    category: "On-Page",
    definition:
      "Tautan antar halaman di domain yang sama. Alat paling murah untuk menyalurkan otoritas ke halaman prioritas.",
  },
  {
    term: "Backlink",
    category: "Off-Page",
    definition:
      "Tautan dari situs lain ke situsmu. Nilainya ditentukan relevansi dan kredibilitas sumber, bukan jumlah.",
  },
  {
    term: "Nofollow / sponsored / ugc",
    category: "Off-Page",
    definition:
      "Atribut rel pada tautan yang memberi tahu mesin pencari bahwa tautan itu tidak diendors, berbayar, atau berasal dari konten pengguna.",
  },
  {
    term: "robots.txt",
    category: "Teknis",
    definition:
      "File di root domain yang mengatur URL mana yang boleh diambil robot. Mengatur akses, bukan penghapusan dari indeks.",
  },
  {
    term: "noindex",
    category: "Teknis",
    definition:
      "Instruksi meta robots agar halaman tidak dimasukkan ke indeks. URL-nya harus tetap bisa di-crawl agar instruksi ini terbaca.",
  },
  {
    term: "Tag kanonik",
    category: "Teknis",
    definition:
      "Penanda versi utama sebuah halaman ketika ada beberapa URL dengan isi mirip, misalnya karena parameter pelacakan.",
  },
  {
    term: "Redirect 301",
    category: "Teknis",
    definition:
      "Pengalihan permanen dari satu URL ke URL lain. Memindahkan hampir seluruh sinyal tautan ke alamat baru.",
  },
  {
    term: "Sitemap XML",
    category: "Teknis",
    definition:
      "Daftar URL kanonik berstatus 200 yang ingin kamu indeks, dipakai mesin pencari sebagai peta penemuan halaman.",
  },
  {
    term: "Core Web Vitals",
    category: "Teknis",
    definition:
      "Tiga metrik pengalaman halaman: LCP (kecepatan tampil konten utama), INP (responsivitas), dan CLS (stabilitas tata letak).",
  },
  {
    term: "LCP",
    category: "Teknis",
    definition:
      "Largest Contentful Paint, waktu hingga elemen terbesar di viewport tampil. Target baik: 2,5 detik atau kurang.",
  },
  {
    term: "INP",
    category: "Teknis",
    definition:
      "Interaction to Next Paint, ukuran responsivitas halaman terhadap interaksi pengguna. Target baik: 200 ms atau kurang.",
  },
  {
    term: "CLS",
    category: "Teknis",
    definition:
      "Cumulative Layout Shift, ukuran seberapa sering tata letak bergeser saat halaman dimuat. Target baik: 0,1 atau kurang.",
  },
  {
    term: "Data terstruktur (schema)",
    category: "Teknis",
    definition:
      "Markup JSON-LD berbasis Schema.org yang menjelaskan isi halaman ke mesin pencari dan membuka peluang hasil kaya.",
  },
  {
    term: "E-E-A-T",
    category: "Dasar",
    definition:
      "Experience, Expertise, Authoritativeness, Trustworthiness. Kerangka penilai kualitas yang dipakai dalam pedoman quality rater Google.",
  },
  {
    term: "Topic cluster",
    category: "Dasar",
    definition:
      "Satu halaman pilar bertopik luas yang saling menaut dengan beberapa artikel pendukung untuk membangun otoritas topikal.",
  },
  {
    term: "Featured snippet",
    category: "On-Page",
    definition:
      "Kutipan jawaban yang ditampilkan di atas hasil organik. Sering didapat halaman yang menjawab langsung di awal bagian.",
  },
  {
    term: "CTR",
    category: "Analitik",
    definition:
      "Click-through rate, rasio klik terhadap impresi. Halaman dengan impresi tinggi dan CTR rendah adalah kandidat uji title.",
  },
  {
    term: "Impresi",
    category: "Analitik",
    definition:
      "Jumlah kemunculan halamanmu di hasil pencarian untuk suatu kueri, terlepas dari apakah diklik atau tidak.",
  },
  {
    term: "Google Search Console",
    category: "Analitik",
    definition:
      "Alat gratis Google untuk memantau kueri, impresi, klik, status indeks, dan masalah teknis sebuah properti web.",
  },
  {
    term: "Crawl budget",
    category: "Teknis",
    definition:
      "Perkiraan jumlah halaman yang bersedia di-crawl mesin pencari pada situsmu dalam periode tertentu. Relevan untuk situs besar.",
  },
  {
    term: "SEO lokal",
    category: "Off-Page",
    definition:
      "Optimasi untuk kueri berbasis lokasi. Pengungkit utamanya Profil Bisnis Google, ulasan, konsistensi NAP, dan halaman lokasi.",
  },
];

export const glossaryCategories = [
  "Semua",
  "Dasar",
  "On-Page",
  "Teknis",
  "Off-Page",
  "Analitik",
] as const;
