/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary" : "#FFFDD0",
        "secondary" : "#FFD700",
        "accent" : "#FDDc5c",
        "beauty-rose": "#F8E8E8",
        "beauty-lavender": "#E8E0F8",
        "beauty-peach": "#FFE5D9",
        "beauty-mint": "#E0F4F0",
        "beauty-cream": "#FFF8F0",
        "beauty-dusty-rose": "#D4A5A5",
        "beauty-sage": "#B8C5A0",
        "beauty-blush": "#F4D1D1",
      }
    },
  },
  plugins: [],
}