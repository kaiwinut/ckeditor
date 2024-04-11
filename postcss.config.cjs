const path = require('path');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const config = {
  plugins: [tailwindcss(path.resolve(__dirname, './tailwind.config.cjs')), autoprefixer()]
};

module.exports = config;