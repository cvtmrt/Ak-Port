import "dotenv/config";
import fs from "fs";
import path from "path";
import { hasDb, sql } from "./index.js";
import { reviews, reviewsSummary } from "./reviews-data.js";

if (!hasDb) {
  console.error("HATA: DATABASE_URL tanımlı değil.");
  process.exit(1);
}

async function run() {
  const dir = path.join(process.cwd(), "db/migrations");
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".sql")).sort();
  for (const file of files) {
    console.log(`Migration çalışıyor: ${file}`);
    await sql.unsafe(fs.readFileSync(path.join(dir, file), "utf8"));
  }
  console.log(`${reviews.length} Google yorumu seed ediliyor...`);
  await sql`DELETE FROM reviews WHERE source = 'google'`;
  for (const r of reviews) {
    await sql`
      INSERT INTO reviews (author, rating, text, time, avatar, source, approved)
      VALUES (${r.author}, ${r.rating}, ${r.text || null}, ${r.time || null}, ${r.avatar || null}, ${r.source}, ${r.approved});
    `;
  }
  await sql`
    INSERT INTO settings (key, value, updated_at)
    VALUES ('reviewsSummary', ${sql.json(reviewsSummary)}, now())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
  `;
  console.log("Migration tamamlandı.");
  await sql.end();
}

run().catch((err) => {
  console.error("Migration hatası:", err);
  process.exit(1);
});
