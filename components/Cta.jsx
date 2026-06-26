import { site } from "../lib/site.js";
import { usePublicConfig } from "../lib/public-config-client.js";
import { PhoneIcon, WhatsappIcon } from "./icons.jsx";

const waLink = (text) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text || "Merhaba, akü hakkında bilgi almak istiyorum.")}`;

export function CallButton({ className = "", label = "Hemen Ara" }) {
  const { site: currentSite } = usePublicConfig();
  return (
    <a href={`tel:${currentSite.phoneIntl}`} className={`btn btn-gold ${className}`}>
      <PhoneIcon /> {label} · {currentSite.phone}
    </a>
  );
}

export function WhatsappButton({ className = "", text, label = "WhatsApp" }) {
  const { site: currentSite } = usePublicConfig();
  return (
    <a href={`https://wa.me/${currentSite.whatsapp}?text=${encodeURIComponent(text || "Merhaba, akü hakkında bilgi almak istiyorum.")}`} target="_blank" rel="noopener noreferrer" className={`btn btn-dark ${className}`}>
      <WhatsappIcon /> {label}
    </a>
  );
}

// Sol altta sabit yüzen WhatsApp butonu (tüm ekranlarda).
export function FloatingActions() {
  const { site: currentSite } = usePublicConfig();
  return (
    <>
      <a
        href={`https://wa.me/${currentSite.whatsapp}?text=${encodeURIComponent("Merhaba, akü hakkında bilgi almak istiyorum.")}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ile yaz"
        className="group fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-3 text-white shadow-lg shadow-black/20 transition-all hover:pr-5 hover:shadow-xl"
      >
        <WhatsappIcon width={28} height={28} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-[120px] group-hover:opacity-100">
          WhatsApp
        </span>
      </a>
      {/* Mobilde hızlı arama butonu (sağ alt) */}
      <a
        href={`tel:${currentSite.phoneIntl}`}
        aria-label="Telefon ile ara"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold text-brand-dark shadow-lg shadow-black/20 transition-transform hover:scale-105 md:hidden"
      >
        <PhoneIcon width={26} height={26} />
      </a>
    </>
  );
}
