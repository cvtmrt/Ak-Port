import { useData } from "vike-react/useData";
import { Breadcrumbs, SectionTitle, ProductGrid, AmperLinks, CtaBand } from "../../../components/blocks.jsx";

export default function Page() {
  const { amper, products, allAmper } = useData();
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Ürünler", url: "/urunler" }, { name: `${amper} Amper`, url: `/amper/${amper}` }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{amper} Amper Akü</h1>
          <p className="mt-2 max-w-2xl text-white/80">
            {amper} Ah araç aküleri. Aracınıza uygun marka ve teknolojiyi (standart, EFB, AGM) seçin; İncek & Gölbaşı'na ücretsiz yerinde montaj yapalım.
          </p>
        </div>
      </section>

      <section className="container-x py-10">
        <SectionTitle title={`${amper} Amper Akü Modelleri`} />
        <ProductGrid products={products} />
      </section>

      <section className="bg-white py-10">
        <div className="container-x">
          <SectionTitle kicker="Diğer Amperler" title="Başka Amper mi Lazım?" />
          <AmperLinks values={allAmper} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
