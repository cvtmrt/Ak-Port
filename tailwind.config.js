/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./layouts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AKÜPORT marka renkleri (logo: koyu lacivert zemin + altın/amber)
        brand: {
          dark: "#0d1b2a",
          darker: "#081320",
          navy: "#1b263b",
          gold: "#f5a623",
          amber: "#ffb000",
          // Beyaz/açık zeminde okunaklı altın (WCAG kontrastı için)
          goldText: "#a16207",
          light: "#f8fafc",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
};
