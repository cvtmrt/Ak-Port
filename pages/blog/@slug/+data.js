import { getPostBySlug, getRecentPosts } from "../../../db/data.js";
import { render } from "vike/abort";

export async function data(pageContext) {
  const post = await getPostBySlug(pageContext.routeParams.slug);
  if (!post) throw render(404, "Yazı bulunamadı");
  const recent = await getRecentPosts(3, post.slug);
  return { post, recent };
}
