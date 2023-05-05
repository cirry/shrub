/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./main.js",
    "./**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "custom-grey": "#f0f0f3",
      }
    },
  },
  plugins: [],
}
