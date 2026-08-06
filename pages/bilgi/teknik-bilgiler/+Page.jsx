import { useData } from "vike-react/useData";
import { Breadcrumbs, CtaBand } from "../../../components/blocks.jsx";

export default function Page() {
  const { page } = useData();
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Bilgi", url: "/bilgi/teknik-bilgiler" }, { name: "Teknik Bilgiler", url: "/bilgi/teknik-bilgiler" }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{page?.title || "Akü Teknik Bilgileri"}</h1>
          <p className="mt-2 max-w-2xl text-white/80">Voltaj, amper, CCA, AGM/EFB farkı, şarj ve güvenlik. Akü hakkında bilmeniz gereken teknik detaylar.</p>
        </div>
      </section>

      <section className="container-x py-10">
        {page?.content ? (
          <article className="article" dangerouslySetInnerHTML={{ __html: page.content }} />
        ) : (
        <article className="article">
          <h2>Sağlıklı Akü Voltajı Kaç Olmalı?</h2>
          <p>Dinlenme halindeki (araç kapalı) dolu bir akü <strong>12.6V – 12.8V</strong> arası göstermelidir. 12.4V altı akünün boşalmaya başladığını, 12.0V altı ise ciddi şekilde deşarj olduğunu gösterir. Araç çalışırken alternatör genelde <strong>13.8V – 14.5V</strong> üretir; bu aralık akünün şarj olduğu anlamına gelir.</p>

          <h2>Amper (Ah) Kapasitesi</h2>
          <p>Ah değeri akünün enerji kapasitesidir. Aracınızın istediğinden düşük amper takmak akünün çabuk bitmesine, çok yüksek amper ise gereksiz maliyete yol açar. Doğrusu, üreticinin önerdiği değeri veya bir üstünü kullanmaktır.</p>

          <h2>CCA (Soğukta Marş Gücü)</h2>
          <p>CCA, akünün soğuk havada motoru döndürebilme gücüdür. Özellikle kışın yüksek CCA değeri önemlidir. Dizel ve büyük motorlu araçlar daha yüksek CCA ister.</p>

          <h2>Standart, EFB ve AGM Farkı</h2>
          <ul>
            <li><strong>Standart:</strong> Start-stop'suz klasik araçlar için.</li>
            <li><strong>EFB:</strong> Start-stop giriş seviyesi araçlar için, standarttan dayanıklı.</li>
            <li><strong>AGM:</strong> Start-stop'lu, yüksek donanımlı ve premium araçlar için en dayanıklı teknoloji.</li>
          </ul>
          <p>Önemli: Start-stop sistemli bir araca standart akü takılmamalıdır.</p>

          <h2>Akü Şarjı Nasıl Yapılır?</h2>
          <p>Aküyü redresörle (akü şarj cihazı) şarj ederken, genel kural şarj akımının akü kapasitesinin yaklaşık <strong>1/10'u</strong> kadar olmasıdır. Örneğin 60 Ah bir akü, yaklaşık 6 Amper akımla şarj edilir. Şarj sırasında ortam havalandırılmalı, kıvılcım ve ateşten uzak durulmalıdır.</p>

          <h2>Güvenlik ve Bakım</h2>
          <ul>
            <li>Akü asidi tahriş edicidir; göz ve cilt teması olmamalıdır.</li>
            <li>Bağlantı sökerken önce eksi (−), takarken önce artı (+) kutup.</li>
            <li>Kutup başları temiz ve sıkı olmalı; oksitlenme performansı düşürür.</li>
            <li>Atık aküyü çöpe atmayın; bizden alın, geri dönüşüme yönlendirelim.</li>
          </ul>
          <p>Emin olmadığınız hiçbir işlemi zorlamayın. <a href="/iletisim">Bize ulaşın</a>, akünüzü test edip doğru yönlendirelim.</p>
        </article>
        )}
      </section>

      <CtaBand />
    </>
  );
}
