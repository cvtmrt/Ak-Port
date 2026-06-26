// Veri erişim katmanı. DB bağlıysa Railway'den, değilse seed verisinden okur.
// Türetilmiş sorgular JS tarafında filtrelenir (katalog boyutu için yeterli).
import { db, hasDb } from "./index.js";
import {
  products as productsTable,
  reviews as reviewsTable,
  posts as postsTable,
  brands as brandsTable,
  categories as categoriesTable,
  districts as districtsTable,
  contentPages as contentPagesTable,
  settings as settingsTable,
} from "./schema.js";
import {
  products as seedProducts,
  categories as seedCategories,
} from "./seed-data.js";
import { reviews as seedReviews } from "./reviews-data.js";
import { posts as seedPosts } from "./posts-data.js";
import { site, brandNames, districts as seedDistricts } from "../lib/site.js";
import { homeDefaults, designDefaults, pages as pageDefaults } from "../lib/panel-schema.js";
import { eq, desc, asc } from "drizzle-orm";

const seedBrands = brandNames.map((name) => ({
  name,
  logo: `/images/brands/${name.toLocaleLowerCase("tr-TR").replace("ı", "i").replace("İ", "i")}.svg`,
  active: true,
}));

async function loadProducts() {
  if (!hasDb) return seedProducts;
  try {
    return await db.select().from(productsTable);
  } catch (err) {
    console.error("[db] Ürünler okunamadı, seed verisine düşülüyor:", err.message);
    return seedProducts;
  }
}

export async function getProducts() {
  return loadProducts();
}

export async function getFeatured() {
  return (await loadProducts()).filter((p) => p.featured);
}

export async function getProductBySlug(slug) {
  return (await loadProducts()).find((p) => p.slug === slug) || null;
}

// Kategori VEYA teknoloji slug'ına göre (otomobil, kamyon, agm, start-stop...)
export async function getByCategory(slug) {
  return (await loadProducts()).filter(
    (p) => p.category === slug || p.technology === slug
  );
}

export async function getByAmper(amper) {
  const a = Number(amper);
  return (await loadProducts()).filter((p) => Number(p.amper) === a);
}

export async function getCategories() {
  if (!hasDb) return seedCategories;
  try {
    const rows = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.active, true))
      .orderBy(asc(categoriesTable.sortOrder), asc(categoriesTable.name));
    return rows.length ? rows : seedCategories;
  } catch (err) {
    console.error("[db] Kategoriler okunamadı, seed verisine düşülüyor:", err.message);
    return seedCategories;
  }
}

export async function getCategory(slug) {
  return (await getCategories()).find((c) => c.slug === slug) || null;
}

export async function getAmperValues() {
  const vals = [...new Set((await loadProducts()).map((p) => Number(p.amper)))];
  return vals.sort((a, b) => a - b);
}

export async function getBrands() {
  if (!hasDb) return seedBrands;
  try {
    const rows = await db
      .select()
      .from(brandsTable)
      .where(eq(brandsTable.active, true))
      .orderBy(asc(brandsTable.sortOrder), asc(brandsTable.name));
    return rows.length ? rows : seedBrands;
  } catch (err) {
    console.error("[db] Markalar okunamadı, seed verisine düşülüyor:", err.message);
    return seedBrands;
  }
}

export async function getDistricts() {
  if (!hasDb) return seedDistricts;
  try {
    const rows = await db
      .select()
      .from(districtsTable)
      .where(eq(districtsTable.active, true))
      .orderBy(asc(districtsTable.sortOrder), asc(districtsTable.name));
    return rows.length ? rows : seedDistricts;
  } catch (err) {
    console.error("[db] Bölgeler okunamadı, seed verisine düşülüyor:", err.message);
    return seedDistricts;
  }
}

export async function getDistrict(slug) {
  return (await getDistricts()).find((d) => d.slug === slug) || null;
}

// Onaylı yorumlar. DB varsa oradan, yoksa örnek veriden.
export async function getReviews() {
  if (!hasDb) return seedReviews;
  try {
    return await db.select().from(reviewsTable).where(eq(reviewsTable.approved, true));
  } catch (err) {
    console.error("[db] Yorumlar okunamadı, örnek veriye düşülüyor:", err.message);
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
  if (!list.length) return { average: 0, count: 0 };
  const sum = list.reduce((a, r) => a + Number(r.rating || 0), 0);
  return { average: Math.round((sum / list.length) * 10) / 10, count: list.length };
}

// Blog yazıları. DB varsa yayınlananları (yeni→eski), yoksa örnek veriden.
export async function getPosts() {
  if (!hasDb) {
    return [...seedPosts].sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
  }
  try {
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
    const rows = await db.select().from(settingsTable).where(eq(settingsTable.key, key)).limit(1);
    return rows[0]?.value ?? fallback;
  } catch (err) {
    console.error(`[db] ${key} ayarı okunamadı, varsayılana düşülüyor:`, err.message);
    return fallback;
  }
}

export async function getSiteSettings() {
  return getSetting("site", site);
}

export async function getHomeContent() {
  return getSetting("home", homeDefaults);
}

export async function getDesignSettings() {
  return getSetting("design", designDefaults);
}

export async function getContentPages() {
  const defaults = pageDefaults.map((p) => ({ id: p.id, label: p.label, path: p.path, ...p.defaults }));
  if (!hasDb) return defaults;
  try {
    const rows = await db
      .select()
      .from(contentPagesTable)
      .where(eq(contentPagesTable.published, true))
      .orderBy(asc(contentPagesTable.label));
    return rows.length
      ? rows.map((p) => ({ id: p.id, label: p.label, path: p.path, title: p.title, subtitle: p.subtitle, content: p.content, ...(p.data || {}) }))
      : defaults;
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

export async function getRelated(product, limit = 4) {
  const all = await loadProducts();
  return all
    .filter(
      (p) =>
        p.slug !== product.slug &&
        (p.category === product.category || p.technology === product.technology)
    )
    .slice(0, limit);
}
