import { getPosts } from "../../db/data.js";

export async function data() {
  return { posts: await getPosts() };
}
