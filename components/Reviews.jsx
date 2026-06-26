import { usePublicConfig } from "../lib/public-config-client.js";

function Star({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className={filled ? "text-brand-gold" : "text-brand-dark/15"} fill="currentColor" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function StarRating({ rating = 5 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} / 5 yıldız`}>
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} filled={i <= Math.round(rating)} />)}
    </div>
  );
}

function initials(name = "") {
  return name.trim().slice(0, 1).toLocaleUpperCase("tr");
}

function ReviewCard({ review }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-brand-dark/10 bg-white p-5">
      <div className="flex items-center gap-3">
        {review.avatar ? (
          <img src={review.avatar} alt={review.author} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy/10 font-bold text-brand-navy">{initials(review.author)}</span>
        )}
        <div className="min-w-0">
          <figcaption className="font-bold text-brand-dark">{review.author}</figcaption>
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} />
            {review.time && <span className="text-xs text-brand-navy/50">{review.time}</span>}
          </div>
        </div>
        {review.source === "google" && (
          <svg width="18" height="18" viewBox="0 0 24 24" className="ml-auto shrink-0" aria-label="Google">
            <path fill="#4285F4" d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.5c2-1.9 3.3-4.7 3.3-7.8z"/>
            <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.2 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2v2.8C3.8 20.6 7.6 23 12 23z"/>
            <path fill="#FBBC05" d="M5.7 14.1c-.2-.7-.4-1.4-.4-2.1s.2-1.4.4-2.1V7.1H2C1.4 8.6 1 10.2 1 12s.4 3.4 1 4.9l3.7-2.8z"/>
            <path fill="#EA4335" d="M12 5.3c1.6 0 3.1.6 4.2 1.7l3.1-3.1C17.5 2.1 15 1 12 1 7.6 1 3.8 3.4 2 7.1l3.7 2.8C6.6 7.3 9.1 5.3 12 5.3z"/>
          </svg>
        )}
      </div>
      {review.text && <blockquote className="mt-3 text-sm leading-relaxed text-brand-navy/80">{review.text}</blockquote>}
    </figure>
  );
}

export function ReviewsSection({ reviews = [], summary, limit }) {
  const { site } = usePublicConfig();
  const list = limit ? reviews.slice(0, limit) : reviews;
  if (!list.length && (!summary || summary.count <= 0)) return null;
  return (
    <div>
      {summary && summary.count > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-xl border border-brand-dark/10 bg-white p-5">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-brand-dark">{summary.average.toFixed(1)}</div>
            <StarRating rating={summary.average} />
          </div>
          <div className="text-sm text-brand-navy/70">
            <div className="font-semibold text-brand-dark">{summary.count} müşteri yorumu</div>
            <div>Google üzerinden gerçek müşteri değerlendirmeleri</div>
          </div>
          {site.social.googleMaps && (
            <a href={site.social.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-outline ml-auto">
              Google'da Yorum Yap
            </a>
          )}
        </div>
      )}
      {list.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => <ReviewCard key={r.id ?? i} review={r} />)}
        </div>
      )}
    </div>
  );
}
