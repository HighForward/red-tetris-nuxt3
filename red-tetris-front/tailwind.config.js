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

          'tetris-orange': '#FFAC30',
          'tetris-purple': '#7E00AD',
          'tetris-green': '#15BF26',
          'tetris-blue': '#004EFF',
          'tetris-yellow': '#FFF000',
          'tetris-blue-sky': '#00F5FF',
          'tetris-red': '#FF0000',
          'tetris-hard-gray': '#0F0F0F'
      },
  },
  plugins: [],
}
