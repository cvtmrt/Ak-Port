import { JsonLd } from "../../../components/JsonLd.jsx";
import { localBusinessJsonLd } from "../../../lib/seo.js";

// Bölge sayfalarında da LocalBusiness verisi (yerel arama sinyali).
export function Head() {
  return <JsonLd data={localBusinessJsonLd()} />;
}
