/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // theme toggle adds/removes the "dark" class on <html>
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Brand green taken from the logo. 700 = exact logo green. Change here to re-theme the whole site.
        brand: {
        50: "#f1f8f5",
        100: "#dff2ea",
        200: "#b5e3d1",
        300: "#6ad2a9",
        400: "#31b883",
        500: "#20875e",
        600: "#116342",
        700: "#064029",
        800: "#053220",
        900: "#032317",
        },
      },
    },
  },
  plugins: [],
};
