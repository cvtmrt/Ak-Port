// Veri erişim katmanı. DB bağlıysa Railway'den, değilse seed verisinden okur.
// Türetilmiş sorgular JS tarafında filtrelenir (katalog boyutu için yeterli).
import { db, hasDb } from "./index.js";
import { products as productsTable, reviews as reviewsTable, posts as postsTable } from "./schema.js";
import {
  products as seedProducts,
  categories as seedCategories,
} from "./seed-data.js";
import { reviews as seedReviews } from "./reviews-data.js";
import { posts as seedPosts } from "./posts-data.js";
import { eq, desc } from "drizzle-orm";

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

export function getCategories() {
  return seedCategories;
}

export function getCategory(slug) {
  return seedCategories.find((c) => c.slug === slug) || null;
}

export async function getAmperValues() {
  const vals = [...new Set((await loadProducts()).map((p) => Number(p.amper)))];
  return vals.sort((a, b) => a - b);
}

export async function getBrands() {
  return [...new Set((await loadProducts()).map((p) => p.brand))];
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
