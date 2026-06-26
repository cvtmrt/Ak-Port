import { getProducts, getCategories, getAmperValues } from "../../db/data.js";

export async function data() {
  const [products, amper] = await Promise.all([getProducts(), getAmperValues()]);
  return { products, categories: getCategories(), amper };
}
