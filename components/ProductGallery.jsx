import { useState, useEffect, useCallback } from "react";

function Chevron({ dir = "left" }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  );
}

export function ProductGallery({ images = [], alt = "Ürün görseli" }) {
  const list = images.length ? images : ["/images/aku-placeholder.svg"];
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const many = list.length > 1;

  const next = useCallback(() => setActive((i) => (i + 1) % list.length), [list.length]);
  const prev = useCallback(() => setActive((i) => (i - 1 + list.length) % list.length), [list.length]);

  // Lightbox açıkken klavye + scroll kilidi
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev]);

  return (
    <div>
      {/* Ana görsel */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Görseli büyüt"
        className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-brand-dark/10 bg-white p-8"
      >
        <img src={list[active]} alt={alt} className="max-h-80 w-auto object-contain transition-transform group-hover:scale-105" />
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-brand-dark/70 px-3 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>
          Büyüt
        </span>
      </button>

      {/* Küçük görseller */}
      {many && (
        <div className="mt-3 flex flex-wrap gap-2">
          {list.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Görsel ${i + 1}`}
              className={`flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border bg-white p-1.5 transition-colors ${i === active ? "border-brand-gold ring-1 ring-brand-gold" : "border-brand-dark/10 hover:border-brand-gold/60"}`}
            >
              <img src={src} alt="" className="max-h-full w-auto object-contain" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Kapat"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>

          {many && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Önceki"
              className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
            >
              <Chevron dir="left" />
            </button>
          )}

          <img
            src={list[active]}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-lg bg-white object-contain p-4"
          />

          {many && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Sonraki"
              className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
            >
              <Chevron dir="right" />
            </button>
          )}

          {many && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
              {active + 1} / {list.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
