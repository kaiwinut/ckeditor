/** @type {import('tailwindcss').Config}*/
/** @type {import('tailwindcss').Config}*/
/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        primary: "#F4D19B",
        secondary: "#D7E9F7"
      }
    }
  },

  plugins: []
};

module.exports = config;