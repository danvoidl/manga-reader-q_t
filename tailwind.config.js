const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'cellphone': '500px',      
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        'main': '#141414',
        'main-secondary': '#f7931e',
        'black-main': '#141414',    
        'main-pink': '#ffc9e5',
        'main-green': '#deff8c'
      },
      minWidth: {
        '600': '660px'
      },
    },    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
