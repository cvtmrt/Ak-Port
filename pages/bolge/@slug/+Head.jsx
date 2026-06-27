import { usePageContext } from "vike-react/usePageContext";
import { JsonLd } from "../../../components/JsonLd.jsx";
import { localBusinessJsonLd, faqJsonLd, breadcrumbJsonLd } from "../../../lib/seo.js";

// Bölge sayfalarında LocalBusiness + Breadcrumb + (varsa) FAQ yapısal verisi.
export function Head() {
  const { data } = usePageContext();
  const d = data?.district;
  const faq = data?.content?.faq;
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      {d && (
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Anasayfa", url: "/" },
            { name: `${d.name} Akü`, url: `/bolge/${d.slug}` },
          ])}
        />
      )}
      {faq?.length > 0 && <JsonLd data={faqJsonLd(faq)} />}
    </>
  );
}
