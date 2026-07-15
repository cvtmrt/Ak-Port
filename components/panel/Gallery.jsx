import { useState, useEffect, useRef } from "react";
import { apiGetAssets, apiGetGallery, apiSaveGallery, apiUpload, apiDeleteAsset } from "../../lib/admin-api.js";

const MB = 1048576;
const fmt = (b) => `${(b / MB).toFixed(b < 10 * MB ? 1 : 0)} MB`;

export function Gallery() {
  const [items, setItems] = useState([]);
  const [storage, setStorage] = useState(null); // {used, budget, remaining, count}
  const [status, setStatus] = useState("Yükleniyor...");
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    let alive = true;
    apiGetGallery()
      .then((res) => {
        if (!alive) return;
        setItems(Array.isArray(res.items) ? res.items : []);
        if (res.storage) setStorage(res.storage);
        setStatus("");
      })
      .catch((err) => { if (alive) setStatus(`Hata: ${err.message}`); });
    return () => { alive = false; };
  }, []);

  async function persist(next) {
    setItems(next);
    setDirty(false);
    await apiSaveGallery(next);
    try {
      const a = await apiGetAssets();
      if (a.storage) setStorage(a.storage);
    } catch {}
  }

  async function onFiles(e) {
    const files = Array.from(e.target.files || []);
    if (fileRef.current) fileRef.current.value = "";
    if (!files.length) return;
    setBusy(true);
    let next = [...items];
    try {
      for (let i = 0; i < files.length; i++) {
        setStatus(`Yükleniyor (${i + 1}/${files.length})...`);
        const res = await apiUpload(files[i]); // otomatik sıkıştırma lib içinde
        next = [...next, { url: res.url, caption: "" }];
        if (res.storage) setStorage(res.storage);
      }
      await persist(next);
      setStatus(`${files.length} görsel eklendi.`);
    } catch (err) {
      // Kısmen yüklenenleri de kaydet ki disk ile liste tutarlı kalsın.
      if (next.length !== items.length) { try { await persist(next); } catch {} }
      setStatus(`Durduruldu: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  async function remove(idx) {
    const item = items[idx];
    if (!item) return;
    if (!confirm("Bu görsel galeriden ve sunucudan kalıcı olarak silinsin mi?")) return;
    setBusy(true);
    setStatus("Siliniyor...");
    try {
      const res = await apiDeleteAsset(item.url);
      if (res.storage) setStorage(res.storage);
      await persist(items.filter((_, i) => i !== idx));
      setStatus("Görsel silindi.");
    } catch (err) {
      setStatus(`Silinemedi: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  function setCaption(idx, caption) {
    setItems((list) => list.map((it, i) => (i === idx ? { ...it, caption } : it)));
    setDirty(true);
  }

  function move(idx, dir) {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[idx], next[j]] = [next[j], next[idx]];
    setItems(next);
    setDirty(true);
  }

  async function saveCaptions() {
    setBusy(true);
    setStatus("Kaydediliyor...");
    try {
      await persist(items);
      setStatus("Kaydedildi.");
    } catch (err) {
      setStatus(`Kaydedilemedi: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  const pct = storage ? Math.min(100, (storage.used / storage.budget) * 100) : 0;
  const nearFull = pct >= 85;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Galeri</h2>
          <p className="text-sm text-slate-500">Sitedeki /galeri sayfasında gösterilen görseller.</p>
        </div>
        <div className="flex items-center gap-2">
          {dirty && (
            <button
              onClick={saveCaptions}
              disabled={busy}
              className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900 disabled:opacity-50"
            >
              Sıra/Başlıkları Kaydet
            </button>
          )}
          <label className={`cursor-pointer rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-400 ${busy ? "pointer-events-none opacity-50" : ""}`}>
            + Görsel Yükle
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={onFiles} disabled={busy} />
          </label>
        </div>
      </div>

      {/* Depolama doluluk çubuğu */}
      {storage && (
        <div className={`mb-5 rounded-xl border p-4 ${nearFull ? "border-red-200 bg-red-50" : "border-slate-200 bg-slate-50"}`}>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-slate-700">Depolama</span>
            <span className={nearFull ? "font-semibold text-red-600" : "text-slate-500"}>
              {fmt(storage.used)} / {fmt(storage.budget)} · {storage.count} dosya
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-all ${nearFull ? "bg-red-500" : "bg-amber-500"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          {nearFull && (
            <p className="mt-2 text-xs text-red-600">
              Alan doluyor. Yeni görsel yüklemek için kullanmadığınız görselleri silin.
            </p>
          )}
        </div>
      )}

      {status && <p className="mb-4 text-sm text-slate-500">{status}</p>}

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center text-sm text-slate-400">
          Henüz görsel yok. “+ Görsel Yükle” ile başlayın.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((it, i) => (
            <div key={it.url + i} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="relative aspect-square bg-slate-100">
                <img src={it.url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  disabled={busy}
                  className="absolute right-1.5 top-1.5 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white hover:bg-red-600 disabled:opacity-50"
                >
                  Sil
                </button>
              </div>
              <div className="p-2">
                <input
                  className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-slate-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Başlık (isteğe bağlı)"
                  value={it.caption ?? ""}
                  onChange={(e) => setCaption(i, e.target.value)}
                />
                <div className="mt-1.5 flex items-center justify-end gap-1 text-slate-400">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="px-1 hover:text-slate-700 disabled:opacity-30">←</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="px-1 hover:text-slate-700 disabled:opacity-30">→</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
