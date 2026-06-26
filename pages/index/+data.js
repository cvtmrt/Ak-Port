import { getFeatured, getCategories, getAmperValues, getReviews, getRatingSummary } from "../../db/data.js";

export async function data() {
  const [featured, amper, reviews, ratingSummary] = await Promise.all([
    getFeatured(),
    getAmperValues(),
    getReviews(),
    getRatingSummary(),
  ]);
  return {
    featured,
    categories: getCategories(),
    amper,
    reviews,
    ratingSummary,
  };
}
