import { districts } from "../../../lib/site.js";
import { getFeatured, getCategories } from "../../../db/data.js";
import { render } from "vike/abort";

export async function data(pageContext) {
  const district = districts.find((d) => d.slug === pageContext.routeParams.slug);
  if (!district) throw render(404, "Bölge bulunamadı");
  const featured = await getFeatured();
  return { district, featured, categories: getCategories() };
}
