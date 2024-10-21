/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
      colors: {
        base: '#16423C',
        base_light: '#6A9C89',
        content: '#C4DAD2',
        content_light: '#E9EFEC',

          'tetris-orange': '#FFAC30',
          'tetris-purple': '#7E00AD',
          'tetris-green': '#15BF26',
          'tetris-blue': '#004EFF',
          'tetris-yellow': '#FFF000',
          'tetris-blue-sky': '#00F5FF',
          'tetris-red': '#FF0000',
          'tetris-hard-gray': '#0F0F0F'
      }
  },
  plugins: [],
}

