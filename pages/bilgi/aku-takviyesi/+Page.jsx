import { useData } from "vike-react/useData";
import { Breadcrumbs, CtaBand } from "../../../components/blocks.jsx";
import { CallButton, WhatsappButton } from "../../../components/Cta.jsx";

export default function Page() {
  const { page } = useData();
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Bilgi", url: "/bilgi/aku-takviyesi" }, { name: "Akü Takviyesi", url: "/bilgi/aku-takviyesi" }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{page?.title || "Akü Takviyesi Nasıl Yapılır?"}</h1>
          <p className="mt-2 max-w-2xl text-white/80">Ankara'da yerinde akü takviyesi. Aküm bitti, aracım çalışmıyor diyorsanız bulunduğunuz yere geliyoruz.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <CallButton />
            <WhatsappButton text="Akü takviyesi lazım, konumum Ankara'da." />
          </div>
        </div>
      </section>

      <section className="container-x py-10">
        {page?.content ? (
          <article className="article" dangerouslySetInnerHTML={{ __html: page.content }} />
        ) : (
        <article className="article">
          <p>Akü takviyesi (jump start), boşalmış bir akünün başka bir araç ya da takviye cihazı yardımıyla geçici olarak çalıştırılmasıdır. Aracınız aniden çalışmadıysa, takviye çoğu zaman sizi yola çıkarır. Ancak akü ömrünü tamamladıysa takviye kalıcı çözüm olmaz; akünün değişmesi gerekir.</p>

          <h2>Adım Adım Aküden Aküye Takviye</h2>
          <ol>
            <li>Her iki araç da kontaktan kapalı olmalı; araçlar birbirine değmemeli.</li>
            <li>Kırmızı (+) kabloyu boş akünün <strong>artı (+)</strong> kutbuna, diğer ucunu dolu akünün <strong>artı (+)</strong> kutbuna bağlayın.</li>
            <li>Siyah (−) kabloyu dolu akünün <strong>eksi (−)</strong> kutbuna bağlayın; diğer ucunu boş aküye değil, aracın boyasız bir metal şasi noktasına tutturun.</li>
            <li>Dolu akülü aracı çalıştırın, birkaç dakika bekleyin.</li>
            <li>Boş akülü aracı çalıştırın. Çalıştıktan sonra kabloları bağladığınızın <strong>tersi sırayla</strong> çıkarın.</li>
          </ol>

          <h2>Dikkat Edilmesi Gerekenler</h2>
          <ul>
            <li>Sadece aynı voltajdaki (12V) aküler takviye için kullanılmalıdır.</li>
            <li>Kablo uçları birbirine değmemeli; kıvılcımdan kaçının.</li>
            <li>Hasarlı, şişmiş veya donmuş aküye takviye yapılmamalıdır.</li>
            <li>Takviye sonrası araç çalıştıysa bir süre durmadan sürün ki alternatör aküyü şarj etsin.</li>
          </ul>

          <h2>Takviye Yetmiyorsa: Yerinde Akü Değişimi</h2>
          <p>Aracınız takviyeyle çalışıp az sonra yine susuyorsa, büyük ihtimalle akünüz bitmiştir. Bu durumda doğru çözüm akü değişimidir. Biz <strong>Ankara'nın her yerine</strong> geliyor, yerinde akü değişimi yapıyoruz.</p>

          <h2>Ankara'da Yerinde Akü Takviyesi ve Değişimi</h2>
          <p>İncek, Gölbaşı, Beytepe, Çayyolu ve Ümitköy başta olmak üzere Ankara'nın tüm bölgelerine 7/24 acil akü ve takviye hizmeti veriyoruz. Yolda kalmayın; konumunuzu söyleyin, en kısa sürede yanınızdayız.</p>
        </article>
        )}
      </section>

      <CtaBand title="Aküm bitti, takviye lazım!" text="Ankara içi yerinde akü takviyesi ve değişimi. Hemen arayın, gelelim." />
    </>
  );
}
