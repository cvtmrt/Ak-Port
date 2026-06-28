// Hero metin slider'ı (kontrollü): arka plan sabit kalır, yalnızca
// rozet/başlık/alt metin slide slide değişir. Aktif slayt ve geçişler
// üst bileşen (+Page) tarafından yönetilir; oklar section kenarlarındadır.
// Slaytlar üst üste yerleştirilir; kapsayıcı en uzun slayta göre boyutlanır,
// böylece slayt değişince yükseklik zıplamaz.
export function HeroSlides({ slides, index = 0, onSelect }) {
  const list = Array.isArray(slides) && slides.length ? slides : [{}];
  const count = list.length;
  const i = Math.min(Math.max(index, 0), count - 1);

  return (
    <div>
      <div className="grid">
        {list.map((s, idx) => (
          <div
            key={idx}
            aria-hidden={idx !== i}
            className={`col-start-1 row-start-1 transition-opacity duration-500 ${idx === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            {s.badge && (
              <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-brand-gold/15 px-3 py-1 text-sm font-semibold text-brand-gold">
                {s.badge}
              </span>
            )}
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {s.title1}
              {s.title2 ? (
                <>
                  <br />
                  <span className="text-brand-gold">{s.title2}</span>
                </>
              ) : null}
            </h1>
            {s.subtitle && <p className="mt-4 max-w-lg text-lg text-white/80">{s.subtitle}</p>}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-5 flex items-center gap-2">
          {list.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect && onSelect(idx)}
              aria-label={`Slayt ${idx + 1}`}
              aria-current={idx === i}
              className={`h-2.5 rounded-full transition-all ${idx === i ? "w-6 bg-brand-gold" : "w-2.5 bg-white/30 hover:bg-white/50"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
