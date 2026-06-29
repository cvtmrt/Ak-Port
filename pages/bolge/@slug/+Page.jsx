import { useData } from "vike-react/useData";
import { CallButton, WhatsappButton } from "../../../components/Cta.jsx";
import { CheckIcon, PinIcon } from "../../../components/icons.jsx";
import { MapEmbed } from "../../../components/MapEmbed.jsx";
import { Breadcrumbs, SectionTitle, CategoryGrid, ProductGrid, CtaBand, Faq, DistrictLinks } from "../../../components/blocks.jsx";

export default function Page() {
  const { district: d, featured, categories, site, content, otherDistricts } = useData();
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: `${d.name} Akü`, url: `/bolge/${d.slug}` }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-12">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{d.name} Akü &amp; Yerinde Akü Değişimi</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80">{d.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CallButton />
            <WhatsappButton text={`Merhaba, ${d.name} bölgesinde akü değişimi için yardım istiyorum.`} />
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
            {["Yerinde akü değişimi", "Ücretsiz montaj", "7/24 acil akü", "Eski akü takas"].map((t) => (
              <li key={t} className="flex items-center gap-1.5"><CheckIcon width={16} height={16} className="text-brand-gold" /> {t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Zengin, bölgeye özgü içerik (SEO metni) */}
      <section className="container-x py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {content.sections.map((s) => (
              <article key={s.h2}>
                <h2 className="text-2xl font-extrabold text-brand-dark">{s.h2}</h2>
                <p className="mt-3 leading-relaxed text-brand-navy/80">{s.body}</p>
              </article>
            ))}

            {content.neighborhoods?.length > 0 && (
              <div>
                <h2 className="text-2xl font-extrabold text-brand-dark">{d.name}'da Hizmet Verdiğimiz Bölgeler</h2>
                <p className="mt-3 text-brand-navy/80">
                  {d.name} ve çevresindeki şu bölge ve mahallelere yerinde akü değişimi için geliyoruz:
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {content.neighborhoods.map((n) => (
                    <span key={n} className="chip inline-flex items-center gap-1.5">
                      <PinIcon width={14} height={14} className="text-brand-gold" /> {n}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sağ sütun: hızlı iletişim + konum */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-brand-dark/10 bg-white p-6">
              <h2 className="text-lg font-bold text-brand-dark">{d.name}'da aküm bitti, hemen lazım</h2>
              <p className="mt-2 text-sm text-brand-navy/70">
                Bulunduğunuz yere gelip doğru aküyü takıyoruz. Hemen arayın veya WhatsApp'tan yazın.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <CallButton className="w-full justify-center" />
                <WhatsappButton className="w-full justify-center" text={`Merhaba, ${d.name} bölgesindeyim, akü için yardım istiyorum.`} />
              </div>
            </div>
            <MapEmbed
              lat={site.address?.lat}
              lng={site.address?.lng}
              title={`${site.name} konum`}
            />
          </aside>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-x">
          <SectionTitle title={`${d.name}'da Hangi Aküleri Buluruz?`} desc="Otomobil, ticari araç, kamyon ve motosiklet aküsünde tüm marka ve amperler." />
          <CategoryGrid categories={categories} />
        </div>
      </section>

      <section className="container-x py-10">
        <SectionTitle kicker="Popüler" title={`${d.name} İçin Önerilen Aküler`} />
        <ProductGrid products={featured} />
      </section>

      {/* Bölgeye özel SSS (FAQ JSON-LD +Head.jsx içinde) */}
      {content.faq?.length > 0 && (
        <section className="bg-white py-10">
          <div className="container-x">
            <SectionTitle kicker="Sık Sorulanlar" title={`${d.name} Akü Hakkında Sık Sorulan Sorular`} />
            <Faq items={content.faq} />
          </div>
        </section>
      )}

      <section className="container-x py-10">
        <div className="rounded-2xl border border-brand-dark/10 bg-white p-6">
          <h2 className="text-xl font-bold text-brand-dark">{d.name} Akücü · AKÜPORT</h2>
          <p className="mt-2 text-brand-navy/80">
            {site.legalName} olarak {d.name} ve çevresine hızlı akü hizmeti veriyoruz. Aküm bitti, aracım çalışmıyor diyorsanız
            bulunduğunuz yere gelir, doğru aküyü takıp eski akünüzü alırız. Mağazamız: {site.address.street}, {site.address.district}/{site.address.city}.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <CallButton />
            <a href={site.social.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Haritada Gör</a>
          </div>
        </div>
      </section>

      {/* Diğer bölgeler (iç linkleme) */}
      {otherDistricts?.length > 0 && (
        <section className="bg-white py-10">
          <div className="container-x">
            <SectionTitle title="Diğer Bölgelerde de Hizmetinizdeyiz" desc="Aşağıdaki bölgelere de yerinde akü değişimi ve acil akü hizmeti veriyoruz." />
            <DistrictLinks districts={otherDistricts} />
          </div>
        </section>
      )}

      <CtaBand title={`${d.name}'da aküm bitti!`} text="Hemen arayın, en kısa sürede yanınızdayız." />
    </>
  );
}
