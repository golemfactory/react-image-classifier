/* eslint-env node */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#181EA9",
          "base-100": "#F6F8FC",
          error: "#A71919",
          success: "#367946",

          "--rounded-btn": "3px",
        },
      },
    ],
  },
};
