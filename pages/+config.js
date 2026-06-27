import vikeReact from "vike-react/config";
import Layout from "../layouts/LayoutDefault.jsx";
import Head from "../layouts/HeadDefault.jsx";

// Vike + vike-react global yapılandırması (SSR varsayılan açık).
export default {
  Layout,
  Head,
  title: "AKÜPORT | İncek & Gölbaşı Akü, Yerinde Montaj ve Acil Akü",
  description:
    "İncek, Gölbaşı ve Ankara'da akü satışı, yerinde montaj ve 7/24 acil akü hizmeti. Mutlu, Varta, Bosch, İnci aküleri. Hemen arayın: 0544 479 29 59.",
  lang: "tr",
  // Sunucudan istemciye taşınacak ek pageContext değerleri (analytics ID'leri).
  passToClient: ["analytics"],
  extends: vikeReact,
};
