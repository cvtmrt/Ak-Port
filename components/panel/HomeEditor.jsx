import { useEffect, useState } from "react";
import { Field } from "./Field.jsx";
import { homeSections, homeDefaults } from "../../lib/panel-schema.js";
import { apiGetSettings, apiSaveSettings } from "../../lib/admin-api.js";

export function HomeEditor() {
  const [activeId, setActiveId] = useState(homeSections[0].id);
  const [data, setData] = useState(homeDefaults);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const section = homeSections.find((s) => s.id === activeId);
  const set = (key, value) => setData((d) => ({ ...d, [key]: value }));

  useEffect(() => {
    apiGetSettings()
      .then((res) => setData(res.home || homeDefaults))
      .catch((err) => setStatus(`Varsayılan anasayfa içeriği kullanılıyor: ${err.message}`));
  }, []);

  async function save() {
    setSaving(true);
    setStatus("");
    try {
      await apiSaveSettings({ home: data });
      setStatus("Anasayfa kaydedildi.");
    } catch (err) {
      setStatus(`Kaydedilemedi: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Anasayfa</h2>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noreferrer" className="text-sm font-medium text-amber-600 hover:underline">Anasayfayı Aç ↗</a>
          <button onClick={save} disabled={saving} className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-400 disabled:opacity-60">
            {saving ? "Kaydediliyor..." : "Sunucuya Kaydet"}
          </button>
        </div>
      </div>
      {status && <p className="mb-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">{status}</p>}

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
          <div key={f.key} className={["textarea", "html", "faq", "cards", "slides"].includes(f.type) ? "sm:col-span-2" : ""}>
            <Field field={f} value={data[f.key]} onChange={(v) => set(f.key, v)} />
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
        Not: Marka logoları <strong>Markalar</strong>, yorumlar <strong>Yorumlar</strong> ekranından yönetilir.
      </div>
    </div>
  );
}
