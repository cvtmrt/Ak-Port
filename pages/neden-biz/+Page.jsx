import { useData } from "vike-react/useData";
import { CallButton, WhatsappButton } from "../../components/Cta.jsx";
import { CheckIcon, ClockIcon, ShieldIcon, BoltIcon, PinIcon, BatteryIcon } from "../../components/icons.jsx";
import { Breadcrumbs, SectionTitle, CtaBand } from "../../components/blocks.jsx";

const reasons = [
  { icon: PinIcon, title: "Yerinde Hizmet", text: "Aracınıza geliyoruz; akünüzü bulunduğunuz yerde değiştiriyoruz. Servise gelmenize gerek yok." },
  { icon: ClockIcon, title: "7/24 Acil Akü", text: "Aküm bitti dediğiniz anda yola çıkıyoruz. Gece gündüz acil akü desteği." },
  { icon: ShieldIcon, title: "Garantili Aküler", text: "Yalnızca orijinal, üretici garantili aküler satıyoruz. Garanti süresini satışta belirtiyoruz." },
  { icon: BoltIcon, title: "Tüm Marka ve Amperler", text: "Mutlu, Varta, Bosch, İnci, Turbo, President… Otomobilden kamyona her amper stoğumuzda." },
  { icon: BatteryIcon, title: "Eski Akü Takas", text: "Eski akünüzü hurda değerinde alıp yeni akü fiyatından düşüyoruz." },
  { icon: CheckIcon, title: "Doğru Akü Önerisi", text: "Aracınıza uygun amper ve teknolojiyi (EFB/AGM/standart) uzman desteğiyle öneriyoruz." },
];

export default function Page() {
  const { page } = useData();
  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "Kurumsal", url: "/neden-biz" }, { name: "Neden Biz?", url: "/neden-biz" }]} />

      <section className="bg-brand-dark text-white">
        <div className="container-x py-12">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{page?.title || "Neden AKÜPORT?"}</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/80">
            {page?.subtitle || "Ankara'da akü alırken hız, güven ve doğru ürün önemlidir. İşte bizi tercih etmeniz için nedenler."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CallButton />
            <WhatsappButton text="Merhaba, akü hakkında bilgi almak istiyorum." />
          </div>
        </div>
      </section>

      <section className="container-x py-12">
        {page?.content ? (
          <div className="rounded-xl border border-brand-dark/10 bg-white p-6 text-brand-navy/80" dangerouslySetInnerHTML={{ __html: page.content }} />
        ) : (
        <>
          <SectionTitle kicker="Avantajlar" title="Bizi Farklı Kılan Ne?" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-xl border border-brand-dark/10 bg-white p-6">
              <span className="inline-flex rounded-lg bg-brand-gold/15 p-3 text-brand-gold"><r.icon width={24} height={24} /></span>
              <h3 className="mt-4 text-lg font-bold text-brand-dark">{r.title}</h3>
              <p className="mt-1 text-brand-navy/70">{r.text}</p>
            </div>
          ))}
          </div>
        </>
        )}
      </section>

      <CtaBand title="Aklınızda soru mu var?" text="Bizi arayın; akünüze uygun çözümü hemen söyleyelim ve yerinde takalım." />
    </>
  );
}
