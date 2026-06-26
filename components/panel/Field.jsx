import { RichText } from "./RichText.jsx";
import { apiUpload } from "../../lib/admin-api.js";

// Şemadaki bir alanı tipine göre form girdisine çevirir.
export function Field({ field, value, onChange }) {
  const id = `f_${field.key}`;
  const base =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500";

  async function readImageFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Lütfen bir görsel dosyası seçin."); return; }
    try {
      const result = await apiUpload(file);
      onChange(result.url);
    } catch (err) {
      alert(`Görsel yüklenemedi: ${err.message}`);
    }
  }

  const label = (
    <label htmlFor={id} className="mb-1 block text-sm font-medium text-slate-700">
      {field.label}
      {field.required && <span className="text-red-500"> *</span>}
    </label>
  );

  let input;
  switch (field.type) {
    case "boolean":
      return (
        <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-3 py-2.5">
          <span className="text-sm font-medium text-slate-700">{field.label}</span>
          <button
            type="button"
            onClick={() => onChange(!value)}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${value ? "bg-amber-500" : "bg-slate-300"}`}
            aria-pressed={!!value}
            aria-label={field.label}
          >
            <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${value ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>
      );
    case "textarea":
      input = <textarea id={id} rows={3} className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
      break;
    case "html":
      input = <RichText value={value} onChange={onChange} placeholder="İçeriği buraya yazın..." />;
      break;
    case "number":
      input = <input id={id} type="number" className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} />;
      break;
    case "date":
      input = <input id={id} type="date" className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
      break;
    case "select":
      input = (
        <select id={id} className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">Seçin</option>
          {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
      break;
    case "tags":
      input = (
        <input
          id={id}
          className={base}
          value={Array.isArray(value) ? value.join(", ") : value ?? ""}
          onChange={(e) => onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
        />
      );
      break;
    case "image":
      input = (
        <div className="flex items-center gap-3">
          {value ? (
            <img src={value} alt="" className="h-16 w-16 shrink-0 rounded-lg border border-slate-200 bg-white object-contain p-1" />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-300 text-xs text-slate-400">yok</div>
          )}
          <div className="flex flex-col items-start gap-1.5">
            <label className="cursor-pointer rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200">
              Fotoğraf Seç
              <input type="file" accept="image/*" className="hidden" onChange={readImageFile} />
            </label>
            {value && (
              <button type="button" onClick={() => onChange("")} className="text-xs font-medium text-red-500 hover:underline">
                Kaldır
              </button>
            )}
          </div>
        </div>
      );
      break;
    case "color":
      input = (
        <div className="flex items-center gap-2">
          <input type="color" className="h-9 w-12 cursor-pointer rounded border border-slate-300" value={value ?? "#000000"} onChange={(e) => onChange(e.target.value)} />
          <input className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
        </div>
      );
      break;
    case "cards": {
      const list = Array.isArray(value) ? value : [];
      const upd = (i, key, v) => onChange(list.map((it, idx) => (idx === i ? { ...it, [key]: v } : it)));
      input = (
        <div className="space-y-3">
          {list.map((it, i) => (
            <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Kart {i + 1}</span>
                <button type="button" onClick={() => onChange(list.filter((_, idx) => idx !== i))} className="text-xs font-medium text-red-500 hover:underline">Sil</button>
              </div>
              <input className={`${base} mb-2`} placeholder="Başlık" value={it.title ?? ""} onChange={(e) => upd(i, "title", e.target.value)} />
              <textarea className={base} rows={2} placeholder="Açıklama" value={it.text ?? ""} onChange={(e) => upd(i, "text", e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={() => onChange([...list, { title: "", text: "" }])} className="w-full rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            + Kart Ekle
          </button>
        </div>
      );
      break;
    }
    case "faq": {
      const list = Array.isArray(value) ? value : [];
      const upd = (i, key, v) => onChange(list.map((it, idx) => (idx === i ? { ...it, [key]: v } : it)));
      input = (
        <div className="space-y-3">
          {list.map((it, i) => (
            <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Soru {i + 1}</span>
                <button type="button" onClick={() => onChange(list.filter((_, idx) => idx !== i))} className="text-xs font-medium text-red-500 hover:underline">Sil</button>
              </div>
              <input className={`${base} mb-2`} placeholder="Soru" value={it.q ?? ""} onChange={(e) => upd(i, "q", e.target.value)} />
              <textarea className={base} rows={2} placeholder="Cevap" value={it.a ?? ""} onChange={(e) => upd(i, "a", e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={() => onChange([...list, { q: "", a: "" }])} className="w-full rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            + Soru Ekle
          </button>
        </div>
      );
      break;
    }
    default:
      input = <input id={id} type="text" className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
  }

  return (
    <div>
      {label}
      {input}
      {field.hint && <p className="mt-1 text-xs text-slate-400">{field.hint}</p>}
    </div>
  );
}
