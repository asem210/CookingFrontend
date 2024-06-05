/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        pacifico: ["Pacifico"],
        oswald: ["Oswald"],
        ssp: ["Source Sans Pro"],
        belleza: ["Belleza"],
      },
      colors: {},
    },
  },
  plugins: [],
};
