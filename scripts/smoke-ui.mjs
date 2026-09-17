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

// 0. Home landing sesuai sketsa: profil, welcome, dua CTA, sosial.
await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.waitForSelector("text=Welcome to My Monitoring Running Dashboard");
const hasDashboardCta = await page.getByRole("link", { name: "Dashboard Monitoring" }).isVisible();
const hasEventCta = await page.getByRole("link", { name: "Event Joined" }).isVisible();
const hasIg = await page.getByRole("link", { name: "Instagram" }).isVisible();
const hasTt = await page.getByRole("link", { name: "TikTok" }).isVisible();
check("Home: profil, welcome, CTA, dan sosial tampil", hasDashboardCta && hasEventCta && hasIg && hasTt);
const homeBottomNav = await page.getByRole("navigation", { name: "Navigasi utama" }).count();
check("Home: tanpa bottom nav", homeBottomNav === 0);

// 1. Dashboard Monitoring membuka dashboard dengan chart + bottom nav.
await page.getByRole("link", { name: "Dashboard Monitoring" }).click();
await page.waitForURL(/\/dashboard/);
await page.waitForSelector("text=Dashboard latihan");
const chartCount = await page.locator(".recharts-surface").count();
check("Dashboard: chart terender", chartCount >= 4, `${chartCount} chart`);
const bottomNav = page.getByRole("navigation", { name: "Navigasi utama" });
check("Dashboard: bottom nav tampil", await bottomNav.isVisible());
await bottomNav.getByRole("button", { name: "Event" }).click();
await page.getByRole("link", { name: "GTR Ultra" }).waitFor({ timeout: 5000 });
check(
  "Bottom nav Event: dropdown GTR/Proyeksi/Rencana/Strategi",
  (await page.getByRole("link", { name: "Proyeksi" }).count()) >= 1 &&
    (await page.getByRole("link", { name: "Rencana" }).count()) >= 1 &&
    (await page.getByRole("link", { name: "Strategi" }).count()) >= 1,
);

// 2. Filter tipe menulis state ke URL dan mengubah jumlah sesi.
const countLabel = () => page.locator("text=/^\\d+ sesi terpilih$/").first().innerText();
const allCount = Number((await countLabel()).match(/\d+/)[0]);
await page.getByRole("button", { name: "Hiking" }).click();
await page.waitForURL(/\/dashboard\?.*tipe=hiking/);
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
  .getByRole("button", { name: "Hiking" })
  .getAttribute("aria-pressed");
check("Filter bertahan saat URL dibuka ulang", restored === "true", bookmarkUrl.replace(base, ""));

// 3b. Arsip dimuat bertahap (kartu, bukan tabel — shell selalu 390px).
await page.goto(`${base}/dashboard`, { waitUntil: "networkidle" });
const cardsBefore = await page.locator("a[href^='/sesi/']").count();
await page.getByRole("button", { name: /Tampilkan semua/ }).click();
await page.waitForFunction(
  (previous) => document.querySelectorAll("a[href^='/sesi/']").length > previous,
  cardsBefore,
  { timeout: 10000 },
);
const cardsAfter = await page.locator("a[href^='/sesi/']").count();
check("Arsip: muat bertahap bekerja", cardsAfter > cardsBefore, `${cardsBefore} → ${cardsAfter} kartu`);

// 4. Dari daftar ke Session Detail: lap, running dynamics, profil elevasi.
await page.goto(`${base}/dashboard`, { waitUntil: "networkidle" });
await page.locator("a[href^='/sesi/']").first().click();
await page.waitForURL(/\/sesi\//);
await page.waitForSelector("text=Tabel lap");
const lapRows = await page.locator("table tbody tr").last().isVisible();
const dynamics = await page.locator("text=Running dynamics").isVisible();
check("Session Detail: tabel lap & running dynamics tampil", lapRows && dynamics);

// 4b. Event Joined dari home.
await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.getByRole("link", { name: "Event Joined" }).click();
await page.waitForURL(/\/event\/?$/);
await page.getByRole("link", { name: /Buka GTR Ultra/ }).click();
await page.waitForURL(/\/event\/gtr-ultra-30k\/?$/);
await page.waitForSelector("text=Skor kesiapan");
const scoreText = await page.locator("text=/^\\d+\\/100$/").first().innerText();
check("Event Joined: skor kesiapan terhitung", /^\d+\/100$/.test(scoreText), scoreText);

// 6. Proyeksi: kurva vs cut-off dan pergantian skenario.
await page.goto(`${base}/event/gtr-ultra-30k/proyeksi`, { waitUntil: "networkidle" });
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
await page.goto(`${base}/event/gtr-ultra-30k/rencana`, { waitUntil: "networkidle" });
const planRows = await page.locator("text=/^P\\d+/").count();
check("Rencana: pekanan terisi", planRows >= 4, `${planRows} pekan`);

await page.goto(`${base}/event/gtr-ultra-30k/strategi`, { waitUntil: "networkidle" });
const fuelRows = await page.locator("table tbody tr").count();
check("Strategi: logistik per segmen terisi", fuelRows >= 5, `${fuelRows} segmen`);

// 8. Halaman 404 untuk sesi yang tidak ada.
const notFound = await page.goto(`${base}/sesi/tidak-ada`, { waitUntil: "networkidle" });
check("404: sesi tak dikenal ditangani", notFound?.status() === 404);

// 9. Shell 390px + menu di layar dalam.
const wide = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await wide.goto(`${base}/dashboard`, { waitUntil: "networkidle" });
const shellWidth = await wide.locator(".app-shell").evaluate((el) => el.getBoundingClientRect().width);
check("Desktop: shell tetap 390px", Math.abs(shellWidth - 390) < 2, `${shellWidth}px`);
await wide.getByRole("button", { name: "Buka menu" }).click();
const wideNav = wide.locator("header nav").last();
await wideNav.getByRole("link", { name: "Event" }).waitFor({ timeout: 10000 });
await wide.getByRole("button", { name: "Buka Event" }).click();
await wideNav.getByRole("link", { name: "GTR Ultra 30K" }).waitFor({ timeout: 10000 });
await wide.getByRole("button", { name: "Buka GTR Ultra 30K" }).click();
await wideNav.getByRole("link", { name: "Proyeksi" }).waitFor({ timeout: 10000 });
check("Menu navigasi terbuka di shell", await wideNav.isVisible());
await wide.close();

await browser.close();

if (consoleErrors.length) console.log("\nError console:", consoleErrors);

const failed = results.filter((result) => !result.ok);
console.log(`\n${results.length - failed.length}/${results.length} pemeriksaan lolos`);
process.exit(failed.length || consoleErrors.length ? 1 : 0);
