// Varsayılan meta açıklama (Google'daki gri açıklama). Panelden (Site Ayarları >
// Google Açıklaması) yönetilir; boşsa bu varsayılan kullanılır. Alt sayfalar
// kendi +description.js dosyalarıyla bunu ezer.
export default (pageContext) =>
  pageContext.seo?.description ||
  "İncek, Gölbaşı ve Ankara'da akü satışı, yerinde montaj ve 7/24 acil akü hizmeti. Mutlu, Varta, Bosch, İnci aküleri. Hemen arayın: 0544 479 29 59.";
