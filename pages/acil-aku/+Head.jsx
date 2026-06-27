import { usePageContext } from "vike-react/usePageContext";
import { JsonLd } from "../../components/JsonLd.jsx";
import { localBusinessJsonLd, faqJsonLd, breadcrumbJsonLd } from "../../lib/seo.js";

// Acil akü landing: LocalBusiness + Breadcrumb + FAQ yapısal verisi.
export function Head() {
  const { data } = usePageContext();
  const faq = data?.faq;
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Anasayfa", url: "/" },
          { name: "Acil Akü", url: "/acil-aku" },
        ])}
      />
      {faq?.length > 0 && <JsonLd data={faqJsonLd(faq)} />}
    </>
  );
}
