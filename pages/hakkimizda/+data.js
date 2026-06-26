import { getBrands, getContentPage, getSiteSettings } from "../../db/data.js";

export async function data() {
  const [page, site, brands] = await Promise.all([
    getContentPage("hakkimizda"),
    getSiteSettings(),
    getBrands(),
  ]);
  return { page, site, brands };
}
