module.exports = {
  important: true,
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        william: ["VTC William", "serif"],
        dubois: ["VTC DuBois", "serif"],
        sans: ["neue-haas-unica", "sans-serif"],
        icons: ["DxD Icons"]
      },
      gridTemplateColumns: {
        "14": "repeat(14, minmax(0, 1fr))"
      },
      colors: {
        black: "#1C1817",
        offblack: "#1C1817",
        offwhite: "#FAF1E9",
        royalblue: "#3B6FE0",
        peabodyorange: "rgb(219, 136, 42)"
      },
      inset: {
        screen: "100vh",
        "-screen": "-100vh"
      },
      fontSize: {
        frontTitle: "14rem"
      },
      lineHeight: {
        veryTight: "0.8"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
