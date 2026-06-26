// AKÜPORT ürün kataloğu — tek kaynak.
// Bu dosya hem geliştirme sırasında (DB bağlı değilken) doğrudan kullanılır,
// hem de `npm run db:seed` ile Railway PostgreSQL'e aktarılır.

// Kategoriler / teknolojiler — SEO landing sayfalarını besler.
export const categories = [
  { slug: "otomobil", name: "Otomobil Aküsü", kind: "category", icon: "car",
    intro: "Binek araçlar için tüm marka ve amperlerde otomobil aküleri. Yerinde montaj dahil." },
  { slug: "ticari", name: "Ticari Araç Aküsü", kind: "category", icon: "van",
    intro: "Kamyonet, minibüs ve ticari araçlar için yüksek amperli aküler." },
  { slug: "kamyon", name: "Kamyon & TIR Aküsü", kind: "category", icon: "truck",
    intro: "Kamyon, TIR ve iş makineleri için 150-225 amper ağır hizmet aküleri." },
  { slug: "motosiklet", name: "Motosiklet Aküsü", kind: "category", icon: "moto",
    intro: "Motosiklet ve scooter için bakımsız ve jel aküler." },
  { slug: "start-stop", name: "Start-Stop Aküsü", kind: "technology", icon: "bolt",
    intro: "Start-stop sistemli araçlar için AGM ve EFB start-stop aküleri." },
  { slug: "agm", name: "AGM Akü", kind: "technology", icon: "shield",
    intro: "Yüksek elektrik tüketimli ve start-stop araçlar için AGM teknolojili aküler." },
  { slug: "efb", name: "EFB Akü", kind: "technology", icon: "battery",
    intro: "Start-stop giriş seviyesi araçlar için dayanıklı EFB aküler." },
];

const IMG = "/images/aku-placeholder.svg";

export const products = [
  {
    slug: "mutlu-60-amper-otomobil-aku", name: "Mutlu 60 Amper Akü", brand: "Mutlu",
    category: "otomobil", technology: "standart", amper: 60, volt: 12, cca: 540,
    price: "2750.00", stock: true, productCode: "MTL-560", image: IMG, featured: true,
    shortDesc: "60 Ah binek araç aküsü, yerinde montaj dahil.",
    description: "Mutlu 60 amper bakımsız otomobil aküsü. Çoğu binek araç için uygun, yüksek marş gücü. İncek ve Gölbaşı'na ücretsiz yerinde montaj.",
  },
  {
    slug: "varta-60-amper-efb-aku", name: "Varta 60 Amper EFB Akü", brand: "Varta",
    category: "otomobil", technology: "efb", amper: 60, volt: 12, cca: 560,
    price: "3450.00", stock: true, productCode: "VAR-D53", image: IMG, featured: false,
    shortDesc: "60 Ah EFB start-stop giriş seviyesi akü.",
    description: "Varta 60 amper EFB akü, start-stop sistemli araçlar için. Uzun ömür ve yüksek şarj kabul oranı.",
  },
  {
    slug: "mutlu-70-amper-otomobil-aku", name: "Mutlu 70 Amper Akü", brand: "Mutlu",
    category: "otomobil", technology: "standart", amper: 70, volt: 12, cca: 630,
    price: "3150.00", stock: true, productCode: "MTL-570", image: IMG, featured: true,
    shortDesc: "70 Ah binek/ticari araç aküsü.",
    description: "Mutlu 70 amper bakımsız akü. Daha yüksek elektrik tüketimli binek ve ticari araçlar için ideal. Yerinde montaj.",
  },
  {
    slug: "bosch-70-amper-efb-aku", name: "Bosch 70 Amper EFB Akü", brand: "Bosch",
    category: "otomobil", technology: "efb", amper: 70, volt: 12, cca: 650,
    price: "4250.00", stock: true, productCode: "BSH-S4E", image: IMG, featured: true,
    shortDesc: "70 Ah EFB start-stop aküsü.",
    description: "Bosch 70 amper EFB akü. Start-stop araçlarda standart kurşun-asit aküye göre 2 kat daha uzun ömür.",
  },
  {
    slug: "varta-72-amper-agm-start-stop-aku", name: "Varta 72 Amper AGM Start-Stop Akü", brand: "Varta",
    category: "otomobil", technology: "agm", amper: 72, volt: 12, cca: 760,
    price: "6850.00", stock: true, productCode: "VAR-E39", image: IMG, featured: true,
    shortDesc: "72 Ah AGM start-stop aküsü, yüksek CCA.",
    description: "Varta 72 amper AGM akü. Start-stop ve yüksek donanımlı araçlar için en üst segment. Titreşim ve derin deşarja dayanıklı.",
  },
  {
    slug: "inci-80-amper-agm-aku", name: "İnci 80 Amper AGM Akü", brand: "İnci",
    category: "otomobil", technology: "agm", amper: 80, volt: 12, cca: 800,
    price: "7200.00", stock: true, productCode: "INC-A80", image: IMG, featured: false,
    shortDesc: "80 Ah AGM akü, SUV ve premium araçlar.",
    description: "İnci 80 amper AGM akü. Çok sayıda elektronik donanıma sahip SUV ve premium araçlar için.",
  },
  {
    slug: "mutlu-100-amper-aku", name: "Mutlu 100 Amper Akü", brand: "Mutlu",
    category: "ticari", technology: "standart", amper: 100, volt: 12, cca: 850,
    price: "5400.00", stock: true, productCode: "MTL-600", image: IMG, featured: false,
    shortDesc: "100 Ah ticari araç / minibüs aküsü.",
    description: "Mutlu 100 amper akü. Minibüs, kamyonet ve yüksek tüketimli ticari araçlar için.",
  },
  {
    slug: "varta-105-amper-aku", name: "Varta 105 Amper Akü", brand: "Varta",
    category: "ticari", technology: "standart", amper: 105, volt: 12, cca: 950,
    price: "6100.00", stock: true, productCode: "VAR-H3", image: IMG, featured: false,
    shortDesc: "105 Ah ticari araç aküsü.",
    description: "Varta 105 amper akü. Ağır ticari kullanım için yüksek marş gücü.",
  },
  {
    slug: "inci-150-amper-kamyon-aku", name: "İnci 150 Amper Kamyon Aküsü", brand: "İnci",
    category: "kamyon", technology: "standart", amper: 150, volt: 12, cca: 1000,
    price: "8900.00", stock: true, productCode: "INC-150", image: IMG, featured: false,
    shortDesc: "150 Ah kamyon ve iş makinesi aküsü.",
    description: "İnci 150 amper kamyon aküsü. Kamyon, otobüs ve iş makineleri için ağır hizmet tipi.",
  },
  {
    slug: "mutlu-180-amper-kamyon-aku", name: "Mutlu 180 Amper Kamyon Aküsü", brand: "Mutlu",
    category: "kamyon", technology: "standart", amper: 180, volt: 12, cca: 1100,
    price: "10500.00", stock: true, productCode: "MTL-180", image: IMG, featured: true,
    shortDesc: "180 Ah kamyon / TIR aküsü.",
    description: "Mutlu 180 amper kamyon aküsü. TIR, kamyon ve ağır iş makineleri için yüksek kapasiteli akü. Yerinde montaj ve teslimat.",
  },
  {
    slug: "inci-200-amper-tir-aku", name: "İnci 200 Amper TIR Aküsü", brand: "İnci",
    category: "kamyon", technology: "standart", amper: 200, volt: 12, cca: 1250,
    price: "12800.00", stock: true, productCode: "INC-200", image: IMG, featured: false,
    shortDesc: "200 Ah TIR ve otobüs aküsü.",
    description: "İnci 200 amper akü. TIR, otobüs ve büyük iş makineleri için en yüksek kapasite.",
  },
  {
    slug: "president-12-amper-motosiklet-aku", name: "President 12 Amper Motosiklet Aküsü", brand: "President",
    category: "motosiklet", technology: "standart", amper: 12, volt: 12, cca: 150,
    price: "1450.00", stock: true, productCode: "PRS-12", image: IMG, featured: false,
    shortDesc: "12 Ah bakımsız motosiklet aküsü.",
    description: "President 12 amper motosiklet aküsü. Bakım gerektirmeyen, hazır kullanıma uygun.",
  },
  {
    slug: "turbo-9-amper-motosiklet-aku", name: "Turbo 9 Amper Motosiklet Aküsü", brand: "Turbo",
    category: "motosiklet", technology: "standart", amper: 9, volt: 12, cca: 120,
    price: "1150.00", stock: true, productCode: "TRB-9", image: IMG, featured: false,
    shortDesc: "9 Ah motosiklet / scooter aküsü.",
    description: "Turbo 9 amper motosiklet aküsü. Scooter ve küçük motosikletler için.",
  },
  {
    slug: "bosch-95-amper-agm-start-stop-aku", name: "Bosch 95 Amper AGM Start-Stop Akü", brand: "Bosch",
    category: "otomobil", technology: "agm", amper: 95, volt: 12, cca: 850,
    price: "8400.00", stock: true, productCode: "BSH-S5A", image: IMG, featured: false,
    shortDesc: "95 Ah AGM start-stop, lüks segment.",
    description: "Bosch 95 amper AGM start-stop akü. Yüksek donanımlı lüks araçlar ve büyük motorlar için.",
  },
];
