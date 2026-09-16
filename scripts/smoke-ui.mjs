// Uji asap antarmuka: memastikan komponen klien terhidrasi dan alur utama bekerja.
// Jalankan dengan dev server hidup: node scripts/smoke-ui.mjs [baseUrl]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://127.0.0.1:43217";
const results = [];
const consoleErrors = [];
const failedRequests = [];

const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

page.on("console", (message) => {
  if (message.type() === "error" && !message.text().includes("hmr")) {
    consoleErrors.push(message.text());
  }
});
page.on("requestfailed", (request) => {
  if (!request.url().includes("hmr")) {
    failedRequests.push(`${request.url()} ${request.failure()?.errorText ?? ""}`);
  }
});

// 1. Beranda terhidrasi: kartu progres klien tampil, bukan skeleton.
await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.waitForSelector("text=Belum ada pelajaran yang diselesaikan", { timeout: 15000 });
check("Beranda: kartu progres klien terhidrasi", true);

// 2. Halaman modul: daftar pelajaran tampil (bukan skeleton).
await page.goto(`${base}/modul/fondasi-seo`, { waitUntil: "networkidle" });
await page.waitForSelector("text=1. Cara kerja mesin pencari", { timeout: 15000 });
const quizCta = await page
  .getByRole("link", { name: /Mulai kuis/ })
  .first()
  .isVisible();
check("Halaman modul: daftar pelajaran & CTA kuis dirender", quizCta);

// 3. Tandai selesai dari daftar pelajaran, lalu pastikan tersimpan setelah reload.
await page.getByRole("button", { name: /Tandai "Tiga pilar SEO/ }).click();
await page.waitForSelector('button[aria-label*="Tiga pilar SEO"][aria-pressed="true"]');
await page.reload({ waitUntil: "networkidle" });
const persisted = await page
  .locator('button[aria-label*="Tiga pilar SEO"][aria-pressed="true"]')
  .isVisible();
check("Progres bertahan setelah reload (localStorage)", persisted);

// 4. Halaman pelajaran: tombol "Selesai & lanjut" ada dan memindahkan halaman.
await page.goto(`${base}/modul/fondasi-seo/cara-kerja-mesin-pencari`, {
  waitUntil: "networkidle",
});
const completeButton = page.getByRole("button", { name: /Selesai & lanjut/ });
await completeButton.waitFor({ timeout: 15000 });
await completeButton.click();
await page.waitForURL(/\/modul\/fondasi-seo\/tiga-pilar-seo/, { timeout: 15000 });
check("Pelajaran: tombol selesai menandai & pindah ke pelajaran berikutnya", true);

// 5. Kuis: pilih jawaban, periksa, lihat pembahasan, selesaikan sampai skor.
await page.goto(`${base}/kuis/fondasi-seo`, { waitUntil: "networkidle" });
const total = Number(
  (await page.locator("text=/Soal 1 dari \\d+/").first().innerText()).match(/\d+$/)[0],
);
for (let i = 0; i < total; i += 1) {
  // Soal pertama sengaja dijawab salah untuk menguji tampilan koreksi.
  const optionIndex = i === 0 ? 1 : 0;
  await page.locator('[data-slot="radio-group-item"]').nth(optionIndex).click();
  await page.getByRole("button", { name: "Periksa jawaban" }).click();
  await page.waitForSelector("text=/^(Benar|Belum tepat)$/", { timeout: 10000 });
  if (i === 0) {
    check("Kuis: koreksi jawaban muncul setelah 'Periksa jawaban'", true);
  }
  await page
    .getByRole("button", { name: i + 1 < total ? "Soal berikutnya" : "Lihat hasil" })
    .click();
}
await page.waitForSelector("text=/\\d+\\/\\d+ benar/", { timeout: 15000 });
const reviewCount = await page.locator("text=Jawaban benar:").count();
check("Kuis: halaman skor + pembahasan tampil", reviewCount === total, `${reviewCount} pembahasan`);

// 6. Skor kuis muncul di halaman progres.
await page.goto(`${base}/progres`, { waitUntil: "networkidle" });
const quizBadge = await page.locator("text=/Kuis \\d+\\/\\d+/").first().isVisible();
check("Progres: skor kuis tercatat", quizBadge);

// 7. Reset progres mengosongkan kembali.
await page.getByRole("button", { name: /Reset progres/ }).click();
await page.getByRole("button", { name: "Ya, hapus semua" }).click();
await page.waitForSelector("text=Belum ada aktivitas", { timeout: 10000 });
check("Progres: reset mengembalikan ke keadaan kosong", true);

// 8. Glosarium: pencarian menyaring, kata tak dikenal memunculkan state kosong.
await page.goto(`${base}/glosarium`, { waitUntil: "networkidle" });
const searchBox = page.getByLabel("Cari istilah SEO");
await searchBox.fill("kanonik");
const filteredCount = await page
  .locator("text=/istilah ditampilkan dari/")
  .first()
  .innerText();
check(
  "Glosarium: pencarian menyaring hasil",
  !filteredCount.startsWith("30 "),
  filteredCount,
);
await searchBox.fill("zzzz");
await page.waitForSelector("text=Tidak ada istilah yang cocok", { timeout: 10000 });
check("Glosarium: state kosong muncul", true);
await page.getByRole("button", { name: "Reset pencarian" }).click();
await page.getByRole("button", { name: "Teknis", exact: true }).click();
const teknisOnly = await page
  .locator("text=/^\\d+ istilah ditampilkan dari \\d+ total$/")
  .first()
  .innerText();
check("Glosarium: filter kategori bekerja", !teknisOnly.startsWith("30 "), teknisOnly);

// 9. Tampilan mobile: menu hamburger membuka navigasi.
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(`${base}/`, { waitUntil: "networkidle" });
await mobile.getByRole("button", { name: "Buka menu" }).click();
await mobile.waitForSelector("text=SEO Teknis", { timeout: 10000 });
check("Mobile: menu navigasi terbuka", true);

await browser.close();

if (consoleErrors.length) console.log("\nError console:", consoleErrors);
if (failedRequests.length) console.log("\nPermintaan gagal:", failedRequests);

const failed = results.filter((result) => !result.ok);
console.log(`\n${results.length - failed.length}/${results.length} pemeriksaan lolos`);
process.exit(failed.length || consoleErrors.length ? 1 : 0);
