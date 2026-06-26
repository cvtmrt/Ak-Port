import { useState } from "react";
import { Field } from "./Field.jsx";
import { designFields, designDefaults } from "../../lib/panel-schema.js";

// Salt frontend: renk ve hero metnini düzenle, canlı önizle. Kalıcı uygulama backend ile.
export function Design() {
  const [d, setD] = useState(designDefaults);
  const set = (key, value) => setD((p) => ({ ...p, [key]: value }));

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-slate-800">Tasarım</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5">
          {designFields.map((f) => (
            <Field key={f.key} field={f} value={d[f.key]} onChange={(v) => set(f.key, v)} />
          ))}
        </div>

        {/* Canlı önizleme */}
        <div>
          <p className="mb-2 text-sm font-medium text-slate-600">Önizleme</p>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="p-8" style={{ background: d.dark }}>
              <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${d.gold}26`, color: d.gold }}>
                ⚡ İncek · Gölbaşı · Ankara
              </span>
              <h3 className="mt-3 text-2xl font-extrabold leading-tight text-white">
                {d.heroTitle}
                <br />
                <span style={{ color: d.gold }}>{d.heroTitleAccent}</span>
              </h3>
              <p className="mt-3 text-sm text-white/80">{d.heroSubtitle}</p>
              <button className="mt-4 rounded-lg px-4 py-2 text-sm font-bold" style={{ background: d.gold, color: d.dark }}>
                Hemen Ara
              </button>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-400">Önizleme anlıktır. Sitede kalıcı uygulanması backend ile yapılır.</p>
        </div>
      </div>
    </div>
  );
}
