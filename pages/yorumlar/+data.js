import { getReviews, getRatingSummary } from "../../db/data.js";

export async function data() {
  const [reviews, ratingSummary] = await Promise.all([getReviews(), getRatingSummary()]);
  return { reviews, ratingSummary };
}
