/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      theme: {
        extend: {
          colors: {
            negro: "#1D3139",
            naranja: "#E9644F",
            gris: "#E7E7E7",
            blanco: "#FFFFFF",
            negroclaro: "#333333",
            verdeclaro: "#00ff00",
            rojo: "ff0000",
          },
          fontFamily: {
            poppins: ["Poppins", "sans-serif"],
            pacifico: ["Pacifico"],
            oswald: ["Oswald"],
            ssp: ["Source Sans Pro"],
            belleza: ["Belleza"],
          },
        },
      },
    },
  },
  plugins: [],
};
