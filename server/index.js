// Express + Vike (SSR) sunucusu. Geliştirmede Vite middleware, üretimde dist.
import express from "express";
import http from "http";
import compression from "compression";
import { renderPage } from "vike/server";
import { buildSitemap, buildRobots } from "../lib/sitemap.js";
import { getAnalyticsConfig } from "../lib/analytics.js";
import { getSiteSettings } from "../db/data.js";
import { ensureFreeInstallWordingPatched } from "../db/bootstrap.js";
import { site } from "../lib/site.js";
import { mountAdminApi } from "./admin-api.js";
import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;
const root = process.cwd();

async function startServer() {
  const app = express();
  app.use(compression());

  // Kanonik adres yönlendirmesi: www'siz apex (akuport.com) isteklerini tek
  // kanonik adrese (https://www.akuport.com) 301 ile yönlendirir. Böylece Google
  // siteyi tek adres olarak görür (duplicate content önlenir). Railway iç
  // domaini (*.up.railway.app) ve healthcheck'ler bu kuraldan etkilenmez.
  const canonicalHost = new URL(site.url).host; // www.akuport.com
  const apexHost = canonicalHost.replace(/^www\./, ""); // akuport.com
  app.use((req, res, next) => {
    const host = (req.headers.host || "").toLowerCase();
    if (isProduction && host === apexHost) {
      return res.redirect(301, `${site.url.replace(/\/$/, "")}${req.originalUrl}`);
    }
    next();
  });

  app.use(express.json({ limit: "2mb" }));
  mountAdminApi(app);

  // HMR websocket'i ayrı bir port yerine aynı HTTP sunucusu üzerinden çalışır
  // (proxy/preview arkasında ve tek portta sorunsuz çalışsın diye).
  const server = http.createServer(app);

  if (isProduction) {
    const sirv = (await import("sirv")).default;
    app.use(sirv(`${root}/dist/client`, { extensions: [] }));
  } else {
    const vite = await import("vite");
    const viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: true, hmr: { server } },
    });
    app.use(viteDevServer.middlewares);
  }

  app.get("/robots.txt", (req, res) => {
    buildRobots()
      .then((robots) => res.type("text/plain").send(robots))
      .catch((err) => {
        console.error("robots hatası:", err);
        res.status(500).send("robots üretilemedi");
      });
  });

  app.get("/sitemap.xml", async (req, res) => {
    try {
      res.type("application/xml").send(await buildSitemap());
    } catch (err) {
      console.error("sitemap hatası:", err);
      res.status(500).send("sitemap üretilemedi");
    }
  });

  app.get(/.*/, async (req, res, next) => {
    const s = await getSiteSettings();
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      headersOriginal: req.headers,
      analytics: getAnalyticsConfig(),
      seo: {
        title: s.seoTitle || site.seoTitle,
        description: s.seoDescription || site.seoDescription,
        logo: s.logo || site.logo || "",
        favicon: s.favicon || "",
      },
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();

    const { statusCode, headers, body } = httpResponse;
    headers.forEach(([name, value]) => res.setHeader(name, value));
    res.status(statusCode).send(body);
  });

  server.listen(port);
  console.log(`AKÜPORT çalışıyor → http://localhost:${port}`);

  // Kayıtlı içerikteki "ücretsiz montaj" ifadesini temizleyen tek seferlik yama.
  // Açılışı bloklamaz; DB yoksa ya da hata alırsa site normal çalışmaya devam eder.
  ensureFreeInstallWordingPatched().catch((err) => {
    console.error("[db] İçerik yaması uygulanamadı:", err.message);
  });
}

startServer();
