module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      xsm: { max: "320px" },
      sm: { max: "640px" },
      md: { max: "768px" },
      lg: { max: "1024px" },
      xl: { max: "1280px" },
      "1sm": { max: "425px" },
      "2xl": { max: "1366px" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
