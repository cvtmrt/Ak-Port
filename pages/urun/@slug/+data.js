import { getProductBySlug, getRelated } from "../../../db/data.js";
import { render } from "vike/abort";

export async function data(pageContext) {
  const product = await getProductBySlug(pageContext.routeParams.slug);
  if (!product) throw render(404, "Ürün bulunamadı");
  const related = await getRelated(product);
  return { product, related };
}
