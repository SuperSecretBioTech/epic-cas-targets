/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/@ninjha01/nitro-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f9ff",
          100: "#e6f3ff",
          200: "#c2e0ff",
          300: "#9ecbff",
          400: "#5a9eff",
          500: "#1672ff",
          600: "#1369e6",
          700: "#0f56a3",
          800: "#0b4270",
          900: "#08324b",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
