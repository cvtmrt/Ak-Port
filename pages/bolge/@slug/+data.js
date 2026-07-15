import { getDistrict, getSiteSettings, getDistricts } from "../../../db/data.js";
import { getDistrictContent } from "../../../lib/district-content.js";
import { render } from "vike/abort";

export async function data(pageContext) {
  const district = await getDistrict(pageContext.routeParams.slug);
  if (!district) throw render(404, "Bölge bulunamadı");
  const [site, districts] = await Promise.all([
    getSiteSettings(),
    getDistricts(),
  ]);
  const content = getDistrictContent(district.slug, district.name);
  // Diğer bölgeler (iç linkleme için), bu sayfa hariç.
  const otherDistricts = districts.filter((d) => d.slug !== district.slug);
  return { district, site, content, otherDistricts };
}
