module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        welcome: "url('src/assets/background_movies.jpg')"
      },
    },
    minWidth: {
      '1': '24rem',
      '2': '32rem',
      'screen': '100vw',
    },
    minHeight: {
      '1': '24rem',
      'screen': '100vh',
    },
    maxWidth: {
      '4/5': '80%',
      'full': '100%',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
