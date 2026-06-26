export default (pageContext) => {
  const p = pageContext.data.product;
  return `${p.name} - ${p.amper} amper ${p.brand} akü. ${p.shortDesc || ""} İncek, Gölbaşı ve Ankara'da yerinde montaj. Fiyat ve stok için arayın.`;
};
