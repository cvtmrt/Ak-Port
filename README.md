# AKÜPORT — İncek & Gölbaşı Akü Sitesi

SEO odaklı akü tanıtım + katalog sitesi. **Vite + React + Vike (SSR)** ile her sayfa
sunucuda render edilir; **Railway PostgreSQL** ürün verisini tutar.

## Teknoloji
- **Vike + vike-react** — SSR (gerçek SEO; her sayfa sunucuda HTML olarak üretilir)
- **Express** — sunucu + sitemap/robots
- **Drizzle ORM + postgres.js** — Railway PostgreSQL
- **Tailwind CSS** — mobil öncelikli arayüz
- schema.org JSON-LD: `LocalBusiness`, `Product`, `BreadcrumbList`

## Geliştirme
```bash
npm install
npm run dev          # http://localhost:3000
```
> `DATABASE_URL` yoksa site otomatik olarak `db/seed-data.js` örnek ürünleriyle çalışır.

## Railway PostgreSQL bağlama
1. Railway'de PostgreSQL servisi oluşturun.
2. `.env.example` → `.env` kopyalayın, `DATABASE_URL`'i girin.
3. Ürünleri yükleyin:
```bash
npm run db:seed      # tabloyu oluşturur + db/seed-data.js ürünlerini aktarır
```

## Üretim (Railway deploy)
- Build: `npm run build`
- Start: `npm start`   (Railway `PORT`'u otomatik verir)
- Ortam değişkenleri: `DATABASE_URL`, `NODE_ENV=production`

## Ürün ekleme / düzenleme
Tek kaynak: [`db/seed-data.js`](db/seed-data.js). Ürünleri buradan düzenleyip
`npm run db:seed` ile DB'ye gönderin. Kategoriler de aynı dosyada.

## SEO sayfa yapısı (anahtar kelime eşlemesi)
| URL | Hedef |
| --- | --- |
| `/` | LocalBusiness + acil akü niyeti |
| `/kategori/:slug` | otomobil, ticari, kamyon, motosiklet, agm, efb, start-stop |
| `/amper/:n` | 60/70/100/180… amper akü |
| `/bolge/:slug` | İncek, Gölbaşı, Beytepe, Çankaya, Ankara (yerel SEO) |
| `/urun/:slug` | ürün detay + Product JSON-LD |
| `/acil-aku` | acil akü / yol yardım |
| `/sitemap.xml`, `/robots.txt` | otomatik üretilir |

## Yayına almadan önce güncellenecekler
- [ ] Gerçek **domain** → `lib/site.js` → `site.url`
- [ ] Gerçek **ürün fotoğrafları** → `public/images/` + `seed-data.js` `image`
- [ ] **Harita koordinatı** ince ayar → `lib/site.js` → `address.lat/lng`
- [ ] **Google Business Profile** ve doğrulama
- [ ] İşletme bilgileri tek yerde: [`lib/site.js`](lib/site.js)
