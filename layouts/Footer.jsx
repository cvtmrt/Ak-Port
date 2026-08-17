import { brandNames, districts } from "../lib/site.js";
import { usePublicConfig } from "../lib/public-config-client.js";
import { PhoneIcon, MailIcon, PinIcon, ClockIcon, InstagramIcon } from "../components/icons.jsx";

export function Footer() {
  const { site: currentSite, brands: currentBrands, districts: currentDistricts } = usePublicConfig();
  const footerBrands = Array.isArray(currentBrands) ? currentBrands.map((b) => b.name) : brandNames;
  const footerDistricts = Array.isArray(currentDistricts) ? currentDistricts : districts;
  return (
    <footer className="mt-16 bg-brand-dark text-white/80">
      <div className="container-x grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="mb-3 text-lg font-bold text-white">{currentSite.name}</h3>
          <p className="text-sm leading-relaxed">{currentSite.legalName}. İncek ve Gölbaşı'nda akü satışı, yerinde montaj ve acil akü hizmeti.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {footerBrands.map((b) => (
              <span key={b} className="rounded bg-white/10 px-2 py-1 text-xs">{b}</span>
            ))}
          </div>
          {currentSite.social?.instagram && (
            <a
              href={currentSite.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram'da takip et"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <InstagramIcon width={18} height={18} /> @akuportankara
            </a>
          )}
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Hizmet Bölgeleri</h4>
          <ul className="space-y-2 text-sm">
            {footerDistricts.map((d) => (
              <li key={d.slug}><a href={`/bolge/${d.slug}`} className="hover:text-brand-gold">{d.name} Akü</a></li>
            ))}
          </ul>
          <h4 className="mb-3 mt-6 font-semibold text-white">Bilgi</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/blog" className="hover:text-brand-gold">Blog</a></li>
            <li><a href="/bilgi/aku-nedir" className="hover:text-brand-gold">Akü Nedir?</a></li>
            <li><a href="/bilgi/teknik-bilgiler" className="hover:text-brand-gold">Teknik Bilgiler</a></li>
            <li><a href="/bilgi/aku-takviyesi" className="hover:text-brand-gold">Akü Takviyesi</a></li>
            <li><a href="/sss" className="hover:text-brand-gold">S.S.S.</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">İletişim</h4>
          <ul className="space-y-3 text-sm">
            <li><a href={`tel:${currentSite.phoneIntl}`} className="flex items-center gap-2 hover:text-brand-gold"><PhoneIcon width={16} height={16} /> {currentSite.phone}</a></li>
            <li><a href={`mailto:${currentSite.email}`} className="flex items-center gap-2 hover:text-brand-gold"><MailIcon width={16} height={16} /> {currentSite.email}</a></li>
            <li className="flex items-start gap-2"><PinIcon width={16} height={16} className="mt-0.5 shrink-0" /> <span>{currentSite.address?.street}, {currentSite.address?.district}/{currentSite.address?.city}</span></li>
            <li className="flex items-center gap-2"><ClockIcon width={16} height={16} /> {currentSite.hours?.text}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="container-x flex flex-col items-center justify-between gap-2 text-xs text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} {currentSite.name} · {currentSite.legalName}</span>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a href="/hakkimizda" className="hover:text-brand-gold">Hakkımızda</a>
            <a href="/neden-biz" className="hover:text-brand-gold">Neden Biz?</a>
            <a href="/gizlilik" className="hover:text-brand-gold">Gizlilik &amp; KVKK</a>
            <a href="/iletisim" className="hover:text-brand-gold">İletişim</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
