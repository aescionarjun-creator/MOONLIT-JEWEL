/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF8F3",
        "warm-white": "#FFFFFF",
        champagne: {
          DEFAULT: "#D6B477",
          light: "#EAD6B3",
          dark: "#B89657",
        },
        gold: {
          DEFAULT: "#C9A45C",
          soft: "#D4B675",
          antique: "#A6823B",
        },
        taupe: "#B8AA98",
        charcoal: {
          DEFAULT: "#292724",
          light: "#3E3B37",
          dark: "#1A1917",
        },
        "soft-brown": "#66584C",
        burgundy: "#5A2528",
        emerald: "#183C32",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Cormorant Garamond", "serif"],
        sans: ["var(--font-inter)", "Inter", "Manrope", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 10px 30px -10px rgba(41, 39, 36, 0.08)",
        "luxury-hover": "0 20px 40px -15px rgba(214, 180, 119, 0.18)",
      },
    },
  },
  plugins: [],
};
