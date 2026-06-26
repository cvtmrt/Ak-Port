import { useState } from "react";
import { Field } from "./Field.jsx";
import { homeSections, homeDefaults } from "../../lib/panel-schema.js";

// Anasayfayı sekmeler halinde düzenler (salt frontend; kalıcı kayıt backend ile).
export function HomeEditor() {
  const [activeId, setActiveId] = useState(homeSections[0].id);
  const [data, setData] = useState(homeDefaults);

  const section = homeSections.find((s) => s.id === activeId);
  const set = (key, value) => setData((d) => ({ ...d, [key]: value }));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Anasayfa</h2>
        <a href="/" target="_blank" rel="noreferrer" className="text-sm font-medium text-amber-600 hover:underline">Anasayfayı Aç ↗</a>
      </div>

      {/* Bölüm sekmeleri */}
      <div className="mb-5 flex flex-wrap gap-2">
        {homeSections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${activeId === s.id ? "bg-amber-500 text-slate-900" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        {section.fields.map((f) => (
          <div key={f.key} className={["textarea", "html", "faq", "cards"].includes(f.type) ? "sm:col-span-2" : ""}>
            <Field field={f} value={data[f.key]} onChange={(v) => set(f.key, v)} />
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
        Not: Öne çıkan ürünler, kategoriler ve amper listesi <strong>Ürünler</strong> bölümünden gelir.
        Marka logoları ise sabittir. Yorumlar Google'dan otomatik çekilir.
      </div>
    </div>
  );
}
