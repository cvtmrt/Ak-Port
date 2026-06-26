import { useState } from "react";
import { Field } from "./Field.jsx";
import { settingsFields, addressFields } from "../../lib/panel-schema.js";
import { site } from "../../lib/site.js";

// Salt frontend: bellek içinde düzenlenir, kalıcı kayıt backend'e bağlanınca.
export function Settings() {
  const [data, setData] = useState(site);

  const set = (key, value) => setData((d) => ({ ...d, [key]: value }));
  const setAddr = (key, value) => setData((d) => ({ ...d, address: { ...(d.address || {}), [key]: value } }));

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-slate-800">Site Ayarları (İletişim & İçerik)</h2>
      <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        {settingsFields.map((f) => (
          <Field key={f.key} field={f} value={data[f.key]} onChange={(v) => set(f.key, v)} />
        ))}
      </div>

      <h3 className="mb-3 mt-6 text-base font-bold text-slate-800">Adres</h3>
      <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        {addressFields.map((f) => (
          <Field key={f.key} field={f} value={data.address?.[f.key]} onChange={(v) => setAddr(f.key, v)} />
        ))}
      </div>
    </div>
  );
}
