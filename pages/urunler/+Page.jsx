import { useData } from "vike-react/useData";
import { Breadcrumbs, SectionTitle, CategoryGrid, ProductGrid, AmperLinks, CtaBand } from "../../components/blocks.jsx";

export default function Page() {
  const { products, categories, amper } = useData();
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Ürünler", url: "/urunler" }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Tüm Aküler</h1>
          <p className="mt-2 max-w-2xl text-white/80">Otomobil, ticari araç, kamyon ve motosiklet aküleri. Marka, amper ve teknolojiye göre seçin.</p>
        </div>
      </section>

      <section className="container-x py-10">
        <SectionTitle title="Kategoriler" />
        <CategoryGrid categories={categories} />
      </section>

      <section className="container-x py-6">
        <SectionTitle title="Ampere Göre" />
        <AmperLinks values={amper} />
      </section>

      <section className="bg-white py-10">
        <div className="container-x">
          <SectionTitle title={`Tüm Ürünler (${products.length})`} />
          <ProductGrid products={products} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
