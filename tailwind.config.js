const colors = require("tailwindcss/colors");
const { colors: defaultColors } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...defaultColors,
        gray: colors.neutral,
        rose: colors.rose,
        fuchsia: colors.fuchsia,
        indigo: colors.indigo,
        teal: colors.teal,
        emerald: colors.emerald,
        sky: colors.sky,
        lime: colors.lime,
        orange: colors.orange,
        pink: colors.pink,
        cyan: colors.cyan,
        primary: "#194350",
        secondary: colors.pink[500],
      },
      boxShadow: {
        homogen: "0 0 10px 3px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
