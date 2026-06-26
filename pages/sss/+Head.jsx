import { JsonLd } from "../../components/JsonLd.jsx";
import { faqJsonLd } from "../../lib/seo.js";
import { faqItems } from "./faq-data.js";

// FAQPage yapısal verisi → Google'da soru-cevap zengin sonucu.
export function Head() {
  return <JsonLd data={faqJsonLd(faqItems)} />;
}
