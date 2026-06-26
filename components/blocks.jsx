import { site } from "../lib/site.js";
import { CategoryIcon, CheckIcon, BoltIcon, PinIcon, ClockIcon, ShieldIcon } from "./icons.jsx";
import { ProductCard } from "./ProductCard.jsx";

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
  { icon: CheckIcon, title: "Ücretsiz Yerinde Montaj", text: "İncek & Gölbaşı'na yerinde akü değişimi" },
  { icon: ClockIcon, title: "7/24 Acil Akü", text: "Aküm bitti diyene hızlı yol yardım" },
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

export function CategoryGrid({ categories }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((c) => (
        <a key={c.slug} href={`/kategori/${c.slug}`} className="group flex flex-col items-center gap-3 rounded-xl border border-brand-dark/10 bg-white p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-brand-gold hover:shadow-lg">
          <span className="rounded-full bg-brand-navy/5 p-4 text-brand-navy group-hover:bg-brand-gold/15 group-hover:text-brand-gold">
            <CategoryIcon name={c.icon} width={28} height={28} />
          </span>
          <span className="font-bold text-brand-dark">{c.name}</span>
        </a>
      ))}
    </div>
  );
}

export function ProductGrid({ products }) {
  if (!products?.length) {
    return <p className="rounded-lg bg-white p-6 text-center text-brand-navy/70">Bu kategoride henüz ürün eklenmedi. Stok için <a className="font-semibold text-brand-gold" href={`tel:${site.phoneIntl}`}>arayın</a>.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {products.map((p) => <ProductCard key={p.slug} product={p} />)}
    </div>
  );
}

export function AmperLinks({ values }) {
  return (
    <div className="flex flex-wrap gap-2">
      {values.map((a) => (
        <a key={a} href={`/amper/${a}`} className="chip hover:bg-brand-gold/20">{a} Amper Akü</a>
      ))}
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
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-14">
      {logos.map((l) => (
        <img
          key={l.name}
          src={l.src}
          alt={`${l.name} akü`}
          loading="lazy"
          className="h-7 w-auto opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-8"
        />
      ))}
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
        <img src={post.cover || "/images/blog/bakim.svg"} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
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
  return (
    <section className="bg-brand-dark">
      <div className="container-x flex flex-col items-center gap-4 py-10 text-center text-white sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="text-2xl font-extrabold">{title || "Aküm bitti, hemen lazım!"}</h2>
          <p className="mt-1 text-white/80">{text || "İncek, Gölbaşı ve Ankara içi yerinde akü değişimi. Bizi arayın, gelelim."}</p>
        </div>
        <div className="flex shrink-0 gap-3">
          <a href={`tel:${site.phoneIntl}`} className="btn btn-gold">{site.phone}</a>
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn border-2 border-white text-white hover:bg-white hover:text-brand-dark">WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
