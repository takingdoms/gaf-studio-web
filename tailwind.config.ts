import tailwindColors from './tailwind.colors';

const exposeColorsAsVariables = function ({ addBase, theme }: any) {
  function extractColorVars(colorObj: any, colorGroup = '') {
    return Object.keys(colorObj).reduce((vars, colorKey) => {
      const value = colorObj[colorKey];

      const newVars: any =
        typeof value === 'string'
          ? { [`--color${colorGroup}-${colorKey}`]: value }
          : extractColorVars(value, `-${colorKey}`);

      return { ...vars, ...newVars };
    }, {});
  }

  addBase({
    ':root': extractColorVars(theme('colors')),
  });
};

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
    exposeColorsAsVariables,
  ],
}
