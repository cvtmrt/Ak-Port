import { useData } from "vike-react/useData";
import { CallButton, WhatsappButton } from "../../components/Cta.jsx";
import { CheckIcon } from "../../components/icons.jsx";
import {
  SectionTitle, TrustBadges, CategoryGrid, ProductGrid,
  AmperLinks, Faq, CtaBand, BrandStrip,
} from "../../components/blocks.jsx";
import { ReviewsSection } from "../../components/Reviews.jsx";

export default function Page() {
  const { featured, categories, amper, reviews, ratingSummary, home, brands } = useData();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-navy to-brand-darker" />
        <div className="container-x relative grid gap-8 py-14 lg:grid-cols-2 lg:py-20">
          <div className="flex flex-col justify-center">
            <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-brand-gold/15 px-3 py-1 text-sm font-semibold text-brand-gold">
              {home.heroBadge}
            </span>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {home.heroTitle1}<br />
              <span className="text-brand-gold">{home.heroTitle2}</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-white/80">
              {home.heroSubtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CallButton />
              <WhatsappButton text="Merhaba, akü değişimi için bilgi almak istiyorum." />
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
              {(home.heroFeatures || []).map((t) => (
                <li key={t} className="flex items-center gap-1.5"><CheckIcon width={16} height={16} className="text-brand-gold" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="relative flex items-center justify-center">
            {/* arka ışıltı (radyal parıltı) */}
            <div aria-hidden="true" className="pointer-events-none absolute h-72 w-72 rounded-full bg-brand-gold/25 blur-3xl sm:h-96 sm:w-96" />
            <div aria-hidden="true" className="pointer-events-none absolute h-48 w-48 rounded-full bg-brand-amber/20 blur-2xl" />
            <img
              src={home.heroImage || "/images/aku-hero.svg"}
              alt="AKÜPORT araç aküsü"
              width="280"
              height="250"
              fetchpriority="high"
              decoding="async"
              className="relative w-full max-w-xs animate-floaty rounded-2xl drop-shadow-2xl sm:max-w-md"
            />
          </div>
        </div>
      </section>

      <div className="container-x -mt-8 relative">
        <TrustBadges items={home.trustCards || []} />
      </div>

      {/* MARKA ŞERİDİ */}
      <section className="container-x pt-12">
        <p className="mb-5 text-center text-sm font-semibold uppercase tracking-wide text-brand-navy/50">
          {home.brandHeading}
        </p>
        <BrandStrip brands={brands} />
      </section>

      {/* KATEGORİLER */}
      <section className="container-x py-12">
        <SectionTitle kicker={home.catKicker} title={home.catTitle} desc={home.catDesc} />
        <CategoryGrid categories={categories} />
      </section>

      {/* ÖNE ÇIKAN ÜRÜNLER */}
      <section className="bg-white py-12">
        <div className="container-x">
          <SectionTitle kicker={home.featKicker} title={home.featTitle} desc={home.featDesc} />
          <ProductGrid products={featured} />
          <div className="mt-6">
            <a href="/urunler" className="btn btn-outline">Tüm Aküleri Gör →</a>
          </div>
        </div>
      </section>

      {/* AMPER HIZLI LİNKLER */}
      <section className="container-x py-12">
        <SectionTitle kicker={home.amperKicker} title={home.amperTitle} desc={home.amperDesc} />
        <AmperLinks values={amper} />
      </section>

      {/* HİZMET KAPSAMI */}
      <section className="bg-white py-12">
        <div className="container-x">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark to-brand-navy px-6 py-10 text-center text-white sm:px-10">
            <span className="text-sm font-bold uppercase tracking-wide text-brand-gold">{home.kapsamKicker}</span>
            <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">{home.kapsamTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/80">
              {home.kapsamText}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <CallButton />
              <WhatsappButton text="Merhaba, konumum Ankara'da. Yerinde akü değişimi için yardım istiyorum." />
            </div>
          </div>
        </div>
      </section>

      {/* YORUMLAR */}
      {reviews?.length > 0 && (
        <section className="bg-white py-12">
          <div className="container-x">
            <SectionTitle kicker="Müşteri Yorumları" title="Müşterilerimiz Ne Diyor?" desc="Gerçek müşteri değerlendirmeleri." />
            <ReviewsSection reviews={reviews} summary={ratingSummary} limit={6} />
            <div className="mt-6">
              <a href="/yorumlar" className="btn btn-outline">Tüm Yorumlar →</a>
            </div>
          </div>
        </section>
      )}

      {/* SSS */}
      <section className="container-x py-12">
        <SectionTitle kicker={home.sssKicker} title={home.sssTitle} />
        <Faq items={home.sssItems || []} />
      </section>

      <CtaBand title={home.ctaTitle} text={home.ctaText} />
    </>
  );
}
