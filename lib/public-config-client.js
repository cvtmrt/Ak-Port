import { useEffect, useState } from "react";
import { site, brandNames, districts } from "./site.js";
import { homeDefaults, designDefaults } from "./panel-schema.js";

const fallback = {
  site,
  home: homeDefaults,
  design: designDefaults,
  brands: brandNames.map((name) => ({ name, logo: `/images/brands/${name.toLocaleLowerCase("tr-TR").replaceAll("ı", "i")}.svg` })),
  districts,
};

let cached = null;

export function usePublicConfig() {
  const [config, setConfig] = useState(cached || fallback);

  useEffect(() => {
    let alive = true;
    if (cached) return;
    fetch("/api/public/config")
      .then((res) => (res.ok ? res.json() : fallback))
      .then((data) => {
        cached = { ...fallback, ...data };
        if (alive) setConfig(cached);
      })
      .catch(() => {
        if (alive) setConfig(fallback);
      });
    return () => { alive = false; };
  }, []);

  return config;
}
