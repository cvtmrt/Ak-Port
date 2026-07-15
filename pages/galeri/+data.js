import { getGallery } from "../../db/data.js";

export async function data() {
  const gallery = await getGallery();
  return { gallery };
}
