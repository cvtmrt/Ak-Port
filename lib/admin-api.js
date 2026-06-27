// ===========================================================================
// BACKEND API SÖZLEŞMESI (arkadaşın bu uçları yazınca panel otomatik çalışır)
// ---------------------------------------------------------------------------
// Paneldeki kayıt işlemleri aşağıdaki uçlara istek atar. Backend bu uçları
// uygulayıp ilgili tabloya yazmalıdır. Yetkilendirme (login) de backend
// tarafından yapılmalıdır (örn. cookie/JWT). Frontend yalnızca formları ve
// istekleri sağlar; veriyi backend kalıcılaştırır.
//
//   GET    /api/admin/:collection           -> { items: [...] }
//   PUT    /api/admin/:collection           -> body: { items: [...] }  (toplu kaydet)
//   POST   /api/admin/login                 -> body: { password }      -> { ok: true }
//   GET    /api/admin/settings              -> { site, design }
//   PUT    /api/admin/settings              -> body: { site, design }
//   POST   /api/admin/upload                -> multipart file          -> { url }
//
// collection: "products" | "posts" | "reviews" | "brands" | "categories" | "districts" | "pages"
// Yorumlar panelden yönetilir. Google API kullanılmadığı için tekil Google
// yorumları otomatik çekilmez; yalnızca Google puan/adet özeti DB'de tutulur.
// ===========================================================================

const BASE = "/api/admin";

async function req(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...options,
  });
  if (!res.ok) {
    let message = `Sunucu yanıtı: ${res.status}`;
    try {
      const data = await res.json();
      message = data?.error || message;
    } catch {}
    throw new Error(message);
  }
  return res.status === 204 ? null : res.json();
}

export async function apiSaveCollection(collection, items) {
  return req(`/${collection}`, { method: "PUT", body: JSON.stringify({ items }) });
}

export async function apiGetCollection(collection) {
  return req(`/${collection}`);
}

export async function apiGetSettings() {
  return req(`/settings`);
}

export async function apiSaveSettings(settings) {
  return req(`/settings`, { method: "PUT", body: JSON.stringify(settings) });
}

export async function apiLogin(password) {
  return req(`/login`, { method: "POST", body: JSON.stringify({ password }) });
}

export async function apiLogout() {
  const res = await fetch(`${BASE}/logout`, { method: "POST", credentials: "include" });
  if (!res.ok && res.status !== 204) throw new Error("Çıkış yapılamadı.");
}

export async function apiUpload(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${BASE}/upload`, {
    method: "POST",
    credentials: "include",
    body: form,
  });
  if (!res.ok) {
    let message = "Görsel yüklenemedi.";
    try {
      const data = await res.json();
      message = data?.error || message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
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
