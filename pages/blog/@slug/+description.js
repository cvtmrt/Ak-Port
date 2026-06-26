export default (pageContext) =>
  pageContext.data.post.excerpt || pageContext.data.post.title;
