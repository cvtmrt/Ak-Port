import { getFeatured, getCategories, getAmperValues, getReviews, getRatingSummary, getHomeContent, getBrands } from "../../db/data.js";

export async function data() {
  const [featured, categories, amper, reviews, ratingSummary, home, brands] = await Promise.all([
    getFeatured(),
    getCategories(),
    getAmperValues(),
    getReviews(),
    getRatingSummary(),
    getHomeContent(),
    getBrands(),
  ]);
  return {
    featured,
    categories,
    amper,
    reviews,
    ratingSummary,
    home,
    brands,
  };
}
