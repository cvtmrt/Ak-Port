import { useData } from "vike-react/useData";
import { CallButton, WhatsappButton } from "../../../components/Cta.jsx";
import { BoltIcon, CheckIcon } from "../../../components/icons.jsx";
import { Breadcrumbs, SectionTitle, ProductGrid, CtaBand } from "../../../components/blocks.jsx";
import { productImages } from "../../../lib/images.js";
import { ProductGallery } from "../../../components/ProductGallery.jsx";

const techLabel = { standart: "Standart", efb: "EFB", agm: "AGM", "start-stop": "Start-Stop", jel: "Jel" };

function formatPrice(price) {
  if (!price) return null;
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(Number(price));
}

export default function Page() {
  const { product: p, related } = useData();
  const specs = [
    ["Marka", p.brand],
    ["Amper (Ah)", `${p.amper} Ah`],
    ["Voltaj", `${p.volt}V`],
    ["Teknoloji", techLabel[p.technology] || p.technology],
    p.cca ? ["Marş Gücü (CCA)", `${p.cca} A`] : null,
    p.productCode ? ["Ürün Kodu", p.productCode] : null,
    ["Durum", p.stock ? "Stokta" : "Tükendi"],
  ].filter(Boolean);

  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Ürünler", url: "/urunler" }, { name: p.name, url: `/urun/${p.slug}` }]} />

      <section className="container-x grid gap-8 pb-12 lg:grid-cols-2">
        <ProductGallery images={productImages(p)} alt={`${p.name} ${p.amper} amper akü`} />

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold uppercase tracking-wide text-brand-goldText">{p.brand}</span>
            {p.technology !== "standart" && <span className="chip">{techLabel[p.technology]}</span>}
          </div>
          <h1 className="mt-2 text-3xl font-extrabold text-brand-dark">{p.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-brand-navy/80">
            <BoltIcon width={18} height={18} /> {p.amper} Ah · {p.volt}V{p.cca ? ` · ${p.cca} CCA` : ""}
          </div>

          <div className="mt-4">
            {formatPrice(p.price) ? (
              <div className="text-3xl font-extrabold text-brand-dark">{formatPrice(p.price)}</div>
            ) : (
              <div className="text-xl font-bold text-brand-navy">Fiyat için arayın</div>
            )}
            <p className="mt-1 text-sm text-brand-navy/70">İncek & Gölbaşı'na ücretsiz yerinde montaj dahil.</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <CallButton label="Sipariş / Bilgi" />
            <WhatsappButton text={`Merhaba, ${p.name} (${p.amper} Ah) hakkında bilgi almak istiyorum.`} />
          </div>

          <ul className="mt-5 space-y-2 text-sm text-brand-navy/80">
            {["Ücretsiz yerinde montaj (İncek & Gölbaşı)", "Eski akü takas", "Üretici garantili orijinal ürün", "7/24 acil akü desteği"].map((t) => (
              <li key={t} className="flex items-center gap-2"><CheckIcon width={16} height={16} className="text-brand-gold" /> {t}</li>
            ))}
          </ul>

          {/* Teknik özellikler */}
          <div className="mt-6 overflow-hidden rounded-xl border border-brand-dark/10">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-brand-dark/10">
                {specs.map(([k, v]) => (
                  <tr key={k} className="even:bg-brand-light">
                    <th className="px-4 py-2.5 text-left font-medium text-brand-navy/70">{k}</th>
                    <td className="px-4 py-2.5 font-semibold text-brand-dark">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {p.description && (
        <section className="container-x pb-12">
          <SectionTitle title="Ürün Açıklaması" />
          <p className="max-w-3xl leading-relaxed text-brand-navy/80">{p.description}</p>
        </section>
      )}

      {related?.length > 0 && (
        <section className="bg-white py-12">
          <div className="container-x">
            <SectionTitle kicker="Benzer Ürünler" title="Bunlar da İlginizi Çekebilir" />
            <ProductGrid products={related} />
          </div>
        </section>
      )}

      <CtaBand title={`${p.name} hemen lazım mı?`} text="Arayın, stok durumunu söyleyelim ve yerinde montajla takalım." />
    </>
  );
}
