import { getByAmper, getAmperValues } from "../../../db/data.js";
import { render } from "vike/abort";

export async function data(pageContext) {
  const amper = Number(pageContext.routeParams.amper);
  if (!amper || Number.isNaN(amper)) throw render(404, "Geçersiz amper değeri");
  const [products, allAmper] = await Promise.all([getByAmper(amper), getAmperValues()]);
  return { amper, products, allAmper };
}
