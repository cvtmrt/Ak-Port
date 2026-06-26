import { useState, useEffect } from "react";
import { Field } from "./Field.jsx";

// Salt frontend CRUD ekranı. Veriler bellek içinde (oturum boyunca) tutulur;
// kalıcı kayıt backend'e bağlanınca yapılır. Değişiklikler sayfa yenilenince sıfırlanır.
function emptyItem(fields) {
  const o = {};
  for (const f of fields) {
    if (f.type === "boolean") o[f.key] = false;
    else if (f.type === "tags") o[f.key] = [];
    else o[f.key] = "";
  }
  return o;
}

function clone(v) {
  try { return structuredClone(v); } catch { return JSON.parse(JSON.stringify(v)); }
}

export function Crud({ schema }) {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // {item, index|null}

  useEffect(() => {
    setItems(clone(schema.defaults));
    setEditing(null);
  }, [schema]);

  function startNew() {
    setEditing({ item: emptyItem(schema.fields), index: null });
  }
  function startEdit(item, index) {
    setEditing({ item: { ...item }, index });
  }
  function remove(index) {
    if (!confirm("Bu kaydı silmek istediğinize emin misiniz?")) return;
    setItems(items.filter((_, i) => i !== index));
  }

  function save() {
    const it = { ...editing.item };
    for (const f of schema.fields) {
      if (f.required && !String(it[f.key] ?? "").trim()) {
        alert(`"${f.label}" alanı zorunlu.`);
        return;
      }
    }
    if (schema.idField === "id" && !it.id) {
      it.id = (items.reduce((m, x) => Math.max(m, Number(x.id) || 0), 0) || 0) + 1;
    }
    setItems(editing.index === null ? [...items, it] : items.map((x, i) => (i === editing.index ? it : x)));
    setEditing(null);
  }

  if (editing) {
    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">
            {editing.index === null ? `Yeni ${schema.singular}` : `${schema.singular} Düzenle`}
          </h2>
          <button onClick={() => setEditing(null)} className="text-sm text-slate-500 hover:text-slate-800">← Listeye dön</button>
        </div>
        <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2">
          {schema.fields.map((f) => (
            <div key={f.key} className={f.type === "textarea" || f.type === "html" ? "sm:col-span-2" : ""}>
              <Field
                field={f}
                value={editing.item[f.key]}
                onChange={(v) => setEditing((e) => ({ ...e, item: { ...e.item, [f.key]: v } }))}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <button onClick={save} className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-amber-400">Kaydet</button>
          <button onClick={() => setEditing(null)} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">İptal</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">{schema.label} <span className="text-slate-400">({items.length})</span></h2>
        <button onClick={startNew} className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-400">+ Yeni {schema.singular}</button>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {schema.columns.map((c) => <th key={c.key} className="px-4 py-2.5">{c.label}</th>)}
              <th className="px-4 py-2.5 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item, i) => (
              <tr key={item[schema.idField] ?? i} className="hover:bg-slate-50">
                {schema.columns.map((c) => (
                  <td key={c.key} className="max-w-[220px] truncate px-4 py-2.5 text-slate-700">{String(item[c.key] ?? "")}</td>
                ))}
                <td className="whitespace-nowrap px-4 py-2.5 text-right">
                  <button onClick={() => startEdit(item, i)} className="mr-3 font-medium text-amber-600 hover:underline">Düzenle</button>
                  <button onClick={() => remove(i)} className="font-medium text-red-500 hover:underline">Sil</button>
                </td>
              </tr>
            ))}
            {!items.length && (
              <tr><td colSpan={schema.columns.length + 1} className="px-4 py-8 text-center text-slate-400">Henüz kayıt yok.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
