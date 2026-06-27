// Google Analytics 4 + Google Ads dönüşüm takibi yapılandırması.
// ID'ler ortam değişkenlerinden okunur; boşsa hiçbir takip kodu basılmaz.
// Railway > Variables üzerinden aşağıdaki değerleri tanımlayın:
//   GA_MEASUREMENT_ID   → GA4 ölçüm kimliği (örn. G-XXXXXXXXXX)
//   GOOGLE_ADS_ID       → Google Ads dönüşüm kimliği (örn. AW-123456789)
//   ADS_CALL_LABEL      → "Telefon araması" dönüşüm etiketi (örn. AbC-D_efg)
//   ADS_WHATSAPP_LABEL  → "WhatsApp" dönüşüm etiketi
//   ADS_FORM_LABEL      → "Form gönderimi" dönüşüm etiketi
export function getAnalyticsConfig() {
  return {
    gaId: process.env.GA_MEASUREMENT_ID || "",
    adsId: process.env.GOOGLE_ADS_ID || "",
    callLabel: process.env.ADS_CALL_LABEL || "",
    whatsappLabel: process.env.ADS_WHATSAPP_LABEL || "",
    formLabel: process.env.ADS_FORM_LABEL || "",
  };
}
