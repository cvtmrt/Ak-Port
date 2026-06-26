import { useEffect, useState } from "react";
import { Field } from "./Field.jsx";
import { designFields, designDefaults } from "../../lib/panel-schema.js";
import { apiGetSettings, apiSaveSettings } from "../../lib/admin-api.js";

export function Design() {
  const [d, setD] = useState(designDefaults);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const set = (key, value) => setD((p) => ({ ...p, [key]: value }));

  useEffect(() => {
    apiGetSettings()
      .then((res) => setD(res.design || designDefaults))
      .catch((err) => setStatus(`Varsayılan tasarım kullanılıyor: ${err.message}`));
  }, []);

  async function save() {
    setSaving(true);
    setStatus("");
    try {
      await apiSaveSettings({ design: d });
      setStatus("Tasarım ayarları kaydedildi.");
    } catch (err) {
      setStatus(`Kaydedilemedi: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Tasarım</h2>
        <button onClick={save} disabled={saving} className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-400 disabled:opacity-60">
          {saving ? "Kaydediliyor..." : "Sunucuya Kaydet"}
        </button>
      </div>
      {status && <p className="mb-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">{status}</p>}
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
          <p className="mt-2 text-xs text-slate-400">Önizleme anlıktır. Kaydedince public config üzerinden siteye uygulanır.</p>
        </div>
      </div>
    </div>
  );
}
