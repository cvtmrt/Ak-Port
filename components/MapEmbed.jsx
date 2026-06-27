// Google Maps gömme haritası. API anahtarı GEREKTİRMEZ; koordinatlardan
// klasik "output=embed" iframe'i kullanır. Lazy yüklenir (performans).
export function MapEmbed({ lat, lng, title = "Konum", query, zoom = 14, className = "" }) {
  const q = query || `${lat},${lng}`;
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=${zoom}&output=embed`;
  return (
    <div className={`overflow-hidden rounded-2xl border border-brand-dark/10 ${className}`}>
      <iframe
        title={title}
        src={src}
        width="100%"
        height="320"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
