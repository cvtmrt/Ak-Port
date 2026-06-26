export default (pageContext) => {
  const p = pageContext.data.product;
  return `${p.name} (${p.amper} Ah) | AKÜPORT İncek - Gölbaşı`;
};
