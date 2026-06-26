import { site, districts } from "./site.js";
import { getProducts, getCategories, getAmperValues, getPosts } from "../db/data.js";

export async function buildSitemap() {
  const base = site.url.replace(/\/$/, "");
  const staticUrls = [
    "/", "/urunler", "/aku-bulucu", "/acil-aku", "/iletisim", "/hakkimizda",
    "/bilgi/aku-nedir", "/bilgi/teknik-bilgiler", "/bilgi/aku-takviyesi", "/sss",
    "/neden-biz", "/yorumlar", "/gizlilik", "/blog",
  ];
  const cats = getCategories().map((c) => `/kategori/${c.slug}`);
  const dist = districts.map((d) => `/bolge/${d.slug}`);
  const amper = (await getAmperValues()).map((a) => `/amper/${a}`);
  const products = (await getProducts()).map((p) => `/urun/${p.slug}`);
  const blog = (await getPosts()).map((p) => `/blog/${p.slug}`);

  const all = [...staticUrls, ...cats, ...dist, ...amper, ...products, ...blog];
  const today = new Date().toISOString().slice(0, 10);
  const items = all
    .map((u) => `  <url>\n    <loc>${base}${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

export function buildRobots() {
  const base = site.url.replace(/\/$/, "");
  return `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;
}
