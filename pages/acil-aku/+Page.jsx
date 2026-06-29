import { useData } from "vike-react/useData";
import { CallButton, WhatsappButton } from "../../components/Cta.jsx";
import { PhoneIcon, BoltIcon } from "../../components/icons.jsx";
import { MapEmbed } from "../../components/MapEmbed.jsx";
import { Breadcrumbs, SectionTitle, Faq, CtaBand, TrustBadges } from "../../components/blocks.jsx";

const steps = [
  { n: "1", t: "Arayın", d: "Konumunuzu ve aracınızın marka-modelini söyleyin." },
  { n: "2", t: "Yola çıkalım", d: "Uygun aküyle bulunduğunuz yere geliyoruz." },
  { n: "3", t: "Yerinde montaj", d: "Yeni aküyü takıp aracınızı çalıştırıyoruz." },
  { n: "4", t: "Eski akü takas", d: "Eski akünüzü alıp fiyattan düşüyoruz." },
];

export default function Page() {
  const { site, faq } = useData();
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Acil Akü", url: "/acil-aku" }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x grid items-center gap-8 py-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/15 px-3 py-1 text-sm font-semibold text-brand-gold"><BoltIcon width={16} height={16} /> 7/24 Acil Akü Hattı</span>
            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Aküm Bitti, Aracım Çalışmıyor!</h1>
            <p className="mt-3 max-w-2xl text-lg text-white/80">
              En yakın akücü olarak bulunduğunuz yere gelir, yerinde akü değişimi yaparız. Yolda kalmayın, hemen arayın.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${site.phoneIntl}`} className="btn btn-gold text-lg"><PhoneIcon /> {site.phone}</a>
              <WhatsappButton text="Acil! Aküm bitti, yerinde akü değişimi lazım." />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img
              src="/images/acil-aku-afis.jpeg"
              alt="AKÜPORT yerinde akü değişimi - 7/24 mobil akü servisi"
              width="1254"
              height="1254"
              fetchpriority="high"
              decoding="async"
              className="w-full max-w-md rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="container-x py-10">
        <SectionTitle kicker="Nasıl Çalışır?" title="4 Adımda Yerinde Akü Değişimi" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-xl border border-brand-dark/10 bg-white p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold font-extrabold text-brand-dark">{s.n}</div>
              <h3 className="mt-3 font-bold text-brand-dark">{s.t}</h3>
              <p className="mt-1 text-sm text-brand-navy/70">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-10">
        <SectionTitle kicker="Neden AKÜPORT?" title="Yolda Kalmadan, Güvenle" />
        <TrustBadges />
      </section>

      <section className="bg-white py-10">
        <div className="container-x grid items-center gap-8 lg:grid-cols-2">
          <div>
            <SectionTitle kicker="Hizmet Kapsamı" title="Ankara'nın Her Yerine Geliyoruz" desc="İncek, Gölbaşı, Beytepe, Çayyolu ve Ümitköy başta olmak üzere Ankara'nın tüm ilçelerine yerinde akü hizmeti." />
            <div className="flex flex-wrap gap-3">
              <CallButton />
              <WhatsappButton text="Acil! Konumum Ankara'da, yerinde akü değişimi lazım." />
            </div>
          </div>
          <MapEmbed
            query={site.address?.mapQuery}
            lat={site.address?.lat}
            lng={site.address?.lng}
            title={`${site.name} konum`}
          />
        </div>
      </section>

      <section className="container-x py-10">
        <SectionTitle title="Sık Sorulanlar" />
        <Faq items={faq} />
      </section>

      <CtaBand title="Yolda kalmayın!" text="7/24 acil akü hattımızı arayın, hemen gelelim." />
    </>
  );
}
