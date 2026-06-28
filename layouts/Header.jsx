import { useEffect, useRef } from "react";
import { usePublicConfig } from "../lib/public-config-client.js";
import { PhoneIcon, ClockIcon, MenuIcon, BoltIcon } from "../components/icons.jsx";

const bilgi = [
  { href: "/bilgi/aku-nedir", label: "Akü Nedir?" },
  { href: "/bilgi/teknik-bilgiler", label: "Teknik Bilgiler" },
  { href: "/bilgi/aku-takviyesi", label: "Akü Takviyesi" },
  { href: "/sss", label: "S.S.S." },
];

const kurumsal = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/neden-biz", label: "Neden Biz?" },
  { href: "/yorumlar", label: "Yorumlar" },
  { href: "/iletisim", label: "İletişim" },
];

const nav = [
  { href: "/urunler", label: "Ürünler" },
  { href: "/aku-bulucu", label: "Akü Bulucu" },
  { href: "/acil-aku", label: "Acil Akü" },
  { label: "Bilgi", children: bilgi },
  { label: "Kurumsal", children: kurumsal },
  { href: "/blog", label: "Blog" },
];

function Logo() {
  return (
    <a href="/" className="flex flex-col leading-none text-white">
      <span className="flex items-center gap-1 text-2xl font-extrabold tracking-tight">
        AKÜ
        <BoltIcon width={22} height={22} className="text-brand-gold" />
        <span className="text-brand-gold">PORT</span>
      </span>
      <span className="mt-1 block w-full text-center text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-white/60">
        Akü Market
      </span>
    </a>
  );
}

export function Header() {
  const { site: currentSite } = usePublicConfig();
  const mobileMenuRef = useRef(null);

  // Mobil menü: dışarı tıklayınca veya Esc'e basınca kapansın.
  useEffect(() => {
    const el = mobileMenuRef.current;
    if (!el) return;
    const close = () => { el.open = false; };
    const onClick = (e) => { if (el.open && !el.contains(e.target)) close(); };
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-brand-dark text-white shadow-md">
      {/* Üst bilgi şeridi */}
      <div className="hidden border-b border-white/10 bg-brand-darker text-xs lg:block">
        <div className="container-x flex items-center justify-between py-1.5 text-white/70">
          <span className="flex items-center gap-1.5"><ClockIcon width={14} height={14} /> {currentSite.hours?.text}</span>
          <span>{currentSite.serviceScope}</span>
        </div>
      </div>

      <div className="container-x flex items-center justify-between gap-4 py-3">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) =>
            n.children ? (
              <div key={n.label} className="group relative">
                <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-brand-gold">
                  {n.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9" /></svg>
                </button>
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="w-52 overflow-hidden rounded-lg border border-white/10 bg-brand-navy shadow-xl">
                    {n.children.map((c) => (
                      <a key={c.href} href={c.href} className="block px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 hover:text-brand-gold">
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={n.href} href={n.href} className="text-sm font-medium text-white/90 hover:text-brand-gold">
                {n.label}
              </a>
            )
          )}
        </nav>

        <a href={`tel:${currentSite.phoneIntl}`} className="hidden items-center gap-2 rounded-lg bg-brand-gold px-4 py-2 text-sm font-bold text-brand-dark hover:bg-brand-amber lg:inline-flex">
          <PhoneIcon width={16} height={16} /> {currentSite.phone}
        </a>

        {/* Mobil menü (dışarı tıkla/Esc ile kapanır, JS yoksa native çalışır) */}
        <details ref={mobileMenuRef} className="relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center text-white">
            <MenuIcon />
          </summary>
          <div
            className="absolute right-0 top-full mt-2 w-60 rounded-lg border border-white/10 bg-brand-navy p-2 shadow-xl"
            onClick={(e) => { if (e.target.closest("a") && mobileMenuRef.current) mobileMenuRef.current.open = false; }}
          >
            {nav.map((n) =>
              n.children ? (
                <div key={n.label} className="mt-1 border-t border-white/10 pt-1">
                  <span className="block px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-gold">{n.label}</span>
                  {n.children.map((c) => (
                    <a key={c.href} href={c.href} className="block rounded px-3 py-2 text-sm text-white/90 hover:bg-white/10">
                      {c.label}
                    </a>
                  ))}
                </div>
              ) : (
                <a key={n.href} href={n.href} className="block rounded px-3 py-2 text-sm text-white/90 hover:bg-white/10">
                  {n.label}
                </a>
              )
            )}
            <a href={`tel:${currentSite.phoneIntl}`} className="mt-2 block rounded bg-brand-gold px-3 py-2 text-center text-sm font-bold text-brand-dark">
              {currentSite.phone}
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}
