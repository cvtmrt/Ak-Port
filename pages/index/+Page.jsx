import { useData } from "vike-react/useData";
import { CallButton, WhatsappButton } from "../../components/Cta.jsx";
import { CheckIcon } from "../../components/icons.jsx";
import {
  SectionTitle, TrustBadges, CategoryGrid, ProductGrid,
  AmperLinks, Faq, CtaBand, BrandStrip,
} from "../../components/blocks.jsx";
import { AkuBulucu } from "../../components/AkuBulucu.jsx";
import { ReviewsSection } from "../../components/Reviews.jsx";

const faqItems = [
  { q: "Aküm bitti, yerinize gelir misiniz?", a: "Evet. İncek, Gölbaşı, Beytepe ve Çankaya başta olmak üzere Ankara içi yerinde akü değişimi yapıyoruz. Aracınız çalışmıyorsa bulunduğunuz yere gelir, yeni aküyü takıp eskisini alırız." },
  { q: "Hangi amper aküye ihtiyacım var?", a: "Aracınızın marka-modeli ve mevcut akünüzün amperini (örn. 60, 70 Ah) söylemeniz yeterli. Doğru amper ve teknolojiyi (standart, EFB, AGM) biz öneririz." },
  { q: "Start-stop araçlara normal akü takılır mı?", a: "Hayır. Start-stop sistemli araçlar EFB veya AGM akü ister. Yanlış akü hem performans düşürür hem ömrü kısaltır. Aracınıza uygun start-stop aküyü stoğumuzdan veririz." },
  { q: "Eski aküyü geri alıyor musunuz?", a: "Evet, eski akünüzü hurda olarak değerlendirip yeni akü fiyatından düşüyoruz." },
];

export default function Page() {
  const { featured, categories, amper, reviews, ratingSummary } = useData();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-navy to-brand-darker" />
        <div className="container-x relative grid gap-8 py-14 lg:grid-cols-2 lg:py-20">
          <div className="flex flex-col justify-center">
            <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-brand-gold/15 px-3 py-1 text-sm font-semibold text-brand-gold">
              ⚡ İncek · Gölbaşı · Ankara
            </span>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              İncek & Gölbaşı Akü<br />
              <span className="text-brand-gold">Yerinde Montaj & Acil Akü</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-white/80">
              Aküm bitti diyene en yakın akücü. Otomobil, ticari, kamyon ve motosiklet aküsünde tüm marka ve amperler, ücretsiz yerinde montaj ile.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CallButton />
              <WhatsappButton text="Merhaba, akü değişimi için bilgi almak istiyorum." />
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
              {["Ücretsiz yerinde montaj", "7/24 acil akü", "Eski akü takas"].map((t) => (
                <li key={t} className="flex items-center gap-1.5"><CheckIcon width={16} height={16} className="text-brand-gold" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="relative flex items-center justify-center">
            {/* arka ışıltı (radyal parıltı) */}
            <div aria-hidden="true" className="pointer-events-none absolute h-72 w-72 rounded-full bg-brand-gold/25 blur-3xl sm:h-96 sm:w-96" />
            <div aria-hidden="true" className="pointer-events-none absolute h-48 w-48 rounded-full bg-brand-amber/20 blur-2xl" />
            <img
              src="/images/aku-hero.svg"
              alt="AKÜPORT araç aküsü"
              className="relative w-64 animate-floaty drop-shadow-2xl sm:w-80"
            />
          </div>
        </div>
      </section>

      <div className="container-x -mt-8 relative">
        <TrustBadges />
      </div>

      {/* MARKA ŞERİDİ */}
      <section className="container-x pt-12">
        <p className="mb-5 text-center text-sm font-semibold uppercase tracking-wide text-brand-navy/50">
          Çalıştığımız Markalar
        </p>
        <BrandStrip />
      </section>

      {/* AKÜ BULUCU */}
      <section className="container-x pt-12">
        <SectionTitle kicker="Hangi Akü?" title="Aracına Uygun Aküyü Bul" desc="Marka ve modelini seç, doğru amper ve teknolojiyi önerelim." />
        <AkuBulucu />
      </section>

      {/* KATEGORİLER */}
      <section className="container-x py-12">
        <SectionTitle kicker="Akü Çeşitleri" title="Aracınıza Uygun Aküyü Seçin" desc="Araç tipine ve teknolojiye göre akü kategorileri." />
        <CategoryGrid categories={categories} />
      </section>

      {/* ÖNE ÇIKAN ÜRÜNLER */}
      <section className="bg-white py-12">
        <div className="container-x">
          <SectionTitle kicker="Öne Çıkanlar" title="Popüler Aküler" desc="En çok tercih edilen marka ve amperler." />
          <ProductGrid products={featured} />
          <div className="mt-6">
            <a href="/urunler" className="btn btn-outline">Tüm Aküleri Gör →</a>
          </div>
        </div>
      </section>

      {/* AMPER HIZLI LİNKLER */}
      <section className="container-x py-12">
        <SectionTitle kicker="Ampere Göre" title="Amper Değerine Göre Akü" desc="60, 70, 100, 180 amper... İhtiyacınız olan değeri seçin." />
        <AmperLinks values={amper} />
      </section>

      {/* HİZMET KAPSAMI */}
      <section className="bg-white py-12">
        <div className="container-x">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark to-brand-navy px-6 py-10 text-center text-white sm:px-10">
            <span className="text-sm font-bold uppercase tracking-wide text-brand-gold">Hizmet Kapsamı</span>
            <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">Ankara'nın Her Yerine Geliyoruz</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/80">
              İncek, Gölbaşı, Beytepe, Çayyolu ve Ümitköy başta olmak üzere Ankara'nın tüm ilçelerine yerinde akü değişimi ve acil yol yardım. Neredeyseniz, aküyle geliyoruz.
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
        <SectionTitle kicker="Sık Sorulanlar" title="Akü Hakkında Merak Edilenler" />
        <Faq items={faqItems} />
      </section>

      <CtaBand />
    </>
  );
}
