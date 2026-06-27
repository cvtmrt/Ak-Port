import { getSiteSettings } from "../../db/data.js";

// Acil akü SSS — hem sayfada hem +Head'deki FAQ JSON-LD'de kullanılır.
export const faq = [
  { q: "Ne kadar sürede gelirsiniz?", a: "İncek, Gölbaşı ve yakın bölgelerde en kısa sürede yanınızdayız. Yoğunluğa göre süreyi telefonda netleştiririz." },
  { q: "Gece de hizmet var mı?", a: "Acil akü hattımız 7/24 açıktır. Mesai dışı acil durumlar için arayın." },
  { q: "Kart ile ödeme olur mu?", a: "Evet, nakit ve kredi kartı ile ödeme alınır." },
  { q: "Akü mü bitti, başka arıza mı nasıl anlarsınız?", a: "Yerinde ölçüm yapıyoruz. Akü gerçekten bitmişse değiştiriyor, sorun şarj sistemi veya marşta ise sizi doğru yönlendiriyoruz." },
];

export async function data() {
  return { site: await getSiteSettings(), faq };
}
