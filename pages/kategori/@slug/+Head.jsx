import { usePageContext } from "vike-react/usePageContext";
import { JsonLd } from "../../../components/JsonLd.jsx";
import { breadcrumbJsonLd } from "../../../lib/seo.js";

export function Head() {
  const { data } = usePageContext();
  const c = data.category;
  return (
    <JsonLd
      data={breadcrumbJsonLd([
        { name: "Anasayfa", url: "/" },
        { name: "Ürünler", url: "/urunler" },
        { name: c.name, url: `/kategori/${c.slug}` },
      ])}
    />
  );
}
