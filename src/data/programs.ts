// Konten section "Programs" untuk ruang-fisio-run.vercel.app
// Sumber tunggal: programs.json (edit di sana, lalu generate ulang file ini).

export type ReviewStatus = "pending" | "approved";
export interface Review { status: ReviewStatus; reviewer: string | null; date: string | null }

export type Section =
  | { type: "text"; heading?: string; body: string }
  | { type: "list"; heading?: string; items: string[]; note?: string }
  | { type: "steps"; heading?: string; note?: string; items: { name: string; dose: string; cue: string }[] }
  | { type: "table"; heading?: string; note?: string; columns: string[]; rows: string[][] }
  | { type: "callout"; tone: "info" | "warn"; body: string };

export interface Module { id: string; title: string; summary: string; sections: Section[] }
export interface Program {
  id: string; category: "sport"; icon: string; title: string; shortTitle: string; eyebrow: string;
  summary: string; meta: { level: string; duration: string; frequency: string }; review: Review; modules: Module[];
}
export interface Injury {
  id: string; title: string; aka: string; area: string; summary: string; review: Review;
  symptoms: string[]; causes: string[]; firstSteps: string[]; exercises: string[]; returnToRun: string[];
}

export interface Reviewer {
  eyebrow: string; name: string; role: string; photo: string; note: string;
  education: { heading: string; institution: string; degree: string; years: string };
}

export interface ProgramsContent {
  meta: { section: string; placement: string; language: string; lastUpdated: string; reviewNote: string };
  page: { eyebrow: string; title: string; description: string };
  reviewer: Reviewer;
  categories: { id: "sport" | "injury"; title: string; description: string; review: Review }[];
  programs: Program[];
  injuryIntro: { rules: string[]; police: { letter: string; name: string; body: string }[] };
  injuries: Injury[];
  sources: string[];
}

export const programsContent: ProgramsContent = {
  "meta": {
    "section": "Programs",
    "placement": "Tombol baru di halaman Home, tepat di bawah tombol Gear. Route: /programs",
    "language": "id",
    "lastUpdated": "2026-09-20",
    "reviewNote": "Semua konten berstatus 'pending'. Ubah review.status menjadi 'approved' dan isi reviewer + date HANYA setelah fisioterapis benar-benar mereview. Badge 'Approve by Fisio' di UI membaca field ini."
  },
  "page": {
    "eyebrow": "Feature",
    "title": "Programs",
    "description": "Program latihan dan panduan cedera yang disusun dari referensi fisioterapi dan sport science."
  },
  "reviewer": {
    "eyebrow": "Fisioterapis Peninjau",
    "name": "Awalin Aulia Ramadhani",
    "role": "Physiotherapist at Physiorehab",
    "photo": "/reviewer-awalin.jpg",
    "note": "Seluruh materi di section Programs ditinjau oleh fisioterapis sebelum statusnya berubah menjadi Approved.",
    "education": {
      "heading": "Education",
      "institution": "University of Indonesia",
      "degree": "Bachelor of Applied Science – BASc, Physiotherapy",
      "years": "2021 – 2025"
    }
  },
  "categories": [
    {
      "id": "sport",
      "title": "Sport",
      "description": "Program latihan per olahraga: lari, hipertrofi otot, dan hiking.",
      "review": {
        "status": "pending",
        "reviewer": null,
        "date": null
      }
    },
    {
      "id": "injury",
      "title": "Injury",
      "description": "Panduan cedera yang paling sering dialami pelari dan pendaki.",
      "review": {
        "status": "pending",
        "reviewer": null,
        "date": null
      }
    }
  ],
  "programs": [
    {
      "id": "running",
      "category": "sport",
      "icon": "running",
      "title": "Running Programs",
      "shortTitle": "Running",
      "eyebrow": "Sport · Running",
      "summary": "Mulai dari nol sampai bisa lari 30 menit tanpa berhenti, lengkap dengan rutinitas pemanasan, pendinginan, dan latihan kekuatan untuk mencegah cedera.",
      "meta": {
        "level": "Pemula – Menengah",
        "duration": "12 minggu",
        "frequency": "3× lari + 2× strength / minggu"
      },
      "review": {
        "status": "pending",
        "reviewer": null,
        "date": null
      },
      "modules": [
        {
          "id": "pemula",
          "title": "Langkah untuk Pemula",
          "summary": "Program jalan–lari 12 minggu sampai bisa lari 30 menit nonstop.",
          "sections": [
            {
              "type": "text",
              "heading": "Untuk siapa program ini",
              "body": "Untuk kamu yang baru mulai lari, atau kembali lari setelah lama berhenti. Targetnya lari 30 menit tanpa berhenti. Kalau pace kamu sekitar 6:00 menit/km, 30 menit sudah setara 5 km. Kalau baru pulih dari cedera, susun rencana kembali lari bersama fisioterapis supaya progresnya terpantau."
            },
            {
              "type": "list",
              "heading": "Aturan main",
              "items": [
                "Lari 3 kali per minggu. Beri minimal 1 hari istirahat atau cross-training (sepeda, renang) di antara sesi.",
                "Setiap sesi dimulai dengan jalan kaki 5 menit sebagai pemanasan.",
                "Lari di pace easy, yaitu pace yang masih memungkinkan kamu mengobrol sambil lari.",
                "Belum siap naik level? Ulangi sesi atau minggu yang sama. Tidak ada yang dikejar.",
                "Kalau nyeri terasa lebih dari 3 dari 10, atau cara lari kamu berubah karena nyeri, hentikan sesi dan konsultasikan ke fisioterapis."
              ]
            },
            {
              "type": "table",
              "heading": "Jadwal 12 minggu",
              "note": "Satu blok = lari lalu jalan. Ulangi sesuai jumlah set. Belum termasuk 5 menit jalan pemanasan.",
              "columns": [
                "Minggu",
                "Satu blok",
                "Set",
                "Total lari"
              ],
              "rows": [
                [
                  "1",
                  "Lari 1' + jalan 2'",
                  "8×",
                  "8 menit"
                ],
                [
                  "2",
                  "Lari 1'30\" + jalan 2'",
                  "7×",
                  "10,5 menit"
                ],
                [
                  "3",
                  "Lari 2' + jalan 2'",
                  "6×",
                  "12 menit"
                ],
                [
                  "4",
                  "Lari 3' + jalan 2'",
                  "5×",
                  "15 menit"
                ],
                [
                  "5",
                  "Lari 5' + jalan 2'",
                  "4×",
                  "20 menit"
                ],
                [
                  "6",
                  "Lari 7' + jalan 2'",
                  "3×",
                  "21 menit"
                ],
                [
                  "7",
                  "Lari 8' + jalan 1'",
                  "3×",
                  "24 menit"
                ],
                [
                  "8",
                  "Lari 10' + jalan 1', lalu lari 5'",
                  "2× + 1",
                  "25 menit"
                ],
                [
                  "9",
                  "Lari 13' + jalan 1'",
                  "2×",
                  "26 menit"
                ],
                [
                  "10",
                  "Lari 15' + jalan 1'",
                  "2×",
                  "30 menit"
                ],
                [
                  "11",
                  "Lari 20' + jalan 1', lalu lari 10'",
                  "1× + 1",
                  "30 menit"
                ],
                [
                  "12",
                  "Lari 30' nonstop",
                  "1×",
                  "30 menit"
                ]
              ]
            },
            {
              "type": "list",
              "heading": "Setelah minggu 12",
              "items": [
                "Tambahkan pemanasan dinamis dan drill sebelum sesi (lihat modul Pemanasan & Pendinginan).",
                "Mulai latihan kekuatan 2 kali per minggu (lihat modul Strength Training).",
                "Naikkan jarak atau durasi secara bertahap. Lonjakan beban latihan yang mendadak adalah pemicu utama cedera lari."
              ]
            },
            {
              "type": "callout",
              "tone": "info",
              "body": "Jadwal disusun Ruang Fisio berdasarkan prinsip program walk–run pemula di Science of Running (Napier, 2020)."
            }
          ]
        },
        {
          "id": "pemanasan-pendinginan",
          "title": "Pemanasan & Pendinginan",
          "summary": "Rutinitas 20–30 menit sebelum lari dan 10–25 menit sesudahnya.",
          "sections": [
            {
              "type": "callout",
              "tone": "info",
              "body": "Program pemanasan yang terstruktur dan spesifik untuk lari bisa menurunkan risiko cedera overuse hingga 50%."
            },
            {
              "type": "text",
              "heading": "Prinsip",
              "body": "Sebelum lari, pakai gerakan dinamis. Mulai dari gerakan kecil dan pelan, lalu perbesar jangkauan dan kecepatan seiring tubuh terasa hangat. Sambil pemanasan, perhatikan kalau ada sisi yang terasa lebih kaku atau tidak simetris. Simpan static stretch untuk setelah lari. Di hari lomba, pemanasan justru paling tidak boleh dilewatkan."
            },
            {
              "type": "steps",
              "heading": "Pemanasan · Tahap 1: Jog santai",
              "items": [
                {
                  "name": "Jog santai",
                  "dose": "10–15 menit",
                  "cue": "Pace sangat ringan. Tujuannya menaikkan suhu tubuh, melancarkan aliran darah ke otot, dan menyiapkan sistem saraf."
                }
              ]
            },
            {
              "type": "steps",
              "heading": "Pemanasan · Tahap 2: Dynamic stretch",
              "items": [
                {
                  "name": "Forward Leg Swing",
                  "dose": "15–20× per kaki",
                  "cue": "Pegangan ke pagar atau pohon. Ayun kaki depan–belakang seperti bandul, lutut sedikit ditekuk, perbesar ayunan bertahap."
                },
                {
                  "name": "Side Leg Swing",
                  "dose": "15–20× per kaki",
                  "cue": "Menghadap pegangan, ayun kaki menyilang ke depan badan lalu ke samping luar."
                },
                {
                  "name": "Dynamic Calf Stretch",
                  "dose": "15–20× per kaki",
                  "cue": "Posisi seperti push-up dengan pinggul diangkat. Tekan tumit ke lantai bergantian, pelan dan terkontrol."
                },
                {
                  "name": "World's Greatest Stretch",
                  "dose": "5–8× per sisi",
                  "cue": "Langkah lunge panjang, tangan di lantai, lalu putar badan dan buka lengan ke atas."
                },
                {
                  "name": "Standing Hip Circles",
                  "dose": "10× per arah",
                  "cue": "Angkat lutut, lalu putar pinggul membentuk lingkaran besar ke luar dan ke dalam."
                }
              ]
            },
            {
              "type": "steps",
              "heading": "Pemanasan · Tahap 3: Running drills",
              "note": "Lakukan di lintasan sekitar 40–50 m, 15–20 repetisi per kaki. Drill juga bisa dilatih terpisah 2–3 kali per minggu.",
              "items": [
                {
                  "name": "Running A's",
                  "dose": "2 × 40 m",
                  "cue": "Angkat lutut tinggi, langkah kecil, mendarat di forefoot tepat di bawah badan."
                },
                {
                  "name": "Running B's",
                  "dose": "2 × 40 m",
                  "cue": "Angkat lutut, luruskan cepat, lalu tarik ke bawah. Ritmenya mirip skipping."
                },
                {
                  "name": "Running C's",
                  "dose": "2 × 40 m",
                  "cue": "Tendang tumit ke arah bokong sambil maju dengan langkah kecil dan cepat."
                },
                {
                  "name": "Carioca",
                  "dose": "2 × 40 m (bolak-balik)",
                  "cue": "Bergerak menyamping, kaki menyilang depan–belakang. Cepat tapi luwes."
                },
                {
                  "name": "Strides",
                  "dose": "3–4 × 60–80 m",
                  "cue": "Mulai pace nyaman, lalu percepat sampai sekitar 80% kecepatan maksimal di 5–10 detik terakhir."
                }
              ]
            },
            {
              "type": "list",
              "heading": "Tambahan khusus trail run",
              "items": [
                "Lingkaran pergelangan kaki dan heel raise 10–15×. Medan tidak rata banyak menuntut otot sisi luar pergelangan kaki untuk mencegah keseleo.",
                "Berdiri satu kaki 20–30 detik per sisi untuk melatih keseimbangan.",
                "Squat atau lunge pelan 8–10× untuk menyiapkan quadriceps sebelum turunan. Turunan menuntut kerja eksentrik quadriceps yang lebih besar.",
                "Jalani kilometer pertama di trail dengan santai, terutama saat turunan."
              ],
              "note": "Tambahan trail adalah saran Ruang Fisio yang disusun dari pembahasan medan dan turunan di Science of Running."
            },
            {
              "type": "steps",
              "heading": "Pendinginan · Tahap 1: Recovery jog",
              "items": [
                {
                  "name": "Jog atau jalan pelan",
                  "dose": "10–15 menit",
                  "cue": "Tidak wajib setelah easy run, tapi disarankan setelah sesi berat seperti interval, tempo, atau tanjakan. Membantu detak jantung turun bertahap."
                }
              ]
            },
            {
              "type": "steps",
              "heading": "Pendinginan · Tahap 2: Static stretch",
              "note": "Sekitar 10 menit. Tahan tiap stretch 30 detik per sisi. Menahan lebih lama tidak memberi manfaat tambahan.",
              "items": [
                {
                  "name": "Modified Pigeon",
                  "dose": "30 detik per sisi",
                  "cue": "Menyasar glute dan piriformis. Tulang kering depan menyilang di depan badan, kaki belakang lurus."
                },
                {
                  "name": "Standing Quad Stretch",
                  "dose": "30 detik per sisi",
                  "cue": "Tarik tumit ke bokong, lutut rapat, panggul sedikit didorong ke depan."
                },
                {
                  "name": "Static Hamstring Stretch",
                  "dose": "30 detik per sisi",
                  "cue": "Tumit di permukaan rendah, punggung lurus, condongkan badan dari pinggul."
                },
                {
                  "name": "Elevated Hip Flexor Stretch",
                  "dose": "30 detik per sisi",
                  "cue": "Kaki belakang di bangku, turunkan panggul sampai terasa tarikan di depan pinggul."
                },
                {
                  "name": "Gastrocnemius Wall Stretch",
                  "dose": "30 detik per sisi",
                  "cue": "Tangan di dinding, kaki belakang lurus, tumit tetap menempel lantai."
                },
                {
                  "name": "TFL & Piriformis Ball Release",
                  "dose": "±30 detik per titik",
                  "cue": "Pakai bola kecil di sisi depan pinggul (TFL) dan bokong (piriformis). Tekanan nyaman, bukan menyakitkan. IT band sendiri tidak bisa di-stretch atau di-release."
                }
              ]
            },
            {
              "type": "callout",
              "tone": "warn",
              "body": "Static stretch tidak disarankan sebagai pengganti pemanasan karena bisa menurunkan performa. Kalau tetap ingin melakukannya sebelum lari, buat singkat lalu lanjutkan dengan gerakan dinamis."
            }
          ]
        },
        {
          "id": "strength",
          "title": "Strength Training Programs",
          "summary": "Dua fase latihan kekuatan untuk lari yang lebih efisien dan minim cedera.",
          "sections": [
            {
              "type": "text",
              "heading": "Kenapa pelari perlu latihan kekuatan",
              "body": "Tendon menyimpan dan melepas energi di setiap langkah, dan kontribusinya bisa sampai separuh kerja total. Lari sendiri hanya memberi beban sekitar 2,5–3 kali berat badan dalam waktu singkat. Latihan beban memberi tekanan lebih tinggi dan lebih lama, sehingga tendon menjadi lebih kaku (stiff) dan lebih efisien. Hasilnya: ekonomi lari membaik dan risiko cedera menurun."
            },
            {
              "type": "list",
              "heading": "Dosis",
              "items": [
                "2 sesi per minggu, minimal 6 minggu untuk melihat hasil.",
                "Pilih 3–5 latihan per sesi yang menyasar pinggul, paha, dan betis.",
                "Kerjakan satu sisi dulu, lalu sisi lainnya. Saat lari, tubuh selalu bertumpu pada satu kaki.",
                "Pastikan otot terasa lelah di akhir set. Istirahat 2–3 menit antar set.",
                "Kalau sudah terasa mudah, tambah beban dengan dumbel atau ransel berisi beban."
              ]
            },
            {
              "type": "list",
              "heading": "Alat yang dibutuhkan",
              "items": [
                "Resistance band",
                "Step atau box tinggi (30 cm) dan rendah (15 cm)",
                "Matras",
                "Dumbel atau ransel berisi beban",
                "Gym ball 55–65 cm"
              ]
            },
            {
              "type": "steps",
              "heading": "Fase 1: Fondasi (minggu 1–6)",
              "items": [
                {
                  "name": "Heel Drop",
                  "dose": "3 × 10–15",
                  "cue": "Berdiri di tepi anak tangga. Naik dengan dua kaki, turun pelan 3 detik dengan satu kaki sampai tumit di bawah level tangga. Ulangi dengan lutut sedikit ditekuk."
                },
                {
                  "name": "Step Up",
                  "dose": "3 × 8–12 per kaki",
                  "cue": "Box 30 cm. Dorong lewat tumit kaki yang di atas, lutut searah jari kaki."
                },
                {
                  "name": "Step Down",
                  "dose": "3 × 8–12 per kaki",
                  "cue": "Box 15 cm. Turunkan tumit kaki bebas pelan ke lantai, panggul tetap sejajar."
                },
                {
                  "name": "Hip Hike",
                  "dose": "3 × 12–15 per sisi",
                  "cue": "Berdiri satu kaki di tepi step. Turunkan lalu angkat panggul sisi yang bebas, gerakan dari pinggul samping."
                },
                {
                  "name": "Front Plank with Rotation",
                  "dose": "3 × 20–40 detik",
                  "cue": "Badan lurus dari kepala ke tumit. Untuk progresi, buka satu lengan ke atas bergantian."
                }
              ]
            },
            {
              "type": "steps",
              "heading": "Fase 2: Kekuatan & power (minggu 7–12)",
              "note": "Masuk fase ini kalau Fase 1 sudah terasa mudah dan tidak ada nyeri.",
              "items": [
                {
                  "name": "Lunge",
                  "dose": "3 × 8–12 per kaki",
                  "cue": "Langkah panjang, turun terkontrol. Tambah dumbel saat sudah mudah."
                },
                {
                  "name": "Romanian Deadlift",
                  "dose": "3 × 6–10",
                  "cue": "Dorong pinggul ke belakang, punggung netral, beban tetap dekat kaki."
                },
                {
                  "name": "Single Leg Ball Squat",
                  "dose": "3 × 8–12 per kaki",
                  "cue": "Gym ball di antara punggung dan dinding, squat dengan satu kaki."
                },
                {
                  "name": "Hamstring Ball Roll-in",
                  "dose": "3 × 8–12",
                  "cue": "Telentang, tumit di atas bola. Angkat pinggul, lalu tarik bola ke arah bokong."
                },
                {
                  "name": "Single Leg Hop",
                  "dose": "3 × 10–20 kontak",
                  "cue": "Lompat kecil di tempat dengan satu kaki. Mendarat lembut dan cepat memantul."
                },
                {
                  "name": "Box Jump",
                  "dose": "3 × 5–8",
                  "cue": "Lompat ke box, mendarat lembut. Turun dengan melangkah, bukan melompat."
                }
              ]
            },
            {
              "type": "steps",
              "heading": "Tambahan untuk trail & hiking",
              "items": [
                {
                  "name": "Ankle Turn Out (band)",
                  "dose": "3 × 15 per kaki",
                  "cue": "Dorong kaki ke arah luar melawan band. Menguatkan peroneus untuk mencegah keseleo."
                },
                {
                  "name": "Ankle Turn In (band)",
                  "dose": "3 × 15 per kaki",
                  "cue": "Tarik kaki ke arah dalam melawan band."
                },
                {
                  "name": "Foot Doming",
                  "dose": "3 × 10",
                  "cue": "Tanpa menekuk jari, angkat lengkung telapak kaki membentuk kubah."
                }
              ]
            },
            {
              "type": "callout",
              "tone": "warn",
              "body": "Kalau nyeri saat latihan lebih dari 3 dari 10, hentikan latihan itu sampai ada saran dari fisioterapis. Kalau sedang rehab cedera, ikuti program dari fisioterapismu."
            },
            {
              "type": "callout",
              "tone": "info",
              "body": "Set dan repetisi mengikuti panduan umum latihan kekuatan. Pilihan latihan dan dosis mingguan mengacu pada Science of Running (Napier, 2020)."
            }
          ]
        }
      ]
    },
    {
      "id": "hypertrophy",
      "category": "sport",
      "icon": "dumbbell",
      "title": "Hypertrophy Muscle",
      "shortTitle": "Hypertrophy",
      "eyebrow": "Sport · Hypertrophy",
      "summary": "Latihan beban untuk menambah massa otot: tegangan mekanis sebagai pemicu utama, volume yang naik bertahap, dan pemulihan yang dijaga.",
      "meta": {
        "level": "Pemula",
        "duration": "12 minggu, deload tiap minggu ke-5",
        "frequency": "3–4 sesi / minggu"
      },
      "review": {
        "status": "pending",
        "reviewer": null,
        "date": null
      },
      "modules": [
        {
          "id": "cara-otot-tumbuh",
          "title": "Cara Otot Tumbuh",
          "summary": "Apa yang sebenarnya membuat otot membesar, dan apa yang cuma mitos.",
          "sections": [
            {
              "type": "text",
              "heading": "Hipertrofi itu apa",
              "body": "Hipertrofi adalah bertambahnya ukuran jaringan otot. Protein otot terus-menerus dibentuk dan dipecah setiap hari. Otot tumbuh saat laju pembentukan lebih besar daripada laju pemecahan. Yang membesar bukan hanya serat kontraktilnya, tapi juga cairan di dalam sel otot dan jaringan ikat di sekitarnya. Protein myofibril sendiri menyumbang 60–70% protein di dalam sel otot."
            },
            {
              "type": "steps",
              "heading": "Tiga pemicu pertumbuhan",
              "items": [
                {
                  "name": "Mechanical tension",
                  "dose": "Pemicu utama",
                  "cue": "Saat otot berkontraksi melawan beban, muncul tegangan mekanis. Reseptor di otot mendeteksinya dan memulai rangkaian reaksi yang berujung pada pertumbuhan otot. Ini alasan kenapa beban dan progresinya adalah inti program."
                },
                {
                  "name": "Metabolic stress",
                  "dose": "Pemicu sekunder",
                  "cue": "Penumpukan metabolit seperti laktat saat set berjalan. Kelelahan yang menumpuk membuat serat cepat (fast-twitch) ikut bekerja keras dan terangsang tumbuh."
                },
                {
                  "name": "Muscle damage",
                  "dose": "Pemicu sekunder",
                  "cue": "Kerusakan mikro pada serat otot. Perannya tidak langsung. Pegal hebat bukan tanda latihan berhasil."
                }
              ]
            },
            {
              "type": "list",
              "heading": "Manfaat di luar penampilan",
              "items": [
                "Setelah usia 40, massa otot berkurang sedikit demi sedikit setiap tahun.",
                "Latihan beban yang konsisten plus asupan protein yang cukup terbukti memperlambat penurunan itu.",
                "Latihan beban membantu mencegah dan menangani sarcopenia (kehilangan massa otot) dan dynapenia (kehilangan kekuatan otot)."
              ]
            },
            {
              "type": "callout",
              "tone": "info",
              "body": "Materi modul ini mengacu pada Science of Strength Training (Current, 2021)."
            }
          ]
        },
        {
          "id": "variabel-latihan",
          "title": "Variabel Latihan",
          "summary": "Volume, beban, kedekatan dengan gagal, progresi, dan deload.",
          "sections": [
            {
              "type": "text",
              "heading": "Volume: hitung per kelompok otot per minggu",
              "body": "Volume dihitung dari jumlah set per kelompok otot dalam seminggu. Contoh: 4 set latihan dada per sesi, dikerjakan 3 kali seminggu, berarti 12 set dada per minggu. Rentang yang produktif untuk kebanyakan orang ada di 10–18 set per minggu. Lebih banyak tidak selalu lebih baik. Kalau melewati batas kemampuan pemulihanmu, hasilnya justru menurun."
            },
            {
              "type": "table",
              "heading": "Beban menentukan jumlah repetisi",
              "columns": [
                "Beban",
                "Repetisi",
                "Cocok untuk"
              ],
              "rows": [
                [
                  "Berat",
                  "6 atau kurang",
                  "Kekuatan maksimal"
                ],
                [
                  "Sedang",
                  "6–12",
                  "Hipertrofi / menambah massa otot"
                ],
                [
                  "Ringan",
                  "12–20 atau lebih",
                  "Daya tahan otot"
                ]
              ]
            },
            {
              "type": "list",
              "heading": "Seberapa dekat dengan gagal (RIR)",
              "items": [
                "RIR adalah sisa repetisi yang masih sanggup kamu lakukan di akhir set.",
                "Latihan sampai gagal di setiap set tidak produktif dalam jangka panjang.",
                "Berlatih dalam jarak 4–5 repetisi dari gagal sudah cukup memberi rangsangan untuk tumbuh.",
                "Pemula sebaiknya menyisakan 2–4 repetisi di setiap set."
              ]
            },
            {
              "type": "list",
              "heading": "Progressive overload",
              "items": [
                "Tambah repetisi atau beban lebih dulu. Bisa mengangkat lebih berat atau lebih banyak berarti overload terjadi.",
                "Kalau repetisi dan beban mentok, tambahkan set.",
                "Yang lebih berpengalaman bisa mengurangi RIR 1 poin per minggu.",
                "Setiap tambahan menambah total stres sesi itu. Naikkan satu variabel saja dalam satu waktu."
              ]
            },
            {
              "type": "list",
              "heading": "Deload dan pemulihan",
              "items": [
                "Minggu ke-5 adalah waktu yang ideal untuk deload, yaitu minggu ringan untuk memulihkan diri.",
                "Pemula cukup menurunkan beban sekitar 10–20% selama minggu deload.",
                "Yang sudah lanjut menurunkan jumlah set sekitar 30–50% dari puncaknya dan menambah RIR 2 poin.",
                "Hari istirahat, tidur berkualitas, dan pengelolaan stres adalah bagian dari program, bukan pelengkap."
              ]
            },
            {
              "type": "callout",
              "tone": "info",
              "body": "Tempo terkontrol: turunkan beban (fase eksentrik) dalam hitungan 2–3 detik dan angkat (fase konsentrik) dalam 1 detik, supaya teknik terjaga dan otot tetap mendapat tegangan."
            }
          ]
        },
        {
          "id": "program-pemula",
          "title": "Program Pemula",
          "summary": "Pilihan 3 atau 4 sesi per minggu, seluruh tubuh terlatih merata.",
          "sections": [
            {
              "type": "list",
              "heading": "Aturan untuk semua sesi",
              "items": [
                "8–10 repetisi per set",
                "4 set per latihan",
                "Istirahat 60–90 detik antar set",
                "Sisakan 3–4 repetisi dari gagal (RIR 3–4)",
                "Tempo terkontrol",
                "Mulai setiap sesi dengan pemanasan"
              ]
            },
            {
              "type": "table",
              "heading": "Pilihan A: 3 sesi per minggu",
              "note": "Beri jeda minimal satu hari antar sesi. Latihan boleh diganti variasinya sesuai alat yang tersedia.",
              "columns": [
                "Sesi",
                "Latihan"
              ],
              "rows": [
                [
                  "Sesi 1",
                  "Barbell back squat · Leg curl · Dumbbell bench press atau Push-up · Wide-grip lat pulldown atau Pull-up · Dumbbell shoulder press · Front plank with rotation"
                ],
                [
                  "Sesi 2",
                  "Barbell bench press · Romanian deadlift · Neutral-grip row · Shoulder press (mesin atau dumbel) · Leg extension · TVA ball crunch"
                ],
                [
                  "Sesi 3",
                  "Traditional deadlift atau Step up with dumbbells · Neutral-grip lat pulldown atau Chin-up · Cable chest fly · Leg curl · Shoulder press · Cable rotational oblique twist"
                ]
              ]
            },
            {
              "type": "table",
              "heading": "Pilihan B: 4 sesi per minggu",
              "note": "Volume per sesi lebih kecil, tapi total mingguannya lebih besar. Pilih ini kalau bisa latihan 4 hari.",
              "columns": [
                "Sesi",
                "Latihan"
              ],
              "rows": [
                [
                  "Sesi 1",
                  "Barbell bench press · Leg press · Rope triceps pushdown · Dumbbell lateral raise · Cable rope crunch"
                ],
                [
                  "Sesi 2",
                  "Neutral-grip lat pulldown atau Chin-up · Leg curl · Dumbbell glute bridge · Dumbbell biceps curl · Leg extension"
                ],
                [
                  "Sesi 3",
                  "Calf raise · Cable chest fly · Dumbbell triceps extension · Dumbbell shoulder press · Cable rotational oblique twist"
                ],
                [
                  "Sesi 4",
                  "Neutral-grip row · Romanian deadlift · Dumbbell glute bridge · Banded biceps curl · Seated calf raise"
                ]
              ]
            },
            {
              "type": "list",
              "heading": "Kalau kamu juga rutin lari",
              "items": [
                "Beri jarak antara sesi kaki yang berat dengan sesi lari yang berat. Jangan ditumpuk di hari yang sama.",
                "Latihan kekuatan untuk pelari ada di modul Strength Training di Running Programs. Program hipertrofi ini tujuannya berbeda: menambah ukuran otot, bukan menyiapkan kaki untuk lari."
              ]
            },
            {
              "type": "callout",
              "tone": "warn",
              "body": "Utamakan teknik sebelum menambah beban. Kalau ada nyeri saat latihan, riwayat cedera, atau belum pernah latihan beban sama sekali, minta pendampingan fisioterapis atau pelatih untuk sesi-sesi awal."
            }
          ]
        },
        {
          "id": "nutrisi-pemulihan",
          "title": "Nutrisi & Pemulihan",
          "summary": "Protein harian, kalori, dan istirahat yang menopang pertumbuhan otot.",
          "sections": [
            {
              "type": "list",
              "heading": "Protein",
              "items": [
                "Untuk orang dewasa yang aktif berlatih: sekitar 1,6–2,2 gram protein per kilogram berat badan per hari.",
                "Contoh: orang dengan berat 70 kg butuh sekitar 112–154 gram protein per hari, tergantung kebutuhan energi dan komposisi tubuhnya.",
                "Tubuh tidak punya cadangan protein seperti karbohidrat dan lemak, jadi asupannya harus dicukupi setiap hari."
              ]
            },
            {
              "type": "list",
              "heading": "Kalori",
              "items": [
                "Untuk menambah berat badan, tambahkan surplus sekitar 10–15% dari kebutuhan kalori harianmu.",
                "Contoh: kebutuhan 2.310 kkal, ditambah 15% menjadi sekitar 2.650 kkal per hari.",
                "Naikkan perlahan sambil memantau perubahan berat badan dari minggu ke minggu."
              ]
            },
            {
              "type": "list",
              "heading": "Pemulihan",
              "items": [
                "Latihan beban memecah serat otot. Pertumbuhan terjadi saat pemulihan, bukan saat latihan.",
                "Tanpa pemulihan yang cukup, performa latihan menurun dan adaptasinya tidak maksimal.",
                "Jadwalkan hari istirahat sejak awal, jangan menunggu sampai kelelahan menumpuk."
              ]
            },
            {
              "type": "callout",
              "tone": "info",
              "body": "Angka protein dan kalori mengacu pada Science of Strength Training (Current, 2021). Untuk kebutuhan khusus, misalnya alergi, program penurunan berat badan, atau kondisi medis tertentu, konsultasikan ke ahli gizi."
            }
          ]
        }
      ]
    },
    {
      "id": "hiking",
      "category": "sport",
      "icon": "mountain",
      "title": "Hiking Program",
      "shortTitle": "Hiking",
      "eyebrow": "Sport · Hiking",
      "summary": "Persiapan 8 minggu untuk pendakian: kuat saat nanjak, lutut aman saat turun, dan pergelangan kaki stabil di medan tidak rata.",
      "meta": {
        "level": "Pemula – Menengah",
        "duration": "8 minggu",
        "frequency": "3–4 sesi / minggu"
      },
      "review": {
        "status": "pending",
        "reviewer": null,
        "date": null
      },
      "modules": [
        {
          "id": "kenali-medan",
          "title": "Kenali Beban Medan",
          "summary": "Tanjakan, turunan, dan medan tidak rata melatih otot yang berbeda.",
          "sections": [
            {
              "type": "list",
              "heading": "Apa yang terjadi di tubuh",
              "items": [
                "Tanjakan: otot bekerja konsentrik (memendek) untuk mendorong badan naik. Betis, hamstring, dan glute bekerja paling keras.",
                "Turunan: gravitasi membantu, tapi benturannya lebih besar. Quadriceps bekerja eksentrik (mengerem) dan cepat lelah, sehingga lutut ikut terbebani.",
                "Medan tidak rata: setiap langkah berbeda. Otot sisi luar pergelangan kaki (peroneus) bekerja keras menjaga kaki agar tidak terkilir."
              ]
            },
            {
              "type": "steps",
              "heading": "Pemanasan sebelum mendaki",
              "note": "10–15 repetisi, tahan 1–2 detik per gerakan.",
              "items": [
                {
                  "name": "Gastrocnemius Wall Stretch (dinamis)",
                  "dose": "10–15×",
                  "cue": "Tekan tumit ke lantai bergantian."
                },
                {
                  "name": "Standing Hip Circles",
                  "dose": "10× per arah",
                  "cue": "Putar pinggul membentuk lingkaran besar."
                },
                {
                  "name": "Standing Hip Flexor Stretch",
                  "dose": "10–15×",
                  "cue": "Dorong panggul ke depan perlahan, lalu kembali."
                },
                {
                  "name": "Seated Hamstring Stretch",
                  "dose": "10–15×",
                  "cue": "Condongkan badan ke kaki yang lurus, lalu kembali."
                },
                {
                  "name": "Standing Half Moon",
                  "dose": "10× per sisi",
                  "cue": "Tangan ke atas, tekuk badan ke samping."
                }
              ]
            }
          ]
        },
        {
          "id": "progresi",
          "title": "Program 8 Minggu",
          "summary": "Naikkan durasi, tanjakan, dan beban ransel secara bertahap.",
          "sections": [
            {
              "type": "table",
              "heading": "Progresi mingguan",
              "columns": [
                "Minggu",
                "Sesi utama (akhir pekan)",
                "Ransel"
              ],
              "rows": [
                [
                  "1–2",
                  "Jalan cepat 45–60 menit di jalur datar atau bergelombang",
                  "Ringan"
                ],
                [
                  "3–4",
                  "60–90 menit dengan tanjakan atau tangga",
                  "Tambah sedikit"
                ],
                [
                  "5–6",
                  "2–3 jam trail dengan elevasi",
                  "Mendekati beban asli"
                ],
                [
                  "7",
                  "Simulasi pendakian 4–5 jam",
                  "Beban penuh"
                ],
                [
                  "8",
                  "Tapering: 1–2 jam santai, tubuh segar untuk hari-H",
                  "Ringan"
                ]
              ]
            },
            {
              "type": "list",
              "heading": "Sesi pendukung di hari kerja",
              "items": [
                "2× latihan kekuatan: Step Up, Step Down, Lunge, Heel Drop, Hip Hike, ditambah Ankle Turn In/Out (lihat Strength Training di Running Programs).",
                "1× cardio 30–45 menit: jalan cepat, walk–run, atau naik–turun tangga."
              ]
            },
            {
              "type": "list",
              "heading": "Tips di jalur",
              "items": [
                "Saat turun, pakai langkah pendek dan lutut sedikit ditekuk untuk mengurangi benturan.",
                "Pakai trekking pole kalau turunannya panjang.",
                "Pakai sepatu yang sudah biasa dipakai, jangan sepatu baru di hari-H."
              ]
            },
            {
              "type": "callout",
              "tone": "info",
              "body": "Prinsip medan mengacu pada Science of Running (Napier, 2020). Pemanasan mengacu pada routine walkers di Science of Stretch (Malek, 2023). Progresi 8 minggu disusun Ruang Fisio."
            }
          ]
        }
      ]
    }
  ],
  "injuryIntro": {
    "rules": [
      "Kaku ringan dan pegal menyeluruh setelah latihan itu wajar. Nyeri sedang ke atas bisa jadi tanda cedera.",
      "Nyeri lebih dari 3 dari 10 saat atau setelah lari: hentikan latihan dan konsultasikan ke fisioterapis.",
      "Cara lari berubah karena nyeri juga tanda untuk berhenti."
    ],
    "police": [
      {
        "letter": "P",
        "name": "Protection",
        "body": "Lindungi area cedera dengan taping, brace, atau insole."
      },
      {
        "letter": "OL",
        "name": "Optimal Loading",
        "body": "Jangan dibebani berlebihan, tapi jangan juga didiamkan total. Tetap bergerak dalam batas nyaman."
      },
      {
        "letter": "I",
        "name": "Ice",
        "body": "Kompres es untuk meredakan nyeri."
      },
      {
        "letter": "CE",
        "name": "Compression & Elevation",
        "body": "Balut tekan dan tinggikan untuk mengurangi bengkak."
      }
    ]
  },
  "injuries": [
    {
      "id": "runners-knee",
      "title": "Runner's Knee",
      "aka": "Patellofemoral pain",
      "area": "Lutut",
      "summary": "Nyeri di sekitar, di belakang, atau di bawah tempurung lutut.",
      "review": {
        "status": "pending",
        "reviewer": null,
        "date": null
      },
      "symptoms": [
        "Nyeri di sekitar tempurung lutut, dari ringan sampai berat",
        "Terasa saat lari, jongkok, duduk lama, atau naik tangga"
      ],
      "causes": [
        "Kenaikan beban latihan yang berlebihan atau mendadak",
        "Paha cenderung menutup ke dalam (hip adduction) saat melangkah",
        "Permukaan keras dan banyak turunan"
      ],
      "firstSteps": [
        "Kurangi beban latihan sementara",
        "Taping, brace, atau insole untuk meredakan nyeri jangka pendek",
        "Gait retraining kalau ada faktor biomekanik"
      ],
      "exercises": [
        "Hip Hike",
        "Standing Hip Rotation",
        "Step Down",
        "Step Up",
        "Single Leg Ball Squat",
        "Lunge"
      ],
      "returnToRun": [
        "Jadikan nyeri sebagai patokan",
        "Jaga kebugaran dengan sepeda statis atau renang",
        "Mulai di permukaan lunak dan hindari tanjakan atau turunan dulu"
      ]
    },
    {
      "id": "achilles",
      "title": "Achilles Tendinopathy",
      "aka": "Nyeri tendon Achilles",
      "area": "Tumit belakang",
      "summary": "Nyeri di sepanjang tendon Achilles atau di tempat tendon menempel ke tulang tumit.",
      "review": {
        "status": "pending",
        "reviewer": null,
        "date": null
      },
      "symptoms": [
        "Nyeri tumit belakang saat pagi atau awal lari, sering mereda setelah tubuh hangat",
        "Tendon bisa terasa menebal"
      ],
      "causes": [
        "Kenaikan jarak, frekuensi, atau intensitas yang mendadak",
        "Ganti sepatu",
        "Lari di permukaan lebih keras"
      ],
      "firstSteps": [
        "Kurangi beban latihan. Kalau ditangani dini, keluhan bisa tenang dalam 5–10 hari",
        "Sepatu dengan hak sedikit lebih tinggi atau heel wedge untuk mengurangi beban tendon",
        "Hindari speed work dan lari menanjak sampai pulih"
      ],
      "exercises": [
        "Heel Drop (termasuk versi duduk)",
        "Dynamic Calf Stretch",
        "Single Leg Hop (tahap lanjut)"
      ],
      "returnToRun": [
        "Naikkan beban bertahap sampai kembali ke level semula",
        "Nyeri tendon bisa baru muncul hingga 24 jam setelah dibebani, jadi pantau keesokan harinya"
      ]
    },
    {
      "id": "shin-splints",
      "title": "Shin Splints",
      "aka": "Medial tibial stress syndrome (MTSS)",
      "area": "Tulang kering",
      "summary": "Nyeri di sepanjang sisi dalam tulang kering saat menumpu beban.",
      "review": {
        "status": "pending",
        "reviewer": null,
        "date": null
      },
      "symptoms": [
        "Nyeri menyebar di sisi dalam tulang kering, minimal sepanjang 5 cm",
        "Area terasa nyeri saat ditekan"
      ],
      "causes": [
        "Umum pada pelari baru",
        "Permukaan keras atau miring, sepatu baru, atau intensitas naik mendadak",
        "Cadence rendah (di bawah 170 langkah per menit) atau langkah terlalu sempit"
      ],
      "firstSteps": [
        "Kurangi beban latihan sementara",
        "Naikkan beban bertahap dengan memperhitungkan riwayat latihan, permukaan, dan sepatu",
        "Gait retraining kalau ada faktor biomekanik"
      ],
      "exercises": [
        "Heel Drop (menguatkan soleus)",
        "Ankle Turn In (tibialis posterior)",
        "Ankle Turn Out"
      ],
      "returnToRun": [
        "Jaga kebugaran dengan renang atau sepeda",
        "Mulai di permukaan lunak seperti trail",
        "Hindari turunan dan jalan miring dulu"
      ]
    },
    {
      "id": "plantar",
      "title": "Plantar Fasciitis",
      "aka": "Plantar heel pain",
      "area": "Telapak kaki",
      "summary": "Nyeri di bawah tumit, paling terasa di langkah pertama pagi hari.",
      "review": {
        "status": "pending",
        "reviewer": null,
        "date": null
      },
      "symptoms": [
        "Nyeri tumit bawah saat menumpu, terutama pagi hari atau setelah lama duduk",
        "Bisa mereda saat lari",
        "Area sangat nyeri saat ditekan"
      ],
      "causes": [
        "Kenaikan beban latihan yang mendadak",
        "Permukaan keras",
        "Sepatu baru atau tidak cocok, termasuk sepatu harian"
      ],
      "firstSteps": [
        "Sepatu suportif atau insole untuk memindahkan tekanan dari tumit",
        "Rotasi sepatu baru dengan sepatu lama secara bertahap",
        "Kurangi beban latihan sementara"
      ],
      "exercises": [
        "Foot Doming",
        "Resisted Toe",
        "Heel Drop",
        "Dynamic Calf Stretch",
        "Ankle Turn In"
      ],
      "returnToRun": [
        "Hindari speed work sampai pulih",
        "Gejala bisa baru muncul hingga 24 jam setelah dibebani",
        "Jaga kebugaran dengan renang atau sepeda"
      ]
    },
    {
      "id": "it-band",
      "title": "IT Band Pain",
      "aka": "Iliotibial band syndrome",
      "area": "Lutut sisi luar",
      "summary": "Nyeri tajam di sisi luar lutut, sering memburuk saat turunan panjang.",
      "review": {
        "status": "pending",
        "reviewer": null,
        "date": null
      },
      "symptoms": [
        "Nyeri di sisi luar lutut saat lutut menekuk ketika menapak",
        "Bisa tajam dan membuat berhenti lari",
        "Memburuk saat turunan panjang"
      ],
      "causes": [
        "Kenaikan latihan yang cepat, terutama dengan banyak turunan",
        "Panggul sisi berlawanan turun saat menapak (pelvic drop)",
        "Paha menutup ke dalam atau langkah terlalu sempit"
      ],
      "firstSteps": [
        "Kurangi volume dan hindari turunan",
        "Penguatan otot abduktor pinggul",
        "Stretch dinamis dan recovery, termasuk TFL ball release. IT band sendiri tidak bisa di-stretch."
      ],
      "exercises": [
        "Hip Hike",
        "Standing Hip Rotation",
        "Hip Extension",
        "Single Leg Ball Squat",
        "TFL Ball Release"
      ],
      "returnToRun": [
        "Jangan lari menembus nyeri",
        "Batasi jarak di rentang yang bebas nyeri",
        "Kembali ke volume tinggi terlalu cepat sering membuat kambuh"
      ]
    },
    {
      "id": "ankle-sprain",
      "title": "Keseleo Pergelangan Kaki",
      "aka": "Ankle sprain & chronic ankle instability",
      "area": "Pergelangan kaki",
      "summary": "Cedera ligamen karena kaki terkilir ke arah dalam. Paling sering terjadi di trail dan hiking.",
      "review": {
        "status": "pending",
        "reviewer": null,
        "date": null
      },
      "symptoms": [
        "Nyeri dan bengkak di sisi luar pergelangan kaki setelah terkilir",
        "Pergelangan terasa tidak stabil atau mudah terkilir lagi"
      ],
      "causes": [
        "Medan tidak rata, jalan miring, atau batu lepas",
        "Otot peroneus dan keseimbangan yang kurang terlatih",
        "Riwayat keseleo sebelumnya"
      ],
      "firstSteps": [
        "Terapkan POLICE di hari-hari awal",
        "Tetap gerakkan pergelangan dalam batas nyaman",
        "Periksakan ke fisioterapis kalau tidak bisa menumpu atau bengkak besar"
      ],
      "exercises": [
        "Ankle Turn Out (eversion)",
        "Ankle Turn In (inversion)",
        "Resisted Toe",
        "Foot Doming",
        "Single Leg Hop (tahap lanjut)"
      ],
      "returnToRun": [
        "Mulai di jalur rata sebelum kembali ke trail",
        "Latih berdiri satu kaki sampai stabil",
        "Rasa sudah sembuh belum tentu jaringan siap. Ligamen butuh waktu untuk pulih."
      ]
    }
  ],
  "sources": [
    "Napier, C. (2020). Science of Running. Dorling Kindersley.",
    "Malek, L. (2023). Science of Stretch. Dorling Kindersley.",
    "Current, A. (2021). Science of Strength Training. Dorling Kindersley."
  ]
};

export function getProgram(id: string) {
  return programsContent.programs.find((program) => program.id === id);
}

export function getModule(programId: string, moduleId: string) {
  const program = getProgram(programId);
  if (!program) return undefined;
  const module = program.modules.find((item) => item.id === moduleId);
  if (!module) return undefined;
  return { program, module };
}

export function getInjury(id: string) {
  return programsContent.injuries.find((injury) => injury.id === id);
}

export function getCategory(id: "sport" | "injury") {
  return programsContent.categories.find((category) => category.id === id);
}
