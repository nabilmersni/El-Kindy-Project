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

        google: {
          "text-gray": "#3c4043",
          "button-blue": "#7586FF",
          // "button-blue-hover": "#5195ee",
          "button-blue-hover": "#556CD6",
          "button-dark": "#202124",
          "button-dark-hover": "#555658",
          "button-border-light": "#dadce0",
          "logo-blue": "#4285f4",
          "logo-green": "#34a853",
          "logo-yellow": "#fbbc05",
          "logo-red": "#ea4335",
        },
      },
      fontFamily: {
        nunito: ["nunito", "sans-serif"],
      },
      fontSize: {},

      boxShadow: {
        custom: "5px 5px 10px 3px rgba(0, 0, 0, 0.15)",
        custom2: "0px 5px 10px 1px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
});
