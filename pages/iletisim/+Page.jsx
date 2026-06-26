import { useData } from "vike-react/useData";
import { CallButton, WhatsappButton } from "../../components/Cta.jsx";
import { PhoneIcon, MailIcon, PinIcon, ClockIcon, InstagramIcon } from "../../components/icons.jsx";
import { Breadcrumbs, SectionTitle } from "../../components/blocks.jsx";

export default function Page() {
  const { site } = useData();
  const mapEmbed = `https://maps.google.com/maps?q=${site.address.lat},${site.address.lng}&z=15&output=embed`;

  return (
    <>
      <Breadcrumbs items={[{ name: "Anasayfa", url: "/" }, { name: "İletişim", url: "/iletisim" }]} />

      <section className="container-x py-10">
        <SectionTitle kicker="Bize Ulaşın" title="İletişim & Konum" desc={`${site.legalName}. İncek ve Gölbaşı'nda akü, yerinde montaj ve acil akü.`} />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <a href={`tel:${site.phoneIntl}`} className="flex items-center gap-3 rounded-xl border border-brand-dark/10 bg-white p-4 hover:border-brand-gold">
              <span className="rounded-lg bg-brand-gold/15 p-2 text-brand-gold"><PhoneIcon /></span>
              <div><div className="text-sm text-brand-navy/60">Telefon / WhatsApp</div><div className="font-bold text-brand-dark">{site.phone}</div></div>
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 rounded-xl border border-brand-dark/10 bg-white p-4 hover:border-brand-gold">
              <span className="rounded-lg bg-brand-gold/15 p-2 text-brand-gold"><MailIcon /></span>
              <div><div className="text-sm text-brand-navy/60">E-posta</div><div className="font-bold text-brand-dark">{site.email}</div></div>
            </a>
            {site.social.instagram && (
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-brand-dark/10 bg-white p-4 hover:border-brand-gold">
                <span className="rounded-lg bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] p-2 text-white"><InstagramIcon /></span>
                <div><div className="text-sm text-brand-navy/60">Instagram</div><div className="font-bold text-brand-dark">@akuportankara</div></div>
              </a>
            )}
            <div className="flex items-start gap-3 rounded-xl border border-brand-dark/10 bg-white p-4">
              <span className="rounded-lg bg-brand-gold/15 p-2 text-brand-gold"><PinIcon /></span>
              <div><div className="text-sm text-brand-navy/60">Adres</div><div className="font-bold text-brand-dark">{site.address.street}</div><div className="text-brand-navy/80">{site.address.district}/{site.address.city}</div></div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-brand-dark/10 bg-white p-4">
              <span className="rounded-lg bg-brand-gold/15 p-2 text-brand-gold"><ClockIcon /></span>
              <div className="w-full">
                <div className="text-sm text-brand-navy/60">Çalışma Saatleri</div>
                <ul className="mt-1 divide-y divide-brand-dark/5">
                  {site.hours.days.map((h) => (
                    <li key={h.day} className="flex items-center justify-between py-1 text-sm">
                      <span className="text-brand-navy/80">{h.day}</span>
                      <span className="font-semibold text-brand-dark">{h.open}–{h.close}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <CallButton />
              <WhatsappButton />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand-dark/10">
            <iframe
              title="AKÜPORT Konum"
              src={mapEmbed}
              width="100%"
              height="100%"
              style={{ minHeight: "380px", border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
