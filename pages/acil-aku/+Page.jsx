import { site } from "../../lib/site.js";
import { CallButton, WhatsappButton } from "../../components/Cta.jsx";
import { PhoneIcon, BoltIcon } from "../../components/icons.jsx";
import { Breadcrumbs, SectionTitle, Faq, CtaBand } from "../../components/blocks.jsx";

const steps = [
  { n: "1", t: "Arayın", d: "Konumunuzu ve aracınızın marka-modelini söyleyin." },
  { n: "2", t: "Yola çıkalım", d: "Uygun aküyle bulunduğunuz yere geliyoruz." },
  { n: "3", t: "Yerinde montaj", d: "Yeni aküyü takıp aracınızı çalıştırıyoruz." },
  { n: "4", t: "Eski akü takas", d: "Eski akünüzü alıp fiyattan düşüyoruz." },
];

const faq = [
  { q: "Ne kadar sürede gelirsiniz?", a: "İncek, Gölbaşı ve yakın bölgelerde en kısa sürede yanınızdayız. Yoğunluğa göre süreyi telefonda netleştiririz." },
  { q: "Gece de hizmet var mı?", a: "Acil akü hattımız 7/24 açıktır. Mesai dışı acil durumlar için arayın." },
  { q: "Kart ile ödeme olur mu?", a: "Evet, nakit ve kredi kartı ile ödeme alınır." },
];

export default function Page() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Acil Akü", url: "/acil-aku" }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-12">
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

      <section className="bg-white py-10">
        <div className="container-x">
          <SectionTitle kicker="Hizmet Kapsamı" title="Ankara'nın Her Yerine Geliyoruz" desc="İncek, Gölbaşı, Beytepe, Çayyolu ve Ümitköy başta olmak üzere Ankara'nın tüm ilçelerine yerinde akü hizmeti." />
          <div className="flex flex-wrap gap-3">
            <CallButton />
            <WhatsappButton text="Acil! Konumum Ankara'da, yerinde akü değişimi lazım." />
          </div>
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
