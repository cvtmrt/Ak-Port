import { useData } from "vike-react/useData";
import { ReviewsSection } from "../../components/Reviews.jsx";
import { Breadcrumbs, CtaBand } from "../../components/blocks.jsx";

export default function Page() {
  const { reviews, ratingSummary } = useData();
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Yorumlar", url: "/yorumlar" }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Müşteri Yorumları</h1>
          <p className="mt-2 max-w-2xl text-white/80">Müşterilerimizin AKÜPORT hakkındaki gerçek değerlendirmeleri.</p>
        </div>
      </section>

      <section className="container-x py-10">
        <ReviewsSection reviews={reviews} summary={ratingSummary} />
      </section>

      <CtaBand />
    </>
  );
}
