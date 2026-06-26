import { getProducts, getCategories, getAmperValues } from "../../db/data.js";

export async function data() {
  const [products, categories, amper] = await Promise.all([getProducts(), getCategories(), getAmperValues()]);
  return { products, categories, amper };
}
