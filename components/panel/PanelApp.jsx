import { useState, useEffect } from "react";
import { collections } from "../../lib/panel-schema.js";
import { Crud } from "./Crud.jsx";
import { Settings } from "./Settings.jsx";
import { Design } from "./Design.jsx";
import { Pages } from "./Pages.jsx";
import { HomeEditor } from "./HomeEditor.jsx";
import { apiLogin, apiLogout, apiGetCollection } from "../../lib/admin-api.js";

const sections = [
  { id: "genel", label: "Genel Bakış" },
  { id: "home", label: "Anasayfa" },
  { id: "products", label: "Ürünler" },
  { id: "categories", label: "Kategoriler" },
  { id: "brands", label: "Markalar" },
  { id: "posts", label: "Blog" },
  { id: "reviews", label: "Yorumlar" },
  { id: "districts", label: "Bölgeler" },
  { id: "pages", label: "Sayfalar" },
  { id: "settings", label: "Site Ayarları" },
  { id: "design", label: "Tasarım" },
];

function Login({ onLogin }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!pw.trim()) {
      setError("Panel şifresini girin.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await apiLogin(pw);
      onLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="mb-6 text-center">
          <div className="text-2xl font-extrabold text-slate-900">AKÜ<span className="text-amber-500">PORT</span></div>
          <p className="mt-1 text-sm text-slate-500">Yönetim Paneli</p>
        </div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Parola</label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoFocus
          className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          placeholder="••••••••"
        />
        <button type="submit" className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-bold text-slate-900 hover:bg-amber-400">
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
        {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}

const dashboardItems = [
  { id: "products", label: "Ürün" },
  { id: "categories", label: "Kategori" },
  { id: "brands", label: "Marka" },
  { id: "posts", label: "Blog Yazısı" },
  { id: "reviews", label: "Yorum" },
  { id: "districts", label: "Bölge" },
];

function Dashboard({ onGo }) {
  // Canlı sayımlar API'den çekilir; uç yoksa şema varsayılanlarına düşülür.
  const [counts, setCounts] = useState(() =>
    Object.fromEntries(dashboardItems.map((d) => [d.id, collections[d.id].defaults.length]))
  );

  useEffect(() => {
    let alive = true;
    Promise.all(
      dashboardItems.map((d) =>
        apiGetCollection(collections[d.id].key)
          .then((res) => [d.id, (res.items || collections[d.id].defaults).length])
          .catch(() => [d.id, collections[d.id].defaults.length])
      )
    ).then((entries) => {
      if (alive) setCounts(Object.fromEntries(entries));
    });
    return () => { alive = false; };
  }, []);

  const stats = dashboardItems.map((d) => ({ ...d, count: counts[d.id] }));
  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-slate-800">Genel Bakış</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <button key={s.id} onClick={() => onGo(s.id)} className="rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:border-amber-400 hover:shadow-md">
            <div className="text-3xl font-extrabold text-slate-900">{s.count}</div>
            <div className="mt-1 text-sm text-slate-500">{s.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function PanelApp() {
  const [authed, setAuthed] = useState(false);
  const [active, setActive] = useState("genel");

  // Sekmeyi URL hash'i + tarayıcı geçmişiyle senkronla; böylece "geri" tuşu
  // önceki sekmeye döner (paneli terk etmez).
  useEffect(() => {
    const apply = () => {
      const id = window.location.hash.replace(/^#/, "");
      setActive(id && sections.some((s) => s.id === id) ? id : "genel");
    };
    apply(); // ilk yüklemede hash'ten oku
    window.addEventListener("popstate", apply);
    return () => window.removeEventListener("popstate", apply);
  }, []);

  function go(id) {
    setActive(id);
    if (`#${id}` !== window.location.hash) {
      window.history.pushState(null, "", `#${id}`);
    }
  }

  async function logout() {
    try { await apiLogout(); } catch {}
    setAuthed(false);
  }

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen lg:flex">
      {/* Kenar menü */}
      <aside className="bg-slate-900 text-slate-200 lg:w-60 lg:shrink-0">
        <div className="flex items-center justify-between px-5 py-4">
          <a href="/" className="text-xl font-extrabold text-white">AKÜ<span className="text-amber-500">PORT</span></a>
          <button onClick={logout} className="text-xs text-slate-400 hover:text-white">Çıkış</button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-3 lg:pb-4">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium transition ${active === s.id ? "bg-amber-500 text-slate-900" : "text-slate-300 hover:bg-white/10"}`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* İçerik */}
      <main className="flex-1 p-5 sm:p-8">
        <div className="mx-auto max-w-5xl">
          {active === "genel" && <Dashboard onGo={go} />}
          {active === "home" && <HomeEditor />}
          {active === "pages" && <Pages />}
          {active === "settings" && <Settings />}
          {active === "design" && <Design />}
          {collections[active] && <Crud schema={collections[active]} />}
        </div>
      </main>
    </div>
  );
}
