import type { Module } from "@/content/types";

export const kontenEeat: Module = {
  slug: "konten-eeat",
  title: "Konten & E-E-A-T",
  tagline:
    "Menulis halaman yang layak menang: pengalaman nyata, struktur topik yang rapi, dan perawatan berkala.",
  level: "Menengah",
  icon: "PenLine",
  outcomes: [
    "Menyusun brief konten yang mengalahkan hasil teratas, bukan menirunya",
    "Membangun topic cluster dengan halaman pilar dan pendukung",
    "Menjalankan siklus audit konten untuk melawan penurunan trafik bertahap",
  ],
  lessons: [
    {
      slug: "brief-konten",
      title: "Brief konten yang mengalahkan SERP",
      summary:
        "Kerangka enam bagian untuk memastikan setiap artikel punya sudut, bukti, dan sesuatu yang belum ada di hasil teratas.",
      minutes: 9,
      blocks: [
        {
          type: "paragraph",
          text: "Merangkum sepuluh hasil teratas hanya menghasilkan artikel kesebelas. Brief yang baik memaksamu memutuskan apa yang kamu punya dan tidak dimiliki halaman lain: data, pengalaman, contoh, atau alat.",
        },
        { type: "heading", text: "Kerangka brief" },
        {
          type: "list",
          ordered: true,
          items: [
            "Kata kunci utama + 3–5 variasi yang ingin dicakup",
            "Intent dan format pemenang di SERP saat ini",
            "Pembaca sasaran dan keputusan yang ingin ia ambil setelah membaca",
            "Sudut pembeda: data internal, studi kasus, pengalaman pemakaian, template",
            "Kerangka heading dengan poin wajib per bagian",
            "Aset pendukung: tangkapan layar, tabel, kalkulator, contoh kode",
          ],
        },
        { type: "heading", text: "Apa arti E-E-A-T dalam praktik" },
        {
          type: "table",
          head: ["Unsur", "Bukti konkret di halaman"],
          rows: [
            ["Experience", "Tangkapan layar hasil sendiri, angka sebelum/sesudah, catatan uji coba"],
            ["Expertise", "Halaman penulis dengan kredensial dan riwayat karya"],
            ["Authoritativeness", "Dikutip atau ditautkan oleh sumber yang dipercaya di bidangmu"],
            ["Trustworthiness", "Kontak jelas, kebijakan, sumber data, tanggal pembaruan"],
          ],
        },
        {
          type: "callout",
          variant: "tip",
          title: "Satu detail yang paling sering dilupakan",
          text: "Cantumkan nama penulis dengan halaman profil yang nyata. Untuk topik uang, kesehatan, dan hukum, ketiadaan penulis yang jelas adalah kelemahan besar.",
        },
      ],
      takeaways: [
        "Setiap artikel butuh sudut yang tidak dimiliki hasil teratas",
        "E-E-A-T dibuktikan dengan elemen konkret, bukan klaim",
        "Brief yang jelas memotong waktu revisi secara drastis",
      ],
    },
    {
      slug: "topic-cluster",
      title: "Topic cluster dan halaman pilar",
      summary:
        "Menstruktur banyak artikel di sekitar satu tema agar saling memperkuat alih-alih saling bersaing.",
      minutes: 8,
      blocks: [
        {
          type: "paragraph",
          text: "Mesin pencari menilai keahlian di tingkat topik, bukan hanya per halaman. Sepuluh artikel yang saling terhubung dalam satu tema bekerja lebih baik daripada sepuluh artikel acak dengan kualitas sama.",
        },
        {
          type: "code",
          label: "Anatomi cluster",
          code: `PILAR: /panduan/seo-untuk-toko-online   (topik luas, 2.000+ kata)
  ├─ /panduan/riset-keyword-produk
  ├─ /panduan/deskripsi-produk-seo
  ├─ /panduan/struktur-kategori-toko
  └─ /panduan/schema-product

Setiap pendukung menaut ke pilar.
Pilar menaut ke semua pendukung.`,
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Pilih tema yang dekat dengan produkmu dan cukup luas untuk 5–10 artikel",
            "Tulis pilar sebagai peta topik: ringkas semua subtopik dengan tautan",
            "Buat artikel pendukung untuk tiap subtopik dengan kata kunci sendiri",
            "Hubungkan dua arah; pastikan tidak ada pendukung yang menargetkan kueri sama",
          ],
        },
        {
          type: "callout",
          variant: "info",
          title: "Kapan cluster mulai terasa",
          text: "Efeknya biasanya muncul setelah pilar plus tiga sampai empat pendukung terbit dan saling ditautkan—bukan setelah satu artikel pertama.",
        },
      ],
      takeaways: [
        "Otoritas topikal dibangun oleh sekelompok halaman yang terhubung",
        "Pilar = peta topik, pendukung = jawaban mendalam per subtopik",
        "Tautan dua arah membuat cluster mudah dipahami mesin pencari",
      ],
    },
    {
      slug: "audit-dan-refresh",
      title: "Audit dan refresh konten",
      summary:
        "Menemukan halaman yang perlahan kehilangan trafik dan memutuskan: perbarui, gabungkan, atau pensiunkan.",
      minutes: 8,
      blocks: [
        {
          type: "paragraph",
          text: "Konten menua. Angka jadi basi, tangkapan layar tidak cocok dengan antarmuka terbaru, kompetitor menulis yang lebih lengkap. Audit rutin biasanya memberi kenaikan trafik lebih murah daripada menulis artikel baru.",
        },
        { type: "heading", text: "Siklus audit per kuartal" },
        {
          type: "list",
          ordered: true,
          items: [
            "Ekspor laporan Search Console 6 bulan terakhir per halaman",
            "Tandai halaman dengan klik turun lebih dari 20% dibanding periode sebelumnya",
            "Bandingkan dengan tiga hasil teratas hari ini: apa yang mereka punya dan kamu tidak?",
            "Putuskan tindakan: perbarui, gabungkan, alihkan, atau biarkan",
            "Catat tanggal tindakan agar dampaknya bisa diukur",
          ],
        },
        {
          type: "table",
          head: ["Kondisi halaman", "Tindakan"],
          rows: [
            ["Masih relevan, data usang", "Perbarui angka, contoh, dan tangkapan layar"],
            ["Tipis dan mirip halaman lain", "Gabungkan ke halaman terkuat lalu 301"],
            ["Topik sudah tidak relevan dengan bisnis", "Pensiunkan dan alihkan ke halaman terdekat"],
            ["Trafik kecil tapi konversinya tinggi", "Pertahankan, perkuat dengan internal link"],
          ],
        },
        {
          type: "callout",
          variant: "warning",
          title: "Mengubah tanggal saja bukan refresh",
          text: "Menukar tahun di judul tanpa memperbarui isi tidak menambah nilai dan merusak kepercayaan pembaca yang kembali.",
        },
      ],
      takeaways: [
        "Audit kuartalan menangkap penurunan sebelum menjadi parah",
        "Tindakannya empat: perbarui, gabungkan, alihkan, atau biarkan",
        "Catat tanggal perubahan supaya dampaknya terukur",
      ],
    },
  ],
  quiz: [
    {
      id: "konten-1",
      question: "Elemen paling penting dalam brief konten agar bisa mengalahkan hasil teratas?",
      options: [
        "Jumlah kata lebih banyak dari kompetitor",
        "Sudut pembeda berbasis data atau pengalaman nyata",
        "Kepadatan kata kunci 3%",
        "Judul dengan tahun berjalan",
      ],
      answerIndex: 1,
      explanation: "Tanpa sesuatu yang belum ada di SERP, halamanmu hanya salinan yang lebih panjang.",
    },
    {
      id: "konten-2",
      question: "Dalam topic cluster, peran halaman pilar adalah...",
      options: [
        "Menargetkan kueri paling spesifik",
        "Memetakan topik luas dan menautkan seluruh artikel pendukung",
        "Menggantikan beranda",
        "Menampung semua kata kunci sekaligus",
      ],
      answerIndex: 1,
      explanation: "Pilar memberi gambaran menyeluruh dan menjadi pusat tautan bagi artikel pendukung.",
    },
    {
      id: "konten-3",
      question: "Huruf E pertama pada E-E-A-T (Experience) paling baik dibuktikan dengan...",
      options: [
        "Klaim \"kami ahli sejak 2010\"",
        "Tangkapan layar hasil pengujian sendiri dan angka sebelum/sesudah",
        "Daftar sertifikasi tanpa detail",
        "Banyaknya kata kunci di halaman",
      ],
      answerIndex: 1,
      explanation: "Pengalaman dibuktikan dengan jejak pemakaian nyata, bukan pernyataan tentang diri sendiri.",
    },
    {
      id: "konten-4",
      question: "Artikel tipis yang topiknya tumpang tindih dengan panduan utamamu sebaiknya...",
      options: [
        "Dibiarkan agar jumlah halaman banyak",
        "Digabungkan ke panduan utama lalu dialihkan dengan 301",
        "Dihapus tanpa redirect",
        "Diberi noindex dan dibiarkan",
      ],
      answerIndex: 1,
      explanation: "Penggabungan memusatkan sinyal ke satu URL kuat; 301 menjaga nilai tautan yang sudah ada.",
    },
  ],
};
