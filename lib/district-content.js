// Bölge (landing) sayfaları için zengin, BENZERSIZ içerik.
// Veritabanına değil koda konur: her bölgenin slug'ına göre özel metin, hizmet
// verilen mahalleler ve bölgeye özgü SSS döner. Amaç: 600+ kelime özgün içerik
// (duplicate content cezasını önlemek) + yerel SEO sinyali (mahalle adları).
//
// Haritada olmayan bir bölge için isimden makul bir varsayılan içerik üretilir.

const DISTRICTS = {
  incek: {
    neighborhoods: ["İncek Bulvarı", "Taşpınar", "Kızılcaşar", "Dağyaka", "İncek Loft / rezidans bölgesi", "Atılım Üniversitesi çevresi"],
    sections: [
      {
        h2: "İncek'te Yerinde Akü Değişimi",
        body: "İncek, Ankara'nın hızla büyüyen prestijli yerleşim bölgelerinden biri ve burada araç sahipleri için en sık yaşanan sorunlardan biri aniden biten akü. Özellikle soğuk kış sabahlarında ya da aracın uzun süre kullanılmadığı dönemlerde akü beklenmedik şekilde boşalabiliyor. AKÜPORT olarak İncek Bulvarı, Taşpınar ve Kızılcaşar başta olmak üzere bölgenin tamamına yerinde akü değişimi hizmeti veriyoruz. Sizi yolda ya da otopark içinde bırakmadan, bulunduğunuz adrese gelir, aracınıza uygun aküyü takar ve eski akünüzü takas bedeliyle geri alırız.",
      },
      {
        h2: "İncek'te Hangi Araçlara Hizmet Veriyoruz?",
        body: "Bölgede çoğunlukla start-stop sistemli, AGM ve EFB akü kullanan modern otomobiller bulunuyor. Bu araçların aküleri standart akülerden farklıdır ve mutlaka aynı teknolojide akü ile değiştirilmelidir. Ekibimiz aracınızın markasına, modeline ve motor tipine göre doğru amper ve teknolojideki aküyü belirler. Otomobil, SUV, ticari araç, kamyonet ve motosiklet aküsünde Mutlu, Varta, Bosch ve İnci gibi üretici garantili markalarla çalışıyoruz.",
      },
    ],
    faq: [
      { q: "İncek'e ne kadar sürede gelirsiniz?", a: "Mağazamız Gölbaşı/İncek hattında olduğu için İncek'e genellikle kısa sürede ulaşırız. Yoğunluğa göre tahmini varış süresini telefonda net olarak söyleriz." },
      { q: "İncek'te start-stop araç aküsü değiştiriyor musunuz?", a: "Evet. Start-stop sistemli araçlar için AGM ve EFB aküleri stoklarımızda bulunur ve araca uygun kodlamayla yerinde takarız." },
      { q: "Eski aküyü geri alıyor musunuz?", a: "Evet, eski akünüzü takas bedeliyle alıyoruz; bu da yeni akünün maliyetini düşürür ve geri dönüşüme katkı sağlar." },
    ],
  },
  golbasi: {
    neighborhoods: ["Mogan / Gölkenarı", "Eymir çevresi", "Şentepe", "Bahçelievler", "Oyaca", "Hacılar", "Karagedik"],
    sections: [
      {
        h2: "Gölbaşı'nda En Yakın Akücünüz",
        body: "Mağazamız Gölbaşı bölgesinde bulunuyor; bu da bizi Gölbaşı ve çevresindeki araç sahipleri için en hızlı ulaşılabilen akücü yapıyor. Mogan Gölü çevresi, Şentepe, Bahçelievler ve ilçe merkezinin tamamına hem mağazadan akü satışı hem de bulunduğunuz yere gelerek yerinde akü değişimi yapıyoruz. Aküm bitti, aracım çalışmıyor dediğiniz anda tek yapmanız gereken bizi aramak; doğru aküyle yanınızda oluyoruz.",
      },
      {
        h2: "Gölbaşı'nda Akü Takviyesi ve Yol Yardım",
        body: "Her zaman akü değiştirmek gerekmez; bazen aracınız sadece takviyeye (start) ihtiyaç duyar. Aküsü zayıflamış aracınıza yerinde takviye yapıyor, ardından akünüzün gerçekten ömrünü tamamlayıp tamamlamadığını ölçüyoruz. Gerçekten bitmişse uygun aküyle değiştiriyor, sorun başka bir yerdeyse sizi gereksiz masrafa sokmadan doğru yönlendiriyoruz. Hafta içi ve hafta sonu geç saatlere kadar hizmet veriyoruz.",
      },
    ],
    faq: [
      { q: "Mağazanız Gölbaşı'nın neresinde?", a: "Mağazamız Gölbaşı bölgesindedir; tam adres ve harita bilgisini aşağıdaki konum bölümünden görebilir, dilerseniz mağazaya da gelebilirsiniz." },
      { q: "Gölbaşı'nda hafta sonu hizmet veriyor musunuz?", a: "Evet, hafta sonu dahil her gün hizmet veriyoruz. Çalışma saatlerimiz dışında acil durumlar için yine de aramanızı öneririz." },
      { q: "Mağazaya gelsem mi, siz mi gelirsiniz?", a: "İkisi de mümkün. İsterseniz mağazaya gelip akünüzü değiştirir, dilerseniz bulunduğunuz adrese yerinde montaj için geliriz." },
    ],
  },
  beytepe: {
    neighborhoods: ["Hacettepe Üniversitesi Beytepe Kampüsü", "Çiğdem Mahallesi", "Mühye", "1071 Malazgirt", "Beytepe Köyiçi"],
    sections: [
      {
        h2: "Beytepe ve Üniversite Bölgesinde Akü Hizmeti",
        body: "Beytepe, Hacettepe Üniversitesi kampüsü ve çevresindeki yerleşim alanlarıyla yoğun araç trafiğine sahip bir bölge. Öğrenci, akademisyen ve bölge sakinlerinin araçlarında en sık karşılaşılan sorun, özellikle kampüs otoparklarında uzun süre bekleyen araçların aküsünün boşalması. AKÜPORT olarak Beytepe Köyiçi, Çiğdem ve Mühye dahil tüm Beytepe hattına yerinde akü değişimi ve takviye hizmeti sunuyoruz.",
      },
      {
        h2: "Doğru Akü Seçimi Neden Önemli?",
        body: "Yanlış amper ya da yanlış teknolojide akü, hem aracınızın elektronik sistemine zarar verebilir hem de kısa sürede tekrar arıza yaratır. Ekibimiz aracınızın ihtiyacını doğru ölçer ve yalnızca uygun aküyü önerir. Tüm akülerimiz üretici garantilidir; montaj sırasında akü kutup başlarını temizler, bağlantıları kontrol eder ve aracınızı çalışır halde teslim ederiz.",
      },
    ],
    faq: [
      { q: "Beytepe kampüs otoparkına gelebiliyor musunuz?", a: "Bölgeye yerinde hizmet veriyoruz. Aracınızın bulunduğu noktayı tarif etmeniz yeterli; ulaşılabilir tüm otopark ve sitelere geliyoruz." },
      { q: "Akü mü bitti yoksa başka arıza mı, nasıl anlarım?", a: "Yerinde ölçüm yapıyoruz. Akü gerçekten bitmişse değiştiriyor, sorun şarj sistemi veya başka bir yerdeyse sizi bilgilendiriyoruz." },
      { q: "Motosiklet aküsü de değiştiriyor musunuz?", a: "Evet, otomobil ve ticari araçların yanı sıra motosiklet aküleri için de uygun ürünlerimiz mevcuttur." },
    ],
  },
  cayyolu: {
    neighborhoods: ["Konutkent", "Koru", "Alacaatlı", "Prof. Dr. Ahmet Taner Kışlalı", "Ümit Mahallesi", "Yaşamkent yakını"],
    sections: [
      {
        h2: "Çayyolu'nda Yerinde Akü Değişimi",
        body: "Çayyolu, Konutkent'ten Koru'ya, Alacaatlı'dan Kışlalı Mahallesi'ne kadar geniş bir yerleşim hattı ve burada yaşayan araç sahipleri için zaman çok değerli. Aküniz bittiğinde servise araç çektirmekle uğraşmak yerine bizi aramanız yeterli: bulunduğunuz siteye, otoparka ya da iş yerinize gelir, aracınıza uygun aküyü yerinde takarız. Ankara'nın batı hattına düzenli hizmet verdiğimiz için Çayyolu ve çevresine hızlı ulaşıyoruz.",
      },
      {
        h2: "Site ve Rezidans Otoparklarına Hizmet",
        body: "Çayyolu'ndaki kapalı site ve rezidans otoparkları, akü arızalarının sık yaşandığı yerlerdir çünkü araçlar günlerce hareketsiz kalabilir. Bu tür kapalı alanlara da yerinde montaj için geliyoruz. Eski akünüzü takas bedeliyle alıyor, montaj sonrası akü ve şarj sisteminin sağlığını kontrol ediyoruz.",
      },
    ],
    faq: [
      { q: "Çayyolu'ndaki kapalı sitelere geliyor musunuz?", a: "Evet, ulaşabildiğimiz tüm kapalı site ve rezidans otoparklarına yerinde montaj için geliyoruz." },
      { q: "Hangi akü markalarını bulundurursunuz?", a: "Mutlu, Varta, Bosch ve İnci başta olmak üzere üretici garantili markaların geniş amper aralığını stoklarımızda tutarız." },
      { q: "Fiyatı önceden öğrenebilir miyim?", a: "Aracınızın marka ve modelini söylediğinizde uygun akünün fiyatını telefonda net olarak paylaşıyoruz; sürpriz ücret olmaz." },
    ],
  },
  umitkoy: {
    neighborhoods: ["Park Caddesi", "Çayyolu sınırı", "Bağlıca yolu", "Ümitköy Meydanı", "Şehit Gaffar Okkan çevresi"],
    sections: [
      {
        h2: "Ümitköy'de Akü ve Yol Yardım",
        body: "Ümitköy, Çayyolu ile iç içe geçmiş, yoğun konut ve iş yeri trafiğine sahip bir bölge. Park Caddesi ve çevresindeki iş yerlerinde gün içinde, sitelerde ise sabah saatlerinde akü kaynaklı çalışmama sorunları sık yaşanır. AKÜPORT olarak Ümitköy'ün tamamına yerinde akü değişimi, akü takviyesi ve acil yol yardım hizmeti veriyoruz. Aracınız nerede kaldıysa oraya geliyoruz.",
      },
      {
        h2: "Akünüzün Ömrünü Nasıl Uzatırsınız?",
        body: "Akü ömrü ortalama 3-5 yıldır ama kullanım alışkanlığı bunu doğrudan etkiler. Kısa mesafeli sürüşler, aracı uzun süre çalıştırmamak ve far/teyp gibi tüketicileri motor kapalıyken kullanmak aküyü hızla yıpratır. Yerinde montaj sırasında ekibimiz akünüzün durumu hakkında sizi bilgilendirir ve ömrünü uzatmak için pratik önerilerde bulunur.",
      },
    ],
    faq: [
      { q: "Ümitköy'de iş yerime gelebilir misiniz?", a: "Evet, Park Caddesi ve çevresindeki iş yerleri dahil bölgenin tamamına yerinde hizmet veriyoruz." },
      { q: "Akü değişimi ne kadar sürer?", a: "Standart bir akü değişimi genellikle birkaç dakika içinde tamamlanır; aracınızı çalışır halde teslim ederiz." },
      { q: "Garanti veriyor musunuz?", a: "Taktığımız tüm aküler üretici garantilidir; garanti koşullarını montaj sırasında size açıklarız." },
    ],
  },
  cankaya: {
    neighborhoods: ["Çukurambar", "Balgat", "Oran", "Bahçelievler", "Birlik", "Yıldız", "Kızılay çevresi"],
    sections: [
      {
        h2: "Çankaya'da Yerinde Akü Değişimi",
        body: "Çankaya, Ankara'nın en yoğun ve en geniş ilçelerinden biri; Çukurambar ve Balgat'taki iş merkezlerinden Oran ve Yıldız'daki konut bölgelerine kadar çok farklı noktalara hizmet veriyoruz. Yoğun trafik ve sınırlı otopark koşullarında akünüz bittiğinde aracı oynatmak bile zor olabilir. Bizi aradığınızda aracınızın bulunduğu yere gelir, yerinde akü değişimini hızlıca tamamlarız.",
      },
      {
        h2: "İş Yerleri ve Plazalara Akü Hizmeti",
        body: "Çukurambar ve Balgat'taki plaza otoparklarında araçlar gün boyu hareketsiz kaldığı için akü boşalması sık görülür. Bu bölgelerdeki iş yerlerine ve kapalı otoparklara yerinde montaj için geliyoruz. Otomobil, ticari araç ve filo araçları için tüm marka ve amperlerde akü bulunduruyor, eski akünüzü takas bedeliyle alıyoruz.",
      },
    ],
    faq: [
      { q: "Çankaya'nın her yerine geliyor musunuz?", a: "Çukurambar, Balgat, Oran, Birlik ve çevresi dahil Çankaya'nın ulaşılabilir tüm noktalarına yerinde hizmet veriyoruz." },
      { q: "Filo / şirket araçları için hizmet var mı?", a: "Evet, şirket ve filo araçları için de akü tedarik ediyor ve yerinde montaj yapıyoruz; ihtiyaç halinde fatura düzenliyoruz." },
      { q: "Trafikte yolda kaldım, gelebilir misiniz?", a: "Aracınızın bulunduğu noktayı tarif etmeniz yeterli; yola çıkıp en kısa sürede yanınızda oluruz." },
    ],
  },
  ankara: {
    neighborhoods: ["Çankaya", "Gölbaşı", "İncek", "Çayyolu", "Ümitköy", "Yenimahalle", "Keçiören", "Etimesgut"],
    sections: [
      {
        h2: "Ankara Geneline Yerinde Akü Hizmeti",
        body: "AKÜPORT, merkezi Gölbaşı/İncek'te olan bir akü satış ve yerinde montaj servisidir. Ankara'nın güney ve batı hattı başta olmak üzere şehrin birçok noktasına yerinde akü değişimi hizmeti veriyoruz. Aküm bitti, aracım çalışmıyor dediğinizde aracınızı servise çektirmenize gerek kalmadan, bulunduğunuz adrese gelip doğru aküyü takıyoruz. Otomobil, ticari araç, kamyon ve motosiklet aküsünde tüm marka ve amperlerde çözüm sunuyoruz.",
      },
      {
        h2: "Neden Yerinde Akü Değişimi?",
        body: "Akü, aracın en kritik ama en çok ihmal edilen parçalarından biridir ve genellikle en olmadık anda biter. Yerinde akü değişimi, hem zaman kazandırır hem de çekici ya da servis masrafından kurtarır. Ekibimiz doğru aküyü seçer, montajı profesyonelce yapar, kutup başlarını temizler ve aracınızı çalışır halde teslim eder. Eski akünüzü de takas bedeliyle alarak yeni akünün maliyetini düşürürüz.",
      },
    ],
    faq: [
      { q: "Ankara'nın hangi bölgelerine geliyorsunuz?", a: "Başta Gölbaşı, İncek, Çankaya, Çayyolu ve Ümitköy olmak üzere Ankara'nın ulaşılabilir birçok noktasına yerinde hizmet veriyoruz. Bölgenizi telefonda netleştirebiliriz." },
      { q: "Gece veya acil durumda arayabilir miyim?", a: "Çalışma saatlerimiz geç saatlere kadar sürer; acil durumlar için öncelikle telefonla ulaşmanızı öneririz." },
      { q: "Akünün fiyatını nasıl öğrenirim?", a: "Aracınızın marka, model ve motor tipini söylemeniz yeterli; uygun akünün fiyatını ve teknolojisini telefonda net olarak paylaşırız." },
    ],
  },
};

// Slug'a göre zengin içerik döndürür; tanımlı değilse isimden makul içerik üretir.
export function getDistrictContent(slug, name = "") {
  const found = DISTRICTS[slug];
  if (found) return found;
  const d = name || "Bölgeniz";
  return {
    neighborhoods: [],
    sections: [
      {
        h2: `${d} Bölgesinde Yerinde Akü Değişimi`,
        body: `${d} ve çevresine yerinde akü değişimi, akü takviyesi ve acil yol yardım hizmeti veriyoruz. Aküm bitti, aracım çalışmıyor dediğinizde bulunduğunuz adrese gelir, aracınıza uygun aküyü takar ve eski akünüzü takas bedeliyle alırız. Otomobil, ticari araç, kamyon ve motosiklet aküsünde tüm marka ve amperlerde çözüm sunuyoruz.`,
      },
      {
        h2: "Doğru Akü, Garantili Montaj",
        body: "Ekibimiz aracınızın marka, model ve motor tipine göre doğru amper ve teknolojideki aküyü belirler. Start-stop sistemli araçlar için AGM ve EFB aküleri de stoklarımızda bulunur. Tüm akülerimiz üretici garantilidir; montaj sırasında kutup başlarını temizler ve aracınızı çalışır halde teslim ederiz.",
      },
    ],
    faq: [
      { q: `${d} bölgesine ne kadar sürede gelirsiniz?`, a: "Yoğunluğa göre tahmini varış süresini telefonda net olarak söyleriz; en kısa sürede yanınızda oluruz." },
      { q: "Eski aküyü geri alıyor musunuz?", a: "Evet, eski akünüzü takas bedeliyle alıyoruz; bu da yeni akünün maliyetini düşürür." },
      { q: "Garanti veriyor musunuz?", a: "Taktığımız tüm aküler üretici garantilidir; koşulları montaj sırasında açıklarız." },
    ],
  };
}
