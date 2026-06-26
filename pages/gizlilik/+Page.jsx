import { site } from "../../lib/site.js";
import { Breadcrumbs } from "../../components/blocks.jsx";

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Gizlilik & KVKK", url: "/gizlilik" }]} />

      <section className="container-x py-10">
        <h1 className="text-3xl font-extrabold text-brand-dark">Gizlilik Politikası ve KVKK Aydınlatma Metni</h1>
        <article className="article mt-6">
          <p>{site.legalName} ("{site.name}") olarak kişisel verilerinizin güvenliğine önem veriyoruz. Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında sizi bilgilendirmek amacıyla hazırlanmıştır.</p>

          <h2>1. Veri Sorumlusu</h2>
          <p>Kişisel verileriniz, veri sorumlusu sıfatıyla {site.legalName} tarafından aşağıda açıklanan kapsamda işlenebilmektedir.</p>
          <p>Adres: {site.address.street}, {site.address.district}/{site.address.city}<br />Telefon: {site.phone}<br />E-posta: {site.email}</p>

          <h2>2. Hangi Verileri Topluyoruz?</h2>
          <p>Bizimle telefon, WhatsApp veya e-posta yoluyla iletişime geçtiğinizde; ad-soyad, telefon numarası, araç ve akü bilgileri ile hizmet talebinize ilişkin paylaştığınız bilgiler işlenebilir. Web sitemiz üzerinden form veya satış işlemi yapılmamaktadır; iletişim doğrudan telefon/WhatsApp üzerinden gerçekleşir.</p>

          <h2>3. Verileri Hangi Amaçla İşliyoruz?</h2>
          <ul>
            <li>Akü satışı, montaj, takviye ve yol yardım hizmetlerinin sunulması</li>
            <li>Talep ve şikayetlerinizin değerlendirilmesi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          </ul>

          <h2>4. Verilerin Aktarımı</h2>
          <p>Kişisel verileriniz, yasal yükümlülükler haricinde üçüncü kişilerle paylaşılmaz ve ticari amaçla satılmaz.</p>

          <h2>5. Haklarınız</h2>
          <p>KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini isteme ve diğer haklarınızı kullanmak için yukarıdaki iletişim bilgilerinden bize ulaşabilirsiniz.</p>

          <h2>6. Çerezler (Cookies)</h2>
          <p>Web sitemiz, temel işlevsellik dışında kişisel veri toplayan çerezler kullanmamaktadır. Harita gibi gömülü içerikler ilgili sağlayıcının (ör. Google) çerez politikasına tabidir.</p>

          <p className="text-sm text-brand-navy/60">Bu metin bilgilendirme amaçlıdır ve işletmenin ihtiyacına göre güncellenebilir.</p>
        </article>
      </section>
    </>
  );
}
