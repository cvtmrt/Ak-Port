import { useEffect } from "react";
import { usePageContext } from "vike-react/usePageContext";

// Sayfadaki tüm telefon (tel:) ve WhatsApp (wa.me) tıklamalarını tek bir
// delege edilmiş dinleyici ile yakalar ve GA4 olayı + Google Ads dönüşümü
// olarak raporlar. Böylece her butona ayrı ayrı onClick eklemek gerekmez.
export function Analytics() {
  const { analytics } = usePageContext();

  useEffect(() => {
    if (!analytics || (!analytics.gaId && !analytics.adsId)) return;

    function onClick(event) {
      const link = event.target.closest && event.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        report("phone_call", analytics.callLabel);
      } else if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
        report("whatsapp_click", analytics.whatsappLabel);
      }
    }

    function report(eventName, conversionLabel) {
      if (typeof window.gtag !== "function") return;
      // GA4 etkileşim olayı
      window.gtag("event", eventName);
      // Google Ads dönüşümü (kimlik + etiket tanımlıysa)
      if (analytics.adsId && conversionLabel) {
        window.gtag("event", "conversion", {
          send_to: `${analytics.adsId}/${conversionLabel}`,
        });
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [analytics]);

  return null;
}

// Form gönderimi gibi özel dönüşümleri elle tetiklemek için yardımcı.
// Örnek: trackConversion(analytics, analytics.formLabel, "form_submit")
export function trackConversion(analytics, conversionLabel, eventName = "conversion") {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (eventName) window.gtag("event", eventName);
  if (analytics?.adsId && conversionLabel) {
    window.gtag("event", "conversion", {
      send_to: `${analytics.adsId}/${conversionLabel}`,
    });
  }
}
