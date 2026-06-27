// Express + Vike (SSR) sunucusu. Geliştirmede Vite middleware, üretimde dist.
import express from "express";
import http from "http";
import compression from "compression";
import { renderPage } from "vike/server";
import { buildSitemap, buildRobots } from "../lib/sitemap.js";
import { getAnalyticsConfig } from "../lib/analytics.js";
import { mountAdminApi } from "./admin-api.js";
import "dotenv/config";

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;
const root = process.cwd();

async function startServer() {
  const app = express();
  app.use(compression());
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
    const pageContextInit = {
      urlOriginal: req.originalUrl,
      headersOriginal: req.headers,
      analytics: getAnalyticsConfig(),
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
}

startServer();
