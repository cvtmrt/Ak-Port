import { JsonLd } from "../../components/JsonLd.jsx";
import { localBusinessJsonLd } from "../../lib/seo.js";

export function Head() {
  return <JsonLd data={localBusinessJsonLd()} />;
}
