const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'cellphone': '500px',   
      'middle': '900px',   
      ...defaultTheme.screens
    },    
    boxShadow: {      
      'md-b': '0 4px 6px -1px rgb(0,0,0, 0.8)'      
    },
    extend: {
      colors: {
        'main': '#141414',
        'main-secondary': '#f7931e',
        'black-main': '#141414',    
        'main-pink': '#ffc9e5',
        'main-green': '#deff8c',        
      },      
      minWidth: {
        '600': '660px'
      },
      inset: {
        '-98': '-24.5rem',
      },
      spacing: {
        '82': '21rem',
        '73': '18.5rem',
        '720': '720px'
      },
      margin: {
        '10p': '10%'
      }
    },    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
