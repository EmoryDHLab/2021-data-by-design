module.exports = {
  important: true,
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        william: ["VTC William", "serif"],
        sans: ["neue-haas-unica", "sans-serif"]
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      },
      colors: {
        offwhite: "#FAF1E9"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

