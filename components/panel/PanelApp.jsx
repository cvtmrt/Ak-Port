import { useState } from "react";
import { collections } from "../../lib/panel-schema.js";
import { Crud } from "./Crud.jsx";
import { Settings } from "./Settings.jsx";
import { Design } from "./Design.jsx";
import { Pages } from "./Pages.jsx";
import { HomeEditor } from "./HomeEditor.jsx";

const sections = [
  { id: "genel", label: "Genel Bakış" },
  { id: "home", label: "Anasayfa" },
  { id: "products", label: "Ürünler" },
  { id: "brands", label: "Markalar" },
  { id: "posts", label: "Blog" },
  { id: "pages", label: "Sayfalar" },
  { id: "settings", label: "Site Ayarları" },
  { id: "design", label: "Tasarım" },
];

function Login({ onLogin }) {
  const [pw, setPw] = useState("");
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <form
        onSubmit={(e) => { e.preventDefault(); onLogin(); }}
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
          Giriş Yap
        </button>
        <p className="mt-4 text-center text-xs text-slate-400">
          Demo giriş — gerçek parola doğrulaması backend tarafından yapılacaktır.
        </p>
      </form>
    </div>
  );
}

function Dashboard({ onGo }) {
  const stats = [
    { id: "products", label: "Ürün", count: collections.products.defaults.length },
    { id: "posts", label: "Blog Yazısı", count: collections.posts.defaults.length },
  ];
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
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.5c2-1.9 3.3-4.7 3.3-7.8z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.2 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2v2.8C3.8 20.6 7.6 23 12 23z"/><path fill="#FBBC05" d="M5.7 14.1c-.2-.7-.4-1.4-.4-2.1s.2-1.4.4-2.1V7.1H2C1.4 8.6 1 10.2 1 12s.4 3.4 1 4.9z"/><path fill="#EA4335" d="M12 5.3c1.6 0 3.1.6 4.2 1.7l3.1-3.1C17.5 2.1 15 1 12 1 7.6 1 3.8 3.4 2 7.1l3.7 2.8C6.6 7.3 9.1 5.3 12 5.3z"/></svg>
            Yorumlar
          </div>
          <p className="mt-2 text-sm text-slate-500">Google'dan otomatik çekilir, panelden düzenlenmez.</p>
        </div>
      </div>
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        Bu panel <strong>salt arayüzdür</strong>: ekleme/düzenleme/silme işlemleri ekranda çalışır ancak kalıcı kaydedilmez.
        Kaydetme ve giriş doğrulaması backend bağlandığında aktif olur (uç sözleşmesi <code>lib/admin-api.js</code> içinde).
      </div>
    </div>
  );
}

export function PanelApp() {
  const [authed, setAuthed] = useState(false);
  const [active, setActive] = useState("genel");

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen lg:flex">
      {/* Kenar menü */}
      <aside className="bg-slate-900 text-slate-200 lg:w-60 lg:shrink-0">
        <div className="flex items-center justify-between px-5 py-4">
          <a href="/" className="text-xl font-extrabold text-white">AKÜ<span className="text-amber-500">PORT</span></a>
          <button onClick={() => setAuthed(false)} className="text-xs text-slate-400 hover:text-white">Çıkış</button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-3 lg:pb-4">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
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
          {active === "genel" && <Dashboard onGo={setActive} />}
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
