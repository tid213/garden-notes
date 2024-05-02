/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.jsx', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        customDarkGreen: '#353519',
        customMidGreen: '#666538',
        customLightGreen: '#bab653',
        customLightBrown: '#e9cc79',
        customBrown: '#483519',
        customOrange: '#f98638',
      },
    },
  },
  plugins: [],
}

