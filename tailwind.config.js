module.exports = {
  important: true,
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        william: ["VTC William", "serif"],
        sans: ["neue-haas-unica", "sans-serif"],
        icons: ["DxD Icons"]
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      },
      colors: {
        offwhite: "#FAF1E9"
      },
      inset: {
        screen: '100vh',
        '-screen': '-100vh'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

