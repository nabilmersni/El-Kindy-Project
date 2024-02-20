/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7586FF",
        secondaryLight: "#FFECD6",
        secondaryDark: "#FFAC1D",
        lightBlue: "#AED2FF",
        darkBlue: "#006BBE",
        headerBG: "#DBDFFD",
        black: "#02241A",
        bodyBg: "#E9F6FF",
        nav: "#627BBC",
      },
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
      },
      fontSize: {},
    },
  },
  plugins: [],
});
