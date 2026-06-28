// Panel koleksiyon şemaları. Alanlar buradan tanımlanır; CRUD ekranı bunlara
// göre otomatik form üretir. Varsayılan veriler mevcut seed dosyalarından gelir
// (backend'e dokunmadan, salt okuma).
import { products, categories } from "../db/seed-data.js";
import { posts } from "../db/posts-data.js";
import { reviews } from "../db/reviews-data.js";
import { faqItems } from "../pages/sss/faq-data.js";
import { districts } from "./site.js";

const techOptions = [
  { value: "standart", label: "Standart" },
  { value: "efb", label: "EFB" },
  { value: "agm", label: "AGM" },
  { value: "start-stop", label: "Start-Stop" },
  { value: "jel", label: "Jel" },
];
const categoryOptions = categories.map((c) => ({ value: c.slug, label: c.name }));

export const collections = {
  products: {
    label: "Ürünler",
    singular: "Ürün",
    idField: "slug",
    defaults: products,
    columns: [
      { key: "name", label: "Ürün" },
      { key: "brand", label: "Marka" },
      { key: "amper", label: "Ah" },
      { key: "price", label: "Fiyat" },
    ],
    fields: [
      { key: "name", label: "Ürün Adı", type: "text", required: true },
      { key: "slug", label: "Slug (URL)", type: "text", required: true, hint: "küçük harf ve tire, örn: mutlu-60-amper" },
      { key: "brand", label: "Marka", type: "text" },
      { key: "category", label: "Kategori", type: "select", options: categoryOptions },
      { key: "technology", label: "Teknoloji", type: "select", options: techOptions },
      { key: "amper", label: "Amper (Ah)", type: "number" },
      { key: "volt", label: "Voltaj", type: "number" },
      { key: "cca", label: "Marş Gücü (CCA)", type: "number" },
      { key: "price", label: "Fiyat (TL)", type: "number" },
      { key: "stock", label: "Stokta", type: "boolean" },
      { key: "productCode", label: "Ürün Kodu", type: "text" },
      { key: "image", label: "Ürün Görseli", type: "image", hint: "boş bırakılırsa markaya göre otomatik görsel kullanılır" },
      { key: "shortDesc", label: "Kısa Açıklama", type: "textarea" },
      { key: "description", label: "Açıklama", type: "textarea" },
      { key: "featured", label: "Öne Çıkan", type: "boolean" },
    ],
  },
  posts: {
    label: "Blog",
    singular: "Yazı",
    idField: "slug",
    defaults: posts,
    columns: [
      { key: "title", label: "Başlık" },
      { key: "publishedAt", label: "Tarih" },
    ],
    fields: [
      { key: "title", label: "Başlık", type: "text", required: true },
      { key: "slug", label: "Slug (URL)", type: "text", required: true },
      { key: "excerpt", label: "Özet", type: "textarea" },
      { key: "cover", label: "Kapak Görseli", type: "image" },
      { key: "author", label: "Yazar", type: "text" },
      { key: "publishedAt", label: "Yayın Tarihi", type: "date" },
      { key: "tags", label: "Etiketler", type: "tags", hint: "virgülle ayırın" },
      { key: "content", label: "İçerik (HTML)", type: "html" },
      { key: "published", label: "Yayında", type: "boolean" },
    ],
  },
  brands: {
    label: "Markalar",
    singular: "Marka",
    idField: "name",
    defaults: [
      { name: "Mutlu", logo: "/images/brands/mutlu.svg" },
      { name: "Varta", logo: "/images/brands/varta.svg" },
      { name: "Bosch", logo: "/images/brands/bosch.svg" },
      { name: "İnci", logo: "/images/brands/inci.svg" },
      { name: "Turbo", logo: "/images/brands/turbo.svg" },
      { name: "President", logo: "/images/brands/president.svg" },
    ],
    columns: [{ key: "name", label: "Marka" }],
    fields: [
      { key: "name", label: "Marka Adı", type: "text", required: true },
      { key: "logo", label: "Logo", type: "image", hint: "şeffaf zeminli PNG/SVG önerilir" },
      { key: "sortOrder", label: "Sıra", type: "number" },
      { key: "active", label: "Aktif", type: "boolean" },
    ],
  },
  categories: {
    label: "Kategoriler",
    singular: "Kategori",
    idField: "slug",
    defaults: categories.map((c, i) => ({ ...c, sortOrder: i, active: true })),
    columns: [
      { key: "name", label: "Kategori" },
      { key: "slug", label: "Slug" },
      { key: "kind", label: "Tür" },
    ],
    fields: [
      { key: "name", label: "Ad", type: "text", required: true },
      { key: "slug", label: "Slug (URL)", type: "text", required: true },
      { key: "kind", label: "Tür", type: "select", options: [
        { value: "category", label: "Araç Kategorisi" },
        { value: "technology", label: "Teknoloji" },
      ] },
      { key: "icon", label: "İkon", type: "select", options: [
        { value: "car", label: "Otomobil" },
        { value: "van", label: "Ticari" },
        { value: "truck", label: "Kamyon" },
        { value: "moto", label: "Motosiklet" },
        { value: "bolt", label: "Bolt" },
        { value: "shield", label: "Kalkan" },
        { value: "battery", label: "Akü" },
      ] },
      { key: "intro", label: "Açıklama", type: "textarea" },
      { key: "sortOrder", label: "Sıra", type: "number" },
      { key: "active", label: "Aktif", type: "boolean" },
    ],
  },
  districts: {
    label: "Hizmet Bölgeleri",
    singular: "Bölge",
    idField: "slug",
    defaults: districts.map((d, i) => ({ ...d, sortOrder: i, active: true })),
    columns: [
      { key: "name", label: "Bölge" },
      { key: "slug", label: "Slug" },
      { key: "title", label: "SEO Başlık" },
    ],
    fields: [
      { key: "name", label: "Bölge Adı", type: "text", required: true },
      { key: "slug", label: "Slug (URL)", type: "text", required: true },
      { key: "title", label: "SEO Başlık", type: "text", required: true },
      { key: "intro", label: "Giriş Metni", type: "textarea" },
      { key: "sortOrder", label: "Sıra", type: "number" },
      { key: "active", label: "Aktif", type: "boolean" },
    ],
  },
  reviews: {
    label: "Yorumlar",
    singular: "Yorum",
    idField: "id",
    defaults: reviews,
    columns: [
      { key: "author", label: "İsim" },
      { key: "rating", label: "Puan" },
    ],
    fields: [
      { key: "author", label: "İsim", type: "text", required: true },
      { key: "rating", label: "Puan (1-5)", type: "number" },
      { key: "text", label: "Yorum", type: "textarea" },
      { key: "time", label: "Zaman", type: "text", hint: "örn: 2 hafta önce" },
      { key: "source", label: "Kaynak", type: "select", options: [
        { value: "google", label: "Google" },
        { value: "manuel", label: "Manuel" },
      ] },
      { key: "avatar", label: "Avatar", type: "image" },
      { key: "approved", label: "Yayında", type: "boolean" },
    ],
  },
};

for (const [key, schema] of Object.entries(collections)) {
  schema.key = key;
}

// ANASAYFA — her bölüm bir sekme, alanlar tek bir düz nesnede tutulur.
export const homeSections = [
  {
    id: "hero",
    label: "Hero (Üst Alan)",
    fields: [
      { key: "heroBadge", label: "Üst Rozet", type: "text" },
      { key: "heroTitle1", label: "Başlık 1. Satır", type: "text" },
      { key: "heroTitle2", label: "Başlık 2. Satır (vurgulu)", type: "text" },
      { key: "heroSubtitle", label: "Alt Metin", type: "textarea" },
      { key: "heroFeatures", label: "Özellik Rozetleri", type: "tags", hint: "virgülle ayırın" },
      { key: "heroImage", label: "Hero Görseli (logo/banner)", type: "image", hint: "boş bırakılırsa varsayılan akü görseli kullanılır" },
    ],
  },
  {
    id: "trust",
    label: "Güven Kartları",
    fields: [{ key: "trustCards", label: "Kartlar (Başlık + Açıklama)", type: "cards" }],
  },
  {
    id: "headings",
    label: "Bölüm Başlıkları",
    fields: [
      { key: "catKicker", label: "Kategoriler — Üst Etiket", type: "text" },
      { key: "catTitle", label: "Kategoriler — Başlık", type: "text" },
      { key: "catDesc", label: "Kategoriler — Açıklama", type: "text" },
      { key: "featKicker", label: "Öne Çıkanlar — Üst Etiket", type: "text" },
      { key: "featTitle", label: "Öne Çıkanlar — Başlık", type: "text" },
      { key: "featDesc", label: "Öne Çıkanlar — Açıklama", type: "text" },
      { key: "amperKicker", label: "Amper — Üst Etiket", type: "text" },
      { key: "amperTitle", label: "Amper — Başlık", type: "text" },
      { key: "amperDesc", label: "Amper — Açıklama", type: "text" },
      { key: "brandHeading", label: "Marka Şeridi — Başlık", type: "text" },
    ],
  },
  {
    id: "kapsam",
    label: "Hizmet Kapsamı",
    fields: [
      { key: "kapsamKicker", label: "Üst Etiket", type: "text" },
      { key: "kapsamTitle", label: "Başlık", type: "text" },
      { key: "kapsamText", label: "Metin", type: "textarea" },
    ],
  },
  {
    id: "sss",
    label: "S.S.S.",
    fields: [
      { key: "sssKicker", label: "Üst Etiket", type: "text" },
      { key: "sssTitle", label: "Başlık", type: "text" },
      { key: "sssItems", label: "Sorular ve Cevaplar", type: "faq" },
    ],
  },
  {
    id: "cta",
    label: "Alt CTA",
    fields: [
      { key: "ctaTitle", label: "Başlık", type: "text" },
      { key: "ctaText", label: "Metin", type: "textarea" },
    ],
  },
];

export const homeDefaults = {
  heroBadge: "⚡ İncek · Gölbaşı · Ankara",
  heroTitle1: "İncek & Gölbaşı Akü",
  heroTitle2: "Yerinde Montaj & Acil Akü",
  heroSubtitle:
    "Aküm bitti diyene en yakın akücü. Otomobil, ticari, kamyon ve motosiklet aküsünde tüm marka ve amperler, ücretsiz yerinde montaj ile.",
  heroFeatures: ["Ücretsiz yerinde montaj", "7/24 acil akü", "Eski akü takas"],
  heroImage: "/images/akuport-logo.jpeg",
  trustCards: [
    { title: "Ücretsiz Yerinde Montaj", text: "İncek & Gölbaşı'na yerinde akü değişimi" },
    { title: "7/24 Acil Akü", text: "Aküm bitti diyene hızlı yol yardım" },
    { title: "Garantili Aküler", text: "Üretici garantili orijinal ürünler" },
    { title: "Tüm Marka & Amper", text: "Mutlu, Varta, Bosch, İnci ve daha fazlası" },
  ],
  catKicker: "Akü Çeşitleri",
  catTitle: "Aracınıza Uygun Aküyü Seçin",
  catDesc: "Araç tipine ve teknolojiye göre akü kategorileri.",
  featKicker: "Öne Çıkanlar",
  featTitle: "Popüler Aküler",
  featDesc: "En çok tercih edilen marka ve amperler.",
  amperKicker: "Ampere Göre",
  amperTitle: "Amper Değerine Göre Akü",
  amperDesc: "60, 70, 100, 180 amper... İhtiyacınız olan değeri seçin.",
  brandHeading: "Çalıştığımız Markalar",
  kapsamKicker: "Hizmet Kapsamı",
  kapsamTitle: "Ankara'nın Her Yerine Geliyoruz",
  kapsamText:
    "İncek, Gölbaşı, Beytepe, Çayyolu ve Ümitköy başta olmak üzere Ankara'nın tüm ilçelerine yerinde akü değişimi ve acil yol yardım. Neredeyseniz, aküyle geliyoruz.",
  sssKicker: "Sık Sorulanlar",
  sssTitle: "Akü Hakkında Merak Edilenler",
  sssItems: [
    { q: "Aküm bitti, yerinize gelir misiniz?", a: "Evet. İncek, Gölbaşı, Beytepe ve Çankaya başta olmak üzere Ankara içi yerinde akü değişimi yapıyoruz." },
    { q: "Hangi amper aküye ihtiyacım var?", a: "Aracınızın marka-modelini söylemeniz yeterli; doğru amper ve teknolojiyi biz öneririz." },
    { q: "Start-stop araçlara normal akü takılır mı?", a: "Hayır. Start-stop sistemli araçlar EFB veya AGM akü ister." },
    { q: "Eski aküyü geri alıyor musunuz?", a: "Evet, eski akünüzü hurda olarak değerlendirip yeni akü fiyatından düşüyoruz." },
  ],
  ctaTitle: "Aküm bitti, hemen lazım!",
  ctaText: "İncek, Gölbaşı ve Ankara içi yerinde akü değişimi. Bizi arayın, gelelim.",
};

// Yönetilebilir içerik sayfaları (Kurumsal). İçerik HTML olarak düzenlenir.
export const pages = [
  {
    id: "hakkimizda",
    label: "Hakkımızda",
    path: "/hakkimizda",
    fields: [
      { key: "title", label: "Başlık", type: "text" },
      { key: "content", label: "İçerik (HTML)", type: "html" },
    ],
    defaults: {
      title: "Hakkımızda",
      content:
        "<p>AKÜPORT, Ankara İncek ve Gölbaşı bölgesinde akü satışı, yerinde montaj ve acil akü hizmeti sunan bir akü marketidir. Otomobil, ticari araç, kamyon ve motosiklet aküsünde tüm marka ve amperleri stoğumuzda bulundururuz.</p><p>Amacımız; aracınız yolda kaldığında en hızlı şekilde yanınızda olmak ve doğru aküyü doğru fiyata, garantili biçimde sunmaktır.</p>",
    },
  },
  {
    id: "neden-biz",
    label: "Neden Biz?",
    path: "/neden-biz",
    fields: [
      { key: "title", label: "Başlık", type: "text" },
      { key: "subtitle", label: "Alt Metin", type: "textarea" },
      { key: "content", label: "İçerik / Avantajlar (HTML)", type: "html" },
    ],
    defaults: {
      title: "Neden AKÜPORT?",
      subtitle:
        "Ankara'da akü alırken hız, güven ve doğru ürün önemlidir. İşte bizi tercih etmeniz için nedenler.",
      content:
        "<ul><li><strong>Yerinde Hizmet:</strong> Aracınıza geliyoruz; akünüzü bulunduğunuz yerde değiştiriyoruz.</li><li><strong>7/24 Acil Akü:</strong> Aküm bitti dediğiniz anda yola çıkıyoruz.</li><li><strong>Garantili Aküler:</strong> Orijinal, üretici garantili ürünler.</li><li><strong>Tüm Marka ve Amperler:</strong> Otomobilden kamyona her amper stoğumuzda.</li><li><strong>Eski Akü Takas:</strong> Eski akünüzü değerlendirip fiyattan düşüyoruz.</li></ul>",
    },
  },
  {
    id: "aku-nedir",
    label: "Akü Nedir?",
    path: "/bilgi/aku-nedir",
    fields: [
      { key: "title", label: "Başlık", type: "text" },
      { key: "content", label: "İçerik (HTML)", type: "html" },
    ],
    defaults: {
      title: "Akü Nedir? Nasıl Çalışır?",
      content:
        "<p>Akü, aracınızın marş motorunu çalıştıran ve motor çalışmadığı sürece elektronik sistemlere enerji sağlayan, şarj edilebilir bir enerji deposudur.</p><h2>Akü Çeşitleri</h2><ul><li><strong>Standart:</strong> Start-stop'suz klasik araçlar için.</li><li><strong>EFB:</strong> Start-stop giriş seviyesi araçlar için.</li><li><strong>AGM:</strong> Yüksek donanımlı ve start-stop'lu araçlar için.</li></ul>",
    },
  },
  {
    id: "teknik-bilgiler",
    label: "Teknik Bilgiler",
    path: "/bilgi/teknik-bilgiler",
    fields: [
      { key: "title", label: "Başlık", type: "text" },
      { key: "content", label: "İçerik (HTML)", type: "html" },
    ],
    defaults: {
      title: "Akü Teknik Bilgileri",
      content:
        "<h2>Sağlıklı Akü Voltajı</h2><p>Dinlenme halindeki dolu bir akü 12.6V – 12.8V arası göstermelidir. Araç çalışırken alternatör 13.8V – 14.5V üretir.</p><h2>Amper ve CCA</h2><p>Ah akünün kapasitesi, CCA ise soğukta marş gücüdür.</p>",
    },
  },
  {
    id: "aku-takviyesi",
    label: "Akü Takviyesi",
    path: "/bilgi/aku-takviyesi",
    fields: [
      { key: "title", label: "Başlık", type: "text" },
      { key: "content", label: "İçerik (HTML)", type: "html" },
    ],
    defaults: {
      title: "Akü Takviyesi Nasıl Yapılır?",
      content:
        "<p>Akü takviyesi, boşalmış bir akünün başka bir kaynaktan geçici olarak çalıştırılmasıdır. Akü ömrünü tamamladıysa takviye kalıcı çözüm olmaz; değişmesi gerekir.</p><p>Ankara'nın her yerine yerinde akü takviyesi ve değişimi yapıyoruz.</p>",
    },
  },
  {
    id: "sss",
    label: "S.S.S.",
    path: "/sss",
    fields: [
      { key: "title", label: "Başlık", type: "text" },
      { key: "items", label: "Sorular ve Cevaplar", type: "faq" },
    ],
    defaults: {
      title: "Sıkça Sorulan Sorular",
      items: faqItems,
    },
  },
];

// Site ayarları (içerik) alanları
export const settingsFields = [
  { key: "name", label: "Marka Adı", type: "text" },
  { key: "legalName", label: "Tam Ünvan", type: "text" },
  { key: "slogan", label: "Slogan", type: "text" },
  { key: "phone", label: "Telefon", type: "text" },
  { key: "phoneIntl", label: "Telefon (uluslararası, +90...)", type: "text" },
  { key: "whatsapp", label: "WhatsApp (90...)", type: "text" },
  { key: "email", label: "E-posta", type: "text" },
  { key: "owner", label: "Yetkili", type: "text" },
  { key: "serviceScope", label: "Hizmet Kapsamı Mesajı", type: "text" },
  { key: "url", label: "Site URL", type: "text" },
  { key: "instagram", label: "Instagram URL", type: "text" },
  { key: "googleMaps", label: "Google Maps URL", type: "text" },
  { key: "hoursText", label: "Çalışma Saatleri Özeti", type: "text" },
];

export const addressFields = [
  { key: "street", label: "Adres (cadde/sokak/no)", type: "text" },
  { key: "district", label: "İlçe", type: "text" },
  { key: "city", label: "İl", type: "text" },
  { key: "postalCode", label: "Posta Kodu", type: "text" },
  { key: "lat", label: "Enlem", type: "number" },
  { key: "lng", label: "Boylam", type: "number" },
];

// Tasarım alanları
export const designFields = [
  { key: "gold", label: "Ana Vurgu Rengi (altın)", type: "color" },
  { key: "dark", label: "Koyu Zemin Rengi", type: "color" },
  { key: "heroTitle", label: "Ana Sayfa Başlık (1. satır)", type: "text" },
  { key: "heroTitleAccent", label: "Ana Sayfa Başlık (2. satır - vurgulu)", type: "text" },
  { key: "heroSubtitle", label: "Ana Sayfa Alt Metin", type: "textarea" },
];

export const designDefaults = {
  gold: "#f5a623",
  dark: "#0d1b2a",
  heroTitle: "İncek & Gölbaşı Akü",
  heroTitleAccent: "Yerinde Montaj & Acil Akü",
  heroSubtitle: "Aküm bitti diyene en yakın akücü. Otomobil, ticari, kamyon ve motosiklet aküsünde tüm marka ve amperler, ücretsiz yerinde montaj ile.",
};
