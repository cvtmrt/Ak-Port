import { usePageContext } from "vike-react/usePageContext";
import { JsonLd } from "../../components/JsonLd.jsx";
import { localBusinessJsonLd, faqJsonLd, breadcrumbJsonLd, abs } from "../../lib/seo.js";

// Acil akü landing: LocalBusiness + Breadcrumb + FAQ yapısal verisi.
export function Head() {
  const { data, seo } = usePageContext();
  const faq = data?.faq;
  const logoUrl = seo?.logo ? abs(seo.logo) : undefined;
  return (
    <>
      <JsonLd data={localBusinessJsonLd({ logoUrl })} />
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
