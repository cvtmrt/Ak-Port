import { useEffect, useState } from "react";
import { Field } from "./Field.jsx";
import { settingsFields, addressFields } from "../../lib/panel-schema.js";
import { site } from "../../lib/site.js";
import { apiGetSettings, apiSaveSettings } from "../../lib/admin-api.js";

export function Settings() {
  const [data, setData] = useState(site);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiGetSettings()
      .then((res) => setData(res.site || site))
      .catch((err) => setStatus(`Varsayılan ayarlar kullanılıyor: ${err.message}`));
  }, []);

  function valueFor(key) {
    if (key === "instagram") return data.social?.instagram || "";
    if (key === "googleMaps") return data.social?.googleMaps || "";
    if (key === "hoursText") return data.hours?.text || "";
    return data[key];
  }

  const set = (key, value) => setData((d) => {
    if (key === "instagram") return { ...d, social: { ...(d.social || {}), instagram: value } };
    if (key === "googleMaps") return { ...d, social: { ...(d.social || {}), googleMaps: value } };
    if (key === "hoursText") return { ...d, hours: { ...(d.hours || {}), text: value } };
    return { ...d, [key]: value };
  });
  const setAddr = (key, value) => setData((d) => ({ ...d, address: { ...(d.address || {}), [key]: value } }));

  async function save() {
    setSaving(true);
    setStatus("");
    try {
      await apiSaveSettings({ site: data });
      setStatus("Site ayarları kaydedildi.");
    } catch (err) {
      setStatus(`Kaydedilemedi: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Site Ayarları (İletişim & İçerik)</h2>
        <button onClick={save} disabled={saving} className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-400 disabled:opacity-60">
          {saving ? "Kaydediliyor..." : "Sunucuya Kaydet"}
        </button>
      </div>
      {status && <p className="mb-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">{status}</p>}
      <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
        {settingsFields.map((f) => (
          <Field key={f.key} field={f} value={valueFor(f.key)} onChange={(v) => set(f.key, v)} />
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
