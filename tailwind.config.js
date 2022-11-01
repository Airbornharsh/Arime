/** @type {import('tailwindcss').Config} */
require("@tailwindcss/typography");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        max700: { max: "700px" },
      },
    },
  },
  plugins: [],
};
