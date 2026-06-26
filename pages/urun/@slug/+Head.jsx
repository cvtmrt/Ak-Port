import { usePageContext } from "vike-react/usePageContext";
import { JsonLd } from "../../../components/JsonLd.jsx";
import { productJsonLd, breadcrumbJsonLd } from "../../../lib/seo.js";
import { productImage } from "../../../lib/images.js";

export function Head() {
  const { data } = usePageContext();
  const p = data.product;
  return (
    <>
      <JsonLd data={productJsonLd(p)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Anasayfa", url: "/" },
          { name: "Ürünler", url: "/urunler" },
          { name: p.name, url: `/urun/${p.slug}` },
        ])}
      />
      <meta property="og:title" content={p.name} />
      <meta property="og:image" content={productImage(p)} />
    </>
  );
}
