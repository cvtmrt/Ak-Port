import { getCategory, getByCategory, getAmperValues } from "../../../db/data.js";
import { render } from "vike/abort";

export async function data(pageContext) {
  const slug = pageContext.routeParams.slug;
  const category = getCategory(slug);
  if (!category) throw render(404, "Kategori bulunamadı");
  const [products, amper] = await Promise.all([getByCategory(slug), getAmperValues()]);
  return { category, products, amper };
}
