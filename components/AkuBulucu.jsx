import { useState } from "react";
import { vehicleBrands, modelsOf, recommend } from "../lib/vehicles.js";
import { usePublicConfig } from "../lib/public-config-client.js";
import { BoltIcon, CheckIcon, WhatsappIcon, PhoneIcon } from "./icons.jsx";

const techLabel = { standart: "Standart", efb: "EFB", agm: "AGM" };
const techCat = { standart: "otomobil", efb: "efb", agm: "agm" };

export function AkuBulucu() {
  const { site } = usePublicConfig();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const models = brand ? modelsOf(brand) : [];
  const rec = brand && model ? recommend(brand, model) : null;

  const waText = rec
    ? `Merhaba, ${brand} ${model} için akü almak istiyorum. (Öneri: ${rec.amper} Ah ${techLabel[rec.tech]})`
    : `Merhaba, aracıma uygun aküyü öğrenmek istiyorum.`;
  const waHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(waText)}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-dark/10 bg-white shadow-sm">
      <div className="flex items-center gap-2 bg-brand-dark px-5 py-4 text-white">
        <BoltIcon className="text-brand-gold" />
        <h3 className="text-lg font-bold">Aracına Uygun Aküyü Bul</h3>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-brand-navy/70">Araç Markası</span>
          <select
            value={brand}
            onChange={(e) => { setBrand(e.target.value); setModel(""); }}
            className="w-full rounded-lg border border-brand-dark/15 bg-white px-3 py-2.5 text-brand-dark focus:border-brand-gold focus:outline-none"
          >
            <option value="">Marka seçin</option>
            {vehicleBrands.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-brand-navy/70">Model</span>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={!brand}
            className="w-full rounded-lg border border-brand-dark/15 bg-white px-3 py-2.5 text-brand-dark focus:border-brand-gold focus:outline-none disabled:bg-brand-light disabled:text-brand-navy/40"
          >
            <option value="">{brand ? "Model seçin" : "Önce marka seçin"}</option>
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>
      </div>

      {rec && (
        <div className="border-t border-brand-dark/10 bg-brand-light p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-brand-navy/70">Önerilen akü:</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-gold px-3 py-1.5 font-bold text-brand-dark">
              <BoltIcon width={16} height={16} /> {rec.amper} Ah
            </span>
            <span className="chip">{techLabel[rec.tech]}</span>
          </div>
          <p className="mt-2 flex items-start gap-1.5 text-sm text-brand-navy/70">
            <CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-brand-gold" />
            {brand} {model} için yaygın öneri budur. Kesin uyum (gövde tipi/kutup yönü) için bizi arayın, doğrulayalım.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={`/amper/${rec.amper}`} className="btn btn-gold">{rec.amper} Amper Aküleri Gör</a>
            <a href={`/kategori/${techCat[rec.tech]}`} className="btn btn-outline">{techLabel[rec.tech]} Aküler</a>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-dark"><WhatsappIcon /> WhatsApp'tan Sor</a>
          </div>
        </div>
      )}

      {!rec && (
        <div className="border-t border-brand-dark/10 p-5 text-sm text-brand-navy/70">
          Aracınızı listede bulamadıysanız sorun değil,
          <a href={`tel:${site.phoneIntl}`} className="mx-1 inline-flex items-center gap-1 font-semibold text-brand-goldText"><PhoneIcon width={14} height={14} /> {site.phone}</a>
          arayın, aracınıza uygun aküyü hemen söyleyelim.
        </div>
      )}
    </div>
  );
}
