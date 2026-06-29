import { usePageContext } from "vike-react/usePageContext";
import { JsonLd } from "../../../components/JsonLd.jsx";
import { blogPostingJsonLd, breadcrumbJsonLd, abs } from "../../../lib/seo.js";

export function Head() {
  const { data, seo } = usePageContext();
  const p = data.post;
  const logoUrl = seo?.logo ? abs(seo.logo) : undefined;
  return (
    <>
      <JsonLd data={blogPostingJsonLd(p, logoUrl)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Anasayfa", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: p.title, url: `/blog/${p.slug}` },
        ])}
      />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={p.title} />
      {p.cover && <meta property="og:image" content={p.cover} />}
    </>
  );
}
