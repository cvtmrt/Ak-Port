import { getSiteSettings } from "../../db/data.js";

export async function data() {
  return { site: await getSiteSettings() };
}
