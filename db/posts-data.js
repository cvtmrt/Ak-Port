// ÖRNEK blog yazıları (tasarım/geliştirme için). Backend bağlanınca bu dosya
// devre dışı kalır; yazılar `posts` tablosundan gelir. content alanı HTML'dir.
export const posts = [
  {
    slug: "aku-ne-zaman-degisir",
    title: "Akü Ne Zaman Değişir? Akünün Bittiğini Gösteren 5 Belirti",
    excerpt:
      "Aracınızın aküsü ömrünü tamamladı mı? Marş yavaşlaması, far zayıflığı ve daha fazlası. İşte aküyü değiştirme zamanını gösteren işaretler.",
    cover: "/images/blog/bakim.svg",
    author: "AKÜPORT",
    tags: ["bakım", "akü ömrü"],
    publishedAt: "2026-06-12",
    content: `
      <p>Akü, aracınızın en sessiz ama en kritik parçalarından biridir. Çoğu sürücü, akü tamamen bitene kadar durumunun farkına varmaz. Oysa akünüz size haftalar öncesinden sinyaller verir. İşte aküyü değiştirme zamanının geldiğini gösteren 5 belirti.</p>
      <h2>1. Marş Yavaşlıyor</h2>
      <p>Kontağı çevirdiğinizde motor eskisi kadar hızlı dönmüyorsa, akü gücü düşüyor demektir. Özellikle sabahları belirginleşen bu durum en yaygın ilk belirtidir.</p>
      <h2>2. Far ve İç Aydınlatma Zayıf</h2>
      <p>Araç çalışmadan farları açtığınızda ışıklar soluk yanıyorsa, akü yeterli voltajı sağlayamıyor olabilir.</p>
      <h2>3. Araç Sabahları Zor Çalışıyor</h2>
      <p>Soğuk havalarda zorlanmak normaldir; ancak her sabah tekrarlıyorsa akünüz ömrünü tamamlamaya yakın demektir.</p>
      <h2>4. Akü 3-5 Yaşını Geçti</h2>
      <p>Ortalama akü ömrü 3-5 yıldır. Bu süreyi geçtiyse, henüz sorun yaşamasanız bile yedeğinizi planlamakta fayda var.</p>
      <h2>5. Akü Uyarı Lambası Yanıyor</h2>
      <p>Gösterge panelindeki akü/şarj ikazı, şarj sisteminde bir sorun olduğunu gösterir. Vakit kaybetmeden kontrol ettirin.</p>
      <p><strong>AKÜPORT</strong> olarak akünüzü <strong>ücretsiz test ediyor</strong>, gerekirse İncek, Gölbaşı ve Ankara'nın her yerinde <strong>yerinde akü değişimi</strong> yapıyoruz.</p>
    `,
  },
  {
    slug: "kisin-aku-bakimi",
    title: "Kışın Akü Bakımı: Soğukta Aküyü Korumanın Yolları",
    excerpt:
      "Soğuk hava aküleri en çok zorlayan etkendir. Kışın akünüzü korumak ve yolda kalmamak için pratik öneriler.",
    cover: "/images/blog/kis.svg",
    author: "AKÜPORT",
    tags: ["bakım", "kış"],
    publishedAt: "2026-06-05",
    content: `
      <p>Soğuk havalarda akünün kimyasal performansı düşer ve motoru çevirmek için daha fazla güç gerekir. Bu yüzden aküler en çok kışın pes eder. Birkaç basit önlemle bunu önleyebilirsiniz.</p>
      <h2>Kutup Başlarını Temiz Tutun</h2>
      <p>Oksitlenmiş (beyaz/yeşil tortulu) kutup başları akımı zayıflatır. Temiz ve sıkı bağlantı, soğukta marş gücünü artırır.</p>
      <h2>Kısa Mesafe Sürüşlerden Kaçının</h2>
      <p>Çok kısa sürüşlerde alternatör aküyü tam dolduramaz. Mümkünse aracı düzenli ve yeterli süre çalıştırın.</p>
      <h2>Akünün Yaşını ve Voltajını Kontrol Ettirin</h2>
      <p>Kış girmeden akünüzü test ettirin. Zayıf bir akü, ilk soğukta sizi yolda bırakabilir.</p>
      <h2>Doğru CCA Değerine Sahip Akü Kullanın</h2>
      <p>CCA (soğukta marş gücü) ne kadar yüksekse, akü soğukta o kadar iyi performans gösterir. Aracınıza uygun değeri biz önerebiliriz.</p>
      <p>Kışa hazırlık için akünüzü <strong>AKÜPORT</strong>'ta ücretsiz test ettirin; gerekirse yerinde değiştirelim.</p>
    `,
  },
  {
    slug: "start-stop-agm-efb-secimi",
    title: "Start-Stop Araçlarda AGM ve EFB Akü Seçimi",
    excerpt:
      "Start-stop sistemli aracınıza hangi akü? AGM ve EFB arasındaki farklar, hangisinin size uygun olduğu.",
    cover: "/images/blog/teknoloji.svg",
    author: "AKÜPORT",
    tags: ["teknoloji", "start-stop"],
    publishedAt: "2026-05-28",
    content: `
      <p>Start-stop sistemli araçlar, motorun sık sık durup çalışması nedeniyle aküyü çok daha fazla zorlar. Bu araçlara <strong>standart akü takılmaz</strong>; EFB veya AGM gerekir.</p>
      <h2>EFB Akü Nedir?</h2>
      <p>EFB (Enhanced Flooded Battery), standart aküye göre daha dayanıklı, start-stop giriş seviyesi araçlar için uygun ve ekonomik bir çözümdür.</p>
      <h2>AGM Akü Nedir?</h2>
      <p>AGM (Absorbent Glass Mat), yüksek elektrik tüketimli ve donanımlı araçlar için en üst segment teknolojidir. Derin deşarja ve titreşime daha dayanıklıdır.</p>
      <h2>Hangisini Seçmeliyim?</h2>
      <p>Aracınız fabrikadan AGM ile çıkıyorsa AGM, EFB ile çıkıyorsa EFB (veya üstü olan AGM) kullanılmalıdır. Daha düşük teknolojiye geçmek performans ve ömür kaybına yol açar.</p>
      <p>Emin değilseniz aracınızın marka-modelini söyleyin; <a href="/aku-bulucu">Akü Bulucu</a> ile doğru aküyü saniyeler içinde önerelim.</p>
    `,
  },
  {
    slug: "akum-neden-cabuk-bitiyor",
    title: "Aküm Neden Çabuk Bitiyor? Nedenleri ve Çözümleri",
    excerpt:
      "Yeni akü taktırdınız ama yine de çabuk mu bitiyor? Aküyü erken tüketen yaygın nedenler ve çözüm önerileri.",
    cover: "/images/blog/ariza.svg",
    author: "AKÜPORT",
    tags: ["arıza", "bakım"],
    publishedAt: "2026-05-20",
    content: `
      <p>Akünüz beklenenden çabuk bitiyorsa sorun her zaman aküde olmayabilir. İşte en sık karşılaşılan nedenler.</p>
      <h2>Kapalıyken Elektrik Çeken Cihazlar</h2>
      <p>Yanlış bağlanmış teyp, alarm veya aksesuarlar araç kapalıyken bile akü tüketebilir (parazit akım).</p>
      <h2>Arızalı Alternatör</h2>
      <p>Alternatör aküyü yeterince şarj etmiyorsa akü sürekli yarı boş çalışır ve ömrü kısalır.</p>
      <h2>Uzun Süre Kullanılmama</h2>
      <p>Araç günlerce çalışmazsa akü kendiliğinden boşalır. Haftada bir aracı çalıştırmak faydalıdır.</p>
      <h2>Yanlış Amper veya Teknoloji</h2>
      <p>Aracına uygun olmayan amper ya da start-stop aracına standart akü takılması erken tükenmeye yol açar.</p>
      <p><strong>AKÜPORT</strong> olarak hem akünüzü hem şarj sisteminizi kontrol eder, sorunun kaynağını birlikte buluruz.</p>
    `,
  },
];
