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
      colors: {
        negro: "#1D3139",
        naranja: "#E9644F",
        gris: "#E7E7E7",
        blanco: "#FFFFFF",
        negroclaro: "#333333",
        verde: "#32CD32",
        rojo: "#FF0000",
        textoalt: "#B5B5B5",
      },
    },
  },
  plugins: [],
};
