import { hasDb, sql } from "./index.js";
import { posts as seedPosts } from "./posts-data.js";
import { reviews as seedReviews, reviewsSummary as seedReviewsSummary } from "./reviews-data.js";
import { site, brandNames, districts as seedDistricts } from "../lib/site.js";
import { homeDefaults, designDefaults, pages as pageDefaults } from "../lib/panel-schema.js";

function jsonb(value) {
  return JSON.stringify(value ?? {});
}

function slugifyAscii(value) {
  return String(value || "")
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const defaultBrands = brandNames.map((name, index) => ({
  name,
  logo: `/images/brands/${slugifyAscii(name)}.svg`,
  sortOrder: index,
  active: true,
}));

export const defaultAdminData = {
  posts: seedPosts,
  reviews: seedReviews,
  brands: defaultBrands,
  districts: seedDistricts.map((item, index) => ({ ...item, sortOrder: index, active: true })),
  pages: pageDefaults.map((p) => ({ id: p.id, label: p.label, path: p.path, ...p.defaults, published: true })),
};

const seededCollections = new Set();
const seededSettings = new Set();
const seedingCollections = new Map();

async function markerExists(key) {
  const rows = await sql`SELECT key FROM settings WHERE key = ${key} LIMIT 1`;
  return Boolean(rows[0]);
}

async function writeMarker(key) {
  await sql`
    INSERT INTO settings (key, value, updated_at)
    VALUES (${key}, ${jsonb({ seededAt: new Date().toISOString() })}::jsonb, now())
    ON CONFLICT (key) DO NOTHING
  `;
}

async function countCollection(collection) {
  switch (collection) {
    case "posts": {
      const rows = await sql`SELECT count(*)::int AS count FROM posts`;
      return rows[0]?.count ?? 0;
    }
    case "reviews": {
      const rows = await sql`SELECT count(*)::int AS count FROM reviews`;
      return rows[0]?.count ?? 0;
    }
    case "brands": {
      const rows = await sql`SELECT count(*)::int AS count FROM brands`;
      return rows[0]?.count ?? 0;
    }
    case "districts": {
      const rows = await sql`SELECT count(*)::int AS count FROM districts`;
      return rows[0]?.count ?? 0;
    }
    case "pages": {
      const rows = await sql`SELECT count(*)::int AS count FROM content_pages`;
      return rows[0]?.count ?? 0;
    }
    default:
      return 0;
  }
}

async function insertDefaultPosts() {
  for (const p of defaultAdminData.posts) {
    await sql`
      INSERT INTO posts (slug, title, excerpt, content, cover, author, tags, published, published_at)
      VALUES (${p.slug}, ${p.title}, ${p.excerpt ?? null}, ${p.content ?? null}, ${p.cover ?? null}, ${p.author ?? "AKÜPORT"}, ${Array.isArray(p.tags) ? p.tags : []}, ${p.published ?? true}, ${p.publishedAt ?? null})
      ON CONFLICT (slug) DO NOTHING
    `;
  }
}

async function insertDefaultReviews() {
  for (const r of defaultAdminData.reviews) {
    await sql`
      INSERT INTO reviews (author, rating, text, time, avatar, source, approved)
      VALUES (${r.author}, ${r.rating ?? 5}, ${r.text ?? null}, ${r.time ?? null}, ${r.avatar ?? null}, ${r.source ?? "google"}, ${r.approved ?? true})
    `;
  }
  await ensureSettingSeeded("reviewsSummary", seedReviewsSummary);
}

async function insertDefaultBrands() {
  for (const brand of defaultAdminData.brands) {
    await sql`
      INSERT INTO brands (name, logo, sort_order, active)
      VALUES (${brand.name}, ${brand.logo}, ${brand.sortOrder}, ${brand.active})
      ON CONFLICT (name) DO NOTHING
    `;
  }
}

async function insertDefaultDistricts() {
  for (const district of defaultAdminData.districts) {
    await sql`
      INSERT INTO districts (slug, name, title, intro, sort_order, active)
      VALUES (${district.slug}, ${district.name}, ${district.title}, ${district.intro ?? null}, ${district.sortOrder}, ${district.active})
      ON CONFLICT (slug) DO NOTHING
    `;
  }
}

async function insertDefaultPages() {
  for (const page of pageDefaults) {
    await sql`
      INSERT INTO content_pages (id, label, path, title, subtitle, content, data, published, updated_at)
      VALUES (${page.id}, ${page.label}, ${page.path}, ${page.defaults.title ?? null}, ${page.defaults.subtitle ?? null}, ${page.defaults.content ?? null}, ${jsonb(page.defaults)}::jsonb, true, now())
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

async function seedCollection(collection) {
  switch (collection) {
    case "posts":
      await insertDefaultPosts();
      break;
    case "reviews":
      await insertDefaultReviews();
      break;
    case "brands":
      await insertDefaultBrands();
      break;
    case "districts":
      await insertDefaultDistricts();
      break;
    case "pages":
      await insertDefaultPages();
      break;
  }
}

export async function ensureCollectionSeeded(collection) {
  if (!hasDb || !defaultAdminData[collection] || seededCollections.has(collection)) return;
  if (seedingCollections.has(collection)) return seedingCollections.get(collection);

  const promise = (async () => {
    const marker = `seeded:${collection}`;
    if (await markerExists(marker)) {
      seededCollections.add(collection);
      return;
    }

    const count = await countCollection(collection);
    if (count === 0) await seedCollection(collection);
    await writeMarker(marker);
    seededCollections.add(collection);
  })();

  seedingCollections.set(collection, promise);
  try {
    await promise;
  } finally {
    seedingCollections.delete(collection);
  }
}

export async function ensureSettingSeeded(key, fallback) {
  if (!hasDb) return fallback;
  if (seededSettings.has(key)) {
    const rows = await sql`SELECT value FROM settings WHERE key = ${key} LIMIT 1`;
    return rows[0]?.value ?? fallback;
  }

  const rows = await sql`SELECT value FROM settings WHERE key = ${key} LIMIT 1`;
  if (rows[0]) {
    seededSettings.add(key);
    return rows[0].value;
  }

  await sql`
    INSERT INTO settings (key, value, updated_at)
    VALUES (${key}, ${jsonb(fallback)}::jsonb, now())
    ON CONFLICT (key) DO NOTHING
  `;
  seededSettings.add(key);
  return fallback;
}

// --- Tek seferlik içerik düzeltmesi: "ücretsiz" ifadesi ---
// Panelden kaydedilen içerik DB'de durduğu için koddaki varsayılanı değiştirmek
// canlıdaki metni güncellemiyor. Bu yama, kayıtlı içerikteki "ücretsiz" kelimesini
// (montaj, test vb. tüm hizmet metinlerinden) temizler ve marker sayesinde
// yalnızca bir kez çalışır. Müşteri yorumlarına (reviews) bilerek dokunulmuyor;
// onlar gerçek kişilerin sözleri.
const FREE_WORDING_MARKER = "patch:ucretsiz-kaldirildi-v2";
let freeWordingPatched = false;

export function stripFreeWording(value) {
  if (typeof value === "string") {
    const next = value
      .replace(/ücretsiz\s+/gi, "") // "ücretsiz test" → "test"
      .replace(/\s+ücretsiz\b/gi, "") // "montaj ücretsiz" → "montaj"
      .replace(/[ \t]{2,}/g, " ");
    if (next === value) return value;
    // "Ücretsiz yerinde montaj" → "Yerinde montaj": yalnızca silinen kelime metnin
    // başındaysa sonraki harfi büyütür, cümle ortasındaki metinlere dokunmaz.
    if (!/^\s*ücretsiz\b/i.test(value)) return next;
    return next.replace(/^\p{Ll}/u, (ch) => ch.toLocaleUpperCase("tr-TR"));
  }
  if (Array.isArray(value)) return value.map(stripFreeWording);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, stripFreeWording(item)]));
  }
  return value;
}

export async function ensureFreeWordingPatched() {
  if (!hasDb || freeWordingPatched) return;
  if (await markerExists(FREE_WORDING_MARKER)) {
    freeWordingPatched = true;
    return;
  }

  const settingRows = await sql`SELECT key, value FROM settings WHERE key IN ('home', 'design', 'site')`;
  for (const row of settingRows) {
    const cleaned = stripFreeWording(row.value);
    if (jsonb(cleaned) !== jsonb(row.value)) {
      await sql`UPDATE settings SET value = ${jsonb(cleaned)}::jsonb, updated_at = now() WHERE key = ${row.key}`;
    }
  }

  const pageRows = await sql`SELECT id, title, subtitle, content, data FROM content_pages`;
  for (const row of pageRows) {
    const cleaned = {
      title: stripFreeWording(row.title),
      subtitle: stripFreeWording(row.subtitle),
      content: stripFreeWording(row.content),
      data: stripFreeWording(row.data),
    };
    const changed =
      cleaned.title !== row.title ||
      cleaned.subtitle !== row.subtitle ||
      cleaned.content !== row.content ||
      jsonb(cleaned.data) !== jsonb(row.data);
    if (!changed) continue;
    await sql`
      UPDATE content_pages
      SET title = ${cleaned.title ?? null},
          subtitle = ${cleaned.subtitle ?? null},
          content = ${cleaned.content ?? null},
          data = ${jsonb(cleaned.data)}::jsonb,
          updated_at = now()
      WHERE id = ${row.id}
    `;
  }

  const districtRows = await sql`SELECT slug, title, intro FROM districts`;
  for (const row of districtRows) {
    const title = stripFreeWording(row.title);
    const intro = stripFreeWording(row.intro);
    if (title === row.title && intro === row.intro) continue;
    await sql`UPDATE districts SET title = ${title ?? null}, intro = ${intro ?? null} WHERE slug = ${row.slug}`;
  }

  const postRows = await sql`SELECT id, title, excerpt, content FROM posts`;
  for (const row of postRows) {
    const title = stripFreeWording(row.title);
    const excerpt = stripFreeWording(row.excerpt);
    const content = stripFreeWording(row.content);
    if (title === row.title && excerpt === row.excerpt && content === row.content) continue;
    await sql`
      UPDATE posts
      SET title = ${title ?? null}, excerpt = ${excerpt ?? null}, content = ${content ?? null}
      WHERE id = ${row.id}
    `;
  }

  await writeMarker(FREE_WORDING_MARKER);
  freeWordingPatched = true;
}

export async function ensureBaseSeeded() {
  if (!hasDb) return;
  await Promise.all([
    ensureSettingSeeded("site", site),
    ensureSettingSeeded("home", homeDefaults),
    ensureSettingSeeded("design", designDefaults),
    ensureCollectionSeeded("brands"),
    ensureCollectionSeeded("districts"),
    ensureCollectionSeeded("posts"),
    ensureCollectionSeeded("reviews"),
    ensureCollectionSeeded("pages"),
  ]);
}
