/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-100": "#fbeaf0",
        "primary-150": "#ffcbde",
        "primary-200": "#f2bfd2",
        "primary-250": "#ffa4c5",
        "primary-300": "#ea95b4",
        "primary-350": "#fb6c9f",
        "primary-400": "#dd5587",
        "primary-450": "#ff3b80",
        "primary-500": "#d42b69",
        "primary-550": "#af1850",
        "primary-600": "#aa2254",
        "primary-650": "#660c2d",
        "primary-700": "#7f1a3f",
        "primary-750": "#300515",
        "primary-800": "#55112a",
        "primary-850": "#1a000f",
        "primary-900": "#400d1f",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        epilogue: ['Epilogue', 'sans-serif'],      }
    },
  },
  plugins: [],
}