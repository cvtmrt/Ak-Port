// AKÜPORT - Tüm site genelinde kullanılan işletme bilgileri ve SEO sabitleri.
// NAP (Name-Address-Phone) burada tek kaynaktan yönetilir; schema.org ve
// iletişim alanları hep buradan beslenir.

export const site = {
  name: "AKÜPORT",
  legalName: "Akü Port İncek Akü Market",
  slogan: "İncek ve Gölbaşı'nda Akü, Yerinde Montaj ve Acil Yol Yardım",
  url: "https://www.akuport.com", // GoDaddy'den alınan domain
  phone: "0544 479 29 59",
  phoneIntl: "+905444792959",
  whatsapp: "905444792959",
  email: "akuportankara@gmail.com",
  owner: "Evren Erdoğan",
  // SEO / arama sonucu (panelden düzenlenebilir; boş bırakılırsa bu varsayılanlar)
  seoTitle: "AKÜPORT | İncek & Gölbaşı Akü, Yerinde Montaj ve Acil Akü",
  seoDescription:
    "İncek, Gölbaşı ve Ankara'da akü satışı, yerinde montaj ve 7/24 acil akü hizmeti. Mutlu, Varta, Bosch, İnci aküleri. Hemen arayın: 0544 479 29 59.",
  favicon: "", // boş ise /favicon.png (logo) kullanılır
  address: {
    street: "2880. Cadde, Şht. Savcı Mehmet Selim Kiraz Blv. No: 55/E",
    district: "Gölbaşı",
    city: "Ankara",
    region: "Ankara",
    postalCode: "06830",
    country: "TR",
    // Haritada doğrudan Google işletme kaydı (Akü Port İncek Akü Market)
    // gösterilir; isimle sorgu yapıldığı için pin tam işletmeye düşer.
    mapQuery: "Akü Port İncek Akü Market, Şht. Savcı Mehmet Selim Kiraz Blv No:55 E, Gölbaşı, Ankara",
    // Google'dan alınan resmi gömme bağlantısı (place ID'li, en isabetli pin).
    mapEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3063.849016750528!2d32.753656299999996!3d39.832802699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d33f01edceb085%3A0xfdcc50fcbe305e98!2zQWvDvCBQb3J0wq4gxLBuY2VrIEFrw7wgTWFya2V0!5e0!3m2!1str!2str!4v1782730125001!5m2!1str!2str",
    // İşletmenin Google kaydındaki gerçek koordinatları (yapısal veri / SEO için)
    lat: 39.833116,
    lng: 32.751713,
  },
  hours: {
    text: "Her gün 07:30–23:00 (Pazar 09:00–23:00)",
    days: [
      { day: "Pazartesi", open: "07:30", close: "23:00" },
      { day: "Salı", open: "07:30", close: "23:00" },
      { day: "Çarşamba", open: "07:30", close: "23:00" },
      { day: "Perşembe", open: "07:30", close: "23:00" },
      { day: "Cuma", open: "07:30", close: "23:00" },
      { day: "Cumartesi", open: "07:30", close: "23:00" },
      { day: "Pazar", open: "09:00", close: "23:00" },
    ],
  },
  // Hizmet verilen bölgeler (yerel SEO landing sayfaları)
  serviceAreas: ["İncek", "Gölbaşı", "Beytepe", "Çayyolu", "Ümitköy", "Çankaya", "Ankara"],
  // Genel hizmet kapsamı mesajı (Ankara geneli)
  serviceScope: "Ankara'nın her yerine yerinde akü hizmeti",
  social: {
    instagram: "https://www.instagram.com/akuportankara/",
    googleMaps: "https://share.google/JfbIeT3NQQ2g9psVm",
  },
};

// Sitede satılan markalar (logo şeridinden)
export const brandNames = ["Mutlu", "İnci", "Varta", "Bosch", "Turbo", "President"];

// SEO için bölge landing sayfaları
export const districts = [
  {
    slug: "incek",
    name: "İncek",
    title: "İncek Akü | Yerinde Akü Değişimi ve Montaj",
    intro:
      "İncek'te akü mü lazım? AKÜPORT, İncek bölgesine yerinde akü değişimi ve hızlı montaj hizmeti sunar. Aküm bitti diyorsanız hemen arayın.",
  },
  {
    slug: "golbasi",
    name: "Gölbaşı",
    title: "Gölbaşı Akü | Acil Akü ve Yerinde Montaj",
    intro:
      "Gölbaşı'nda akücü arıyorsanız doğru yerdesiniz. Mağazamız Gölbaşı'nda; bölgeye yerinde akü değişimi ve acil yol yardım hizmeti veriyoruz.",
  },
  {
    slug: "beytepe",
    name: "Beytepe",
    title: "Beytepe Akü | Yerinde Akü Değişimi",
    intro:
      "Beytepe ve çevresine akü satışı, yerinde montaj ve acil akü hizmeti. Start-stop, AGM, EFB ve standart aküler stoklarımızda. Ankara'nın her yerine geliyoruz.",
  },
  {
    slug: "cayyolu",
    name: "Çayyolu",
    title: "Çayyolu Akü | Yerinde Akü Değişimi ve Montaj",
    intro:
      "Çayyolu'nda akü mü lazım? Çayyolu ve çevresine yerinde akü değişimi ve hızlı montaj hizmeti veriyoruz. Aküm bitti diyene en yakın akücü, Ankara'nın her yerinde.",
  },
  {
    slug: "umitkoy",
    name: "Ümitköy",
    title: "Ümitköy Akü | Yerinde Akü Değişimi ve Acil Akü",
    intro:
      "Ümitköy'de akücü arıyorsanız doğru yerdesiniz. Ümitköy ve çevresine yerinde akü değişimi ve 7/24 acil yol yardım. Ankara'nın her yerine hizmet veriyoruz.",
  },
  {
    slug: "cankaya",
    name: "Çankaya",
    title: "Çankaya Akücü | Yerinde Akü Değişimi ve Montaj",
    intro:
      "Çankaya'da akücü mü arıyorsunuz? AKÜPORT Çankaya bölgesine yerinde akü değişimi ve acil yol yardım hizmeti sunar.",
  },
  {
    slug: "ankara",
    name: "Ankara",
    title: "Ankara Akücü | Acil Akü, Yerinde Montaj",
    intro:
      "Ankara'da akü, yerinde akü değişimi ve 7/24 acil akü hizmeti. Tüm marka ve amperlerde otomobil, ticari araç, kamyon ve motosiklet aküsü.",
  },
];

// Acil / yol yardım çağrısı için kısa metin
export const emergency = {
  title: "Acil Akü ve Yol Yardım",
  text: "Aküm bitti, aracım çalışmıyor mu? En yakın akücü olarak yerinizde akü değişimi yapıyoruz. Hemen arayın.",
};
