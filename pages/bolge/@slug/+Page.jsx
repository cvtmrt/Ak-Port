import { useData } from "vike-react/useData";
import { site } from "../../../lib/site.js";
import { CallButton, WhatsappButton } from "../../../components/Cta.jsx";
import { CheckIcon } from "../../../components/icons.jsx";
import { Breadcrumbs, SectionTitle, CategoryGrid, ProductGrid, CtaBand } from "../../../components/blocks.jsx";

export default function Page() {
  const { district: d, featured, categories } = useData();
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: `${d.name} Akü`, url: `/bolge/${d.slug}` }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-12">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{d.name} Akü &amp; Yerinde Akü Değişimi</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80">{d.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CallButton />
            <WhatsappButton text={`Merhaba, ${d.name} bölgesinde akü değişimi için yardım istiyorum.`} />
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
            {["Yerinde akü değişimi", "Ücretsiz montaj", "7/24 acil akü", "Eski akü takas"].map((t) => (
              <li key={t} className="flex items-center gap-1.5"><CheckIcon width={16} height={16} className="text-brand-gold" /> {t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-10">
        <SectionTitle title={`${d.name}'da Hangi Aküleri Buluruz?`} desc="Otomobil, ticari araç, kamyon ve motosiklet aküsünde tüm marka ve amperler." />
        <CategoryGrid categories={categories} />
      </section>

      <section className="bg-white py-10">
        <div className="container-x">
          <SectionTitle kicker="Popüler" title={`${d.name} İçin Önerilen Aküler`} />
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className="container-x py-10">
        <div className="rounded-2xl border border-brand-dark/10 bg-white p-6">
          <h2 className="text-xl font-bold text-brand-dark">{d.name} Akücü · AKÜPORT</h2>
          <p className="mt-2 text-brand-navy/80">
            {site.legalName} olarak {d.name} ve çevresine hızlı akü hizmeti veriyoruz. Aküm bitti, aracım çalışmıyor diyorsanız
            bulunduğunuz yere gelir, doğru aküyü takıp eski akünüzü alırız. Mağazamız: {site.address.street}, {site.address.district}/{site.address.city}.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <CallButton />
            <a href={site.social.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Haritada Gör</a>
          </div>
        </div>
      </section>

      <CtaBand title={`${d.name}'da aküm bitti!`} text="Hemen arayın, en kısa sürede yanınızdayız." />
    </>
  );
}
