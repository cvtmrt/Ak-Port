import { usePageContext } from "vike-react/usePageContext";
import { site } from "../lib/site.js";
import { abs } from "../lib/seo.js";

// Tüm sayfalarda <head>'e eklenen varsayılan etiketler.
export default function Head() {
  const pageContext = usePageContext();
  const path = pageContext?.urlPathname || "/";
  const isPanel = path.startsWith("/panel");
  const canonical = abs(path === "/" ? "" : path);
  const ogImage = abs("/images/acil-aku-afis.jpeg");
  const analytics = pageContext?.analytics || {};
  const { gaId, adsId } = analytics;

  // Yönetim paneli arama motorlarına kapalı.
  if (isPanel) {
    return (
      <>
        <meta name="theme-color" content="#0f172a" />
        <meta name="robots" content="noindex, nofollow" />
      </>
    );
  }

  return (
    <>
      <meta name="theme-color" content="#0d1b2a" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph (WhatsApp / Facebook paylaşım önizlemesi) */}
      <meta property="og:site_name" content={site.name} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="tr_TR" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1254" />
      <meta property="og:image:height" content="1254" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />

      {/* Yerel sinyaller */}
      <meta name="geo.region" content="TR-06" />
      <meta name="geo.placename" content="Gölbaşı, Ankara" />

      {/* İkonlar (Google arama sonucu + sekme ikonu) */}
      <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Google Analytics 4 + Google Ads (yalnızca ID tanımlıysa basılır) */}
      {(gaId || adsId) && (
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
      )}
      {(gaId || adsId) && (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId || adsId}`}
        />
      )}
      {(gaId || adsId) && (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${
              gaId ? `gtag('config','${gaId}');` : ""
            }${adsId ? `gtag('config','${adsId}');` : ""}`,
          }}
        />
      )}
    </>
  );
}
