/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7586FF",
        lightBlue: "#AED2FF",
        darkBlue: "#006BBE",
        headerBG: "#DBDFFD",
        black: "#02241A",
      },
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
      },
      fontSize: {},
    },
  },
  plugins: [],
};
