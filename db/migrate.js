import "dotenv/config";
import fs from "fs";
import path from "path";
import { hasDb, sql } from "./index.js";

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
  console.log("Migration tamamlandı.");
  await sql.end();
}

run().catch((err) => {
  console.error("Migration hatası:", err);
  process.exit(1);
});
