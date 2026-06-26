import { getContentPage } from "../../db/data.js";

export async function data() {
  return { page: await getContentPage("sss") };
}
