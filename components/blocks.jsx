import { usePublicConfig } from "../lib/public-config-client.js";
import { CheckIcon, BoltIcon, PinIcon, ClockIcon, ShieldIcon } from "./icons.jsx";

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="breadcrumb" className="container-x py-3 text-sm text-brand-navy/70">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => (
          <li key={it.url} className="flex items-center gap-1">
            {i > 0 && <span className="text-brand-navy/40">/</span>}
            {i < items.length - 1 ? (
              <a href={it.url} className="hover:text-brand-gold">{it.name}</a>
            ) : (
              <span className="font-medium text-brand-dark">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionTitle({ kicker, title, desc }) {
  return (
    <div className="mb-6 max-w-2xl">
      {kicker && <span className="text-sm font-bold uppercase tracking-wide text-brand-goldText">{kicker}</span>}
      <h2 className="mt-1 text-2xl font-extrabold text-brand-dark sm:text-3xl">{title}</h2>
      {desc && <p className="mt-2 text-brand-navy/80">{desc}</p>}
    </div>
  );
}

const trust = [
  { icon: CheckIcon, title: "Yerinde Montaj", text: "İncek & Gölbaşı'na yerinde akü değişimi" },
  { icon: ClockIcon, title: "Acil Akü Hattı", text: "Aküm bitti diyene hızlı yol yardım" },
  { icon: ShieldIcon, title: "Garantili Aküler", text: "Üretici garantili orijinal ürünler" },
  { icon: BoltIcon, title: "Tüm Marka & Amper", text: "Mutlu, Varta, Bosch, İnci ve daha fazlası" },
];

export function TrustBadges({ items = trust }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((t, index) => {
        const Icon = t.icon || trust[index % trust.length]?.icon || CheckIcon;
        return (
        <div key={t.title} className="flex items-start gap-3 rounded-xl border border-brand-dark/10 bg-white p-4">
          <span className="rounded-lg bg-brand-gold/15 p-2 text-brand-gold"><Icon /></span>
          <div>
            <div className="font-bold text-brand-dark">{t.title}</div>
            <div className="text-sm text-brand-navy/70">{t.text}</div>
          </div>
        </div>
      );})}
    </div>
  );
}

export function DistrictLinks({ districts }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {districts.map((d) => (
        <a key={d.slug} href={`/bolge/${d.slug}`} className="flex items-center gap-2 rounded-lg border border-brand-dark/10 bg-white px-4 py-3 font-semibold text-brand-dark hover:border-brand-gold">
          <PinIcon width={18} height={18} className="text-brand-gold" /> {d.name}
        </a>
      ))}
    </div>
  );
}

export function Faq({ items }) {
  return (
    <div className="divide-y divide-brand-dark/10 overflow-hidden rounded-xl border border-brand-dark/10 bg-white">
      {items.map((q) => (
        <details key={q.q} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-brand-dark">
            {q.q}
            <span className="text-brand-gold transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-brand-navy/80">{q.a}</p>
        </details>
      ))}
    </div>
  );
}

// Marka logoları şeridi. Logolar public/images/brands/ içindedir; resmi
// logo dosyaları geldiğinde aynı isimlerle değiştirmek yeterli.
const brandLogos = [
  { name: "Mutlu", src: "/images/brands/mutlu.svg" },
  { name: "Varta", src: "/images/brands/varta.svg" },
  { name: "Bosch", src: "/images/brands/bosch.svg" },
  { name: "İnci", src: "/images/brands/inci.svg" },
  { name: "Turbo", src: "/images/brands/turbo.svg" },
  { name: "President", src: "/images/brands/president.svg" },
];

export function BrandStrip({ brands = brandLogos }) {
  const logos = brands.map((brand) => ({
    name: brand.name,
    src: brand.src || brand.logo,
  })).filter((brand) => brand.name && brand.src);

  // Kesintisiz döngü için liste iki kez basılır; animasyon %50 kayınca
  // ikinci kopya ilkinin yerini alır ve baştan başlar.
  const loop = [...logos, ...logos];

  return (
    <div className="brand-marquee-pause relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className="animate-brand-marquee flex w-max gap-4 sm:gap-5">
        {loop.map((l, i) => (
          <div
            key={`${l.name}-${i}`}
            aria-hidden={i >= logos.length ? "true" : undefined}
            className="flex w-40 shrink-0 items-center justify-center rounded-2xl border border-brand-dark/10 bg-white p-5 shadow-sm sm:w-48 sm:p-6"
          >
            <img
              src={l.src}
              alt={`${l.name} akü`}
              loading="lazy"
              decoding="async"
              width="160"
              height="64"
              className="h-12 w-auto max-w-full object-contain sm:h-14"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const TR_MONTHS = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
export function formatDate(d) {
  if (!d) return "";
  const s = typeof d === "string" ? d : new Date(d).toISOString().slice(0, 10);
  const [y, m, day] = s.slice(0, 10).split("-");
  if (!y || !m || !day) return s;
  return `${Number(day)} ${TR_MONTHS[Number(m) - 1]} ${y}`;
}

export function PostCard({ post }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-brand-dark/10 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="aspect-[16/9] overflow-hidden bg-brand-light">
        <img src={post.cover || "/images/blog/bakim.svg"} alt={post.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {post.publishedAt && <span className="text-xs font-medium text-brand-navy/50">{formatDate(post.publishedAt)}</span>}
        <h3 className="text-lg font-bold leading-snug text-brand-dark group-hover:text-brand-goldText">{post.title}</h3>
        {post.excerpt && <p className="line-clamp-3 text-sm text-brand-navy/70">{post.excerpt}</p>}
        <span className="mt-auto pt-2 text-sm font-semibold text-brand-goldText group-hover:underline">Devamını oku →</span>
      </div>
    </a>
  );
}

export function CtaBand({ title, text }) {
  const { site } = usePublicConfig();
  return (
    <section className="bg-brand-dark">
      <div className="container-x flex flex-col items-center gap-4 py-10 text-center text-white sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="text-2xl font-extrabold">{title || "Aküm bitti, hemen lazım!"}</h2>
          <p className="mt-1 text-white/80">{text || "İncek, Gölbaşı ve Ankara içi yerinde akü değişimi. Bizi arayın, gelelim."}</p>
        </div>
        <div className="flex shrink-0 gap-3">
          <a href={`tel:${site.phoneIntl}`} className="btn btn-gold">{site.phone}</a>
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
