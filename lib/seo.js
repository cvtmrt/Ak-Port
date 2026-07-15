// schema.org JSON-LD üreticileri ve mutlak URL yardımcıları.
import { site } from "./site.js";

export function abs(path = "") {
  return site.url.replace(/\/$/, "") + path;
}

export function localBusinessJsonLd({ ratingSummary, reviews, logoUrl } = {}) {
  const logo = logoUrl || abs(site.logo || "/images/og-default.png");
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    "@id": abs("/#business"),
    name: site.name,
    legalName: site.legalName,
    image: logo,
    url: site.url,
    telephone: site.phoneIntl,
    email: site.email,
    priceRange: "₺₺",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.district,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.lat,
      longitude: site.address.lng,
    },
    areaServed: site.serviceAreas.map((a) => ({ "@type": "City", name: a })),
    sameAs: [site.social.instagram].filter(Boolean),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:30",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "09:00",
        closes: "23:00",
      },
    ],
  };

  if (ratingSummary && ratingSummary.count > 0) {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: ratingSummary.average,
      reviewCount: ratingSummary.count,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (reviews && reviews.length) {
    data.review = reviews.slice(0, 10).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      reviewBody: r.text,
    }));
  }

  return data;
}

export function blogPostingJsonLd(post, logoUrl) {
  const logo = logoUrl || abs(site.logo || "/images/og-default.png");
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: abs(post.cover || "/images/og-default.png"),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: post.author || site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: logo },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(`/blog/${post.slug}`) },
  };
}

export function faqJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}
