/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        beige: {
          50: "#FBF8F4",
          100: "#F8F4EC",
          200: "#F0E6D6",
          300: "#E9DBC2",
          400: "#D9C196",
          500: "#C9A669",
          600: "#B48A41",
          700: "#876731",
          800: "#5A4520",
          900: "#2D2210",
          950: "#161108"
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
