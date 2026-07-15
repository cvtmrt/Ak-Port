import { useState, useEffect, useCallback } from "react";
import { useData } from "vike-react/useData";
import { Breadcrumbs, CtaBand } from "../../components/blocks.jsx";

export default function Page() {
  const { gallery } = useData();
  const items = Array.isArray(gallery) ? gallery.filter((g) => g && g.url) : [];
  const [active, setActive] = useState(null); // lightbox index

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir) => setActive((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, go]);

  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Galeri", url: "/galeri" }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-10">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Galeri</h1>
          <p className="mt-2 max-w-2xl text-white/80">
            Yerinde akü değişimi, montaj ve servis çalışmalarımızdan kareler.
          </p>
        </div>
      </section>

      <section className="container-x py-10">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center text-slate-500">
            Galeriye henüz görsel eklenmedi.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((g, i) => (
              <button
                key={g.url + i}
                type="button"
                onClick={() => setActive(i)}
                className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                aria-label={g.caption || "Görseli büyüt"}
              >
                <img
                  src={g.url}
                  alt={g.caption || "AKÜPORT galeri görseli"}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                {g.caption && (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-left text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                    {g.caption}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </section>

      {active !== null && items[active] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Kapat"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
          >
            ×
          </button>
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                aria-label="Önceki"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(1); }}
                aria-label="Sonraki"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </>
          )}
          <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={items[active].url}
              alt={items[active].caption || "AKÜPORT galeri görseli"}
              className="mx-auto max-h-[80vh] w-auto rounded-lg object-contain"
            />
            {items[active].caption && (
              <figcaption className="mt-3 text-center text-sm text-white/80">{items[active].caption}</figcaption>
            )}
          </figure>
        </div>
      )}

      <CtaBand />
    </>
  );
}
