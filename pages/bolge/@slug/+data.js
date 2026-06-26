import { getDistrict, getFeatured, getCategories, getSiteSettings } from "../../../db/data.js";
import { render } from "vike/abort";

export async function data(pageContext) {
  const district = await getDistrict(pageContext.routeParams.slug);
  if (!district) throw render(404, "Bölge bulunamadı");
  const [featured, categories, site] = await Promise.all([getFeatured(), getCategories(), getSiteSettings()]);
  return { district, featured, categories, site };
}
