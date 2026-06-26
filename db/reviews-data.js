// ÖRNEK yorum verisi (tasarım/geliştirme için). Backend bağlanınca bu dosya
// devre dışı kalır; veriler `reviews` tablosundan gelir. Alan adları Google
// Places review objesiyle uyumludur (author, rating, text, time, avatar, source).
// Gerçek yayında bu örnek yorumları KULLANMAYIN; panelden/Places'ten doldurun.
export const reviews = [
  { author: "Murat A.", rating: 5, text: "Aküm yolda bitti, aradım yarım saatte geldiler. Yerinde değişim yaptılar, çok teşekkürler.", time: "1 hafta önce", source: "google" },
  { author: "Elif K.", rating: 5, text: "İncek'te oturuyorum, eve gelip aküyü değiştirdiler. Fiyat da gayet uygundu, eski aküyü de aldılar.", time: "2 hafta önce", source: "google" },
  { author: "Serkan D.", rating: 5, text: "Start-stop araç için doğru aküyü önerdiler, başka yerde yanlış akü takılmıştı. İşini bilen insanlar.", time: "3 hafta önce", source: "google" },
  { author: "Ayşe T.", rating: 4, text: "Hızlı ve ilgili. Gölbaşı'na geldiler, montaj dahil sorunsuz hallettiler.", time: "1 ay önce", source: "google" },
  { author: "Kemal Y.", rating: 5, text: "Gece aküm bitti, 7/24 hat gerçekten çalışıyor. Kurtardılar resmen.", time: "1 ay önce", source: "google" },
  { author: "Hakan B.", rating: 5, text: "Kamyonum için 180 amper akü lazımdı, stoktan hemen verdiler. Profesyonel ekip.", time: "2 ay önce", source: "google" },
];
