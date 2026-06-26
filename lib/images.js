// Ürün görselini belirler. Ürünün kendi `image` alanı varsa ve genel
// placeholder değilse onu kullanır; aksi halde markaya göre üretilmiş
// telifsiz SVG görselini döndürür. Gerçek ürün fotoğrafları eklendiğinde
// seed-data.js'teki `image` alanını doldurmak yeterli.
const brandSlug = (brand = "") =>
  brand
    .toLocaleLowerCase("tr")
    .replace(/i̇/g, "i")
    .replace(/ı/g, "i")
    .replace(/ç/g, "c")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]/g, "");

const known = ["mutlu", "varta", "bosch", "inci", "turbo", "president"];

export function productImage(p) {
  if (p?.image && !p.image.includes("placeholder")) return p.image;
  const slug = brandSlug(p?.brand);
  return `/images/aku-${known.includes(slug) ? slug : "default"}.svg`;
}

// Galeri görselleri. Backend `images` dizisini doldurursa onu kullanır;
// aksi halde ana görsel + demo açı görselleriyle galeriyi gösterir.
export function productImages(p) {
  if (Array.isArray(p?.images) && p.images.length) return p.images;
  return [productImage(p), "/images/demo/aku-yan.svg", "/images/demo/aku-kutup.svg"];
}
