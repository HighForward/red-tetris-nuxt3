/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
      colors: {
        base: '#222831',
        base_light: '#31363F',
        content: '#76ABAE',
        content_light: '#EEEEEE',
        primary: '#73EC8B',

          'tetris-orange': '#FFAC30',
          'tetris-purple': '#7E00AD',
          'tetris-green': '#15BF26',
          'tetris-blue': '#004EFF',
          'tetris-yellow': '#FFF000',
          'tetris-blue-sky': '#00F5FF',
          'tetris-red': '#FF0000',
          'tetris-hard-gray': '#0F0F0F',
          'tetris-shadow': '#424242'
      }
  },
  plugins: [],
}

