import { usePageContext } from "vike-react/usePageContext";
import { JsonLd } from "../../components/JsonLd.jsx";
import { localBusinessJsonLd, abs } from "../../lib/seo.js";

// Ana sayfada LocalBusiness + AggregateRating + Review yapısal verisi.
export function Head() {
  const { data, seo } = usePageContext();
  const logoUrl = seo?.logo ? abs(seo.logo) : undefined;
  return (
    <JsonLd
      data={localBusinessJsonLd({
        ratingSummary: data?.ratingSummary,
        reviews: data?.reviews,
        logoUrl,
      })}
    />
  );
}
