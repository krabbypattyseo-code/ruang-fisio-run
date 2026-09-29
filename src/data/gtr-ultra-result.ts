/**
 * Hasil & evaluasi GTR Ultra 30K — DNF.
 * Sumber: docs/10-ruang-fisio-update-gtr-dnf.md (29 Sep 2026).
 */

export type EventStatus = "upcoming" | "finished" | "dnf";

export type EventResult = {
  status: Exclude<EventStatus, "upcoming">;
  label: string;
  headline: string;
  reason: "cot" | "cedera" | "mundur" | "lainnya";

  courseKm: number;
  courseAscentM: number;
  coveredKm: number;
  remainingKm: number;
  watchKm: number;
  watchOverreadPct: number;

  raceElapsed: string;
  movingTime: string;
  stoppedTime: string;
  cutoff: string;
  overCutoffBy: string;

  truePacePerKm: string;
  requiredPacePerKm: string;
  avgHr: number;
  avgCadence: number;
  trainingLoad: number;
  calories: number;
  aerobicTe: number;
  anaerobicTe: number;

  evaluation: EventEvaluation;
};

export type EventEvaluation = {
  verdict: string[];
  budget: { label: string; value: string; note?: string; kind: "need" | "have" | "sub" }[];
  causes: {
    title: string;
    severity: "utama" | "pendukung" | "bukan";
    body: string;
  }[];
  segments: {
    label: string;
    km: number;
    time: string;
    pace: string;
    hr: number;
    note: string;
  }[];
  terrain: {
    label: string;
    laps: number;
    time: string;
    pace: string;
    hr: number;
    note: string;
    emphasize?: boolean;
  }[];
  hrZones: {
    zone: string;
    range: string;
    time: string;
    pct: number;
    note: string;
  }[];
  worstLaps: {
    km: number;
    time: string;
    ascent: number;
    descent: number;
    hr: number;
    note: string;
  }[];
  checkpoints: {
    pos: string;
    courseKm: number;
    watchKm: number;
    target: string;
    personalLimit: string;
    actual: string;
    vsTarget: string;
    vsLimit: string;
  }[];
  weeklyLoad: {
    week: string;
    sessions: number;
    km: number;
    time: string;
    ascent: number;
    gym: string;
  }[];
  prepGaps: {
    metric: string;
    race: string;
    best: string;
    ratio: string;
    note: string;
  }[];
  gym: { aspect: string; value: string; verdict: string; weak?: boolean }[];
  whatWorked: { title: string; body: string }[];
  actions: {
    priority: number;
    action: string;
    frequency: string;
    target: string;
    why: string;
  }[];
  checkpointNotes: string[];
  segmentNote: string;
  terrainNote: string;
};

export const gtrUltraResult: EventResult = {
  status: "dnf",
  label: "DNF",
  headline: "29,6 dari 31,1 km · berhenti 1,5 km sebelum finis · lewat COT 12 menit",
  reason: "cot",

  courseKm: 31.09,
  courseAscentM: 1791,
  coveredKm: 29.62,
  remainingKm: 1.47,
  watchKm: 33.19,
  watchOverreadPct: 12.1,

  raceElapsed: "10:12:27",
  movingTime: "10:17:23",
  stoppedTime: "0:08:04",
  cutoff: "10:00:00",
  overCutoffBy: "0:12:27",

  truePacePerKm: "20:50",
  requiredPacePerKm: "19:17",
  avgHr: 146,
  avgCadence: 100,
  trainingLoad: 1165,
  calories: 6437,
  aerobicTe: 5.9,
  anaerobicTe: 4.7,

  evaluation: {
    verdict: [
      "Race ini berhenti karena kehabisan waktu, dan berhentinya sangat dekat. Setelah dicocokkan dengan GPX resmi, Harist berada di km 29,6 dari 31,09 — 1,47 kilometer dari garis finis, di jalur yang tinggal turun 46 meter dan naik 23 meter. Praktis datar. Tapi jam lomba sudah menunjuk 10:12:27, sementara COT-nya 10:00:00.",
      "Jalurnya diikuti dengan benar dari start sampai berhenti — profil ketinggian 34 lap menempel ke profil GPX dengan RMS 25,7 meter, tanpa satu pun titik yang lepas. Yang meleset alat ukurnya: COROS membaca 33,19 km untuk posisi yang sebenarnya km 29,62. Untuk lomba berlabel 30K, artinya sepanjang paruh kedua jam itu bilang jarak lomba sudah lewat, padahal finis masih di depan. Itu tidak menambah waktu sedetik pun, tapi membuat setiap keputusan di paruh kedua diambil dari peta yang salah.",
      "Yang jelas dari data: batasnya bukan jantung. Hanya 7% waktu di zona Threshold dan 0,4% di Anaerobic Endurance; 75% sisanya di Recovery dan Aerobic Endurance. Mesin aerobiknya tidak pernah didekati batasnya selama sepuluh jam. Yang menyerah lebih dulu adalah kaki, khususnya kemampuan menahan turunan.",
    ],
    budget: [
      { kind: "need", label: "Dibutuhkan untuk finis dalam COT", value: "~30:00" },
      { kind: "sub", label: "Sudah lewat COT saat berhenti", value: "12:27" },
      {
        kind: "sub",
        label: "Sisa 1,47 km @ 12:00/km",
        value: "17:38",
        note: "Jalur datar: naik 23 m, turun 46 m",
      },
      { kind: "have", label: "Tersedia tapi tidak diambil", value: "51:11" },
      {
        kind: "sub",
        label: "8 lap turunan ≥100 m @ 12:00/km",
        value: "41:17",
        note: "Sekarang 2:17:17 (17:09/km); pada 12:00/km jadi 1:36:00",
      },
      {
        kind: "sub",
        label: "km-19 dinormalkan",
        value: "9:54",
        note: "Lap sejenis rata-rata 16:49; km-19 26:44",
      },
    ],
    causes: [
      {
        title: "Kekuatan menahan turunan",
        severity: "utama",
        body: "Lap net-turun rata-rata 17:25/km, lap net-naik 19:57/km — turun hanya 2:32/km lebih cepat daripada naik. Pada kaki yang masih berfungsi, turunan 2–3× lebih cepat dari tanjakan. Km-32 yang turun 155 m tanpa satu meter pun tanjakan butuh 25:12. Kerusakan eksentrik quad dan betis — di sinilah 41 menit yang hilang.",
      },
      {
        title: "Sesi panjang tidak pernah dilatih",
        severity: "utama",
        body: "Sesi terlama dalam 90 hari sebelum lomba: 4:47:20 — dan itu jalan santai di Wonosobo menemani orang lain. Lomba berlangsung 10:12:27, 2,13× lebih lama. Pace ambruk ke 22:54/km di km 11–15, persis ketika masuk jam keempat.",
      },
      {
        title: "Volume elevasi terlalu kecil",
        severity: "utama",
        body: "Total tanjakan 90 hari sebelum lomba: 612 m. Kursusnya 1.791 m — 2,93× total tiga bulan, dalam satu hari. Sesi ber-elevasi terakhir 30 Agustus, 28 hari sebelum start.",
      },
      {
        title: "Batas mundur terlewat sejak WS 1 — tapi tersamarkan",
        severity: "pendukung",
        body: "Dikonversi ke km kursus, batas mundur pribadi sudah terlewat sejak pos pertama (+4:36), melebar jadi +29:41 di WS 4. Ini bukan sinyal yang diabaikan — ini sinyal yang tidak terbaca. Di WS 1 jam menunjuk 6,7 km padahal posisinya km 6,0, jadi selisih 4 menit terasa jauh lebih ringan. Panitia hanya punya COT di finis, jadi tidak ada koreksi dari luar.",
      },
      {
        title: "Jam membaca jarak lebih jauh dari kenyataan",
        severity: "pendukung",
        body: "Di km kursus 6 jam menunjuk 6,7; di km 24 menunjuk 26,9; di titik berhenti 33,19 untuk posisi 29,62. Tidak menambah waktu sedetik pun — yang dirusak informasinya.",
      },
      {
        title: "Waktu terbuang di dua kilometer",
        severity: "pendukung",
        body: "Km-13 (40:11, tanjakan 188 m) dan km-19 (26:44). Km-19 cuma 3 m tanjakan dengan HR 126 — terendah sepanjang lomba. Dibanding lap sejenis, km-19 sendiri kehilangan 9:54.",
      },
      {
        title: "Bukan kapasitas aerobik",
        severity: "bukan",
        body: "7% di Threshold, 0,4% di Anaerobic Endurance, 0% di Anaerobic Power. HR rata-rata 146. Mesin aerobiknya belum tersentuh — dan itu kabar baik.",
      },
      {
        title: "Bukan pacing",
        severity: "bukan",
        body: "Paruh pertama 18:33/km, paruh kedua 18:39/km. Nyaris identik, tanpa positive split. Start dini hari pun tidak bikin over-pace.",
      },
      {
        title: "Bukan disiplin berhenti",
        severity: "bukan",
        body: "Target ≤ 23 menit, aktual 8:04. Terlampaui jauh — salah satu eksekusi terbaik sepanjang lomba.",
      },
      {
        title: "Bukan navigasi",
        severity: "bukan",
        body: "Profil 34 lap menempel ke GPX, RMS 25,7 m, residual terbesar 51 m. Jalurnya benar dari start sampai berhenti.",
      },
    ],
    segments: [
      {
        label: "km 1–5",
        km: 5.0,
        time: "1:28:50",
        pace: "17:46",
        hr: 158.0,
        note: "naik 514 m · turun 69 m — langsung menanjak dari start",
      },
      {
        label: "km 6–10",
        km: 5.0,
        time: "1:17:28",
        pace: "15:29",
        hr: 150.6,
        note: "naik 356 m · turun 209 m — segmen tercepat",
      },
      {
        label: "km 11–15",
        km: 5.0,
        time: "1:54:33",
        pace: "22:54",
        hr: 145.0,
        note: "naik 467 m · turun 107 m — terlambat, termasuk km-13",
      },
      {
        label: "km 16–20",
        km: 5.0,
        time: "1:35:59",
        pace: "19:11",
        hr: 134.4,
        note: "naik 85 m · turun 374 m — turunan, tapi HR justru jatuh",
      },
      {
        label: "km 21–25",
        km: 5.0,
        time: "1:31:50",
        pace: "18:22",
        hr: 146.8,
        note: "naik 245 m · turun 355 m — HR pulih",
      },
      {
        label: "km 26–30",
        km: 5.0,
        time: "1:31:49",
        pace: "18:21",
        hr: 145.6,
        note: "naik 216 m · turun 250 m",
      },
      {
        label: "km 31–34",
        km: 3.19,
        time: "0:56:54",
        pace: "17:50",
        hr: 149.2,
        note: "naik 15 m · turun 462 m — turunan penuh, pace tetap 17:50",
      },
    ],
    terrain: [
      {
        label: "Lap net naik (> +30 m)",
        laps: 15,
        time: "4:59:16",
        pace: "19:57",
        hr: 153,
        note: "48,5% dari total waktu",
      },
      {
        label: "Lap net turun (< −30 m)",
        laps: 14,
        time: "4:04:03",
        pace: "17:25",
        hr: 142,
        note: "39,5% waktu — cuma 2:32/km lebih cepat dari tanjakan",
        emphasize: true,
      },
      {
        label: "Lap net datar (±30 m)",
        laps: 5,
        time: "1:14:04",
        pace: "17:40",
        hr: 143,
        note: "12,0% waktu",
      },
      {
        label: "Lap turunan ≥ 100 m",
        laps: 8,
        time: "2:17:17",
        pace: "17:09",
        hr: 146,
        note: "Di sinilah 41 menit itu",
        emphasize: true,
      },
      {
        label: "Lap tanjakan ≥ 150 m",
        laps: 2,
        time: "1:06:07",
        pace: "33:03",
        hr: 149,
        note: "km-3 dan km-13",
      },
    ],
    hrZones: [
      {
        zone: "Recovery",
        range: "< 137 bpm",
        time: "1:59:32",
        pct: 0.19,
        note: "Termasuk jeda dan segmen paling pelan",
      },
      {
        zone: "Aerobic Endurance",
        range: "137–154 bpm",
        time: "5:45:49",
        pct: 0.56,
        note: "Zona kerja utama — benar untuk lomba 10 jam",
      },
      {
        zone: "Aerobic Power",
        range: "155–162 bpm",
        time: "1:48:50",
        pct: 0.18,
        note: "Tanjakan",
      },
      {
        zone: "Threshold",
        range: "163–174 bpm",
        time: "0:40:45",
        pct: 0.07,
        note: "Sistem aerobik tidak pernah mendekati batas",
      },
      {
        zone: "Anaerobic Endurance",
        range: "175–181 bpm",
        time: "0:02:27",
        pct: 0.004,
        note: "Praktis nol",
      },
      {
        zone: "Anaerobic Power",
        range: "> 181 bpm",
        time: "0:00:00",
        pct: 0,
        note: "Nol",
      },
    ],
    worstLaps: [
      {
        km: 13,
        time: "40:11",
        ascent: 188,
        descent: 14,
        hr: 144,
        note: "Tanjakan terberat lomba. Wajar lambat, tapi 40 menit untuk 1 km artinya nyaris berhenti bergerak.",
      },
      {
        km: 19,
        time: "26:44",
        ascent: 3,
        descent: 81,
        hr: 126,
        note: "Anomali. Nyaris datar, HR terendah sepanjang lomba. Ini berhenti — aid station, nutrisi, atau kram. Kehilangan 9:54 vs lap sejenis.",
      },
      {
        km: 3,
        time: "25:56",
        ascent: 163,
        descent: 4,
        hr: 153,
        note: "Tanjakan awal, masih segar.",
      },
      {
        km: 32,
        time: "25:12",
        ascent: 0,
        descent: 155,
        hr: 143,
        note: "Anomali. Nol tanjakan, turun 155 m. Ini seharusnya lap tercepat lomba, bukan urutan ke-4 terlambat.",
      },
      {
        km: 21,
        time: "22:30",
        ascent: 110,
        descent: 26,
        hr: 150,
        note: "Tanjakan setelah jam keenam.",
      },
    ],
    checkpoints: [
      {
        pos: "WS 1",
        courseKm: 6.0,
        watchKm: 6.7,
        target: "1:28",
        personalLimit: "1:50",
        actual: "1:54:36",
        vsTarget: "+26:36",
        vsLimit: "+4:36",
      },
      {
        pos: "WS 2",
        courseKm: 12.0,
        watchKm: 13.4,
        target: "3:06",
        personalLimit: "3:50",
        actual: "4:09:19",
        vsTarget: "+1:03:19",
        vsLimit: "+19:19",
      },
      {
        pos: "WS 3",
        courseKm: 18.0,
        watchKm: 20.2,
        target: "4:52",
        personalLimit: "5:50",
        actual: "6:15:42",
        vsTarget: "+1:23:42",
        vsLimit: "+25:42",
      },
      {
        pos: "WS 4",
        courseKm: 24.0,
        watchKm: 26.9,
        target: "6:42",
        personalLimit: "7:50",
        actual: "8:19:41",
        vsTarget: "+1:37:41",
        vsLimit: "+29:41",
      },
      {
        pos: "WS 5",
        courseKm: 28.0,
        watchKm: 31.4,
        target: "7:54",
        personalLimit: "9:10",
        actual: "9:39:06",
        vsTarget: "+1:45:06",
        vsLimit: "+29:06",
      },
      {
        pos: "Finis",
        courseKm: 31.09,
        watchKm: 34.8,
        target: "8:21",
        personalLimit: "10:00",
        actual: "tidak tercapai",
        vsTarget: "—",
        vsLimit: "—",
      },
    ],
    weeklyLoad: [
      {
        week: "H-84 … H-78",
        sessions: 1,
        km: 3.0,
        time: "0:23:54",
        ascent: 0,
        gym: "— · Treadmill 2,99 km",
      },
      {
        week: "H-77 … H-71",
        sessions: 0,
        km: 0,
        time: "—",
        ascent: 0,
        gym: "22 Jul Legs (1.400 kg) · tidak ada sesi lari",
      },
      {
        week: "H-70 … H-64",
        sessions: 2,
        km: 9.8,
        time: "1:59:36",
        ascent: 9,
        gym: "27 Jul Legs (3.650 kg)",
      },
      {
        week: "H-63 … H-57",
        sessions: 2,
        km: 12.9,
        time: "2:48:13",
        ascent: 25,
        gym: "1 Agu Pull · 4 Agu Pull · Long Walk 7,74 km",
      },
      {
        week: "H-56 … H-50",
        sessions: 2,
        km: 10.0,
        time: "1:36:23",
        ascent: 18,
        gym: "7 Agu Push · 9 Agu Legs (9.312 kg) · 10 Agu Pull",
      },
      {
        week: "H-49 … H-43",
        sessions: 2,
        km: 10.0,
        time: "1:36:00",
        ascent: 9,
        gym: "15 Agu Push (88 menit, sesi terlama)",
      },
      {
        week: "H-42 … H-36",
        sessions: 2,
        km: 11.4,
        time: "1:57:49",
        ascent: 9,
        gym: "21 Agu Legs (9.250 kg) · puncak blok gym",
      },
      {
        week: "H-35 … H-29",
        sessions: 1,
        km: 5.0,
        time: "0:43:49",
        ascent: 2,
        gym: "24 Agu Pull · 25 Agu Legs (11.741 kg, tertinggi)",
      },
      {
        week: "H-28 … H-22",
        sessions: 3,
        km: 18.2,
        time: "6:16:09",
        ascent: 525,
        gym: "— · Wonosobo 8,13 km / 4:47:20 / naik 516 m (jalan santai)",
      },
      {
        week: "H-21 … H-15",
        sessions: 2,
        km: 10.1,
        time: "1:26:36",
        ascent: 7,
        gym: "— · gym kosong",
      },
      {
        week: "H-14 … H-8",
        sessions: 2,
        km: 9.4,
        time: "1:14:34",
        ascent: 8,
        gym: "17 Sep Legs (3.096 kg) · 19 Sep Pull · sesi terakhir apa pun",
      },
      {
        week: "H-7 … H-1",
        sessions: 0,
        km: 0,
        time: "—",
        ascent: 0,
        gym: "KOSONG TOTAL — tidak ada lari, tidak ada gym",
      },
    ],
    prepGaps: [
      {
        metric: "Jarak satu sesi",
        race: "31,09 km",
        best: "8,13 km (30 Agu)",
        ratio: "3,82×",
        note: "Sesi terpanjang cuma seperempat jarak lomba",
      },
      {
        metric: "Durasi satu sesi",
        race: "10:12:27",
        best: "4:47:20 (30 Agu)",
        ratio: "2,13×",
        note: "Tidak ada satu pun sesi di atas 5 jam",
      },
      {
        metric: "Elevasi satu sesi",
        race: "1.791 m",
        best: "516 m (30 Agu)",
        ratio: "3,47×",
        note: "Dan sesi 516 m itu jalan santai",
      },
      {
        metric: "Elevasi vs total 90 hari",
        race: "1.791 m",
        best: "612 m (18 sesi)",
        ratio: "2,93×",
        note: "Tiga kali total tanjakan tiga bulan, dalam satu hari",
      },
      {
        metric: "Turunan satu sesi",
        race: "1.791 m",
        best: "681 m (30 Agu)",
        ratio: "2,63×",
        note: "Yang paling merusak, paling sedikit dilatih",
      },
      {
        metric: "Training load",
        race: "1.165",
        best: "117 (10 Sep)",
        ratio: "9,96×",
        note: "Sepuluh kali sesi terberat dalam persiapan",
      },
    ],
    gym: [
      {
        aspect: "Total blok",
        value: "13 sesi · 197 set · 71.402 kg",
        verdict: "Konsisten di Agustus, runtuh di September",
      },
      {
        aspect: "Volume per bulan",
        value: "Jul 5.050 · Agu 58.075 · Sep 8.277 kg",
        verdict: "Jeda 23 hari persis di fase puncak",
      },
      {
        aspect: "Distribusi volume",
        value: "Legs 53,8% · Pull 28,5% · Push 17,7%",
        verdict: "Proporsinya masuk akal. Ini bukan masalahnya",
      },
      {
        aspect: "Distribusi set",
        value: "Legs 37,6% · Pull 35,0% · Push 20,8%",
        verdict: "Pull hampir sebanyak Legs — agak berat ke atas",
      },
      {
        aspect: "Quads",
        value: "5 sesi · 21 set · 17.251 kg",
        verdict:
          "Mayoritas Leg Extension (mesin, konsentrik, open-chain). Nyaris tidak transfer ke kontrol turunan",
      },
      {
        aspect: "Hamstring",
        value: "5 sesi · 19 set · 8.830 kg",
        verdict: "Leg Curl 4 sesi + RDL 1 sesi. RDL bagus tapi cuma sekali (17 Sep)",
      },
      {
        aspect: "Unilateral",
        value: "Lunge 5 sesi · 19 set",
        verdict: "Bagian terbaik. Progresi 16 → 20 → 28 kg dalam 8 pekan",
      },
      {
        aspect: "Betis",
        value: "1 sesi · 4 set (9 Agu)",
        verdict: "Titik lemah terbesar. Betis menanggung beban eksentrik terbesar saat turun",
        weak: true,
      },
      {
        aspect: "Glutes / Abductors",
        value: "1 sesi · 1 set (27 Jul)",
        verdict: "Titik lemah. Stabilitas pinggul menentukan kontrol lutut di turunan teknis",
        weak: true,
      },
      {
        aspect: "Core",
        value: "8 set, semuanya di 1 sesi (19 Sep)",
        verdict: "Praktis tidak dilatih. Core menopang postur selama 10 jam",
        weak: true,
      },
      {
        aspect: "Latihan eksentrik khusus",
        value: "Tidak ada",
        verdict:
          "Tidak ada step-down, split squat tempo, calf raise eksentrik, single-leg RDL. Yang paling dibutuhkan, justru absen",
        weak: true,
      },
    ],
    whatWorked: [
      {
        title: "Pacing",
        body: "Paruh pertama dan kedua nyaris identik, HR terkendali, 0% di zona anaerobik. Untuk lomba 10 jam pertama, ini eksekusi yang matang.",
      },
      {
        title: "Disiplin berhenti",
        body: "Target ≤ 23 menit, aktual 8:04. Terlampaui jauh.",
      },
      {
        title: "Navigasi",
        body: "Jalur diikuti benar dari start sampai berhenti — terbukti dari kecocokan profil ketinggian.",
      },
      {
        title: "Tidak menyerah setelah titik terburuk",
        body: "Setelah km-19, HR pulih ke 146–149 dan pace stabil sampai akhir. Dia menyelesaikan 12 km lagi setelah titik terendahnya.",
      },
      {
        title: "Progresi lunge",
        body: "16 kg × 20 → 28 kg × 18 dalam 8 pekan, di latihan yang paling relevan untuk trail.",
      },
      {
        title: "Konsistensi frekuensi",
        body: "18 sesi dalam 90 hari, jeda terpanjang 7 hari. Frekuensinya bagus — durasinya yang kurang.",
      },
    ],
    actions: [
      {
        priority: 1,
        action: "Sesi turunan khusus: naik santai, turun terkontrol 300–500 m, ulang 3–5×",
        frequency: "1×/pekan",
        target: "1.500 m turunan per sesi di puncak",
        why: "41 dari 51 menit yang hilang ada di turunan",
      },
      {
        priority: 2,
        action: "Long run trail progresif 3 → 5 → 7 jam",
        frequency: "1×/pekan",
        target: "Minimal 2 sesi ≥ 7 jam",
        why: "Lomba 10:12 vs sesi terlama 4:47",
      },
      {
        priority: 3,
        action: "Volume elevasi mingguan",
        frequency: "akumulasi",
        target: "1.500–2.500 m naik/pekan di puncak",
        why: "Elevasi lomba ≤ 1× elevasi mingguan puncak",
      },
      {
        priority: 4,
        action:
          "Gym eksentrik: step-down, split squat tempo 3 detik, single-leg RDL, calf raise eksentrik",
        frequency: "2×/pekan",
        target: "Betis 4 set 2×/pekan, tanpa jeda > 7 hari",
        why: "Leg Extension mesin tidak melindungi dari 1.791 m turunan",
      },
      {
        priority: 5,
        action: "Volume lari mingguan",
        frequency: "akumulasi",
        target: "40–60 km/pekan di puncak",
        why: "Sekarang rata-rata 9,2 km/pekan",
      },
      {
        priority: 6,
        action:
          "Taper 3 pekan: 60% → 40% → 25%, tetap ada sesi elevasi pendek di pekan terakhir",
        frequency: "sekali",
        target: "Sesi terakhir H-3, bukan H-8",
        why: "Tujuh hari kosong bukan taper",
      },
      {
        priority: 7,
        action:
          "Kalibrasi jam vs GPX di satu sesi trail sebelum lomba, catat faktor koreksinya",
        frequency: "sekali per lomba",
        target: "Tahu angka koreksinya sebelum start",
        why: "Bacaan jam meleset 5–12%; tanpa tahu itu, angkanya menyesatkan",
      },
      {
        priority: 8,
        action: "Pacing berdasarkan waktu dan nama pos, bukan jarak di jam",
        frequency: "tiap lomba",
        target: "Tempel batas mundur per pos di flask/stang",
        why: "Jarak jam tidak bisa dipercaya di trail; waktu selalu bisa",
      },
      {
        priority: 9,
        action: "Perlakukan batas mundur sebagai keputusan, bukan informasi",
        frequency: "tiap lomba",
        target: "Lewat batas di 2 pos berturut-turut → ubah rencana",
        why: "Sinyalnya menyala di WS 1 dan berjalan terus tanpa tindakan",
      },
      {
        priority: 10,
        action: "Uji durability back-to-back: Sabtu 4 jam, Minggu 3 jam",
        frequency: "2× per blok",
        target: "Pekan 10 dan 13",
        why: "Menguji kaki dalam kondisi lelah",
      },
    ],
    checkpointNotes: [
      "Posisi WS di rencana adalah estimasi pribadi — panitia hanya menyebut 4–5 titik berjarak 5–8 km, dan COT resmi cuma ada di finis. \"Jam lomba aktual\" dihitung dari waktu aktif dikurangi 4:56, penyesuaian gabungan start awal 13 menit dan waktu berhenti 8 menit, diperlakukan rata sepanjang lomba — jadi tiap baris punya ketidakpastian beberapa menit. Yang kokoh adalah trennya.",
      "Selisih terhadap batas mundur melebar dari 4 menit di pos pertama jadi 30 menit di WS 4, lalu berhenti melebar. Artinya keputusan lomba ini sudah terbentuk di paruh pertama, bukan di kilometer terakhir — dan di WS 1, ketika selisihnya masih 4 menit, itu masih bisa dikejar.",
      "Tapi perhatikan kolom \"km di jam\": di WS 1 jam menunjuk 6,7 km untuk posisi km 6,0. Selisih 4 menit terhadap batas mundur jadi terasa jauh lebih ringan daripada sebenarnya. Batas mundur per pos cuma berguna kalau kamu tahu persis kamu di km berapa — dan di trail, jam tangan tidak bisa memberitahu itu.",
    ],
    segmentNote:
      "Km di tabel ini km jam tangan (datanya per lap). Km kursus ≈ km jam ÷ 1,12.",
    terrainNote:
      "Perhatikan km 31–34: turun 462 m tanpa tanjakan sama sekali, tapi pace-nya sama saja dengan km 21–25 yang masih ada 245 m tanjakan. Di titik itu kaki sudah habis.",
  },
};
