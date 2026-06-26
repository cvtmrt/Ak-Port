// Railway PostgreSQL'e tabloyu oluşturup ürünleri yükler.
// Kullanım: DATABASE_URL ayarlı .env ile  ->  npm run db:seed
import "dotenv/config";
import { sql, hasDb } from "./index.js";
import { products } from "./seed-data.js";
import { reviews } from "./reviews-data.js";
import { posts } from "./posts-data.js";

if (!hasDb) {
  console.error("HATA: DATABASE_URL tanımlı değil. .env dosyasına Railway bağlantı adresini ekleyin.");
  process.exit(1);
}

async function run() {
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

  // Yorumlar yalnızca tablo boşsa örnek veriyle doldurulur (panel/Places sonradan yönetir).
  const [{ count }] = await sql`SELECT count(*)::int AS count FROM reviews`;
  if (count === 0) {
    console.log(`${reviews.length} örnek yorum yükleniyor...`);
    for (const r of reviews) {
      await sql`
        INSERT INTO reviews (author, rating, text, time, avatar, source, approved)
        VALUES (${r.author}, ${r.rating}, ${r.text ?? null}, ${r.time ?? null}, ${r.avatar ?? null}, ${r.source ?? "google"}, ${r.approved ?? true});
      `;
    }
  } else {
    console.log(`Yorumlar tablosunda ${count} kayıt var, örnek yorum atlandı.`);
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

  console.log("Tamamlandı ✓");
  await sql.end();
}

run().catch((err) => {
  console.error("Seed hatası:", err);
  process.exit(1);
});
