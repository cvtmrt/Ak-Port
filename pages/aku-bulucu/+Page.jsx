import { AkuBulucu } from "../../components/AkuBulucu.jsx";
import { Breadcrumbs, SectionTitle, Faq, CtaBand } from "../../components/blocks.jsx";

const faq = [
  { q: "Amper (Ah) ne demek?", a: "Akünün kapasitesidir. Aracınız fabrikadan belli bir amper ile çıkar; genelde aynı veya bir üst amperi takmak güvenlidir. Yanlış amper marş ve elektronik sorunlarına yol açabilir." },
  { q: "EFB ve AGM farkı nedir?", a: "İkisi de start-stop sistemli araçlar içindir. EFB giriş seviyesi, AGM ise daha yüksek elektrik tüketimli ve premium araçlar için daha dayanıklı teknolojidir." },
  { q: "Aracıma standart akü takabilir miyim?", a: "Aracınız start-stop'suzsa standart akü uygundur. Start-stop varsa mutlaka EFB veya AGM kullanılmalıdır." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Akü Bulucu", url: "/aku-bulucu" }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Akü Bulucu</h1>
          <p className="mt-2 max-w-2xl text-white/80">
            Aracınızın marka ve modelini seçin, size uygun akü amperini ve teknolojisini saniyeler içinde önerelim.
          </p>
        </div>
      </section>

      <section className="container-x py-10">
        <AkuBulucu />
      </section>

      <section className="bg-white py-10">
        <div className="container-x">
          <SectionTitle kicker="Bilgi" title="Akü Seçerken Bilmeniz Gerekenler" />
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand title="Aracınıza uygun aküyü birlikte bulalım" text="Emin değil misiniz? Arayın, plakanıza göre doğru aküyü söyleyelim ve yerinde takalım." />
    </>
  );
}
