import { Breadcrumbs, CtaBand } from "../../../components/blocks.jsx";

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Bilgi", url: "/bilgi/aku-nedir" }, { name: "Akü Nedir?", url: "/bilgi/aku-nedir" }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Akü Nedir? Nasıl Çalışır?</h1>
          <p className="mt-2 max-w-2xl text-white/80">Aracınızın kalbi olan akünün ne işe yaradığını, çeşitlerini ve doğru akü seçimini sade bir dille anlattık.</p>
        </div>
      </section>

      <section className="container-x py-10">
        <article className="article">
          <p>Akü, aracınızın marş motorunu çalıştıran ve motor çalışmadığı sürece elektronik sistemlere enerji sağlayan, şarj edilebilir bir enerji deposudur. Kimyasal enerjiyi elektrik enerjisine çevirerek aracı çalıştırır; motor çalışırken ise alternatör tarafından yeniden şarj edilir.</p>

          <h2>Akü Nasıl Çalışır?</h2>
          <p>Bir akünün içinde kurşun plakalar ve elektrolit (asit + su karışımı) bulunur. Kontağı çevirdiğinizde akü, depoladığı elektriği marş motoruna vererek motoru döndürür. Araç çalıştıktan sonra alternatör devreye girer ve akünüzü tekrar doldurur. Yani akü, motoru ilk çalıştıran kıvılcımı sağlar.</p>

          <h2>Akü Çeşitleri</h2>
          <ul>
            <li><strong>Standart (kurşun-asit) akü:</strong> Start-stop sistemi olmayan klasik araçlar için uygun, en yaygın tip.</li>
            <li><strong>EFB akü:</strong> Start-stop sistemli giriş seviyesi araçlar için. Standart aküye göre daha dayanıklıdır.</li>
            <li><strong>AGM akü:</strong> Yüksek elektrik tüketimli ve start-stop'lu premium araçlar için en üst segment; titreşim ve derin deşarja dayanıklıdır.</li>
            <li><strong>Jel akü:</strong> Motosiklet ve bazı özel uygulamalarda kullanılan, bakımsız tip.</li>
          </ul>

          <h2>Amper (Ah) ve CCA Ne Demek?</h2>
          <p><strong>Amper saat (Ah)</strong> akünün kapasitesidir; ne kadar yüksekse akü o kadar uzun süre enerji verir. <strong>CCA (soğukta marş gücü)</strong> ise akünün soğukta motoru döndürme gücüdür. Aracınız fabrikadan belli bir Ah ve CCA değeriyle çıkar; genelde aynı veya bir üst değeri takmak doğrudur.</p>

          <h2>Akünün Ömrü Ne Kadar?</h2>
          <p>Ortalama akü ömrü <strong>3-5 yıldır</strong>. Marşın yavaşlaması, far ışıklarının zayıflaması veya aracın sabahları zor çalışması akünün yorulduğunu gösterir. Bu belirtilerde akünüzü ücretsiz test edip durumunu söyleyebiliriz.</p>

          <h2>Doğru Aküyü Nasıl Seçerim?</h2>
          <p>En kolayı: aracınızın marka ve modelini bize söyleyin, uygun amper ve teknolojiyi önerelim. Dilerseniz <a href="/aku-bulucu">Akü Bulucu</a> aracımızı kullanarak saniyeler içinde öneri alabilir, ardından <a href="/urunler">ürünlerimizi</a> inceleyebilirsiniz.</p>
        </article>
      </section>

      <CtaBand />
    </>
  );
}
