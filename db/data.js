// Veri erişim katmanı. DB bağlıysa Railway'den, değilse seed verisinden okur.
// Türetilmiş sorgular JS tarafında filtrelenir (katalog boyutu için yeterli).
import { db, hasDb } from "./index.js";
import {
  reviews as reviewsTable,
  posts as postsTable,
  brands as brandsTable,
  districts as districtsTable,
  contentPages as contentPagesTable,
  settings as settingsTable,
} from "./schema.js";
import { reviews as seedReviews, reviewsSummary as seedReviewsSummary } from "./reviews-data.js";
import { posts as seedPosts } from "./posts-data.js";
import { site } from "../lib/site.js";
import { homeDefaults, designDefaults, pages as pageDefaults } from "../lib/panel-schema.js";
import { defaultAdminData, defaultBrands, ensureCollectionSeeded, ensureSettingSeeded } from "./bootstrap.js";
import { eq, desc, asc } from "drizzle-orm";

export async function getBrands() {
  if (!hasDb) return defaultBrands;
  try {
    await ensureCollectionSeeded("brands");
    const rows = await db
      .select()
      .from(brandsTable)
      .where(eq(brandsTable.active, true))
      .orderBy(asc(brandsTable.sortOrder), asc(brandsTable.name));
    return rows;
  } catch (err) {
    console.error("[db] Markalar okunamadı, seed verisine düşülüyor:", err.message);
    return defaultBrands;
  }
}

export async function getDistricts() {
  if (!hasDb) return defaultAdminData.districts;
  try {
    await ensureCollectionSeeded("districts");
    const rows = await db
      .select()
      .from(districtsTable)
      .where(eq(districtsTable.active, true))
      .orderBy(asc(districtsTable.sortOrder), asc(districtsTable.name));
    return rows;
  } catch (err) {
    console.error("[db] Bölgeler okunamadı, seed verisine düşülüyor:", err.message);
    return defaultAdminData.districts;
  }
}

export async function getDistrict(slug) {
  return (await getDistricts()).find((d) => d.slug === slug) || null;
}

// Onaylı yorumlar. DB varsa oradan, yoksa seed verisinden.
export async function getReviews() {
  if (!hasDb) return seedReviews;
  try {
    await ensureCollectionSeeded("reviews");
    return await db.select().from(reviewsTable).where(eq(reviewsTable.approved, true));
  } catch (err) {
    console.error("[db] Yorumlar okunamadı, seed verisine düşülüyor:", err.message);
    return seedReviews;
  }
}

// Ortalama puan + adet (AggregateRating ve başlık için).
export async function getRatingSummary() {
  if (hasDb) {
    try {
      const rows = await db.select().from(settingsTable).where(eq(settingsTable.key, "reviewsSummary")).limit(1);
      const summary = rows[0]?.value;
      if (summary?.average && summary?.count) {
        return { average: Number(summary.average), count: Number(summary.count) };
      }
    } catch (err) {
      console.error("[db] Yorum özeti okunamadı, yorumlardan hesaplanıyor:", err.message);
    }
  }
  const list = await getReviews();
  if (!list.length) return seedReviewsSummary;
  const sum = list.reduce((a, r) => a + Number(r.rating || 0), 0);
  return { average: Math.round((sum / list.length) * 10) / 10, count: list.length };
}

// Blog yazıları. DB varsa yayınlananları (yeni→eski), yoksa örnek veriden.
export async function getPosts() {
  if (!hasDb) {
    return [...seedPosts].sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
  }
  try {
    await ensureCollectionSeeded("posts");
    return await db
      .select()
      .from(postsTable)
      .where(eq(postsTable.published, true))
      .orderBy(desc(postsTable.publishedAt));
  } catch (err) {
    console.error("[db] Yazılar okunamadı, örnek veriye düşülüyor:", err.message);
    return [...seedPosts].sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
  }
}

export async function getPostBySlug(slug) {
  return (await getPosts()).find((p) => p.slug === slug) || null;
}

export async function getRecentPosts(limit = 3, excludeSlug) {
  return (await getPosts()).filter((p) => p.slug !== excludeSlug).slice(0, limit);
}

async function getSetting(key, fallback) {
  if (!hasDb) return fallback;
  try {
    return await ensureSettingSeeded(key, fallback);
  } catch (err) {
    console.error(`[db] ${key} ayarı okunamadı, varsayılana düşülüyor:`, err.message);
    return fallback;
  }
}

function deepMerge(defaults, override) {
  const result = { ...defaults };
  for (const key of Object.keys(override ?? {})) {
    if (override[key] !== null && typeof override[key] === "object" && !Array.isArray(override[key])) {
      result[key] = deepMerge(defaults[key] ?? {}, override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

export async function getSiteSettings() {
  const dbValue = await getSetting("site", site);
  return deepMerge(site, dbValue);
}

export async function getHomeContent() {
  return getSetting("home", homeDefaults);
}

export async function getDesignSettings() {
  return getSetting("design", designDefaults);
}

export async function getGallery() {
  const items = await getSetting("gallery", []);
  return Array.isArray(items) ? items : [];
}

export async function getContentPages() {
  const defaults = pageDefaults.map((p) => ({ id: p.id, label: p.label, path: p.path, ...p.defaults }));
  if (!hasDb) return defaults;
  try {
    await ensureCollectionSeeded("pages");
    const rows = await db
      .select()
      .from(contentPagesTable)
      .where(eq(contentPagesTable.published, true))
      .orderBy(asc(contentPagesTable.label));
    return rows.map((p) => ({ id: p.id, label: p.label, path: p.path, title: p.title, subtitle: p.subtitle, content: p.content, ...(p.data || {}) }));
  } catch (err) {
    console.error("[db] Sayfalar okunamadı, varsayılana düşülüyor:", err.message);
    return defaults;
  }
}

export async function getContentPage(idOrPath) {
  return (await getContentPages()).find((p) => p.id === idOrPath || p.path === idOrPath) || null;
}

export async function getPublicConfig() {
  const [siteSettings, design, home, brands, districts] = await Promise.all([
    getSiteSettings(),
    getDesignSettings(),
    getHomeContent(),
    getBrands(),
    getDistricts(),
  ]);
  return { site: siteSettings, design, home, brands, districts };
}
