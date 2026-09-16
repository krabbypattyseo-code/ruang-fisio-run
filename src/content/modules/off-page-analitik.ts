import type { Module } from "@/content/types";

export const offPageAnalitik: Module = {
  slug: "off-page-analitik",
  title: "Off-Page & Analitik",
  tagline:
    "Bangun reputasi dari luar, kuasai pencarian lokal, lalu buktikan hasilnya dengan laporan yang jujur.",
  level: "Lanjutan",
  icon: "LineChart",
  outcomes: [
    "Menjalankan taktik link building yang tidak melanggar pedoman",
    "Mengoptimalkan profil bisnis untuk pencarian lokal",
    "Menyusun laporan bulanan dari Search Console dan GA4 yang bisa diambil keputusannya",
  ],
  lessons: [
    {
      slug: "link-building-etis",
      title: "Link building yang tidak bikin repot",
      summary:
        "Apa yang membuat sebuah tautan bernilai, empat taktik yang masih berhasil, dan pola yang sebaiknya dihindari.",
      minutes: 9,
      blocks: [
        {
          type: "paragraph",
          text: "Satu tautan dari situs relevan yang benar-benar dibaca orang mengalahkan lima puluh tautan dari direktori tanpa pengunjung. Nilai tautan ditentukan relevansi, kredibilitas sumber, dan posisinya di dalam konten.",
        },
        { type: "heading", text: "Taktik yang masih bekerja" },
        {
          type: "list",
          ordered: true,
          items: [
            "Aset yang layak ditautkan: riset kecil dengan data sendiri, kalkulator, template gratis",
            "Digital PR: kirim temuan datamu ke jurnalis atau media niche dengan sudut yang jelas",
            "Guest post di publikasi yang punya audiens nyata—bukan jaringan blog kosong",
            "Perbaikan tautan rusak: temukan halaman mati yang masih ditautkan, tawarkan penggantimu",
          ],
        },
        { type: "heading", text: "Pola yang berisiko" },
        {
          type: "list",
          items: [
            "Membeli tautan atau menukar tautan secara sistematis",
            "Anchor text sama persis berulang dalam jumlah besar",
            "Komentar spam dan direktori massal",
            "Jaringan blog privat (PBN)",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Ukur dengan pertanyaan sederhana",
          text: "Apakah tautan ini akan mengirim pengunjung yang relevan meski Google tidak ada? Kalau jawabannya tidak, kemungkinan besar tautan itu tidak bernilai—atau berisiko.",
        },
      ],
      takeaways: [
        "Relevansi dan kredibilitas mengalahkan jumlah",
        "Aset layak-tautan dan digital PR adalah mesin tautan jangka panjang",
        "Tautan berbayar dan PBN melanggar pedoman spam Google",
      ],
    },
    {
      slug: "seo-lokal",
      title: "SEO lokal untuk bisnis dengan lokasi",
      summary:
        "Profil Bisnis Google, konsistensi NAP, ulasan, dan halaman lokasi yang bukan salinan satu sama lain.",
      minutes: 8,
      blocks: [
        {
          type: "paragraph",
          text: "Untuk kueri seperti \"bengkel motor terdekat\", tiga hasil di kotak peta sering mendapat klik lebih banyak daripada hasil organik pertama. Pengungkitnya berbeda dari SEO biasa.",
        },
        { type: "heading", text: "Prioritas kerja" },
        {
          type: "list",
          ordered: true,
          items: [
            "Lengkapi Profil Bisnis Google: kategori utama yang tepat, jam operasional, layanan, foto terbaru",
            "Konsistenkan NAP (nama, alamat, telepon) di seluruh direktori dan situsmu",
            "Kumpulkan ulasan secara berkelanjutan dan balas semuanya, termasuk yang negatif",
            "Buat halaman lokasi unik untuk setiap cabang—alamat, tim, testimoni, dan area layanan berbeda",
            "Tambahkan schema LocalBusiness dengan jam operasional",
          ],
        },
        {
          type: "table",
          head: ["Faktor peringkat lokal", "Yang bisa kamu kendalikan"],
          rows: [
            ["Relevansi", "Kategori, deskripsi, dan daftar layanan di profil"],
            ["Jarak", "Tidak bisa diubah; perkuat dengan area layanan dan halaman lokasi"],
            ["Keunggulan", "Volume dan kualitas ulasan, penyebutan merek, tautan lokal"],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Halaman lokasi kembar adalah masalah",
          text: "Menyalin satu halaman lokasi untuk 20 kota dengan hanya mengganti nama kota menghasilkan konten doorway yang biasanya tidak diindeks dengan baik.",
        },
      ],
      takeaways: [
        "Profil Bisnis Google adalah aset utama pencarian lokal",
        "NAP konsisten dan ulasan berkelanjutan adalah pekerjaan rutin",
        "Setiap halaman lokasi harus punya isi yang benar-benar berbeda",
      ],
    },
    {
      slug: "mengukur-hasil",
      title: "Mengukur hasil di Search Console dan GA4",
      summary:
        "Metrik yang layak dilaporkan, cara menghubungkan trafik ke konversi, dan format laporan bulanan satu halaman.",
      minutes: 10,
      blocks: [
        {
          type: "paragraph",
          text: "Laporan SEO yang baik menjawab satu pertanyaan: apakah pekerjaan bulan ini mendekatkan kita ke tujuan bisnis? Daftar peringkat tanpa konteks tidak menjawab itu.",
        },
        { type: "heading", text: "Metrik inti" },
        {
          type: "table",
          head: ["Metrik", "Sumber", "Kenapa penting"],
          rows: [
            ["Klik & impresi organik", "Search Console", "Permintaan nyata terhadap halamanmu"],
            ["CTR per halaman", "Search Console", "Menunjukkan title/description yang perlu diuji"],
            ["Halaman terindeks vs dikirim", "Search Console", "Deteksi dini masalah teknis"],
            ["Sesi organik & konversi", "GA4", "Menghubungkan trafik ke hasil bisnis"],
            ["Halaman masuk teratas", "GA4", "Menunjukkan aset mana yang layak diperkuat"],
          ],
        },
        { type: "heading", text: "Kerangka laporan bulanan satu halaman" },
        {
          type: "code",
          label: "Template",
          code: `1. Ringkasan  : klik organik, konversi, perubahan vs bulan lalu (3 baris)
2. Menang     : 3 halaman dengan kenaikan terbesar + penyebabnya
3. Turun      : 3 halaman dengan penurunan terbesar + hipotesis
4. Dikerjakan : daftar perubahan yang dirilis bulan ini + tanggalnya
5. Berikutnya : 3 prioritas bulan depan dan alasannya`,
        },
        {
          type: "list",
          items: [
            "Bandingkan periode yang setara (28 hari vs 28 hari) untuk menghindari efek hari kerja",
            "Perhitungkan musiman: bandingkan juga dengan periode yang sama tahun lalu",
            "Selalu cantumkan tanggal rilis perubahan agar sebab-akibat bisa dilacak",
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Satu kebiasaan yang mengubah kualitas laporan",
          text: "Simpan catatan perubahan (changelog) SEO: tanggal, halaman, dan apa yang diubah. Tanpa itu, setiap kenaikan atau penurunan hanya bisa ditebak.",
        },
      ],
      takeaways: [
        "Laporkan klik, CTR, dan konversi—bukan daftar peringkat mentah",
        "Bandingkan periode setara dan pertimbangkan musiman",
        "Changelog membuat analisis sebab-akibat mungkin dilakukan",
      ],
    },
  ],
  quiz: [
    {
      id: "offpage-1",
      question: "Tautan mana yang paling bernilai?",
      options: [
        "Direktori umum tanpa pengunjung",
        "Artikel di media niche yang relevan dan dibaca audiensmu",
        "Komentar blog dengan anchor kata kunci",
        "Footer situs milik teman dengan topik berbeda",
      ],
      answerIndex: 1,
      explanation: "Relevansi topik dan audiens nyata adalah penentu utama nilai sebuah tautan.",
    },
    {
      id: "offpage-2",
      question: "Untuk bisnis dengan toko fisik, aset off-page paling berdampak adalah...",
      options: ["Profil Bisnis Google yang lengkap dan aktif", "Jumlah postingan blog", "Domain berumur tua", "Iklan display"],
      answerIndex: 0,
      explanation: "Profil yang lengkap plus ulasan berkelanjutan adalah pengungkit utama hasil di kotak peta lokal.",
    },
    {
      id: "offpage-3",
      question: "Metrik mana yang paling layak jadi baris pertama laporan bulanan?",
      options: [
        "Jumlah kata yang ditulis",
        "Klik organik dan konversi beserta perubahannya",
        "Domain authority",
        "Jumlah backlink baru",
      ],
      answerIndex: 1,
      explanation: "Klik dan konversi adalah hasil; metrik lain adalah indikator perantara.",
    },
    {
      id: "offpage-4",
      question: "Kenapa changelog SEO penting?",
      options: [
        "Supaya Google lebih cepat crawl",
        "Agar perubahan peringkat bisa dihubungkan ke tindakan tertentu",
        "Untuk memenuhi syarat Search Console",
        "Agar sitemap valid",
      ],
      answerIndex: 1,
      explanation: "Tanpa catatan tanggal dan isi perubahan, naik-turun trafik hanya bisa ditebak penyebabnya.",
    },
    {
      id: "offpage-5",
      question: "Membuat 20 halaman lokasi dengan isi identik kecuali nama kota berisiko karena...",
      options: [
        "Menghabiskan kuota sitemap",
        "Dianggap doorway page dan sering tidak diindeks dengan baik",
        "Memperlambat situs secara signifikan",
        "Melanggar aturan HTTPS",
      ],
      answerIndex: 1,
      explanation: "Halaman nyaris duplikat tanpa nilai lokal spesifik termasuk pola doorway yang dilarang pedoman spam.",
    },
  ],
};
