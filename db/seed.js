// Railway PostgreSQL'e tabloyu oluşturup ürünleri yükler.
// Kullanım: DATABASE_URL ayarlı .env ile  ->  npm run db:seed
import "dotenv/config";
import fs from "fs";
import path from "path";
import { sql, hasDb } from "./index.js";
import { products, categories } from "./seed-data.js";
import { reviews, reviewsSummary } from "./reviews-data.js";
import { posts } from "./posts-data.js";
import { site, brandNames, districts } from "../lib/site.js";
import { homeDefaults, designDefaults, pages } from "../lib/panel-schema.js";

if (!hasDb) {
  console.error("HATA: DATABASE_URL tanımlı değil. .env dosyasına Railway bağlantı adresini ekleyin.");
  process.exit(1);
}

async function run() {
  const migration = fs.readFileSync(path.join(process.cwd(), "db/migrations/0001_live_admin.sql"), "utf8");
  await sql.unsafe(migration);

  console.log("Tablo oluşturuluyor (yoksa)...");
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id           serial PRIMARY KEY,
      slug         text NOT NULL UNIQUE,
      name         text NOT NULL,
      brand        text NOT NULL,
      category     text NOT NULL,
      technology   text NOT NULL DEFAULT 'standart',
      amper        integer NOT NULL,
      volt         integer NOT NULL DEFAULT 12,
      cca          integer,
      price        numeric(10,2),
      stock        boolean NOT NULL DEFAULT true,
      product_code text,
      image        text,
      images       text[],
      short_desc   text,
      description  text,
      featured     boolean NOT NULL DEFAULT false,
      created_at   timestamp DEFAULT now()
    );
  `;

  console.log(`${products.length} ürün yükleniyor...`);
  for (const p of products) {
    await sql`
      INSERT INTO products (slug, name, brand, category, technology, amper, volt, cca, price, stock, product_code, image, short_desc, description, featured)
      VALUES (${p.slug}, ${p.name}, ${p.brand}, ${p.category}, ${p.technology}, ${p.amper}, ${p.volt}, ${p.cca ?? null}, ${p.price ?? null}, ${p.stock}, ${p.productCode ?? null}, ${p.image ?? null}, ${p.shortDesc ?? null}, ${p.description ?? null}, ${p.featured ?? false})
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name, brand = EXCLUDED.brand, category = EXCLUDED.category,
        technology = EXCLUDED.technology, amper = EXCLUDED.amper, volt = EXCLUDED.volt,
        cca = EXCLUDED.cca, price = EXCLUDED.price, stock = EXCLUDED.stock,
        product_code = EXCLUDED.product_code, image = EXCLUDED.image,
        short_desc = EXCLUDED.short_desc, description = EXCLUDED.description,
        featured = EXCLUDED.featured;
    `;
  }

  console.log("Yorumlar tablosu oluşturuluyor (yoksa)...");
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id         serial PRIMARY KEY,
      author     text NOT NULL,
      rating     integer NOT NULL,
      text       text,
      time       text,
      avatar     text,
      source     text NOT NULL DEFAULT 'google',
      approved   boolean NOT NULL DEFAULT true,
      created_at timestamp DEFAULT now()
    );
  `;

  console.log("Mock Google yorumları temizleniyor...");
  await sql`DELETE FROM reviews WHERE source = 'google'`;
  for (const r of reviews) {
    await sql`
      INSERT INTO reviews (author, rating, text, time, avatar, source, approved)
      VALUES (${r.author}, ${r.rating}, ${r.text ?? null}, ${r.time ?? null}, ${r.avatar ?? null}, ${r.source ?? "manuel"}, ${r.approved ?? true});
    `;
  }

  console.log("Blog tablosu oluşturuluyor (yoksa)...");
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id           serial PRIMARY KEY,
      slug         text NOT NULL UNIQUE,
      title        text NOT NULL,
      excerpt      text,
      content      text,
      cover        text,
      author       text NOT NULL DEFAULT 'AKÜPORT',
      tags         text[],
      published    boolean NOT NULL DEFAULT true,
      published_at text,
      created_at   timestamp DEFAULT now()
    );
  `;

  const [{ count: postCount }] = await sql`SELECT count(*)::int AS count FROM posts`;
  if (postCount === 0) {
    console.log(`${posts.length} örnek yazı yükleniyor...`);
    for (const p of posts) {
      await sql`
        INSERT INTO posts (slug, title, excerpt, content, cover, author, tags, published, published_at)
        VALUES (${p.slug}, ${p.title}, ${p.excerpt ?? null}, ${p.content ?? null}, ${p.cover ?? null}, ${p.author ?? "AKÜPORT"}, ${p.tags ?? null}, ${p.published ?? true}, ${p.publishedAt ?? null});
      `;
    }
  } else {
    console.log(`Blog tablosunda ${postCount} kayıt var, örnek yazı atlandı.`);
  }

  console.log("Marka/kategori/bölge tabloları hazırlanıyor...");
  for (const [index, name] of brandNames.entries()) {
    const logo = `/images/brands/${name.toLocaleLowerCase("tr-TR").replaceAll("ı", "i")}.svg`;
    await sql`
      INSERT INTO brands (name, logo, sort_order, active)
      VALUES (${name}, ${logo}, ${index}, true)
      ON CONFLICT (name) DO UPDATE SET logo = EXCLUDED.logo, sort_order = EXCLUDED.sort_order, active = EXCLUDED.active;
    `;
  }

  for (const [index, c] of categories.entries()) {
    await sql`
      INSERT INTO categories (slug, name, kind, icon, intro, sort_order, active)
      VALUES (${c.slug}, ${c.name}, ${c.kind}, ${c.icon}, ${c.intro ?? null}, ${index}, true)
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name, kind = EXCLUDED.kind, icon = EXCLUDED.icon, intro = EXCLUDED.intro,
        sort_order = EXCLUDED.sort_order, active = EXCLUDED.active;
    `;
  }

  for (const [index, d] of districts.entries()) {
    await sql`
      INSERT INTO districts (slug, name, title, intro, sort_order, active)
      VALUES (${d.slug}, ${d.name}, ${d.title}, ${d.intro ?? null}, ${index}, true)
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name, title = EXCLUDED.title, intro = EXCLUDED.intro,
        sort_order = EXCLUDED.sort_order, active = EXCLUDED.active;
    `;
  }

  console.log("İçerik sayfaları hazırlanıyor...");
  for (const p of pages) {
    await sql`
      INSERT INTO content_pages (id, label, path, title, subtitle, content, data, published, updated_at)
      VALUES (${p.id}, ${p.label}, ${p.path}, ${p.defaults.title ?? null}, ${p.defaults.subtitle ?? null}, ${p.defaults.content ?? null}, ${sql.json(p.defaults)}, true, now())
      ON CONFLICT (id) DO NOTHING;
    `;
  }

  console.log("Genel ayarlar hazırlanıyor...");
  await sql`
    INSERT INTO settings (key, value, updated_at)
    VALUES ('site', ${sql.json(site)}, now())
    ON CONFLICT (key) DO NOTHING;
  `;
  await sql`
    INSERT INTO settings (key, value, updated_at)
    VALUES ('home', ${sql.json(homeDefaults)}, now())
    ON CONFLICT (key) DO NOTHING;
  `;
  await sql`
    INSERT INTO settings (key, value, updated_at)
    VALUES ('design', ${sql.json(designDefaults)}, now())
    ON CONFLICT (key) DO NOTHING;
  `;
  await sql`
    INSERT INTO settings (key, value, updated_at)
    VALUES ('reviewsSummary', ${sql.json(reviewsSummary)}, now())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
  `;

  console.log("Tamamlandı ✓");
  await sql.end();
}

run().catch((err) => {
  console.error("Seed hatası:", err);
  process.exit(1);
});
