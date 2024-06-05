
const {APP_THEME, BACKGROUND_COLOR} = require("./src/constants/colors");
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        app: {
          theme: APP_THEME,
        },
        backgroundColor : BACKGROUND_COLOR
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
