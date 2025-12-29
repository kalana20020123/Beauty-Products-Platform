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
      }
    },
  },
  plugins: [],
}