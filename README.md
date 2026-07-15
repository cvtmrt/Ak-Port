# AKÜPORT — İncek & Gölbaşı Akü Sitesi

SEO odaklı akü hizmet tanıtım sitesi. **Vite + React + Vike (SSR)** ile her sayfa
sunucuda render edilir; **Railway PostgreSQL** içerik verisini tutar.

## Teknoloji
- **Vike + vike-react** — SSR (gerçek SEO; her sayfa sunucuda HTML olarak üretilir)
- **Express** — sunucu + sitemap/robots
- **Drizzle ORM + postgres.js** — Railway PostgreSQL
- **Tailwind CSS** — mobil öncelikli arayüz
- schema.org JSON-LD: `LocalBusiness`, `BreadcrumbList`

## Geliştirme
```bash
npm install
npm run dev          # http://localhost:3000
```
> `DATABASE_URL` yoksa site kod içindeki örnek verilerle (blog, yorum, bölge) çalışır.

## Railway PostgreSQL bağlama
1. Railway'de PostgreSQL servisi oluşturun.
2. `.env.example` → `.env` kopyalayın, `DATABASE_URL`'i girin.
3. Tabloları oluşturun:
```bash
npm run db:migrate
```
4. Başlangıç verisini yükleyin:
```bash
npm run db:seed      # tabloları oluşturur + başlangıç verisini aktarır
```

## Yönetim paneli
- Panel: `/panel`
- Giriş şifresi: `ADMIN_PASSWORD`
- Production'da `ADMIN_PASSWORD` zorunludur.
- Panel şu alanları PostgreSQL'e kaydeder: markalar, blog yazıları, yorumlar, hizmet bölgeleri, içerik sayfaları, anasayfa metinleri, site ayarları ve tasarım ayarları.
- Görsel yüklemeleri `UPLOAD_DIR` klasörüne yazılır ve `UPLOAD_PUBLIC_PATH` üzerinden servis edilir.
- Google API kullanılmaz. Yorum özeti PostgreSQL `settings.reviewsSummary` kaydından gelir; panelden manuel eklenen gerçek yorumlar sitede kart olarak görünür.

## Railway volume / upload ayarı
Railway'de volume mount path'i olarak `/data` kullanın ve ortam değişkenlerini şöyle ayarlayın:
```bash
UPLOAD_DIR=/data/uploads
UPLOAD_PUBLIC_PATH=/uploads
UPLOAD_MAX_BYTES=5242880
```

## Üretim (Railway deploy)
- Build: `npm run build`
- Start: `npm start`   (Railway `PORT`'u otomatik verir)
- Ortam değişkenleri: `DATABASE_URL`, `NODE_ENV=production`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `UPLOAD_DIR=/data/uploads`

## SEO sayfa yapısı (anahtar kelime eşlemesi)
| URL | Hedef |
| --- | --- |
| `/` | LocalBusiness + acil akü niyeti |
| `/bolge/:slug` | İncek, Gölbaşı, Beytepe, Çankaya, Ankara (yerel SEO) |
| `/acil-aku` | acil akü / yol yardım |
| `/sitemap.xml`, `/robots.txt` | otomatik üretilir |

## Yayına almadan önce güncellenecekler
- [ ] Gerçek **domain** → `lib/site.js` → `site.url`
- [ ] **Harita koordinatı** ince ayar → `lib/site.js` → `address.lat/lng`
- [ ] **Google Business Profile** ve doğrulama
- [ ] İşletme bilgileri tek yerde: [`lib/site.js`](lib/site.js)
