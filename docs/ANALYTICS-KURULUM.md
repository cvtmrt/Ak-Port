# Google Analytics & Google Ads Dönüşüm Takibi — Kurulum

Kod tarafı hazır. Yalnızca aşağıdaki ID'leri **Railway > Variables** bölümüne
girip yeniden deploy etmen yeterli. ID girilmezse siteye hiçbir takip kodu
eklenmez (yani şu an site temiz çalışır, sen hazır olunca açılır).

## 1. Google Analytics 4 (ücretsiz, ziyaretçi istatistiği)

1. https://analytics.google.com → **Yönetici** (sol alt dişli) → **Hesap oluştur**.
2. Mülk (property) oluştur: ad "AKÜPORT", saat dilimi Türkiye, para birimi TRY.
3. **Veri akışı** → **Web** → URL: `https://www.akuport.com` → akış oluştur.
4. Açılan ekranda **Ölçüm Kimliği** `G-XXXXXXXXXX` görünür → kopyala.
5. Railway > Variables:
   ```
   GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

## 2. Google Ads dönüşüm takibi (reklam verince)

1. https://ads.google.com → hesap aç.
2. **Araçlar > Dönüşümler > + Yeni dönüşüm eylemi > Web sitesi**.
3. Aşağıdaki 3 dönüşümü ayrı ayrı oluştur (her biri için "etiket" üretilir):
   - **Telefon araması** (web sitesinden tıklama)
   - **WhatsApp tıklaması**
   - **Form gönderimi** (iletişim formu)
4. Her dönüşümde "Etiketi yükle > Etiketi kendin ekle" dersen şunu görürsün:
   - `send_to: 'AW-123456789/AbC-D_efGhi'`
   - Buradaki `AW-123456789` → **GOOGLE_ADS_ID**
   - `/` sonrası `AbC-D_efGhi` → ilgili **ADS_..._LABEL**
5. Railway > Variables:
   ```
   GOOGLE_ADS_ID=AW-123456789
   ADS_CALL_LABEL=telefon-etiketi
   ADS_WHATSAPP_LABEL=whatsapp-etiketi
   ADS_FORM_LABEL=form-etiketi
   ```

## Nasıl çalışıyor?

- gtag.js script'i `layouts/HeadDefault.jsx` içinde, yalnızca ID tanımlıysa
  `<head>`'e basılır (panel sayfalarında basılmaz).
- Telefon (`tel:`) ve WhatsApp (`wa.me`) linklerine yapılan **her tıklama**
  `components/Analytics.jsx` içindeki global dinleyiciyle otomatik yakalanır
  ve hem GA4 olayı hem Google Ads dönüşümü olarak raporlanır.
- Yeni telefon/WhatsApp butonu eklersen ekstra kod gerekmez, otomatik sayılır.
- Form gönderimi gibi özel dönüşümler için: `trackConversion()` yardımcısı
  (`components/Analytics.jsx`) kullanılır.

## Doğrulama

Deploy sonrası tarayıcıda siteyi aç → DevTools > Network > "gtag" ara →
istek görünüyorsa kod aktif. GA4'te **Raporlar > Gerçek zamanlı** kendi
ziyaretini görmelisin. Ads dönüşümlerini test için **Google Tag Assistant**
kullan.
