/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './fr/*.html',
    './assets/js/*.js',
  ],
  theme: {
    extend: {
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
