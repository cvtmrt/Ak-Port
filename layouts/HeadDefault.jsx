import { usePageContext } from "vike-react/usePageContext";
import { site } from "../lib/site.js";
import { abs } from "../lib/seo.js";

// Tüm sayfalarda <head>'e eklenen varsayılan etiketler.
export default function Head() {
  const pageContext = usePageContext();
  const path = pageContext?.urlPathname || "/";
  const isPanel = path.startsWith("/panel");
  const canonical = abs(path === "/" ? "" : path);
  const ogImage = abs("/images/og-default.png");

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
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />

      {/* Yerel sinyaller */}
      <meta name="geo.region" content="TR-06" />
      <meta name="geo.placename" content="Gölbaşı, Ankara" />

      {/* İkonlar */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </>
  );
}
