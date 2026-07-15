import { site } from "./site.js";
import { getPosts, getDistricts, getSiteSettings } from "../db/data.js";

export async function buildSitemap() {
  const siteSettings = await getSiteSettings();
  const base = (siteSettings.url || site.url).replace(/\/$/, "");
  const staticUrls = [
    "/", "/acil-aku", "/iletisim", "/hakkimizda",
    "/bilgi/aku-nedir", "/bilgi/teknik-bilgiler", "/bilgi/aku-takviyesi", "/sss",
    "/neden-biz", "/yorumlar", "/gizlilik", "/blog",
  ];
  const [districts, posts] = await Promise.all([
    getDistricts(),
    getPosts(),
  ]);
  const dist = districts.map((d) => `/bolge/${d.slug}`);
  const blog = posts.map((p) => `/blog/${p.slug}`);

  const all = [...staticUrls, ...dist, ...blog];
  const today = new Date().toISOString().slice(0, 10);
  const items = all
    .map((u) => `  <url>\n    <loc>${base}${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

export async function buildRobots() {
  const siteSettings = await getSiteSettings();
  const base = (siteSettings.url || site.url).replace(/\/$/, "");
  return `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;
}
