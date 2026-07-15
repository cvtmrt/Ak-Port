import crypto from "crypto";
import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { hasDb, sql } from "../db/index.js";
import { defaultAdminData, defaultBrands, ensureCollectionSeeded, ensureSettingSeeded } from "../db/bootstrap.js";
import { site } from "../lib/site.js";
import { homeDefaults, designDefaults } from "../lib/panel-schema.js";

const isProduction = process.env.NODE_ENV === "production";
const uploadDir = process.env.UPLOAD_DIR || (isProduction ? "/data/uploads" : path.join(process.cwd(), "public/uploads"));
const publicUploadBase = process.env.UPLOAD_PUBLIC_PATH || "/uploads";
// 500 MB'lık Railway volume için güvenli bütçe (headroom bırakılır).
const STORAGE_BUDGET_BYTES = Number(process.env.STORAGE_BUDGET_BYTES || 450 * 1024 * 1024);

// Yükleme klasöründeki tüm dosyaların toplam boyutu = volume'un gerçek doluluğu.
function diskUsage() {
  try {
    const files = fs.readdirSync(uploadDir);
    let used = 0;
    let count = 0;
    for (const name of files) {
      try {
        const stat = fs.statSync(path.join(uploadDir, name));
        if (stat.isFile()) { used += stat.size; count += 1; }
      } catch {}
    }
    return { used, count };
  } catch {
    return { used: 0, count: 0 };
  }
}

function storageInfo() {
  const { used, count } = diskUsage();
  return { used, count, budget: STORAGE_BUDGET_BYTES, remaining: Math.max(0, STORAGE_BUDGET_BYTES - used) };
}

function sessionValue() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "dev-admin-session";
  return crypto.createHash("sha256").update(`akuport:${secret}`).digest("hex");
}

function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim().split("="))
      .filter(([key, value]) => key && value)
      .map(([key, value]) => [key, decodeURIComponent(value)])
  );
}

function requireAdmin(req, res, next) {
  const cookies = parseCookies(req.headers.cookie);
  if (cookies.akp_admin === sessionValue()) return next();
  res.status(401).json({ ok: false, error: "Yetkisiz" });
}

function requireDb(res) {
  if (hasDb) return true;
  res.status(503).json({ ok: false, error: "DATABASE_URL tanımlı değil; kalıcı kayıt için PostgreSQL bağlayın." });
  return false;
}

function toInt(value, fallback = null) {
  if (value === "" || value === undefined || value === null) return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function toBool(value, fallback = false) {
  if (value === undefined || value === null || value === "") return fallback;
  return Boolean(value);
}

function jsonb(value) {
  return JSON.stringify(value ?? {});
}

function normalizePost(p) {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || null,
    content: p.content || null,
    cover: p.cover || null,
    author: p.author || "AKÜPORT",
    tags: Array.isArray(p.tags) ? p.tags : [],
    published: toBool(p.published, true),
    publishedAt: p.publishedAt || null,
  };
}

function normalizeReview(r) {
  return {
    id: toInt(r.id),
    author: r.author,
    rating: toInt(r.rating, 5),
    text: r.text || null,
    time: r.time || null,
    avatar: r.avatar || null,
    source: r.source || "manuel",
    approved: toBool(r.approved, true),
  };
}

function normalizeBrand(b, index) {
  return {
    name: b.name,
    logo: b.logo || null,
    sortOrder: toInt(b.sortOrder, index),
    active: toBool(b.active, true),
  };
}

function normalizeDistrict(d, index) {
  return {
    slug: d.slug,
    name: d.name,
    title: d.title || `${d.name} Akü`,
    intro: d.intro || null,
    sortOrder: toInt(d.sortOrder, index),
    active: toBool(d.active, true),
  };
}

function normalizePage(p) {
  const data = { ...(p.data || {}) };
  for (const [key, value] of Object.entries(p)) {
    if (!["id", "label", "path", "title", "subtitle", "content", "published", "data"].includes(key)) {
      data[key] = value;
    }
  }
  return {
    id: p.id,
    label: p.label || p.id,
    path: p.path,
    title: p.title || null,
    subtitle: p.subtitle || null,
    content: p.content || null,
    data,
    published: toBool(p.published, true),
  };
}

const readers = {
  posts: async () => sql`SELECT id, slug, title, excerpt, content, cover, author, tags, published, published_at AS "publishedAt" FROM posts ORDER BY published_at DESC NULLS LAST, id DESC`,
  reviews: async () => sql`SELECT id, author, rating, text, time, avatar, source, approved FROM reviews ORDER BY id DESC`,
  brands: async () => sql`SELECT id, name, logo, sort_order AS "sortOrder", active FROM brands ORDER BY sort_order, name`,
  districts: async () => sql`SELECT id, slug, name, title, intro, sort_order AS "sortOrder", active FROM districts ORDER BY sort_order, name`,
  pages: async () => {
    const rows = await sql`SELECT id, label, path, title, subtitle, content, data, published FROM content_pages ORDER BY label`;
    return rows.map((p) => ({ ...p, ...(p.data || {}) }));
  },
};

const writers = {
  posts: async (items) => {
    await sql`DELETE FROM posts`;
    for (const item of items.map(normalizePost)) {
      await sql`
        INSERT INTO posts (slug, title, excerpt, content, cover, author, tags, published, published_at)
        VALUES (${item.slug}, ${item.title}, ${item.excerpt}, ${item.content}, ${item.cover}, ${item.author}, ${item.tags}, ${item.published}, ${item.publishedAt})
      `;
    }
  },
  reviews: async (items) => {
    await sql`DELETE FROM reviews`;
    for (const item of items.map(normalizeReview)) {
      await sql`
        INSERT INTO reviews (author, rating, text, time, avatar, source, approved)
        VALUES (${item.author}, ${item.rating}, ${item.text}, ${item.time}, ${item.avatar}, ${item.source}, ${item.approved})
      `;
    }
  },
  brands: async (items) => {
    await sql`DELETE FROM brands`;
    for (const item of items.map(normalizeBrand)) {
      await sql`
        INSERT INTO brands (name, logo, sort_order, active)
        VALUES (${item.name}, ${item.logo}, ${item.sortOrder}, ${item.active})
      `;
    }
  },
  districts: async (items) => {
    await sql`DELETE FROM districts`;
    for (const [index, raw] of items.entries()) {
      const item = normalizeDistrict(raw, index);
      await sql`
        INSERT INTO districts (slug, name, title, intro, sort_order, active)
        VALUES (${item.slug}, ${item.name}, ${item.title}, ${item.intro}, ${item.sortOrder}, ${item.active})
      `;
    }
  },
  pages: async (items) => {
    await sql`DELETE FROM content_pages`;
    for (const item of items.map(normalizePage)) {
      await sql`
        INSERT INTO content_pages (id, label, path, title, subtitle, content, data, published, updated_at)
        VALUES (${item.id}, ${item.label}, ${item.path}, ${item.title}, ${item.subtitle}, ${item.content}, ${jsonb(item.data)}::jsonb, ${item.published}, now())
      `;
    }
  },
};

async function readSetting(key, fallback) {
  if (!hasDb) return fallback;
  return ensureSettingSeeded(key, fallback);
}

async function writeSetting(key, value) {
  await sql`
    INSERT INTO settings (key, value, updated_at)
    VALUES (${key}, ${jsonb(value)}::jsonb, now())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
  `;
}

function uploadMiddleware() {
  fs.mkdirSync(uploadDir, { recursive: true });
  const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname || "").toLowerCase();
      cb(null, `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`);
    },
  });
  return multer({
    storage,
    limits: { fileSize: Number(process.env.UPLOAD_MAX_BYTES || 5 * 1024 * 1024) },
    fileFilter: (req, file, cb) => {
      cb(null, file.mimetype?.startsWith("image/"));
    },
  });
}

// Multer diske yazmadan önce bütçe kontrolü: gelen istek volume'u aşacaksa reddet.
function checkQuota(req, res, next) {
  const incoming = Number(req.headers["content-length"] || 0);
  const { used } = diskUsage();
  if (used + incoming > STORAGE_BUDGET_BYTES) {
    const info = storageInfo();
    res.status(413).json({
      ok: false,
      error: `Depolama alanı doldu (${(info.used / 1048576).toFixed(0)}/${(info.budget / 1048576).toFixed(0)} MB). Yer açmak için galeriden görsel silin.`,
      storage: info,
    });
    return;
  }
  next();
}

// URL'den güvenli dosya adı çıkar (path traversal engelle).
function filenameFromUrl(url) {
  if (!url || typeof url !== "string") return null;
  const base = path.basename(url);
  if (!base || base === "." || base === ".." || base.includes("/") || base.includes("\\")) return null;
  return base;
}

export function mountAdminApi(app) {
  fs.mkdirSync(uploadDir, { recursive: true });
  app.use(publicUploadBase, express.static(uploadDir));

  app.get("/api/public/config", async (req, res) => {
    try {
      if (hasDb) {
        await Promise.all([
          ensureCollectionSeeded("brands"),
          ensureCollectionSeeded("districts"),
        ]);
      }
      const [siteSettings, design, home, brands, districts] = await Promise.all([
        readSetting("site", site),
        readSetting("design", designDefaults),
        readSetting("home", homeDefaults),
        hasDb ? readers.brands().then((rows) => rows.filter((b) => b.active)).catch(() => defaultBrands) : defaultBrands,
        hasDb ? readers.districts().then((rows) => rows.filter((d) => d.active)).catch(() => defaultAdminData.districts) : defaultAdminData.districts,
      ]);
      res.json({ site: siteSettings, design, home, brands, districts });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  });

  app.get("/api/admin/health", (req, res) => {
    res.json({ ok: true, db: hasDb, uploadDir, uploadPath: publicUploadBase });
  });

  // Oturum kontrolü: geçerli admin cookie'si varsa 200, yoksa 401.
  // Panel sayfa yenilendiğinde tekrar şifre istememek için bunu kullanır.
  app.get("/api/admin/session", requireAdmin, (req, res) => {
    res.json({ ok: true });
  });

  app.post("/api/admin/login", (req, res) => {
    const password = req.body?.password || "";
    if (isProduction && !process.env.ADMIN_PASSWORD) {
      res.status(500).json({ ok: false, error: "ADMIN_PASSWORD production ortamında zorunlu." });
      return;
    }
    if (process.env.ADMIN_PASSWORD && password !== process.env.ADMIN_PASSWORD) {
      res.status(401).json({ ok: false, error: "Parola hatalı." });
      return;
    }
    const secure = isProduction ? "; Secure" : "";
    res.setHeader("Set-Cookie", `akp_admin=${encodeURIComponent(sessionValue())}; HttpOnly; SameSite=Lax; Path=/; Max-Age=604800${secure}`);
    res.json({ ok: true });
  });

  app.post("/api/admin/logout", requireAdmin, (req, res) => {
    res.setHeader("Set-Cookie", "akp_admin=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0");
    res.status(204).end();
  });

  app.get("/api/admin/settings", requireAdmin, async (req, res) => {
    res.json({
      site: await readSetting("site", site),
      design: await readSetting("design", designDefaults),
      home: await readSetting("home", homeDefaults),
    });
  });

  app.put("/api/admin/settings", requireAdmin, async (req, res) => {
    if (!requireDb(res)) return;
    const { site: siteSettings, design, home } = req.body || {};
    if (siteSettings) await writeSetting("site", siteSettings);
    if (design) await writeSetting("design", design);
    if (home) await writeSetting("home", home);
    res.json({ ok: true });
  });

  // NOT: Bu özel uçlar aşağıdaki genel "/:collection" route'undan ÖNCE tanımlı
  // olmalı; aksi halde "gallery"/"assets" bir koleksiyon sanılıp 404 döner.

  // Yüklenmiş tüm görseller + depolama doluluğu (galeri yöneticisi için).
  app.get("/api/admin/assets", requireAdmin, async (req, res) => {
    let items = [];
    if (hasDb) {
      try {
        items = await sql`
          SELECT id, filename, original_name AS "originalName", mime_type AS "mimeType", size, url, created_at AS "createdAt"
          FROM assets ORDER BY created_at DESC
        `;
      } catch {}
    }
    res.json({ items, storage: storageInfo() });
  });

  // Bir görseli diskten ve DB'den sil (volume'da yer açmak için).
  app.delete("/api/admin/assets", requireAdmin, async (req, res) => {
    const filename = filenameFromUrl(req.body?.url);
    if (!filename) {
      res.status(400).json({ ok: false, error: "Geçersiz görsel adresi." });
      return;
    }
    try {
      fs.unlinkSync(path.join(uploadDir, filename));
    } catch (err) {
      if (err.code !== "ENOENT") {
        res.status(500).json({ ok: false, error: "Dosya silinemedi: " + err.message });
        return;
      }
    }
    if (hasDb) {
      try { await sql`DELETE FROM assets WHERE filename = ${filename}`; } catch {}
    }
    res.json({ ok: true, storage: storageInfo() });
  });

  // Public galeride gösterilecek küratörlü görsel listesi.
  app.get("/api/admin/gallery", requireAdmin, async (req, res) => {
    res.json({ items: await readSetting("gallery", []), storage: storageInfo() });
  });

  app.put("/api/admin/gallery", requireAdmin, async (req, res) => {
    if (!requireDb(res)) return;
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    await writeSetting("gallery", items);
    res.json({ ok: true, count: items.length });
  });

  app.get("/api/admin/:collection", requireAdmin, async (req, res) => {
    const collection = req.params.collection;
    if (!readers[collection]) {
      res.status(404).json({ ok: false, error: "Koleksiyon bulunamadı." });
      return;
    }
    if (!hasDb) {
      res.json({ items: defaultAdminData[collection] || [] });
      return;
    }
    await ensureCollectionSeeded(collection);
    res.json({ items: await readers[collection]() });
  });

  app.put("/api/admin/:collection", requireAdmin, async (req, res) => {
    const collection = req.params.collection;
    if (!writers[collection]) {
      res.status(404).json({ ok: false, error: "Koleksiyon bulunamadı." });
      return;
    }
    if (!requireDb(res)) return;
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    await writers[collection](items);
    res.json({ ok: true, count: items.length });
  });

  app.post("/api/admin/upload", requireAdmin, checkQuota, uploadMiddleware().single("file"), async (req, res) => {
    if (!req.file) {
      res.status(400).json({ ok: false, error: "Görsel dosyası alınamadı." });
      return;
    }
    const url = `${publicUploadBase}/${req.file.filename}`;
    if (hasDb) {
      await sql`
        INSERT INTO assets (filename, original_name, mime_type, size, url)
        VALUES (${req.file.filename}, ${req.file.originalname}, ${req.file.mimetype}, ${req.file.size}, ${url})
      `;
    }
    res.json({ ok: true, url, size: req.file.size, storage: storageInfo() });
  });
}
