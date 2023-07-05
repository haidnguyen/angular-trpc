const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary-color) / <alpha-value>)',
        light: 'var(--light-color)',
        default: 'rgb(var(--default-color) / <alpha-value>)',
      },
      fontFamily: {
        titillium: ['Tiltillium Web', 'sans-serif'],
        sans: ['Source Sans Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
