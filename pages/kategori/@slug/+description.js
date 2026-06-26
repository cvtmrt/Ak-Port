export default (pageContext) => {
  const c = pageContext.data.category;
  return `${c.name} çeşitleri ve fiyatları. ${c.intro} İncek, Gölbaşı ve Ankara'da yerinde montaj ile.`;
};
