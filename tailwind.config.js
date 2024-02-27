import tailwindColors from './tailwind.colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: tailwindColors,
      fontFamily: {
        // "sans": ["Nunito", "sans-serif"],
        // "sidebar": ["Quicksand", "sans-serif"],
        // "mono": ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}
