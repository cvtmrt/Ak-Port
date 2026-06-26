import { useData } from "vike-react/useData";
import { Breadcrumbs, SectionTitle, ProductGrid, AmperLinks, CtaBand } from "../../../components/blocks.jsx";

export default function Page() {
  const { category: c, products, amper } = useData();
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Ürünler", url: "/urunler" }, { name: c.name, url: `/kategori/${c.slug}` }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{c.name}</h1>
          <p className="mt-2 max-w-2xl text-white/80">{c.intro}</p>
        </div>
      </section>

      <section className="container-x py-10">
        <SectionTitle title={`${c.name} Modelleri`} desc="Tüm marka ve amperlerde, ücretsiz yerinde montaj ile." />
        <ProductGrid products={products} />
      </section>

      <section className="bg-white py-10">
        <div className="container-x">
          <SectionTitle kicker="Ampere Göre" title="Amper Değerine Göre Akü" />
          <AmperLinks values={amper} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
