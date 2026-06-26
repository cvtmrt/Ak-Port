import { useEffect, useState } from "react";
import { Field } from "./Field.jsx";
import { pages } from "../../lib/panel-schema.js";
import { apiGetCollection, apiSaveCollection } from "../../lib/admin-api.js";

export function Pages() {
  const [activeId, setActiveId] = useState(pages[0].id);
  const [data, setData] = useState(() =>
    Object.fromEntries(pages.map((p) => [p.id, { id: p.id, label: p.label, path: p.path, ...p.defaults, published: true }]))
  );
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const page = pages.find((p) => p.id === activeId);
  const set = (key, value) =>
    setData((d) => ({ ...d, [activeId]: { ...d[activeId], [key]: value } }));

  useEffect(() => {
    apiGetCollection("pages")
      .then((res) => {
        const incoming = Object.fromEntries((res.items || []).map((p) => [p.id, p]));
        setData(Object.fromEntries(pages.map((p) => [
          p.id,
          { id: p.id, label: p.label, path: p.path, ...p.defaults, ...(incoming[p.id] || {}), published: incoming[p.id]?.published ?? true },
        ])));
      })
      .catch((err) => setStatus(`Varsayılan sayfa içerikleri kullanılıyor: ${err.message}`));
  }, []);

  async function save() {
    setSaving(true);
    setStatus("");
    try {
      await apiSaveCollection("pages", Object.values(data));
      setStatus("Sayfalar kaydedildi.");
    } catch (err) {
      setStatus(`Kaydedilemedi: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Sayfalar</h2>
        <button onClick={save} disabled={saving} className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-400 disabled:opacity-60">
          {saving ? "Kaydediliyor..." : "Sunucuya Kaydet"}
        </button>
      </div>
      {status && <p className="mb-3 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">{status}</p>}

      {/* Sayfa seçimi */}
      <div className="mb-5 flex flex-wrap gap-2">
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveId(p.id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${activeId === p.id ? "bg-amber-500 text-slate-900" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5">
        {page.fields.map((f) => (
          <Field key={f.key} field={f} value={data[activeId]?.[f.key]} onChange={(v) => set(f.key, v)} />
        ))}
        <Field field={{ key: "published", label: "Yayında", type: "boolean" }} value={data[activeId]?.published} onChange={(v) => set("published", v)} />
      </div>
      <p className="mt-2 text-xs text-slate-400">
        Önizleme: <a href={page.path} target="_blank" rel="noreferrer" className="text-amber-600 hover:underline">{page.path}</a>
      </p>

      {/* Diğer Kurumsal öğeler için bilgi */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
          <div className="font-semibold text-slate-700">İletişim</div>
          <p className="mt-1 text-slate-500">İletişim bilgileri <strong>Site Ayarları</strong> bölümünden yönetilir.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
          <div className="font-semibold text-slate-700">Yorumlar</div>
          <p className="mt-1 text-slate-500">Yorum kartları <strong>Yorumlar</strong> bölümünden yönetilir.</p>
        </div>
      </div>
    </div>
  );
}
