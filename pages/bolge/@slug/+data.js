import { getDistrict, getFeatured, getCategories, getSiteSettings, getDistricts } from "../../../db/data.js";
import { getDistrictContent } from "../../../lib/district-content.js";
import { render } from "vike/abort";

export async function data(pageContext) {
  const district = await getDistrict(pageContext.routeParams.slug);
  if (!district) throw render(404, "Bölge bulunamadı");
  const [featured, categories, site, districts] = await Promise.all([
    getFeatured(),
    getCategories(),
    getSiteSettings(),
    getDistricts(),
  ]);
  const content = getDistrictContent(district.slug, district.name);
  // Diğer bölgeler (iç linkleme için), bu sayfa hariç.
  const otherDistricts = districts.filter((d) => d.slug !== district.slug);
  return { district, featured, categories, site, content, otherDistricts };
}
