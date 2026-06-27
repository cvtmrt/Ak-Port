import { BoltIcon } from "./icons.jsx";
import { productImage } from "../lib/images.js";

const techLabel = {
  standart: "Standart",
  efb: "EFB",
  agm: "AGM",
  "start-stop": "Start-Stop",
  jel: "Jel",
};

function formatPrice(price) {
  if (!price) return null;
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(Number(price));
}

export function ProductCard({ product: p }) {
  return (
    <a
      href={`/urun/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-brand-dark/10 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-brand-gold/40 hover:shadow-xl"
    >
      <div className="flex items-center justify-center bg-brand-light p-4">
        <img src={productImage(p)} alt={`${p.name} - ${p.amper} amper akü`} loading="lazy" decoding="async" width="240" height="200" className="h-32 w-auto object-contain transition-transform group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-goldText">{p.brand}</span>
          {p.technology !== "standart" && (
            <span className="chip text-xs">{techLabel[p.technology] || p.technology}</span>
          )}
        </div>
        <h3 className="text-base font-bold leading-snug text-brand-dark">{p.name}</h3>
        <div className="flex items-center gap-2 text-sm text-brand-navy/80">
          <BoltIcon width={16} height={16} /> {p.amper} Ah · {p.volt}V
          {p.cca ? ` · ${p.cca} CCA` : ""}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          {formatPrice(p.price) ? (
            <span className="text-lg font-extrabold text-brand-dark">{formatPrice(p.price)}</span>
          ) : (
            <span className="text-sm font-semibold text-brand-navy">Fiyat için arayın</span>
          )}
          <span className="text-sm font-semibold text-brand-goldText group-hover:underline">İncele →</span>
        </div>
      </div>
    </a>
  );
}
