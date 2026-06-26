import { useData } from "vike-react/useData";
import { Breadcrumbs, SectionTitle, Faq, CtaBand } from "../../components/blocks.jsx";
import { faqItems } from "./faq-data.js";

export default function Page() {
  const { page } = useData();
  const items = page?.items || faqItems;
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "S.S.S.", url: "/sss" }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{page?.title || "Sıkça Sorulan Sorular"}</h1>
          <p className="mt-2 max-w-2xl text-white/80">Akü, akü değişimi, takviye ve yerinde hizmet hakkında en çok merak edilenler.</p>
        </div>
      </section>

      <section className="container-x py-10">
        <SectionTitle kicker="S.S.S." title="Aklınızdaki Sorular" />
        <Faq items={items} />
      </section>

      <CtaBand title="Sorunuz mu var?" text="Aklınıza takılan her şeyi telefonla sorun; akünüze uygun çözümü hemen söyleyelim." />
    </>
  );
}
