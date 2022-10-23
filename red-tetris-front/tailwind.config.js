/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        // "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
  theme: {
    extend: {},
      colors: {
          '_primary': '#fd7014',
          '_secondary': '#00b8a2',
          '_dark': '#222831',
          '_gray': '#393e46',
          '_light': '#eeeeee',
      },
  },
  plugins: [],
}
