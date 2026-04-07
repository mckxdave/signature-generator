/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#F8BF31",
          black: "#1A1A1A",
        },
      },
      fontFamily: {
        lato: ["Lato", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
