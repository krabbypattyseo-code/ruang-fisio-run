// Uji asap antarmuka: memastikan komponen klien terhidrasi dan alur utama bekerja.
// Jalankan dengan dev server hidup: node scripts/smoke-ui.mjs [baseUrl]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://127.0.0.1:43217";
const results = [];
const consoleErrors = [];

const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1360, height: 950 } });

page.on("console", (message) => {
  // 404 di langkah pemeriksaan halaman not-found memang disengaja.
  const text = message.text();
  if (message.type() === "error" && !text.includes("hmr") && !text.includes("404")) {
    consoleErrors.push(text);
  }
});

// 1. Dashboard sebagai halaman depan, dengan chart yang benar-benar terender.
await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.waitForSelector("text=Dashboard latihan");
const chartCount = await page.locator(".recharts-surface").count();
check("Dashboard: chart terender", chartCount >= 4, `${chartCount} chart`);

// 2. Filter tipe menulis state ke URL dan mengubah jumlah sesi.
const countLabel = () => page.locator("text=/^\\d+ sesi terpilih$/").first().innerText();
const allCount = Number((await countLabel()).match(/\d+/)[0]);
await page.getByRole("button", { name: "Trail Running" }).click();
await page.waitForURL(/tipe=trail/);
await page.waitForFunction(
  (previous) => {
    const node = [...document.querySelectorAll("*")].find((element) =>
      /^\d+ sesi terpilih$/.test(element.textContent ?? ""),
    );
    return node && Number(node.textContent.match(/\d+/)[0]) !== previous;
  },
  allCount,
  { timeout: 10000 },
);
const trailCount = Number((await countLabel()).match(/\d+/)[0]);
check(
  "Filter tipe: state masuk ke URL & hasil menyempit",
  trailCount < allCount,
  `${allCount} → ${trailCount} sesi`,
);

// 3. Preset rentang tanggal juga tersimpan di URL sehingga bisa di-bookmark.
await page.getByRole("button", { name: "30 hari" }).click();
await page.waitForURL(/dari=\d{4}-\d{2}-\d{2}/);
const bookmarkUrl = page.url();
await page.goto(bookmarkUrl, { waitUntil: "networkidle" });
const restored = await page
  .getByRole("button", { name: "Trail Running" })
  .getAttribute("aria-pressed");
check("Filter bertahan saat URL dibuka ulang", restored === "true", bookmarkUrl.replace(base, ""));

// 3b. Arsip dimuat bertahap.
await page.goto(`${base}/`, { waitUntil: "networkidle" });
const rowsBefore = await page.locator("table tbody tr").count();
await page.getByRole("button", { name: /Tampilkan semua/ }).click();
await page.waitForFunction(
  (previous) => document.querySelectorAll("table tbody tr").length > previous,
  rowsBefore,
  { timeout: 10000 },
);
const rowsAfter = await page.locator("table tbody tr").count();
check("Arsip: muat bertahap bekerja", rowsAfter > rowsBefore, `${rowsBefore} → ${rowsAfter} baris`);

// 4. Dari daftar ke Session Detail: lap, running dynamics, profil elevasi.
await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.locator("table a[href^='/sesi/']").first().click();
await page.waitForURL(/\/sesi\//);
await page.waitForSelector("text=Tabel lap");
const lapRows = await page.locator("table tbody tr").last().isVisible();
const dynamics = await page.locator("text=Running dynamics").isVisible();
check("Session Detail: tabel lap & running dynamics tampil", lapRows && dynamics);

// 5. Event: skor kesiapan dihitung dari data.
await page.goto(`${base}/event`, { waitUntil: "networkidle" });
await page.waitForSelector("text=Skor kesiapan");
const scoreText = await page.locator("text=/^\\d+\\/100$/").first().innerText();
check("Event: skor kesiapan terhitung", /^\d+\/100$/.test(scoreText), scoreText);

// 6. Proyeksi: kurva vs cut-off dan pergantian skenario.
await page.goto(`${base}/event/proyeksi`, { waitUntil: "networkidle" });
await page.waitForSelector("text=Kurva waktu tempuh vs cut-off");
const firstRow = await page.locator("table tbody tr td").nth(3).innerText();
await page.getByRole("button", { name: /^Aman ·/ }).click();
await page.waitForFunction(
  (previous) => {
    const cell = document.querySelectorAll("table tbody tr td")[3];
    return cell && cell.textContent.trim() !== previous;
  },
  firstRow,
  { timeout: 10000 },
);
const secondRow = await page.locator("table tbody tr td").nth(3).innerText();
check("Proyeksi: skenario bisa ditukar", firstRow !== secondRow, `${firstRow} → ${secondRow}`);

// 7. Rencana latihan dan strategi hari-H terisi.
await page.goto(`${base}/event/rencana`, { waitUntil: "networkidle" });
const planRows = await page.locator("table tbody tr").count();
check("Rencana: tabel pekanan terisi", planRows >= 4, `${planRows} pekan`);

await page.goto(`${base}/event/strategi`, { waitUntil: "networkidle" });
const fuelRows = await page.locator("table tbody tr").count();
check("Strategi: logistik per segmen terisi", fuelRows >= 5, `${fuelRows} segmen`);

// 8. Halaman 404 untuk sesi yang tidak ada.
const notFound = await page.goto(`${base}/sesi/tidak-ada`, { waitUntil: "networkidle" });
check("404: sesi tak dikenal ditangani", notFound?.status() === 404);

// 9. Tampilan mobile: menu navigasi terbuka.
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(`${base}/`, { waitUntil: "networkidle" });
await mobile.getByRole("button", { name: "Buka menu" }).click();
const mobileNav = mobile.locator("header nav").last();
await mobileNav.getByRole("link", { name: "Strategi" }).waitFor({ timeout: 10000 });
check("Mobile: menu navigasi terbuka", await mobileNav.isVisible());

await browser.close();

if (consoleErrors.length) console.log("\nError console:", consoleErrors);

const failed = results.filter((result) => !result.ok);
console.log(`\n${results.length - failed.length}/${results.length} pemeriksaan lolos`);
process.exit(failed.length || consoleErrors.length ? 1 : 0);
