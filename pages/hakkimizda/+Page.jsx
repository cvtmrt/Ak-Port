import { site, brandNames } from "../../lib/site.js";
import { CheckIcon } from "../../components/icons.jsx";
import { Breadcrumbs, SectionTitle, CtaBand } from "../../components/blocks.jsx";

const values = [
  "İncek & Gölbaşı'na ücretsiz yerinde akü değişimi",
  "7/24 acil akü ve yol yardım",
  "Orijinal, üretici garantili aküler",
  "Tüm marka ve amperlerde geniş stok",
  "Eski akü takas avantajı",
  "Doğru akü seçiminde uzman desteği",
];

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Hakkımızda", url: "/hakkimizda" }]} />

      <section className="container-x py-10">
        <SectionTitle kicker="Hakkımızda" title={site.legalName} />
        <div className="max-w-3xl space-y-4 text-brand-navy/80">
          <p>
            {site.name}, Ankara İncek ve Gölbaşı bölgesinde akü satışı, yerinde montaj ve acil akü hizmeti sunan bir akü marketidir.
            Otomobil, ticari araç, kamyon ve motosiklet aküsünde tüm marka ve amperleri stoğumuzda bulundururuz.
          </p>
          <p>
            Amacımız; aracınız yolda kaldığında en hızlı şekilde yanınızda olmak ve doğru aküyü doğru fiyata, garantili biçimde sunmaktır.
            "Aküm bitti" dediğiniz anda bulunduğunuz yere gelir, yeni aküyü takıp eski akünüzü takas ederiz.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v} className="flex items-center gap-2 rounded-lg border border-brand-dark/10 bg-white px-4 py-3">
              <CheckIcon width={18} height={18} className="text-brand-gold" /> <span className="text-brand-dark">{v}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-lg font-bold text-brand-dark">Çalıştığımız Markalar</h2>
          <div className="flex flex-wrap gap-2">
            {brandNames.map((b) => (
              <span key={b} className="chip">{b}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
