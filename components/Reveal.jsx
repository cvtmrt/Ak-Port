import { useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";

// Global scroll-in yöneticisi. <main> içindeki section'ları görünüm alanına
// girdikçe yumuşakça belirtir. rAF ile throttle edilmiş scroll dinleyici
// kullanır (her ortamda güvenilir; içerik asla gizli takılı kalmaz).
// Titreme olmaması için: önce görünürdekiler is-visible yapılır, SONRA
// reveal-ready açılır.
export function RevealManager() {
  const { urlPathname } = usePageContext();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll("main section"));
    if (!els.length) return;

    let ticking = false;

    const reveal = () => {
      ticking = false;
      const vh = window.innerHeight || 800;
      let remaining = false;
      for (const el of els) {
        if (el.classList.contains("is-visible")) continue;
        if (el.getBoundingClientRect().top < vh * 0.88) {
          el.classList.add("is-visible");
        } else {
          remaining = true;
        }
      }
      if (!remaining) cleanup();
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(reveal);
      }
    };

    function cleanup() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }

    // 1) Ekranda olanları (titreme olmadan) görünür işaretle
    reveal();
    // 2) Gizleme kuralını aktive et (sadece ekran dışındakiler gizlenir)
    document.documentElement.classList.add("reveal-ready");
    // 3) Kaydırma/yeniden boyutlandırmada kalanları belirt
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    // Güvenlik ağı: olası bir aksilikte içerik gizli kalmasın
    const safety = setTimeout(reveal, 1500);

    return () => {
      cleanup();
      clearTimeout(safety);
    };
  }, [urlPathname]);

  return null;
}
