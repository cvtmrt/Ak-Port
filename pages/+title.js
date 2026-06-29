// Varsayılan sayfa başlığı (Google'daki mavi başlık). Panelden (Site Ayarları >
// Google Başlığı) yönetilir; boşsa bu varsayılan kullanılır. Alt sayfalar kendi
// +title.js dosyalarıyla bunu ezer.
export default (pageContext) =>
  pageContext.seo?.title || "AKÜPORT | İncek & Gölbaşı Akü, Yerinde Montaj ve Acil Akü";
