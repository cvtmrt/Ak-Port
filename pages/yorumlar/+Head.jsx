import { usePageContext } from "vike-react/usePageContext";
import { JsonLd } from "../../components/JsonLd.jsx";
import { localBusinessJsonLd } from "../../lib/seo.js";

export function Head() {
  const { data } = usePageContext();
  return (
    <JsonLd
      data={localBusinessJsonLd({
        ratingSummary: data?.ratingSummary,
        reviews: data?.reviews,
      })}
    />
  );
}
