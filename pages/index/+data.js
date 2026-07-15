import { getReviews, getRatingSummary, getHomeContent, getBrands } from "../../db/data.js";

export async function data() {
  const [reviews, ratingSummary, home, brands] = await Promise.all([
    getReviews(),
    getRatingSummary(),
    getHomeContent(),
    getBrands(),
  ]);
  return {
    reviews,
    ratingSummary,
    home,
    brands,
  };
}
