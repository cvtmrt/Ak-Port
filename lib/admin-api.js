// ===========================================================================
// BACKEND API SÖZLEŞMESI (arkadaşın bu uçları yazınca panel otomatik çalışır)
// ---------------------------------------------------------------------------
// Panel "Sunucuya Kaydet" dediğinde aşağıdaki uçlara istek atar. Backend bu
// uçları uygulayıp ilgili tabloya yazmalıdır. Yetkilendirme (login) de backend
// tarafından yapılmalıdır (örn. cookie/JWT). Frontend yalnızca formları ve
// istekleri sağlar; veriyi backend kalıcılaştırır.
//
//   GET    /api/admin/:collection           -> { items: [...] }
//   PUT    /api/admin/:collection           -> body: { items: [...] }  (toplu kaydet)
//   POST   /api/admin/login                 -> body: { password }      -> { ok: true }
//   GET    /api/admin/settings              -> { site, design }
//   PUT    /api/admin/settings              -> body: { site, design }
//
// collection: "products" | "posts"
// NOT: Yorumlar (reviews) panelden DÜZENLENMEZ; Google Places API'den otomatik
// çekilir (backend tarafında). Panelde yalnızca bilgilendirme amaçlı gösterilir.
// ===========================================================================

const BASE = "/api/admin";

async function req(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });
  if (!res.ok) throw new Error(`Sunucu yanıtı: ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export async function apiSaveCollection(collection, items) {
  return req(`/${collection}`, { method: "PUT", body: JSON.stringify({ items }) });
}

export async function apiSaveSettings(settings) {
  return req(`/settings`, { method: "PUT", body: JSON.stringify(settings) });
}

export async function apiLogin(password) {
  return req(`/login`, { method: "POST", body: JSON.stringify({ password }) });
}

// Backend hazır mı? (uç yoksa false döner; panel yerel modda çalışmaya devam eder)
export async function apiAvailable() {
  try {
    const res = await fetch(`${BASE}/health`, { credentials: "include" });
    return res.ok;
  } catch {
    return false;
  }
}
