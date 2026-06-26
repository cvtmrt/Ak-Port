import { getDistrict, getFeatured, getCategories } from "../../../db/data.js";
import { render } from "vike/abort";

export async function data(pageContext) {
  const district = await getDistrict(pageContext.routeParams.slug);
  if (!district) throw render(404, "Bölge bulunamadı");
  const [featured, categories] = await Promise.all([getFeatured(), getCategories()]);
  return { district, featured, categories };
}
